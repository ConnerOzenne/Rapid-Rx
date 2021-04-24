import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Inventory } from '../components/inventory'

export class PharmManager extends React.Component {

    medInfo = ["Name","Quantity", "Price"];

    employee = ["Name"];

    state = {
        
    };

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == "null");
        return loggedIn;
    }

    componentDidMount() {
        console.log("Pharmacy Manager: componentDidMount()")
        if (this.isLoggedIn()) {
            //do nothing for now
        }
    }

    render() {
        return (
            <>
                <Navbar/>           
                <div>
                    <h1>Medication Inventory</h1>
                    <h2>Placeholder for broken code:</h2>

                    <Inventory/>
                </div>
            </>
        );
    }
}