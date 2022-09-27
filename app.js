
//  fetch para traer los productos

let menu = []

fetch("productos.json").then(res => res.json()).then(data => menu = data)


const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const carritoContenedor = document.getElementById('carrito-contenedor')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

// Vaciar carrito

botonVaciar.addEventListener('click', () => {
    carrito = []
    localStorage.setItem("carrito",[])
    actualizarCarrito()
})


// Por cada producto se presenta un div en el html

fetch("productos.json")
.then((response) => response.json())
.then((data) => data.forEach((producto) => {
    const div = document.createElement("div")
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} id="${producto.id}" alt= "">
    <h2>${producto.nombre}</h2>
    <p class="precioProducto">$${producto.precio}</p>
    `
    contenedorProductos.appendChild(div)
    const boton = document.getElementById(`${producto.id}`)
    boton.addEventListener('click', () => {
        // btn agregar el carrito con el id del producto
        agregarAlCarrito(producto.id)
    })
}))


//AGREGAR AL CARRITO

let encontrado;

const agregarAlCarrito = (prodId) => {
    alerta()
    //para aumentar cantidad y que no se repita
    const existe = carrito.find (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carrito

    // (if) si ya esta en el carrito actualizamos cantidad
    // (else) en caso de que no este, agregamos el producto al carrito
    existe ? (existe.cantidad++) : (encontrado =  menu.find((prod) => prod.id === prodId),

    carrito.push(encontrado)) //Una vez obtenida el ID, hacemos un push para agregarlo al carrito

    actualizarCarrito() 
}

// Eliminar elemento individual del carrito
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busca el elemento que yo le pase y nos devuelve su indice.

    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos un elemento 
    actualizarCarrito()
}

carritoContenedor.addEventListener("click", e => {
    if (e.target.classList.contains("fa-chevron-up")) {
        let id = e.target.dataset.id; 
        let item = carrito.find(prod => prod.id == id);
        item.cantidad++; 
    } else if (e.target.classList.contains("fa-chevron-down")) {
        let id = e.target.dataset.id; 
        let item = carrito.find(prod => prod.id == id);
        item.cantidad-- 
        if (item.cantidad < 1) {
            eliminarDelCarrito() // no funciona
        }
    }
    localStorage.setItem('carrito', JSON.stringify(carrito))
    actualizarCarrito();
})



const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <i class="fa-solid fa-chevron-up" data-id=${prod.id}></i>
        <p id="cantidad"> ${prod.cantidad}</p>
        <i class="fa-solid fa-chevron-down" data-id=${prod.id}></i>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `
        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length // actualizamos con la longitud del carrito.

    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto q recorro en mi carrito, al acumulador le suma precio, y el acumulador empezando en 0.

}


// Alerta del producto agregado al carrito
const alerta = () => Toastify({
    text: `Agregado al carrito`,
    duration: 700,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "white",
      color: "black",
    },
    onClick: function(){} // Callback after click
}).showToast();





