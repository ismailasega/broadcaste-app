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
            showDetails: null,
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
         */
        async searchShowsByName(showName) {
            const url = `https://api.tvmaze.com/search/shows?q=${showName}`;
            try {
                const filteredTvShows = await axios.get(url);
                this.shows = filteredTvShows.data;
            } catch (error) {
                this.error = error
            }
        },

        /**
         * 
         * @param {*} id 
         */
        async getTvShowDetails(id) {
            const url = `https://api.tvmaze.com/shows/${id}`;
            this.isLoading = true
            try {
                const tvShowDetails = await axios.get(url);
                this.showDetails = tvShowDetails.data;
                this.isLoading = false;
            } catch (error) {
                this.error = error
                this.isLoading = false;
            }
        }
    }
}) 
