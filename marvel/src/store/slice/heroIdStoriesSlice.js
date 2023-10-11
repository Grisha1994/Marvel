import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchHeroIdStories = createAsyncThunk(
    'heroIdStories/fetchHeroIdStories',
    async (id) => {
        const url = `http://gateway.marvel.com/v1/public/characters/${id}/stories?ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e`
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
)

const initialState = {
    list: [],
    status: "",
};

export const heroIdStoriesSlice = createSlice({
    name: 'heroIdStories',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchHeroIdStories.pending, (state) => {
            state.status = 'loding'
        })
        .addCase(fetchHeroIdStories.fulfilled, (state, {payload}) => {
            state.status = 'ready';
            state.list = payload.data.results;
        })
        .addCase(fetchHeroIdStories.rejected, (state) => {
            state.status = 'rejected'
        })
    }

})

export default heroIdStoriesSlice.reducer;