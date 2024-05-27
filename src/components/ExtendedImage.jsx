import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import styles from '../css/ExtendedImage.module.css';

export default function ExtendedImage(props) {
    const src = props.imageUrl;

    return (<div id={styles.mainContainer}>
        {/* <Button variant='contained' id={styles.closeBtn} onClick={props.onClose}> */}
            <IconButton id={styles.closeBtn} color='error'>
            <CloseIcon onClick={props.onClose} color='error' />
            </IconButton>
        {/* </Button> */}
        <div id={styles.imgContainer} >
            <img id={styles.image} src={src} alt='img' />
        </div>
    </div>
    );
}
