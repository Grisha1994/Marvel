import { configureStore } from "@reduxjs/toolkit";
import heroesReducer from './slice/heroesSlice'
import heroIdComicsReducer from "./slice/heroIdComicsSlice";
import heroIdEventsReducer from "./slice/heroIdEventsSlice";
import heroIdSeriesReducer from "./slice/heroIdSeriesSlice";
import heroIdStoriesReducer from "./slice/heroIdStoriesSlice";
import comicsReducer from "./slice/comicsSlise";

export const store = configureStore({
    reducer: {
        heroes: heroesReducer,
        heroIdComics: heroIdComicsReducer,
        heroIdEvents: heroIdEventsReducer,
        heroIdSeries: heroIdSeriesReducer,
        heroIdStories: heroIdStoriesReducer,
        comics: comicsReducer,

    }
})