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
            shows: []
        }; 
    } ,

    actions: {
        async getAllTvShows() {
            const url = 'https://api.tvmaze.com/shows';
            const tvShows = await axios.get(url);
            this.shows.push(tvShows)
        }
    }
}) 
