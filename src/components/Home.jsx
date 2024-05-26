import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAlbumForm from './AddAlbumForm'
import { useDispatch, useSelector } from 'react-redux';
import ExtendedAlbum from './ExtendedAlbum';
import { addAlbumToFirebase, getAlbumsFromFirebase } from '../store/firebaseServices';
import styles from '../css/toggleForm.module.css';
import AlbumList from './AlbumList';


export default function Home() {
    const [toggle, setToggle] = useState(false);
    const [showAlbum, setShowAlbum] = useState(false);
    const [albumData, setAlbumData] = useState('');
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums);
    
    useEffect(() => {
        dispatch(getAlbumsFromFirebase());
    }, [dispatch])


    function handleToggleForm() {
        setToggle(prevState => {
            return !prevState;
        });
    }

    async function handleAddAlbum(albumName) {
        try {
            dispatch(addAlbumToFirebase(albumName));
            toast.success('Album added successfully!');
            setToggle(prevState =>  !prevState);
        } catch (error) {
            toast.error('Something went wrong!');
            console.log(error);
        }
    }

    function handleDisplayAlbum(album) {
        setShowAlbum(true);
        setAlbumData(album);
    }

    function handleBackButton() {
        setShowAlbum(false)
    }

    return (
        <div>
            <ToastContainer />
            {!showAlbum ? <>
                {toggle && <AddAlbumForm onSubmit={handleAddAlbum} />}
            <div className={styles.container}>
                <h1>Add A New Album</h1>
                {toggle && <Button id={styles.addBtn} variant='outlined' color='error' startIcon={<HighlightOffIcon />} onClick={handleToggleForm}>Cancel</Button>}
                {!toggle && <Button id={styles.cancelBtn} variant='outlined' startIcon={<AddCircleIcon />} onClick={handleToggleForm}>Add Album</Button>}
                </div>
                <AlbumList albums={albums} onClick={handleDisplayAlbum} />
            </> : 
              <ExtendedAlbum album={albumData}  onBack={handleBackButton}/>  
            }
        </div>
    );
}
