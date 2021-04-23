import React, { Component } from 'react';
import { Navbar } from '../components/Navbar'

export class Appointments extends React.Component{

    render() {
        return (
            <>
                <Navbar></Navbar>
                <div className="my-5 container-md">
                    <p>Appointments page</p>
                </div>
            </>
        );
    }
}