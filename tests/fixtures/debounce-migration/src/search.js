import debounce from 'lodash/debounce.js';

export function createSearchScheduler(search) {
  const delayed = debounce((query) => search(query), 12);
  return {
    update: (query) => { delayed(query); },
    cancel: () => delayed.cancel(),
    flush: () => delayed.flush()
  };
}
