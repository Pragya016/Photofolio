import React, { useRef, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../css/extendedAlbum.module.css';

function AlbumActions({ hasImages, toggleForm, toggleSearchContainer, handleToggleForm, showSearchInput, onSearchImage }) {
    const searchRef = useRef();
    const [value, setValue] = useState('')

    function handleSubmitSearch(e) {
        e.preventDefault();
        setValue(e.target.value);
        onSearchImage(e.target.value);
    }

    return (
        <div id={styles.rightSide}>
            {hasImages && (
                <>
                    <form className={`${styles.searchInput} ${showSearchInput ? styles.showSearchInput : ''}`}>
                        <input ref={searchRef} type="text" value={value} onChange={handleSubmitSearch}/>
                    </form>
                    <IconButton id={styles.searchBtn} variant="contained" color='primary' aria-label="search" size="large" onClick={toggleSearchContainer}>
                        <SearchIcon fontSize="inherit" />
                    </IconButton>
                </>
            )}
            {toggleForm ? (
                <Button variant='outlined' color='error' onClick={handleToggleForm}>Cancel</Button>
            ) : (
                <Button variant='outlined' color='primary' onClick={handleToggleForm}>Add Image</Button>
            )}
        </div>
    );
}

export default AlbumActions;
