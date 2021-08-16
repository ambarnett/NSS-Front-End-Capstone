import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"
import dogOutLine from '../images/dog-outline.png'

export const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-headline">
                <img className="nav-img" src={dogOutLine} alt="dog outline" />
                <h2>Charlie's Checklist</h2>
            </div>
            <div className="navbar">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to='/home'>
                            Home
                        </Link>
                    </li>
                </ul>
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={() => sessionStorage.removeItem('charlies_user')}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}