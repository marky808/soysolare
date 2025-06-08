// Soy Solare - 最小限のJavaScript

document.addEventListener('DOMContentLoaded', function() {
  // ハンバーガーメニューの制御
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // メニュー項目クリック時にメニューを閉じる
    navMenu.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  console.log('Soy Solare サイトが読み込まれました');
});
