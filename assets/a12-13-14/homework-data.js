'use strict';

const sections = [
  { title: 'Boşluk doldurma', start: 1, end: 20 },
  { title: 'Anuncios · Başlık eşleştirme', start: 21, end: 30 },
  { title: 'Cloze test · Paragraf tamamlama', start: 31, end: 40 },
  { title: 'Görsel · Verdadero o falso', start: 41, end: 50 },
];

// Each row has the Spanish gap, a Turkish cue, accepted answers and feedback.
const written = [
  ['A mí ___ gustan las montañas.', 'Eksik zamir · bana', ['me'], 'A mí ile me birlikte kullanılır. Las montañas çoğul olduğu için gustan gelir.'],
  ['A Paula ___ la astronomía.', 'interesar · Paula’nın ilgisini çekiyor', ['le interesa'], 'Paula için le, tekil la astronomía için interesa kullanılır.'],
  ['A vosotros ___ ver películas al aire libre.', 'encantar · siz bayılıyorsunuz', ['os encanta'], 'Vosotros → os. Özne bir mastar öbeği olduğu için encanta tekildir.'],
  ['A mis vecinos ___ las luces fuertes.', 'molestar · komşularımı rahatsız ediyor', ['les molestan'], 'Mis vecinos → les. Las luces çoğul olduğu için molestan kullanılır.'],
  ['Cada jueves, Leo ___ el menú del día.', 'enviar · bana gönderir', ['me envía'], 'Alışkanlık anlatılıyor. Me, çekimli envía fiilinden önce gelir.'],
  ['Antes de cada partido, yo ___ agua y una toalla.', 'traer · sana getiririm', ['te traigo'], 'Traer, yo ile traigo olur. Te fiilden önce gelir.'],
  ['Los lunes, Julia ___ inglés a Mateo.', 'enseñar · ona öğretir', ['le enseña'], 'Mateo için le kullanılır. Julia üçüncü tekil kişi olduğu için enseña gelir.'],
  ['Normalmente, nuestros vecinos ___ una silla extra.', 'dejar · bize bırakırlar', ['nos dejan'], 'Nuestros vecinos çoğuldur. Nos, dejan fiilinden önce gelir.'],
  ['Cada mañana, la monitora ___ una lista de ejercicios (a vosotros).', 'entregar · size verir', ['os entrega'], 'Vosotros için os kullanılır. La monitora → entrega.'],
  ['Todos los meses, nosotros ___ ropa a los niños del centro.', 'donar · onlara bağışlarız', ['les donamos'], 'Los niños için les kullanılır. Nosotros → donamos.'],
  ['Los domingos, tú ___ la merienda para el viaje.', 'hacer · bize hazırlar/yaparsın', ['nos haces'], 'Presente çekimi tú haces. Nos çekimli fiilden önce gelir.'],
  ['En cada visita, vosotros ___ una revista (a mí).', 'traer · bana getirirsiniz', ['me traéis'], 'Vosotros için traer → traéis. Me alıcıyı gösterir.'],
  ['Ahora mismo, el panadero ___ una hogaza (a mí).', 'cortar · şu an bana bir somun dilimliyor', ['me está cortando', 'está cortándome'], 'Me está cortando ve está cortándome aynı anlamı verir.'],
  ['Ahora, yo ___ una bufanda azul.', 'tejer · sana bir atkı örüyorum', ['te estoy tejiendo', 'estoy tejiéndote'], 'Te estoy tejiendo ve estoy tejiéndote geçerlidir.'],
  ['En este momento, Clara ___ un asiento a su tío.', 'buscar · amcasına bir yer arıyor', ['le está buscando', 'está buscándole'], 'Su tío için le kullanılır. Zamir está’dan önce veya buscándole biçiminde sonda olabilir.'],
  ['Ahora mismo, los voluntarios ___ las cajas de comida.', 'repartir · bize yiyecek kutularını dağıtıyorlar', ['nos están repartiendo', 'están repartiéndonos'], 'Los voluntarios için están kullanılır. Sona eklenince repartiéndonos yazılır.'],
  ['En este momento, la farmacéutica ___ las instrucciones (a vosotros).', 'imprimir · size talimatları basıyor', ['os está imprimiendo', 'está imprimiéndoos'], 'Os está imprimiendo ve está imprimiéndoos geçerlidir. Sonda iki o korunur.'],
  ['Ahora mismo, nosotros ___ las cuentas a los clientes.', 'revisar · onlar için hesapları kontrol ediyoruz', ['les estamos revisando', 'estamos revisándoles'], 'Los clientes için les, nosotros için estamos kullanılır.'],
  ['Ahora, tú ___ la bolsa de la compra (a mí).', 'llevar · benim için alışveriş poşetini taşıyorsun', ['me estás llevando', 'estás llevándome'], 'Tú için estás. Me başta ayrı ya da gerundioya bitişik olabilir.'],
  ['En este momento, las chicas ___ unas bebidas (a vosotros).', 'elegir · sizin için içecek seçiyorlar', ['os están eligiendo', 'están eligiéndoos'], 'Elegir → eligiendo. Sonda eligiéndoos biçimi kullanılır.'],
];

