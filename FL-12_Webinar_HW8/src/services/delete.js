export default (arr, id) => {
    const idx = arr.findIndex((el) => el.id === id);

    const newArray = [
        ...arr.slice(0, idx),
        ...arr.slice(idx + 1)
    ];
    return newArray
}