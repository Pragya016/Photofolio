import React from 'react'
import styles from '../css/navbar.module.css'
import AcUnitIcon from '@mui/icons-material/AcUnit';

export default function Navbar() {
  return (
    <nav id={styles.navbar}>
      <AcUnitIcon id={styles.logoIcon} />
      <h1>PhotoFolio</h1>
    </nav>
  )
}
