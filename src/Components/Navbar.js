import React, { useContext, useState } from 'react'
import styles from './Navbar.module.css'
import { Link,useLocation } from 'react-router-dom'
import { MenuContext } from '../Context/OpenMenu'
import Hamburger from './Hamburger'

const Navbar = ({session}) => {

  const location = useLocation()

  const path = location.pathname.startsWith('/student') || location.pathname.startsWith('/teacher') ||  location.pathname.startsWith('/admin') ? true : false

  const [open, setOpen] = useState(false)

  const { openSide, toggleMenu } = useContext(MenuContext)

  const firstLetter = session.name

  const openHam = () => {
    setOpen(!open)
  }
  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbar}`}>
      <div className="container-fluid">
      {path && (<div className={`${styles.hamList}`} onClick={toggleMenu}><Hamburger openHam={openHam} open={open}/></div>)}
        <Link className="navbar-brand text-white" to="/">Attendance System</Link>
        <li className={`navbar-toggler ${styles.navbarToggler} ${open ? styles.open : styles.close}`} style={{ listStyle: 'none' }} onClick={openHam}>
          {<Hamburger openHam={openHam} open={open}/>}
        </li>
        <div className={`navbar-collapse ${styles.navbarCollapse} ${open ? styles.openHam : styles.closeHam}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
          </ul>
          <div className="d-flex">
            {firstLetter}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar