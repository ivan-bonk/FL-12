export default (items, text) => {
    if (text.lenght === 0) {
        return items;
    }

    return items.filter((item) => {
        return item.title.toUpperCase().indexOf(text.toUpperCase()) > -1;
    })
}