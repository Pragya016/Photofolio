import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import styles from '../css/ExtendedImage.module.css';

export default function ExtendedImage(props) {
    const src = props.imageUrl;

    return (<div id={styles.mainContainer}>
            <IconButton id={styles.closeBtn} onClick={props.onClose} color='error'>
            <CancelIcon id={styles.closeIcon} color='error' />
            </IconButton>
        <div id={styles.imgContainer} >
            <img id={styles.image} src={src} alt='img' />
        </div>
    </div>
    );
}
