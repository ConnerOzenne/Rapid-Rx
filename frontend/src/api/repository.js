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

    // Given a userID, return all the user info for that user.
    getUserOrders(userID) {
        return new Promise((resolve, reject) => {
            console.log(userID)
            axios.get(`${this.url}/user/${userID}/orders`, this.config).then(resp => {
                console.log(resp);
                resolve(resp);
            })
            .catch(e => {
                console.log("repo.getUserOrders(): error")
                console.log(e)
            })
        });
    }

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







}//end repository