(function () {
  if (window.innerWidth < 768) return;

  var script = document.createElement('script');
  script.src = 'https://fastly.jsdelivr.net/npm/live2d-widget@3.1.4/lib/L2Dwidget.min.js';
  script.async = true;

  script.onload = function () {
    L2Dwidget.init({
      model: {
        jsonPath: 'https://unpkg.com/live2d-widget-model-tororo@1.0.5/assets/tororo.model.json',
        scale: 1
      },
      display: {
        position: 'left',
        width: 150,
        height: 300,
        hOffset: 40,
        vOffset: -20
      },
      mobile: {
        show: false
      },
      react: {
        opacityDefault: 0.8,
        opacityOnHover: 0.2
      }
    });
  };

  document.body.appendChild(script);
})();