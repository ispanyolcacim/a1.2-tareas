(function(){
'use strict';
const LESSON_TITLE='A1.2 (11-12) Ders İçi Grup Yazma Çalışması';
function validateSubmission(s){
 if(!Array.isArray(s.names)||!s.names.length||s.names.some(n=>!n.trim())) return 'Lütfen grup üyelerinin adlarını yazın.';
 if(new Set(s.names.map(n=>n.trim().toLocaleLowerCase('tr-TR'))).size!==s.names.length) return 'Aynı öğrenci iki kez yazılmış; isimleri kontrol edin.';
 if(!s.title.trim()) return 'Metninize bir başlık verin.';
 if(s.text.trim().length<100) return 'Metniniz çok kısa görünüyor. Yazınızı tamamlayıp tekrar deneyin.';
 if(!s.copyConfirmed) return 'Göndermeden önce yazınızın kopyasını alıp kutuyu işaretleyin.';
 return '';
}
function buildSubmission(s,date=new Date()){
 const names=s.names.map(n=>n.trim()).join(' · ');
 const when=date.toLocaleString('tr-TR',{timeZone:'Europe/Istanbul'});
 const text='=== DERS İÇİ GRUP YAZMA ÇALIŞMASI ===\nDers: '+LESSON_TITLE+'\nGrup: '+(s.group.trim()||'Belirtilmedi')+'\nGrup üyeleri:\n'+s.names.map((n,i)=>(i+1)+'. '+n.trim()).join('\n')+'\nTarih: '+when+'\nKonu: La casa en movimiento\nGramática: Estar + gerundio y adjetivos\n\n=== YAZMA METNİ ===\nBaşlık: '+s.title.trim()+'\n\n'+s.text.trim();
 return {service_id:'service_4ee1wh7',template_id:'template_xjyyxhf',user_id:'xNYEbUQNiWJPvbyoJ',template_params:{student_name:names,lesson:LESSON_TITLE,submit_date:when,subject:LESSON_TITLE+' — '+names,writing_text:text}};
}
async function sendSubmission(snapshot,transport=fetch){
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),25000);
 try{
  const response=await transport('https://api.emailjs.com/api/v1.0/email/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(buildSubmission(snapshot)),signal:controller.signal});
  if(!response.ok) {const err=new Error('Gönderim kabul edilmedi');err.status=response.status;throw err;}
  return true;
 }finally{clearTimeout(timer);}
}
if(typeof module!=='undefined'&&module.exports) module.exports={validateSubmission,buildSubmission,sendSubmission};
if(typeof document==='undefined') return;
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const es=(s,attrs='')=>'<span data-es '+attrs+'>'+esc(s)+'</span>';
let exerciseIndex=0;
function exercise(question,template,answer,note,open=false){
 const id='answer-'+(++exerciseIndex);
 let [before,after='']=template.split('___');
 return '<article class="card exercise"><p class="exercise-question"'+(open?' data-es':'')+'>'+esc(question)+'</p><div class="answer-row">'+(before?es(before):'')+'<div class="blank-wrap"><'+(open?'textarea rows="2"':'input type="text"')+' id="input-'+id+'" class="exercise-input" lang="es" aria-label="'+esc(question)+'" placeholder="'+(open?'Respuesta…':'…')+'">'+(open?'</textarea>':'')+'<span id="'+id+'" class="answer-inline" hidden data-es>'+esc(answer)+'</span></div>'+es(after)+'<button type="button" class="lock" aria-label="'+(open?'Örnek cevabı':'Cevabı')+' göster" aria-controls="'+id+'" aria-expanded="false" data-reveal="'+id+'">🔒</button></div><p class="answer-note" id="note-'+id+'" hidden>'+esc(note)+'</p></article>';
}
function render(){
 const d=window.LESSON;
 $('agreementExercises').innerHTML=d.agreement.map(x=>exercise(...x)).join('');
 $('shortExercises').innerHTML=d.short.map(x=>exercise(...x)).join('');
 $('contextExercises').innerHTML=d.context.map(x=>exercise(...x)).join('');
 $('readingQuestions').innerHTML=d.questions.map(x=>exercise(x[0],'___',x[1],x[2],true)).join('');
 $('meaningPairs').innerHTML=d.pairs.map((p,i)=>{
   const focus=p[0];const attrs=(side)=>'data-focus="'+focus+'" data-meaning-tr="'+esc(p[side===0?2:4])+'" data-meaning-en="'+esc(p[side===0?6:7])+'"';
   return '<article class="pair-card"><div class="pair-number">'+String(i+1).padStart(2,'0')+'</div><div><small>İSİMDEN SONRA</small><p>'+es(p[1],attrs(0))+'</p><span>'+esc(p[2])+'</span></div><div><small>İSİMDEN ÖNCE</small><p>'+es(p[3],attrs(1))+'</p><span>'+esc(p[4])+'</span></div><p class="pair-note">'+esc(p[5])+'</p></article>';
 }).join('');
 $('readingText').innerHTML=d.reading.map((chunks,i)=>'<p class="sentence-line" tabindex="0">'+chunks.map((c,j)=>'<span class="chunk tone-'+((i+j)%6)+'" data-es data-role="'+esc(c[1])+'">'+esc(c[0])+'</span>').join(' ')+'</p>').join('');
}
render();

const missingWords=new Set();
function tokenise(root=document){
 root.querySelectorAll('[data-es]:not([data-tokenised])').forEach(el=>{
  el.dataset.tokenised='true';el.lang='es';
  const context=el.closest('.sentence-line')?.textContent||el.textContent;
  const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node=>{
   const fragment=document.createDocumentFragment();const text=node.textContent;let pos=0;
   for(const m of text.matchAll(/[\p{L}]+/gu)){
    fragment.append(text.slice(pos,m.index));const button=document.createElement('button');button.type='button';button.className='word-token';button.textContent=m[0];button.dataset.context=context;button.setAttribute('aria-haspopup','dialog');
    if(!window.LESSON_WORDS[m[0].toLowerCase()]) missingWords.add(m[0].toLowerCase());
    fragment.append(button);pos=m.index+m[0].length;
   }
   fragment.append(text.slice(pos));node.replaceWith(fragment);
  });
 });
}
tokenise();
let wordTrigger=null;
function closeWord(){ $('wordPopover').hidden=true;document.querySelectorAll('.analysis-open').forEach(e=>e.classList.remove('analysis-open')); }
function openWord(button){
 const raw=button.textContent.toLowerCase(),context=button.dataset.context;
 let e=window.LESSON_WORDS[raw]||{lemma:raw,tr:'Bu ifadede kullanılan sözcük',en:'Word used in this expression',type:'Sözcük',form:'Bağlam için sözlük bağlantısını aç'};
 if(raw==='cocina'&&context.includes('Leo cocina')) e={lemma:'cocinar',tr:'yemek pişiriyor',en:'cooks / is cooking',type:'Fiil',form:'Presente de indicativo · él / ella / usted'};
 if(raw==='español'&&context.includes('en español')) e={...e,tr:'İspanyolca',en:'Spanish',type:'Dil adı',form:'Eril tekil isim'};
 if(context==='por eso') e={...e,tr:'bu yüzden (por eso)',en:'therefore / that is why (por eso)',type:'Neden-sonuç bağlantı ifadesinin parçası',form:'por eso birlikte okunur'};
 if(context==='así que') e={...e,tr:'dolayısıyla / bu yüzden (así que)',en:'so / therefore (así que)',type:'Sonuç bildiren bağlacın parçası',form:'así que birlikte okunur'};
 const scope=button.closest('[data-focus]');
 const before=context.toLowerCase();
 if(e.lemma==='viejo') e={...e,tr:/viejo amigo/.test(before)?'eski / uzun zamandır tanınan':'yaşlı',en:/viejo amigo/.test(before)?'long-standing':'old / elderly'};
 if(raw==='gran') e={...e,tr:'harika / önemli / etkileyici',en:'great / admirable'};
 if(e.lemma==='pobre') e={...e,tr:/pobre (hombre|chico)/.test(before)?'zavallı / acınacak':'yoksul / maddi durumu yetersiz',en:/pobre (hombre|chico)/.test(before)?'unfortunate / pitiful':'poor / without money'};
 if(e.lemma==='antiguo') e={...e,tr:/antigua casa/.test(before)?'önceki / eskiden yaşanan':'eski / tarihî',en:/antigua casa/.test(before)?'former':'old / historic'};
 if(e.lemma==='cierto') e={...e,tr:/cierta noticia/.test(before)?'belli bir':'doğru / gerçek',en:/cierta noticia/.test(before)?'a certain':'true'};
 if(e.lemma==='único') e={...e,tr:/único alumno/.test(before)?'tek':'eşsiz / özel',en:/único alumno/.test(before)?'only':'unique / special'};
 if(e.lemma==='mismo') e={...e,tr:/libro mismo/.test(before)?'kendisi':'aynı',en:/libro mismo/.test(before)?'itself':'same'};
 if(e.lemma==='simple') e={...e,tr:/simple pregunta/.test(before)?'sadece / yalnızca':'basit / kolay',en:/simple pregunta/.test(before)?'mere':'simple / easy'};
 $('wordTitle').textContent=button.textContent;$('wordTr').textContent=e.tr;$('wordEn').textContent=e.en;$('wordLemma').textContent=e.lemma;$('wordForm').textContent=e.type+' · '+e.form;
 let role=button.closest('[data-role]')?.dataset.role;
 if(!role){ role=e.type.includes('Sıfat')?'İsmi niteleyen veya değerlendiren sıfat. Yeri ve anlamı bu ifadeyle birlikte düşün.':e.type.includes('artikel')?'İsmin belirliliğini, cinsiyetini ve sayısını işaretleyen artikel.':e.type.includes('Fiil')?'Eylem veya yüklemin bir parçası. Gerundio varsa estar çekimiyle birlikte oku.':e.type.includes('İsim')?'Bu ifadedeki isim; ilişkili sıfatın uyumunu bu isim üzerinden kontrol et.':e.type.includes('Özel')?'Kişinin adı.':e.type+'; anlamı ifadeyle birlikte değerlendirilir.'; }
 $('wordRole').textContent=e.type.includes('Sıfat')&&button.closest('[data-role]')?'İsmi niteleyen sıfat; '+role.toLocaleLowerCase('tr-TR')+' içinde.':role;
 if(scope && (e.lemma===scope.dataset.focus || raw===scope.dataset.focus)) $('wordRole').textContent+=' İfadenin anlamı: '+scope.dataset.meaningTr+'.';
 $('wordContext').textContent=context;$('wordDictionary').href='https://dle.rae.es/'+encodeURIComponent(e.lemma.replace(/^-/,'')).toLowerCase();
 document.querySelectorAll('.analysis-open').forEach(e=>e.classList.remove('analysis-open'));button.closest('.sentence-line')?.classList.add('analysis-open');
 const pop=$('wordPopover');pop.hidden=false;wordTrigger=button;const rect=button.getBoundingClientRect();const width=pop.offsetWidth,height=pop.offsetHeight;
 pop.style.left=Math.max(12,Math.min(window.innerWidth-width-12,rect.left))+'px';pop.style.top=Math.max(12,Math.min(window.innerHeight-height-12,rect.bottom+9))+'px';
}
document.addEventListener('click',e=>{
 const wordButton=e.target.closest('.word-token');if(wordButton){openWord(wordButton);return;}
 if(!e.target.closest('#wordPopover')) closeWord();
 const lock=e.target.closest('[data-reveal]');if(lock){const id=lock.dataset.reveal;const show=lock.getAttribute('aria-expanded')!=='true';$(id).hidden=!show;$('input-'+id).hidden=show;$('note-'+id).hidden=!show;lock.setAttribute('aria-expanded',String(show));lock.textContent=show?'🔓':'🔒';lock.setAttribute('aria-label',show?'Cevabı gizle':'Cevabı göster');}
});
$('wordClose').addEventListener('click',()=>{closeWord();wordTrigger?.focus();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('wordPopover').hidden){closeWord();wordTrigger?.focus();}});
window.addEventListener('resize',closeWord);window.addEventListener('scroll',e=>{if(!e.target.closest?.('#wordPopover')) closeWord();},{passive:true});

