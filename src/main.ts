import { isPreview } from './env';

const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = `
  <h1>ぴかぴか じゅーきーず</h1>
  <p>じゅんびちゅう${isPreview ? '（プレビュー）' : ''}</p>
`;
