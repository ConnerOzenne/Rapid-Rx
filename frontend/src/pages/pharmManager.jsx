import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export class PharmManager extends React.Component {

    medInfo = ["Name","Quantity", "Price"];

    employee = ["Name"];

    state = {
        
    };

    componentDidMount() {
        console.log("Pharmacy Manager: componentDidMount()")
        if (this.isLoggedIn()) {
            this.repo.getUserInfo(localStorage.getItem("userID"))
                .then(data => {
                    const res = data.data;
                    console.log("PharmManager - componentDidMount(): res...")
                    console.log(res);
                    this.setState({username: res.data[0].name, authorityLevel: res.data[0].authorityLevel})
                })
                .catch(err => {
                    console.log("No user info found")
                })
        }
    }

    render() {
        return (
            <>
                               
                <div>
                    <h1>Medication Inventory</h1>
                    <h2>Placeholder for broken code:</h2>

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