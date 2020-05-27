// 项目大可以每个页面对应一个请求文件，项目小可以写在一个文件里
import axios from 'axios';
import { commUtils } from '../utils/commUtils';

/**
 * 请求封装
 * @param {string} url 请求地址
 * @param {object} params 请求参数
 * @param {string} method 请求类型，默认为get
 */
const load = (url, params, method = 'get') => {
  const baseUrl = process.env.NODE_ENV === 'development' ? '/' : appConfig.apiUrl;
  const initParams = {
    memberId: commUtils.getMemberId(),
    token: commUtils.getToken(),
  };

  const reqParam = { ...initParams, ...params };
  const instance = axios.create({
    baseURL: baseUrl,
    method,
    timeout: 1000,
  });
  const data = method === 'get' ? { params: reqParam } : { data: reqParam };

  return instance(url, data);
};

const toolApi = {
  searchRecommendList: (params) => load('/api/v2/searchRecommendList', params),
  feedback: (params) => load('/web/api/submitFeedback', params),
};

const apiConfig = {
  ...toolApi,
};

export default apiConfig;
