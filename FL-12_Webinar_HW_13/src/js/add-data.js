export const board = () => Array.from(document.getElementsByClassName('board-item'));
export const index = (el) => Number.parseInt(el.id);
export const emptyItems = () => board().filter(el => el.innerText === '');
