import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia, createPinia } from 'pinia';
import { useShowsStore } from '../stores/ShowsStore';
import Header from '../components/Layout/Header.vue';
import SearchBar from '../components/Layout/SearchBar.vue'
import TvShows from '../components/TvShows.vue'

/**
 *
 *  Testing pinia store application manager
 */
describe('Should be able to check array state and return data', () => {
  beforeEach(() => {
    /**
     * creating a fresh pinia and making it active so as it is automatically picked
     * up by any useShowsStore() call without having to pass it to it: `useShowsStore(pinia)`
     */
    setActivePinia(createPinia());
  })

  it.concurrent('Should returns Tv Shows on page 1', async () => {
    const tvShowsList = useShowsStore();
    expect(tvShowsList.shows).toEqual([]);
    await tvShowsList.getAllTvShows();
    expect(tvShowsList.shows.length > 0).toBeTruthy();
  })

  it.concurrent('Should returns all Tv Shows', async () => {
    const tvShowsList = useShowsStore();
    expect(tvShowsList.searchData).toEqual([]);
    await tvShowsList.getAllSearchableTvShows();
    expect(tvShowsList.searchData.length > 0).toBeTruthy();
  })

  it.concurrent('Should be able to return response of meatching search', async () => {
    let searchData = "Kirby Buckets";
    const tvShowsList = useShowsStore();
    await tvShowsList.searchShowsByName(searchData);
    expect(tvShowsList.shows.length >= 1).toBeTruthy();
  })
})

/**
 *
 *  Testing header component
 */
describe("Should render Header Component", () => {
  it("Should check for text on render", () => {
    const wrapper = shallowMount(Header);
    const header = wrapper.find('h1').text();
    const button = wrapper.find('button').text();
    expect(header).toEqual('BROADCASTER');
    expect(button).toEqual("Create Account")
  })
})

/**
 *
 *  Testing search bar component
 */
describe('Render Search Bar Component', () => {
  it('selectedShowName method', () => {
    const wrapper = shallowMount(SearchBar)
    const searchKeyword = "Kirby Buckets"
    wrapper.vm.selectedShowName(searchKeyword)
    expect(wrapper.vm.keyword).toBe(searchKeyword.name) 
  })
})

/**
 *
 *  Testing Tv Shows Listing and show details component
 */
 describe('Should render Tv shows component and trigger rendering showDetail Modal', () => {
  it('trigger a click to open showDetails modal', async () => {
    const wrapper = shallowMount(TvShows)
    wrapper.find({ ref: "getSelected" }).trigger("click");
    var result = await wrapper.vm.isShowDetailsModal
    expect(result).toBeTruthy();
  })
})

