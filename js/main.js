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
  },
  observer: true, // 動的なレイアウト変化に対応
  observeParents: true, // 動的なレイアウト変化に対応
  // モバイル時はslidesPerView:2で端のスライドも見えるように
  on: {
    beforeInit: function(swiper) {
      if(window.innerWidth <= 700) {
        swiper.params.slidesPerView = 2;
      }
    }
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

// カルーセルクラス
class Carousel {
  constructor(container) {
    this.container = container;
    this.wrapper = container.querySelector('.carousel-wrapper');
    this.slides = container.querySelectorAll('.carousel-slide');
    this.dots = container.querySelectorAll('.dot');
    this.prevBtn = container.querySelector('.prev-btn');
    this.nextBtn = container.querySelector('.next-btn');
    this.currentIndex = 0;
    this.autoSlideInterval = null;
    this.autoSlideDelay = 4000; // 4秒ごと
    this.isHovered = false;
    this.init();
  }
  init() {
    this.wrapper.style.width = `${this.slides.length * 100}%`;
    this.slides.forEach(slide => {
      slide.style.width = `${100 / this.slides.length}%`;
    });
    this.updateSlidePosition();
    this.addEventListeners();
    window.addEventListener('resize', () => this.updateSlidePosition());
    this.startAutoSlide();
    // ホバー時は自動スライド停止
    this.container.addEventListener('mouseenter', () => {
      this.isHovered = true;
      this.stopAutoSlide();
    });
    this.container.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.startAutoSlide();
    });
  }
  addEventListeners() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
  }
  updateSlidePosition() {
    const slideWidth = this.wrapper.offsetWidth / this.slides.length;
    this.wrapper.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlidePosition();
  }
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateSlidePosition();
  }
  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlidePosition();
  }
  startAutoSlide() {
    if (this.autoSlideInterval) return;
    this.autoSlideInterval = setInterval(() => {
      if (!this.isHovered) {
        this.nextSlide();
      }
    }, this.autoSlideDelay);
  }
  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-container');
  if (carousel) {
    new Carousel(carousel);
  }
});
