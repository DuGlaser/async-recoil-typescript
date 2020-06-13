import { atom, selector } from 'recoil';
import { movieApi } from '../api/client';

const initSearchState: string = '';

export const searchState = atom({
  key: 'searchState',
  default: initSearchState,
});

export const searchResult = selector({
  key: 'searchResult',
  get: async ({ get }) => {
    const data = await movieApi.index({ params: { s: get(searchState) } });
    return data;
  },
});
