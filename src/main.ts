import './style.css';
import { mountCleaning } from './cleaning';
import { isPreview } from './env';
import { excavator } from './vehicles/excavator';

if (isPreview) document.body.insertAdjacentHTML('beforeend', '<div class="badge">プレビュー</div>');

void mountCleaning(document.querySelector<HTMLDivElement>('#app')!, excavator);
