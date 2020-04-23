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
    NavLink,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from 'reactstrap';
import PropTypes from 'prop-types';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Today from 'components/Today.jsx';
import Forecast from 'components/Forecast.jsx';

import './Main.css';

class Main extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        const { cookies } = props;
        this.state = {
            unit: 'metric',
            // city: 'na',
            navbarToggle: false,
            favoriteCities: cookies.get('cities')? cookies.get('cities').split(';') : [],
            // group: 'owf-902'
        };

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleUnitChange = this.handleUnitChange.bind(this);
        this.handleFormQuery = this.handleFormQuery.bind(this);
        this.setFavoriteCities = this.setFavoriteCities.bind(this);
        this.clearFavoriteCities = this.clearFavoriteCities.bind(this);
    }

    render() {
        return (
            <Router>
                {/* group��讐儔銝齿�� */}
                <div className={`main bg-faded ${this.state.group}`}>
                    <div className='container'>
                        <Navbar color="faded" light expand="md">
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
                                    <UncontrolledDropdown>
                                        <DropdownToggle nav caret>
                                            Favorite City
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                            {this.state.favoriteCities.map(m => 
                                                <DropdownItem key={m} onClick={() => this.setState({'city': m})}>
                                                    {m}
                                                </DropdownItem>)}
                                            <DropdownItem divider />
                                            <DropdownItem onClick={this.clearFavoriteCities}>
                                                Clear
                                            </DropdownItem>
                                        </DropdownMenu>

                                    </UncontrolledDropdown>
                                </Nav>
                                <span className='navbar-text ml-auto'>DataLab</span>
                            </Collapse>
                        </Navbar>
                    </div>

                    <Route exact path="/" render={() => (
                        <Today 
                            // city={this.state.city} 
                            unit={this.state.unit} 
                            onQuery={this.handleFormQuery} // JC it seems the key to cookies
                            onUnitChange={this.handleUnitChange}
                        />
                    )}/>
                    <Route exact path="/forecast" render={() => (
                        <Forecast 
                            // city={this.state.city} 
                            unit={this.state.unit} 
                            onQuery={this.handleFormQuery} // JC it seems the key to cookies 
                            onUnitChange={this.handleUnitChange} 
                        />
                    )}/>
                </div>
            </Router>
        );
    }

    setFavoriteCities(city) {
        // JC add
        var cookies = this.props.cookies; 

        if (!cookies.get('cities')) {
            cookies.set('cities', city, {path: '/'});
            this.setState({
                favoriteCities: [city]
            });
        } else {
            var cities = cookies.get('cities').split(";");

            if (!cities.includes(city)) {
                cities.push(city);
                cookies.set('cities', cities.join(';'));
                this.setState({
                    favoriteCities: cities
                });
            }
        }
    }

    handleNavbarToggle() {
        this.setState((prevState, props) => ({
            navbarToggle: !prevState.navbarToggle
        }));
    }

    handleFormQuery(city, unit) {
        this.setState({
            // city: city,
            unit: unit
        }, ()=>{this.setFavoriteCities(city);});
    }

    handleUnitChange(unit) {
        this.setState({
            unit: unit
        });
    }

    clearFavoriteCities() {
        // JC add
        var cookies = this.props.cookies;
        cookies.remove('cities');
        this.setState({
            favoriteCities: []
        });
    }

}

export default withCookies(Main);