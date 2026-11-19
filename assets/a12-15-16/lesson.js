import { groups, notes, story, questions } from './content.js?v=2';
import { glossary } from './glossary.js?v=2';

const roles = {
  S: 'Özne', V: 'Fiil öbeği', O: 'Doğrudan nesne', I: 'Dolaylı tümleç',
  C: 'Yer, zaman veya başka bir tümleç', A: 'Nitelik veya saat bilgisi',
  P: 'Ortaç', B: 'Bağlayıcı', D: 'Ünlem veya konuşma belirteci',
};
const get = id => document.getElementById(id);
const tabs = [...document.querySelectorAll('[role="tab"]')];
const pages = tabs.map(tab => get(tab.getAttribute('aria-controls')));
const card = get('word-card');
let activeWord = null;
let pageIndex = 0;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function putWords(parent, text) {
  let from = 0;
  for (const match of text.matchAll(/\p{L}+/gu)) {
    const word = match[0];
    parent.append(text.slice(from, match.index));
    const button = element('button', 'word', word);
    button.type = 'button';
    button.dataset.word = word.toLowerCase();
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'word-card');
    parent.append(button);
    from = match.index + word.length;
  }
  parent.append(text.slice(from));
}

function sentence(source) {
  const line = element('span', 'sentence');
  line.lang = 'es';
  for (const [index, part] of source.split('|').entries()) {
    if (index > 0) line.append(' ');
    const chunk = element('span', 'phrase');
    chunk.dataset.role = part[0];
    putWords(chunk, part.slice(2));
    line.append(chunk);
  }
  return line;
}

for (const node of document.querySelectorAll('[data-es]')) {
  const text = node.textContent;
  node.replaceChildren();
  putWords(node, text);
}
putWords(get('estar-forms'), notes.conjugation);
putWords(get('regular-gerunds'), notes.formation);
putWords(get('irregular-gerunds'), notes.irregular);
for (const source of notes.placement) {
  const block = element('div');
  block.append(sentence(source));
  get('placement-examples').append(block);
}

for (const group of groups) {
  const box = element('article', 'card periphrasis-group');
  const heading = element('div', 'group-head');
  const name = element('span', 'form-label');
  name.lang = 'es';
  putWords(name, group.form);
  heading.append(element('h3', '', group.title), name);
  box.append(heading);
  if (group.note) box.append(element('p', 'group-note', group.note));
  const table = element('table', 'summary-table');
  const header = element('thead');
  const headerRow = element('tr');
  for (const label of ['Yapı', 'Ne anlatır?', 'Örnek']) {
    const th = element('th', '', label);
    th.scope = 'col';
    headerRow.append(th);
  }
  header.append(headerRow);
  const body = element('tbody');
  for (const [structure, use, example, meaning] of group.rows) {
    const row = element('tr');
    const formula = element('td');
    formula.lang = 'es';
    putWords(formula, structure);
    const sample = element('td');
    sample.append(sentence(example), element('span', 'example-translation', meaning));
    row.append(formula, element('td', '', use), sample);
    body.append(row);
  }
  table.append(header, body);
  box.append(table);
  get('periphrasis-groups').append(box);
}

for (const paragraph of story) {
  const block = element('p');
  paragraph.forEach((line, index) => {
    if (index > 0) block.append(' ');
    block.append(sentence(line));
  });
  get('story').append(block);
}
for (const [i, [prompt, answer]] of questions.entries()) {
  const block = element('article', 'card reading-question');
  const answerId = 'answer-' + (i + 1);
  const model = element('p', 'solution');
  model.id = answerId;
  model.hidden = true;
  model.append(sentence(answer));
  const button = element('button', 'lock', '🔒 Cevabı aç');
  button.type = 'button';
  button.setAttribute('aria-controls', answerId);
  button.setAttribute('aria-expanded', 'false');
  button.addEventListener('click', () => {
    closeWord();
    model.hidden = !model.hidden;
    button.textContent = model.hidden ? '🔒 Cevabı aç' : '🔓 Cevabı gizle';
    button.setAttribute('aria-expanded', String(!model.hidden));
  });
  const question = element('div', 'reading-prompt');
  question.append(element('span', 'question-number', (i + 1) + '.'), sentence(prompt));
  block.append(question, button, model);
  get('questions').append(block);
}

