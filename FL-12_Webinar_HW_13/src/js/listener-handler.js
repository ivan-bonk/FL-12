import { board, emptyItems } from './add-data';
import { clickFn } from './turns';

export const enableListeners = () => emptyItems().forEach(_qEl => _qEl.addEventListener('click', clickFn));
export const disableListeners = () => board().forEach(_qEl => _qEl.removeEventListener('click', clickFn));
