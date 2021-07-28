import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"

export const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar">
                <li className="navbar__item">
                    <Link className="navbar__link" to='/'>
                        Home
                    </Link>
                </li>
                {/* <li className="navbar__item">
                    <Link className="navbar__link" to="/dogs">
                        Dogs
                    </Link>
                </li> */}
            </ul>
            <ul className="navbar">
                <li className="navbar__item">
                    <Link className="navbar__link" to="/login" onClick={() => sessionStorage.removeItem('charlies_user')}>
                        Logout
                    </Link>
                </li>
            </ul>
        </nav>
    )
}