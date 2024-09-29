// src/store/MovieStore.ts

import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { Movie, ApiResponse } from '../models';
import { getApiPages, getMoviesToDisplay } from '../utils/paginationUtils';
import { getRandomSearchTerm } from '../utils/randomSearchUtils';

class MovieStore {
  movies: Movie[] = [];
  totalResults: number = 0;
  isLoading: boolean = false;
  searchTerm: string = '';
  displayedSearchTerm: string = '';
  currentPage: number = 1;
  resultsPerPage: number = 8;

  constructor() {
    makeAutoObservable(this);
    this.initializeSearch();
  }

  initializeSearch() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm && savedSearchTerm.trim() !== '') {
      this.setSearchTerm(savedSearchTerm);
      this.searchMovies(this.currentPage);
    } else {
      this.searchRandomMovies();
    }
  }

  setSearchTerm(term: string, saveToLocalStorage: boolean = true) {
    this.searchTerm = term;
    if (saveToLocalStorage) {
      if (term.trim() !== '') {
        localStorage.setItem('searchTerm', term);
      } else {
        localStorage.removeItem('searchTerm');
      }
    }
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  setDisplayedSearchTerm(term: string) {
    this.displayedSearchTerm = term;
  }

  setMovies(movies: Movie[]) {
    this.movies = movies;
  }

  setTotalResults(total: number) {
    this.totalResults = total;
  }

  setLoading(state: boolean) {
    this.isLoading = state;
  }

  async searchMovies(page: number = 1) {
    this.setLoading(true);
    try {
      const startIndex = (page - 1) * this.resultsPerPage + 1;
      const endIndex = page * this.resultsPerPage;

      const apiPages = getApiPages(startIndex, endIndex);

      const dataArray = await this.fetchMoviesFromApi(apiPages, this.searchTerm);

      runInAction(() => {
        this.displayedSearchTerm = this.searchTerm;

        if (dataArray.some((data) => data.Response === 'True')) {
          const allMovies = dataArray
            .filter((data) => data.Response === 'True')
            .flatMap((data) => data.Search);

          this.totalResults = parseInt(dataArray[0].totalResults);

          const moviesToDisplay = getMoviesToDisplay(
            allMovies,
            startIndex,
            apiPages[0],
            this.resultsPerPage
          );

          this.movies = moviesToDisplay;
        } else {
          this.movies = [];
          this.totalResults = 0;
        }
      });
    } catch (error) {
      console.error('Error fetching movies:', error);
      runInAction(() => {
        this.movies = [];
        this.totalResults = 0;
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }

  async searchRandomMovies() {
    const randomTerm = getRandomSearchTerm();
    this.setSearchTerm(randomTerm, false);
    await this.searchMovies(1);
  }

  private async fetchMoviesFromApi(apiPages: number[], searchTerm: string) {
    const promises = apiPages.map((apiPage) => fetchMovies(searchTerm, apiPage));
    const dataArray = await Promise.all(promises);
    return dataArray;
  }
}

export const movieStore = new MovieStore();

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const fetchMovies = async (searchTerm: string, page: number = 1) => {
  const response = await axios.get<ApiResponse>(API_URL!, {
    params: {
      apikey: API_KEY,
      s: searchTerm,
      page,
    },
  });
  return response.data;
};
