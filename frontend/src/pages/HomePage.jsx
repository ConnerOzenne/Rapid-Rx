import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Repository} from '../api/repository';
import './HomePage.css';
import { MedList } from './MedList.jsx';

export class HomePage extends React.Component {

    repo = new Repository();

    days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    medInfo = ["Name","Description","Side Effects","Not compatible with","More Information"];

    state = {
        firstName: "Michael",
        isLoggedIn: false
    };

    updateFirstName = () => {
        this.setState( {
            firstName: sessionStorage.getItem("userID").firstName
        });
    }

    render() {

        console.log("Session storage for userID: "+sessionStorage.getItem("userID"));
        // !ONLY DISPLAY MY MEDICATIONS TABLE IF USER IS LOGGED IN
        // Search medications will be displayed regardless of whether user is logged in or not.
        return (
            <>
                <div className="homepage-header position-relative vh-100">
                    <img className="position-absolute homepage-img w-100" src="img/PillStock.jpg"></img>
                    <img className="position-absolute h-50" src="img/Homepage-1.svg"></img>
                    <img className="position-absolute homepage-title" src="img/Homepage-logo-1.svg"></img>
                    <div className="position-relative position-absolute homepage-info">
                        <div className="position-absolute homepage-welcome">
                            <h2 className="homepage-welcome">Welcome {this.state.firstName}!</h2>
                            <button className="btn btn-secondary homepage-start">Get Started</button>
                        </div>
                        <div className="position-absolute homepage-links">
                            <a className="" href="/medlist">View Prescriptions</a>
                            <a className="" href="/pharmacies">Pharmacies</a>
                        </div>
                    </div>
                    <img className="position-absolute w-100 homepage-img2" src="img/Homepage-2.svg"></img>
                </div>

                <MedList page="homepage"></MedList>

                {/* <div>
                    <h1>My Medications</h1>
                    <table>
                        <thead>
                            <tr>   
                                {this.days.map(day => <td>{day}</td>)}
                            </tr>
                        </thead>
                    </table>
                    <tbody>

                    </tbody>
                </div> */}

                <div>
                    <h1>Search Medications</h1>

                    <label htmlFor="searchby">Search By</label>
                    <select className="form-control col-6" id="homepage-med-searchby" name="searchby">
                        {this.medInfo.map(sortOption => <option>{sortOption}</option>)}
                    </select>

                    <label htmlFor="search">Search</label>
                    <input type="search" id="home-med-search" name="search"></input>

                    <thead>
                        <tr>
                            {this.medInfo.map(header => <td>{header}</td>)}
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </div>

                
            </>
        );
    }
}