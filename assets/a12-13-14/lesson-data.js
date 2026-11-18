'use strict';

const pronouns = [
  ['a mí', 'me', 'bana'], ['a ti', 'te', 'sana'], ['a él / a ella / a usted', 'le', 'ona / size'],
  ['a nosotros / a nosotras', 'nos', 'bize'], ['a vosotros / a vosotras', 'os', 'size'],
  ['a ellos / a ellas / a ustedes', 'les', 'onlara / sizlere'],
];

const family = [
  ['gustar', 'hoşuna gitmek / sevmek', [['indirect','Me'], ['verb','gusta'], ['subject','el cine.']], 'Sinemayı severim.'],
  ['encantar', 'bayılmak', [['indirect','Te'], ['verb','encantan'], ['subject','los gatos.']], 'Kedilere bayılırsın.'],
  ['interesar', 'ilgisini çekmek', [['indirect','A Juan le'], ['verb','interesa'], ['subject','el arte.']], 'Sanat Juan’ın ilgisini çeker.'],
  ['molestar', 'rahatsız etmek', [['indirect','Nos'], ['verb','molesta'], ['subject','el ruido.']], 'Gürültü bizi rahatsız eder.'],
  ['aburrir', 'sıkmak', [['indirect','Os'], ['verb','aburren'], ['subject','las películas largas.']], 'Uzun filmler sizi sıkar.'],
  ['doler', 'ağrımak', [['indirect','Les'], ['verb','duelen'], ['subject','los pies.']], 'Ayakları ağrıyor.'],
  ['fascinar', 'büyülemek / çok etkilemek', [['indirect','Me'], ['verb','fascina'], ['subject','la ciencia.']], 'Bilim beni büyüler.'],
  ['preocupar', 'endişelendirmek', [['indirect','Te'], ['verb','preocupa'], ['subject','el futuro.']], 'Gelecek seni endişelendirir.'],
  ['importar', 'önemli olmak', [['indirect','Le'], ['verb','importa'], ['subject','tu opinión.']], 'Senin fikrin onun için önemli.'],
  ['faltar', 'eksik olmak', [['indirect','Nos'], ['verb','faltan'], ['subject','dos libros.']], 'İki kitabımız eksik.'],
  ['quedar', 'yakışmak / bedeni uymak', [['indirect','Os'], ['verb','queda'], ['other','bien'], ['subject','la chaqueta.']], 'Ceket size yakışıyor.'],
];

const contrasts = [
  [[['indirect','Me'], ['verb','gusta'], ['subject','el libro.']], 'Tekil özne'],
  [[['indirect','Me'], ['verb','gustan'], ['subject','los libros.']], 'Çoğul özne'],
  [[['indirect','Me'], ['verb','gusta'], ['subject','leer.']], 'Mastar'],
];

const models = [
  ['Annem bana yemek hazırlıyor.', 'Mi madre', 'me', 'está', 'preparando', 'preparándome', 'la comida'],
  ['Dedem bize gazete okuyor.', 'Mi abuelo', 'nos', 'está', 'leyendo', 'leyéndonos', 'el periódico'],
  ['Sana bir sandviç yapıyorum.', 'Yo', 'te', 'estoy', 'haciendo', 'haciéndote', 'un bocadillo'],
  ['Marta ona bir fotoğraf gösteriyor.', 'Marta', 'le', 'está', 'mostrando', 'mostrándole', 'una foto'],
  ['Size bir oyun öğretiyoruz.', 'Nosotros', 'os', 'estamos', 'enseñando', 'enseñándoos', 'un juego'],
  ['Görevliler onlara bilet veriyor.', 'Los empleados', 'les', 'están', 'dando', 'dándoles', 'los billetes'],
];

