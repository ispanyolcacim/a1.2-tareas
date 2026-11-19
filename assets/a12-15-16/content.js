// Examples are split into grammatical chunks. A pipe marks the end of a chunk.
export const groups = [
  {
    title: 'Şu an süren eylem',
    form: 'Gerundio',
    rows: [
      ['estar + gerundio', 'Eylem şu anda ya da söz edilen sırada sürüyor.', 'S:Lucía|V:está colocando|O:los libros.', 'Lucía kitapları yerleştiriyor.'],
      ['seguir / continuar + gerundio', 'Başlamış eylem devam ediyor.', 'S:Dani|V:sigue leyendo|O:la revista.', 'Dani dergiyi okumaya devam ediyor.'],
      ['llevar + tiempo + gerundio', 'Eylemin ne zamandır sürdüğünü söyler.', 'V:Llevo|C:diez minutos|V:esperando.', 'On dakikadır bekliyorum.'],
      ['ir + gerundio', 'Eylem yavaş yavaş ya da adım adım ilerliyor.', 'C:Poco a poco,|V:vamos aprendiendo|O:palabras nuevas.', 'Yavaş yavaş yeni kelimeler öğreniyoruz.'],
      ['andar + gerundio', 'Bir süredir tekrarlanan veya süren uğraşı anlatabilir.', 'S:Tomás|V:anda buscando|O:sus llaves.', 'Tomás bir süredir anahtarlarını arıyor.'],
      ['venir + gerundio', 'Geçmişte başlayıp şu ana uzanan bir süreci anlatır.', 'V:Venimos usando|O:esta sala|C:desde enero.', 'Ocaktan beri bu salonu kullanıyoruz.'],
    ],
  },
  {
    title: 'Plan, başlangıç ve tekrar',
    form: 'Infinitivo',
    rows: [
      ['ir a + infinitivo', 'İleriye dönük plan ya da beklenti.', 'C:Mañana|V:voy a devolver|O:el libro.', 'Yarın kitabı iade edeceğim.'],
      ['estar a punto de + infinitivo', 'Eylem gerçekleşmek üzere.', 'S:El club|V:está a punto de empezar.', 'Kulüp başlamak üzere.'],
      ['empezar / comenzar a + infinitivo', 'Eylemin başlangıcı.', 'S:Sara|V:empieza a escribir.', 'Sara yazmaya başlıyor.'],
      ['ponerse a + infinitivo', 'Bir işe koyulma.', 'S:Dani|V:se pone a ordenar|O:la mesa.', 'Dani masayı düzenlemeye koyuluyor.'],
      ['echarse a + infinitivo', 'Bazı eylemlerin aniden başlaması.', 'S:El niño|V:se echa a reír.', 'Çocuk birden gülmeye başlıyor.'],
      ['volver a + infinitivo', 'Aynı eylemi yeniden yapma.', 'S:Tomás|V:vuelve a leer|O:la página.', 'Tomás sayfayı tekrar okuyor.'],
      ['soler + infinitivo', 'Rutin veya alışkanlık.', 'V:Suelo venir|C:los jueves.', 'Genelde perşembeleri gelirim.'],
    ],
  },
  {
    title: 'Bitirme ve bırakma',
    form: 'Infinitivo',
    rows: [
      ['acabar de + infinitivo', 'Eylem az önce gerçekleşti.', 'S:Lucía|V:acaba de abrir|O:una caja.', 'Lucía az önce bir kutu açtı.'],
      ['terminar de + infinitivo', 'Eylemi tamamlamak.', 'S:Sara|V:termina de escribir|O:la ficha.', 'Sara formu yazmayı bitiriyor.'],
      ['dejar de + infinitivo', 'Eylemi bırakmak ya da durdurmak.', 'S:Dani|V:deja de leer.', 'Dani okumayı bırakıyor.'],
    ],
  },
  {
    title: 'Gereklilik, izin ve ihtimal',
    form: 'Infinitivo',
    rows: [
      ['tener que + infinitivo', 'Belirli bir kişinin yapması gerekiyor.', 'V:Tienes que devolver|O:el libro.', 'Kitabı iade etmen gerekiyor.'],
      ['hay que + infinitivo', 'Herkes için geçerli genel gereklilik.', 'V:Hay que hablar|C:en voz baja.', 'Alçak sesle konuşmak gerekiyor.'],
      ['deber + infinitivo', 'Görev, kural veya tavsiye.', 'V:Debemos cuidar|O:los libros.', 'Kitaplara iyi bakmalıyız.'],
      ['poder + infinitivo', 'Yapabilme, izin veya ihtimal.', 'V:¿Puedo llevarme|O:esta novela?', 'Bu romanı alıp götürebilir miyim?'],
      ['deber de + infinitivo', 'Tahmin veya çıkarım. Bu örnekte yaklaşık saat tahmini var.', 'C:Ya|V:deben de ser|A:las seis.', 'Saat altı olmalı.'],
    ],
  },
  {
    title: 'Sonuç ve birikim',
    form: 'Participio',
    rows: [
      ['llevar + participio', 'Şu ana kadar yapılan miktar. Ortaç nesneye uyar.', 'V:Llevo|P:leídas|O:diez páginas.', 'Şu ana kadar on sayfa okudum.'],
      ['tener + participio', 'Bir işin hazır veya tamamlanmış sonucu. Ortaç nesneye uyar.', 'V:Tengo|P:preparadas|O:las fichas.', 'Formları hazırladım, şu anda hazırlar.'],
    ],
  },
];

