import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../redux/action';

import './app.css';

import SearchBar from '../search-bar';
import CourseList from '../course-list';
import AddCourseButton from '../add-course-button';
import Header from '../header';
import Footer from '../footer';
import ItemRedactor from '../item-redactor';

class App extends Component {

    render() {

        const { text, courseList, newBtn, edit, shownItems } = this.props.data;

        const mainPage = (
            <div className='app-wrapper'>
                <div className='search-bar'>
                    <SearchBar onSearchChange={this.onSearchChange} />
                    <AddCourseButton />
                </div>
                <CourseList courses={text ? shownItems : courseList}
                />
            </div>);

        const select = edit ?
            <ItemRedactor pageTitle='Edit course' /> :
            <ItemRedactor pageTitle='New course' />;

        const show = (newBtn || edit) ? select :
            mainPage;

        return (
            <div className='container'>
                <Header />
                {show}
                <Footer />
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

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(App);