'use strict';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwbAQtk4nhM73aqYCKwg0z5s5qxPaCAWeLncNVHtSQ2jHbuo7SomG4PJpOBN8C0sXzTQw/exec';
const ODEV_ADI = 'H4 – 13-14.Ders';
const STUDENTS = ['Arman Kaykac', 'Arzu Bayram', 'Aysen Gurkan', 'Didem Akbal', 'Rabia Nur Tok', 'Selva Akyuz', 'Sena Yamak', 'Suleyman Bektas'];
const $ = (id) => document.getElementById(id);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const letter = (index) => String.fromCharCode(65 + index);
const pictureChoices = ['Verdadero', 'Falso'];
const state = { student: '', index: 0, answers: new Map(), drafts: new Map(), submitting: false };
const normalize = (value) => value.trim().normalize('NFC').toLowerCase().replace(/[.!?]+$/, '').replace(/\s+/g, ' ');
const format = (number) => number.toLocaleString('tr-TR', { maximumFractionDigits: 1 });

for (const id of ['introName', 'resName2']) {
  $(id).append(...STUDENTS.map((name) => new Option(name, name)));
}
$('coverSections').innerHTML = sections.map(({ title, start, end }) => (
  '<li><strong>' + start + '–' + end + '</strong><span>' + escapeHtml(title) + '</span></li>'
)).join('') + '<li><strong>50 soru</strong><span>Toplam 100 puan</span></li>';

function showScreen(screen) {
  for (const id of ['intro', 'quiz', 'confirm', 'result']) $(id).hidden = id !== screen;
  window.scrollTo(0, 0);
}

function tally() {
  return [...state.answers.values()].reduce((totals, answer) => {
    totals.score += answer.points;
    if (answer.points === 2) totals.correct++;
    else totals.wrong++;
    return totals;
  }, { score: 0, correct: 0, wrong: 0 });
}

function saveAnswer(selected, points) {
  if (state.answers.has(state.index)) return;
  state.answers.set(state.index, { selected, points });
  renderQuestion();
  $('feedback').focus({ preventScroll: true });
}

function filledOptions(options, selected, addLetters = true) {
  return '<option value="">Seçiniz</option>' + options.map((option, index) => (
    '<option value="' + index + '"' + (index === selected ? ' selected' : '') + '>' +
    (addLetters ? letter(index) + ' · ' : '') + escapeHtml(option) + '</option>'
  )).join('');
}

function answerText(question) {
  if (question.type === 'written') return question.answers.join(' / ');
  if (question.type === 'ad') return letter(question.answer) + ' · ' + headings[question.answer];
  if (question.type === 'picture') return pictureChoices[question.answer];
  return question.answers.map((answer, index) => (index + 1) + ') ' + question.options[index][answer]).join(' · ');
}

