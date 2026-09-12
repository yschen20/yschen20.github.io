/* 一言：替换首页 about-intro 文案，每次访问随机加载；失败保留原句 */
(function () {
  var el = document.getElementById('hitokoto-quote');
  if (!el) return;
  var fallback = el.getAttribute('data-fallback') || el.textContent.trim();
  if (!fallback) return;
  var api = el.getAttribute('data-api');
  if (!api) return;
  var url = api + (api.indexOf('?') > -1 ? '&' : '?') + 'max_length=30';
  var ctrl = ('AbortController' in window) ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 5000);
  fetch(url, ctrl ? { signal: ctrl.signal } : {})
    .then(function (r) { return r.json(); })
    .then(function (d) {
      clearTimeout(timer);
      if (d && typeof d.hitokoto === 'string' && d.hitokoto) {
        el.textContent = d.hitokoto;
      }
    })
    .catch(function () { clearTimeout(timer); /* keep fallback */ });
})();
