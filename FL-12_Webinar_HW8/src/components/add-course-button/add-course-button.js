import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/action';

import './add-course-button.css';

class AddCourseButton extends Component {
    render() {
        return (
            <button className='add-course-btn'
                onClick={() => this.props.actions.addNewBtn()}>
                Add course
            </button>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const connector = connect(null ,mapDispatchToProps);

export default connector(AddCourseButton);