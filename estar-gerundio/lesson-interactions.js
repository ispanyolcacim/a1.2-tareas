const readingChunkColors=["#f8d4e3", "#d6e5ff", "#ffedb3", "#d4eedb", "#e6d6fa", "#ffdac5", "#d2eff2", "#f4d0cf", "#dfe8bb", "#e6d2e8", "#d8e0ef", "#f8e1be", "#cce6dc", "#e4e0f6"];
'use strict';
function renderReading(){const content=window.readingLesson,story=$('reading-story');for(const paragraph of content.paragraphs){const p=document.createElement('p');paragraph.forEach((sentence,i)=>{const span=document.createElement('span');span.dataset.sentence='';span.className='sentence';let cursor=0,colorIndex=0;for(const [phrase,role] of sentence.roles){const at=sentence.text.indexOf(phrase,cursor);if(at<0)continue;span.append(sentence.text.slice(cursor,at));const chunk=document.createElement('span');chunk.className='syntax-chunk';chunk.dataset.role=role;chunk.style.setProperty('--chunk-color',readingChunkColors[colorIndex++%readingChunkColors.length]);chunk.textContent=phrase;span.append(chunk);cursor=at+phrase.length;}span.append(sentence.text.slice(cursor));window.LessonWords.register(sentence.text,sentence.roles);p.append(span);if(i<paragraph.length-1)p.append(' ');});story.append(p);}content.questions.forEach((item,i)=>{const article=document.createElement('article');article.className='reading-question surface';const heading=document.createElement('div');heading.className='reading-question-title';const number=document.createElement('span');number.className='question-number';number.textContent=String(i+1).padStart(2,'0');const q=document.createElement('h3');q.lang='es';q.dataset.sentence='';q.textContent=item.q;heading.append(number,q);article.append(heading);const toggle=document.createElement('button');toggle.className='button secondary';toggle.type='button';toggle.textContent='🔒 Örnek cevabı aç';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls',`reading-answer-${i}`);const answer=document.createElement('div');answer.id=`reading-answer-${i}`;answer.className='reveal reading-answer';answer.hidden=true;const a=document.createElement('p');a.lang='es';a.dataset.sentence='';a.textContent=item.a;const label=document.createElement('p');label.className='eyebrow';label.textContent='📖 METİNDEKİ İPUCU';const evidence=document.createElement('blockquote');evidence.lang='es';evidence.dataset.sentence='';evidence.textContent=item.e;answer.append(a,label,evidence);toggle.addEventListener('click',()=>{const show=answer.hidden;answer.hidden=!show;toggle.setAttribute('aria-expanded',String(show));toggle.textContent=show?'🔓 Örnek cevabı gizle':'🔒 Örnek cevabı aç';});article.append(toggle,answer);$('reading-questions').append(article);});}
function registerSentenceNotes(){
const W=window.LessonWords,S='Özne grubu.',P='Yüklem: devam eden eylem.',O='Doğrudan nesne.',L='Yer/yönelme tümleci.',C='Bağlaç.',A='Zarf tümleci.';
const tr=[
[['Mi gato',S],['está durmiendo',P],['en el sofá',L]],
[['Esta planta',S],['se está muriendo',P],['de sed','Neden tümleci: susuzluktan.']],
[['Estamos pidiendo','Yüklem; gizli özne nosotros/nosotras.'],['una pizza',O],['en el restaurante',L]],
[['Los estudiantes',S],['están repitiendo',P],['la frase',O]],
[['Estoy siguiendo','Yüklem; gizli özne yo.'],['las instrucciones de la profesora',O]],
[['Estáis consiguiendo','Yüklem; gizli özne vosotros/vosotras.'],['muy buenos resultados',O],['muy','Buenos sıfatının derecesini artıran zarf.']],
[['El camarero',S],['está sirviendo',P],['el café',O]],
[['Estás diciendo','Sorunun yüklemi; gizli özne tú.'],['la verdad',O]],
[['Mis amigos',S],['están viniendo',P],['a mi casa',L]],
[['Estoy sintiendo','Yüklem; gizli özne yo.'],['mucho frío',O]],
[['Mi hermana',S],['se está vistiendo',P],['en su habitación',L]],
[['Ese niño',S],['está mintiendo',P]],
[['Estamos leyendo','Yüklem; gizli özne nosotros/nosotras.'],['un libro interesante',O]],
[['Los niños',S],['están riendo',P],['mucho','Fiilin derecesini artıran zarf.']],
[['Mi madre',S],['está trayendo',P],['la comida',O],['a la mesa',L]],
[['Las hojas',S],['están cayendo',P],['al suelo',L]],
[['Los vecinos',S],['están oyendo',P],['un ruido extraño',O]],
[['Estamos yendo','Yüklem; gizli özne nosotros/nosotras.'],['a casa',L]]];
verbs.forEach((v,i)=>W.register(v.es,tr[i]));
const m=[
[[['Mamá','Seslenme sözü; özne değil.'],['estoy estudiando','Yüklem; gizli özne yo.']],[['Estás estudiando',P],['o',C],['estás durmiendo',P]],[['Estoy estudiando',P],['mis sueños',O]]],
[[['Papá','Seslenme sözü; özne değil.'],['estoy ahorrando',P]],[['Y',C],['por qué','Neden soran tümleç.'],['estás comprando',P],['tantas cosas',O]],[['Estoy aprovechando',P],['las ofertas',O]]],
[[['Me','Doğrudan nesne zamiri: beni.'],['estás escuchando',P]],[['Sí','Onay bildiren zarf.'],['profe','Seslenme sözü.'],['Estoy tomando',P],['notas',O]],[['Notas','Eksiltili ifadenin isim grubu.'],['sobre mi gato','Notas ismini tamamlayan edatlı grup.']]]];
memes.forEach((item,i)=>{item.lines.forEach((line,j)=>W.register(line,m[i][j]));W.register(item.caption,m[i][2]);});
[
['¿Qué está pasando?',[['Qué','Soru zamiri; pasar fiilinin öznesi: ne oluyor?'],['está pasando',P]]],
['Estamos aprendiendo.',[['Estamos aprendiendo','Yüklem; gizli özne nosotros/nosotras.']]],
['Yo estoy estudiando español.',[['Yo',S],['estoy estudiando',P],['español',O]]],
['No estoy trabajando.',[['No','Olumsuzluk zarfı.'],['estoy trabajando',P]]],
['¿Estás trabajando?',[['Estás trabajando','Sorunun yüklemi; gizli özne tú.']]],
['estoy hablando · estamos hablando.',[['estoy hablando',P],['estamos hablando',P]]],
['Me estoy duchando. = Estoy duchándome.',[['Me','Dönüşlü zamir.'],['estoy duchando',P],['Estoy duchándome','Yüklem; dönüşlü me zamiri sona eklenmiş.']]],
['Ella está leyendo un libro.',[['Ella',S],['está leyendo',P],['un libro',O]]],
['¿Dónde está el hijo?',[['Dónde','Yer soran tümleç.'],['está','Konum bildiren yüklem.'],['el hijo',S]]],
['¿Qué está haciendo de verdad?',[['Qué',O],['está haciendo',P],['de verdad','Gerçekliği vurgulayan zarf grubu.']]],
['¿Por qué es graciosa su respuesta?',[['Por qué','Neden soran tümleç.'],['es','Bağ fiili.'],['graciosa','Öznenin özelliğini açıklayan yüklem tamamlayıcısı.'],['su respuesta',S]]],
['¿Qué está haciendo el hijo?',[['Qué',O],['está haciendo',P],['el hijo',S]]],
['¿Está ahorrando o está gastando dinero?',[['Está ahorrando',P],['o',C],['está gastando',P],['dinero',O]]],
['¿Las ofertas siempre nos ayudan a ahorrar?',[['Las ofertas',S],['siempre','Sıklık zarfı.'],['nos','Doğrudan nesne zamiri: bizi.'],['ayudan','Yüklem.'],['a ahorrar','Ayudar a + mastar yapısının tamamlayıcısı.']]],
['¿Qué está haciendo la profesora?',[['Qué',O],['está haciendo',P],['la profesora',S]]],
['¿El estudiante está tomando notas de la clase?',[['El estudiante',S],['está tomando',P],['notas de la clase',O]]],
['¿Qué está dibujando en su cuaderno?',[['Qué',O],['está dibujando',P],['en su cuaderno',L]]]
].forEach(([text,roles])=>W.register(text,roles));
const qa=[
{q:[['Para qué','Amaç soran tümleç.'],['están organizando',P],['el mercadillo',O],['los vecinos',S]],a:[['Para recaudar dinero y renovar la biblioteca del barrio','Amaç bildiren mastar grubu.'],['dinero',O],['la biblioteca del barrio',O]]},
{q:[['Qué',O],['está haciendo',P],['Lucía',S],['en el puesto de su abuela',L],['y',C],['por qué','Neden soran tümleç.'],['está buscando',P],['unas pilas',O]],a:[['Está escribiendo',P],['los precios',O],['y',C],['está buscando',P],['unas pilas',O],['para comprobar si la cámara funciona','Amaç bildiren grup.'],['si','Dolaylı soruyu başlatır: çalışıp çalışmadığını.'],['la cámara',S],['funciona','İç cümlenin yüklemi.']]},
{q:[['Por qué','Neden soran tümleç.'],['casi nadie',S],['está escuchando',P],['a Diego','Kişi bildiren doğrudan nesne.']],a:[['Porque','Neden bağlacı.'],['unos músicos',S],['están tocando',P],['la guitarra',O],['y',C],['varias personas',S],['están bailando',P],['cerca de la fuente',L]]},
{q:[['Cómo','Tarz soran tümleç.'],['reaccionan','Ana cümlenin yüklemi.'],['los vecinos',S],['cuando empieza a llover','Zaman yan cümlesi.'],['cuando','Zaman bağlacı.'],['empieza a llover','Kişisiz yan cümlenin yüklemi.']],a:[['Trasladan','Yüklem; gizli özne los vecinos.'],['sus puestos',O],['al centro cultural',L],['y',C],['colaboran','Yüklem.'],['Lucía',S],['protege','Yüklem.'],['los libros',O],['Diego',S],['recoge','Yüklem.'],['los vasos',O]]},
{q:[['Al final','Zaman tümleci.'],['qué',O],['está descubriendo',P],['Lucía',S],['Qué','Doğrudan nesne sorusu: ne anlama gelir?'],['significa','İkinci sorunun yüklemi.'],['dar una segunda vida a los objetos','Mastar grubuyla kurulan özne.']],a:[['Está descubriendo',P],['que ayudar puede ser divertido','Ana cümlenin doğrudan nesnesi olan yan cümle.'],['ayudar','Yan cümlenin mastar öznesi.'],['puede ser','Yan cümlenin yüklemi.'],['divertido','Yüklem tamamlayıcısı.'],['Dar una segunda vida a los objetos','Mastar grubuyla kurulan özne.'],['significa','Yüklem.'],['volver a usarlos en lugar de tirarlos','Significa fiilinin doğrudan nesnesi olan mastar grubu.']]}];
window.readingLesson.questions.forEach((item,i)=>{W.register(item.q,qa[i].q);W.register(item.a,qa[i].a);});
}
const memeHitMaps=[
{size:[1199,1312],lines:[[['Mamá',452,18,219,84],['estoy',688,20,195,72],['estudiando',455,97,420,68]],[['Estás',488,476,184,76],['estudiando',406,537,310,75],['o',732,552,33,36],['estás',365,600,137,55],['durmiendo',512,594,308,60]],[['Estoy',502,914,157,60],['estudiando',428,967,325,77],['mis',416,1032,102,52],['sueños',538,1028,224,60]]]},
{size:[1199,1312],lines:[[['Papá',568,64,255,102],['estoy',838,74,255,93],['ahorrando',575,170,525,78]],[['Y',483,464,78,63],['por',579,475,110,54],['qué',706,458,118,71],['estás',842,458,170,57],['comprando',567,525,375,68],['tantas',526,593,215,51],['cosas',759,589,219,55]],[['Estoy',672,929,253,80],['aprovechando',522,1004,549,81],['las',585,1082,107,64],['ofertas',713,1079,313,67]]]},
{size:[1024,1536],lines:[[['Me',570,93,132,83],['estás',725,90,199,78],['escuchando',490,188,486,76]],[['Sí',114,586,81,68],['profe',220,590,197,66],['Estoy',175,669,189,72],['tomando',108,734,314,62],['notas',169,806,209,55]],[['Notas',70,1070,302,80],['sobre',84,1145,188,62],['mi',295,1160,77,44],['gato',140,1212,182,74]]]}];
function renderMemeOverlay(){const map=memeHitMaps[activeMeme],overlay=$('meme-word-overlay');overlay.replaceChildren();map.lines.forEach((line,i)=>{let offset=0;const sentence=memes[activeMeme].lines[i];line.forEach(([word,x,y,w,h])=>{const hit=document.createElement('span');hit.className='meme-word-hit';hit.style.left=`${100*x/map.size[0]}%`;hit.style.top=`${100*y/map.size[1]}%`;hit.style.width=`${100*w/map.size[0]}%`;hit.style.height=`${100*h/map.size[1]}%`;const token=document.createElement('span');token.className='word-token';token.dataset.word=word.toLocaleLowerCase('es');token.dataset.wordContext=sentence;const index=sentence.indexOf(word,offset);token.dataset.wordOffset=String(index);offset=index+word.length;token.textContent=word;token.setAttribute('role','button');token.tabIndex=-1;token.setAttribute('aria-label',`${word}: kelime bilgisi`);token.setAttribute('aria-haspopup','dialog');hit.append(token);overlay.append(hit);});});}


// Keep the chosen sentence colored while its word explanation is open.
document.addEventListener('click',event=>{const sentence=event.target.closest('#reading-story .sentence');if(sentence){document.querySelectorAll('#reading-story .sentence.is-active').forEach(s=>s.classList.remove('is-active'));sentence.classList.add('is-active');}else if(!event.target.closest('.word-dialog,.word-popover'))document.querySelectorAll('#reading-story .sentence.is-active').forEach(s=>s.classList.remove('is-active'));},true);
document.addEventListener('close',()=>document.querySelectorAll('#reading-story .sentence.is-active').forEach(s=>s.classList.remove('is-active')),true);
document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('#reading-story .sentence.is-active').forEach(s=>s.classList.remove('is-active'));});
