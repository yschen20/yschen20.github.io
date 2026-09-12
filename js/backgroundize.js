// 视频背景页（body 带 data-banner-video）：背景完全交给 banner-video.js 的 <video> 层。
//  - 不把任何静态图写入 #web_bg（否则视频底下仍残留静态背景图）；
//  - #banner 自身的静态背景图已在模板 banner.ejs 中按 page.banner_video 条件移除（background: none），
//    因此这里不再需要清理 #banner 背景；#banner 处于正常文档流，若保留静态图会盖在 z-index:-1 的 video 之上；
//  - 仅保留清空 banner 遮罩，维持与原先视频页一致的观感。
if (document.body.hasAttribute('data-banner-video')) {
    document
        .querySelector("#banner .mask")
        .setAttribute('style', 'background-color: rgba(0,0,0,0)');
} else {
    document
        .querySelector('#web_bg')
        .setAttribute('style', `background-image: ${document.querySelector('.banner').style.background.split(' ')[0]};position: fixed;width: 100%;height: 100%;z-index: -1;background-size: cover;`);

    document
        .querySelector("#banner")
        .setAttribute('style', 'background-image: url()')

    document
        .querySelector("#banner .mask")
        .setAttribute('style', 'background-color:rgba(0,0,0,0)')
}

/**
 —— 转载请注明出处！
 —— 原文作者：4rozeN
 —— 原文标题：Hexo fluid 全屏背景图随日夜模式切换以及正文底页毛玻璃效果
 —— 原文链接：https://4rozen.github.io/archives/Hexo/60191.html#%E5%AE%9E%E7%8E%B0%E8%83%8C%E6%99%AF%E5%9B%BE%E5%85%A8%E5%B1%8F%E6%95%88%E6%9E%9C
 —— 原文字数：3.1k 字
 */