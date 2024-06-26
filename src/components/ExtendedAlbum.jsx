import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import AlbumHeader from './AlbumHeader';
import AlbumActions from './AlbumActions';
import ImagesList from './ImagesList';
import AddImageForm from './AddImageForm';
import UpdateImageForm from './UpdateImageForm';
import styles from '../css/extendedAlbum.module.css';
import { addImageToFirebase, deleteImageFromFirebase, getImagesFromFirebase, updateImageToFirebase } from '../store/firebaseServices';
import { listenToAlbumChanges } from '../store/firebaseServices';

export default function ExtendedAlbum(props) {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState({ form: false, search: false });
    const [edit, setEdit] = useState({ isEditing: false, editImage: {} });
    const [search, setSearch] = useState({ results: [], showResults: false });
    const [imagesData, setImagesData] = useState([]);
    const hasImages = imagesData.length > 0;

    useEffect(() => {
        const albumId = props.album.id;

        dispatch(getImagesFromFirebase(albumId)).then(() => {
            const unsubscribe = listenToAlbumChanges(albumId, (newImagesData) => {
                setImagesData(newImagesData);
            });

            return () => unsubscribe();
        });
    }, [dispatch, props.album.id]);

    function handleToggleForm() {
        setToggle(prev => ({ form: !prev.form, search: false }));
    }

    function handleAddImage(title, imageUrl, album) {
        const timestamp = Date.now().toString();
        dispatch(addImageToFirebase({ id: album.id, imageData: { title, imageUrl, timestamp } }));
        setToggle(prev => ({ form: false, search: prev.search }));
    }

    function toggleSearchContainer() {
      setToggle(prev => ({ form: false, search: !prev.search }));
    }

    function handleToggleEditForm(imageUrl, title, id, index) {
        setEdit(prevState => ({ isEditing: !prevState.isEditing, editImage: { imageUrl, title, id, index } }));
    }

    function handleUpdateImage(title, imageUrl, id, index) {
        dispatch(updateImageToFirebase({ id, newData: { title, imageUrl, index } }));
        setEdit(prevState => ({ isEditing: !prevState.isEditing, editImage: prevState.editImage }));
    }

  function handleOnDeleteImage(id, timestamp) {
        dispatch(deleteImageFromFirebase({id, timestamp}));
        toast.success('Image deleted successfully!');
    }

  function handleDisplaySearchResults(searchVal) {
      if (!Array.isArray(imagesData)) {
            return;
      }
    
      if (searchVal !== '') {
        const result = imagesData.filter(image => image.title.toLowerCase().includes(searchVal.toLowerCase()));
          setSearch({ results: result, showResults: true });
      } else {
          console.log('hi', searchVal);
          setToggle(prevState => ({ form: true, search: prevState.search }))
          setSearch({ results: imagesData, showResults: false })
        }
        
  }
    
    return (
        <>
            <div id={styles.mainContainer}>
                <AlbumHeader onBack={props.onBack} album={props.album} hasImages={hasImages} />
                <AlbumActions hasImages={hasImages} toggleForm={toggle.form} handleToggleForm={handleToggleForm} toggleSearchContainer={toggleSearchContainer} showSearchInput={toggle.search} onSearchImage={handleDisplaySearchResults} />
            </div>
            {!toggle.search && toggle.form && <AddImageForm onAddImage={handleAddImage} album={props.album} />}
            {edit.isEditing && <UpdateImageForm onCancel={handleToggleEditForm} title={edit.editImage.title} editImageData={edit.editImage} onEditImage={handleUpdateImage} />}
            {!search.showResults && <ImagesList images={{ images: imagesData, id: props.album.id }} onEdit={handleToggleEditForm} onDelete={handleOnDeleteImage} />}
            {search.results.length > 0 && search.showResults && <ImagesList images={{images : search.results, id : props.album.id}} onEdit={handleToggleEditForm} onDelete={handleOnDeleteImage} />}
            <ToastContainer />
        </>
    );
}
