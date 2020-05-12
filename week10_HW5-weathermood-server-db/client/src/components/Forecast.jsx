import React from 'react';
import PropTypes from 'prop-types';
import {Input, Label, Alert} from 'reactstrap'

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherTable from 'components/WeatherTable.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import TodoForm from 'components/TodoForm.jsx';
import TodoList from 'components/TodoList.jsx'
// import TodoItem from 'components/TodoItem.jsx'
import {getForecast, cancelForecast} from 'api/open-weather-map.js';
import {
    listTodos as listTodosFromApi,
    createTodo as createTodoFromApi,
    accomplishTodo as accomplishTodoFromApi
} from 'api/todos.js';

import './Forecast.css';

export default class Forecast extends React.Component {
    static propTypes = {
        unit: PropTypes.string,
        onUnitChange: PropTypes.func
    };

    static getInitForecastState() {
        let list = [];
        for (let i = 0; i < 5; i++) {
            list[i] = {
                ts: -i,
                code: -1,
                group: 'na',
                description: 'N/A',
                temp: NaN
            };
        }
        return {
            city: 'na',
            list,
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            ...Forecast.getInitForecastState(),
            loading: false,
            masking: false,

            todoLoading: false,
            todos: [],
            unaccomplishedOnly: false
        };

        this.handleFormQuery = this.handleFormQuery.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.toggleUnaccomplishedOnly = this.toggleUnaccomplishedOnly.bind(this);
        this.accomplishTodo = this.accomplishTodo.bind(this);
    }

    componentDidMount() {
        this.getForecast('Hsinchu', this.props.unit);
        this.listTodos(this.props.searchText);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.listTodos(nextProps.searchText);
        }
    }

    componentWillUnmount() {
        if (this.state.loading) {
            cancelForecast();
        }
    }

    render() {
        const {unit, onUnitChange} = this.props;
        const {city, list, masking, todoLoading, todos} = this.state;
        const tomorrow = list[0];
        const rests = list.slice(1);

        document.body.className = `weather-bg ${tomorrow.group}`;
        document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

        return (
            <div className='forecast'>
                <div className='tomorrow'>
                    <WeatherForm city={city} unit={unit} onQuery={this.handleFormQuery}/>
                    <WeatherDisplay {...tomorrow} day='tomorrow' unit={unit} masking={masking}/>
                </div>
                <div className='rests'>
                    <WeatherTable list={rests} unit={unit} masking={masking}/>
                </div>
                <div className='todos'>
                    <div className='label d-flex justify-content-between align-items-end'>
                        <h4><i className='fa fa-tags' aria-hidden="true"></i>&nbsp;&nbsp;Todos</h4>
                        <div><Input type="checkbox" checked={this.state.unaccomplishedOnly} onChange={this.toggleUnaccomplishedOnly} />&nbsp;<Label className='accomplished-only' onClick={this.toggleUnaccomplishedOnly}>Unaccomplished</Label></div>
                    </div>
                    <TodoForm onQuery={this.createTodo} />
                    <TodoList todos={todos} accomplishTodo={this.accomplishTodo}/>{
                        todoLoading &&
                        <Alert color='warning' className='loading'>Loading...</Alert>
                    }
                </div>
            </div>
        );
    }

    getForecast(city, unit) {
        this.setState({
            loading: true,
            masking: true,
            city: city // set city state immediately to prevent input text (in WeatherForm) from blinking;
        }, () => { // called back after setState completes
            getForecast(city, unit).then(forecast => {
                this.setState({
                    ...forecast,
                    loading: false
                }, () => this.notifyUnitChange(unit));
            }).catch(err => {
                console.error('Error getting forecast', err);

                this.setState({
                    ...Forecast.getInitForecastState(unit),
                    loading: false
                }, () => this.notifyUnitChange(unit));
            });
        });

        setTimeout(() => {
            this.setState({
                masking: false
            });
        }, 600);
    }

    handleFormQuery(city, unit) {
        this.getForecast(city, unit);
    }

    notifyUnitChange(unit) {
        if (this.props.units !== unit) {
            this.props.onUnitChange(unit);
        }
    }

    listTodos(searchText) {
        if (!this.state.todoLoading){
            this.startLoading()
        } 

        listTodosFromApi(this.state.unaccomplishedOnly, searchText).then(todos => {
            this.setState({
                todos,
                todoLoading: false
            })
        }).catch(err => {
            console.error('Error listing todos', err);
            this.endLoading()
        });
    }

    createTodo(mood, text) {
        this.startLoading()
        createTodoFromApi(mood, text).then(() => {
            this.listTodos(this.props.searchText);
        }).catch(err => {
            console.error('Error creating todos', err);
            this.endLoading()
        });
    }

    accomplishTodo(id) {
        this.startLoading()

        accomplishTodoFromApi(id).then(() => {
            this.listTodos(this.props.searchText);
        }).catch(err => {
            console.error('Error accomplishing todos', err);
            this.endLoading()
        });
    }

    toggleUnaccomplishedOnly() {
        this.setState({
            unaccomplishedOnly: !this.state.unaccomplishedOnly
        }, ()=> {
            this.listTodos(this.props.searchText)
        })
    }

    startLoading() {
        this.setState({
            todoLoading: true
        })
    }

    endLoading() {
        this.setState({
            todoLoading: false
        })
    }
    
}
