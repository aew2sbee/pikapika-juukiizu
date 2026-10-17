import './style.css';
import { mountCleaning } from './cleaning';
import { isPreview } from './env';
import { garage } from './garage';
import { excavator } from './vehicles/excavator';

document.body.insertAdjacentHTML('afterbegin', `<div class="garage">${garage}</div>`);
if (isPreview) document.body.insertAdjacentHTML('beforeend', '<div class="badge">プレビュー</div>');

void mountCleaning(document.querySelector<HTMLDivElement>('#app')!, excavator);
