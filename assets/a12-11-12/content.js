'use strict';
window.LESSON = {
  pairs: [
    ['viejo','un amigo viejo','yaşlı bir arkadaş','un viejo amigo','uzun zamandır tanıdığım bir arkadaş','Eski arkadaş, arkadaşlığın süresini anlatır; kişinin yaşını değil.','old','long-standing'],
    ['grande','una casa grande','boyutu büyük bir ev','una gran casa','harika / etkileyici bir ev','Öndeki biçim gran olur. Değerlendirme okuması yaygındır; bağlam da önemlidir.','large','great'],
    ['bueno','un chico bueno','iyi huylu bir çocuk','un buen chico','iyi bir çocuk / iyi biri','Anlamlar çoğu durumda örtüşür. Sıra her zaman kesin bir karşıtlık yaratmaz.','good / kind','good / kind'],
    ['malo','un día malo','kötü bir gün','un mal día','kötü / talihsiz bir gün','Bu ikisinin anlamları da örtüşebilir; mal, eril tekilden önceki kısa biçimdir.','bad','bad / unfortunate'],
    ['pobre','un hombre pobre','maddi durumu yetersiz bir adam','un pobre hombre','zavallı / acınacak bir adam','Burada sıfatın yeri belirgin bir anlam ayrımı yaratabilir.','poor / without money','unfortunate / pitiful'],
    ['grande','una persona grande','iri bir kişi; bazı bölgelerde yetişkin / yaşlı kişi','una gran persona','harika bir insan','Grande kişiyle kullanıldığında yaş da anlatabilir; bağlama bak.','large / grown-up','great / admirable'],
    ['cierto','una noticia cierta','doğru bir haber','una cierta noticia','belli bir haber','Öndeki cierto/a burada belirsiz bir belirleyici gibi çalışır; yalnızca duygusal vurgu değildir.','true','a certain'],
    ['simple','una pregunta simple','kolay / basit bir soru','una simple pregunta','yalnızca bir soru','Önde “sadece, bundan ibaret” vurgusu görülebilir.','simple / easy','mere'],
    ['antiguo','mi casa antigua','eski / tarihî evim','mi antigua casa','önceden yaşadığım ev','İkinci ifade binanın mutlaka yaşlı olduğunu söylemez.','old / historic','former'],
    ['diferente','cosas diferentes','birbirinden farklı şeyler','diferentes cosas','çeşitli / farklı şeyler','Önde çeşitlilik vurgusu yaygındır; zorunlu bir “çok sayıda” anlamı yoktur ve anlamlar örtüşebilir.','different','various / different'],
    ['mismo','el libro mismo','kitabın kendisi','el mismo libro','aynı kitap','Öndeki aynı oluşu, sondaki kendisini vurgular.','itself','same'],
    ['único','un alumno único','eşsiz / çok özel bir öğrenci','el único alumno','tek öğrenci','Biricik olma ile sayıca tek olma farkına dikkat et.','unique / special','only'],
    ['raro','un animal raro','tuhaf veya nadir bir hayvan','un raro animal','nadir veya alışılmadık bir hayvan','Yalnızca sıraya bakarak kesin karar veremeyiz. İki anlam da bağlama göre görülebilir.','strange / rare','rare / unusual'],
    ['grande','un hombre grande','iri bir adam','un gran hombre','önemli / değerli bir adam','Fiziksel büyüklük ile kişinin değerine yönelik yorum arasındaki yaygın fark.','large','great / admirable']
  ],
  agreement: [
    ['İki uzun boylu kız:','dos chicas ___','altas','Chicas dişil çoğul; alto → altas.'],
    ['İlginç bir kitap:','un libro ___','interesante','Interesante cinsiyete göre değişmez; isim burada tekil.'],
    ['Çalışkan bir kadın:','una mujer ___','trabajadora','Trabajador → trabajadora; dişil tekil biçim.'],
    ['İki mutlu kişi:','dos personas ___','felices','Feliz cinsiyete göre değişmez; çoğulda -z → -ces.']
  ],
  short: [
    ['Harika bir fikir:','una ___ idea','gran','Grande → gran; idea dişil ama tekil.'],
    ['İyi bir arkadaş (eril):','un ___ amigo','buen','Bueno → buen; eril tekil isimden önce.'],
    ['Üçüncü kat:','el ___ piso','tercer','Tercero → tercer; eril tekil isimden önce.'],
    ['İlk sayfa:','la ___ página','primera','Página dişil tekil; primer değil, primera.']
  ],
  context: [
    ['Arkadaşın 78 yaşında. Yaşını belirtmek istiyorsun.','Es un ___.','amigo viejo','Sıfat burada fiziksel yaşı anlatır.'],
    ['Arkadaşını çocukluğundan beri tanıyorsun.','Es un ___.','viejo amigo','Sıfat arkadaşlığın uzun süredir devam ettiğini anlatır.'],
    ['Adamın çok az parası var.','Es un ___.','hombre pobre','Maddi yoksulluk için yaygın sıra: isim + pobre.'],
    ['Çocuk bütün gün aksiliklerle uğraştı. Ona üzülüyorsun.','Es un ___.','pobre chico','Acıma yorumu için yaygın sıra: pobre + isim.'],
    ['Bir kitap yerine birkaç daha iyi fikir arıyorsun.','Busco unas ideas ___.','mejores','Mejor cinsiyet değiştirmez ama çoğul olur: mejores.'],
    ['Aşağıdaki ifadeyi çoğul yap.','una buena amiga → ___','unas buenas amigas','Artikel, sıfat ve isim birlikte çoğul olur.']
  ],
  reading: [
    [['Es una tarde tranquila','Zamanı tanıtan yüklem'],['en casa de Clara.','Yer bildiren öbek']],
    [['Su viejo amigo Leo','Özne öbeği'],['está preparando','Şu anda süren eylem'],['una buena cena','Nesne öbeği'],['en una cocina pequeña.','Yer bildiren öbek']],
    [['Mientras Leo está cocinando,','Eş zamanlılığı bildiren yan cümle'],['Clara','Özne'],['está leyendo','Şu anda süren eylem'],['un libro interesante.','Nesne öbeği']],
    [['Es su primer libro','Tanıtıcı yüklem'],['en español','Dil bildiren öbek'],['y tiene páginas cortas.','Bağlı cümle']],
    [['En el jardín,','Yer bildiren öbek'],['sus dos hermanas menores','Özne öbeği'],['están pintando','Şu anda süren eylem'],['una mesa redonda y azul.','Nesne öbeği']],
    [['La casa es antigua,','Evi niteleyen cümle'],['pero para Clara','Karşıtlık bağlacı ve bakış açısı'],['es una gran casa.','Değerlendirme bildiren yüklem']],
    [['Todos están contentos','Durum bildiren yüklem'],['porque están pasando','Neden bildiren yan cümlede eylem'],['una bonita tarde','Zamanın niteliğini bildiren öbek'],['juntos.','Birliktelik bildiren öge']]
  ],
  questions: [
    ['¿Qué está preparando Leo?','Leo está preparando una buena cena.','Örnek cevap · Leo güzel bir akşam yemeği hazırlıyor.'],
    ['¿Qué está haciendo Clara mientras Leo cocina?','Clara está leyendo un libro interesante.','Örnek cevap · Clara ilginç bir kitap okuyor.'],
    ['¿Cómo es la mesa que están pintando las hermanas?','La mesa es redonda y azul.','Örnek cevap · Masa yuvarlak ve mavi.'],
    ['¿Por qué el texto dice «su viejo amigo»?','Porque Leo es su amigo desde hace mucho tiempo.','Örnek cevap · Yaşı değil, arkadaşlığın süresi anlatılıyor.'],
    ['¿«Una gran casa» describe necesariamente el tamaño?','No. Aquí expresa una valoración positiva de la casa.','Örnek cevap · Burada evin büyüklüğünden çok Clara’nın olumlu değerlendirmesi vurgulanıyor.']
  ]
};

