import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button,
    InputGroup
} from 'reactstrap';
import {connect} from 'react-redux';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';
import {setSearchText} from 'states/post-actions.js';
import {toggleNavbar} from 'states/main-actions.js';

import {withAuthenticator, AmplifyGreetings, AmplifySignOut} from "@aws-amplify/ui-react";
import {Auth, amazonSignInButton} from "aws-amplify";

import './Main.css';


class Main extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        navbarToggle: PropTypes.bool,
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.searchEl = null;
        this.state={
            Name: "aaa",
            User: null
        }

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    componentDidMount() {
        this.loadUser(); // The first check
    }

    loadUser() {
        Auth.currentAuthenticatedUser().then(user=>{
            let str = "";
            if(user.username){
                str = user.username;
            }
            if(user.name){
                str = user.name;
            }
            this.setState({
                Name: str,
                User: user
            })
        }).catch(
            this.setState({
                Name: null,
                User: null
            })
        );
    }

    onHubCapsule(capsule) {
        this.loadUser(); // Triggered every time user sign in / out
    }

    render() {
        console.log("user: ");
        console.log(this.state.User);
        //console.log(this.props.authData);  //這個authData好像沒啥用 
        return (
            <Router>
                <div className='main'>
                    <div className='bg-faded'>
                        <div className='container'>
                            <Navbar color='faded' light expand>
                                <NavbarToggler onClick={this.handleNavbarToggle}/>
                                <NavbarBrand className='text-info' href="/">WeatherMood</NavbarBrand>
                                <Collapse isOpen={this.props.navbarToggle} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink tag={Link} to='/'>Today</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                        </NavItem>
                                    </Nav>
                                    <div className='search ml-auto'>
                                        <Input className='ml-auto' type='text' placeholder='Search' onKeyPress={this.handleSearchKeyPress} innerRef={e => this.searchEl = e}></Input>{
                                            this.props.searchText &&
                                            <i className='navbar-text fa fa-times' onClick={this.handleClearSearch}></i>
                                        }
                                    </div>
                                </Collapse>
                                <span class="navbar-text text-white">
                                    Hi,{this.state.Name}
                                </span>
                                <AmplifySignOut></AmplifySignOut>
                            </Navbar>
                        </div>
                    </div>
                    <Route exact path="/" render={() => (
                        <Today UserName={this.state.Name}/>
                    )}/>
                    <Route exact path="/forecast" render={() => (
                        <Forecast />
                    )}/>
                    <div className='footer'>
                        DataLab.
                    </div>
                </div>
            </Router>
        );
    }

    handleNavbarToggle() {
        this.props.dispatch(toggleNavbar());
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13){
            this.props.dispatch(setSearchText(e.target.value));
        }
    }

    handleClearSearch() {
        this.props.dispatch(setSearchText(''));
        this.searchEl.value = '';
    }
}

export default withAuthenticator(connect(state => ({
    ...state.main,
    searchText: state.searchText,
}))(Main));
