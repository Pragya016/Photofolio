import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import styles from '../css/forms.module.css'
import { ToastContainer, toast } from 'react-toastify';

export default function AddImageForm(props) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const titleRef = useRef(null);  

  function handleAddImage(e) {
    e.preventDefault();
    if (title === '' || imageUrl === '') {
      toast.error("Input field can't be empty!")
      return;
    }

    props.onAddImage(title, imageUrl, props.album);    
    toast.success('Image added successfully!')
    setTitle('')
    setImageUrl('');
  }


  function handleClearInput(){
    setTitle('')
    setImageUrl('');
    titleRef.current.focus();
  }

  useEffect(() => {
    titleRef.current.focus();
  }, [])

  return (
    <div id={styles.container}>
      <form onSubmit={handleAddImage} id={styles.form}>
        <h2>Add image to {props.albumName}</h2>
        
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
            onClick={handleClearInput}>Clear</Button>
          
          <Button
            id={styles.addBtn}
            type='submit'
            variant='contained'
            color='primary'>Add</Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}
