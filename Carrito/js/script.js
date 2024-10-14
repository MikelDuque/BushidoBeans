//VARIABLES
const LS = localStorage;
let arrayCarrito = []; 

const listaCursos = document.querySelector("#lista-cursos");
const carrito = document.querySelector("#carrito")
const ListaCarrito = document.querySelector("#lista-carrito");


//FUNCIONALIDAD BASICA
cargarPagina();
listaCursos.addEventListener("click", comprobarBoton);
carrito.addEventListener("click", comprobarBotonCarrito);


//FUNCIONES

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
}

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