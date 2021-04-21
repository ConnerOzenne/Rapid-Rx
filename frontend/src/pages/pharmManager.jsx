import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export class pharmManager extends React.Component {

    medInfo = ["Name","Quantity", "Price"];

    employee = ["Name", ]

    state = {
        
    };

    render() {
        return (
            <>
                <Navbar></Navbar>
                <h1>My Pharmacy Manager</h1>
                <button>Get Started</button>
                
                <div>
                    <h1>Medication Inventory</h1>

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