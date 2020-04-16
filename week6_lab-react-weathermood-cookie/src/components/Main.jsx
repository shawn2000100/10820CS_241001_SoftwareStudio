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
            city: 'na',
            navbarToggle: false,
            favoriteCities: cookies.get('cities')? cookies.get('cities').split(';') : []
        };

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        this.handleFormQuery = this.handleFormQuery.bind(this);
        this.setFavoriteCities = this.setFavoriteCities.bind(this);
        this.clearFavoriteCities = this.clearFavoriteCities.bind(this);
    }

    // JC add
    componentWillReceiveProps(nextProps) {
        console.log("JC add. comp Will Receive");
        console.log(nextProps)
        // this.setState({
        //     unit: nextProps.unit
        // }, ()=>{});
        console.log("test render");
        var cookies = this.props.cookies
        var cities = cookies.get('cities').split(";");
        console.log(cities);
    }

    render() {
        // var cookies = this.props.cookies
        // var cities = cookies.get('cities').split(";");
        // const options = [];
        // for (let i of cities) { options.push(i); }

        return (
            <Router>
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
                        <Today city={this.state.city} unit={this.state.unit} onQuery={this.handleFormQuery} />
                    )}/>
                    <Route exact path="/forecast" render={() => (
                        <Forecast unit={this.state.unit} onUnitChange={this.handleUnitChange} />
                    )}/>
                </div>
            </Router>
        );
    }

    setFavoriteCities(city) {
        // 先參考
        var cookies = this.props.cookies; 
        // debugger;
        console.log("test setFav....")
        console.log(cookies);
        console.log(city);

        if (!cookies.get('cities')) {
            cookies.set('cities', city, {
            path: '/'
            });
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
        // this.setState((prevState, props) => ({
        //     navbarToggle: !prevState.navbarToggle
        // }));
        this.setState({
            city: city,
            unit: unit
        }, () => {this.setFavoriteCities(this.state.city);});
    }

    handleFormQuery(city, unit) {
        this.setState({
            city: city,
            unit: unit
        }, ()=>{this.setFavoriteCities(city);});
    }

    clearFavoriteCities() {
        // 參考
        var cookies = this.props.cookies;
        cookies.remove('cities');
        this.setState({
            favoriteCities: []
        });
    }
}

export default withCookies(Main);
