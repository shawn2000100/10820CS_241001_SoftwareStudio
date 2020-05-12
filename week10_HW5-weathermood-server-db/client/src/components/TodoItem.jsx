import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// import {accomplishTodo} from 'states/todo-actions.js';
import {getMoodIcon} from 'utilities/weather.js';

import './TodoItem.css';

export default class TodoItem extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        mood: PropTypes.string,
        text: PropTypes.string,
        ts: PropTypes.number,
        doneTs: PropTypes.number,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
    }

    render() {
        const {id, mood, text, ts, doneTs} = this.props;

        return (
            <div className={'todo-item d-flex flex-column ' + (doneTs ? 'done' : 'undone')}  onClick={this.handleCheckboxCheck}>
                <div className='todo d-flex'>
                    <div className='mood'><i className={getMoodIcon(mood)}></i></div>
                    <div className='wrap'>
                        <div className='ts'>{'Created: ' + moment(ts * 1000).calendar()}</div>
                        <div className='text'>{text}</div>
                    </div>
                </div>
                <div className='check d-flex justify-content-end align-items-center'>
                    <div className='done-ts'>{
                        !!doneTs &&
                        <span>{moment(doneTs * 1000).calendar()}</span>
                    }</div>
                    <div className='checkbox' >
                        <i className={'far ' + (doneTs ? 'fa-check-square' : 'fa-square')} aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        );
    }

    handleCheckboxCheck(e) {
        if (!this.props.doneTs) {
            this.props.accomplishTodo(this.props.id);
        }
    }
}
