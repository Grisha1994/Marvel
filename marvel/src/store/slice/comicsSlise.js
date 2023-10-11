import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchComics = createAsyncThunk(
    'comics/fetchComics',
    async () => {
        // const url = id ? `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e`
        // : 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e'
        const res = await fetch('https://gateway.marvel.com/v1/public/comics?ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e')
        const data = await res.json()
        return data
    }
)

const initialState = {
    list: [],
    status: "",
};

export const comicsSlice = createSlice({
    name: 'comics',
    initialState,
    reducers: {
        // filterAction(state, {payload}){
        //     state.list.forEach(item => {
        //         item.show.search = item.name.toLowerCase().includes(payload.toLowerCase())
        //     })
        // },
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchComics.pending, (state) => {
            state.status = 'loding'
        })
        .addCase(fetchComics.fulfilled, (state, {payload}) => {
            state.status = 'ready';
            // state.list = payload.data.results;
            state.list = payload.data.results.map((item) => ({
                ...item,
                show: { search: true },
            }));
        })
        .addCase(fetchComics.rejected, (state) => {
            state.status = 'rejected'
        })
    }

})

export const { filterAction } = comicsSlice.actions;

export default comicsSlice.reducer;