const WORDS = {};
function word(lemma,tr,en,type,forms){
  const variants=(forms||lemma).split('|');
  variants.forEach(form=>{ WORDS[form.toLowerCase()]={lemma,tr,en,type,form:form===lemma?'Sözlük biçimi':`Kullanılan biçim: ${form}`}; });
}
function adjective(lemma,tr,en,forms,mode='two'){
 word(lemma,tr,en,'Sıfat',forms);
 for(const f of (forms||lemma).split('|')){
   const e=WORDS[f];
   if(mode==='two') e.form=f.endsWith('as')?'Dişil çoğul':f.endsWith('os')?'Eril çoğul':f.endsWith('a')?'Dişil tekil':'Eril tekil';
   else e.form=(f===lemma?'Tekil':'Çoğul')+'; eril ve dişilde aynı biçim';
 }
}
[
 ['alto','uzun boylu / yüksek','tall / high','alto|alta|altos|altas'],['bonito','güzel','pretty / lovely','bonito|bonita|bonitos|bonitas'],['guapo','yakışıklı / güzel','good-looking','guapo|guapa|guapos|guapas'],['trabajador','çalışkan','hard-working','trabajador|trabajadora|trabajadores|trabajadoras'],['hablador','konuşkan','talkative','hablador|habladora|habladores|habladoras'],['catalán','Katalan','Catalan','catalán|catalana|catalanes|catalanas'],['llorón','çok ağlayan / mızmız','tearful / whiny','llorón|llorona|llorones|lloronas'],['español','İspanyol; İspanyolca','Spanish','español|española|españoles|españolas'],['inglés','İngiliz; İngilizce','English','inglés|inglesa|ingleses|inglesas'],['francés','Fransız; Fransızca','French','francés|francesa|franceses|francesas'],['alemán','Alman; Almanca','German','alemán|alemana|alemanes|alemanas'],['andaluz','Endülüslü','Andalusian','andaluz|andaluza|andaluces|andaluzas'],['rojo','kırmızı','red','rojo|roja|rojos|rojas'],['redondo','yuvarlak','round','redondo|redonda|redondos|redondas'],['vacío','boş','empty','vacío|vacía|vacíos|vacías'],['pequeño','küçük','small','pequeño|pequeña|pequeños|pequeñas'],['viejo','yaşlı; eski / uzun zamandır tanınan','old; long-standing','viejo|vieja|viejos|viejas'],['bueno','iyi','good','bueno|buena|buenos|buenas'],['malo','kötü','bad','malo|mala|malos|malas'],['cierto','doğru; önde belli bir','true; a certain','cierto|cierta|ciertos|ciertas'],['antiguo','eski / tarihî; önceki','old / historic; former','antiguo|antigua|antiguos|antiguas'],['mismo','aynı; kendisi','same; itself','mismo|misma|mismos|mismas'],['único','tek; eşsiz','only; unique','único|única|únicos|únicas'],['raro','tuhaf / nadir','strange / rare','raro|rara|raros|raras'],['primero','ilk / birinci','first','primero|primera|primeros|primeras'],['tercero','üçüncü','third','tercero|tercera|terceros|terceras'],['tranquilo','sakin','calm / quiet','tranquilo|tranquila|tranquilos|tranquilas'],['corto','kısa','short','corto|corta|cortos|cortas'],['contento','mutlu / memnun','happy / pleased','contento|contenta|contentos|contentas'],['junto','birlikte','together','junto|junta|juntos|juntas'],['positivo','olumlu','positive','positivo|positiva|positivos|positivas']
].forEach(x=>adjective(...x));
[
 ['interesante','ilginç','interesting','interesante|interesantes'],['amable','nazik / cana yakın','kind / friendly','amable|amables'],['joven','genç','young','joven|jóvenes'],['feliz','mutlu','happy','feliz|felices'],['optimista','iyimser','optimistic','optimista|optimistas'],['inteligente','zeki','intelligent','inteligente|inteligentes'],['azul','mavi','blue','azul|azules'],['familiar','aileye ait / tanıdık','family-related / familiar','familiar|familiares'],['grande','büyük; önemli / etkileyici','large; great','grande|grandes'],['pobre','yoksul; zavallı','poor; unfortunate','pobre|pobres'],['simple','basit; yalnızca','simple; mere','simple|simples'],['diferente','farklı / çeşitli','different / various','diferente|diferentes'],['mayor','daha büyük / yaşlı; büyük kardeş','older / greater; elder','mayor|mayores'],['menor','daha küçük / genç','younger / smaller','menor|menores'],['mejor','daha iyi; en iyi','better; best','mejor|mejores'],['peor','daha kötü','worse','peor|peores']
].forEach(x=>adjective(...x,'one'));
word('grande','büyük / etkileyici','great / large','Sıfat · apócope','gran');WORDS.gran.form='Eril veya dişil tekil isimden önce kısa biçim';
for(const [short,lemma] of [['buen','bueno'],['mal','malo'],['primer','primero'],['tercer','tercero']]){ WORDS[short]={...WORDS[lemma],form:'Eril tekil isimden önce kısa biçim (apócope)'}; }
[
 ['chico','çocuk / genç erkek','boy / young man','chico|chicos'],['chica','kız / genç kadın','girl / young woman','chica|chicas'],['casa','ev','house','casa|casas'],['coche','araba','car','coche|coches'],['mesa','masa','table','mesa|mesas'],['botella','şişe','bottle','botella|botellas'],['tarde','öğleden sonra / akşamüstü','afternoon / early evening','tarde|tardes'],['amigo','arkadaş (eril)','friend (masculine)','amigo|amigos'],['amiga','arkadaş (dişil)','friend (feminine)','amiga|amigas'],['hombre','adam','man','hombre|hombres'],['persona','kişi','person','persona|personas'],['noticia','haber','news item','noticia|noticias'],['pregunta','soru','question','pregunta|preguntas'],['problema','sorun','problem','problema|problemas'],['cosa','şey','thing','cosa|cosas'],['libro','kitap','book','libro|libros'],['alumno','öğrenci (eril)','student (masculine)','alumno|alumnos'],['animal','hayvan','animal','animal|animales'],['idea','fikir','idea','idea|ideas'],['día','gün','day','día|días'],['noche','gece','night','noche|noches'],['capítulo','bölüm','chapter','capítulo|capítulos'],['página','sayfa','page','página|páginas'],['piso','kat / daire','floor / flat','piso|pisos'],['planta','kat / bitki','floor / plant','planta|plantas'],['amor','aşk','love','amor'],['artista','sanatçı','artist','artista|artistas'],['hermano','erkek kardeş','brother','hermano|hermanos'],['hermana','kız kardeş','sister','hermana|hermanas'],['cena','akşam yemeği','dinner','cena'],['cocina','mutfak','kitchen','cocina'],['jardín','bahçe','garden','jardín|jardines'],['tiempo','zaman','time','tiempo'],['texto','metin','text','texto'],['tamaño','boyut','size','tamaño'],['valoración','değerlendirme','assessment / evaluation','valoración'],['movimiento','hareket','movement','movimiento']
].forEach(x=>word(x[0],x[1],x[2],'İsim',x[3]));
word('mujer','kadın','woman','İsim · dişil','mujer|mujeres');
for(const name of ['Lucía','Diego','Clara','Leo','Elena','Pablo','Sara','Mateo','Ana','Bruno','Carmen','Hugo']) word(name,name,name,'Özel isim',name);
[
 ['el','belirli artikel (eril tekil)','the (masculine singular)','Belirli artikel','el'],['la','belirli artikel (dişil tekil)','the (feminine singular)','Belirli artikel','la'],['los','belirli artikel (eril çoğul)','the (masculine plural)','Belirli artikel','los'],['las','belirli artikel (dişil çoğul)','the (feminine plural)','Belirli artikel','las'],['un','bir (eril tekil)','a / an (masculine)','Belirsiz artikel','un'],['una','bir (dişil tekil)','a / an (feminine)','Belirsiz artikel','una'],['unos','birkaç / bazı (eril çoğul)','some (masculine plural)','Belirsiz artikel','unos'],['unas','birkaç / bazı (dişil çoğul)','some (feminine plural)','Belirsiz artikel','unas'],['dos','iki','two','Sayı','dos'],['mi','benim','my','İyelik belirleyicisi','mi'],['mis','benim (çoğul isimle)','my (plural noun)','İyelik belirleyicisi','mis'],['su','onun / sizin','his / her / your','İyelik belirleyicisi','su'],['sus','onun / sizin (çoğul isimle)','his / her / your (plural noun)','İyelik belirleyicisi','sus'],['este','bu (eril tekil)','this','İşaret belirleyicisi','este'],['esta','bu (dişil tekil)','this','İşaret belirleyicisi','esta'],['esto','bu','this','İşaret zamiri','esto'],['otro','diğeri / başka','other / another','Sıfat veya zamir','otro|otra'],['todos','herkes / hepsi','everyone / all','Belirsiz zamir','todos'],['algo','bir şey','something','Belirsiz zamir','algo'],['qué','ne / hangi','what / which','Soru sözcüğü','qué'],['cómo','nasıl','how','Soru zarfı','cómo'],['no','hayır / değil','no / not','Olumsuzluk sözcüğü','no']
].forEach(x=>word(...x));
[
 ['de','-ın / -in; -den','of / from','Edat','de'],['en','-de / -da; içinde','in / at / on','Edat','en'],['para','için / -e göre','for / from the perspective of','Edat','para'],['con','ile','with','Edat','con'],['desde','-den beri','since / from','Edat','desde'],['al','-e / -a; a + el','to the; a + el','Edat + artikel','al'],['lado','yan','side','İsim · al lado de: yanında','lado'],['y','ve','and','Bağlaç','y'],['pero','ama / fakat','but','Bağlaç','pero'],['porque','çünkü','because','Neden bağlacı','porque'],['por','için; por qué: neden','for; por qué: why','Edat','por'],['mientras','-iken / aynı sırada','while','Eş zamanlılık bağlacı','mientras'],['también','de / da / ayrıca','also / too','Zarf','también'],['además','ayrıca / üstelik','besides / furthermore','Zarf · bağlayıcı','además'],['ahora','şimdi','now','Zaman zarfı','ahora'],['hoy','bugün','today','Zaman zarfı','hoy'],['momento','an','moment','İsim','momento'],['arriba','yukarıda','upstairs / above','Yer zarfı','arriba'],['abajo','aşağıda','downstairs / below','Yer zarfı','abajo'],['después','sonra','afterwards','Zaman zarfı','después'],['más','daha / en','more / most','Derece zarfı','más'],['menos','daha az','less','Derece zarfı','menos'],['necesariamente','zorunlu olarak / mutlaka','necessarily','Zarf','necesariamente'],['aquí','burada','here','Yer zarfı','aquí'],['mucho','çok / uzun','much / a long','Miktar sözcüğü','mucho'],['que','-den / -dan; ki; ilgi bağı','than; that / which','Bağlaç veya ilgi zamiri','que']
].forEach(x=>word(...x));
word('ser','olmak (kimlik / nitelik)','to be (identity / quality)','Fiil · presente','ser|es|son');
word('estar','olmak / bulunmak; gerundio ile eylemi sürdürmek','to be; auxiliary for an ongoing action','Fiil · presente','estar|estoy|estás|está|estamos|estáis|están');
const estarPersons={estoy:'yo',estás:'tú',está:'él / ella / usted',estamos:'nosotros/as',estáis:'vosotros/as',están:'ellos / ellas / ustedes'};
for(const [f,p] of Object.entries(estarPersons)) WORDS[f].form=`Presente de indicativo · ${p}`;
WORDS.es.form='Presente · él / ella / usted';WORDS.son.form='Presente · ellos / ellas / ustedes';
[
 ['preparar','hazırlamak','to prepare','preparando'],['cocinar','yemek pişirmek','to cook','cocinando'],['leer','okumak','to read','leyendo'],['pintar','boyamak / resim yapmak','to paint','pintando'],['pasar','geçirmek / geçmek','to spend / pass','pasando'],['hacer','yapmak','to do / make','haciendo'],['dormir','uyumak','to sleep','durmiendo'],['regar','sulamak','to water','regando']
].forEach(([lemma,tr,en,g])=>{word(lemma,tr,en,'Fiil · mastar',lemma);word(lemma,tr,en,'Fiil · gerundio',g);WORDS[g].form='Gerundio; özneye göre biçim değiştirmez';});
word('tener','sahip olmak / var','to have','Fiil · presente','tiene');WORDS.tiene.form='Presente · él / ella / usted';
word('buscar','arıyorum','I am looking for','Fiil · presente','busco');WORDS.busco.form='Presente · yo';
word('necesitar','ihtiyacım var','I need','Fiil · presente','necesito');WORDS.necesito.form='Presente · yo';
word('expresar','ifade ediyor','expresses','Fiil · presente','expresa');
word('describir','anlatıyor / betimliyor','describes','Fiil · presente','describe');
word('decir','söylüyor / diyor','says','Fiil · presente','dice');
word('ser','olmak','to be','Fiil · mastar','ser');
word('hacer','öncesinden beri (hace ... tiempo)','ago / for (hace ... tiempo)','Fiil · zaman ifadesinde','hace');
word('-ando','-ar fiilleri için gerundio eki','gerund ending for -ar verbs','Biçim bilgisi','ando');
word('-iendo','-er / -ir fiilleri için gerundio eki','gerund ending for -er / -ir verbs','Biçim bilgisi','iendo');
window.LESSON_WORDS=WORDS;
const feminineNouns=new Set('chica casa mesa botella tarde amiga persona noticia pregunta cosa idea noche página planta hermana cena cocina valoración mujer'.split(' '));
for(const e of Object.values(WORDS)) if(e.type==='İsim'||e.type==='İsim · dişil') {
 const feminine=feminineNouns.has(e.lemma);
 e.type='İsim · '+(feminine?'dişil':'eril');
 e.form=(e.form==='Sözlük biçimi'?'Tekil':'Çoğul')+' biçim';
}
