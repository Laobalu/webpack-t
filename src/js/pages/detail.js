import '@/style/detail.less';
import {
  commBind, actionEnum, fixedIdEnum,
} from '@/js/common/dataSchema';
import api from '@/js/api';
import {
  pageUtils, rptUtils, startUtils,
} from '@/js/utils/pageUtils';
import detailTemplate from '@/js/widgets/detail';
import '../common/main';

const pageSign = 3;
const { getReportData } = rptUtils;

let modalSwiper = null;

const silderModal = {
  init: (initPic) => pageUtils.renderGames({
    data: [],
    widgetName: 'bannerSwiper',
    el: '.detail-slider-modal-wrapper',
    className: 'detail-silder',
    page: pageSign,
    template: detailTemplate.modalSlider,
    swiperOpt: {
      loop: true,
      initialSlide: initPic,
      autoplay: false,
      observer: true,
      observeParents: true,
      pagination: {
        el: '.swiper-pagination',
        bulletClass: 'sw-bullet',
        clickable: true,
      },
      navigation: {
        nextEl: '.detail-slider-modal-wrapper .swiper-button-next',
        prevEl: '.detail-slider-modal-wrapper .swiper-button-prev',
      },
    },
    onInit() {
      console.log(initPic);
    },
  }),
};

// 头部轮播
const galleryThumbs = {
  init() {
    const that = this;
    pageUtils.renderGames({
      data: [],
      widgetName: 'bannerSwiper',
      el: '.detail-swiper-thumbs-wrapper',
      className: 'gallery-thumbs',
      page: pageSign,
      template: detailTemplate.swiperThumbs,
      swiperOpt: {
        spaceBetween: 10,
        slidesPerView: 4,
        loop: true,
        freeMode: true,
        autoplay: false,
        loopedSlides: 5,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: '.gallery-thumbs-box .swiper-button-next',
          prevEl: '.gallery-thumbs-box .swiper-button-prev',
        },
      },
      onInit() {
      },
      onClick(swiper, el, node, type) {
        const index = _.toNumber(el[0].dataset.swiperSlideIndex);
        if (type === 'game-item') {
          that.control(index);
        }
      },
    });
  },
  // 控制modalSwiper
  control(index) {
    if (!modalSwiper) {
      // 初始化位置
      silderModal.init(index)
        .then((instance) => {
          modalSwiper = instance.swiper;
          $('#sliderModal').modal('show');
        });
    } else {
      // 初始化后选中位置
      modalSwiper.slideTo(index + 1);
      $('#sliderModal').modal('show');
    }
  },
};


const provide = {
  init: () => pageUtils.renderGames({
    data: [],
    widgetName: 'gamelist',
    el: '.detail-provide-wrapper',
    page: pageSign,
    template: detailTemplate.provide,
  }),
};

const gameinfo = {
  init: () => pageUtils.renderGames({
    data: [],
    widgetName: 'gamelist',
    el: '.detail-gameinfo-wrapper',
    page: pageSign,
    template: detailTemplate.gameinfo,
  }),
};

const gameintro = {
  init: () => pageUtils.renderGames({
    data: [],
    widgetName: 'gamelist',
    el: '.detail-intro-wrapper',
    page: pageSign,
    template: detailTemplate.intro,
  }),
};

const flow = {
  init() {
    pageUtils.renderGames({
      api: api.recommend(),
      widgetName: 'gamelist',
      el: '.flow-wrapper',
      page: pageSign,
      template: detailTemplate.flow,
      bindItemData: commBind.app,
      onInit(node, data) {
      },
      onClick(el, node, type, data) {
      },
    });
  },
};

const flowTab = {
  init: () => pageUtils.renderGames({
    data: [],
    widgetName: 'gamelist',
    el: '.flow-tabs-hd-wrapper',
    page: pageSign,
    template: detailTemplate.flowTab,
  }),
};
const getParams = function (params) {
  const initParams = {
    pageNum: 0,
    pageSize: 20,
    kick: 1,
    type1: '',
    type2: '',
    topics: '',
  };
  return { ...initParams, ...params };
};

const live = {
  init: () => pageUtils.renderGames({
    api: api.recommend(getParams({ kick: 2, type1: '8' })),
    widgetName: 'bannerSwiper',
    el: '.flow-live-wrapper',
    page: pageSign,
    template: detailTemplate.live,
    className: 'live-swiper-container',
    swiperOpt: {
      spaceBetween: 10,
      slidesPerView: 4,
      loop: true,
      freeMode: true,
      autoplay: false,
      loopedSlides: 5,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.live-video .swiper-button-next',
        prevEl: '.live-video .swiper-button-prev',
      },
    },
    onInit(node, data) {
    },
    onClick(el, node, type, data) {
    },
  }),
};
const newsList = {
  init: () => pageUtils.renderGames({
    data: [],
    widgetName: 'gamelist',
    el: '.newslist-wrapper',
    page: pageSign,
    template: detailTemplate.newsList,
  }),
};

const provideModal = {
  init: () => pageUtils.renderGames({
    data: [],
    widgetName: 'gamelist',
    el: '.detail-provide-modal-wrapper',
    page: pageSign,
    template: detailTemplate.modalProvide,
  }),
};

const configModal = {
  init: () => pageUtils.renderGames({
    data: [],
    widgetName: 'gamelist',
    el: '.detail-config-modal-wrapper',
    page: pageSign,
    template: detailTemplate.modalConfig,
  }),
};

const newsModal = {
  init: () => pageUtils.renderGames({
    data: [],
    widgetName: 'gamelist',
    el: '.detail-news-modal-wrapper',
    page: pageSign,
    template: detailTemplate.modalNews,
  }),
};

galleryThumbs.init();
//   .then((instance) => {
//     console.log(instance);
//     const thumbs = instance.swiper;
//     // swiper.init(thumbs);
//   });
provide.init();
gameinfo.init();
gameintro.init();
flowTab.init();
flow.init();
live.init();
newsList.init();
provideModal.init();
configModal.init();
newsModal.init();
// silderModal.init()
//   .then((instance) => {
//     console.log(instance);
//     const modalSwiper = instance.swiper;
//     galleryThumbs.init(modalSwiper);
//   });
