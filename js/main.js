// ヒーロースライダー
new Swiper('.hero-swiper', {
  loop: true,
  pagination: { el: '.hero-swiper .swiper-pagination', clickable: true },
  autoplay: { delay: 4000 },
  effect: 'fade'
});
// メニュースライダー
new Swiper('.menu-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: { el: '.menu-swiper .swiper-pagination', clickable: true },
  navigation: {
    nextEl: '.menu-swiper .swiper-button-next',
    prevEl: '.menu-swiper .swiper-button-prev',
  },
  effect: 'coverflow', // 3D効果を追加
  coverflowEffect: {
    rotate: 5,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  autoplay: { // 自動再生を追加
    delay: 5000,
    disableOnInteraction: false,
  },
  speed: 800, // トランジション速度
  breakpoints: {
    600: { slidesPerView: 2 },
    900: { slidesPerView: 3 }
  }
});
// お客様の声スライダー
new Swiper('.voice-swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: { el: '.voice-swiper .swiper-pagination', clickable: true },
  navigation: {
    nextEl: '.voice-swiper .swiper-button-next',
    prevEl: '.voice-swiper .swiper-button-prev',
  },
  effect: 'fade', // フェードエフェクト
  fadeEffect: {
    crossFade: true
  },
  autoplay: { // 自動再生
    delay: 6000,
    disableOnInteraction: false
  },
  speed: 1000 // ゆっくりとしたトランジション
});

// ハンバーガーメニュー
const navToggle = document.querySelector('.nav-toggle');
const globalNav = document.querySelector('.global-nav');
if(navToggle && globalNav) {
  navToggle.addEventListener('click', () => {
    globalNav.classList.toggle('open');
  });
  // メニュークリックで自動で閉じる
  globalNav.querySelectorAll('ul li a').forEach(link => {
    link.addEventListener('click', () => {
      globalNav.classList.remove('open');
    });
  });
}

// 上に戻るボタン
const toTopBtn = document.querySelector('.to-top');
if(toTopBtn) {
  toTopBtn.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
  window.addEventListener('scroll', () => {
    if(window.scrollY > 200) {
      toTopBtn.style.display = 'flex';
    } else {
      toTopBtn.style.display = 'none';
    }
  });
}

// モバイル時カルーセル中央寄せ調整
function adjustSwiperCenter() {
  if(window.innerWidth <= 900) {
    document.querySelectorAll('.menu-swiper .swiper-wrapper, .voice-swiper .swiper-wrapper').forEach(w => {
      w.style.justifyContent = 'center';
    });
    document.querySelectorAll('.menu-swiper .swiper-slide, .voice-swiper .swiper-slide').forEach(s => {
      s.style.marginLeft = 'auto';
      s.style.marginRight = 'auto';
    });
  } else {
    document.querySelectorAll('.menu-swiper .swiper-wrapper, .voice-swiper .swiper-wrapper').forEach(w => {
      w.style.justifyContent = '';
    });
    document.querySelectorAll('.menu-swiper .swiper-slide, .voice-swiper .swiper-slide').forEach(s => {
      s.style.marginLeft = '';
      s.style.marginRight = '';
    });
  }
}
window.addEventListener('resize', adjustSwiperCenter);
window.addEventListener('DOMContentLoaded', adjustSwiperCenter);
