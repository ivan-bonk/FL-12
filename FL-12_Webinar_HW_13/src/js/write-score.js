export default (player) => {
    const table = document.querySelector(`.${player}`);
    let current = parseInt(table.innerText);
    
    table.innerText = ++current;
}