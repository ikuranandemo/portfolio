$(function () {

  //ページ内スクロール
  var navHeight = $(".header").outerHeight();

  $('a[href^="#"]').on("click", function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top - navHeight;
    $("html, body").animate({ scrollTop: position, }, 300, "swing");
    return false;
  });

  //ページトップ
  $("#js-page-top").on("click", function () {
    $("body,html").animate({ scrollTop: 0, }, 300);
    return false;
  });

});


// カーソル用のdivタグを取得してcursorに格納
var cursor = document.getElementById('cursor');

// カーソル用のdivタグをマウスに追従させる
document.addEventListener('mousemove', function (e) {
  cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

// リンクにホバーした時にクラス追加、離れたらクラス削除
var link = document.querySelectorAll('a');
for (var i = 0; i < link.length; i++) {
  link[i].addEventListener('mouseover', function (e) {
    cursor.classList.add('cursor--hover');
  });
  link[i].addEventListener('mouseout', function (e) {
    cursor.classList.remove('cursor--hover');
  });
}

$(window).scroll(function () {
  $('.works-item').each(function () {
    var elemPos = $(this).offset().top,
      scroll = $(window).scrollTop(),
      windowHeight = $(window).height();

    if (scroll > elemPos - windowHeight + 150) {
      $(this).addClass('scrollin');
    }
  });


});

// スクロールイベントをリッスン
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  
  if (window.scrollY > 50) { // 50px以上スクロールしたら
      header.classList.add('shrink'); // 'shrink'クラスを追加
  } else {
      header.classList.remove('shrink'); // クラスを削除
  }
});


// スキル棒チャート
window.addEventListener('DOMContentLoaded', () => {

  // DOM要素を取得
  const skillEls = document.querySelectorAll('.chart');

  // カウントアップの設定
  const animationDuration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(animationDuration / frameDuration);
  const easeOut = t => t * (2 - t);
  const animateCountUp = el => {
    let frame = 0;
    const countTo = parseInt(el.innerHTML, 10);
    const counter = setInterval( () => {
      frame++;
      const progress = easeOut(frame / totalFrames);
      const currentCount = Math.round(countTo * progress);

      if (parseInt(el.innerHTML, 10) !== currentCount) {
        el.innerHTML = currentCount;
      }

      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  };

  // Intersection observerに渡すコールバック関数
  const cb = function(entries, observer) {
    entries.forEach((entry) => {
      if(entry.isIntersecting) {
        const proficiencyVal = entry.target.dataset.proficiency;
        const skillBar = entry.target.querySelector('.skill-bar');
        const percentage = entry.target.querySelector('.skill-percentage');
        const countup = entry.target.querySelector('.countup');

        skillBar.style.width = proficiencyVal + '%';
        percentage.style.opacity = 1;
        countup.textContent = proficiencyVal;
        animateCountUp(countup);

        observer.unobserve(entry.target);
      }
    });
  };

  // Intersection observerに渡すオプション
  const options = {
    rootMargin: "-50px 0px"
  };

  // IntersectionObserver初期化
  const io = new IntersectionObserver(cb, options);
  io.POLL_INTERVAL = 100; // Polyfillの設定
  skillEls.forEach(el => {
    io.observe(el);
  });

});

//thank youメッセージ
const CLASSNAME = "-visible";
const TIMEOUT = 2500;
const $target = $(".conclusion");

setInterval(() => {
  $target.addClass(CLASSNAME);
  setTimeout(() => {
    $target.removeClass(CLASSNAME);
  }, TIMEOUT);
}, TIMEOUT * 2);


//モットー
$(function () {
  $(window).scroll(function () {
    $('.fuchidori').each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > elemPos - windowHeight) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });
});