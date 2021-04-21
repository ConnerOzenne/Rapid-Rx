//import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';

export class pharmManager extends React.Component {

    medInfo = ["Name","Quantity", "Price"];

    employee = ["Name", ]

    state = {
        
    };

    render() {
        return (
            <>
                               
                <div>
                    <h1>Medication Inventory</h1>

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