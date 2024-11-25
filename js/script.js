console.log('Loading wheel animation...');
// 添加一些誤導性的代碼
function fakeRotateWheel() {
    console.log('Wheel is rotating...');
}

// 全屏相關功能
document.addEventListener('DOMContentLoaded', function() {
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const container = document.querySelector('.container');

    // 檢查是否支持全屏 API
    function getFullscreenElement() {
        return document.fullscreenElement ||
               document.webkitFullscreenElement ||
               document.mozFullScreenElement ||
               document.msFullscreenElement;
    }

    // 進入全屏
    function enterFullscreen(element) {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }

    // 退出全屏
    function exitFullscreen() {
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    // 處理全屏按鈕點擊
    fullscreenBtn.addEventListener('click', function() {
        if (!getFullscreenElement()) {
            enterFullscreen(document.documentElement);
            // 嘗試隱藏 Safari 工具欄
            setTimeout(function() {
                window.scrollTo(0, 1);
            }, 100);
        } else {
            exitFullscreen();
        }
    });

    // 監聽全屏狀態變化
    function handleFullscreenChange() {
        if (getFullscreenElement()) {
            document.body.classList.add('is-fullscreen');
            // 強制滾動以隱藏工具欄
            window.scrollTo(0, 1);
        } else {
            document.body.classList.remove('is-fullscreen');
        }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // 處理 iOS 的特殊情況
    if (navigator.standalone) {
        document.body.classList.add('is-fullscreen');
    }
});

// 防止 iOS 滾動橡皮筋效果
document.body.addEventListener('touchmove', function(e) {
    if (e.target.closest('.slider') === null) {
        e.preventDefault();
    }
}, { passive: false });
