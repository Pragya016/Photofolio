import React from 'react'
import Album from './Album'
import styles from '../css/toggleForm.module.css';

export default function AlbumList(props) {
    return (
        <div id={styles.albumContainer}>
            {props.albums.length > 0 && props.albums.map((album, i) => (
                // send id of the album in handleAlbumDisplay func so that it display only those images that are present in that album
                album.title !== '' &&
                <Album key={i} title={album.album} onClick={() => props.onClick(album)} albumId={album.id} />
            ))}
        </div>
    )
}
