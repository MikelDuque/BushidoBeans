const productData = [
    {
        id: 1,
        imagen: "/productos/Designer.jpeg",
        nombre: "Pouch Drink Café Negro",
        intensidad: 2,
        valoracion: 2.5,
        precio: 2.4,
        soldout: false,
        descripcion: "Este Pouch Drink Café Negro es la opción perfecta para aquellos que buscan disfrutar de un café de sabor puro y fuerte. Con una intensidad media, su perfil de sabor es profundo y robusto, ideal para empezar el día con energía o para acompañar esos momentos de concentración. Su mezcla de granos seleccionados proporciona una taza llena de notas intensas, sin añadidos, ofreciendo la auténtica experiencia del café negro en su máxima expresión."
    },
    {
        id: 2,
        imagen: "/productos/Designer (1).jpeg",
        nombre: "Pouch Drink Café con Leche",
        intensidad: 3,
        valoracion: 1.5,
        precio: 2.0,
        soldout: false,
        descripcion: "El Pouch Drink Café con Leche es la bebida perfecta para quienes disfrutan del equilibrio entre la suavidad de la leche y la intensidad del café. Con una intensidad media-alta, su sabor suave y cremoso es ideal para un desayuno relajado o una tarde reconfortante. Esta mezcla proporciona la dosis justa de cafeína sin perder la suavidad, siendo perfecta para cualquier momento del día. Su sabor delicado pero sabroso es perfecto para aquellos que buscan una experiencia más suave y reconfortante."
    },
    {
        id: 3,
        imagen: "/productos/Designer (2).jpeg",
        nombre: "Pouch Drink Café Vainilla",
        intensidad: 3,
        valoracion: 3,
        precio: 2.1,
        soldout: false,
        descripcion: "El Pouch Drink Café Vainilla es una deliciosa combinación entre la intensidad del café y el dulce toque de la vainilla. Este sabor armonioso y cálido es perfecto para los que buscan algo diferente en su rutina diaria. Su intensidad media-alta aporta una base sólida de café, mientras que la vainilla crea una sensación reconfortante en cada sorbo. Es una bebida ideal para quienes disfrutan de sabores dulces, cremosos y exquisitos, perfectos para acompañar cualquier momento especial de tu día."
    },
    {
        id: 4,
        imagen: "/productos/Designer (3).jpeg",
        nombre: "Pouch Drink Café de Avellana",
        intensidad: 3,
        valoracion: 2,
        precio: 2.2,
        soldout: false,
        descripcion: "El Pouch Drink Café de Avellana es una mezcla sublime de café de alta calidad con el toque único de la avellana. Con una intensidad media-alta, esta bebida ofrece una experiencia sensorial que combina el sabor robusto del café con la dulzura y la suavidad de la avellana. Su sabor equilibrado y su suave textura hacen de este café una opción perfecta para aquellos que desean disfrutar de una bebida cálida y reconfortante. Ideal para relajarse o compartir con amigos, su sabor único se convertirá en uno de tus favoritos."
    },
    {
        id: 5,
        imagen: "/productos/Designer (4).jpeg",
        nombre: "Pouch Drink Té de Hierbas",
        intensidad: 2,
        valoracion: 1,
        precio: 1.8,
        soldout: true,
        descripcion: "El Pouch Drink Té de Hierbas es una infusión ligera y refrescante, ideal para los que buscan un toque herbal y natural. Con una intensidad baja, este té es perfecto para relajarse después de un largo día. Su mezcla de hierbas seleccionadas tiene un sabor fresco y floral que ayuda a calmar la mente y el cuerpo. Ya sea por la tarde o antes de dormir, este té es ideal para disfrutar de un momento de paz y tranquilidad, libre de cafeína pero lleno de beneficios para tu bienestar."
    },
    {
        id: 6,
        imagen: "/productos/Designer (5).jpeg",
        nombre: "Pouch Drink Té con Leche",
        intensidad: 2,
        valoracion: 2.5,
        precio: 2.0,
        soldout: false,
        descripcion: "El Pouch Drink Té con Leche combina la suavidad y frescura del té con la cremosidad de la leche, creando una bebida cálida y reconfortante. Su intensidad media lo convierte en una opción ideal para los que prefieren una infusión ligera pero con carácter. Esta bebida tiene el balance perfecto entre la suavidad del té y la suavidad cremosa de la leche, lo que la convierte en una opción ideal para cualquier momento del día, ya sea para relajarte por la mañana o como un agradable descanso en medio de la tarde."
    },
    {
        id: 7,
        imagen: "/productos/Designer (6).jpeg",
        nombre: "Pouch Drink Special Edition",
        intensidad: 1,
        valoracion: 3,
        precio: 2.4,
        soldout: false,
        descripcion: "Pouch Drink Special Edition es una creación limitada que ofrece una experiencia de sabor única y exclusiva. Con una intensidad suave, esta edición especial tiene un sabor que se destaca por su mezcla especial de ingredientes y aromas. Ideal para los que buscan algo diferente y único, esta bebida es el resultado de una cuidadosa selección de sabores que te sorprenderán en cada sorbo. Perfecta para ocasiones especiales, esta edición limitada está diseñada para brindarte un momento de disfrute excepcional."
    },
    {
        id: 8,
        imagen: "/productos/Designer (7).jpeg",
        nombre: "Pouch Drink Halloween Edition",
        intensidad: 3,
        valoracion: 1.5,
        precio: 2.3,
        soldout: false,
        descripcion: "La Pouch Drink Halloween Edition es una bebida limitada que trae consigo un sabor único y festivo. Con una intensidad alta, esta bebida especial está diseñada para celebrar la temporada de Halloween con un toque especial. Con ingredientes seleccionados y una mezcla de sabores ligeramente especiados, es perfecta para disfrutar durante esta temporada. Su sabor robusto y su presentación especial la convierten en la opción ideal para celebrar con amigos o para disfrutar de una experiencia deliciosa mientras ves una película de terror."
    },
    {
        id: 9,
        imagen: "/productos/Designer (8).jpeg",
        nombre: "Pack de Café",
        intensidad: 1,
        valoracion: 2,
        precio: 5.4,
        soldout: false,
        descripcion: "El Pack de Café es una opción perfecta para los amantes del café que desean disfrutar de una variedad de sabores. Con una intensidad suave, cada paquete contiene una selección de cafés que ofrecen diferentes perfiles de sabor, ideal para quienes disfrutan de explorar nuevas opciones y combinar diferentes aromas y notas. Es perfecto para tener siempre a mano una opción de café delicioso en cualquier momento del día, ya sea en la oficina o en casa."
    },
    {
        id: 10,
        imagen: "/productos/Designer (9).jpeg",
        nombre: "Pack de Té",
        intensidad: 2,
        valoracion: 2.5,
        precio: 5.0,
        soldout: false,
        descripcion: "El Pack de Té es ideal para los aficionados al té que desean disfrutar de una variedad de infusiones. Con una intensidad media, este pack incluye una selección de tés que ofrecen diferentes sabores y aromas, desde los más frescos y florales hasta los más especiados y terrosos. Perfecto para quienes buscan un momento de relajación y bienestar, este pack te invita a disfrutar de tés ideales para cada ocasión, ya sea para relajarte por la mañana o antes de acostarte."
    },
    {
        id: 11,
        imagen: "//productos/Designer (10).jpeg",
        nombre: "Pouch Drink Té Frío",
        intensidad: 2,
        valoracion: 1,
        precio: 1.9,
        soldout: false,
        descripcion: "El Pouch Drink Té Frío es la bebida perfecta para los días calurosos, con una mezcla refrescante que aporta la frescura de un té helado combinado con un toque de dulzura natural. Con una intensidad media, esta infusión es ligera y perfecta para disfrutar como una bebida refrescante a lo largo del día. Su sabor suave y refrescante lo convierte en una opción ideal para acompañar una tarde soleada o como una bebida ligera antes o después de tus comidas."
    },
    {
        id: 12,
        imagen: "/productos/Designer (11).jpeg",
        nombre: "Pouch Drink Latte",
        intensidad: 3,
        valoracion: 2,
        precio: 2.1,
        soldout: false,
        descripcion: "El Pouch Drink Latte es la combinación perfecta entre el café suave y la cremosidad de la leche. Con una intensidad media-alta, esta bebida ofrece un sabor equilibrado que te cautivará. Su textura suave y cremosa es ideal para disfrutar en cualquier momento del día, ya sea para empezar la mañana con energía o como una merienda reconfortante. El latte es ideal para quienes disfrutan de un sabor más suave sin renunciar a la intensidad del café."
    }
];

export default productData;
