import React from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import './WeatherForm.css';

export default class WeatherForm extends React.Component {
    static propTypes = {
        city: PropTypes.string,
        unit: PropTypes.string,
        onQuery: PropTypes.func
    };

    static getUnitString(unit) {
        return unit === 'metric' ? 'C' : 'F';
    }

    constructor(props) {
        super(props);

        this.inputEl = null;
        this.state = {
            inputValue: props.city,
            formToggle: false,
            tempToggle: false,
            unit: props.unit
        };

        this.handleFormToggle = this.handleFormToggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMetricUnit = this.handleMetricUnit.bind(this);
        this.handleImperialUnit = this.handleImperialUnit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTempToggle = this.handleTempToggle.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            inputValue: nextProps.city,
            unit: nextProps.unit
        });
    }

    render() {
        const form = this.state.formToggle ? 'form' : '';

        return (
            <div className={`weather-form ${form}`}>{this.state.formToggle ?
                <Form className='form-inline justify-content-center' onSubmit={this.handleSubmit}>
                    <Input type='text' name='city' innerRef={el => {this.inputEl = el}} value={this.state.inputValue} onChange={this.handleInputChange}></Input>&nbsp;
                    <ButtonDropdown type='buttom' isOpen={this.state.tempToggle} toggle={this.handleTempToggle}>
                        <DropdownToggle type='button' caret color="light">
                            &ordm; {WeatherForm.getUnitString(this.state.unit)}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem type='button' onClick={this.handleMetricUnit}>&ordm; C</DropdownItem>
                            <DropdownItem type='button' onClick={this.handleImperialUnit}>&ordm; F</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>&nbsp;
                    <Button color="info">Check</Button>
                </Form>
                :
                <Button className='btn-form' outline color="light" onClick={this.handleFormToggle}><i className='fa fa-map-marker' aria-hidden="true"></i>&nbsp;&nbsp;{this.props.city}</Button>
            }</div>
        );
    }

    handleFormToggle() {
        this.setState((prevState, props) => ({
            formToggle: !prevState.formToggle
        }));
    }

    handleInputChange(e) {
        this.setState({inputValue: e.target.value});
    }

    handleMetricUnit(e) {
        this.setState({unit: 'metric'});
    }

    handleImperialUnit(e) {
        this.setState({unit: 'imperial'});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.inputEl.blur();
        if (this.state.inputValue && this.state.inputValue.trim()) {
            this.props.onQuery(this.state.inputValue, this.state.unit);
            this.handleFormToggle();
        } else {
            this.state.inputEl = this.props.city;
        }
    }

    handleTempToggle(e) {
        this.setState((prevState, props) => ({
            tempToggle: !prevState.tempToggle
        }));
    }
}
