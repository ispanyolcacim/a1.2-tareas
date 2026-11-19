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
    note: 'Bu yapıları yakında öğreneceğiz. Şimdilik örneklere göz atabilirsin.',
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
    'C:En la entrada,|S:dos personas|V:están dejando|O:sus paraguas|C:al lado de la puerta.',
    'C:Cerca de la ventana,|S:Lucía, la bibliotecaria,|V:está colocando|O:unos libros|C:en la estantería.',
    'B:Mientras|S:Lucía|V:está trabajando,|S:un niño|V:está dibujando|O:un barco|C:en una hoja.',
  ],
  [
    'S:Tomás|V:está buscando|O:una novela|C:para su hermana.',
    'I:A su hermana|I:le|V:gustan|S:las historias del mar.',
    'S:Tomás|V:tiene que devolver|O:dos libros|C:hoy.',
    'C:Antes de ir al mostrador,|V:se está quitando|O:la chaqueta|B:porque|V:está|A:mojada.',
    'C:Ahora|V:está mirando|O:los títulos|C:en la estantería de las novelas.',
  ],
  [
    'C:En la mesa grande,|S:Sara|V:está tomando|O:apuntes|C:en su cuaderno.',
    'V:Lleva|C:diez minutos|V:buscando|O:la palabra «préstamo»|C:en el diccionario.',
    'C:A su lado,|S:Dani|V:está leyendo|O:una revista.',
    'C:En la revista|V:hay|O:un artículo sobre los faros.',
    'C:En una foto del artículo,|S:las olas|V:están llegando|C:hasta un faro blanco.',
    'B:Aunque|C:fuera|V:llueve|C:mucho,|S:todos|V:siguen trabajando|C:en silencio.',
  ],
  [
    'S:Lucía|V:acaba de abrir|O:una caja con libros nuevos.',
    'I:Les|V:está enseñando|O:las portadas|I:a Tomás y a Sara.',
    'S:Tomás|V:está mirando|O:una portada con un barco rojo.',
    'S:La novela|V:se llama|A:El viaje de Nora.',
    'S:Tomás|V:está leyendo|O:la primera página|B:y|I:le|V:gusta|S:la historia.',
    'V:«¿Puedo llevarme|O:esta novela|C:a casa?»,|V:pregunta|S:Tomás.',
    'D:«Sí,|B:pero|C:primero|V:tienes que apuntar|O:tu nombre|C:en la ficha de préstamo»,|V:responde|S:Lucía.',
  ],
  [
    'C:En el mostrador,|S:Tomás|V:está buscando|O:la ficha azul|C:en su mochila.',
    'V:Saca|O:una botella de agua, un bolígrafo y los dos libros,|B:pero|V:no encuentra|O:la ficha.',
    'C:Entonces|S:Sara|V:ve|O:algo azul|C:entre las páginas de uno de los libros.',
    'S:La ficha|V:está|C:dentro del libro de cuentos.',
    'S:Tomás|V:está escribiendo|O:su nombre|C:en la ficha|B:y|S:Lucía|V:está apuntando|O:la fecha de devolución.',
  ],
  [
    'C:A las seis|V:va a empezar|S:el club de lectura.',
    'S:Sara|V:está a punto de terminar|O:sus apuntes.',
    'S:Dani|V:deja de leer|O:la revista|B:y|V:se pone a preparar|O:la mesa.',
    'V:Está poniendo|O:seis sillas|C:alrededor de la mesa.',
    'S:Sara|V:está repartiendo|O:unas hojas|I:a los participantes.',
    'C:Poco a poco,|S:todos|V:van haciendo|O:sitio|C:para los demás|B:y|V:empiezan a hablar|C:en voz baja.',
  ],
  [
    'C:A las seis en punto,|S:Lucía|V:empieza a leer|O:un fragmento de la novela|C:en voz alta.',
    'C:En la historia,|S:Nora|V:está esperando|O:un barco|C:cerca de un faro.',
    'S:El barco|V:no llega|B:y|S:Nora|V:está mirando|O:el mar|C:con preocupación.',
    'S:«¿Qué|V:está pasando?»,|V:pregunta|S:Lucía|I:al grupo.',
    'S:Dani|V:está mirando|O:la ilustración|B:y|V:señala|O:una luz|C:en el agua.',
    'S:Sara|V:piensa|O:que esa luz es del barco,|B:pero|S:Tomás|V:cree|O:que es del faro.',
  ],
  [
    'C:Al final de la reunión,|C:ya|V:no está lloviendo.',
    'S:El niño de la entrada|V:está guardando|O:su dibujo|C:en la mochila.',
    'S:Tomás|V:vuelve a ponerse|O:la chaqueta|B:y|V:se lleva|O:la novela|C:a casa.',
    'C:En la puerta,|V:está enviando|O:un mensaje de voz|I:a su hermana.',
    'C:«Ya|V:tengo|O:un libro para ti.',
    'C:Esta noche|V:vamos a leer|O:el primer capítulo|C:juntos».',
  ],
];

export const questions = [
  ['O:¿Qué|V:está haciendo|S:Lucía|C:cerca de la ventana?', 'V:Está colocando|O:unos libros|C:en la estantería.'],
  ['C:¿Para quién|V:está buscando|S:Tomás|O:una novela?', 'V:Está buscando|O:una novela|C:para su hermana.'],
  ['O:¿Qué palabra|V:está buscando|S:Sara|C:en el diccionario?', 'V:Está buscando|O:la palabra «préstamo».'],
  ['C:¿De qué|V:trata|S:el artículo que está leyendo Dani?', 'S:El artículo|V:trata|C:de los faros.'],
  ['O:¿Qué|V:tiene que hacer|S:Tomás|C:antes de llevarse la novela?', 'V:Tiene que apuntar|O:su nombre|C:en la ficha de préstamo.'],
  ['C:¿Dónde|V:está|S:la ficha azul?', 'V:Está|C:dentro del libro de cuentos.'],
  ['O:¿Qué|V:está haciendo|S:Dani|C:para preparar la mesa?', 'V:Está poniendo|O:seis sillas|C:alrededor de la mesa.'],
  ['O:¿Qué|V:está esperando|S:Nora|C:cerca del faro?', 'V:Está esperando|O:un barco.'],
  ['O:¿Qué|V:está señalando|S:Dani|C:en la ilustración?', 'V:Está señalando|O:una luz|C:en el agua.'],
  ['O:¿Qué|V:van a hacer|S:Tomás y su hermana|C:esta noche?', 'V:Van a leer|O:el primer capítulo|C:juntos.'],
];
