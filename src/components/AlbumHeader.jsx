import React from 'react';
import { IconButton } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import styles from '../css/extendedAlbum.module.css';

function AlbumHeader({ onBack, hasImages, album }) {
    return (
        <div id={styles.leftSide}>
            <IconButton id={styles.backBtn} variant="contained" color='primary' aria-label="back" size="large" onClick={onBack} >
                <ReplyIcon fontSize="large" />
            </IconButton>
            <h1 className={styles.heading}>{hasImages ? album.album : 'No images found in this album.'}</h1>
        </div>
    );
}

export default AlbumHeader;