// Each pair shares its recipient, object and subject. Both gerund forms are shown in the answer.
const translationPairs = [
  ['Her sabah bana bir mektup yazar.', 'Şu an bana bir mektup yazıyor.', 'Cada mañana', '', 'me', 'escribe', 'está', 'escribiendo', 'escribiéndome', 'una carta'],
  ['Her pazartesi sana bir mesaj gönderirim.', 'Şu an sana bir mesaj gönderiyorum.', 'Cada lunes', '', 'te', 'envío', 'estoy', 'enviando', 'enviándote', 'un mensaje'],
  ['Elena her pazar ona bir hikâye anlatır.', 'Elena şu an ona bir hikâye anlatıyor.', 'Cada domingo', 'Elena', 'le', 'cuenta', 'está', 'contando', 'contándole', 'un cuento'],
  ['Komşumuz her cumartesi bize bir tatlı yapar.', 'Komşumuz şu an bize bir tatlı yapıyor.', 'Cada sábado', 'Nuestra vecina', 'nos', 'hace', 'está', 'haciendo', 'haciéndonos', 'un postre'],
  ['Cuma günleri size bir film öneririm.', 'Şu an size bir film öneriyorum.', 'Los viernes', '', 'os', 'recomiendo', 'estoy', 'recomendando', 'recomendándoos', 'una película'],
  ['Babam her hafta onlara sebze getirir.', 'Babam şu an onlara sebze getiriyor.', 'Cada semana', 'Mi padre', 'les', 'trae', 'está', 'trayendo', 'trayéndoles', 'verduras'],
  ['Her ay bana bir kitap alırsın.', 'Şu an bana bir kitap alıyorsun.', 'Cada mes', '', 'me', 'compras', 'estás', 'comprando', 'comprándome', 'un libro'],
  ['Lucía her öğleden sonra sana bir kahve hazırlar.', 'Lucía şu an sana bir kahve hazırlıyor.', 'Cada tarde', 'Lucía', 'te', 'prepara', 'está', 'preparando', 'preparándote', 'un café'],
  ['Her salı ona ödevi açıklarız.', 'Şu an ona ödevi açıklıyoruz.', 'Cada martes', '', 'le', 'explicamos', 'estamos', 'explicando', 'explicándole', 'los deberes'],
  ['Her akşam bize tarifinizi gönderirsiniz.', 'Şu an bize tarifinizi gönderiyorsunuz.', 'Cada noche', '', 'nos', 'enviáis', 'estáis', 'enviando', 'enviándonos', 'vuestra receta'],
  ['Öğretmen her gün size bir soru sorar.', 'Öğretmen şu an size bir soru soruyor.', 'Todos los días', 'La profesora', 'os', 'hace', 'está', 'haciendo', 'haciéndoos', 'una pregunta'],
  ['Çarşamba günleri onlara bir şarkı söylerim.', 'Şu an onlara bir şarkı söylüyorum.', 'Los miércoles', '', 'les', 'canto', 'estoy', 'cantando', 'cantándoles', 'una canción'],
  ['Antrenör her antrenmandan önce bana su verir.', 'Antrenör şu an bana su veriyor.', 'Antes de cada entrenamiento', 'El entrenador', 'me', 'da', 'está', 'dando', 'dándome', 'agua'],
  ['Arkadaşların her sene sana bir kartpostal yollar.', 'Arkadaşların şu an sana bir kartpostal yolluyor.', 'Cada año', 'Tus amigos', 'te', 'mandan', 'están', 'mandando', 'mandándote', 'una postal'],
  ['Her yaz ona bir bisiklet ödünç verirsin.', 'Şu an ona bir bisiklet ödünç veriyorsun.', 'Cada verano', '', 'le', 'prestas', 'estás', 'prestando', 'prestándole', 'una bicicleta'],
  ['Her perşembe bize bir plan önerirsiniz.', 'Şu an bize bir plan öneriyorsunuz.', 'Cada jueves', '', 'nos', 'proponéis', 'estáis', 'proponiendo', 'proponiéndonos', 'un plan'],
  ['Pazar günleri size haberleri okuruz.', 'Şu an size haberleri okuyoruz.', 'Los domingos', '', 'os', 'leemos', 'estamos', 'leyendo', 'leyéndoos', 'las noticias'],
  ['İş arkadaşlarım her hafta onlara malzemeleri teslim eder.', 'İş arkadaşlarım şu an onlara malzemeleri teslim ediyor.', 'Cada semana', 'Mis compañeros', 'les', 'entregan', 'están', 'entregando', 'entregándoles', 'los materiales'],
  ['Genelde bana masada yer ayırırsın.', 'Şu an bana masada yer ayırıyorsun.', 'Normalmente', '', 'me', 'guardas', 'estás', 'guardando', 'guardándome', 'un sitio en la mesa'],
  ['Tatillerde sana yolu gösteririz.', 'Şu an sana yolu gösteriyoruz.', 'Durante las vacaciones', '', 'te', 'mostramos', 'estamos', 'mostrando', 'mostrándote', 'el camino'],
];