const tabs=[...document.querySelectorAll('[data-tab]')];let active=0;
function selectTab(i,focus=false){
 active=Math.max(0,Math.min(tabs.length-1,i));closeWord();
 tabs.forEach((b,j)=>{const is=j===active;b.classList.toggle('active',is);b.setAttribute('aria-selected',String(is));b.tabIndex=is?0:-1;$(b.dataset.tab).hidden=!is;});
 $('sectionCounter').textContent=(active+1)+' / '+tabs.length;$('prevSection').disabled=active===0;$('nextSection').disabled=active===tabs.length-1;
 if(focus) tabs[active].focus();
}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>selectTab(i));b.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();selectTab(e.key==='Home'?0:e.key==='End'?tabs.length-1:(active+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length,true);}});});
$('prevSection').addEventListener('click',()=>{selectTab(active-1);document.querySelector('.tabs').scrollIntoView({block:'start'});});
$('nextSection').addEventListener('click',()=>{selectTab(active+1);document.querySelector('.tabs').scrollIntoView({block:'start'});});
const legacy=location.hash.slice(1);selectTab(Math.max(0,tabs.findIndex(b=>b.dataset.tab===legacy)));if(location.hash)history.replaceState(history.state,'',location.pathname+location.search);
$('printButton').onclick=()=>window.print();
$('homeworkButton').onclick=()=>{closeWord();$('homeworkDialog').showModal();};
$('homeworkClose').onclick=()=>$('homeworkDialog').close();
$('homeworkPrint').onclick=()=>window.print();
window.addEventListener('beforeprint',()=>document.body.classList.toggle('homework-open',$('homeworkDialog').open));
window.addEventListener('afterprint',()=>document.body.classList.remove('homework-open'));
$('zoomImage').onclick=()=>$('imageDialog').showModal();$('imageClose').onclick=()=>$('imageDialog').close();
$('toggleWide').onclick=()=>{const wide=$('yazma').classList.toggle('wide-writing');$('toggleWide').textContent=wide?'↔️ Görsel ve yazıyı yan yana göster':'↔️ Geniş yazma görünümü';};
['homeworkDialog','imageDialog'].forEach(id=>$(id).addEventListener('click',e=>{if(e.target===$(id)){const r=$(id).getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$(id).close();}}));

