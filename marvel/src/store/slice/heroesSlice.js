// import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// export const fetchHeroes = createAsyncThunk(
//     'heroes/fetchHeroes',
//     async (value, id) => {
//         console.log('value slice', value);
//         // console.log('id slice', id);
//         const url = value !== undefined ?
//         `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${value}&ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e`
//         :id.extra !== undefined ? `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e`
//         : 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e'
//         const res = await fetch(url)
//         const data = await res.json()
//         return data
//     }
// )

// const initialState = {
//     list: [],
//     status: "",
// };

// export const heroesSlice = createSlice({
//     name: 'heroes',
//     initialState,
//     reducers: {
//         filterAction(state, {payload}){
//             state.list.forEach(item => {
//                 item.show.search = item.name.toLowerCase().includes(payload.toLowerCase())
//             })
//         },
//     },

//     extraReducers: (builder) => {
//         builder
//         .addCase(fetchHeroes.pending, (state) => {
//             state.status = 'loding'
//         })
//         .addCase(fetchHeroes.fulfilled, (state, {payload}) => {
//             state.status = 'ready';
//             // state.list = payload.data.results;
//             state.list = payload.data.results.map((item) => ({
//                 ...item,
//                 show: { search: true },
//             }));
//         })
//         .addCase(fetchHeroes.rejected, (state) => {
//             state.status = 'rejected'
//         })
//     }

// })

// export const { filterAction } = heroesSlice.actions;

// export default heroesSlice.reducer;

import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async (value, id) => {
        console.log('value slice', value);
        // console.log('id slice', id);
        // const lettrs = value[0].toUpperCase();
        // console.log('lettrs slice', lettrs);
        
        const url = value !== undefined ?
        `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${value}&ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e`
        :id.extra !== undefined ? `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e`
        :`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${ value !== undefined ? value[0].toUpperCase() : 'A'}&ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e`
        // : 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=424ae629db1dc34aad8fdae51e9870fa&hash=62378746f01b982b7b81d9f7d8e6db8e'
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
)

const initialState = {
    list: [],
    status: "",
};

export const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        filterAction(state, {payload}){
            state.list.forEach(item => {
                item.show.search = item.name.toLowerCase().includes(payload.toLowerCase())
            })
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchHeroes.pending, (state) => {
            state.status = 'loding'
        })
        .addCase(fetchHeroes.fulfilled, (state, {payload}) => {
            state.status = 'ready';
            // state.list = payload.data.results;
            state.list = payload.data.results.map((item) => ({
                ...item,
                show: { search: true },
            }));
        })
        .addCase(fetchHeroes.rejected, (state) => {
            state.status = 'rejected'
        })
    }

})

export const { filterAction } = heroesSlice.actions;

export default heroesSlice.reducer;