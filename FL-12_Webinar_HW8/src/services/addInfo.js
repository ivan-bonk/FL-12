export default (arr, item) => {
    if(!item.id) {
        item.id = arr[arr.length-1].id + 1;
        return [...arr, item];
    }

    const idx = arr.findIndex((el) => el.id === item.id);
    
    return [
        ...arr.slice(0, idx), 
        item, 
        ...arr.slice(idx + 1)
    ];
}