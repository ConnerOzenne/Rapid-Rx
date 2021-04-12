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

library.add(fasFaClinicMedical, fasFaFilePrescription, fasFaCapsules);

export class MedInfo extends React.Component {

    constructor(props) {
        super(props);
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
                    <h2 className="pb-2 border-bottom">Medication Name Here</h2>
                    <div className="row g-5 py-5">
                        <div className="col-md-4 d-flex align-items-start">
                        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                            <FontAwesomeIcon icon={fasFaCapsules} />
                        </div>
                        <div>
                            <h2>Side Effects</h2>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                            <a href="#" className="btn btn-secondary">
                            Return to Prescriptions?
                            </a>
                        </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-start">
                        <div className="icon-square bg-light text-dark flex-shrink-0 me-3">
                            <FontAwesomeIcon icon={fasFaFilePrescription} />
                        </div>
                        <div>
                            <h2>Description</h2>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                            <a href="#" className="btn btn-secondary">
                            Price?
                            </a>
                        </div>
                        </div>
                        <div className="col-md-4 d-flex align-items-start">
                        <div className="icon-square bg-light text-dark">
                            <FontAwesomeIcon icon={fasFaClinicMedical} />
                        </div>
                        <div>
                            <h2>Interactions</h2>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

}