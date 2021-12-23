import { magenta, blue, cyan, red, yellow } from 'chalk';

const tags = {
  producer: magenta('[PRODUCER]'),
  consumer: blue('[CONSUMER]'),
  admin: yellow('[ADMIN]'),
  metric: cyan('[metric]'),
  error: red('[ERROR]'),
};

export const logger = {
  consumer: {
    metric: (msg: string) =>
      console.log(`${tags.consumer}${tags.metric} - ${msg}`),
    info: (msg: string) => console.log(`${tags.consumer} - ${msg}`),
    error: (msg: string) =>
      console.log(`${tags.consumer}${tags.error} - ${msg}`),
  },
  producer: {
    metric: (msg: string) =>
      console.log(`${tags.producer}${tags.metric} - ${msg}`),
    info: (msg: string) => console.log(`${tags.producer} - ${msg}`),
    error: (msg: string) =>
      console.log(`${tags.producer}${tags.error} - ${msg}`),
  },
  admin: {
    info: (msg: any) => console.log(`${tags.admin}`, msg),
    error: (msg: any) => console.log(`${tags.admin}${tags.error}`, msg),
  },
  getFormattedTimestamp: (timestamp: number) => {
    const t = new Date(timestamp);
    return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
  },
};
