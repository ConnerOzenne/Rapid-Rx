import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

export class HomePage extends React.Component {

    days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
    medInfo = ["Name","Description","Side Effects","Not compatible with","More Information"];

    state = {
        firstName: "Mitch",
        isLoggedIn: false
    };

    render() {

        // !ONLY DISPLAY MY MEDICATIONS TABLE IF USER IS LOGGED IN
        // Search medications will be displayed regardless of whether user is logged in or not.

        // TODO: Should we use the same table for the Prescriptions page as well? Maybe make that table into a separate component.
        return (
            <>
                <h1>Rapid RX</h1>
                <h2>Welcome {this.state.firstName}!</h2>
                <button>Get Started</button>
                <a href="/prescriptions">View Prescriptions</a>
                <a href="/pharmacies">Pharmacies</a>

                <div>
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
                </div>

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