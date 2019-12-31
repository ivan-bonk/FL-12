function makeNumber(str) {
    let res = '';

    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i])) {
            res += str[i];
        }
    }
    return res;
}
makeNumber('erer384jjjfd123');