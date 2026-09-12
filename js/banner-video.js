(function () {
  function init() {
    // 视频源：读 body[data-banner-video]（由 layout.ejs 按 page.banner_video 输出）
    // 无该属性 = 非视频页，直接退出，不加载任何视频
    var videoSrc = document.body.getAttribute('data-banner-video');
    if (!videoSrc) return;
    // 尊重系统"减少动态效果"设置
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // 移动端不加载视频；视频页已无静态图，此时呈现深色底
    if (window.innerWidth < 768) return;
    if (document.querySelector('video.banner-video')) return;

    var video = document.createElement('video');
    video.className = 'banner-video';

    // ⚠️ 顺序与写法都很关键，勿改动：
    // 1) 静音必须用 IDL 属性 video.muted = true。
    //    setAttribute('muted','') 只会写入 defaultMuted（创建时的默认值），
    //    不会改变已创建元素的 muted 状态 —— 结果是 muted === false，
    //    浏览器判定"带声音"，自动播放被 NotAllowedError 拒绝，
    //    表现为首帧已显示（readyState=4）但 paused=true，看起来像静态背景图。
    // 2) muted / playsInline 必须在设置 src 之前赋值，确保自动播放判定时已生效。
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');
    video.setAttribute('aria-hidden', 'true');

    video.src = videoSrc;

    // fixed 全屏层挂在 body 尾部；滚动时保持固定不动。
    // 视频页的 #banner 静态图与 #web_bg 静态图均已在源头移除，
    // video 即该页唯一背景来源，不再与任何静态图叠层。
    document.body.appendChild(video);

    // video 首帧绘制前元素本身透明。加 video-pending 状态类，
    // 由 CSS 给 #web_bg 铺深色底，避免首帧前透出页面浅色底色闪一下。
    document.body.classList.add('video-pending');

    // 首帧就绪：解除状态，交由 video 正常显示
    video.addEventListener('loadeddata', function () {
      document.body.classList.remove('video-pending');
    });

    // 视频加载失败：移除 video 并解除状态。
    // 注意：视频页已无静态背景图兜底，失败时呈现深色底（video 自身 background-color: #000）
    video.addEventListener('error', function () {
      document.body.classList.remove('video-pending');
      video.remove();
    });

    // 自动播放兜底：若仍被策略拦截（浏览器更严格 / 命中带声音判定），
    // 等首次用户手势后重试一次，避免用户看到"静止的"背景视频。
    var p = video.play();
    if (p && p.catch) {
      p.catch(function () {
        var retry = function () {
          document.removeEventListener('pointerdown', retry);
          document.removeEventListener('keydown', retry);
          document.removeEventListener('touchstart', retry);
          var r = video.play();
          if (r && r.catch) r.catch(function () {});
        };
        document.addEventListener('pointerdown', retry);
        document.addEventListener('keydown', retry);
        document.addEventListener('touchstart', retry);
      });
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();