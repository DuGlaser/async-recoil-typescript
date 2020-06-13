import axios, { AxiosResponse } from 'axios';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

interface MovieResponse {
  Response: 'True' | 'False';
  Search?: Movie[];
  totalResults?: string;
  Error?: string;
}

const client = axios.create({
  baseURL: process.env.REACT_APP_OMDB_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface paramsProps {
  url?: string;
  params: {
    s: string;
    type?: 'movie' | 'series' | 'episode';
    y?: number;
  };
}

export const sendGet = async ({ url = '', params }: paramsProps) => {
  return client
    .get(url, {
      params,
    })
    .then((response: AxiosResponse) => response.data);
};

export const movieApi = {
  async index({ url, params }: paramsProps) {
    const data: MovieResponse = await sendGet({ url, params });
    if (data.Search) {
      // imdbIDの被りをなくす
      const filterSearch = data.Search.filter(
        (movie: Movie, index: number, self: Movie[]) => {
          return (
            self.findIndex((item: Movie) => item.imdbID === movie.imdbID) ===
            index
          );
        }
      );

      return {
        ...data,
        Search: filterSearch,
      };
    }

    return data;
  },
};
