//VARIABLES
const LS = localStorage;
let arrayCarrito = [];
const URL = "http://127.0.0.1:5500/JavaScript_Vanilla/Carrito/data/cards.json"; 

const listaCursos = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#carrito")
const ListaCarrito = document.querySelector("#lista-carrito");


//FUNCIONALIDAD BASICA
enviarPeticion();
cargarPagina();
listaCursos.addEventListener("click", comprobarBoton);
carrito.addEventListener("click", comprobarBotonCarrito);


//FUNCIONES

//Carga HTML
async function enviarPeticion() {
    const datos = await fetch(URL);
    const datosJSON = await datos.json();
    construirHTML(datosJSON);
}

function construirHTML(informacion) {
    informacion.forEach((elemento) => {
        const valorString = extraerDatosJSON(elemento);
        crearElementoHTML("div", listaCursos, valorString);
    });
}

function crearElementoHTML(nombreElemento, padre, valor) {
    nuevoElemento = document.createElement(nombreElemento);
    padre.appendChild(nuevoElemento).innerHTML = valor;
}

function extraerDatosJSON(elementoArray) {
    return (
        `<img src="${elementoArray.imagen}" class="imagen-curso u-full-width"/>` +
        `<div class="info-card">
            <h4>${elementoArray.nombre}</h4>
            <p>${elementoArray.autor}</p>
            <img src="img/estrellas.png"/>
            <p class="precio">${elementoArray.precioAntiguo}<span class="u-pull-right">${elementoArray.precioNuevo}</span></p>
            <a href="#" class="u-full-width button-primary button input agregar-carrito" data-id="${elementoArray.id}">Agregar al Carrito</a>
        </div>`
    );
};

//Delegaciones
function comprobarBoton(event) {
    event.preventDefault();
    
    if (event.target.classList.contains("agregar-carrito")) {
        addCarrito(event);
    }
};

function comprobarBotonCarrito(event) {
    event.preventDefault();
    let btnPulsado = event.target;

    if (btnPulsado.getAttribute("id") === "vaciar-carrito") {
        vaciarCarrito();
    } else if(btnPulsado.classList.contains("borrar-curso")) {
        eliminarElementoCarrito(btnPulsado);
    }
}

//Adición de elementos
function addCarrito(event) {
    const esteBtn = event.target;
    const cardPadre = esteBtn.parentNode;

    const producto = {
        id: esteBtn.getAttribute("data-id"),
        imagen: cardPadre.parentNode.children[0].getAttribute("src"),
        nombre: cardPadre.children[0].textContent,
        precio: cardPadre.children[3].children[0].textContent,
        cantidad: 1
    };
    
    addProducto(producto);
};

function addProducto(producto) {
    const existe = arrayCarrito.some(element => element.id === producto.id);
    
    if(existe){
        arrayCarrito.forEach(elemento => {
            if (elemento.id === producto.id) {
                elemento.cantidad++;
            }
        });
    } else arrayCarrito.push(producto);

    actualizarCarrito();
};

function crearElementosTabla() {
    let tbody = ListaCarrito.children[1];
    tbody.innerHTML = "";
    let tr = "";

    arrayCarrito.forEach((elemento) => {
        tr = document.createElement("tr");
        tbody.appendChild(tr).innerHTML =
            `<td><img src="${elemento.imagen}"/></td>` +
            `<td>${elemento.nombre}</td>` +
            `<td>${elemento.precio}</td>` +
            `<td>${elemento.cantidad}</td>` +
            `<td><a href="#" class="borrar-curso" data-id="${elemento.id}">X</a></td>`
    });
};

//Carga de elementos
function cargarPagina() {
    arrayCarrito = JSON.parse(LS.getItem("arrayCarrito")) || [];
    crearElementosTabla();
};

function cargarLocalStorage() {
    LS.setItem("arrayCarrito", JSON.stringify(arrayCarrito));
};

function actualizarCarrito() {
    cargarLocalStorage();
    crearElementosTabla();
};

//Eliminación de elementos
function vaciarCarrito() {
    LS.clear();
    arrayCarrito = [];
    crearElementosTabla();
};

function eliminarElementoCarrito(btnPulsado) {
    let idBoton = btnPulsado.getAttribute("data-id");
    
    arrayCarrito = arrayCarrito.filter((elemento) => elemento.id!==idBoton);
    actualizarCarrito();
};