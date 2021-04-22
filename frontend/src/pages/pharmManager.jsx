import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export class PharmManager extends React.Component {

    medInfo = ["Name","Quantity", "Price"];

    employee = ["Name"];

    state = {
        
    };

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