const headings = [
  'Un regalo para lectores', 'Aprende a nadar', 'Concierto al aire libre',
  'Se busca un perro', 'Bicicletas por horas', 'Cocina para niños',
  'Ropa de invierno', 'Visita guiada por el casco antiguo', 'Clases para hablar español',
  'Cambio de horario de la biblioteca', 'Venta de instrumentos usados', 'Un piso cerca de la estación',
];
const ads = [
  ['Este sábado, en la plaza, tres grupos del barrio tocan música en directo. La entrada es gratis. Si llueve, el evento será en el teatro.', 2, 'En la plaza ve música en directo ifadeleri açık havadaki konseri gösterir.'],
  ['El lunes y el martes abrimos de 10:00 a 14:00. Las salas de estudio cierran por la tarde. Puedes devolver tus libros en la caja de la puerta.', 9, 'Açılış ve kapanış saatleri kütüphanenin programındaki değişikliği anlatır.'],
  ['¿Quieres recorrer el río sobre dos ruedas? Tenemos modelos para adultos y niños. Puedes usar uno durante una o dos horas y devolverlo aquí.', 4, 'Dos ruedas ve devolverlo aquí ifadeleri saatlik bisiklet kiralamayı tarif eder.'],
  ['Lucas es pequeño, lleva un collar rojo y casi nunca ladra. No está en casa desde el domingo. Si lo ves, llama a Elena al número de este cartel.', 3, 'Collar ve si lo ves kayıp köpeği bulmak için yazılmış bir ilana işaret eder.'],
  ['¿Tienes frío? Esta semana hay abrigos, bufandas y guantes desde 10 euros. Prueba tu talla en nuestra tienda de la calle Luna.', 6, 'Abrigos, bufandas ve guantes kışlık giysilerdir.'],
  ['Cada martes, un grupo pequeño practica conversaciones básicas con una profesora. Aprendemos a pedir en un bar y a presentarnos en español.', 8, 'Practica conversaciones ve presentarnos en español konuşma dersini gösterir.'],
  ['Te esperamos delante del ayuntamiento. Una guía te cuenta la historia de las calles y te enseña las casas más antiguas. El paseo dura una hora.', 7, 'Una guía ve las casas más antiguas tarihi merkezdeki rehberli geziyi anlatır.'],
  ['En la piscina municipal damos cursos para personas que nunca han entrado en el agua. Trae un bañador y una toalla. Hay clases para adultos.', 1, 'Piscina, bañador ve nunca han entrado en el agua başlangıç yüzme kursuna işaret eder.'],
  ['Los pequeños chefs de 6 a 10 años hacen sus propias pizzas en nuestro taller. Hay delantales y todos los ingredientes. Los padres esperan fuera.', 5, 'De 6 a 10 años ve hacen sus propias pizzas çocuklara yönelik mutfak atölyesini anlatır.'],
  ['Compras una novela y la envolvemos gratis. También puedes elegir una tarjeta para que otra persona compre el libro que quiera.', 0, 'Novela, envolvemos gratis ve elegir una tarjeta kitap sevenler için hediye seçenekleridir.'],
];

