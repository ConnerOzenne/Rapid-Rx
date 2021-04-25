import React, { Component } from 'react';
import { Repository } from '../api/repository';
import { Redirect } from 'react-router-dom'

import { Navbar } from '../components/Navbar'

export class BookAppt extends React.Component {

    repo = new Repository();

    state = {
        user: {},
        employee: {},
        appointments: [],
        date: '',
        time: ''
    }

    isLoggedIn = () => {
        let loggedIn = localStorage.getItem("userID") && !(localStorage.getItem("userID") == "null");
        return loggedIn;
    }

    getDates = () => {

    }

    checkConflict = date => {

    }

    componentDidMount() {
        let employeeId = +this.props.match.params.employeeId;
        if (employeeId && employeeId != -1 & this.isLoggedIn()) {
            this.repo.getUserInfo(employeeId)
            .then(data => {
                const res = data.data; 
                this.setState({employee: res.data[0]})
                console.log("employee:")
                console.log(this.state.employee.name);
            });

            let userId = localStorage.getItem("userID");

            this.repo.getUserInfo(userId)
            .then (data => {
                const res = data.data;
                this.setState({user: res.data[0]});
                console.log("user:")
                console.log(this.state.user.name);
            });

            this.repo.getAppointmentsForEmployee(employeeId)
            .then (data => {
                const res = data.data;
                this.setState({appointments: res});
                
                console.log("appointments:")
                console.log(this.state.appointments);
            });
        };
    }

    onSave = () => {

        // const pattern = /.*\D+.*/;

        // // If price isn't a number, break out of the function and generate a warning somehow.
        // if (pattern.test(this.state.price)) {
        //      this.setState({priceMustBeNumber: true})
        //      return;
        // }
        // else {
        //     this.setState({price: parseInt(this.state.price), priceMustBeNumber: false})
        // }

        // // Shoulda created a model, lol
        // const med = {
        //     name: this.state.name,
        //     sideEffects: this.state.sideEffects,
        //     description: this.state.description,
        //     price: this.state.price, 
        //     usedFor: this.state.usedFor
        // }

        // // Save the changes to the form as a POST or PUT  request to the database

        // console.log("this.state.medicationID: "+this.state.medicationID);
        // if (this.state.medicationID > 0) {
        //     console.log("Editing a current medication...")
        //     this.repo.editMedicationInfo(med, this.state.medicationID)
        //     .then(data => {
        //         // Redirect back to MyPrescriptions
        //         this.setState({redirect: '/medList'})
        //     })
        // }
        // else {
        //     console.log("Creating a new medication...")
        //     this.repo.createNewMedication(med)
        //     .then(data => {
        //         // Redirect back to MyPrescriptions
        //         this.setState({redirect: '/medList'})
        //     })
        // }
    }

    onCancel = () => {
        this.setState({redirect: '/appointments'})
    }

    getDates = () => {

    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />;
        }

        return (
            <>
                <Navbar></Navbar>
                <div className="container mt-5">
                    <div className="jumbotron">
                        <h4 className="row mt-2">{this.state.employee.name} has appointments booked for the following times:</h4>
                        {console.log("Friend")}
                        {console.log(this.state.appointments)}
                        {
                        this.state.appointments.length > 0 ?
                            <div>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        this.state.appointments.map(appointment => (
                                            appointment.date.charAt(13) == '0' ? 
                                            <tr>
                                                <td>{appointment.date.substring(0, 10)}</td>
                                                <td>{appointment.date.substring(12, 17)}</td>
                                            </tr>    
                                                :
                                            <tr>
                                                <td>{appointment.date.substring(0, 10)}</td>
                                                <td>{appointment.date.substring(12, 16)}</td>
                                            </tr> 
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        
                        :
                        <p>No appointment times available</p>
                        }
                    </div>


                    <h2>Book Appointment</h2>
                    <div>
                        
                        <label htmlFor="selectDate">Select Date </label>
                        <input className="form-control col-md-2"
                               type="date"
                               name="selectDate"
                               value={this.state.date}
                               onChange={event => this.setState({date: event.target.value})}>
                        </input>

                        <label htmlFor="selectTime">Select Time </label>
                        <select className="form-control col-md-6" 
                                id="selectTime" 
                                name="selectTime"
                                value={this.state.time}
                                onChange={e => this.setState({time: e.target.value})}>
                                    // TODO: Map this to a time array
                                    <option value="volvo">1:00pm</option>
                                    <option value="saab">1:30pm</option>
                                    <option value="saab">2:00pm</option>
                                    <option value="saab">2:30pm</option>
                                    <option value="saab">3:00pm</option>
                                    <option value="saab">3:30pm</option>
                                    <option value="saab">4:00pm</option>
                                    <option value="saab">4:30pm</option>
                                    <option value="saab">5:00pm</option>
                        </select>

                        <button className="btn btn-primary me-3"
                                onClick={() => this.onSave()}>Book</button>
                        <button className="btn btn-secondary mx-3"
                                onClick={() => this.onCancel()}>Cancel</button>
                        {/*this.state.priceMustBeNumber && <p className="alert alert-warning my-3">Price must be in whole dollars</p>*/}
                    </div>
                </div>
            </>
        );
    }

}