function positionWord() {
  if (!activeWord) return;
  const bounds = activeWord.getBoundingClientRect();
  const below = bounds.bottom + 8;
  card.style.left = Math.max(12, Math.min(bounds.left, innerWidth - card.offsetWidth - 12)) + 'px';
  card.style.top = Math.max(12, below + card.offsetHeight + 12 <= innerHeight ? below : bounds.top - card.offsetHeight - 8) + 'px';
}

function closeWord(returnFocus = false) {
  if (!activeWord) return;
  const anchor = activeWord;
  activeWord = null;
  anchor.setAttribute('aria-expanded', 'false');
  anchor.closest('.sentence')?.classList.remove('is-active');
  card.hidden = true;
  if (returnFocus) anchor.focus({preventScroll:true});
}

function openWord(button) {
  if (button === activeWord) { closeWord(true); return; }
  closeWord();
  const entry = glossary.get(button.dataset.word);
  if (!entry) return;
  const line = button.closest('.sentence');
  const role = button.closest('[data-role]')?.dataset.role;
  get('word-title').textContent = button.textContent;
  get('word-tr').textContent = entry.tr;
  get('word-en').textContent = entry.en;
  get('word-role').textContent = roles[role] ?? '';
  get('word-role').hidden = !role;
  get('word-context').hidden = !line;
  get('word-context').open = false;
  get('word-sentence').textContent = line?.textContent ?? '';
  get('word-dictionary').href = 'https://dle.rae.es/' + encodeURIComponent(entry.lemma);
  activeWord = button;
  line?.classList.add('is-active');
  button.setAttribute('aria-expanded', 'true');
  card.hidden = false;
  positionWord();
  get('word-close').focus({preventScroll:true});
}

document.addEventListener('click', event => {
  const word = event.target.closest('.word');
  if (word) openWord(word);
  else if (!card.contains(event.target)) closeWord();
});
get('word-close').addEventListener('click', () => closeWord(true));
get('word-context').addEventListener('toggle', positionWord);
window.addEventListener('resize', positionWord);
window.addEventListener('scroll', positionWord);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && activeWord) closeWord(true);
});

function showPage(index, moveFocus = false) {
  closeWord();
  pageIndex = index;
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
    pages[i].hidden = i !== index;
  });
  get('previous').hidden = index === 0;
  get('next').hidden = index === pages.length - 1;
  get('section-count').textContent = (index + 1) + ' / ' + pages.length;
  if (moveFocus) {
    pages[index].querySelector('h2').focus({preventScroll:true});
    window.scrollTo(0, 0);
  }
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showPage(index, true));
  tab.addEventListener('keydown', event => {
    const target = {ArrowLeft:(index + tabs.length - 1) % tabs.length, ArrowRight:(index + 1) % tabs.length, Home:0, End:tabs.length - 1}[event.key];
    if (target === undefined) return;
    event.preventDefault();
    showPage(target);
    tabs[target].focus();
  });
});
get('previous').addEventListener('click', () => showPage(pageIndex - 1, true));
get('next').addEventListener('click', () => showPage(pageIndex + 1, true));
const section = location.hash.slice(1);
if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
showPage(['lectura', 'reading', 'readingCard', 'quizScreen', 'okuma'].includes(section) ? 1 : 0);

for (const trigger of document.querySelectorAll('[data-dialog]')) {
  const dialog = get(trigger.dataset.dialog);
  trigger.addEventListener('click', () => {
    closeWord();
    dialog.showModal();
    trigger.setAttribute('aria-expanded', 'true');
    if (dialog.id === 'classroom-homework') document.body.classList.add('classroom-homework-open');
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('classroom-homework-open');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus({preventScroll:true});
  });
}
for (const button of document.querySelectorAll('[data-print]')) {
  button.addEventListener('click', () => window.print());
}