export const notes = {
  formation: 'hablar → hablando · comer → comiendo · vivir → viviendo',
  irregular: 'leer → leyendo · pedir → pidiendo · dormir → durmiendo · ir → yendo',
  conjugation: 'estoy · estás · está · estamos · estáis · están',
  placement: [
    'S:Tomás|V:se está quitando|O:la chaqueta.',
    'S:Tomás|V:está quitándose|O:la chaqueta.',
  ],
};

export const story = [
  [
    'C:Hoy|V:está lloviendo|C:en el barrio.',
    'V:Son|A:las cinco|B:y|S:la biblioteca|V:está|A:llena.',
    'C:Cerca de la ventana,|S:Lucía, la bibliotecaria,|V:está colocando|O:unos libros|C:en la estantería.',
    'S:Tomás|V:está buscando|O:una novela|C:para su hermana.',
    'V:Tiene que devolver|O:dos libros|C:hoy.',
  ],
  [
    'C:En la mesa grande,|S:Sara|V:está tomando|O:apuntes|C:en su cuaderno.',
    'V:Lleva|C:diez minutos|V:buscando|O:una palabra|C:en el diccionario.',
    'C:A su lado,|S:Dani|V:está leyendo|O:una revista.',
    'B:Aunque|C:fuera|V:llueve|C:mucho,|S:todos|V:siguen trabajando|C:en silencio.',
  ],
  [
    'S:Lucía|V:acaba de abrir|O:una caja con libros nuevos.',
    'I:Les|V:está enseñando|O:las portadas|I:a Tomás y a Sara.',
    'S:Tomás|V:se está quitando|O:la chaqueta.',
    'V:«¿Puedo llevarme|O:esta novela|C:a casa?»,|V:pregunta|S:Tomás.',
    'D:«Sí,|B:pero|C:primero|V:tienes que apuntar|O:tu nombre|C:en la ficha»,|V:responde|S:Lucía.',
  ],
  [
    'C:A las seis|V:va a empezar|S:el club de lectura.',
    'S:Sara|V:está a punto de terminar|O:sus apuntes.',
    'S:Dani|V:deja de leer|O:la revista|B:y|V:se pone a preparar|O:la mesa.',
    'C:Poco a poco,|S:todos|V:van haciendo|O:sitio|C:para los demás.',
  ],
];

export const questions = [
  ['O:¿Qué|V:está haciendo|S:Lucía|C:cerca de la ventana?', 'V:Está colocando|O:unos libros|C:en la estantería.'],
  ['C:¿Cuánto tiempo|V:lleva buscando|S:Sara|O:una palabra?', 'V:Lleva|C:diez minutos|V:buscando|O:una palabra.'],
  ['O:¿Qué|V:tiene que hacer|S:Tomás|C:primero?', 'V:Tiene que apuntar|O:su nombre|C:en la ficha.'],
  ['C:¿A qué hora|V:va a empezar|S:el club de lectura?', 'V:Va a empezar|C:a las seis.'],
];
