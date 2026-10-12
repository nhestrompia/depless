import { debounce } from 'lodash';

export const searchImmediately = debounce(
  (query) => query.toUpperCase(),
  100,
  { leading: true, maxWait: 200 }
);
