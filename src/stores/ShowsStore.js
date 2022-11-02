// * @Author: Ismail Debele Asega
// * @Email: asega03@gmail.com
// * @LinkedIn: https://www.linkedin.com/in/asegaismail/
// * @Github: https://github.com/ismailasega
// * @GitLab: https://gitlab.com/asegaismail
// * @Tel: +256-784-491412 / +256-756-454376

import { defineStore } from "pinia";
import axios from "axios";

export const useShowsStore = defineStore('ShowsStore', {
    state: () => {
        return {
            shows: [],
            searchData: [],
            isLoading: false,
            error: null,
        };
    },

    actions: {
        /**
         * 
         * getting all TvShows on Page 1
         */
        async getAllTvShows() {
            const url = 'https://api.tvmaze.com/shows?page=1';
            this.error = null;
            this.isLoading = true
            try {
                const tvShows = await axios.get(url);
                this.shows = tvShows.data;
                this.isLoading = false;
            } catch (error) {
                this.error = error
                this.isLoading = false;
            }
        },

        /**
         * 
         * getting all TvShows to cater for the search and filter
         */
         async getAllSearchableTvShows() {
            const url = 'https://api.tvmaze.com/shows';
            this.error = null;
            try {
                const tvShows = await axios.get(url);
                this.searchData = tvShows.data;
            } catch (error) {
                this.error = error
            }
        },

        /**
         * 
         * @param {*} showName
         * Searching by show name
         */
        async searchShowsByName(showName) {
            this.shows = [];
            this.error = null;
            const url = `https://api.tvmaze.com/search/shows?q=${showName}`;
            this.isLoading = true
            try {
                const filteredTvShows = await axios.get(url);
                this.shows = filteredTvShows.data;
                this.isLoading = false;
            } catch (error) {
                this.error = error
                this.isLoading = false;
            }
        },

    }
}) 
