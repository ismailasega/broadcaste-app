import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import TvShows from "../components/TvShows.vue";
import { setActivePinia, createPinia } from 'pinia'
import { useShowsStore } from '../stores/ShowsStore'


// test("Store is referenced via TvShows component", () => {
//   const wrapper = mount(TvShows, {
//       global: {
//           plugins: [createTestingPinia()],
//       },
//   });
//   const store = useShowsStore();
//   store.shows = [];
 
//   console.log(wrapper.text());
//  });

describe('Should be able to check array state and return data', () => {
  beforeEach(() => {
    /**
     * creating a fresh pinia and making it active so as it is automatically picked
     * up by any useShowsStore() call without having to pass it to it: `useShowsStore(pinia)`
     */
    setActivePinia(createPinia());
  })

  it.concurrent('Should returns Tv Shows', async () => {
    const tvShowsList = useShowsStore();
    expect(tvShowsList.shows).toEqual([]);
    await tvShowsList.getAllTvShows();
    let data = tvShowsList.shows;
    expect(tvShowsList.shows.length > 0).toBeTruthy();
  })

  it.concurrent('Should be able to return response', async () => {
    let searchData = "Kirby Buckets";
    const tvShowsList = useShowsStore();
    await tvShowsList.searchShowsByName(searchData);
    expect(tvShowsList.shows.length >= 1).toBeTruthy();
  })
})