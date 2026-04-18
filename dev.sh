#!/bin/sh
# 本地开发启动脚本：自动激活 fnm 所选的 Node 版本并启动 astro dev。
# 历史包袱：之前这里硬编码过 fnm_multishells 的随机路径（会随 fnm 升级 / shell
# 重启失效），现在改用 `fnm env` 动态生成环境，shell 任何时候跑都能命中。
set -e
cd "$(dirname "$0")"

if command -v fnm >/dev/null 2>&1; then
  eval "$(fnm env --use-on-cd 2>/dev/null || fnm env)"
  fnm use >/dev/null 2>&1 || true
fi

npm run dev
