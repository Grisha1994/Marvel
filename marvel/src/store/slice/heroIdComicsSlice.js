import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchHeroIdComics = createAsyncThunk(
    'heroIdComics/fetchHeroIdComics',
    async (id) => {
        const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e`
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
)

const initialState = {
    list: [],
    status: "",
};

export const heroIdComicsSlice = createSlice({
    name: 'heroIdComics',
    initialState,
    reducers: {

    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchHeroIdComics.pending, (state) => {
            state.status = 'loding'
        })
        .addCase(fetchHeroIdComics.fulfilled, (state, {payload}) => {
            state.status = 'ready';
            state.list = payload.data.results;
        })
        .addCase(fetchHeroIdComics.rejected, (state) => {
            state.status = 'rejected'
        })
    }

})

export default heroIdComicsSlice.reducer;