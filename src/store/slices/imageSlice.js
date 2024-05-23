import { createSlice } from "@reduxjs/toolkit";
import {
    addImageToFirebase,
    deleteImageFromFirebase,
    getImagesFromFirebase,
    updateImageToFirebase
} from "../firebaseServices";

const imageSlice = createSlice({
    name: 'image',
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addImageToFirebase.fulfilled, (state, action) => {
            return action.payload
        });

        builder.addCase(updateImageToFirebase.fulfilled, (state, action) => {
            return action.payload;
        });

        builder.addCase(getImagesFromFirebase.fulfilled, (state, action) => {
            return action.payload;
        });

        builder.addCase(deleteImageFromFirebase.fulfilled, (state, action) => {
            return action.payload
        });
    }
})

export default imageSlice.reducer;

// filterImages(state, action) {
//     const filterText = action.payload.toLowerCase();
//     const result = state.filter(image => image.title.toLowerCase().includes(filterText));
//     console.log(result);
//     return result;
// },
// updateImage(state, action) {
//     const { id, newData } = action.payload;
//     return state.map(image => {
//         if (image.id === id) {
//             return { ...image, ...newData };
//         }
//         return image;
//     });
// },
// deleteImage(state, action) {
//     return state.filter(image => image.id !== action.payload);
// }