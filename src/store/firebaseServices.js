// firebaseServices.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebaseInit";
import { collection, addDoc, doc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore';

const albumsCollection = collection(db, 'albums');

export const addImageToFirebase = createAsyncThunk(
    'images/addImageToFirebase',
    async ( {id, imageData }, thunkAPI) => {
        try {
            const docRef = doc(db, 'albums', id);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                throw new Error('Album not found');
            }

            const albumData = docSnap.data();
            const updatedImages = albumData.imagesData ? [...albumData.imagesData, imageData] : [imageData];

            await updateDoc(docRef, { imagesData: updatedImages });
            return { id, imagesData: updatedImages };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateImageToFirebase = createAsyncThunk(
    'images/updateImageToFirebase',
    async ({ id, newData }, thunkAPI) => {
        try {
            const docRef = doc(db, 'albums', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const albumData = docSnap.data();
                if (albumData.imagesData && albumData.imagesData[newData.index]) {
                    albumData.imagesData[newData.index] = newData;

                    await updateDoc(docRef, { imagesData: albumData.imagesData });
                } else {
                    throw new Error('Image data does not exist at the provided index');
                }
            } else {
                throw new Error('Album does not exist');
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const addAlbumToFirebase = createAsyncThunk(
    'albums/addAlbumToFirebase',
    async (albumName, thunkAPI) => {
        try {
            const docRef = await addDoc(albumsCollection, { album: albumName });
            return { album: albumName, id: docRef.id };
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);


export const getAlbumsFromFirebase = createAsyncThunk(
    'albums/getAlbumsFromFirebase',
    async (_, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onSnapshot(albumsCollection, (querySnapshot) => { 
                let albums = [];
                querySnapshot.forEach((doc) => {
                    albums.push({ id: doc.id, ...doc.data() });
                });
                resolve(albums);
            }, (error) => {
                reject(thunkAPI.rejectWithValue(error.message));
            });

            return unsubscribe;
        });
    }
);

export const getOneAlbumFromFirebase = createAsyncThunk(
    'albums/getOneAlbumFromFirebase',
    async (id, thunkAPI) => {
        return new Promise((resolve, reject) => {
            const docRef = doc(db, 'albums', id);
            const unsubscribe = onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    resolve({ id: docSnap.id, ...docSnap.data() });
                } else {
                    reject(thunkAPI.rejectWithValue('Album not found'));
                }
            }, (error) => {
                reject(thunkAPI.rejectWithValue(error.message));
            });

            return unsubscribe;
        });
    }
);

export const deleteImageFromFirebase = createAsyncThunk(
    'albums/deleteImageFromFirebase',
    async (imageData, thunkAPI) => {
        try {
            const docRef = doc(db, 'albums', imageData.id);
            const docSnap = await getDoc(docRef);

            const albumData = docSnap.data();
            const updatedImagesData = albumData.imagesData.filter((image) => (
                image.timestamp !== imageData.timestamp
            ));

            console.log(albumData.imagesData[0].timestamp , imageData.timestamp);
            await updateDoc(docRef, { imagesData: updatedImagesData });
            return imageData;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getImagesFromFirebase = createAsyncThunk(
    'images/getImagesFromFirebase',
    async (id, thunkAPI) => {
        const albumNameToFetch = id;
        const state = thunkAPI.getState();
        const desiredAlbum = state.albums.find(album => album.id === albumNameToFetch);

        if (desiredAlbum) {
            return new Promise((resolve, reject) => {
                const docRef = doc(db, 'albums', albumNameToFetch);
                const unsubscribe = onSnapshot(docRef, (docSnap) => { // onSnapshot used here
                    if (docSnap.exists()) {
                        const images = docSnap.data().imagesData || [];
                        resolve({ id: albumNameToFetch, imagesData: images });
                    } else {
                        reject(thunkAPI.rejectWithValue('Album not found'));
                    }
                }, (error) => {
                    reject(thunkAPI.rejectWithValue(error.message));
                });

                // Optional: return unsubscribe function to stop listening
                return unsubscribe;
            });
        } else {
            console.log(`Album "${albumNameToFetch}" not found in payload`);
            return thunkAPI.rejectWithValue('Album not found');
        }
    }
);

export const listenToAlbumChanges = (albumId, callback) => {
    const docRef = doc(db, 'albums', albumId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            const albumData = docSnap.data();
            const imagesData = albumData.imagesData || [];
            callback(imagesData);
        } else {
            console.error('Album does not exist');
            callback([]);
        }
    });

    return unsubscribe;
};


// code to delete album from Database
// export const deleteImageFromFirebase = createAsyncThunk(
//     'albums/deleteImageFromFirebase',
//     async (id, thunkAPI) => {
//         try {
//             const docRef = doc(db, 'albums', id);
//             const docSnap = await deleteDoc(docRef);
//             return id;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// );



// export const getImagesFromFirebase = createAsyncThunk(
//     'images/getImagesFromFirebase',
//     async (_, thunkAPI) => {
//         try {
//             const querySnapshot = await getDocs(albumsCollection);
//             let images = [];
//             querySnapshot.forEach((doc) => {
//                 images.push({ id: doc.id, ...doc.data() });
//             });
//             return images;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.message);
//         }
//     }
// )
