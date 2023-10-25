const data = [
  {
    id: 4,
    title: "101 Dalmatas",
    author: "Dodie Smith",
    description:
      "101 Dálmatas es una novela infantil de Dodie Smith sobre la lucha de dos dálmatas por salvar a sus cachorros de Cruella de Vil, una diseñadora obsesionada con hacer abrigos de piel de dálmata. Una his",
    isbn: "1864297315896",
    publication_year: "1990-01-15T02:00:00.000+00:00",
    qualification: 5,
    gender: "INFANTIL",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/101+Dalmatas+Disney+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/101+Dalmatas+Disney+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/101+Dalmatas+Disney+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/101+Dalmatas+Disney+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/101+Dalmatas+Disney+5.jpg",
    ],
    price: 12.99,
  },
  {
    id: 5,
    title: "365 actividades",
    author: "Zazu Navarro",
    description:
      "365 actividades: Un libro lleno de desafíos, diversión y creatividad para disfrutar un año completo de experiencias emocionantes.",
    isbn: "9685973158962",
    publication_year: "1980-01-10T03:00:00.000+00:00",
    qualification: 2,
    gender: "INFANTIL",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/365+actividades+Zazu+Navarro+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/365+actividades+Zazu+Navarro+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/365+actividades+Zazu+Navarro+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/365+actividades+Zazu+Navarro+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/365+actividades+Zazu+Navarro+5.jpg",
    ],
    price: 10.99,
  },
  {
    id: 6,
    title: "Aladdin",
    author: "Ferrándiz Juan",
    description:
      "Aladdin: Un cuento mágico de aventura y amor en la mística Agrabah.",
    isbn: "7398412650932",
    publication_year: "1989-05-11T03:00:00.000+00:00",
    qualification: 4,
    gender: "INFANTIL",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Aladdin+Disney+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Aladdin+Disney+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Aladdin+Disney+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Aladdin+Disney+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Aladdin+Disney+5.jpg",
    ],
    price: 13.99,
  },
  {
    id: 7,
    title: "Alicia en el pais de las maravillas",
    author: "Lewis Carroll",
    description:
      "Alicia en el País de las Maravillas: Un viaje surrealista y encantador en un mundo de fantasía.",
    isbn: "7398496310932",
    publication_year: "1993-05-20T03:00:00.000+00:00",
    qualification: 2,
    gender: "INFANTIL",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Alicia+en+el+pais+de+las+maravillas+Disney+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Alicia+en+el+pais+de+las+maravillas+Disney+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Alicia+en+el+pais+de+las+maravillas+Disney+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Alicia+en+el+pais+de+las+maravillas+Disney+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Alicia+en+el+pais+de+las+maravillas+Disney+5.jpg",
    ],
    price: 15.99,
  },
  {
    id: 8,
    title: "Blancanieves",
    author: "Jacob Grimm",
    description:
      "Blancanieves: Un cuento clásico de belleza, envidia y amistad, donde la magia y la valentía se entrelazan en un bosque encantado.",
    isbn: "1936588496332",
    publication_year: "1992-10-20T02:00:00.000+00:00",
    qualification: 5,
    gender: "INFANTIL",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Blancanieves+Disney+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Blancanieves+Disney+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Blancanieves+Disney+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Blancanieves+Disney+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Blancanieves+Disney+5.jpg",
    ],
    price: 15.99,
  },
  {
    id: 9,
    title: "Facultad de Informatica",
    author: "John Smith",
    description:
      "Blockchain: La Revolución Digital. Explora cómo la tecnología blockchain está transformando industrias y la sociedad en este libro informativo y accesible",
    isbn: "5759631496332",
    publication_year: "1982-12-20T03:00:00.000+00:00",
    qualification: 4,
    gender: "NO_FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%2313+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%2313+-+Facultad+de+Informatica+de+la+UCM+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%2313+-+Facultad+de+Informatica+de+la+UCM+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%2313+-+Facultad+de+Informatica+de+la+UCM+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%2313+-+Facultad+de+Informatica+de+la+UCM+5.jpg",
    ],
    price: 19.99,
  },
  {
    id: 10,
    title: "Facultad de Informatica vol.2",
    author: "John Smith",
    description:
      "Blockchain: La Revolución Digital. Explora cómo la tecnología blockchain está transformando industrias y la sociedad en este libro informativo y accesible",
    isbn: "2989631496332",
    publication_year: "1985-12-20T03:00:00.000+00:00",
    qualification: 3,
    gender: "NO_FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%235+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%235+-+Facultad+de+Informatica+de+la+UCM+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%235+-+Facultad+de+Informatica+de+la+UCM+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%235+-+Facultad+de+Informatica+de+la+UCM+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%235+-+Facultad+de+Informatica+de+la+UCM+5.jpg",
    ],
    price: 22.99,
  },
  {
    id: 11,
    title: "Facultad de Informatica vol.3",
    author: "John Smith",
    description:
      "Blockchain: La Revolución Digital. Explora cómo la tecnología blockchain está transformando industrias y la sociedad en este libro informativo y accesible",
    isbn: "1587491496332",
    publication_year: "1986-12-20T03:00:00.000+00:00",
    qualification: 4,
    gender: "NO_FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%236+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%236+-+Facultad+de+Informatica+de+la+UCM+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%236+-+Facultad+de+Informatica+de+la+UCM+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%236+-+Facultad+de+Informatica+de+la+UCM+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%236+-+Facultad+de+Informatica+de+la+UCM+5.jpg",
    ],
    price: 22.99,
  },
  {
    id: 12,
    title: "Facultad de Informatica vol.4",
    author: "John Smith",
    description:
      "Blockchain: La Revolución Digital. Explora cómo la tecnología blockchain está transformando industrias y la sociedad en este libro informativo y accesible",
    isbn: "3698591496332",
    publication_year: "1988-10-02T03:00:00.000+00:00",
    qualification: 4,
    gender: "NO_FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%237+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%237+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%237+-+Facultad+de+Informatica+de+la+UCM+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%237+-+Facultad+de+Informatica+de+la+UCM+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%237+-+Facultad+de+Informatica+de+la+UCM+5.jpg",
    ],
    price: 16.99,
  },
  {
    id: 13,
    title: "Facultad de Informatica vol.5",
    author: "John Smith",
    description:
      "Blockchain: La Revolución Digital. Explora cómo la tecnología blockchain está transformando industrias y la sociedad en este libro informativo y accesible",
    isbn: "3698591496332",
    publication_year: "1990-06-25T03:00:00.000+00:00",
    qualification: 5,
    gender: "NO_FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%238+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%238+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%238+-+Facultad+de+Informatica+de+la+UCM+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%238+-+Facultad+de+Informatica+de+la+UCM+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%238+-+Facultad+de+Informatica+de+la+UCM+5.jpg",
    ],
    price: 18.99,
  },
  {
    id: 14,
    title: "1984",
    author: "George Orwell",
    description:
      "1984 de George Orwell: Una distopía sombría que explora la vigilancia estatal y la pérdida de libertades en un mundo totalitario.",
    isbn: "1236591496332",
    publication_year: "1991-06-25T03:00:00.000+00:00",
    qualification: 4,
    gender: "NOVELAS",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/1984+George+Orwell+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/1984+George+Orwell+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/1984+George+Orwell+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/1984+George+Orwell+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/1984+George+Orwell+5.jpg",
    ],
    price: 18.99,
  },
  {
    id: 15,
    title: "Batman",
    author: "Frank Miller",
    description:
      "Batman de Frank Miller: Un cómic icónico que redefine al Caballero de la Noche en una Gotham City más oscura y realista.",
    isbn: "1236591496332",
    publication_year: "1998-12-01T03:00:00.000+00:00",
    qualification: 4,
    gender: "NOVELAS",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/Batman+year+1+Frank+Miller+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/Batman+year+1+Frank+Miller+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/Batman+year+1+Frank+Miller+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/Batman+year+1+Frank+Miller+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/Batman+year+1+Frank+Miller+5.jpg",
    ],
    price: 24.99,
  },
  {
    id: 16,
    title: "El arte de la guerra",
    author: "Sun Tzu",
    description:
      "El Arte de la Guerra de Sun Tzu: Una obra atemporal sobre estrategia y liderazgo militar con lecciones aplicables a la vida y los negocios.",
    isbn: "1236512985332",
    publication_year: "1980-03-01T03:00:00.000+00:00",
    qualification: 4,
    gender: "NOVELAS",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+arte+de+la+guerra+Sun+Tzu+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+arte+de+la+guerra+Sun+Tzu+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+arte+de+la+guerra+Sun+Tzu+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+arte+de+la+guerra+Sun+Tzu+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+arte+de+la+guerra+Sun+Tzu+5.jpg",
    ],
    price: 22.99,
  },
  {
    id: 17,
    title: "El Cid",
    author: "Jose Luis Corral",
    description:
      "El Cid de José Luis Corral: Una novela histórica que narra la vida del legendario caballero medieval Rodrigo Díaz de Vivar, el Cid Campeador.",
    isbn: "1236512585332",
    publication_year: "1985-01-22T03:00:00.000+00:00",
    qualification: 3,
    gender: "NOVELAS",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+Cid+Jose+Luis+Corral+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+Cid+Jose+Luis+Corral+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+Cid+Jose+Luis+Corral+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+Cid+Jose+Luis+Corral+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+Cid+Jose+Luis+Corral+1.jpg",
    ],
    price: 10.99,
  },
  {
    id: 18,
    title: "El manifiesto comunista",
    author: "Karl Marx",
    description:
      "El Manifiesto Comunista de Karl Marx: Un influyente texto que aborda la lucha de clases y promueve una visión del comunismo como solución a la desigualdad.",
    isbn: "2698732585332",
    publication_year: "1989-07-12T03:00:00.000+00:00",
    qualification: 4,
    gender: "NOVELAS",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+manifiesto+comunista+Karl+Marx+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+manifiesto+comunista+Karl+Marx+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+manifiesto+comunista+Karl+Marx+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+manifiesto+comunista+Karl+Marx+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+manifiesto+comunista+Karl+Marx+5.jpg",
    ],
    price: 11.99,
  },
  {
    id: 19,
    title: "El señor de las moscas",
    author: "William Golding",
    description:
      "El Señor de las Moscas de William Golding: Una novela que explora la naturaleza humana a través de la historia de un grupo de niños varados en una isla desierta.",
    isbn: "2698732585332",
    publication_year: "1999-07-12T03:00:00.000+00:00",
    qualification: 3,
    gender: "FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+se%C3%B1or+de+las+moscas+William+Golding+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+se%C3%B1or+de+las+moscas+William+Golding+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+se%C3%B1or+de+las+moscas+William+Golding+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+se%C3%B1or+de+las+moscas+William+Golding+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+se%C3%B1or+de+las+moscas+William+Golding+5.jpg",
    ],
    price: 18.99,
  },
  {
    id: 20,
    title: "El ultimo pasajero",
    author: "Manel Loureiro",
    description:
      "El Último Pasajero de Manel Loureiro: Un thriller emocionante que sigue a un periodista investigando misteriosos eventos a bordo de un crucero.",
    isbn: "3698732585332",
    publication_year: "1999-07-12T03:00:00.000+00:00",
    qualification: 4,
    gender: "FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+ultimo+pasajero+Manel+Loureiro+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+ultimo+pasajero+Manel+Loureiro+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+ultimo+pasajero+Manel+Loureiro+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+ultimo+pasajero+Manel+Loureiro+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+ultimo+pasajero+Manel+Loureiro+5.jpg",
    ],
    price: 10.99,
  },
  {
    id: 21,
    title: "La carretera",
    author: "Cormac McCarthy",
    description:
      "La Carretera de Cormac McCarthy: Una novela postapocalíptica que narra el viaje desgarrador de un padre y un hijo en busca de la supervivencia y la esperanza.",
    isbn: "3698398565332",
    publication_year: "2008-03-05T02:00:00.000+00:00",
    qualification: 4,
    gender: "FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/La+carretera+Cormac+McCarthy+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/La+carretera+Cormac+McCarthy+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/La+carretera+Cormac+McCarthy+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/La+carretera+Cormac+McCarthy+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/La+carretera+Cormac+McCarthy+5.jpg",
    ],
    price: 16.99,
  },
  {
    id: 22,
    title: "Las memorias de Sherlock Holmes",
    author: "Arthur Conan Doyle",
    description:
      "Las Memorias de Sherlock Holmes de Arthur Conan Doyle: Una colección de relatos que sigue al icónico detective Sherlock Holmes mientras resuelve intrincados misterios.",
    isbn: "3698398512587",
    publication_year: "2001-03-08T03:00:00.000+00:00",
    qualification: 5,
    gender: "FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Las+memorias+de+Sherlock+Holmes+Arthur+Conan+Doyle+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Las+memorias+de+Sherlock+Holmes+Arthur+Conan+Doyle+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Las+memorias+de+Sherlock+Holmes+Arthur+Conan+Doyle+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Las+memorias+de+Sherlock+Holmes+Arthur+Conan+Doyle+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Las+memorias+de+Sherlock+Holmes+Arthur+Conan+Doyle+5.jpg",
    ],
    price: 22.99,
  },
  {
    id: 23,
    title: "Martes con mi viejo profesor",
    author: "Mitch Albon",
    description:
      "Martes con mi Viejo Profesor de Mitch Albom: Una conmovedora historia real que explora lecciones de vida a través de las conversaciones con un querido mentor en sus últimos días.",
    isbn: "3698398512587",
    publication_year: "2001-03-08T03:00:00.000+00:00",
    qualification: 5,
    gender: "FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Martes+con+mi+viejo+profesor+Mitch+Albon+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Martes+con+mi+viejo+profesor+Mitch+Albon+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Martes+con+mi+viejo+profesor+Mitch+Albon+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Martes+con+mi+viejo+profesor+Mitch+Albon+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Martes+con+mi+viejo+profesor+Mitch+Albon+1.jpg",
    ],
    price: 22.99,
  },
  {
    id: 24,
    title: "101 Dalmatas",
    author: "Dodie Smith",
    description:
      "101 Dálmatas es una novela infantil de Dodie Smith sobre la lucha de dos dálmatas por salvar a sus cachorros de Cruella de Vil, una diseñadora obsesionada con hacer abrigos de piel de dálmata. Una his",
    isbn: "1864297315896",
    publication_year: "1990-01-15T02:00:00.000+00:00",
    qualification: 5,
    gender: "INFANTIL",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/101+Dalmatas+Disney+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/101+Dalmatas+Disney+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/101+Dalmatas+Disney+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/101+Dalmatas+Disney+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/101+Dalmatas+Disney+5.jpg",
    ],
    price: 12.99,
  },
  {
    id: 25,
    title: "365 actividades",
    author: "Zazu Navarro",
    description:
      "365 actividades: Un libro lleno de desafíos, diversión y creatividad para disfrutar un año completo de experiencias emocionantes.",
    isbn: "9685973158962",
    publication_year: "1980-01-10T03:00:00.000+00:00",
    qualification: 2,
    gender: "INFANTIL",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/365+actividades+Zazu+Navarro+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/365+actividades+Zazu+Navarro+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/365+actividades+Zazu+Navarro+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/365+actividades+Zazu+Navarro+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/365+actividades+Zazu+Navarro+5.jpg",
    ],
    price: 10.99,
  },
  {
    id: 26,
    title: "Aladdin",
    author: "Ferrándiz Juan",
    description:
      "Aladdin: Un cuento mágico de aventura y amor en la mística Agrabah.",
    isbn: "7398412650932",
    publication_year: "1989-05-11T03:00:00.000+00:00",
    qualification: 4,
    gender: "INFANTIL",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Aladdin+Disney+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Aladdin+Disney+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Aladdin+Disney+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Aladdin+Disney+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Aladdin+Disney+5.jpg",
    ],
    price: 13.99,
  },
  {
    id: 27,
    title: "Alicia en el pais de las maravillas",
    author: "Lewis Carroll",
    description:
      "Alicia en el País de las Maravillas: Un viaje surrealista y encantador en un mundo de fantasía.",
    isbn: "7398496310932",
    publication_year: "1993-05-20T03:00:00.000+00:00",
    qualification: 2,
    gender: "INFANTIL",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Alicia+en+el+pais+de+las+maravillas+Disney+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Alicia+en+el+pais+de+las+maravillas+Disney+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Alicia+en+el+pais+de+las+maravillas+Disney+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Alicia+en+el+pais+de+las+maravillas+Disney+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Alicia+en+el+pais+de+las+maravillas+Disney+5.jpg",
    ],
    price: 15.99,
  },
  {
    id: 28,
    title: "Blancanieves",
    author: "Jacob Grimm",
    description:
      "Blancanieves: Un cuento clásico de belleza, envidia y amistad, donde la magia y la valentía se entrelazan en un bosque encantado.",
    isbn: "1936588496332",
    publication_year: "1992-10-20T02:00:00.000+00:00",
    qualification: 5,
    gender: "INFANTIL",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Blancanieves+Disney+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Blancanieves+Disney+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Blancanieves+Disney+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Blancanieves+Disney+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Infantiles/Blancanieves+Disney+5.jpg",
    ],
    price: 15.99,
  },
  {
    id: 29,
    title: "Facultad de Informatica",
    author: "John Smith",
    description:
      "Blockchain: La Revolución Digital. Explora cómo la tecnología blockchain está transformando industrias y la sociedad en este libro informativo y accesible",
    isbn: "5759631496332",
    publication_year: "1982-12-20T03:00:00.000+00:00",
    qualification: 4,
    gender: "NO_FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%2313+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%2313+-+Facultad+de+Informatica+de+la+UCM+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%2313+-+Facultad+de+Informatica+de+la+UCM+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%2313+-+Facultad+de+Informatica+de+la+UCM+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%2313+-+Facultad+de+Informatica+de+la+UCM+5.jpg",
    ],
    price: 19.99,
  },
  {
    id: 30,
    title: "Facultad de Informatica vol.2",
    author: "John Smith",
    description:
      "Blockchain: La Revolución Digital. Explora cómo la tecnología blockchain está transformando industrias y la sociedad en este libro informativo y accesible",
    isbn: "2989631496332",
    publication_year: "1985-12-20T03:00:00.000+00:00",
    qualification: 3,
    gender: "NO_FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%235+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%235+-+Facultad+de+Informatica+de+la+UCM+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%235+-+Facultad+de+Informatica+de+la+UCM+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%235+-+Facultad+de+Informatica+de+la+UCM+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%235+-+Facultad+de+Informatica+de+la+UCM+5.jpg",
    ],
    price: 22.99,
  },
  {
    id: 31,
    title: "Facultad de Informatica vol.3",
    author: "John Smith",
    description:
      "Blockchain: La Revolución Digital. Explora cómo la tecnología blockchain está transformando industrias y la sociedad en este libro informativo y accesible",
    isbn: "1587491496332",
    publication_year: "1986-12-20T03:00:00.000+00:00",
    qualification: 4,
    gender: "NO_FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%236+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%236+-+Facultad+de+Informatica+de+la+UCM+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%236+-+Facultad+de+Informatica+de+la+UCM+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%236+-+Facultad+de+Informatica+de+la+UCM+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%236+-+Facultad+de+Informatica+de+la+UCM+5.jpg",
    ],
    price: 22.99,
  },
  {
    id: 32,
    title: "Facultad de Informatica vol.4",
    author: "John Smith",
    description:
      "Blockchain: La Revolución Digital. Explora cómo la tecnología blockchain está transformando industrias y la sociedad en este libro informativo y accesible",
    isbn: "3698591496332",
    publication_year: "1988-10-02T03:00:00.000+00:00",
    qualification: 4,
    gender: "NO_FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%237+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%237+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%237+-+Facultad+de+Informatica+de+la+UCM+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%237+-+Facultad+de+Informatica+de+la+UCM+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%237+-+Facultad+de+Informatica+de+la+UCM+5.jpg",
    ],
    price: 16.99,
  },
  {
    id: 33,
    title: "Facultad de Informatica vol.5",
    author: "John Smith",
    description:
      "Blockchain: La Revolución Digital. Explora cómo la tecnología blockchain está transformando industrias y la sociedad en este libro informativo y accesible",
    isbn: "3698591496332",
    publication_year: "1990-06-25T03:00:00.000+00:00",
    qualification: 5,
    gender: "NO_FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%238+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%238+-+Facultad+de+Informatica+de+la+UCM+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%238+-+Facultad+de+Informatica+de+la+UCM+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%238+-+Facultad+de+Informatica+de+la+UCM+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Magazines/Sci.Fdl%238+-+Facultad+de+Informatica+de+la+UCM+5.jpg",
    ],
    price: 18.99,
  },
  {
    id: 34,
    title: "1984",
    author: "George Orwell",
    description:
      "1984 de George Orwell: Una distopía sombría que explora la vigilancia estatal y la pérdida de libertades en un mundo totalitario.",
    isbn: "1236591496332",
    publication_year: "1991-06-25T03:00:00.000+00:00",
    qualification: 4,
    gender: "NOVELAS",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/1984+George+Orwell+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/1984+George+Orwell+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/1984+George+Orwell+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/1984+George+Orwell+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/1984+George+Orwell+5.jpg",
    ],
    price: 18.99,
  },
  {
    id: 35,
    title: "Batman",
    author: "Frank Miller",
    description:
      "Batman de Frank Miller: Un cómic icónico que redefine al Caballero de la Noche en una Gotham City más oscura y realista.",
    isbn: "1236591496332",
    publication_year: "1998-12-01T03:00:00.000+00:00",
    qualification: 4,
    gender: "NOVELAS",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/Batman+year+1+Frank+Miller+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/Batman+year+1+Frank+Miller+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/Batman+year+1+Frank+Miller+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/Batman+year+1+Frank+Miller+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/Batman+year+1+Frank+Miller+5.jpg",
    ],
    price: 24.99,
  },
  {
    id: 36,
    title: "El arte de la guerra",
    author: "Sun Tzu",
    description:
      "El Arte de la Guerra de Sun Tzu: Una obra atemporal sobre estrategia y liderazgo militar con lecciones aplicables a la vida y los negocios.",
    isbn: "1236512985332",
    publication_year: "1980-03-01T03:00:00.000+00:00",
    qualification: 4,
    gender: "NOVELAS",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+arte+de+la+guerra+Sun+Tzu+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+arte+de+la+guerra+Sun+Tzu+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+arte+de+la+guerra+Sun+Tzu+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+arte+de+la+guerra+Sun+Tzu+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+arte+de+la+guerra+Sun+Tzu+5.jpg",
    ],
    price: 22.99,
  },
  {
    id: 37,
    title: "El Cid",
    author: "Jose Luis Corral",
    description:
      "El Cid de José Luis Corral: Una novela histórica que narra la vida del legendario caballero medieval Rodrigo Díaz de Vivar, el Cid Campeador.",
    isbn: "1236512585332",
    publication_year: "1985-01-22T03:00:00.000+00:00",
    qualification: 3,
    gender: "NOVELAS",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+Cid+Jose+Luis+Corral+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+Cid+Jose+Luis+Corral+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+Cid+Jose+Luis+Corral+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+Cid+Jose+Luis+Corral+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+Cid+Jose+Luis+Corral+1.jpg",
    ],
    price: 10.99,
  },
  {
    id: 38,
    title: "El manifiesto comunista",
    author: "Karl Marx",
    description:
      "El Manifiesto Comunista de Karl Marx: Un influyente texto que aborda la lucha de clases y promueve una visión del comunismo como solución a la desigualdad.",
    isbn: "2698732585332",
    publication_year: "1989-07-12T03:00:00.000+00:00",
    qualification: 4,
    gender: "NOVELAS",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+manifiesto+comunista+Karl+Marx+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+manifiesto+comunista+Karl+Marx+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+manifiesto+comunista+Karl+Marx+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+manifiesto+comunista+Karl+Marx+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas+Graficas/El+manifiesto+comunista+Karl+Marx+5.jpg",
    ],
    price: 11.99,
  },
  {
    id: 39,
    title: "El señor de las moscas",
    author: "William Golding",
    description:
      "El Señor de las Moscas de William Golding: Una novela que explora la naturaleza humana a través de la historia de un grupo de niños varados en una isla desierta.",
    isbn: "2698732585332",
    publication_year: "1999-07-12T03:00:00.000+00:00",
    qualification: 3,
    gender: "FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+se%C3%B1or+de+las+moscas+William+Golding+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+se%C3%B1or+de+las+moscas+William+Golding+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+se%C3%B1or+de+las+moscas+William+Golding+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+se%C3%B1or+de+las+moscas+William+Golding+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+se%C3%B1or+de+las+moscas+William+Golding+5.jpg",
    ],
    price: 18.99,
  },
  {
    id: 40,
    title: "El ultimo pasajero",
    author: "Manel Loureiro",
    description:
      "El Último Pasajero de Manel Loureiro: Un thriller emocionante que sigue a un periodista investigando misteriosos eventos a bordo de un crucero.",
    isbn: "3698732585332",
    publication_year: "1999-07-12T03:00:00.000+00:00",
    qualification: 4,
    gender: "FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+ultimo+pasajero+Manel+Loureiro+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+ultimo+pasajero+Manel+Loureiro+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+ultimo+pasajero+Manel+Loureiro+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+ultimo+pasajero+Manel+Loureiro+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/El+ultimo+pasajero+Manel+Loureiro+5.jpg",
    ],
    price: 10.99,
  },
  {
    id: 41,
    title: "La carretera",
    author: "Cormac McCarthy",
    description:
      "La Carretera de Cormac McCarthy: Una novela postapocalíptica que narra el viaje desgarrador de un padre y un hijo en busca de la supervivencia y la esperanza.",
    isbn: "3698398565332",
    publication_year: "2008-03-05T02:00:00.000+00:00",
    qualification: 4,
    gender: "FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/La+carretera+Cormac+McCarthy+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/La+carretera+Cormac+McCarthy+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/La+carretera+Cormac+McCarthy+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/La+carretera+Cormac+McCarthy+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/La+carretera+Cormac+McCarthy+5.jpg",
    ],
    price: 16.99,
  },
  {
    id: 42,
    title: "Las memorias de Sherlock Holmes",
    author: "Arthur Conan Doyle",
    description:
      "Las Memorias de Sherlock Holmes de Arthur Conan Doyle: Una colección de relatos que sigue al icónico detective Sherlock Holmes mientras resuelve intrincados misterios.",
    isbn: "3698398512587",
    publication_year: "2001-03-08T03:00:00.000+00:00",
    qualification: 5,
    gender: "FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Las+memorias+de+Sherlock+Holmes+Arthur+Conan+Doyle+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Las+memorias+de+Sherlock+Holmes+Arthur+Conan+Doyle+2.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Las+memorias+de+Sherlock+Holmes+Arthur+Conan+Doyle+3.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Las+memorias+de+Sherlock+Holmes+Arthur+Conan+Doyle+4.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Las+memorias+de+Sherlock+Holmes+Arthur+Conan+Doyle+5.jpg",
    ],
    price: 22.99,
  },
  {
    id: 43,
    title: "Martes con mi viejo profesor",
    author: "Mitch Albon",
    description:
      "Martes con mi Viejo Profesor de Mitch Albom: Una conmovedora historia real que explora lecciones de vida a través de las conversaciones con un querido mentor en sus últimos días.",
    isbn: "3698398512587",
    publication_year: "2001-03-08T03:00:00.000+00:00",
    qualification: 5,
    gender: "FICCION",
    imgUrl: [
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Martes+con+mi+viejo+profesor+Mitch+Albon+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Martes+con+mi+viejo+profesor+Mitch+Albon+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Martes+con+mi+viejo+profesor+Mitch+Albon+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Martes+con+mi+viejo+profesor+Mitch+Albon+1.jpg",
      "https://onlybooksbucket.s3.amazonaws.com/Productos/Novelas/Martes+con+mi+viejo+profesor+Mitch+Albon+1.jpg",
    ],
    price: 22.99,
  },
];

export default data;
