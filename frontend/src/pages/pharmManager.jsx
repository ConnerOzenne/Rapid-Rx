import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Inventory } from '../components/inventory'

export class PharmManager extends React.Component {

    medInfo = ["Name","Quantity", "Price"];

    employee = ["Name"];

    state = {
        pharmacyID: +this.props.match.params.pharmacyID,
    }

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == "null");
        return loggedIn;
    }

    componentDidMount() {
        //debugger;
        console.log("Pharmacy Manager: componentDidMount()")  
    }

    render() {
        return (
            <>
                <Navbar/>           
                <div className="Container" id="header">
                    <h1>Medication Inventory</h1>
                    <Inventory/>
                </div>
            </>
        );
    }
}