// Each blank stores its correct form first. The app places it in the given A–D slot.
const cloze = [
  ['En la floristería', 'A Diego [1] las plantas. Todos los viernes, su vecina [2] flores frescas. Ahora Diego [3] un ramo para ella. También está [4] una tarjeta.',
    [['le gustan','le gusta','les gustan','te gustan'], ['le trae','le traes','me traen','le traigo'], ['está haciendo','están haciendo','estoy haciendo','está hace'], ['escribiendo','escribe','escribir','escribando']], [2,0,3,1],
    'Las plantas → le gustan. Su vecina → le trae. Diego → está haciendo. Después de está, escribir → escribiendo.'],
  ['En la biblioteca', 'Todas las tardes, nosotros [1] en la biblioteca. A mí [2] las novelas cortas. Ahora, mi compañera me está [3] un libro y yo estoy [4] una revista.',
    [['estudiamos','estudiáis','estudian','estudio'], ['me interesan','me interesa','te interesan','le interesan'], ['recomendando','recomienda','recomendar','recomendiendo'], ['leyendo','leiendo','leo','leer']], [1,3,2,0],
    'Nosotros → estudiamos. Las novelas → me interesan. Los gerundios son recomendando y leyendo.'],
  ['Antes de salir', 'A Luz y a Eva [1] viajar en tren. Cada mes, su padre [2] los billetes a sus hijas. En este momento, Luz está [3] la maleta y Eva [4] agua en una botella.',
    [['les encanta','les encantan','le encanta','os encanta'], ['les compra','les compran','nos compra','les compráis'], ['preparando','prepara','preparar','prepariendo'], ['está poniendo','están poniendo','estoy poniendo','está pone']], [3,1,0,2],
    'Luz y Eva → les. Viajar pide encanta. Su padre → compra. Luz está preparando y Eva está poniendo.'],
  ['En la oficina', 'Yo [1] al trabajo a las ocho todos los días. A mis compañeras [2] el ruido. Ahora, una compañera [3] unos papeles (a mí) y todos estamos [4] en silencio.',
    [['llego','llegas','llegamos','llegan'], ['les molesta','les molestan','nos molesta','le molesta'], ['me está pasando','está me pasando','me están pasando','está pasándole'], ['trabajando','trabajamos','trabajar','trabajiendo']], [0,2,1,3],
    'Yo llego. El ruido → les molesta. Me va antes de está. Después de estamos, se usa trabajando.'],
  ['Un día de lluvia', 'A ti [1] el cine. Normalmente, yo [2] una película para ver juntos. Ahora mismo tú [3] las entradas y yo estoy [4] el paraguas.',
    [['te gusta','te gustan','me gusta','le gusta'], ['elijo','elegimos','eligen','eliges'], ['estás comprando','están comprando','está comprando','estás compras'], ['buscando','busco','buscar','busquiendo']], [2,3,0,1],
    'A ti → te gusta. Yo → elijo. Tú estás comprando. Buscar → buscando.'],
  ['La clase de música', 'A vosotros [1] las canciones antiguas. La profesora [2] una canción nueva cada lunes (a vosotros). Ahora está [3] la guitarra y vosotros [4] la letra de una canción.',
    [['os gustan','os gusta','les gustan','nos gustan'], ['os enseña','os enseñan','les enseña','os enseñáis'], ['tocando','toca','tocar','tocuiendo'], ['estáis leyendo','están leyendo','estás leyendo','estáis leiendo']], [1,0,3,2],
    'A vosotros → os. Las canciones → gustan. La profesora → enseña y está tocando. Vosotros estáis leyendo.'],
  ['En el mercado', 'Cada sábado, las hermanas [1] fruta en el mercado. A Vera [2] las peras. Ahora, el vendedor está [3] el precio y su compañera [4] las manzanas.',
    [['compran','compramos','compras','compráis'], ['le encantan','le encanta','les encantan','me encantan'], ['diciendo','decindo','decir','dice'], ['está pesando','están pesando','estás pesando','está pesa']], [3,2,1,0],
    'Las hermanas compran. Vera → le y las peras → encantan. Decir → diciendo. Su compañera está pesando.'],
  ['Un equipo de barrio', 'A nosotros [1] el deporte. Antes de cada partido, el entrenador [2] una camiseta a cada uno de nosotros. En este momento estamos [3] en el parque y el entrenador [4] agua (a nosotros).',
    [['nos interesa','nos interesan','os interesa','les interesa'], ['nos da','nos dan','les da','nos doy'], ['corriendo','corremos','correr','corrando'], ['está dándonos','está nos dando','están dándonos','está dándoles']], [0,1,2,3],
    'El deporte → nos interesa. El entrenador nos da. Correr → corriendo. Dándonos tek kelime olarak yazılır.'],
  ['En el taller de pintura', 'A Nuria [1] pintar. Cada martes, ella [2] los colores antes de la clase. Hoy sus amigos están [3] un paisaje y Nuria [4] pinceles a sus amigos.',
    [['le gusta','le gustan','les gusta','te gusta'], ['mezcla','mezclan','mezclo','mezclas'], ['dibujando','dibujan','dibujar','dibujendo'], ['les está llevando','le está llevando','les están llevando','está les llevando']], [2,1,3,0],
    'Pintar mastar olduğu için le gusta. Ella mezcla. Dibujar → dibujando. Sus amigos için les kullanılır.'],
  ['Los domingos en familia', 'Normalmente, vosotros [1] a vuestros primos los domingos. A los niños [2] jugar juntos. Ahora estáis [3] por teléfono y ellos [4] un plan para esta tarde (a vosotros).',
    [['llamáis','llamamos','llaman','llamas'], ['les gusta','les gustan','le gusta','nos gusta'], ['hablando','habláis','hablar','habliendo'], ['están proponiéndoos','están os proponiendo','estáis proponiéndoos','están proponiéndonos']], [3,0,2,1],
    'Vosotros llamáis. Jugar → les gusta. Hablar → hablando. Os sona eklenince proponiéndoos yazılır.'],
];

