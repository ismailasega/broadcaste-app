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
            isLoading: false,
            error: null,
        };
    },

    actions: {
        /**
         * 
         * getting all TvShows
         */
        async getAllTvShows() {
            this.error = null;
            const url = 'https://api.tvmaze.com/shows?page=1';
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
