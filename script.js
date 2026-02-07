// ========== DOMの読み込み完了を待つ ==========
document.addEventListener('DOMContentLoaded', function() {

    // ========== ライトボックス機能 ==========
    
    // DOM要素を取得
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    // すべての写真リンクを取得
    const photoLinks = document.querySelectorAll('.photo-link');
    let currentImageIndex = 0;
    let imageArray = [];
    let scrollPosition = 0; // スクロール位置を保存する変数
    
    // ライトボックス機能が必要なページかチェック
    if (photoLinks.length > 0 && lightbox) {
        // 写真リンクの配列を作成
        photoLinks.forEach((link, index) => {
            imageArray.push(link.getAttribute('data-image'));
            
            // 各写真リンクにクリックイベントを設定
            link.addEventListener('click', function(e) {
                e.preventDefault(); // デフォルトのリンク動作を無効化
                currentImageIndex = index;
                openLightbox(imageArray[currentImageIndex]);
            });
        });
        
        // ライトボックスを開く関数
        function openLightbox(imageSrc) {
            // 現在のスクロール位置を保存
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            
            // bodyを固定してスクロールを無効化（位置は保持）
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';
            
            // ライトボックスを表示
            lightboxImage.src = imageSrc;
            lightbox.classList.add('active');
        }
        
        // ライトボックスを閉じる関数
        function closeLightbox() {
            lightbox.classList.remove('active');
            
            // bodyの固定を解除
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            
            // 保存していたスクロール位置に戻る
            window.scrollTo(0, scrollPosition);
        }
        
        // 前の写真を表示
        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
            lightboxImage.src = imageArray[currentImageIndex];
        }
        
        // 次の写真を表示
        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % imageArray.length;
            lightboxImage.src = imageArray[currentImageIndex];
        }
        
        // 閉じるボタンのクリックイベント
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        // 前へボタンのクリックイベント
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', showPrevImage);
        }
        
        // 次へボタンのクリックイベント
        if (lightboxNext) {
            lightboxNext.addEventListener('click', showNextImage);
        }
        
        // 背景（黒い部分）をクリックしたら閉じる
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // キーボード操作
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        });
    }
    
    // ========== ハンバーガーメニュー機能 ==========
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    let menuScrollPosition = 0; // メニュー用のスクロール位置保存変数
    
    // メニュー要素が存在する場合のみ実行
    if (menuToggle && mainNav) {
        
        // メニューボタンのクリックイベント
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // イベントの伝播を防ぐ
            
            const isActive = mainNav.classList.contains('active');
            
            if (!isActive) {
                // メニューを開く
                menuScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                
                document.body.style.position = 'fixed';
                document.body.style.top = `-${menuScrollPosition}px`;
                document.body.style.width = '100%';
                
                mainNav.classList.add('active');
                menuToggle.classList.add('active');
            } else {
                // メニューを閉じる
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                
                window.scrollTo(0, menuScrollPosition);
            }
        });
        
        // メニュー内のリンクをクリックしたらメニューを閉じる
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
                
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                
                window.scrollTo(0, menuScrollPosition);
            });
        });
        
        // メニュー外をクリックしたらメニューを閉じる
        document.addEventListener('click', function(e) {
            // クリックされた要素がメニューやボタン以外の場合
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    
                    document.body.style.position = '';
                    document.body.style.top = '';
                    document.body.style.width = '';
                    
                    window.scrollTo(0, menuScrollPosition);
                }
            }
        });
        
        // ウィンドウのリサイズ時の処理
        // PCサイズに戻ったらメニューを自動的に閉じる
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    menuToggle.classList.remove('active');
                    
                    document.body.style.position = '';
                    document.body.style.top = '';
                    document.body.style.width = '';
                    
                    window.scrollTo(0, menuScrollPosition);
                }
            }
        });
    }
    
    // ========== スムーズスクロール機能（オプション）==========
    // ページ内リンク（#で始まるリンク）をクリックしたときにスムーズにスクロール
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // #だけの場合はページトップへ
            if (href === '#' || href === '#body') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // 指定されたIDの要素へスクロール
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========== 画像の遅延読み込み（オプション）==========
    // loading="lazy"属性がない古いブラウザ対応
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

}); // DOMContentLoaded終了
