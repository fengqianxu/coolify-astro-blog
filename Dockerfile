# syntax=docker/dockerfile:1.7
#
# 两阶段构建：node 编译静态资源 → nginx 托管。
# 版本锁到具体 minor，避免 latest 推进时无声破坏构建；升级时显式改这里。

# ── 构建阶段 ──────────────────────────────────────────
FROM node:20.18-alpine AS build
WORKDIR /app

# 先装依赖：此层只在 package*.json 变动时重建，加快后续构建
COPY package*.json ./
RUN npm ci --prefer-offline --no-audit

# 再拷源码：markdown/astro 任何变动都会让这一层失效，保证文章更新一定被打包
COPY . .

# CI=true 让 Astro 在出错时给出更详细的栈，便于 Coolify 日志排查
ENV CI=true
RUN npm run build

# 构建完成后做一次 sanity check：确保文章页真的生成了，否则 build fail 更早暴露
RUN test -d /app/dist/blog && ls /app/dist/blog | grep -v index.html \
    || (echo "❌ dist/blog 下没有文章页，检查 src/content/posts/ 是否为空" && exit 1)

# ── 运行阶段（Nginx 托管静态产物） ────────────────────
FROM nginx:1.27-alpine

# curl 用于下面的 HEALTHCHECK；apk --no-cache 保持镜像体积最小
RUN apk add --no-cache curl

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# 容器健康检查：每 30s 访问一次首页；连续 3 次失败则 Coolify 会重启或告警
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost/ >/dev/null || exit 1