const vocabulary = {
  a: ['-e / -a', 'to'], mí: ['bana', 'me'], ti: ['sana', 'you'], él: ['o (erkek)', 'he / him'], ella: ['o (kadın)', 'she / her'],
  usted: ['siz (tekil, kibar)', 'you (singular, formal)'], nosotros: ['biz', 'we / us'], nosotras: ['biz (kadınlar)', 'we / us (female)'],
  vosotros: ['siz (çoğul, samimi)', 'you (plural, familiar)'], vosotras: ['siz (kadınlar)', 'you (plural, female)'],
  ellos: ['onlar', 'they / them'], ellas: ['onlar (kadınlar)', 'they / them (female)'], ustedes: ['siz (çoğul)', 'you (plural)'],
  yo: ['ben', 'I'], me: ['bana', 'to me'], te: ['sana', 'to you'], le: ['ona / size', 'to him / her / you'], nos: ['bize', 'to us'],
  os: ['size (çoğul)', 'to you (plural)'], les: ['onlara / sizlere', 'to them / you all'],
  el: ['belirli artikel (eril, tekil)', 'the'], la: ['belirli artikel (dişil, tekil)', 'the'],
  los: ['belirli artikel (eril, çoğul)', 'the'], las: ['belirli artikel (dişil, çoğul)', 'the'],
  un: ['bir (eril)', 'a / an'], una: ['bir (dişil)', 'a / an'], de: ['-in / -den', 'of / from'], en: ['-de / -da', 'in / on / at'],
  mi: ['benim', 'my'], mis: ['benim (çoğul isimle)', 'my'], tu: ['senin', 'your'], tus: ['senin (çoğul isimle)', 'your'],
  nuestra: ['bizim', 'our'], vuestra: ['sizin', 'your (plural)'], dos: ['iki', 'two'], bien: ['iyi', 'well'],
  familia: ['aile', 'family'], y: ['ve', 'and'], su: ['onun / kendi', 'his / her / their'], presente: ['geniş / şimdiki zaman', 'present tense'],
  gerundio: ['devam eden eylemi kuran fiil biçimi', 'gerund'], infinitivo: ['mastar', 'infinitive'], estar: ['olmak / bulunmak', 'to be'],
  pronombre: ['zamir', 'pronoun'], ahora: ['şu an', 'now'], cada: ['her', 'every'], todos: ['bütün', 'all'], antes: ['önce', 'before'],
  durante: ['boyunca / sırasında', 'during'], normalmente: ['genellikle', 'usually'],
  mañana: ['sabah', 'morning'], tarde: ['öğleden sonra', 'afternoon'], noche: ['akşam / gece', 'evening / night'],
  lunes: ['pazartesi', 'Monday'], martes: ['salı', 'Tuesday'], miércoles: ['çarşamba', 'Wednesday'], jueves: ['perşembe', 'Thursday'],
  viernes: ['cuma', 'Friday'], sábado: ['cumartesi', 'Saturday'], domingo: ['pazar', 'Sunday'], domingos: ['pazar günleri', 'Sundays'],
  semana: ['hafta', 'week'], mes: ['ay', 'month'], días: ['günler', 'days'], año: ['yıl', 'year'], verano: ['yaz', 'summer'],
  entrenamiento: ['antrenman', 'training session'], vacaciones: ['tatil', 'holidays / vacation'],
  juan: ['Juan (kişi adı)', 'Juan (name)'], elena: ['Elena (kişi adı)', 'Elena (name)'], lucía: ['Lucía (kişi adı)', 'Lucía (name)'],
  marta: ['Marta (kişi adı)', 'Marta (name)'], gatos: ['kediler', 'cats'], cine: ['sinema', 'cinema'],
  arte: ['sanat', 'art'], ruido: ['gürültü', 'noise'], películas: ['filmler', 'films'], largas: ['uzun', 'long'],
  pies: ['ayaklar', 'feet'], ciencia: ['bilim', 'science'], futuro: ['gelecek', 'future'], opinión: ['fikir', 'opinion'],
  chaqueta: ['ceket', 'jacket'], libros: ['kitaplar', 'books'], libro: ['kitap', 'book'], madre: ['anne', 'mother'],
  comida: ['yemek', 'food / meal'], abuelo: ['dede', 'grandfather'], periódico: ['gazete', 'newspaper'], bocadillo: ['sandviç', 'sandwich'],
  foto: ['fotoğraf', 'photo'], juego: ['oyun', 'game'], empleados: ['görevliler', 'employees'], billetes: ['biletler', 'tickets'],
  carta: ['mektup', 'letter'], mensaje: ['mesaj', 'message'], cuento: ['hikâye', 'story'], vecina: ['komşu (kadın)', 'neighbor'],
  postre: ['tatlı', 'dessert'], película: ['film', 'film'], padre: ['baba', 'father'], verduras: ['sebzeler', 'vegetables'],
  café: ['kahve', 'coffee'], deberes: ['ödev', 'homework'], receta: ['tarif', 'recipe'], profesora: ['öğretmen (kadın)', 'teacher'],
  pregunta: ['soru', 'question'], canción: ['şarkı', 'song'], entrenador: ['antrenör', 'coach'], agua: ['su', 'water'],
  amigos: ['arkadaşlar', 'friends'], postal: ['kartpostal', 'postcard'], bicicleta: ['bisiklet', 'bicycle'], plan: ['plan', 'plan'],
  noticias: ['haberler', 'news'], compañeros: ['iş arkadaşları', 'coworkers'], materiales: ['malzemeler', 'materials'],
  sitio: ['yer', 'spot / seat'], mesa: ['masa', 'table'], camino: ['yol', 'way / route'],
};

