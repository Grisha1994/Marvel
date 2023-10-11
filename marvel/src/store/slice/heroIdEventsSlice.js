import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchHeroIdEvents = createAsyncThunk(
    'heroIdEvents/fetchHeroIdComics',
    async (id) => {
        const url = `http://gateway.marvel.com/v1/public/characters/${id}/events?ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e`
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
)

const initialState = {
    list: [],
    status: "",
};

export const heroIdEventsSlice = createSlice({
    name: 'heroIdEvents',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchHeroIdEvents.pending, (state) => {
            state.status = 'loding'
        })
        .addCase(fetchHeroIdEvents.fulfilled, (state, {payload}) => {
            state.status = 'ready';
            state.list = payload.data.results;
        })
        .addCase(fetchHeroIdEvents.rejected, (state) => {
            state.status = 'rejected'
        })
    }

})

export default heroIdEventsSlice.reducer;