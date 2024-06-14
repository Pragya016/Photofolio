import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import styles from '../css/forms.module.css'
import { ToastContainer, toast } from 'react-toastify';

export default function UpdateImageForm(props) {
  const { editImageData } = props;
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const titleRef = useRef(null);

  function handleUpdateImage(e) {
    e.preventDefault();
    props.onEditImage(title, imageUrl, editImageData.id, editImageData.index);
    toast.success('Image updated successfully!')
    setTitle('')
    setImageUrl('');
    titleRef.current.focus();
  }


  function handleToggleForm(){
    // setTitle('')
    // setImageUrl('');
    // titleRef.current.focus();
    props.onCancel();
  }

  useEffect(() => {
    titleRef.current.focus();
    setTitle(editImageData.title);
    setImageUrl(editImageData.imageUrl)
  }, [editImageData.title, editImageData.imageUrl]);

  return (
    <div id={styles.container}>
      <form onSubmit={handleUpdateImage} id={styles.form}>
        <h2 id={styles.updateImageHeading}>{ props.title} Details</h2>
        
        <input
          type="text"
          id={styles.title}
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title"
        />

        <input
          type="url"
          id={styles.imageUrl}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter Image URL"
        />
        
        <div id={styles.buttonsContainer}>
          <Button
            id={styles.clearBtn}
            type='button'
            variant='contained'
            color='error'
            onClick={handleToggleForm}>Cancel</Button>
          
          <Button
            id={styles.addBtn}
            type='submit'
            variant='contained'
            color='primary'>Update</Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}
