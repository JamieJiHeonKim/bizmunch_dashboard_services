import axios from 'axios';
import { ApiConfig } from '../@types/index';
import { validationException } from '../components/utils/apiErrorHandler';


axios.defaults.responseType = 'json';
axios.defaults.withCredentials = true;

/**
 * URLレファレンスのJSON内のURLの改変
 * @param {String} url
 * @param {Oject} params 返還したいURLパラメーター
 */
function formatUrl(url: string, params: any) {
  if (!params) return url;

  const prefix = '/:(.+?)(/|$)';
  const re = new RegExp(prefix, 'g');

  if ((url.match(re) || []).length !== Object.keys(params).length) {
    throw Error('Insufficinet (or) excess parameters while formating API URL');
  }

  return url.replace(re, (...p) => `/${params[p[1]]}${p[2]}`);
}

export const callApi = async (config: ApiConfig) => {
  try {
    const { url, urlParams } = config;

    if (!url) throw validationException(new Error('ApiConfig must contain url'));

    config.url = formatUrl(url, urlParams);

    const response = await axios(config);

    return Promise.resolve(<any>response.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
