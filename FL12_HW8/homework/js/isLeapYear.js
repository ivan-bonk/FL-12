function isLeapYear(date) {
    let dt = new Date(date);
    if (isNaN(dt)) {
        return 'Invalid Date';
    } else if (dt.getFullYear() % 4 === 0) {
        return dt.getFullYear() + ' is a leap year';
    } else {
        return dt.getFullYear() + ' is not a leap year';
    }
}
isLeapYear('2020-01-01 00:00:00');