function questionMarkup(question, answer) {
  const disabled = answer ? ' disabled' : '';
  const prompt = '<p class="prompt" lang="es">' + escapeHtml(question.prompt) + '</p>';
  if (question.type === 'written') {
    return prompt + '<p id="writtenCue" class="instruction">' + escapeHtml(question.cue) + '</p><form id="answerForm">' +
      '<label for="writtenAnswer">Boşluğa gelecek ifade</label><input id="writtenAnswer" type="text" lang="es" required spellcheck="false" autocomplete="off" aria-describedby="writtenCue" value="' +
      escapeHtml(answer?.selected ?? state.drafts.get(state.index) ?? '') + '"' + disabled + '>' +
      (answer ? '' : '<div class="accent" aria-label="İspanyolca karakter ekle">' + [...'áéíóúñü'].map((char) =>
        '<button type="button" data-accent="' + char + '">' + char + '</button>').join('') +
        '</div><button class="primary" type="submit">Kontrol et</button>') + '</form>';
  }
  if (question.type === 'ad') {
    return '<p class="instruction">İlanı oku ve en uygun başlığı seç. İki başlık hiçbir ilana uymaz.</p><div class="passage">' + prompt +
      '</div><form id="answerForm"><label for="adAnswer">İlanın başlığı</label><select id="adAnswer" lang="es" required' + disabled + '>' +
      filledOptions(headings, answer?.selected ?? state.drafts.get(state.index)) + '</select>' +
      (answer ? '' : '<button type="submit" class="primary">Eşleştir</button>') + '</form>';
  }
  if (question.type === 'cloze') {
    const passage = escapeHtml(question.prompt).replace(/\[(\d)\]/g, '<strong class="blank">($1) ___</strong>');
    const options = question.options.map((choices, index) => {
      const value = answer?.selected[index] ?? state.drafts.get(state.index)?.[index];
      const status = answer ? (value === question.answers[index] ? 'correct' : 'incorrect') : '';
      const feedback = answer ? (status === 'correct' ? ' · Doğru' : ' · Yanlış') : '';
      return '<label class="choice-label ' + status + '">' + (index + 1) + '. boşluk' + feedback +
        '<select lang="es" required' + disabled + '>' + filledOptions(choices, value) + '</select></label>';
    }).join('');
    return '<p class="instruction">Paragrafı oku ve dört boşluğu tamamla. Her doğru boşluk 0,5 puan.</p>' +
      '<div class="passage"><h2 lang="es">' + escapeHtml(question.title) + '</h2><p class="prompt" lang="es">' + passage +
      '</p></div><form id="answerForm" class="cloze-fields">' + options +
      (answer ? '' : '<button type="submit" class="primary">Kontrol et</button>') + '</form>';
  }
  const picture = '<button type="button" id="previewPicture" class="park"><img src="assets/a12-13-14/parque.webp" alt="Park sahnesi" width="1200" height="800"><span>🔍 Görseli büyüt</span></button>';
  const choices = pictureChoices.map((choice, index) => {
    const status = answer ? (index === question.answer ? ' correct' : index === answer.selected ? ' incorrect' : '') : '';
    return '<button type="button" lang="es" class="option' + status + '" data-choice="' + index + '"' + disabled + '>' +
      escapeHtml(choice) + '</button>';
  }).join('');
  return '<p class="instruction">Görsele bak. Cümle doğru mu, yanlış mı?</p>' + picture + prompt + '<div class="option-list">' + choices + '</div>';
}

function renderQuestion() {
  const index = state.index;
  const question = questions[index];
  const answer = state.answers.get(index);
  const section = sections.find(({ end }) => index < end);
  $('question').innerHTML = '<p class="badge">' + escapeHtml(section.title) + '</p>' + questionMarkup(question, answer) +
    (answer ? '<div class="feedback" id="feedback" tabindex="-1"><strong class="' + (answer.points === 2 ? 'positive' : 'negative') + '">' +
      (answer.points === 2 ? '✓ Doğru' : answer.points > 0 ? 'Kısmen doğru · ' + format(answer.points) + ' / 2 puan' : '✗ Yanlış') +
      '</strong><p><b>Doğru cevap</b> <span lang="es">' + escapeHtml(answerText(question)) + '</span></p><p>' +
      escapeHtml(question.feedback) + '</p></div>' : '');
  const totals = tally();
  $('correctCount').textContent = totals.correct + ' Doğru';
  $('wrongCount').textContent = totals.wrong + ' Yanlış / kısmi';
  $('progress').value = state.answers.size;
  $('counter').textContent = (index + 1) + ' / ' + questions.length;
  $('backButton').disabled = index === 0;
  $('nextButton').disabled = index === questions.length - 1;
  $('questionList').innerHTML = sections.map(({ title, start, end }) => '<h3>' + escapeHtml(title) + '</h3><div class="numbers">' +
    Array.from({ length: end - start + 1 }, (_, position) => {
      const number = start + position;
      const done = state.answers.has(number - 1);
      return '<button type="button" data-index="' + (number - 1) + '" aria-label="' + number + '. soru' +
        (done ? ', cevaplandı' : ', henüz cevaplanmadı') + '"' + (done ? ' class="answered"' : '') +
        (number - 1 === index ? ' aria-current="step"' : '') + '>' + number + '</button>';
    }).join('') + '</div>').join('');

  const form = $('answerForm');
  if (form && !answer) {
    const fields = [...form.querySelectorAll('input, select')];
    const read = () => {
      if (question.type === 'written') return fields[0].value;
      const values = fields.map(({ value }) => value === '' ? undefined : Number(value));
      return question.type === 'cloze' ? values : values[0];
    };
    form.addEventListener('input', () => state.drafts.set(index, read()));
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const selected = read();
      if (question.type === 'written') {
        if (!selected.trim()) { fields[0].focus(); return; }
        saveAnswer(selected, question.answers.some((value) => normalize(value) === normalize(selected)) ? 2 : 0);
      } else if (question.type === 'cloze') {
        saveAnswer(selected, selected.filter((value, position) => value === question.answers[position]).length * 0.5);
      } else {
        saveAnswer(selected, selected === question.answer ? 2 : 0);
      }
    });
  }
}

