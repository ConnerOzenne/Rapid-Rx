import React, { Component } from 'react';

export class Navbar extends React.Component {

    state = { clicked: false }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    // !NOTE: This const and the JSX inline styling is temporary and will be cleaned/Bootstrappified later
    render() {

        // The NavBar menu items -- will be stored here for the time being
        // Will probably place this const into a separate .js file in a different directory and import it into here
        const MenuItems = [
            {
                title: 'Home',
                url: '/',
                cName: 'nav-links' // className
            },
            {
                title: 'MyPrescriptions',
                url: '/prescriptions',
                cName: 'nav-links' // className
            },
            {
                title: 'Pharmacy Portal',
                url: '/pharmacies',
                cName: 'nav-links' // className
            },
            {
                title: 'MyPharmacyManager',
                url: '/pharmacy-manager',
                cName: 'nav-links' // className
            },
            {
                title: 'Sign Up',
                url: '/create',
                cName: 'nav-links' // className
            },
            {
                title: 'Log In',
                url: '/login',
                cName: 'nav-links' // className
            },
            {
                title: 'Profile',
                url: '/userProfile',
                cName: 'nav-links' // className
            }
        ];

        /**
         * Can be added after h1 tag in the JSX
         * 
         * <div className="menu-icon" onClick={this.handleClick}>
         *     <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
         * </div>
         */

        // Return Navbar JSX
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">RX</h1>
                
                <ul className="nav-menu">
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>

                <style jsx>{`
                    .NavbarItems {
                        background: #08485E;
                        height: 60px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 1rem;
                    }
                    
                    .NavbarItems a{
                        text-decoration: none;
                    }
                    
                    .navbar-logo {
                        color: #ffffff;
                        justify-self: start;
                        margin-left: 0px;
                        margin-top: 8px;
                        width: 4%;
                        z-index: 3;
                        cursor: pointer;
                    }

                    .navbar-logo-img {
                        margin-top: 4px;
                    }
                    
                    .fa-react {
                        margin-left: 0.5rem;
                        font-size: 1.6rem;
                    }
                    
                    .nav-menu {
                        display: grid;
                        grid-template-columns: repeat(6, auto);
                        grid-gap: 10px;
                        list-style: none;
                        text-align: center;
                        width: 70vw;
                        justify-content: end;
                        margin-right: 2rem;
                        margin-top: 1rem;
                    }
                    
                    .nav-links {
                        color: white;
                        text-decoration: none;
                        padding: 0.5rem 0.8rem;
                    }
                    
                    .nav-links:hover {
                        background-color: #3CB0CD;
                        color: #ffffff;
                        border-radius: 4px;
                        transition: all 0.2s ease-out;
                    }
                    
                    .menu-icon {
                        color: white;
                        display: none;
                    }
                    
                    .nav-links-mobile {
                        display: none;
                    }
                    
                    @media screen and (max-width: 960px) {
                        .NavbarItems {
                            position: relative;
                        }
                    
                        .nav-menu { 
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                            height: 500px;
                            position: absolute;
                            top: 60px;
                            left: -100%;
                            opacity: 1;
                            transition: all 0.5s ease;
                        }
                    
                        .nav-menu.active {
                            background: #08485E;
                            left: 0;
                            opacity: 1;
                            transition: all 0.5s ease;
                            z-index: 2;
                        }
                    
                        .nav-links {
                            text-align: center;
                            padding: 2rem;
                            width: 100%;
                            display: table;
                        }
                    
                        .nav-links:hover {
                            background-color: #3CB0CD;
                            border-radius: 0;
                        }
                    
                        .navbar-logo {
                            position: absolute;
                            top: 0;
                            left: 0;
                            margin-top: -16px;
                            transform: translate(25%, 50%)
                        }
                    
                        .menu-icon {
                            display: block;
                            position: absolute;
                            top: 0;
                            right: 0;
                            margin-top: -8px;
                            transform: translate(-100%, 40%);
                            font-size: 1.8rem;
                            cursor: pointer;
                        }
                    }
                `}</style>
            </nav>
        )
    }
}