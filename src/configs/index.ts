const IS_CLIENT = typeof window !== 'undefined';

const configs = Object.freeze({
  APP_ENV: (process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV) as
    | 'development'
    | 'production'
    | 'test'
    | 'staging',
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // do not conditional render in react component using this
  IS_CLIENT,
});

export default configs;
