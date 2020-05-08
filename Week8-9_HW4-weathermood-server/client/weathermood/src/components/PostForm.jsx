import React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import {getMoodIcon} from 'utilities/weather.js';

import './PostForm.css';

export default class PostForm extends React.Component {
    static propTypes = {
        onPost: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            inputValue: props.city,
            inputDanger: false,
            moodToggle: false,
            mood: 'na'
        };
        this.inputEl = null;
        this.moodToggleEl = null;

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownSelect = this.handleDropdownSelect.bind(this);
        this.handleMoodToggle = this.handleMoodToggle.bind(this);

        this.handlePost = this.handlePost.bind(this);
    }

    render() {
        const {inputValue, moodToggle, mood} = this.state;
        const inputDanger = this.state.inputDanger ? 'is-invalid' : '';
        
        return (
            <div className='post-form'>
                <Alert color='info' className={`d-flex flex-column flex-sm-row justify-content-center`}>
                    <div className='mood align-self-start'>
                        <ButtonDropdown type='buttom' isOpen={moodToggle} toggle={this.handleMoodToggle}>
                            <DropdownToggle className='mood-toggle' type='button' caret color="secondary">
                                <i className={getMoodIcon(mood)}></i>&nbsp;{
                                    mood === 'na' ? 'Mood' : mood
                                }
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Clear')}><i className={getMoodIcon('Clear')}></i>&nbsp;&nbsp;Clear</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Clouds')}><i className={getMoodIcon('Clouds')}></i>&nbsp;&nbsp;Clouds</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Drizzle')}><i className={getMoodIcon('Drizzle')}></i>&nbsp;&nbsp;Drizzle</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Rain')}><i className={getMoodIcon('Rain')}></i>&nbsp;&nbsp;Rain</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Thunder')}><i className={getMoodIcon('Thunder')}></i>&nbsp;&nbsp;Thunder</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Snow')}><i className={getMoodIcon('Snow')}></i>&nbsp;&nbsp;Snow</DropdownItem>
                                <DropdownItem type='button' onClick={() => this.handleDropdownSelect('Windy')}><i className={getMoodIcon('Windy')}></i>&nbsp;&nbsp;Windy</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </div>
                    <Input className={`input ${inputDanger}`} type='textarea' innerRef={el => {this.inputEl = el}} value={inputValue} onChange={this.handleInputChange} placeholder="What's on your mind?"></Input>
                    <Button className='btn-post align-self-end' color="info" onClick={this.handlePost}>Post</Button>
                </Alert>
            </div>
        );
    }

    handleDropdownSelect(mood) {
        this.setState({mood: mood});
    }

    handleInputChange(e) {
        const text = e.target.value
        this.setState({inputValue: text});
        if (text) {
            this.setState({inputDanger: false});
        }
    }

    handleMoodToggle(e) {
        this.setState((prevState, props) => ({
            moodToggle: !prevState.moodToggle
        }));
    }

    handlePost() {
        if (this.state.mood === 'na') {
            this.setState({moodToggle: true});
            return;
        }
        if (!this.state.inputValue) {
            this.setState({inputDanger: true});
            return;
        }

        this.props.onPost(this.state.mood, this.state.inputValue);
        this.setState({
            inputValue: '',
            mood: 'na'
        });
    }
}