const picture = [
  ['El hombre del banco está leyendo un periódico.', true, 'Bankta oturan adam açık bir gazete okuyor.'],
  ['La mujer está hablando por teléfono.', true, 'Kadın telefonu kulağına tutuyor.'],
  ['El chico de amarillo está corriendo por el parque.', false, 'Sarı üstlü çocuk bisiklet sürüyor.'],
  ['La niña de morado está dibujando en un cuaderno.', true, 'Mor üstlü kız masadaki deftere çizim yapıyor.'],
  ['El perro está debajo del banco.', false, 'Köpek bankın altında değil, piknik masasının altında.'],
  ['La bicicleta es roja.', false, 'Bisiklet yeşil.'],
  ['Hay dos manzanas encima de la mesa.', true, 'Piknik masasında iki elma var.'],
  ['La mujer que habla por teléfono está sentada en el banco.', false, 'Telefonla konuşan kadın ayakta.'],
  ['El chico lleva una camiseta amarilla.', true, 'Bisikletteki çocuk sarı tişört giyiyor.'],
  ['El perro está saltando sobre la mesa.', false, 'Köpek masanın altında uzanıyor.'],
];

function clozeOptions(options, answerIndex) {
  const [correct, ...distractors] = options;
  distractors.splice(answerIndex, 0, correct);
  return distractors;
}

const questions = [
  ...written.map(([prompt, cue, answers, feedback]) => ({ type: 'written', prompt, cue, answers, feedback })),
  ...ads.map(([prompt, answer, feedback]) => ({ type: 'ad', prompt, answer, feedback })),
  ...cloze.map(([title, prompt, options, answers, feedback]) => ({
    type: 'cloze', title, prompt, options: options.map((row, index) => clozeOptions(row, answers[index])), answers, feedback,
  })),
  ...picture.map(([prompt, answer, feedback]) => ({ type: 'picture', prompt, answer: answer ? 0 : 1, feedback })),
];
