import { debounce } from 'lodash';

export function scheduleSearch(search) {
  const delayed = debounce((query) => {
    search(query);
  }, 100);

  return {
    update: (query) => delayed(query),
    cancel: () => delayed.cancel()
  };
}
