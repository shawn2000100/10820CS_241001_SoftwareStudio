import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert, Label, Input} from 'reactstrap';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherTable from 'components/WeatherTable.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import TodoForm from 'components/TodoForm.jsx';
import TodoList from 'components/TodoList.jsx';
import {cancelForecast} from 'api/open-weather-map.js';
import {getForecast} from 'states/weather-actions.js';
import {listTodos, toggleAndList} from 'states/todo-actions.js';

import './Forecast.css';

class Forecast extends React.Component {
    static propTypes = {
        city: PropTypes.string,
        list: PropTypes.array,
        forecastLoading: PropTypes.bool,
        masking: PropTypes.bool,
        unit: PropTypes.string,
        todoLoading: PropTypes.bool,
        todos: PropTypes.array,
        searchText: PropTypes.string,
        unaccomplishedOnly: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.toggleUnaccomplishedOnly = this.toggleUnaccomplishedOnly.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getForecast('Hsinchu', this.props.unit));
        this.props.dispatch(listTodos(this.props.searchText));
    }

    componentWillUnmount() {
        if (this.props.forecastLoading) {
            cancelForecast();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(listTodos(nextProps.searchText));
        }
    }

    render() {
        const {unit, city, list, masking, todoLoading, todos} = this.props;
        const tomorrow = list[0];
        const rests = list.slice(1);

        document.body.className = `weather-bg ${tomorrow.group}`;
        document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

        return (
            <div className='forecast'>
                <div className='tomorrow'>
                    <WeatherForm city={city} defaultUnit={unit} submitAction={getForecast}/>
                    <WeatherDisplay {...tomorrow} day='tomorrow' unit={unit} masking={masking}/>
                </div>
                <div className='rests'>
                    <WeatherTable list={rests} unit={unit} masking={masking}/>
                </div>
                <div className='todos'>
                    <div className='label d-flex justify-content-between align-items-end'>
                        <h4><i className='fa fa-tags' aria-hidden="true"></i>&nbsp;&nbsp;Todos</h4>
                        <div><Input type="checkbox" checked={this.props.unaccomplishedOnly} onClick={this.toggleUnaccomplishedOnly} />&nbsp;<Label className='accomplished-only' onClick={this.toggleUnaccomplishedOnly}>Unaccomplished</Label></div>
                    </div>
                    <TodoForm />
                    <TodoList todos={todos} />{
                        todoLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>
        );
    }

    toggleUnaccomplishedOnly() {
        this.props.dispatch(toggleAndList());
    }
}

export default connect(state => ({
    ...state.forecast,
    unit: state.unit,
    ...state.todo,
    searchText: state.searchText
}))(Forecast);
