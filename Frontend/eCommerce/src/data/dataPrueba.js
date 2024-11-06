const productData = [
    {
        id: 1,
        imagen: "/productos/Designer.jpeg",
        nombre: "Pouch Drink Café Negro",
        intensidad: 2,
        precio: 2.4,
        soldout: false,
        descripcion: "Este Pouch Drink Café Negro es la opción perfecta para aquellos que buscan disfrutar de un café de sabor puro y fuerte. Con una intensidad media, su perfil de sabor es profundo y robusto, ideal para empezar el día con energía o para acompañar esos momentos de concentración. Su mezcla de granos seleccionados proporciona una taza llena de notas intensas, sin añadidos, ofreciendo la auténtica experiencia del café negro en su máxima expresión."
    },
    {
        id: 2,
        imagen: "/productos/Designer (1).jpeg",
        nombre: "Pouch Drink Café con Leche",
        intensidad: 3,
        precio: 2.0,
        soldout: false,
        descripcion: "El Pouch Drink Café con Leche es la bebida perfecta para quienes disfrutan del equilibrio entre la suavidad de la leche y la intensidad del café. Con una intensidad media-alta, su sabor suave y cremoso es ideal para un desayuno relajado o una tarde reconfortante. Esta mezcla proporciona la dosis justa de cafeína sin perder la suavidad, siendo perfecta para cualquier momento del día. Su sabor delicado pero sabroso es perfecto para aquellos que buscan una experiencia más suave y reconfortante."
    },
    {
        id: 3,
        imagen: "/productos/Designer (2).jpeg",
        nombre: "Pouch Drink Café Vainilla",
        intensidad: 3,
        precio: 2.1,
        soldout: false,
        descripcion: "El Pouch Drink Café Vainilla es una deliciosa combinación entre la intensidad del café y el dulce toque de la vainilla. Este sabor armonioso y cálido es perfecto para los que buscan algo diferente en su rutina diaria. Su intensidad media-alta aporta una base sólida de café, mientras que la vainilla crea una sensación reconfortante en cada sorbo. Es una bebida ideal para quienes disfrutan de sabores dulces, cremosos y exquisitos, perfectos para acompañar cualquier momento especial de tu día."
    },
    {
        id: 4,
        imagen: "/productos/Designer (3).jpeg",
        nombre: "Pouch Drink Café de Avellana",
        intensidad: 3,
        precio: 2.2,
        soldout: false,
        descripcion: "El Pouch Drink Café de Avellana es una mezcla sublime de café de alta calidad con el toque único de la avellana. Con una intensidad media-alta, esta bebida ofrece una experiencia sensorial que combina el sabor robusto del café con la dulzura y la suavidad de la avellana. Su sabor equilibrado y su suave textura hacen de este café una opción perfecta para aquellos que desean disfrutar de una bebida cálida y reconfortante. Ideal para relajarse o compartir con amigos, su sabor único se convertirá en uno de tus favoritos."
    },
    {
        id: 5,
        imagen: "/productos/Designer (4).jpeg",
        nombre: "Pouch Drink Té de Hierbas",
        intensidad: 2,
        precio: 1.8,
        soldout: true,
        descripcion: "El Pouch Drink Té de Hierbas es una infusión ligera y refrescante, ideal para los que buscan un toque herbal y natural. Con una intensidad baja, este té es perfecto para relajarse después de un largo día. Su mezcla de hierbas seleccionadas tiene un sabor fresco y floral que ayuda a calmar la mente y el cuerpo. Ya sea por la tarde o antes de dormir, este té es ideal para disfrutar de un momento de paz y tranquilidad, libre de cafeína pero lleno de beneficios para tu bienestar."
    },
    {
        id: 6,
        imagen: "/productos/Designer (5).jpeg",
        nombre: "Pouch Drink Té con Leche",
        intensidad: 2,
        precio: 2.0,
        soldout: false,
        descripcion: "El Pouch Drink Té con Leche combina la suavidad y frescura del té con la cremosidad de la leche, creando una bebida cálida y reconfortante. Su intensidad media lo convierte en una opción ideal para los que prefieren una infusión ligera pero con carácter. Esta bebida tiene el balance perfecto entre la suavidad del té y la suavidad cremosa de la leche, lo que la convierte en una opción ideal para cualquier momento del día, ya sea para relajarte por la mañana o como un agradable descanso en medio de la tarde."
    },
    {
        id: 7,
        imagen: "/productos/Designer (6).jpeg",
        nombre: "Pouch Drink Special Edition",
        intensidad: 1,
        precio: 2.4,
        soldout: false,
        descripcion: "Pouch Drink Special Edition es una creación limitada que ofrece una experiencia de sabor única y exclusiva. Con una intensidad suave, esta edición especial tiene un sabor que se destaca por su mezcla especial de ingredientes y aromas. Ideal para los que buscan algo diferente y único, esta bebida es el resultado de una cuidadosa selección de sabores que te sorprenderán en cada sorbo. Perfecta para ocasiones especiales, esta edición limitada está diseñada para brindarte un momento de disfrute excepcional."
    },
    {
        id: 8,
        imagen: "/productos/Designer (7).jpeg",
        nombre: "Pouch Drink Halloween Edition",
        intensidad: 3,
        precio: 2.3,
        soldout: false,
        descripcion: "La Pouch Drink Halloween Edition es una bebida limitada que trae consigo un sabor único y festivo. Con una intensidad alta, esta bebida especial está diseñada para celebrar la temporada de Halloween con un toque especial. Con ingredientes seleccionados y una mezcla de sabores ligeramente especiados, es perfecta para disfrutar durante esta temporada. Su sabor robusto y su presentación especial la convierten en la opción ideal para celebrar con amigos o para disfrutar de una experiencia deliciosa mientras ves una película de terror."
    },
    {
        id: 9,
        imagen: "/productos/Designer (8).jpeg",
        nombre: "Pack de Café",
        intensidad: 1,
        precio: 5.4,
        soldout: false,
        descripcion: "El Pack de Café es una opción perfecta para los amantes del café que desean disfrutar de una variedad de sabores. Con una intensidad suave, cada paquete contiene una selección de cafés que ofrecen diferentes perfiles de sabor, ideal para quienes disfrutan de explorar nuevas opciones y combinar diferentes aromas y notas. Es perfecto para tener siempre a mano una opción de café delicioso en cualquier momento del día, ya sea en la oficina o en casa."
    },
    {
        id: 10,
        imagen: "/productos/Designer (9).jpeg",
        nombre: "Pack de Té",
        intensidad: 2,
        precio: 5.0,
        soldout: false,
        descripcion: "El Pack de Té es ideal para los aficionados al té que desean disfrutar de una variedad de infusiones. Con una intensidad media, este pack incluye una selección de tés que ofrecen diferentes sabores y aromas, desde los más frescos y florales hasta los más especiados y terrosos. Perfecto para quienes buscan un momento de relajación y bienestar, este pack te invita a disfrutar de tés ideales para cada ocasión, ya sea para relajarte por la mañana o antes de acostarte."
    },
    {
        id: 11,
        imagen: "//productos/Designer (10).jpeg",
        nombre: "Pouch Drink Té Frío",
        intensidad: 2,
        precio: 1.9,
        soldout: false,
        descripcion: "El Pouch Drink Té Frío es la bebida perfecta para los días calurosos, con una mezcla refrescante que aporta la frescura de un té helado combinado con un toque de dulzura natural. Con una intensidad media, esta infusión es ligera y perfecta para disfrutar como una bebida refrescante a lo largo del día. Su sabor suave y refrescante lo convierte en una opción ideal para acompañar una tarde soleada o como una bebida ligera antes o después de tus comidas."
    },
    {
        id: 12,
        imagen: "/productos/Designer (11).jpeg",
        nombre: "Pouch Drink Latte",
        intensidad: 3,
        precio: 2.1,
        soldout: false,
        descripcion: "El Pouch Drink Latte es la combinación perfecta entre el café suave y la cremosidad de la leche. Con una intensidad media-alta, esta bebida ofrece un sabor equilibrado que te cautivará. Su textura suave y cremosa es ideal para disfrutar en cualquier momento del día, ya sea para empezar la mañana con energía o como una merienda reconfortante. El latte es ideal para quienes disfrutan de un sabor más suave sin renunciar a la intensidad del café."
    },
    {
        id: 13,
        imagen: "/productos/Designer (12).jpeg",
        nombre: "Pouch Drink Espresso",
        intensidad: 2,
        precio: 2.3,
        soldout: false,
        descripcion: "El Pouch Drink Espresso es para los amantes del café fuerte y concentrado. Con una intensidad media, esta bebida tiene un sabor profundo y auténtico, ideal para disfrutar de una dosis rápida de energía. Su sabor intenso y característico es perfecto para aquellos que prefieren un café robusto pero suave, que puede disfrutarse en cualquier momento del día, ya sea como un refuerzo en la mañana o un descanso en medio de una jornada de trabajo."
    },
    {
        id: 14,
        imagen: "/productos/Designer (13).jpeg",
        nombre: "Pouch Drink Chai Latte",
        intensidad: 3,
        precio: 2.5,
        soldout: false,
        descripcion: "El Pouch Drink Chai Latte es una mezcla de té especiado con la suavidad de la leche, creando una experiencia cálida y exótica. Con una intensidad alta, esta bebida tiene un sabor profundo y aromático, que combina especias como canela, cardamomo y jengibre. Perfecto para quienes buscan algo diferente y reconfortante, el Chai Latte te lleva a una aventura sensorial que te hará sentirte acogido y relajado. Ideal para los amantes de las especias y los sabores cálidos."
    },
    {
        id: 15,
        imagen: "/productos/Designer (14).jpeg",
        nombre: "Pouch Drink Cold Brew",
        intensidad: 4,
        precio: 2.7,
        soldout: false,
        descripcion: "El Pouch Drink Cold Brew es la opción perfecta para los amantes del café que prefieren un sabor suave pero con mucha personalidad. Con una intensidad alta, este café frío es elaborado mediante un proceso lento de extracción en frío, lo que da como resultado una bebida con menos acidez y un sabor más suave. Ideal para disfrutar en los días calurosos o para aquellos que buscan una experiencia de café diferente, Cold Brew ofrece una bebida refrescante y única."
    },
    {
        id: 16,
        imagen: "/productos/Designer (15).jpeg",
        nombre: "Pouch Drink Té Negro",
        intensidad: 3,
        precio: 2.0,
        soldout: false,
        descripcion: "El Pouch Drink Té Negro es una infusión robusta y rica en sabor, ideal para aquellos que disfrutan de un té con cuerpo. Con una intensidad media-alta, este té negro ofrece un sabor profundo y ligeramente amargo, que se puede endulzar según el gusto. Es perfecto para empezar el día con energía o disfrutar de una pausa en la tarde. Con un toque de astringencia y una gran cantidad de antioxidantes, el Té Negro es ideal para quienes buscan una bebida energizante y reconfortante."
    },
    {
        id: 17,
        imagen: "/productos/Designer (16).jpeg",
        nombre: "Pouch Drink Té Chai",
        intensidad: 3,
        precio: 2.1,
        soldout: false,
        descripcion: "El Pouch Drink Té Chai es una mezcla exótica y vibrante de especias como canela, cardamomo, jengibre y clavo, combinada con el sabor suave del té negro. Con una intensidad media-alta, este té tiene un sabor cálido y especiado que es ideal para los días fríos o como bebida reconfortante. Perfecto para los amantes de las especias, el Chai es una infusión que no solo te despierta, sino que te transporta a tierras lejanas, brindándote una experiencia única en cada sorbo."
    },
    {
        id: 18,
        imagen: "/productos/Designer (17).jpeg",
        nombre: "Pouch Drink Té de Frutas",
        intensidad: 2,
        precio: 1.6,
        soldout: false,
        descripcion: "El Pouch Drink Té de Frutas es una infusión refrescante y deliciosa, llena de sabores frutales que revitalizan el cuerpo y la mente. Con una intensidad suave, esta bebida está llena de sabores naturales de frutas, creando una experiencia de sabor ligera pero dulce. Ideal para aquellos que buscan una bebida sin cafeína, perfecta para disfrutar en cualquier momento del día, ya sea como una bebida relajante antes de acostarse o como una alternativa refrescante durante las tardes calurosas."
    },
    {
        id: 19,
        imagen: "/productos/Designer (18).jpeg",
        nombre: "Pouch Drink Latte de Vainilla",
        intensidad: 3,
        precio: 2.2,
        soldout: false,
        descripcion: "El Pouch Drink Latte de Vainilla es una deliciosa fusión entre el suave café latte y el dulce toque de la vainilla. Con una intensidad media-alta, su sabor dulce y cremoso es perfecto para aquellos que buscan una bebida reconfortante y llena de sabor. El sabor a vainilla se combina armoniosamente con la suavidad de la leche, creando una bebida suave y rica, ideal para cualquier momento del día. Ya sea como una merienda o un desayuno reconfortante, este latte te hará sentir como si estuvieras en tu cafetería favorita."
    },
    {
        id: 20,
        imagen: "/productos/Designer (19).jpeg",
        nombre: "Pouch Drink Irish Coffee",
        intensidad: 2,
        precio: 2.3,
        soldout: false,
        descripcion: "El Pouch Drink Irish Coffee es una mezcla única de café fuerte con un toque de crema y licor irlandés (en su versión sin alcohol), creando una bebida rica y cálida. Con una intensidad media, esta bebida es perfecta para aquellos que buscan una experiencia de café diferente, con un toque de suavidad y profundidad. Ideal para disfrutar de una tarde tranquila o como un regalo para los amantes del café con un toque especial, este Irish Coffee es perfecto para quienes buscan un sabor audaz y reconfortante."
    },
    {
        id: 21,
        imagen: "/productos/Designer (20).jpeg",
        nombre: "Pouch Drink Caramel Macchiato",
        intensidad: 3,
        precio: 2.2,
        soldout: true,
        descripcion: "El Pouch Drink Caramel Macchiato es una de las opciones más indulgentes y deliciosas que puedes probar. Con una intensidad media-alta, esta bebida combina el sabor intenso del café con el toque suave y dulce del caramelo, creando una mezcla perfecta de sabores que despiertan todos los sentidos. La capa de leche vaporizada se combina con un delicioso toque de caramelo, resultando en una bebida rica y reconfortante, ideal para disfrutar en cualquier momento del día, especialmente en las tardes frías o como un capricho para alegrar tu día."
    },
    {
        id: 22,
        imagen: "/productos/Designer (21).jpeg",
        nombre: "Pouch Drink Té de Menta",
        intensidad: 2,
        precio: 1.5,
        soldout: false,
        descripcion: "El Pouch Drink Té de Menta es una infusión refrescante y aromática, ideal para los que disfrutan de sabores frescos y mentolados. Con una intensidad suave, esta bebida tiene un sabor fresco y revitalizante, perfecto para un momento de relajación después de una comida o como una bebida ligera en cualquier momento del día. El té de menta es conocido por sus propiedades digestivas y calmantes, convirtiéndolo en la opción perfecta para aquellos que buscan una bebida refrescante que también ofrezca beneficios para el bienestar."
    },
    {
        id: 23,
        imagen: "/productos/Designer (22).jpeg",
        nombre: "Pouch Drink Cold Brew",
        intensidad: 3,
        precio: 2.4,
        soldout: false,
        descripcion: "El Pouch Drink Cold Brew es la opción perfecta para quienes buscan un café suave y refrescante. Con una intensidad alta, el proceso de extracción en frío le otorga un sabor más suave, con menos acidez y más notas dulces que un café tradicional. Ideal para los días calurosos, el Cold Brew es perfecto para aquellos que buscan una bebida energizante pero refrescante. Ya sea como un primer café del día o como una bebida para relajarse, su sabor único y suave es ideal para los amantes del café frío."
    },
    {
        id: 24,
        imagen: "/productos/Designer (13).jpeg",
        nombre: "Pouch Drink Chai Latte",
        intensidad: 3,
        precio: 2.0,
        soldout: false,
        descripcion: "El Pouch Drink Chai Latte es una infusión rica y especiada que combina el té negro con una mezcla de especias aromáticas, como cardamomo, jengibre y canela, acompañada de una base cremosa de leche. Con una intensidad media-alta, el sabor de esta bebida es cálido, picante y reconfortante, ideal para los días fríos o como una merienda reconfortante. El Chai Latte es perfecto para los que buscan un equilibrio entre especias intensas y una textura suave y cremosa, una bebida que te abraza con cada sorbo."
    },
    {
        id: 25,
        imagen: "/recursos/pouchdrinkprueba.jpg",
        nombre: "Pouch Drink Té de Hibisco",
        intensidad: 2,
        precio: 1.6,
        soldout: false,
        descripcion: "El Pouch Drink Té de Hibisco es una infusión floral con un sabor ligeramente ácido y refrescante. Con una intensidad media, este té tiene un sabor único y vibrante, ideal para quienes disfrutan de las infusiones frutales y florales. Perfecto para los días calurosos, el té de hibisco se disfruta frío, pero también puede ser disfrutado caliente para un toque floral durante cualquier época del año. Además, el hibisco es conocido por sus propiedades antioxidantes y beneficios para la salud."
    },
    {
        id: 26,
        imagen: "/recursos/pouchdrinkprueba.jpg",
        nombre: "Pouch Drink Café con Avellanas",
        intensidad: 3,
        precio: 2.1,
        soldout: true,
        descripcion: "El Pouch Drink Café con Avellanas es una mezcla deliciosa de café con un toque de avellanas tostadas que ofrece una bebida suave y cremosa. Con una intensidad media-alta, este café combina la robustez del café con la suavidad y el toque dulce de las avellanas. Ideal para quienes buscan una experiencia de café diferente, esta bebida es perfecta para disfrutar como un capricho por la mañana o durante la tarde, proporcionando una sensación cálida y acogedora."
    },
    {
        id: 27,
        imagen: "/recursos/pouchdrinkprueba.jpg",
        nombre: "Pouch Drink Té de Limón",
        intensidad: 2,
        precio: 1.8,
        soldout: false,
        descripcion: "El Pouch Drink Té de Limón es una infusión refrescante y vibrante, con un sabor cítrico y ligeramente ácido que revitaliza los sentidos. Con una intensidad suave, esta bebida es ideal para los días calurosos, o como una opción ligera para relajarte en la tarde. El té de limón también es conocido por sus propiedades digestivas y refrescantes, lo que lo convierte en una opción perfecta para un día de verano o como una bebida calmante después de las comidas."
    },
    {
        id: 28,
        imagen: "/recursos/pouchdrinkprueba.jpg",
        nombre: "Pouch Drink Espresso Doble",
        intensidad: 3,
        precio: 2.4,
        soldout: false,
        descripcion: "El Pouch Drink Espresso Doble es una opción poderosa y llena de energía para los amantes del café fuerte. Con una intensidad alta, este espresso doble ofrece un sabor robusto y concentrado, ideal para aquellos que buscan una bebida que despierte todos los sentidos. Con una textura cremosa y un sabor profundo, este espresso es perfecto para empezar el día con fuerza o para disfrutar de una pausa en cualquier momento del día. Si eres fanático de los espressos, este te ofrecerá el doble de satisfacción."
    },
    {
        id: 29,
        imagen: "/recursos/pouchdrinkprueba.jpg",
        nombre: "Pouch Drink Latte de Caramelo",
        intensidad: 3,
        precio: 2.2,
        soldout: false,
        descripcion: "El Pouch Drink Latte de Caramelo es una mezcla suave y dulce de café con leche vaporizada y un delicioso toque de caramelo. Con una intensidad media-alta, esta bebida ofrece un equilibrio perfecto entre la suavidad de la leche y el toque dulce del caramelo, creando una experiencia de sabor rica y reconfortante. Ideal para aquellos que disfrutan de un toque dulce en su café, el Latte de Caramelo es perfecto como una merienda o como un capricho para cualquier momento del día."
    },
    {
        id: 30,
        imagen: "/recursos/pouchdrinkprueba.jpg",
        nombre: "Pouch Drink Café con Chocolate",
        intensidad: 3,
        precio: 2.3,
        soldout: false,
        descripcion: "El Pouch Drink Café con Chocolate es una bebida decadente que combina la riqueza del café con la suavidad del chocolate. Con una intensidad alta, esta bebida ofrece una experiencia de sabor suave y a la vez intensa, perfecta para aquellos que disfrutan de una combinación de sabores dulces y amargos. Ideal para una tarde de descanso o como un dulce acompañante de tus momentos de relajación, este café con chocolate es perfecto para los golosos y amantes del cacao."
    },
    {
        id: 31,
        imagen: "/recursos/pouchdrinkprueba.jpg",
        nombre: "Pouch Drink Té de Manzana",
        intensidad: 2,
        precio: 1.5,
        soldout: false,
        descripcion: "El Pouch Drink Té de Manzana es una infusión fresca y ligeramente dulce que combina el sabor natural de las manzanas con la suavidad de las hierbas. Con una intensidad media, esta bebida es ligera y refrescante, ideal para disfrutar en cualquier momento del día. El té de manzana ofrece una experiencia reconfortante que combina los beneficios antioxidantes de las hierbas con el dulzor natural de la fruta, lo que lo convierte en una opción saludable y deliciosa para los que buscan algo diferente."
    }
];

export default productData;