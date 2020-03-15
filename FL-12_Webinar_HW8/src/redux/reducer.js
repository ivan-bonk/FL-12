import search from '../services/search';
import deleteItem from '../services/delete';
import addInfo from '../services/addInfo';
import { FILTER, DELETE, ADDITEM, CANCEL, EDITITEM, SAVE, UPDATE } from './types';

import testData from '../services/testData';

const initialState = {
    courseList: testData,
    text: '',
    edit: false,
    editId: null,
    newBtn: false,
    shownItems: testData,
    newItem: {}
}

function searchItemById (arr, id){
    return arr.filter((el) => 
        el.id === id )[0];
}

const reducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case FILTER: return {
            ...state,
            text: action.payload.text,
            shownItems: search(state.courseList, action.payload.text)
        }
        case DELETE: return {
            ...state,
            courseList: deleteItem(state.courseList, action.payload.id)

        }
        case ADDITEM: return {
            ...state,
            newBtn: true
        }
        case CANCEL: return {
            ...state,
            newItem: {},
            edit: false,
            newBtn: false
        }
        
        case EDITITEM: return {
            ...state,
            edit: true,
            newItem: searchItemById(state.courseList, action.payload.id)
        }
        case UPDATE: return {
            ...state,
            newItem: { ...state.newItem, ...action.payload.data }
        }
        case SAVE: return {
            ...state, 
            edit: false,
            newBtn: false,
            courseList: addInfo(state.courseList, state.newItem),
            newItem: {}
        }
        default: return state;
    }
}

export default reducer;


