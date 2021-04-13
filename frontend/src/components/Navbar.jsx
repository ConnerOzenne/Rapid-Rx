import React, { Component } from 'react';
import { Repository } from '../api/repository';
import { Link } from 'react-router-dom';
import './Navbar.css'

export class Navbar extends React.Component {

    repo = new Repository();

    state = { 
        clicked: false
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    isLoggedIn = () => {
        return sessionStorage.getItem("userID") != null;
    }

    logout = () => {
        sessionStorage.setItem("userID", null);
    }

    isManager = () => {
        this.repo.getUserInfo(sessionStorage.getItem("userID")).then(data => {
            const res = data.data;

            if (res.data[0]) {
                if (res.data[0].authoritylevel > 0)
                    return true;
            }
            else {
                return false;
            }
        });
        return false;
    }

    // !NOTE: This const is temporary and will be cleaned later
    render() {

        // The NavBar menu items -- will be stored here for the time being
        // Will probably place this const into a separate .js file in a different directory and import it into here
        const MenuItems = [
            {
                title: 'Home',
                url: '/',
                cName: 'nav-links' // className
            },
            {
                title: 'MyPrescriptions',
                url: '/medlist',
                cName: 'nav-links' // className
            },
            {
                title: 'Pharmacy Portal',
                url: '/pharmacies',
                cName: 'nav-links' // className
            },
            {
                title: 'MyPharmacyManager',
                url: '/pharmacy-manager',
                cName: 'nav-links' // className
            },
            {
                title: 'Sign Up',
                url: '/create',
                cName: 'nav-links' // className
            },
            {
                title: 'Log In',
                url: '/login',
                cName: 'nav-links' // className
            },
            {
                title: 'Profile',
                url: '/userProfile',
                cName: 'nav-links' // className
            }
        ];

        /**
         * Can be added after h1 tag in the JSX
         * 
         * <div className="menu-icon" onClick={this.handleClick}>
         *     <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
         * </div>
         */

        // Return Navbar JSX
        return(
            <nav className="navbar navbar-expand-lg bg-navbar navbar-light">
                <div className="container-fluid mx-5">
                    <img className="navbar-brand" src="img/Homepage-logo-2.svg"></img>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                        <ol className="navbar-nav me-auto mb-lg-0 w-75">
                            <li><a className="nav-link text-white" href="/">Home</a></li>
                            <li><a className="nav-link text-white" href="/medlist">MyPrescriptions</a></li>
                            <li><a className="nav-link text-white" href="/pharmacies">Pharmacy Portal</a></li>
                            {(this.isLoggedIn() && this.isManager() ?
                                <li><a className="nav-link text-white" href="/pharmacy-manager">MyPharmacyManager</a></li> : ''
                            )}
                            {(this.isLoggedIn() ? 
                                <li><a className="nav-link text-white" onClick={this.logout()}>Log Out</a></li>
                                :
                                <li><a className="nav-link text-white" href="/create">Sign Up</a></li>
                            )}
                            {(this.isLoggedIn() ? 
                                <li><a className="nav-link text-white" href="/profile">Profile</a></li>
                                :
                                <li><a className="nav-link text-white" href="/login">Log In</a></li>
                            )}
                        </ol>
                    </div>
                </div>
            </nav>
        )
    }
}