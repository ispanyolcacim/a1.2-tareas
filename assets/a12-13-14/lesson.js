'use strict';

const $ = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

function words(text) {
  return [...text.matchAll(/\p{L}+/gu)].reduce(({ html, cursor }, match) => {
    const [word] = match;
    const key = word.toLowerCase();
    if (!vocabulary[key]) throw new Error('Missing Spanish vocabulary: ' + word);
    const suffix = attachedPronouns[key];
    const display = suffix
      ? escapeHtml(word.slice(0, -suffix.length)) + '<span class="attached">' + escapeHtml(suffix) + '</span>'
      : escapeHtml(word);
    return {
      html: html + escapeHtml(text.slice(cursor, match.index)) +
        '<button type="button" class="word" data-word="' + escapeHtml(key) + '">' + display + '</button>',
      cursor: match.index + word.length,
    };
  }, { html: '', cursor: 0 });
}

function spanish(text) {
  const { html, cursor } = words(text);
  return html + escapeHtml(text.slice(cursor));
}

function sentence(pieces) {
  return '<span class="sentence" lang="es">' + pieces.filter(([, text]) => text).map(([role, text]) =>
    '<span class="phrase ' + role + '">' + spanish(text) + '</span>').join(' ') + '</span>';
}

function ongoing(subject, pronoun, auxiliary, gerund, attached, object, time = '') {
  const start = [['other', time], ['subject', subject]];
  return [
    sentence([...start, ['indirect', pronoun], ['verb', auxiliary + ' ' + gerund], ['object', object + '.']]),
    sentence([...start, ['verb', auxiliary + ' ' + attached], ['object', object + '.']]),
  ];
}

document.querySelectorAll('[data-es]').forEach((element) => {
  element.lang = 'es';
  element.innerHTML = spanish(element.textContent);
});
document.querySelector('[data-sentence="juan"]').innerHTML = sentence([['indirect', 'A Juan le'], ['verb', 'gusta'], ['subject', 'el cine.']]);
$('pronounTable').innerHTML = '<table><thead><tr><th scope="col">Kişiyi belirten ifade</th><th scope="col">Zamir</th><th scope="col">Türkçe</th></tr></thead><tbody>' +
  pronouns.map(([emphasis, pronoun, tr]) => '<tr><td lang="es">' + spanish(emphasis) + '</td><td lang="es"><span class="indirect">' +
    spanish(pronoun) + '</span></td><td>' + escapeHtml(tr) + '</td></tr>').join('') + '</tbody></table>';
$('contrasts').innerHTML = contrasts.map(([pieces, label]) =>
  '<div class="contrast"><b>' + escapeHtml(label) + '</b><p>' + sentence(pieces) + '</p></div>').join('');
$('familyGrid').innerHTML = family.map(([verb, meaning, pieces, translation]) => (
  '<article class="card family-card"><h3 lang="es">' + spanish(verb) + '</h3><p class="muted">' + escapeHtml(meaning) + '</p><p>' +
  sentence(pieces) + '</p><p class="muted">' + escapeHtml(translation) + '</p></article>'
)).join('');
$('positionExamples').innerHTML = models.map(([translation, subject, pronoun, auxiliary, gerund, attached, object]) => {
  const [before, after] = ongoing(subject, pronoun, auxiliary, gerund, attached, object);
  return '<article class="card"><h3>' + escapeHtml(translation) + '</h3><p><span class="example-label">Başta</span><br>' +
    before + '</p><p><span class="example-label">Sonda</span><br>' + after + '</p></article>';
}).join('');

function translationRow(translation, id, answers, label) {
  return '<div class="trans-row"><p>' + escapeHtml(translation) + '</p><button type="button" class="lock" aria-expanded="false" aria-controls="' +
    id + '" aria-label="' + escapeHtml(label) + ' cevabını aç">🔒</button></div>' +
    '<div class="solution" hidden id="' + id + '">' + answers.map((answer) => '<p>' + answer + '</p>').join('') + '</div>';
}

$('translationPairs').innerHTML = translationPairs.map(([habit, inProgress, time, subject, pronoun, present, auxiliary, gerund, attached, object], index) => {
  const number = index + 1;
  const routine = sentence([['other', time + ','], ['subject', subject], ['indirect', pronoun], ['verb', present], ['object', object + '.']]);
  const progress = ongoing(subject, pronoun, auxiliary, gerund, attached, object, 'Ahora');
  return '<article class="card exercise"><h2 class="exercise-number">' + number + '.</h2>' +
    translationRow(habit, 'habit-' + number, [routine], number + '. örneğin rutin cümlesi') +
    translationRow(inProgress, 'ongoing-' + number, progress, number + '. örneğin şu an cümlesi') + '</article>';
}).join('');

const tabs = [...document.querySelectorAll('[role="tab"]')];
let selectedTab = 0;

function selectTab(index, focus = false) {
  selectedTab = index;
  tabs.forEach((tab, position) => {
    const active = position === index;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    $(tab.getAttribute('aria-controls')).hidden = !active;
  });
  $('previousSection').disabled = index === 0;
  $('nextSection').disabled = index === tabs.length - 1;
  $('sectionCount').textContent = (index + 1) + ' / ' + tabs.length;
  if (focus) tabs[index].focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(index));
  tab.addEventListener('keydown', (event) => {
    const targets = { ArrowLeft: (index + tabs.length - 1) % tabs.length, ArrowRight: (index + 1) % tabs.length, Home: 0, End: tabs.length - 1 };
    if (event.key in targets) {
      event.preventDefault();
      selectTab(targets[event.key], true);
    }
  });
});
$('previousSection').addEventListener('click', () => selectTab(selectedTab - 1, true));
$('nextSection').addEventListener('click', () => selectTab(selectedTab + 1, true));
const fragment = location.hash.slice(1);
const initialTab = tabs.findIndex((tab) => tab.getAttribute('aria-controls') === fragment);
selectTab(Math.max(0, initialTab));
if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);

$('translationPairs').addEventListener('click', (event) => {
  const button = event.target.closest('button.lock');
  if (!button) return;
  const solution = $(button.getAttribute('aria-controls'));
  const open = solution.hidden;
  solution.hidden = !open;
  button.textContent = open ? '🔓' : '🔒';
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', button.getAttribute('aria-label').replace(/(aç|kapat)$/, open ? 'kapat' : 'aç'));
});

document.querySelector('main').addEventListener('click', (event) => {
  const button = event.target.closest('[data-word]');
  if (!button) return;
  const key = button.dataset.word;
  const [tr, en, lemma = key] = vocabulary[key];
  const suffix = attachedPronouns[key];
  $('wordTitle').textContent = button.textContent;
  $('wordTr').textContent = suffix ? tr + ' · ' + suffix + ' (' + vocabulary[suffix][0] + ')' : tr;
  $('wordEn').textContent = suffix ? en + ' · ' + suffix + ' (' + vocabulary[suffix][1] + ')' : en;
  $('wordDictionary').href = 'https://dle.rae.es/' + encodeURIComponent(lemma);
  $('wordDialog').showModal();
});
document.querySelector('.classroom-homework-button').addEventListener('click', () => $('classroom-homework').showModal());
$('classroom-homework').addEventListener('close', () => document.body.classList.remove('classroom-homework-open'));
document.querySelectorAll('[data-print]').forEach((button) => {
  button.addEventListener('click', () => {
    document.body.classList.toggle('classroom-homework-open', $('classroom-homework').open);
    window.print();
    document.body.classList.remove('classroom-homework-open');
  });
});
