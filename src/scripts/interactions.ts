/**
 * @file interactions.ts
 * @description 全站统一视觉交互层：
 *   1. 3D Tilt       —— `.tilt` 卡片 mousemove 倾斜
 *   2. Hero Parallax —— `[data-parallax]` 多层视差（鼠标 + 滚动）
 *   3. Reveal        —— `.reveal` 元素滚入视口 → 加 `.in`
 *   4. Progress Ring —— 右下角阅读进度圆环 + 回顶点击
 *
 * 全部 JS 动画在 `prefers-reduced-motion: reduce` 时退化：
 *   - 不注册 mousemove / rAF 循环
 *   - reveal 直接一次性置 `.in`（CSS 已把 transition-duration 压到 0.01ms）
 *   - progress-ring 仍可见（回顶实用），但不闪现
 */

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReduced = () => motionQuery.matches;

/* ============================================================
 * 1. 3D Tilt（卡片）
 * —— rotateX/Y ±4°，translateY(-6px)。rAF 节流避免 120Hz 鼠标爆帧。
 * ============================================================ */
function initTilt() {
  if (prefersReduced()) return;

  const cards = document.querySelectorAll<HTMLElement>('.tilt');
  cards.forEach((card) => {
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * -8; // 垂直方向 → X 轴旋转
      const ry = (px - 0.5) * 8; // 水平方向 → Y 轴旋转
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });
    };

    const onLeave = () => {
      if (raf) cancelAnimationFrame(raf);
      card.style.transform = '';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });
}

/* ============================================================
 * 2. Hero 多层视差（鼠标 + 滚动）
 * —— 每个 [data-parallax="深度"] 元素按 depth * (mouseOffset, scrollY) 平移
 * —— lerp 系数 0.08，感觉是「带惯性地跟着」而不是「硬跟随」
 * ============================================================ */
function initParallax() {
  const layers = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (!layers.length) return;
  if (prefersReduced()) {
    // 仍让布局显示，但不做 rAF 循环
    layers.forEach((el) => {
      el.style.transform = 'translate3d(0,0,0)';
    });
    return;
  }

  // 鼠标视差只在 hero 区内有效。没找到 #hero-splash 就只跟滚动。
  const hero = document.getElementById('hero-splash');

  let mouseX = 0,
    mouseY = 0;
  let targetX = 0,
    targetY = 0;

  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      targetX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      targetY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    });
    hero.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });
  }

  const loop = () => {
    mouseX += (targetX - mouseX) * 0.08;
    mouseY += (targetY - mouseY) * 0.08;
    const scrollY = window.scrollY;

    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.parallax ?? '0');
      const tx = mouseX * depth * 60;
      const ty = mouseY * depth * 60 + scrollY * depth * 0.4;
      layer.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
    });

    requestAnimationFrame(loop);
  };
  loop();
}

/* ============================================================
 * 3. Reveal（滚入视口入场）
 * —— IntersectionObserver 监听 `.reveal`，进入视口加 `.in`；
 *    支持 `data-delay="200"` 错峰（单位 ms）
 * ============================================================ */
function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (!els.length) return;

  // reduced-motion：直接一次性显示，不做观察
  if (prefersReduced()) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }

  // threshold 用 0 而非 0.12：长文章正文可能比视口高 10 倍以上，
  // 12% 永远达不到（max ratio = viewport / element），reveal 不触发，整屏白屏。
  // 用 rootMargin 负底边代替阈值，确保元素顶部进入视口一定距离再入场。
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        const delay = Number(el.dataset.delay ?? 0);
        if (delay > 0) el.style.transitionDelay = `${delay}ms`;
        el.classList.add('in');
        io.unobserve(el);
      });
    },
    { threshold: 0, rootMargin: '0px 0px -60px 0px' },
  );

  els.forEach((el) => io.observe(el));
}

/* ============================================================
 * 4. 进度圆环
 * —— scroll 更新 stroke-dashoffset（周长 157 = 2π·25），
 *    scrollTop > 400 时淡入，点击回顶部
 * ============================================================ */
function initProgressRing() {
  const ring = document.getElementById('progress-ring');
  const fill = document.getElementById('progress-ring-fill');
  if (!ring || !fill) return;

  const CIRC = 157;
  let pending = false;

  const update = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const max = scrollHeight - clientHeight;
    const pct = max > 0 ? scrollTop / max : 0;
    (fill as unknown as SVGCircleElement).style.strokeDashoffset = String(CIRC * (1 - pct));
    ring.classList.toggle('visible', scrollTop > 400);
    pending = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );

  ring.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReduced() ? 'auto' : 'smooth' });
  });

  update();
}

/* ============================================================
 * Boot —— DOM 就绪后一次性装配
 * ============================================================ */
function boot() {
  initTilt();
  initParallax();
  initReveal();
  initProgressRing();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

// 用户在系统「减弱动态效果」开关切到 ON/OFF 时：
//   - ON  → 暴力刷新最安全（重新 boot 会跳过 rAF 循环）
//   - OFF → 同上
// 此处用 reload 是为了避免各模块状态一致性的地狱。频率极低，体验可接受。
motionQuery.addEventListener('change', () => {
  // 仅在真正切换时触发；避免初始化触发的无意义事件
  location.reload();
});
