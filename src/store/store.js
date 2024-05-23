import { configureStore } from "@reduxjs/toolkit";
import albumReducer from './slices/albumSlice';
import imageReducer from './slices/imageSlice';
import {thunk} from 'redux-thunk';

const store = configureStore({
    reducer: {
        albums: albumReducer,
        images: imageReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export default store;
