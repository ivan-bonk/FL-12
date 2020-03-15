import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import './search-bar.css';
import * as actions from '../../redux/action';

class SearchBar extends Component {

    state = {
        text: ''
    }

    onSearchChange = (e) => {
        const text = e.target.value;
        this.setState({ text });

        this.props.actions.filterList(text);
    }

    render() {
        return (
            <form className='search-bar-form'>
                <input className='search-bar-input' type='text' placeholder='Search'
                    onChange={this.onSearchChange}
                    value={this.state.text}
                />
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

const connector = connect(null ,mapDispatchToProps);

export default connector(SearchBar);