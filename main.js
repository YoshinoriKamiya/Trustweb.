/*-------------------------------------------
スワイパーの読み込み
-------------------------------------------*/
window.addEventListener('load', function() {
  var videos = document.querySelectorAll('.mainvisual-class video');
  videos.forEach(function(video) {
    video.pause();
  });
});

$(function () {
  var mainVisualSlider = $('.mainvisual-class');
  var currentCenterSlide = 0; // 現在のセンタースライドのインデックス
  var defaultAutoplaySpeed = 5000; // 画像の切り替えまでのデフォルト時間（5秒）

  mainVisualSlider.slick({
    pauseOnFocus: false,//フォーカスで一時停止
    pauseOnHover: false,//マウスホバーで一時停止
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: '25vw',
    autoplay: true, // 自動再生を有効にする
    autoplaySpeed: defaultAutoplaySpeed, // デフォルトの自動再生時間を設定
    dots: true,
    variableWidth: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 1,
          centerMode: true
        }
      },
    ]
  });
  mainVisualSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    // スライドが切り替わる前に動画を停止
    var currentSlideVideo = mainVisualSlider.find('.slick-slide[data-slick-index="' + currentSlide + '"] video');
    if (currentSlideVideo.length) {
      currentSlideVideo[0].pause();
      currentSlideVideo[0].currentTime = 0; // 動画を最初から再生
      // console.log("停止");
    }
  });
  mainVisualSlider.on('afterChange', function (event, slick, currentSlide) {
    // スライドが切り替わった後に動画再生を開始
    currentCenterSlide = currentSlide; // 現在のセンタースライドのインデックス
    playCenterVideo(); // センタースライドに到達したら動画再生
  });
  function playCenterVideo() {
    // センタースライドに再生したい動画がある場合、再生
    var centerSlideVideo = mainVisualSlider.find('.slick-slide[data-slick-index="' + currentCenterSlide + '"] video');
    if (centerSlideVideo.length) {
      var videoElement = centerSlideVideo[0];
      videoElement.currentTime=0;
      videoElement.play();
      // console.log("自動再生");
      // 動画が終了したら次のスライドに切り替える
      videoElement.addEventListener('ended', function () {
        mainVisualSlider.slick('slickNext');
      });
    } else {
      // 画像の場合はデフォルトの切り替え時間でスライド切り替える
      mainVisualSlider.slick('slickNext');
    }
  }
  // スライダー初期化
  mainVisualSlider.slick('slickGoTo', 0); // 初期位置に移動
   // 動画の再生時間に合わせてautoplaySpeedを設定
   mainVisualSlider.on('setPosition', function (event, slick) {
    var centerSlideVideo = mainVisualSlider.find('.slick-slide[data-slick-index="' + currentCenterSlide + '"] video');
    if (centerSlideVideo.length) {
      var videoElement = centerSlideVideo[0];
      var videoDuration = videoElement.duration * 1000; // 動画の再生時間をミリ秒で取得
      slick.slickSetOption('autoplaySpeed', videoDuration);
    } else {
      slick.slickSetOption('autoplaySpeed', defaultAutoplaySpeed);
    }
  });
});





// 主な製品ラインナップ
  $(document).ready(function(){
    $('.products-class').slick({
      slidesToShow: 1, // 1つのスライドのみを表示
      slidesToScroll: 1,
      dots: true,
      arrows: false,
      dotsClass: 'slider-dots',
      variableWidth:true,
      centerPadding: '20px',

      responsive:[
        {
          breakpoint:968,
          settings:{
          slidesToShow:1,
          variableWidth:true,
        }},
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            variableWidth:false,
          }
        },
      ],
    });
  });




  // 新着記事
$(document).ready(function(){
    $('.article-class').slick({
      Class: 'slider-articles',
      pauseOnHover: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      loop:true,
      dots: true,
      arrows: false,
      dotsClass: 'slider-dots',
      variableWidth:false,
      responsive:[
        {
          breakpoint:968,
          settings:{
          slidesToShow:1,
          variableWidth:true,
        }},
        {
          breakpoint:536,
          settings:{
          slidesToShow:1,
          variableWidth:false,
        }},
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            variableWidth:false,
          }
        },
      ],
    });
  });
  

  /*-------------------------------------------
画面を下にスクロールしていくと
アルファベットがランダムに変化してWe Value Serendipity.が出現
-------------------------------------------*/
var TypingAnimed =false
var arr = []
//初期値の設定
function TypingInit() {
  $('.js_typing').each(function (i) { //js_typingクラスを全て処理をおこなう
    arr[i] = new ShuffleText(this);//動作させるテキストを配列に格納
  });
}
//スクロールした際のアニメーションの設定
function TypingAnime() {
  $(".js_typing").each(function (i) {
    var elemPos = $(this).offset().top - 50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      if(!$(this).hasClass("endAnime")){//endAnimeのクラスがあるかチェック
        arr[i].start();//配列で登録テキストのアニメーションをおこなう
        arr[i].duration = 800;//テキストが最終変化するまでの時間※規定値600
        $(this).addClass("endAnime");//１度アニメーションした場合はendAnimeクラスを追加
        TypingAnimed =true;
      }
    }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  TypingAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  TypingInit(); //初期設定
  TypingAnime();/* アニメーション用の関数を呼ぶ*/
});// ここまで画面が読み込まれたらすぐに動かしたい場合の記述


  /*-------------------------------------------
ABOUT-US 左から右に流れるテキスト
-------------------------------------------*/
var slideanimated = false; 
function slideAnime(){
  //====左に動くアニメーションここから===
    $('.leftAnime').each(function(){ 
      var elemPos = $(this).offset().top-50;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight){
        //左から右へ表示するクラスを付与
        //テキスト要素を挟む親要素（左側）とテキスト要素を元位置でアニメーションをおこなう
        $(this).addClass("slideAnimeLeftRight"); //要素を左枠外にへ移動しCSSアニメーションで左から元の位置に移動
        $(this).children(".leftAnimeInner").addClass("slideAnimeRightLeft");  //子要素は親要素のアニメーションに影響されないように逆の指定をし元の位置をキープするアニメーションをおこなう
        slideanimated = true;
      }
    }); 
  }
  
  // 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function (){
    slideAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面をスクロールをしたら動かしたい場合の記述

  // 画面が読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function(){
    slideAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述

  /*-------------------------------------------
ABOUT-USセクション・ABOUTーUSテキストがふわっと出現する
-------------------------------------------*/
  // 動きのきっかけとなるアニメーションの名前を定義
var fadeanimated = false; 
function fadeAnime(){
  // ふわっ
  $('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
    var elemPos = $(this).offset().top-50;//要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight){
    $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
    fadeanimated =true;
    }
    });
}
// 画面をスクロールをしたら動かしたい場合の記述
  $(window).scroll(function (){
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function(){
    fadeAnime();/* アニメーション用の関数を呼ぶ*/
  });// ここまで画面が読み込まれたらすぐに動かしたい場合の記述
