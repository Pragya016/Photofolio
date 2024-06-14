import React, { useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material'
import styles from '../css/addAlbumForm.module.css'

export default function AddAlbumForm(props) {
    const inputRef = useRef();

    function handleClearInput(e) {
        inputRef.current.value = '';
        inputRef.current.focus();
    }

    function handleAddAlbum(e) {
        e.preventDefault();
        const value = inputRef.current.value;

        if (value === '') {
            toast.error("Input can't be an empty field!")
            return;
        }

        props.onSubmit(value)
        handleClearInput();
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])

  return (
      <div id={styles.container}>
          <h1 id={styles.albumFormHeading}>Create New Album</h1>
          <form onSubmit={handleAddAlbum}>
              <input maxLength='18' type="text" ref={inputRef} placeholder="Enter album's name" />
              <Button id={styles.clearBtn} type='button' variant='contained' color='error' onClick={handleClearInput}>Clear</Button>
              <Button type='submit' variant='contained' id={styles.addBtn}>Create</Button>
          </form>
          <ToastContainer />
    </div>
  )
}
