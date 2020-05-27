
const storage = {
  set(key, value) {
    localStorage.setItem(key, value.toString());
  },
  get(key) {
    return localStorage.getItem(key);
  },
  getItems(key) {
    const items = localStorage.getItem(key);
    if (!items) return [];
    return items.split(',');
  },
  isInStore(key, id) {
    return this.getItems(key).indexOf(id) >= 0;
  },
};

const cookie = {
  get(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  },
  set(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  },
  delCookie(cname) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = this.get(cname);
    if (cval != null) document.cookie = `${cname}=${cval};expires=${exp.toGMTString()}`;
  },
};

const commUtils = {
  /**
   * jsonp 请求方式
   * @param {object} opts 请求参数
   * @param {function} callback 请求成功回调函数
   * @param {function} errorCallback 请求失败回调函数
   */
  jsonp(opts, callback, errorCallback) {
    const initOpt = $.extend(true, {}, {
      method: 'GET',
      dataType: 'jsonp',
      contentType: 'application/json; charset=utf-8',
      timeout: 3000,
      success(res) {
        callback && callback(res);
      },
      error(res) {
        errorCallback && errorCallback(res);
      },
    }, opts);

    if (initOpt.dataType === 'jsonp') initOpt.headers = { 'Accept-Encoding': 'gzip' };
    const jsonp = $.ajax(initOpt);

    return jsonp;
  },
  /**
   * load jQuery加载数据的方法
   * 已经集成了memberId参数
   * @param {object} opt
   */
  load(opt) {
    let initOpt = {
      dataType: 'json',
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
    };
    initOpt = $.extend(true, initOpt, opt || {});
    const initData = $.extend(true, {
      memberId: this.getMemberId(),
    }, opt.data || {});

    if (initOpt.method === 'POST') {
      initOpt.data = JSON.stringify(initData);
    } else {
      initOpt.data = initData;
    }
    return $.ajax(initOpt);
  },
  // 科学计数转换数字
  eNotation(num) {
    const pv = parseInt(num, 10);

    if (Number.isNaN(pv)) return 0;

    return Math.floor(pv / 100000000) >= 1 ? `${(pv / 10000).toFixed(2)}亿` : Math.floor(pv / 10000) < 1 ? pv : `${(pv / 10000).toFixed(2)}万`; // eslint-disable-line no-nested-ternary
  },

  /**
   * 从地址栏中获取参数并返回json格式
   * @param {string} url 可选参数，可以从指定的地址中获取参数 默认为window.location
   * @returns {object} 返回分离后的所有参数
   */
  getUrlVars(url = window.location.href) { // 获取地址栏里的参数
    const vars = {};
    const hashes = url.slice(url.indexOf('?') + 1).split('&');
    hashes.forEach((item) => {
      const hash = item.split('=');
      const [key, value] = hash;
      vars[key] = value;
    });
    return vars;
  },
  getUrlParameter(key) {
    const params = this.getUrlVars();
    return decodeURIComponent(params[key] || '');
  },
  /** 判断是否为浏览器环境 &web=1 */
  isWeb() {
    const isWeb = this.getUrlParameter('web') === '1';
    return isWeb;
  },
  /**
   * 滚动到指定元素位置
   */
  scrollTo(el) {
    const position = (el && el.length > 0 ? el.offset().top : 0) - $('.menu-wrapper').height();

    if (el && $('body,html').scrollTop() < position) return;

    $('body,html').animate({
      scrollTop: position || 0,
    }, 100);
  },

};

export { storage, cookie, commUtils };
