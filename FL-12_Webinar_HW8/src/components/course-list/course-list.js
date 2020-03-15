import React, { Component } from 'react';

import './course-list.css';

import CourseItem from '../course-item';

export default class CourseList extends Component {
    render() {
        const {courses} = this.props;

        const items = courses.map((item) => {

            return (
                <li key={item.id} className="course-item">
                    <CourseItem item={item} />
                </li>
            );
        })

        return (
            <ul className='course-list'>
                {items}
            </ul>
        );
    }
}