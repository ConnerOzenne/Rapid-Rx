import axios from 'axios';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Repository } from '../api/repository';

export class ClosestPharmacies extends React.Component {

    repo = new Repository();

    constructor(props){
        super(props);

        this.state = {
            zipcode: '',
            pharmacies: [],
            table: false,
            isAuth: false
        }
    }
    

    getRouteToPage() {
        if (this.props.auth === 2 || this.props.auth === 1) {
            this.setState({isAuth: true})
        }
        else {
            this.setState({isAuth: false})
        }
    }

    getPharmacies = () => {
        if (this.state.zipcode == '') {
            this.setAllPharmacies()
        }
        else {
            var rows = []
            this.repo.getPharmacies().then(data => {
                const resp = data.data
                for (var row in resp.data) {
                    if (Math.floor(resp.data[row].zipcode / 100) == Math.floor(this.state.zipcode / 100)) {
                        rows.push(resp.data[row])
                    }
                }
                this.setState({ pharmacies: rows, table: true })
                console.log(this.state.pharmacies)
            })
        }
        
    }

    setAllPharmacies() {
        this.repo.getPharmacies(this.state).then(data => {
            const resp = data.data
            this.setState( { pharmacies: resp.data, table: true})
        })
    }

    componentDidMount() {
        this.setAllPharmacies()
        this.getRouteToPage()
    }

    render() {
        return (<>
            <div className="jumbotron m-3">
                <h3 className="text-left">See Pharmacies in your Reigon</h3>
                <label htmlFor="zipcode">Filter by Zip Code</label>
                <input className="form-control"
                    type="text"
                    name="zipcode" 
                    id="zipcode"
                    value={this.state.zipcode}
                    onChange={e => this.setState({ zipcode: e.target.value })}
                />
                <button className="btn btn-primary btn-block btn-login" onClick={this.getPharmacies}>Get Pharmacies</button>
                <div>
                    <table className="table table-condensed table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zipcode</th>
                                {this.state.isAuth && <th>Inventory</th>} 
                                {this.state.isAuth && <th>Order History</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.table && this.state.pharmacies.map((ph, index) => (
                                <tr key={index}>
                                    <td>{ph.name}</td>
                                    <td>{ph.address}</td>
                                    <td>{ph.city}</td> 
                                    <td>{ph.state}</td>
                                    <td>{ph.zipcode}</td>
                                    {this.state.isAuth && <td><Link type="button" className="btn btn-secondary" to={'/pharmacyManager/' + ph.pharmacyID}>View Inventory</Link></td>} 
                                    {this.state.isAuth && <td><Link type="button" className="btn btn-secondary" to={'/pharmacyHistory/' + ph.pharmacyID + '/history'}>Order History</Link></td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
        )
    }

}