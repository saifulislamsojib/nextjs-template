import configs from '@/configs';
import Fetcher from '@/lib/fetcher';

const { IS_CLIENT, API_BASE_URL } = configs;

const request = new Fetcher(API_BASE_URL, IS_CLIENT ? 20000 : 0);

if (IS_CLIENT) {
  request.setDefaultConfigs({ credentials: 'include' });
}

export const { dataExtractor } = Fetcher;

export default request;
