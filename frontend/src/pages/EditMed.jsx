import React, { Component } from 'react';
import { Repository } from '../api/repository';
import { Navbar } from '../components/Navbar'
import { Link, Redirect } from 'react-router-dom'

export class EditMed extends React.Component {

    state = {
        medicationID: 0,
        name: '',
        sideEffects: '',
        description: '',
        price: 0,
        usedFor: ''
    }

    repo = new Repository();

    componentDidMount() {
        let medId = +this.props.match.params.medId;
        console.log("We have a medId maybe...")
        console.log(medId)
        if (medId) {
            this.repo.getMedication(medId)
            .then(data => {
                const res = data.data; 
                console.log("EditMed: componentDidMount(): res...")
                console.log(res);
                this.setState({
                    medicationID: res[0].medicationID,
                    name: res[0].name,
                    sideEffects: res[0].sideEffects,
                    description: res[0].description,
                    price: res[0].price,
                    usedFor: res[0].usedFor
                });
                console.log("EditMed: componentDidMount(): state...");
                console.log(this.state);
        })};
    }

    onSave = () => {

        // If price isn't a number, break out of the function and generate a warning somehow.
        
        // Save the changes to the form as a POST request to the database

        // Redirect back to MyPrescriptions
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

                        <button className="btn btn-primary"
                                onClick={() => this.onSave()}>Save</button>
                    </div>
                </div>
            </>
        );
    }

}