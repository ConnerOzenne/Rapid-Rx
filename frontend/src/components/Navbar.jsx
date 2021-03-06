import React, { Component } from 'react';
import { Repository } from '../api/repository';
import { Link, Redirect, useLocation } from 'react-router-dom';
import './Navbar.css'
import { HomePage } from '../pages/HomePage';

export class Navbar extends React.Component {

    repo = new Repository();

    state = { 
        clicked: false,
        authorityLevel: 0
    }

    componentDidMount() {
        console.log("USER ID:", localStorage.getItem("userID"))
        console.log("Logged in: ", this.isLoggedIn())
        if (localStorage.getItem("userID") && localStorage.getItem("userID") != -1) {
            this.repo.getUserInfo(localStorage.getItem("userID")).then(data => {
                const res = data.data;
                console.log("Navbar: componentDidMount(): res...");
                console.log(res);
                this.setState({authorityLevel: res.data[0].authorityLevel,
                    profilePath: "/profile/" + res.data[0].userID,
                    pharmPath: "/pharmacyManager/" + res.data[0].pharmacyID
                })
            });
        }
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == -1);
        return loggedIn;
    }

    logout = () => {
        console.log("Logout attempt")
        localStorage.setItem("userID", -1);
        this.setState({redirect: '/'});
    }

    isManager = () => {
        if (this.isLoggedIn() && this.state.authorityLevel >= 1) {
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
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ol className="navbar-nav me-auto mb-lg-0 d-flex w-100">
                            <li><a className="nav-link text-white mx-3" href="/">Home</a></li>
                            {this.isLoggedIn() && this.state.authorityLevel >= 2 &&
                                <li><a className="nav-link text-white mx-3" href="/medlist">EditMedications</a></li>    
                            }
                            {this.isLoggedIn() && this.state.authorityLevel == 0 &&
                                <li><a className="nav-link text-white mx-3" href="/medlist">MyPrescriptions</a></li>
                            }
                            <li><a className="nav-link text-white mx-3" href="/pharmacyPortal">Pharmacy Portal</a></li>
                            {(this.isManager() && this.isLoggedIn() ?
                                <li><a className="nav-link text-white mx-3" href={this.state.pharmPath}>MyPharmacyManager</a></li> : ''
                            )}
                            {/* {this.isLoggedIn() && <li><a className="nav-link text-white mx-3" href="/appointments">Appointments</a></li>} */}
                        </ol>
                        <ol className="navbar-nav me-auto mb-lg-0 d-flex w-25">
                            {(this.isLoggedIn() ? 
                                <>
                                    <li><a className="nav-link text-white mx-5" onClick={() => this.logout()}>Log Out</a></li>
                                </>
                                :   <li><a className="nav-link text-white mx-5" href="/create">Sign Up</a></li>
                            )}
                            {(this.isLoggedIn() ? 
                                <li><a className="nav-link text-white" href={this.state.profilePath}>Profile</a></li>
                                :
                                <li><a className="nav-link text-white px-3" href="/login">Log In</a></li>
                            )}
                        </ol>
                    </div>
                </div>
            </nav>
        )
    }
}