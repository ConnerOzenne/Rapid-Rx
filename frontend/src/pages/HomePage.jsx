import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Repository} from '../api/repository';
import { Navbar } from '../components/Navbar';
import './HomePage.css';
import { MedList } from './MedList.jsx';

export class HomePage extends React.Component {

    repo = new Repository();

    days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    medInfo = ["","Name","Description","Side Effects","Not compatible with","More Information"];

    state = {
        firstName: "_none_",
        isLoggedIn: false,
        searchOption: '',
        searchText: ''
    };

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && localStorage.getItem("userID") != "null";
        return loggedIn;
    }

    componentDidMount() {
        console.log("Homepage: componentDidMount()")
        if (this.isLoggedIn()) {
            this.repo.getUserInfo(localStorage.getItem("userID"))
                .then(data => {
                    const res = data.data;
                    this.setState({firstName: res.data[0].name, isLoggedIn: true})
                })
                .catch(err => {
                    console.log("No user info found")
                })
        }
    }

    render() {

        // !ONLY DISPLAY MY MEDICATIONS TABLE IF USER IS LOGGED IN
        // Search medications will be displayed regardless of whether user is logged in or not.
        return (
            <>
                <Navbar norender={false}></Navbar>
                <div className="homepage-header position-relative vh-100">
                    <img className="position-absolute homepage-img w-100" src="img/PillStock.jpg"></img>
                    <img className="position-absolute mobile-none h-50" src="img/Homepage-1.svg"></img>
                    <img className="position-absolute homepage-title" src="img/Homepage-logo-1.svg"></img>
                    <div className="position-relative position-absolute homepage-info row">
                        <div className="d-flex flex-column align-items-center position-absolute homepage-welcome p-3">
                            <h2 className="homepage-welcome">
                                {/*this.state.firstName && this.state.firstName != "_none_" ? `Welcome ${this.state.firstName}!` : 'Welcome to Rapid RX!'*/}
                                {this.isLoggedIn() ? `Welcome ${this.state.firstName}!` : 'Welcome to Rapid RX!'}
                            </h2>
                            <button className="btn-homepage homepage-start">
                                {(this.isLoggedIn() ? 
                                    <Link to="/medlist" className="text-dark">
                                        Get Started
                                    </Link>
                                    :
                                    <Link to="/login" className="text-dark">
                                        Get Started
                                    </Link>
                                )}
                            </button>
                        </div>
                        <div className="position-absolute homepage-links">
                            <a className="d-block" href="/medlist">View Prescriptions</a>
                            <a className="d-block" href="/pharmacies">Pharmacies</a>
                        </div>
                    </div>
                    <img className="position-absolute mobile-none w-100 homepage-img2" src="img/Homepage-2.svg"></img>
                </div>

                <div className="m-5 d-flex flex-column align-items-center">
                    <h1>My Medications</h1>
                    <table>
                        <thead>
                            <tr className="font-weight-bold">   
                                {this.days.map(day => <td>{day}</td>)}
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <tbody>

                    </tbody>
                </div>

                <div className="m-5">
                    <h1>Search Medications</h1>

                    <label htmlFor="searchby">Search By</label>
                    <select className="form-control col-6" 
                            id="homepage-med-searchby" 
                            name="searchby"
                            onChange= {event => this.setState({searchOption: event.target.value})}>
                        {this.medInfo.map(sortOption => <option>{sortOption}</option>)}
                    </select>

                    <label htmlFor="search">Search</label>
                    <input  type="search" 
                            id="home-med-search" 
                            name="search"
                            value={this.state.searchText}
                            onChange= {event => this.setState({searchText: event.target.value})}></input>
                </div> 
            </>
        );
        
    }
}