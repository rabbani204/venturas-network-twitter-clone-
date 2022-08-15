import Redis from 'ioredis';

export const forgetCacheStatic = async (key?: string) => {
  const _client = new Redis({});

  await _client.del(key);
};
