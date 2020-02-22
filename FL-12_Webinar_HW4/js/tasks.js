// task 1///////////////////////

function maxElement(arr) {
    return Math.max(...arr);
}

let array = [1,5,7,45,76,98,309,678,4,6,2,5];
console.log(maxElement(array))

// task 2 ////////////////////////////

function copyArray(arr) {
    return [...arr];
}

const arr1 = [1,2,3];
const copyArr = copyArray(arr1);

console.log(arr1, copyArr);
console.log(arr1 === copyArr);


// task 3 ////////////////////////////

function addUniqueId(obj) {
    const shallowCopy = {...obj};
    shallowCopy.id = Symbol('id');
    return shallowCopy;
}

const test = {name: 'Ivan'};
console.log(addUniqueId(test));

// task 4 /////////////////////////////

const testOnj = {
    name: 'Someone',
    details: {
        id: 1,
        age: 20,
        university: 'NULP'
    }
}

function regroupObject(obj) {
    const {name: firstName, details: {id, age, university}} = obj;
    return {
        university,
        user: {
            age, 
            firstName, 
            id
        }
    };
}

console.log(regroupObject(testOnj));

// task 5 ////////////////////////

function findUnoqueElements(array) {
    const uniqu = new Set(array); 
    return Array.from(uniqu);
}

const arr = [1,1,2,2,3,5,4,6,7,5,7,6,8,66,44,4,5];

console.log(findUnoqueElements(arr));

// task 6 //////////////////////////

function hideNumber(number) {
    return number.slice(-4).padStart(number.length, '*');
}
console.log(hideNumber('12345678910'));

// task 7 //////////////////////////////////

function add(...params) {
    if(params.length > 1) {
        return params.reduce((current, next) => (current + next));
    }
    throw new Error('Missing property');
}

console.log(add(1,2,3,4,5));

// task 8  ///////////////////////
