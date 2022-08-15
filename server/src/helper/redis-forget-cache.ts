import Redis from 'ioredis';

export const forgetCacheDynaimc = async (prefix?: string, page = NaN) => {
  const _client = new Redis({});

  // prefix = explore-uni-page-#-isTop-false
  for (let i = 0; i <= 1000; i++) {
    if (prefix === 'explore-uni-page-#-isTop-false') {
      const keyData = prefix.replace('#', `${page ? page : i}`);

      if (keyData) {
        await _client.del(keyData);
      } else {
        break;
      }
    } else {
      const keyData = prefix.replace('#', `${i}`);

      if (keyData) {
        await _client.del(keyData);
      } else {
        break;
      }
    }
  }
};
