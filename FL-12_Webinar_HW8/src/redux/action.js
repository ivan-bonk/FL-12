import {FILTER, DELETE, 
        ADDITEM, CANCEL, 
        EDITITEM, SAVE, UPDATE} from './types';


export const filterList = (text) => {
    return {
        type: FILTER,
        payload: {text}
    }
}

export const deleteItem = (id) => {
    return {
        type: DELETE,
        payload: {id}
    }
}

export const addNewBtn = () => {
    return {
        type: ADDITEM
    }
}

export const cancelEdit = () => {
    return {
        type: CANCEL
    }
}

export const editItemBtn = (id) => {
    return {
        type: EDITITEM,
        payload: {id}
    }
}

export const saveItem = () => {
    return {
        type: SAVE
    }
}

export const updateData = (data) => {
    return {
        type: UPDATE,
        payload: {data}
    }
}