const verbs = [
  ['gustar gusta gustan', 'hoşuna gitmek / sevmek', 'to like / to be pleasing'],
  ['encantar encantan', 'bayılmak', 'to love'],
  ['interesar interesa', 'ilgisini çekmek', 'to interest'],
  ['molestar molesta', 'rahatsız etmek', 'to bother'],
  ['aburrir aburren', 'sıkmak', 'to bore'],
  ['doler duelen', 'ağrımak', 'to hurt'],
  ['fascinar fascina', 'büyülemek / çok etkilemek', 'to fascinate'],
  ['preocupar preocupa', 'endişelendirmek', 'to worry'],
  ['importar importa', 'önemli olmak', 'to matter'],
  ['faltar faltan', 'eksik olmak', 'to be missing'],
  ['quedar queda', 'yakışmak / uymak', 'to fit / look good on'],
  ['preparar prepara preparando preparándote preparándome', 'hazırlamak', 'to prepare'],
  ['leer leemos leyendo leyéndonos leyéndoos', 'okumak', 'to read'],
  ['hacer hace haciendo haciéndote haciéndonos haciéndoos', 'yapmak', 'to make / do'],
  ['mostrar mostramos mostrando mostrándole mostrándote', 'göstermek', 'to show'],
  ['enseñar enseñando enseñándoos', 'öğretmek', 'to teach'],
  ['dar da dando dándoles dándome', 'vermek', 'to give'],
  ['escribir escribe escribiendo escribiéndome', 'yazmak', 'to write'],
  ['enviar envío enviáis enviando enviándote enviándonos', 'göndermek', 'to send'],
  ['contar cuenta contando contándole', 'anlatmak', 'to tell'],
  ['recomendar recomiendo recomendando recomendándoos', 'önermek', 'to recommend'],
  ['traer trae trayendo trayéndoles', 'getirmek', 'to bring'],
  ['comprar compras comprando comprándome', 'satın almak', 'to buy'],
  ['explicar explicamos explicando explicándole', 'açıklamak', 'to explain'],
  ['cantar canto cantando cantándoles', 'şarkı söylemek', 'to sing'],
  ['mandar mandan mandando mandándote', 'yollamak', 'to send'],
  ['prestar prestas prestando prestándole', 'ödünç vermek', 'to lend'],
  ['proponer proponéis proponiendo proponiéndonos', 'önermek', 'to suggest'],
  ['entregar entregan entregando entregándoles', 'teslim etmek', 'to deliver'],
  ['guardar guardas guardando guardándome', 'ayırmak / saklamak', 'to save / keep'],
];
for (const [forms, tr, en] of verbs) {
  const [lemma, ...conjugations] = forms.split(' ');
  for (const form of [lemma, ...conjugations]) vocabulary[form] = [tr, en, lemma];
}
for (const form of 'estoy estás está estamos estáis están'.split(' ')) {
  vocabulary[form] = ['devam eden eylemi kuran yardımcı fiil', 'auxiliary for an ongoing action', 'estar'];
}
const attachedPronouns = {
  preparándome: 'me', leyéndonos: 'nos', haciéndote: 'te', mostrándole: 'le', enseñándoos: 'os',
  dándoles: 'les', escribiéndome: 'me', enviándote: 'te', contándole: 'le', haciéndonos: 'nos',
  recomendándoos: 'os', trayéndoles: 'les', comprándome: 'me', preparándote: 'te', explicándole: 'le',
  enviándonos: 'nos', haciéndoos: 'os', cantándoles: 'les', dándome: 'me', mandándote: 'te',
  prestándole: 'le', proponiéndonos: 'nos', leyéndoos: 'os', entregándoles: 'les', guardándome: 'me', mostrándote: 'te',
};
