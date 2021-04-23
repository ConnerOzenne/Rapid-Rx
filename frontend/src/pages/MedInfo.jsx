import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {User} from '../models/user'
import './MedInfo.css';
import {Navbar} from '../components/Navbar';
import {Repository} from '../api/repository';


export class MedInfo extends React.Component {

    repository = new Repository();

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            sideEffects: "",
            usedFor: "",
            description: "",
            price: "",
            notCompatibleWith: []
        }
    }

    componentDidMount() {
        // debugger;
        let id = +this.props.match.params.medicationID;
        this.repository.getMedicationInfo(id)
        .then(medInfo => {
            this.setState({...medInfo.data[0]});
        });
        this.repository.getMedCompatibility(id)
        .then(x => {
            this.setState({notCompatibleWith: x.data[0]});
        });
    }

    render() {
        
        const {
            name,
            sideEffects,
            usedFor,
            description,
            price,
        } = this.state;

        return (
            <>
                <Navbar norender={this.props.navbarnorender}></Navbar>
                <div className="container py-5" id="hanging-icons">
                    <h2 className="pb-2 border-bottom">More Information</h2>
                    <h2 className="text-center">{this.state.name}</h2>
                    <div className="row g-5 py-5">
                        <div className="col-md-4 d-flex align-items-start">
                        <div className="icon-square text-dark flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Side Effects</h2>
                                    <p>Some of the side effects of {this.state.name} include: {this.state.sideEffects}.</p>
                        </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-start">
                        <div className="icon-square text-dark flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-file-earmark-medical-fill" viewBox="0 0 16 16">
                                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-3 2v.634l.549-.317a.5.5 0 1 1 .5.866L7 7l.549.317a.5.5 0 1 1-.5.866L6.5 7.866V8.5a.5.5 0 0 1-1 0v-.634l-.549.317a.5.5 0 1 1-.5-.866L5 7l-.549-.317a.5.5 0 0 1 .5-.866l.549.317V5.5a.5.5 0 1 1 1 0zm-2 4.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 2h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Description</h2>
                                <div>
                                    <p>{this.state.description}.</p>
                                </div>
                        </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-start">
                        <div className="icon-square text-dark flex-shrink-0 me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                        </div>
                        <div>
                            <h2>Interactions</h2>
                                {/* <p>{this.state.notCompatibleWith}</p> */}
                        </div>
                        </div>
                    </div>
                    <Link to="/medlist" className="btn btn-secondary">Return to Prescriptions</Link>
                </div> 
            </>
        );
    }

}