import axios from 'axios';

export class Repository {

    url = false ? 'http://3.129.6.230:8000' : 'http://localhost:8000';

    config = {
        headers: {
            Authorization: '*'
        }
    }

    //Account stuff    path = /account
    //POST /account on DB side
    addAccount(state){
        return new Promise((resolve, reject) => {
            console.log('account trying to be added');
            axios.post(`${this.url}/users/create`, state).then(resp => {
                if(resp.data == "L")
                {
                    return alert("Email already in use");
                }
                else {
                    resolve(resp.data);
                }
            }).catch(err => alert(err));
        });
    }

    //logging in 
    login(state){
        return new Promise((resolve, reject) => {
            console.log(state)
            axios.post(`${this.url}/login`, state, this.config).then(resp => {
                console.log(resp);
                resolve(resp);
            })
            .catch(e => {
                console.log("error");
                console.log(e);
            });
        })
    }

    // Given a userID, return all the user info for that user.
    getUsers() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/users`, this.config).then(resp => {
                console.log(resp);
                resolve(resp);
            })
            .catch(e => {
                console.log("repo.getUsers: error")
                console.log(e)
            })
        });
    }

    // Given a userID, return all the user info for that user.
    getUserInfo(userID) {
        return new Promise((resolve, reject) => {
            console.log(userID)
            axios.get(`${this.url}/user/${userID}`, this.config).then(resp => {
                console.log(resp);
                resolve(resp);
            })
            .catch(e => {
                console.log("repo.getUserInfo(): error")
                console.log(e)
            })
        });
    }

    // Given a username, return the user's corresponding userID.
    getUserID(username) {
        return new Promise((resolve, reject) => {
            console.log(username)
            axios.get(`${this.url}/get/${username}`, this.config).then(resp => {
                console.log(resp);
                resolve(resp);
            })
            .catch(e => {
                console.log("repo.getUserID(): error")
                console.log(e)
            })
        });
    }

    getAddressInfo(addressID) {
        return new Promise((resolve, reject) => {
            console.log(addressID)
            axios.get(`${this.url}/address/${addressID}`, this.config).then(resp => {
                console.log(resp);
                resolve(resp);
            })
            .catch(e => {
                console.log("repo.getAddressInfo(): error")
                console.log(e)
            })
        });
    }

    getOrders(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

    getOrderDetails(orderID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/order/${orderID}/details`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }
    
    getUserOrders(userId) {
        // debugger;
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userId}/orders`, this.config)
            .then(x => {
                (resolve(x.data.data))
            })
            .catch(e => {
                alert(e);
                reject(e);
            });
        })
    }
    
    getUserOrderDetails(orderID) {
        // debugger;
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/order/${orderID}/details`, this.config)
            .then(x => {
                resolve(x.data.data)
            })
            .catch(e => {
                alert(e);
                reject(e);
            });
        })
    }
    
    getUserMedications(userID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/user/${userID}/medications`, this.config)
            .then(x => {
                resolve(x.data.data)
            })
            .catch(e => {
                alert(e);
                reject(e);
            });
        })
    }

    getMedicationInfo(medicationID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/medication/${medicationID}`, this.config)
            .then(x => {
                resolve(x.data)
            })
            .catch(e => {
                alert(e);
                reject(e);
            });
        })
    }

    editMedicationInfo(newMedInfo, medId) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/medications/${medId}`, newMedInfo, this.config)
            .then(x => {
                resolve(x.data)
            })
            .catch(e => {
                alert(e);
                reject(e);
            });
        });
    }

    createNewMedication(newMedInfo) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/medications/create`, newMedInfo, this.config)
            .then(x => {
                resolve(x.data)
            })
            .catch(e => {
                alert(e);
                reject(e);
            });
        });
    }

    createOrder(order){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/orders/create`, order).then(resp => {
                    resolve(resp.data);
            }).catch(err => alert(err));
        });
    }

    // // am i using this?
    // getPharmacy(pharmacyName) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(`${this.url}/pharmacies/:pharmacyName`, this.config).then(resp => {
    //             console.log(resp);
    //             resolve(resp);
    //         })
    //         .catch(e => {
    //             console.log("Axios error");
    //             console.log(e);
    //         });
    //     })
    // }

    createOrderDetails(orderDetails) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/orders/details/create`, orderDetails).then(resp =>  {
                resolve(resp.data);
            }).catch(err => alert(err));
        });
    }

    getMedCompatibility(medicationID) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/medication/${medicationID}/incompatible`, this.config)
            .then(x => {
                resolve(x.data)
            })
            .catch(e => {
                alert(e);
                reject(e);
            });
        })
    }


    // postOrder() {
    //     return new Promise((resolve, reject) => {
    //         axios.post(`${this.url}/orders/create`, this.config)
    //         .then(x => resolve(x.data))
    //         .catch(e => {
    //             alert(e);
    //             reject();
    //         });
    //     })
    // }

    

    updateAccount(id, account) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/${id}`, account, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    updateAddress(id, address) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/address${id}`, address, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    getMedications() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/medications`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    getMedication(medId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/medication/${medId}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    getAppointmentsForEmployee(employeeId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/appointment/${employeeId}`, this.config)
                .then(x => resolve(x.data))
                .catch(error => {
                    alert(error);
                    reject(error);
                });
        });
    }

    createAppointment(appointmentInfo) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/appointments/create`, appointmentInfo, this.config)
            .then(resp =>  {
                resolve(resp.data);
            })
            .catch(err => alert(err));
        });
    }

    // TODO: THERE MAY BE MULTIPLE VERSIONS OF THIS SAME API CALL, 
    // MAKE SURE THERE'S ONLY ONE AT THE END OF DEVELOPMENT...

    // Given a userID, return all the user info for that user.
    

    // getAccountInfo(id) {
    //     return new Promise((resolve, reject) => {
    //         //axios.get(`${this.url}/account/${id}`)
    //         axios.get(`${this.url}/account/${id}`, this.config)
    //         .then(x => resolve(x.data))
    //         .catch(e => {
    //             alert(e);
    //             reject();
    //         });
    //     })
    // }
/*
    getAccount(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/account/${id}`)
            .then(response => {
                resolve(response);
            })
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

    //deleting account - app.delete
    deleteAccount(){
        return new Promise((resolve, reject) => {
        axios.delete(`${this.url}/account`)
        .catch(e => {
            reject();
        });
    })
}

    editListing(id, listing) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/listings/${id}`, listing, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });   
    }


    //posting a listing - used in PostListing.jsx
    postNewListing(state){
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/listings/`, state, this.config)
        })
    }


    getAccountInfo(id) {
        return new Promise((resolve, reject) => {
            //axios.get(`${this.url}/account/${id}`)
            axios.get(`${this.url}/account/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }
    //might need to add params later for searching

    getListing(id) {
        return new Promise((resolve, reject) => {
            
            axios.get(`${this.url}/listings/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

    getListingParams(params){
        return new Promise((resolve, reject) => {
            if (params) {
                let config = this.config;
                config.params = params;
            }
            axios.get(`${this.url}/listings/`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

    getDistListings(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/distributors/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

    getListings() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/listings/`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

    getListingsById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/listings/${id}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

    getOrders(cookie) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders`, {params: {cookie: cookie}, Authorization: "*"})
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

    getAllOrders(){
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders/all`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

    postOrder(listingId, json) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.url}/listings/${listingId}`, json, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        })
    }

*/

} //end repository