function countNumbers(str) {
    let res = {};

    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i])) {
            if (res[str[i]] === undefined) {
                res[str[i]] = 1;
            } else {
                res[str[i]]++;
            }
        }
    }
    return res;
}
countNumbers('jdjjka000466588kkkfs662555');