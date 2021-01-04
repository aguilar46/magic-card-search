import axios from 'axios';
import _ from 'lodash';

const api = axios.create({ baseURL: 'https://api.scryfall.com' });

export const doSearch = (term) =>
  api.get('cards/search', { params: { q: term } });

const getSymbologyRequest = () => api.get('symbology');

let symbologyCache = null;

const getSymbology = () => {
  if (!symbologyCache) {
    symbologyCache = getSymbologyRequest().then(({ data }) =>
      data.data.reduce((acc, item) => ({ ...acc, [item.symbol]: item }), {})
    );
  }

  return symbologyCache;
};

export const getSymbol = (symbol) =>
  getSymbology().then((symbology) => symbology[symbol]);
