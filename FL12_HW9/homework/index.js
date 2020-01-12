function convert() {
    let res = [];
    for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'string') {
            res.push(parseInt(arguments[i]));
        } else if (typeof arguments[i] === 'number') {
            res.push('' + arguments[i]);
        }
    }
    return res;
}

convert();

function executeforEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}

function mapArray(arr, func) {
    let res = [];
    executeforEach(arr, function (el) {
        res.push(func(el));
    });
    return res;
}

function filterArray(arr, func) {
    let res = [];
    executeforEach(arr, function (el) {
        if (func(el)) {
            res.push(el);
        }
    });
    return res;
}

filterArray();

function flipOver(str) {
    let res = '';
    for (let i = str.length - 1; i >= 0; i--) {
        res += str[i];
    }
    return res;
}

flipOver();

function makeListFromRange(range) {
    let res = [];
    for (let i = range[0]; i <= range[1]; i++) {
        res.push(i);
    }
    return res;
}

makeListFromRange();

const actors = [{
        name: 'tommy',
        age: 36
    },
    {
        name: 'lee',
        age: 28
    }
];

function getArrayOfKeys(arr, key) {
    let res = [];
    executeforEach(arr, function (el) {
        res.push(el[key]);
    });
    return res;
}

getArrayOfKeys();

function substitute(arr) {
    let res = [];
    const THRT = 30;
    mapArray(arr, function (el) {
        if (el < THRT) {
            res.push('*');
        } else {
            res.push(el);
        }
    });
    return res;
}

substitute();

function getPastDay(currentDate, days) {
    let date = new Date(currentDate);
    let pastDate = new Date(date);

    pastDate.setDate(date.getDate() - days);
    return pastDate.getDate();
}

getPastDay();

function formatDate(time) {
    const TEN = 10;
    let min = time.getMinutes() < TEN ? '0' + time.getMinutes() : time.getMinutes(),
        hour = time.getHours() < TEN ? '0' + time.getHours() : time.getHours();

    return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${hour}:${min}`;
}

formatDate();