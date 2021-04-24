import React, { Component } from 'react';
import { Repository } from '../api/repository';
import { Navbar } from '../components/Navbar'
import { Link, Redirect } from 'react-router-dom'

export class EditMed extends React.Component {

    // !USE THESE TWO API ROUTES:
    // !app.put('/medications/:medicationID', (req, res) => {
    // !app.post('/medications/create', (req, res) => {

    state = {
        medicationID: 0,
        name: '',
        sideEffects: '',
        description: '',
        price: 0,
        usedFor: '',

        priceMustBeNumber: false
    }

    repo = new Repository();

    componentDidMount() {
        let medId = +this.props.match.params.medId;
        if (medId && medId != -1) {
            this.repo.getMedication(medId)
            .then(data => {
                const res = data.data; 
                this.setState({
                    medicationID: res[0].medicationID,
                    name: res[0].name,
                    sideEffects: res[0].sideEffects,
                    description: res[0].description,
                    price: res[0].price,
                    usedFor: res[0].usedFor
                });
        })};
    }

    onSave = () => {

        const pattern = /.*\D+.*/;

        // If price isn't a number, break out of the function and generate a warning somehow.
        if (pattern.test(this.state.price)) {
             this.setState({priceMustBeNumber: true})
             return;
        }
        else {
            this.setState({price: parseInt(this.state.price), priceMustBeNumber: false})
        }

        // Shoulda created a model, lol
        const med = {
            name: this.state.name,
            sideEffects: this.state.sideEffects,
            description: this.state.description,
            price: this.state.price, 
            usedFor: this.state.usedFor
        }

        // Save the changes to the form as a POST or PUT  request to the database

        console.log("this.state.medicationID: "+this.state.medicationID);
        if (this.state.medicationID > 0) {
            console.log("Editing a current medication...")
            this.repo.editMedicationInfo(med, this.state.medicationID)
            .then(data => {
                // Redirect back to MyPrescriptions
                this.setState({redirect: '/medList'})
            })
        }
        else {
            console.log("Creating a new medication...")
            this.repo.createNewMedication(med)
            .then(data => {
                // Redirect back to MyPrescriptions
                this.setState({redirect: '/medList'})
            })
        }
    }

    onCancel = () => {
        this.setState({redirect: '/medList'})
    }

    render() {
        
        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />;
        }

        return (
            <>
                <Navbar></Navbar>
                <div className="container">
                    <h2 className="row mt-5">Edit Medication</h2>
                    <div>
                        <label htmlFor="medName">Medication Name </label>
                        <input  className="form-control col-md-12"
                                name="medName"
                                value={this.state.name}
                                onChange={event => this.setState({name: event.target.value})}></input>

                        <label htmlFor="password">Description </label>
                        <textarea   className="form-control col-md-12"
                                    name="medName"
                                    value={this.state.description}
                                    onChange={event => this.setState({description: event.target.value})}></textarea>

                        <label htmlFor="sideEffects">Side Effects </label>
                        <input  className="form-control col-md-12"
                                name="sideEffects"
                                value={this.state.sideEffects}
                                onChange={event => this.setState({sideEffects: event.target.value})}></input>

                        <label htmlFor="usedFor">Used For </label>
                        <input  className="form-control col-md-12"
                                name="usedFor"
                                value={this.state.usedFor}
                                onChange={event => this.setState({usedFor: event.target.value})}></input>

                        <label htmlFor="price">Price (In whole dollars) </label>
                        <input  className="form-control col-md-12"
                                name="price"
                                value={this.state.price}
                                onChange={event => this.setState({price: event.target.value})}></input>

                        <button className="btn btn-primary me-3"
                                onClick={() => this.onSave()}>Save</button>
                        <button className="btn btn-secondary mx-3"
                                onClick={() => this.onCancel()}>Cancel</button>

                        {this.state.priceMustBeNumber && <p className="alert alert-warning my-3">Price must be in whole dollars</p>}
                    </div>
                </div>
            </>
        );
    }

}