function goTo(index) {
  state.index = index;
  renderQuestion();
  window.scrollTo(0, 0);
}

$('question').addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.id === 'previewPicture') $('pictureDialog').showModal();
  if (button.dataset.choice !== undefined) {
    const selected = Number(button.dataset.choice);
    saveAnswer(selected, selected === questions[state.index].answer ? 2 : 0);
  }
  if (button.dataset.accent) {
    const input = $('writtenAnswer');
    input.setRangeText(button.dataset.accent, input.selectionStart, input.selectionEnd, 'end');
    state.drafts.set(state.index, input.value);
    input.focus();
  }
});
$('questionList').addEventListener('click', (event) => {
  const button = event.target.closest('[data-index]');
  if (button) goTo(Number(button.dataset.index));
});
$('startForm').addEventListener('submit', (event) => {
  event.preventDefault();
  state.student = $('introName').value;
  $('studentLabel').textContent = state.student;
  $('resName2').value = state.student;
  renderQuestion();
  showScreen('quiz');
});
$('backButton').addEventListener('click', () => goTo(state.index - 1));
$('nextButton').addEventListener('click', () => goTo(state.index + 1));
$('finishButton').addEventListener('click', () => {
  const remaining = questions.length - state.answers.size;
  $('completion').textContent = remaining
    ? state.answers.size + ' soru cevaplandı. Kalan ' + remaining + ' soru 0 puan olarak değerlendirilecek.'
    : '50 sorunun tamamı cevaplandı.';
  showScreen('confirm');
});
$('cancelButton').addEventListener('click', () => showScreen('quiz'));

$('submitForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (state.submitting) return;
  const name = $('resName2').value;
  if (!name) return;
  const totals = tally();
  const payload = {
    ogrenci: name, odev: ODEV_ADI, grup: 'A1.2',
    puan: totals.score, dogru: totals.correct, yanlis: totals.wrong,
    tarih: new Date().toLocaleDateString('tr-TR', { timeZone: 'Europe/Istanbul' }),
  };
  state.submitting = true;
  $('submitButton').disabled = $('cancelButton').disabled = true;
  $('submitButton').textContent = 'Gönderiliyor…';
  $('submitError').hidden = true;
  try {
    await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) });
  } catch {
    $('submitError').textContent = 'Gönderim tamamlanamadı. Bağlantını kontrol edip tekrar deneyebilirsin.';
    $('submitError').hidden = false;
    return;
  } finally {
    state.submitting = false;
    $('submitButton').disabled = $('cancelButton').disabled = false;
    $('submitButton').textContent = '✔ Ödevi Teslim Et';
  }

  $('resultName').textContent = name;
  $('score').textContent = format(totals.score) + ' / 100';
  $('resultCounts').textContent = totals.correct + ' doğru · ' + totals.wrong + ' yanlış / kısmi · ' +
    (questions.length - state.answers.size) + ' boş';
  $('reviewList').innerHTML = questions.flatMap((question, index) => {
    const answer = state.answers.get(index);
    if (!answer || answer.points === 2) return [];
    return '<article><strong>' + (index + 1) + '. soru · ' + format(answer.points) + ' / 2</strong>' +
      '<p lang="es">' + escapeHtml(question.title ?? question.prompt) + '</p><p>Doğru cevap <span lang="es">' +
      escapeHtml(answerText(question)) + '</span></p><p>' + escapeHtml(question.feedback) + '</p></article>';
  }).join('') || '<p>İncelenecek yanlış veya kısmi cevap bulunmuyor.</p>';
  showScreen('result');
});
