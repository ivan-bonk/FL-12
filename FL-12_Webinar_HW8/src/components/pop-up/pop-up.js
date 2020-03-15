import React from 'react';

import Edit from './edit.svg';
import Delete from './delete.svg';

import './pop-up.css';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/action';

class PopUp extends React.Component {

    render() {
        return (
            <div className='popUp'>
                <div className="edit-btn" onClick={() => {
                    this.props.actions.editItemBtn(this.props.id)
                }}>
                    <img src={Edit} alt='Edit button' />
                    <span>Edit</span>
                </div>
                <div className="delete-btn" onClick={() => {
                    this.props.actions.deleteItem(this.props.id)
                }}>
                    <img src={Delete} alt='Delete button' />
                    <span>Delete</span>
                </div>
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const connector = connect(null, mapDispatchToProps);

export default connector(PopUp);