import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import styles from '../css/ExtendedImage.module.css';

export default function ExtendedImage(props) {
    const src = props.imageData.imageUrl;
    const title = props.imageData.title;

    return (<div id={styles.mainContainer}>
        <div id={styles.header}>
            <h3 id={styles.title}>{title }</h3>
            <IconButton id={styles.closeBtn} onClick={props.onClose} color='error'>
            <CancelIcon id={styles.closeIcon} color='error' />
            </IconButton>
        </div>
        <div id={styles.imgContainer} >
            <img id={styles.image} src={src} alt='img' />
        </div>
    </div>
    );
}