const DRAFT_KEY='a12-11-12-classroom-group-writing-v1';let sending=false,snapshot=null,lastSent='',storageAvailable=true;
function addMember(value=''){
 const i=$('members').children.length;if(i>=8)return;
 const row=document.createElement('div');row.className='member-row';
 const label=document.createElement('label');label.textContent='Öğrenci '+(i+1);const input=document.createElement('input');input.type='text';input.maxLength=80;input.autocomplete='name';input.placeholder='Adınız';input.value=value;input.className='member-name';input.required=true;label.append(input);row.append(label);
 const remove=document.createElement('button');remove.type='button';remove.className='small-button';remove.textContent='×';remove.setAttribute('aria-label','Bu öğrenci alanını kaldır');remove.onclick=()=>{if($('members').children.length>1){row.remove();renumberMembers();saveDraft();}};row.append(remove);$('members').append(row);renumberMembers();
}
function renumberMembers(){[...$('members').children].forEach((row,i)=>{row.querySelector('label').firstChild.textContent='Öğrenci '+(i+1);row.querySelector('button').disabled=$('members').children.length===1;});$('addMember').disabled=$('members').children.length>=8;}
function getDraft(){return {names:[...document.querySelectorAll('.member-name')].map(x=>x.value.trim()),group:$('groupLabel').value.trim(),title:$('textTitle').value.trim(),text:$('groupText').value,copyConfirmed:$('copyConfirm').checked};}
function signature(s){return JSON.stringify({names:s.names,group:s.group,title:s.title,text:s.text});}
function updateEditor(){
 const text=$('groupText').value.trim();$('wordCount').textContent=(text?text.split(/\s+/u).length:0)+' kelime · '+text.length+' karakter';
 const alreadySent=lastSent&&signature(getDraft())===lastSent;$('reviewButton').disabled=!!alreadySent||sending;
 if(alreadySent){$('formStatus').className='success';$('formStatus').textContent='✅ Bu metin gönderildi. Profe Hazel daha sonra kontrol edecek.';}
 else if(!sending){$('formStatus').className='';$('formStatus').textContent='';}
}
function saveDraft(){
 try{localStorage.setItem(DRAFT_KEY,JSON.stringify({...getDraft(),lastSent}));storageAvailable=true;$('draftStatus').textContent='✓ Taslak kaydedildi';}
 catch(e){storageAvailable=false;$('draftStatus').textContent='Taslak kaydı kullanılamıyor; kopyanı al.';}
 updateEditor();
}
let draft;try{draft=JSON.parse(localStorage.getItem(DRAFT_KEY)||'null');}catch(e){draft=null;}
if(draft&&Array.isArray(draft.names)){draft.names.slice(0,8).forEach(n=>addMember(String(n)));$('groupLabel').value=String(draft.group||'').slice(0,60);$('textTitle').value=String(draft.title||'').slice(0,120);$('groupText').value=String(draft.text||'').slice(0,15000);lastSent=String(draft.lastSent||'');$('draftStatus').textContent='✓ Önceki taslağın geri yüklendi';}
if(!$('members').children.length)addMember();updateEditor();
$('addMember').onclick=()=>{addMember();saveDraft();[...document.querySelectorAll('.member-name')].at(-1).focus();};
$('groupForm').addEventListener('input',saveDraft);
document.querySelectorAll('[data-accent]').forEach(b=>b.onclick=()=>{const el=$('groupText');el.setRangeText(b.dataset.accent,el.selectionStart,el.selectionEnd,'end');el.focus();saveDraft();});
function copyContent(){const s=getDraft();return LESSON_TITLE+'\nGrup: '+(s.group||'—')+'\nGrup üyeleri: '+s.names.join(' · ')+'\n\n'+s.title+'\n\n'+s.text;}
$('copyText').onclick=async()=>{try{await navigator.clipboard.writeText(copyContent());$('copyConfirm').checked=true;$('draftStatus').textContent='✓ Metin ve isimler kopyalandı';saveDraft();}catch(e){$('formStatus').textContent='Kopyalama açılamadı. Metni seçip kopyalayın veya “Metni indir” düğmesini kullanın.';}};
$('downloadText').onclick=()=>{const blob=new Blob([copyContent()],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download='A1.2-11-12-Grup-Yazma.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('copyConfirm').checked=true;saveDraft();};
$('groupForm').addEventListener('submit',e=>{
 e.preventDefault();if(sending)return;
 const value=getDraft();const error=validateSubmission(value);
 if(error){$('formStatus').className='error';$('formStatus').textContent=error;return;}
 if(signature(value)===lastSent){updateEditor();return;}
 snapshot=value;$('sendMembers').textContent='👥 '+value.names.join(' · ')+(value.group?' | '+value.group:'');$('sendPreview').textContent=value.title+'\n\n'+value.text;
 $('sendStatus').textContent='İsimleri ve metni son kez kontrol edin.';$('sendStatus').className='';$('sendFinal').disabled=false;$('sendFinal').textContent='✔ Gönder';$('sendCancel').textContent='← Düzenlemeye dön';$('sendDialog').showModal();
});
$('sendCancel').onclick=()=>{if(!sending)$('sendDialog').close();};
$('sendDialog').addEventListener('cancel',e=>{if(sending)e.preventDefault();});
$('sendFinal').onclick=async()=>{
 if(sending||!snapshot||lastSent===signature(snapshot))return;
 sending=true;$('sendFinal').disabled=true;$('sendCancel').disabled=true;$('sendFinal').textContent='⏳ Gönderiliyor…';$('sendStatus').textContent='Grup yazınız iletiliyor…';updateEditor();
 try{
  await sendSubmission(snapshot);
  lastSent=signature(snapshot);$('sendStatus').className='success';$('sendStatus').textContent='✅ Yazınız başarıyla gönderildi. Profe Hazel daha sonra kontrol edecek.';$('sendFinal').textContent='✓ Gönderildi';$('sendCancel').textContent='Etkinliğe dön';saveDraft();
 }catch(e){
  $('sendStatus').className='error';$('sendStatus').textContent=e.name==='AbortError'?'⚠️ Gönderim teyit edilemedi. Yazınız korunuyor. Yeniden göndermeden önce öğretmeninize ulaşıp ulaşmadığını kontrol edin.':'⚠️ Gönderilemedi. Yazınız korunuyor. Bağlantınızı kontrol edip tekrar deneyin.';
  $('sendFinal').disabled=false;$('sendFinal').textContent='Tekrar gönder';
 }finally{sending=false;$('sendCancel').disabled=false;updateEditor();}
};
window.addEventListener('beforeunload',e=>{if(sending||(!storageAvailable&&$('groupText').value.trim())){e.preventDefault();e.returnValue='';}});
})();
