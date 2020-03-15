import React, { Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/action';

import './item-redactor.css';

class ItemRedactor extends Component {

    onChangeTitle = (e) => {
        this.props.actions.updateData({
            title: e.target.value
        });
    }
    onChangeDesc = (e) => {
        this.props.actions.updateData({
            description: e.target.value
        });
        
    }
    onChangeDuration = (e) => {
        this.props.actions.updateData({
            duration: e.target.value
        });
    }
    onChangeAuthor = (e) => {
        this.props.actions.updateData({
            author: e.target.value
        });
    }
    onChangeDate = (e) => {
        this.props.actions.updateData({
            date: e.target.value
        });
    }

    onSave = (e) => {
        e.preventDefault();

        const {title, description, duration, date, author} = this.props.data.newItem;
 
        if(title && description && duration && date && author) {
            this.props.actions.saveItem();
        } else {
            alert('Fill all inputs');
        }
        
    }

    render() {
        const {title = '', description='', duration='', date='', author=''} = this.props.data.newItem;
        const {pageTitle} = this.props;
        
        return (
            <div className='wrapper'>
                <h2 className="title">
                    {pageTitle}
                </h2>
                <form>
                    <div className="title-block">
                        <label>Title*</label>
                        <input type="text" className='title-input'
                            required defaultValue={title}
                            onChange={this.onChangeTitle}
                            name='title'
                        />
                    </div>
                    <div className="desc-block">
                        <label>Description*</label>
                        <textarea 
                            required defaultValue={description}
                            onChange={this.onChangeDesc}
                        />
                    </div>
                <div className="flex-block" >
                    <div className="left-block">
                        <div className="duration-block">
                            <label>Duration*</label>
                            <input type="text" className='duration-input'
                                required defaultValue={duration}
                                onChange={this.onChangeDuration}
                            />
                        </div>
                        <div className="author-block">
                            <label>Author*</label>
                            <input type="text" className='Author-input'
                                required defaultValue={author}
                                onChange={this.onChangeAuthor}
                            />
                        </div>
                    </div>
                    <div className="right-block" >
                        <label >Date*</label>
                        <input type="date"
                            required defaultValue={date}
                            onChange={this.onChangeDate}
                        />
                    </div>
                </div>
                <div className="buttons" >
                    <button className="save-btn"
                    onClick={this.onSave}>Save</button>
                    <div className="cancel-btn" 
                        onClick={() => this.props.actions.cancelEdit()}>Cancel</div>
                </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}
const connector = connect(mapStateToProps ,mapDispatchToProps);

export default connector(ItemRedactor);