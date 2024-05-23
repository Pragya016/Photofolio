import { createSlice } from "@reduxjs/toolkit";
import { addAlbumToFirebase, getAlbumsFromFirebase, getOneAlbumFromFirebase } from "../firebaseServices";

const albumSlice = createSlice({
    name: 'albumSlice',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAlbumToFirebase.fulfilled, (state, action) => {
            state.push(action.payload);
        })

        builder.addCase(getAlbumsFromFirebase.fulfilled, (state, action) => {
            return action.payload;
        });

        builder.addCase(getOneAlbumFromFirebase.fulfilled, (state, action) => {
            const album = action.payload;
            const index = state.findIndex(alb => alb.id === album.id);
            if (index !== -1) {
                // state.album.push(album); 
            } else {
                // state.push(album); 
            }
        });

    }
});

export default albumSlice.reducer; 
