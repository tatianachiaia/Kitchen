// let menu = [
//     {id: 1, nombre: "Avo Toast", cantidad: 1, precio: 1000,  img: './img/toast.jpg'},
//     {id: 2, nombre: "Burrito", cantidad: 1, precio: 1100, img: './img/burrito.jpg'},
//     {id: 3, nombre: "Sopa", cantidad: 1, precio: 900, img: './img/soup.jpg'},
//     {id: 4, nombre: "Salmon", cantidad: 1, precio: 2400, img: './img/salmon.jpg'},
//     {id: 5, nombre: "Ensalada", cantidad: 1, precio: 1200, img: './img/salad.jpg'},
//     {id: 6, nombre: "Pizza", cantidad: 1, precio: 1500, img: './img/pizza.jpg'},
//     {id: 7, nombre: "Pasta", cantidad: 1,  precio: 1000, img: './img/pasta.jpg'},
//     {id: 8, nombre: "Carne", cantidad: 1,  precio: 2200, img: './img/steak.jpg'},
//     {id: 9, nombre: "Lasagna", cantidad: 1,  precio: 1500, img: './img/lasagna.jpg'},
//     {id: 10, nombre: "Burger", cantidad: 1,  precio: 1100, img: './img/burger.jpg'},
//     {id: 11, nombre: "Brownie", cantidad: 1,  precio: 900, img: './img/brownie.jpg'},
//     {id: 12, nombre: "cheesecake", cantidad: 1,  precio: 950, img: './img/cake.jpg'},
// ]


const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


// por cada producto se presenta un div en el html

// menu.forEach((producto) => {
//     const div = document.createElement('div')
//     div.classList.add('producto')
//     div.innerHTML = `
//     <img src=${producto.img} id="${producto.id}" alt= "">
//     <h2>${producto.nombre}</h2>
//     <p class="precioProducto">$${producto.precio}</p>`
//     contenedorProductos.appendChild(div)

//     const boton = document.getElementById(`${producto.id}`)
   
//     boton.addEventListener('click', () => {
//         // btn agregar el carrito con el id del producto
//         agregarAlCarrito(producto.id)
//     })
// })



///// fetch (generando lo mismo que arriba pero con fetch)

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

///////////



//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {
    alert()
    //para aumentar cantidad y que no se repita
    const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carrito

    if (existe){ //si ya esta en el carrito actualizamos cantidad
        const prod = carrito.map (prod => { 
            // encuentra cual es el que esta agregado, y le suma la cantidad
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else { //en caso de que no este, agregamos el producto al carrito
        const item = fetch("productos.json") // (antes de fetch iba: menu.find)
        .then((response) => response.json())
        .then((data) => data.find((prod) => prod.id === prodId))
        //Una vez obtenida el ID, hacemos un push para agregarlo al carrito
        carrito.push(item)
    }
    //Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito
    actualizarCarrito() 
}


const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.

    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos un elemento 
    actualizarCarrito()
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
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
const alert = () => Toastify({
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