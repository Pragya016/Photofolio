import React, { useState } from 'react'
import styles from '../css/imagesList.module.css';
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExtendedImage from './ExtendedImage';

export default function ImagesList(props) {
  const [toggleImage, setToggleImage] = useState(false);
  const [image, setImage] = useState('');
  const { images, id } = props.images;  
  const hasImages = images.length > 0;
  const imageStyles = { backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }
  
  function handleToggleImage(timestamp, imageUrl) {
    setToggleImage(prevState => !prevState);
    setImage(imageUrl);
  }

  return (
    <>
      {toggleImage ? <ExtendedImage imageUrl={image} onClose={handleToggleImage} /> :
      <div id={styles.imagesBox}>
      { hasImages && images.map((data, i) => (
        <div className={styles.imageBox} key={i}>
              <div className={styles.buttonsContainer }>
                <IconButton className={styles.deleteBtn} variant="contained" color='error' aria-label="delete" size="large" onClick={() => props.onDelete(id, images[i].timestamp)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                <IconButton className={styles.editBtn} variant="contained" color='primary' aria-label="delete" size="large" onClick={() => props.onEdit(data.imageUrl, data.title, id, i)}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </div>
          <div className={styles.image} style={{background : `url(${data.imageUrl})`, ...imageStyles}} onClick={() => handleToggleImage(data.timestamp, data.imageUrl)}/>
          <p className={styles.title} >{data.title}</p>
          </div>
      ))}
      </div>
      }
    </>
  )
}
