import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchHeroIdSeries = createAsyncThunk(
    'heroIdSeries/fetchHeroIdSeries',
    async (id) => {
        const url = `http://gateway.marvel.com/v1/public/characters/${id}/series?ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e`
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
)

const initialState = {
    list: [],
    status: "",
};

export const heroIdSeriesSlice = createSlice({
    name: 'heroIdSeries',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchHeroIdSeries.pending, (state) => {
            state.status = 'loding'
        })
        .addCase(fetchHeroIdSeries.fulfilled, (state, {payload}) => {
            state.status = 'ready';
            state.list = payload.data.results;
        })
        .addCase(fetchHeroIdSeries.rejected, (state) => {
            state.status = 'rejected'
        })
    }

})

export default heroIdSeriesSlice.reducer;