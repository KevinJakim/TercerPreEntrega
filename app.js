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

//Agregamo un evento CLICK al boton de VACIAR//
botonVaciar.addEventListener('click', () => {
    //Establecemos la longitud del array a 0, para vaciar el carrito//
    carrito.length = 0
    //Para actualizar el carrito llamamos a la Funcion de Actualizar Carrito//
    actualizarCarrito()
})

//Utilizamos "ForEach" para buscar sobre cada objeto del array//
stockPrendas.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio: $ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    //Agregamos al contenedor de productos utilizando el método "AppendChild"//
    contenedorProductos.appendChild(div)

    //Creamos una constante para el boton de Agregar el producto al carrito//
    const boton = document.getElementById(`agregar${producto.id}`)

    //Detectamos el CLICK sobre el boton de AGREGAR//
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})

// toma como argumento el ID del producto a agregar al carrito//
const agregarAlCarrito = (prodId) => {

    const existe = carrito.some (prod => prod.id === prodId)

    //La variable verifica si el producto ya está en el carrito.//
    if (existe){
        //Si el producto ya existe en el carrito, se incrementa la cantidad de ese producto en el objeto correspondiente.//
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        //Si el producto no existe en el carrito, se busca en "stockPrendas" el objeto del producto para agregar al carrito.//
        const item = stockPrendas.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    actualizarCarrito()
}

//La función toma como argumento el ID del producto a eliminar del carrito//
const eliminarDelCarrito = (prodId) => {
    //Se busca el objeto correspondiente al producto en el carrito utilizando la función "find"//
    const item = carrito.find((prod) => prod.id === prodId)

    //Se obtiene el índice del objeto correspondiente utilizando la función "indexOf"//
    const indice = carrito.indexOf(item)

    //Se elimina el objeto correspondiente utilizando la función de "splice"//
    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito)
}

//La función de "actualizarCarrito" la utilizamos para actualizar el contenido del carrito en la interfaz.//
const actualizarCarrito = () => {

    //Para borrar el contenido previo del carrito antes de agregar los nuevos elementos usamos el "innerHTML"//
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p> Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        //Para guardar los datos del carrito en el almacenamiento local del navegador se utiliza "LocalStorage", para convertir el array carrito en una cadena JSON que se puede almacenar//
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    //Actualizamos el número del icono del carrito para que muestre la cantidad de productos seleccionados//
    contadorCarrito.innerText = carrito.length

    console.log(carrito)

    //Calculamos y mostramos el precio total del carrito utilizando la función "reduce"//
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}
