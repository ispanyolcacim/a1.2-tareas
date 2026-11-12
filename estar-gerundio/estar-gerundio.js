'use strict';
const $ = id => document.getElementById(id);
const verbs = [
 {inf:'dormir',meaning:'uyumak',gerund:'durmiendo',type:'o → u',tr:'Kedim şu anda kanepede uyuyor.',es:'Mi gato está durmiendo en el sofá.'},
 {inf:'morir',meaning:'ölmek',gerund:'muriendo',type:'o → u',tr:'Bu bitki susuzluktan ölüyor.',es:'Esta planta se está muriendo de sed.'},
 {inf:'pedir',meaning:'istemek, sipariş vermek',gerund:'pidiendo',type:'e → i',tr:'Biz restoranda bir pizza sipariş ediyoruz.',es:'Estamos pidiendo una pizza en el restaurante.'},
 {inf:'repetir',meaning:'tekrar etmek',gerund:'repitiendo',type:'e → i',tr:'Öğrenciler cümleyi tekrar ediyor.',es:'Los estudiantes están repitiendo la frase.'},
 {inf:'seguir',meaning:'takip etmek',gerund:'siguiendo',type:'e → i',tr:'Ben öğretmenin talimatlarını takip ediyorum.',es:'Estoy siguiendo las instrucciones de la profesora.'},
 {inf:'conseguir',meaning:'elde etmek, başarmak',gerund:'consiguiendo',type:'e → i',tr:'Siz çok iyi sonuçlar elde ediyorsunuz. (vosotros)',es:'Estáis consiguiendo muy buenos resultados.'},
 {inf:'servir',meaning:'servis etmek',gerund:'sirviendo',type:'e → i',tr:'Garson kahveyi servis ediyor.',es:'El camarero está sirviendo el café.'},
 {inf:'decir',meaning:'söylemek',gerund:'diciendo',type:'e → i',tr:'Sen doğruyu söylüyor musun?',es:'¿Estás diciendo la verdad?'},
 {inf:'venir',meaning:'gelmek',gerund:'viniendo',type:'e → i',tr:'Arkadaşlarım evime geliyor.',es:'Mis amigos están viniendo a mi casa.'},
 {inf:'sentir',meaning:'hissetmek',gerund:'sintiendo',type:'e → i',tr:'Ben şu anda çok üşüyorum.',es:'Estoy sintiendo mucho frío.'},
 {inf:'vestirse',meaning:'giyinmek',gerund:'vistiéndose',type:'e → i · dönüşlü',tr:'Kız kardeşim odasında giyiniyor.',es:'Mi hermana se está vistiendo en su habitación.'},
 {inf:'mentir',meaning:'yalan söylemek',gerund:'mintiendo',type:'e → i',tr:'O çocuk yalan söylüyor.',es:'Ese niño está mintiendo.'},
 {inf:'leer',meaning:'okumak',gerund:'leyendo',type:'-yendo',tr:'Biz ilginç bir kitap okuyoruz.',es:'Estamos leyendo un libro interesante.'},
 {inf:'reír',meaning:'gülmek',gerund:'riendo',type:'e → i',tr:'Çocuklar çok gülüyor.',es:'Los niños están riendo mucho.'},
 {inf:'traer',meaning:'getirmek',gerund:'trayendo',type:'-yendo',tr:'Annem masaya yemek getiriyor.',es:'Mi madre está trayendo la comida a la mesa.'},
 {inf:'caer',meaning:'düşmek',gerund:'cayendo',type:'-yendo',tr:'Yapraklar yere düşüyor.',es:'Las hojas están cayendo al suelo.'},
 {inf:'oír',meaning:'duymak',gerund:'oyendo',type:'-yendo',tr:'Komşular tuhaf bir ses duyuyor.',es:'Los vecinos están oyendo un ruido extraño.'},
 {inf:'ir',meaning:'gitmek',gerund:'yendo',type:'Özel biçim',tr:'Biz şu anda eve gidiyoruz.',es:'Estamos yendo a casa.'}
];
let activeSection=1, verbOrder=verbs.map((_,i)=>i), verbIndex=0, activeMeme=0;
function toggleReveal(buttonId,answerId,closedText,openText){
 const button=$(buttonId),answer=$(answerId);const show=answer.hidden;
 answer.hidden=!show;button.setAttribute('aria-expanded',String(show));button.textContent=show?openText:closedText;
}
function hideReveal(buttonId,answerId,text){$(answerId).hidden=true;$(buttonId).setAttribute('aria-expanded','false');$(buttonId).textContent=text;}
function showSection(n,focus=false){
 activeSection=n;
 document.querySelectorAll('.lesson-section').forEach(s=>{s.hidden=s.id!==`section-${n}`;});
 document.querySelectorAll('[data-section]').forEach(b=>{const active=Number(b.dataset.section)===n;b.classList.toggle('active',active);if(active)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
 const section=$(`section-${n}`),frame=section.querySelector('iframe[data-src]');if(frame&&!frame.src)frame.src=frame.dataset.src;
 $('section-progress').textContent=`Bölüm ${n} / 7`;$('previous-section').disabled=n===1;$('next-section').disabled=n===7;
 history.replaceState(null,'',`#bolum-${n}`);
 if(focus){$('lesson').focus({preventScroll:true});$('lesson').scrollIntoView({behavior:'smooth',block:'start'});}
 document.querySelector(`[data-section="${n}"]`).scrollIntoView({behavior:'smooth',block:'nearest',inline:'nearest'});
}
document.querySelectorAll('[data-section]').forEach(b=>b.addEventListener('click',()=>showSection(Number(b.dataset.section),true)));
$('previous-section').addEventListener('click',()=>showSection(activeSection-1,true));
$('next-section').addEventListener('click',()=>showSection(activeSection+1,true));
$('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else $('fullscreen').textContent='⛶';}catch{}});
document.addEventListener('fullscreenchange',()=>{$('fullscreen').setAttribute('aria-label',document.fullscreenElement?'Tam ekrandan çık':'Tam ekranı aç');});
function renderVerb(){
 const v=verbs[verbOrder[verbIndex]];
 $('verb-infinitive').textContent=v.inf;$('verb-meaning').textContent=v.meaning;
 $('verb-type').textContent='MASTAR FİİL';$('verb-counter').textContent=`${verbIndex+1} / ${verbs.length} fiil`;
 $('turkish-sentence').textContent=v.tr;$('gerund-answer').textContent=`${v.inf} → ${v.gerund} · ${v.type}`;$('translation-answer').textContent=v.es;
 $('verb-select').value=String(verbOrder[verbIndex]);
 hideReveal('gerund-toggle','gerund-answer','Gerundioyu göster 👀');hideReveal('translation-toggle','translation-answer','İspanyolca cümleyi göster 💬');
 $('prev-verb').disabled=verbIndex===0;$('next-verb').disabled=verbIndex===verbs.length-1;
}
verbs.forEach((v,i)=>{const option=document.createElement('option');option.value=i;option.textContent=v.inf;$('verb-select').append(option);});
$('verb-select').addEventListener('change',e=>{verbIndex=verbOrder.indexOf(Number(e.target.value));renderVerb();});
$('gerund-toggle').addEventListener('click',()=>toggleReveal('gerund-toggle','gerund-answer','Gerundioyu göster 👀','Gerundioyu gizle'));
$('translation-toggle').addEventListener('click',()=>toggleReveal('translation-toggle','translation-answer','İspanyolca cümleyi göster 💬','İspanyolca cümleyi gizle'));
$('prev-verb').addEventListener('click',()=>{if(verbIndex>0){verbIndex--;renderVerb();}});
$('next-verb').addEventListener('click',()=>{if(verbIndex<verbs.length-1){verbIndex++;renderVerb();}});
$('shuffle-verbs').addEventListener('click',()=>{for(let i=verbOrder.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[verbOrder[i],verbOrder[j]]=[verbOrder[j],verbOrder[i]];}verbIndex=0;renderVerb();});
const memes=[
 {file:'meme-suenos.webp',alt:'Üç panelli çizim: çocuk kanepede uyurken annesine ders çalıştığını söyler; rüyalarına çalıştığını açıklar.',caption:'01 · Estoy estudiando mis sueños.',lines:['— Mamá, estoy estudiando.','— ¿Estás estudiando o estás durmiendo?','— Estoy estudiando mis sueños.'],questions:['¿Dónde está el hijo?','¿Qué está haciendo de verdad?','¿Por qué es graciosa su respuesta?'],explanation:'<p>Çocuk ders çalıştığını söylüyor ama aslında uyuyor. “Rüyalarıma çalışıyorum” diyerek kendince bir bahane buluyor. 😴</p><p lang="es"><strong>estoy estudiando</strong> · <strong>estás estudiando</strong> · <strong>estás durmiendo</strong></p><p><strong>dormir → durmiendo</strong>: o → u değişimine dikkat!</p>'},
 {file:'meme-ofertas.webp',alt:'Üç panelli çizim: genç tasarruf ettiğini söyler ama elleri alışveriş torbalarıyla doludur; indirimlerden yararlandığını söyler.',caption:'02 · ¡Estoy aprovechando las ofertas!',lines:['— Papá, estoy ahorrando.','— ¿Y por qué estás comprando tantas cosas?','— ¡Estoy aprovechando las ofertas!'],questions:['¿Qué está haciendo el hijo?','¿Está ahorrando o está gastando dinero?','¿Las ofertas siempre nos ayudan a ahorrar?'],explanation:'<p>“Tasarruf ediyorum” diyen genç, indirim bahanesiyle bir sürü şey satın alıyor. Ucuza almakla az para harcamak her zaman aynı şey olmuyor. 🛍️</p><p lang="es"><strong>estoy ahorrando</strong> · <strong>estás comprando</strong> · <strong>estoy aprovechando</strong></p><p><span lang="es">Ahorrar:</span> tasarruf etmek. <span lang="es">Aprovechar las ofertas:</span> indirimlerden yararlanmak.</p>'},
 {file:'meme-notas.webp',alt:'Üç panelli çizim: öğretmen öğrencinin dinleyip dinlemediğini sorar; öğrenci not aldığını söyler ama defterde kedi çizimleri vardır.',caption:'03 · Notas… sobre mi gato.',lines:['— ¿Me estás escuchando?','— Sí, profe. Estoy tomando notas.','— Notas... sobre mi gato.'],questions:['¿Qué está haciendo la profesora?','¿El estudiante está tomando notas de la clase?','¿Qué está dibujando en su cuaderno?'],explanation:'<p>Öğrenci not aldığını söylüyor; defterindeki “notlar” dersle ilgili değil, kedisiyle ilgili! 🐱</p><p lang="es"><strong>me estás escuchando</strong> · <strong>estoy tomando notas</strong></p><p><span lang="es">Tomar notas:</span> not almak. <span lang="es">Escuchar:</span> dinlemek.</p>'}
];
function renderMeme(){const m=memes[activeMeme];$('meme-image').src=`assets/${m.file}`;$('meme-image').alt=m.alt;$('meme-caption').textContent=m.caption;$('meme-questions').replaceChildren();m.questions.forEach(q=>{const li=document.createElement('li');li.textContent=q;$('meme-questions').append(li);});$('meme-lines').replaceChildren();m.lines.forEach(l=>{const p=document.createElement('p');p.textContent=l;$('meme-lines').append(p);});$('meme-transcript').open=false;$('meme-explanation').innerHTML=m.explanation;hideReveal('meme-explanation-toggle','meme-explanation','Espriyi ve yapıları aç 🔍');document.querySelectorAll('[data-meme]').forEach(b=>{const on=Number(b.dataset.meme)===activeMeme;b.classList.toggle('ghost',!on);b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});}
document.querySelectorAll('[data-meme]').forEach(b=>b.addEventListener('click',()=>{activeMeme=Number(b.dataset.meme);renderMeme();}));
$('meme-explanation-toggle').addEventListener('click',()=>toggleReveal('meme-explanation-toggle','meme-explanation','Espriyi ve yapıları aç 🔍','Açıklamayı gizle'));
const actions=[
 {emoji:'📚👀',label:'kitap okumak',verb:'leer',ger:'leyendo',tail:'un libro'},
 {emoji:'🏃💨',label:'koşmak',verb:'correr',ger:'corriendo',tail:'en el parque'},
 {emoji:'🍳🥘',label:'yemek pişirmek',verb:'cocinar',ger:'cocinando',tail:'la cena'},
 {emoji:'😴🛏️',label:'uyumak',verb:'dormir',ger:'durmiendo',tail:'en la cama'},
 {emoji:'🎤🎵',label:'şarkı söylemek',verb:'cantar',ger:'cantando',tail:'una canción'},
 {emoji:'🚲🌳',label:'bisiklet sürmek',verb:'montar en bicicleta',ger:'montando',tail:'en bicicleta'},
 {emoji:'☕🤲',label:'kahve servis etmek',verb:'servir',ger:'sirviendo',tail:'el café'},
 {emoji:'💃🎶',label:'dans etmek',verb:'bailar',ger:'bailando',tail:'salsa'},
 {emoji:'📱💬',label:'telefonda konuşmak',verb:'hablar',ger:'hablando',tail:'por teléfono'},
 {emoji:'🐕🚶',label:'köpeği gezdirmek',verb:'pasear',ger:'paseando',tail:'al perro'},
 {emoji:'🍕🙋',label:'pizza sipariş etmek',verb:'pedir',ger:'pidiendo',tail:'una pizza'},
 {emoji:'🎧🎶',label:'müzik dinlemek',verb:'escuchar',ger:'escuchando',tail:'música'},
 {emoji:'🏊💦',label:'yüzmek',verb:'nadar',ger:'nadando',tail:'en la piscina'},
 {emoji:'📝✉️',label:'mektup yazmak',verb:'escribir',ger:'escribiendo',tail:'una carta'},
 {emoji:'🎮🕹️',label:'video oyunu oynamak',verb:'jugar',ger:'jugando',tail:'a un videojuego'},
 {emoji:'🧹🏠',label:'evi temizlemek',verb:'limpiar',ger:'limpiando',tail:'la casa'},
 {emoji:'📺🍿',label:'film izlemek',verb:'ver',ger:'viendo',tail:'una película'},
 {emoji:'🍽️👨‍🍳',label:'yemek getirmek',verb:'traer',ger:'trayendo',tail:'la comida'},
 {emoji:'🎨🖼️',label:'resim yapmak',verb:'pintar',ger:'pintando',tail:'un cuadro'},
 {emoji:'💧🥤',label:'su içmek',verb:'beber',ger:'bebiendo',tail:'agua'},
 {emoji:'🧳✈️',label:'seyahat etmek',verb:'viajar',ger:'viajando',tail:'a España'},
 {emoji:'🛍️👕',label:'kıyafet satın almak',verb:'comprar',ger:'comprando',tail:'ropa'},
 {emoji:'🤥💬',label:'yalan söylemek',verb:'mentir',ger:'mintiendo',tail:''},
 {emoji:'🍂⬇️',label:'yaprakların düşmesi',verb:'caer',ger:'cayendo',tail:'al suelo',fixed:{subject:'las hojas',estar:'están'}},
 {emoji:'🚿🫧',label:'duş almak',verb:'ducharse',ger:'duchando',tail:'',reflexive:true},
 {emoji:'🗣️🔁',label:'cümleyi tekrar etmek',verb:'repetir',ger:'repitiendo',tail:'la frase'},
 {emoji:'🚶🏠',label:'eve gitmek',verb:'ir',ger:'yendo',tail:'a casa'},
 {emoji:'🤳📸',label:'fotoğraf çekmek',verb:'hacer fotos',ger:'haciendo',tail:'fotos'},
 {emoji:'👨‍🏫💬',label:'İspanyolca öğrenmek',verb:'aprender',ger:'aprendiendo',tail:'español'},
 {emoji:'🍝😋',label:'makarna yemek',verb:'comer',ger:'comiendo',tail:'pasta'}
];
const subjects=[{subject:'yo',estar:'estoy',ref:'me'},{subject:'tú',estar:'estás',ref:'te'},{subject:'ella',estar:'está',ref:'se'},{subject:'él',estar:'está',ref:'se'},{subject:'nosotros',estar:'estamos',ref:'nos'},{subject:'vosotros',estar:'estáis',ref:'os'},{subject:'ellos',estar:'están',ref:'se'},{subject:'ustedes',estar:'están',ref:'se'}];
const playerIcons=['🟣','🟠','🔵','🟢'];
let players=[],currentPlayer=0,pendingTurn=false,gameFinished=false,practiceMode=false,currentTask=null;
function renderBoard(){const board=$('game-board');board.replaceChildren();for(let row=0;row<5;row++){for(let col=0;col<6;col++){const n=row*6+(row%2?5-col:col);const a=actions[n];const b=document.createElement('button');b.className='board-cell';b.dataset.square=n;b.setAttribute('aria-label',`Kare ${n+1}: ${a.label}. Serbest çalışma.`);b.innerHTML=`<span class="cell-number">${n+1}${n===29?' 🏁':''}</span><span class="cell-emoji" aria-hidden="true">${a.emoji}</span><span class="cell-tokens" aria-hidden="true"></span>`;b.addEventListener('click',()=>{if(pendingTurn){$('game-message').textContent='Önce bu turdaki cümleyi tamamla veya pas geç.';return;}practiceMode=true;showTask(n);$('game-message').textContent='Serbest çalışma · Bu kare puan veya oyuncu konumunu değiştirmez.';});board.append(b);}}updateBoard();}
function updateBoard(){document.querySelectorAll('.board-cell').forEach(b=>{const n=Number(b.dataset.square);b.querySelector('.cell-tokens').textContent=players.map((p,i)=>p.pos===n?playerIcons[i]:'').join('');b.classList.toggle('selected',currentTask?.n===n);});}
function updateScoreboard(){const s=$('scoreboard');s.replaceChildren();players.forEach((p,i)=>{const d=document.createElement('div');d.className=`player${i===currentPlayer&&!gameFinished?' current':''}`;d.innerHTML=`<strong>${playerIcons[i]} ${i+1}. oyuncu</strong>${p.score} puan · ${p.pos<0?'Başlangıç':`${p.pos+1}. kare`}`;s.append(d);});$('turn-label').textContent=gameFinished?'OYUN TAMAMLANDI':`SIRA ${currentPlayer+1}. OYUNCUDA`;$('roll-dice').disabled=pendingTurn||gameFinished;}
function resetGame(){players=Array.from({length:Number($('player-count').value)},()=>({pos:-1,score:0}));currentPlayer=0;pendingTurn=false;gameFinished=false;practiceMode=false;currentTask=null;$('game-prompt').hidden=true;$('dice-face').textContent='⚄';$('game-message').textContent='İlk cümle için zar at!';updateScoreboard();updateBoard();}
function showTask(n){const action=actions[n],s=action.fixed||subjects[Math.floor(Math.random()*subjects.length)];currentTask={n,action,subject:s};$('game-prompt').hidden=false;$('square-label').textContent=`${n+1}. KARE${practiceMode?' · SERBEST ÇALIŞMA':''}`;$('task-emoji').textContent=action.emoji;$('task-emoji').setAttribute('aria-label',action.label);$('task-subject').textContent=s.subject;const text=`${s.subject} ${action.reflexive?s.ref+' ':''}${s.estar} ${action.ger}${action.tail?' '+action.tail:''}.`;$('game-answer').textContent=text.charAt(0).toUpperCase()+text.slice(1);$('game-hint').textContent=action.verb;hideReveal('game-hint-toggle','game-hint','Fiil ipucu');hideReveal('game-answer-toggle','game-answer','Örnek cevap');$('accept-sentence').hidden=practiceMode;$('pass-turn').hidden=practiceMode;updateBoard();}
$('roll-dice').addEventListener('click',()=>{if(pendingTurn||gameFinished)return;practiceMode=false;const roll=Math.floor(Math.random()*6)+1;$('dice-face').textContent=['⚀','⚁','⚂','⚃','⚄','⚅'][roll-1];$('dice-face').setAttribute('aria-label',`Zar sonucu: ${roll}`);const p=players[currentPlayer];p.pos=Math.min(29,p.pos+roll);pendingTurn=true;showTask(p.pos);$('game-message').textContent=`${currentPlayer+1}. oyuncu ${roll} attı. Şimdi cümle sırası sende!`;updateScoreboard();});
function endTurn(accepted){if(!pendingTurn||practiceMode)return;const finishedPlayer=currentPlayer;if(accepted)players[currentPlayer].score++;pendingTurn=false;if(accepted&&players[currentPlayer].pos===29){gameFinished=true;$('game-message').textContent=`🎉 ${currentPlayer+1}. oyuncu bitişe ulaştı! ${players[currentPlayer].score} cümle puanı. ¡Muy bien!`;$('game-prompt').hidden=true;}else{if(!accepted&&players[currentPlayer].pos===29)players[currentPlayer].pos=28;currentPlayer=(currentPlayer+1)%players.length;$('game-prompt').hidden=true;currentTask=null;$('game-message').textContent=`${finishedPlayer+1}. oyuncunun turu tamamlandı. ${currentPlayer+1}. oyuncu zar atabilir.`;}updateScoreboard();updateBoard();}
$('accept-sentence').addEventListener('click',()=>endTurn(true));$('pass-turn').addEventListener('click',()=>endTurn(false));
$('reset-game').addEventListener('click',resetGame);$('player-count').addEventListener('change',resetGame);
$('game-hint-toggle').addEventListener('click',()=>toggleReveal('game-hint-toggle','game-hint','Fiil ipucu','İpucunu gizle'));
$('game-answer-toggle').addEventListener('click',()=>toggleReveal('game-answer-toggle','game-answer','Örnek cevap','Cevabı gizle'));
renderVerb();renderMeme();resetGame();renderBoard();
const initialSection=Number(location.hash.replace('#bolum-',''));showSection(initialSection>=1&&initialSection<=7?initialSection:1);
