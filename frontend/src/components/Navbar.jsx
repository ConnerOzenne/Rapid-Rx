import React, { Component } from 'react';
import { Repository } from '../api/repository';
import { Link, Redirect, useLocation } from 'react-router-dom';
import './Navbar.css'

export class Navbar extends React.Component {

    repo = new Repository();

    state = { 
        clicked: false,
        authorityLevel: 0
    }

    componentDidMount() {
        if (this.isLoggedIn()) {
            this.repo.getUserInfo(localStorage.getItem("userID")).then(data => {
                const res = data.data;
                console.log("Navbar: componentDidMount(): res...");
                console.log(res);
                this.setState({authorityLevel: res.data[0].authorityLevel})
            });
        }
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == "null");
        return loggedIn;
    }

    logout = () => {
        console.log("Logout attempt")
        localStorage.setItem("userID", null);
        this.setState({redirect: '/'});
    }

    isManager = () => {
        if (this.isLoggedIn() && this.state.authorityLevel >= 2) {
            return true;
        }
        return false;
    }

    // !NOTE: This const is temporary and will be cleaned later
    render() {

        /**
         * Can be added after h1 tag in the JSX
         * 
         * <div className="menu-icon" onClick={this.handleClick}>
         *     <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
         * </div>
         */

        if (this.state.redirect && !this.props.homepage) {
            return <Redirect to={ this.state.redirect } />;
        }
        return(
            <nav className="navbar navbar-expand-lg bg-navbar navbar-light">
                <div className="container-fluid mx-5">
                    <Link to="/">
                        <img className="navbar-brand" src="img/Homepage-logo-2.svg"></img>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                        <ol className="navbar-nav me-auto mb-lg-0 w-75">
                            <li><a className="nav-link text-white" href="/">Home</a></li>
                            <li><a className="nav-link text-white" href="/medlist">MyPrescriptions</a></li>
                            <li><a className="nav-link text-white" href="/pharmacies">Pharmacy Portal</a></li>
                            {(this.isManager() && this.isLoggedIn() ?
                                <li><a className="nav-link text-white" href="/pharmacy-manager">MyPharmacyManager</a></li> : ''
                            )}
                            {(this.isLoggedIn() ? 
                                <>
                                    <li><a className="nav-link text-white" href="/appointments">Appointments</a></li>
                                    <li><a className="nav-link text-white" onClick={() => this.logout()}>Log Out</a></li>
                                </>
                                :   <li><a className="nav-link text-white" href="/create">Sign Up</a></li>
                            )}
                            {(this.isLoggedIn() ? 
                                <li><a className="nav-link text-white" href="/profile/:userId">Profile</a></li>
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