import React from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import {User} from '../models/user'
import './MedInfo.css';
import { faClinicMedical as fasFaClinicMedical} from "@fortawesome/free-solid-svg-icons";
import { faFilePrescription as fasFaFilePrescription} from "@fortawesome/free-solid-svg-icons";
import { faCapsules as fasFaCapsules} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import {Repository} from '../api/repository';

library.add(fasFaClinicMedical, fasFaFilePrescription, fasFaCapsules);

export class MedInfo extends React.Component {

    repository = new Repository();

    constructor(props) {
        super(props);

        this.state = {
            meds: []
        }
    }

    componentDidMount() {
        let id = 2;
        this.repository.getUserMedications(id)
        .then(meds => {
            console.log(meds);
            this.setState({meds});
        });
    }

    render() {
        
        const {
            name,
            sideEffects,
            treats,
            description,
            price,
            notCompatibleWith,
        } = this.props;

        return (
            <>
                <div className="container py-5" id="hanging-icons">
                { this.state.meds.map((med) => (
                                    <h2 className="pb-2 border-bottom">{med.name}</h2>
                    ))
                }
                    <div className="row g-5 py-5">
                        <div className="col-md-4 d-flex align-items-start">
                        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                            <FontAwesomeIcon icon={fasFaCapsules} size="2x"/>
                        </div>
                        <div>
                            <h2>Side Effects</h2>
                            { this.state.meds.map((med) => (
                                    <p>{med.sideEffects}</p>
                            ))
                            }
                            <Link to="/medlist" className="btn btn-secondary">Return to Prescriptions</Link>
                        </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-start">
                        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                            <FontAwesomeIcon icon={fasFaFilePrescription} size="2x"/>
                        </div>
                        <div>
                            <h2>Description</h2>
                            { this.state.meds.map((med) => (
                                <div>
                                    <p>{med.description}</p>
                                    <a href="#" className="btn btn-secondary">{med.price}</a>
                                </div>
                            ))
                            }
                        </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-start">
                        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                            <FontAwesomeIcon icon={fasFaClinicMedical} size="2x" />
                        </div>
                        <div>
                            <h2>Interactions</h2>
                            { this.state.meds.map((med) => (
                                    <p>{med.notCompatibleWith}</p>
                            ))
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}