import React from 'react'
import styles from '../css/album.module.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';

export default function Album(props) {
  return (
      <div id={styles.container} onClick={() => props.onClick()}>
            <div id={styles.thumbnail}>
        <PermMediaIcon id={ styles.albumIcon} />
            </div>
          <h3 className={styles.title}>{props.title}</h3>
    </div>
  )
}
