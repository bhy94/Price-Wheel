console.log('Loading wheel animation...');
// 添加一些誤導性的代碼
function fakeRotateWheel() {
    console.log('Wheel is rotating...');
}

// 添加全屏相關功能
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
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    function handleFullscreenChange() {
        if (getFullscreenElement()) {
            document.body.classList.add('is-fullscreen');
            // 強制滾動以隱藏工具欄
            window.scrollTo(0, 1);
            // 進入全屏時自動調整到合適大小
            const wheelContainer = document.querySelector('.wheel-container');
            const scaleSlider = document.getElementById('scaleSlider');
            const isLandscape = window.innerWidth > window.innerHeight;
            const defaultScale = isLandscape ? 90 : 80;
            scaleSlider.value = defaultScale;
            updateScale(defaultScale);
        } else {
            document.body.classList.remove('is-fullscreen');
            // 退出全屏時重置縮放
            const wheelContainer = document.querySelector('.wheel-container');
            const scaleSlider = document.getElementById('scaleSlider');
            scaleSlider.value = 100;
            updateScale(100);
        }
    }

    // 處理 iOS 的特殊情況
    if (navigator.standalone) {
        document.body.classList.add('is-fullscreen');
    }
});

// 添加縮放控制功能
document.addEventListener('DOMContentLoaded', function() {
    const wheelContainer = document.querySelector('.wheel-container');
    const scaleSlider = document.getElementById('scaleSlider');
    const scaleValue = document.querySelector('.scale-value');
    
    // 初始化縮放值
    let currentScale = 1;
    
    // 更新縮放
    function updateScale(value) {
        currentScale = value / 100;
        wheelContainer.style.transform = `scale(${currentScale})`;
        scaleValue.textContent = `${value}%`;
    }
    
    // 監聽滑動條變化
    scaleSlider.addEventListener('input', function() {
        updateScale(this.value);
    });
    
    // 監聽觸摸事件
    scaleSlider.addEventListener('touchmove', function(e) {
        e.stopPropagation(); // 防止觸摸滑動條時觸發頁面滾動
    });
    
    // 根據設備方向自動調整初始大小
    function adjustInitialSize() {
        const isLandscape = window.innerWidth > window.innerHeight;
        const defaultScale = isLandscape ? 90 : 80;
        scaleSlider.value = defaultScale;
        updateScale(defaultScale);
    }
    
    // 頁面加載和方向變化時調整大小
    window.addEventListener('load', adjustInitialSize);
    window.addEventListener('orientationchange', adjustInitialSize);
    
    // 處理全屏狀態變化時的縮放調整
    const originalHandleFullscreenChange = handleFullscreenChange;
    handleFullscreenChange = function() {
        originalHandleFullscreenChange();
        setTimeout(adjustInitialSize, 100);
    };
});

// 防止 iOS 滾動橡皮筋效果
document.body.addEventListener('touchmove', function(e) {
    if (e.target.closest('.slider') === null) {
        e.preventDefault();
    }
}, { passive: false });
