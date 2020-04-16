import React from 'react';
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
    NavLink
} from 'reactstrap';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';

import './Main.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            unit: 'metric',
            navbarToggle: false
        };

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
    }

    render() {
        return (
            <Router>
                <div className={`main bg-faded ${this.state.group}`}>
                    <div className='container'>
                        <Navbar color="faded" light expand="md">>
                            <NavbarBrand className='text-info' href="/">WeatherMood</NavbarBrand>
                            <NavbarToggler onClick={this.handleNavbarToggle}/>
                            <Collapse isOpen={this.state.navbarToggle} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink tag={Link} to='/'>Today</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to='/forecast'>Forecast</NavLink>
                                    </NavItem>
                                </Nav>
                                <span className='navbar-text ml-auto'>DataLab</span>
                            </Collapse>
                        </Navbar>
                    </div>

                    <Route exact path="/" render={() => (
                        <Today unit={this.state.unit} onUnitChange={this.handleUnitChange} />
                    )}/>
                    <Route exact path="/forecast" render={() => (
                        <Forecast unit={this.state.unit} onUnitChange={this.handleUnitChange} />
                    )}/>
                </div>
            </Router>
        );
    }

    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }

    handleUnitChange(unit) {
        this.setState({
            unit: unit
        });
    }
}
