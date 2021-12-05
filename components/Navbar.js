import React from 'react'
// import PropTypes from 'prop-types'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Navbar = props => {
  return (
    <Image
        src='/sportsinfo.svg'
        width={100}
        height={100}
        className={styles.logo}
      >
      </Image>
  )
}

// Navbar.propTypes = {

// }

export default Navbar
