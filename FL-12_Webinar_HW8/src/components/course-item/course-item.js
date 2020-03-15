import React, { Component } from 'react';
import PopUp from '../pop-up';

import './course-item.css';

export default class CourseItem extends Component {

    state = {
        popUpShowed: false
    }

    togglePopUp = () => {
        this.setState(({ popUpShowed }) => {
            return {
                popUpShowed: !popUpShowed
            }
        })
    }

    render() {

        const {id, date, title, description, duration} = this.props.item;

        const { popUpShowed } = this.state;

        const showPop = popUpShowed ? <PopUp id={id}/> : null;

        return (
            <span className='course-item-span'>
                <span className='item-date'>{date}</span>
                <span className='item-title'>{title}</span>
                <span className='item-desc'>{description}</span>
                <span className='item-duration'>{duration}</span>
                <div className='dots-btn' onClick={this.togglePopUp} >...</div>
                {showPop}
            </span>
        )
    }
}


