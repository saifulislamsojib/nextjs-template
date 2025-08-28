import configs from '@/configs';
import fetcher from 'fetcher-lite';

const { IS_CLIENT, API_BASE_URL } = configs;

fetcher.setFetcherOptions({
  baseUrl: API_BASE_URL,
  timeout: IS_CLIENT ? 20000 : 0,
});

if (IS_CLIENT) {
  fetcher.setDefaultConfigs({ credentials: 'include' });
}

export default fetcher;
