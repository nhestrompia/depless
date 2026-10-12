import { debounce } from 'lodash';
import * as lodash from 'lodash';
import axios from 'axios';

export const delayedSearch = debounce(async (query) => {
  const response = await axios.get(`/search?q=${encodeURIComponent(query)}`);
  return lodash.get(response, 'data.results', []);
}, 200);
