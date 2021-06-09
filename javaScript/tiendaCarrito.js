/* -- Tienda y carrito -- */
const cards = document.getElementById(`cards`)
const items = document.getElementById(`items`)
const footerCarrito = document.getElementById(`footerCarrito`)
const templateCard = document.getElementById(`templateCard`).content
const templateFooter = document.getElementById(`templateFooter`).content
const templateCarrito = document.getElementById(`templateCarrito`).content
const fragment = document.createDocumentFragment()
let carrito = {}

/* -- Event Listeners -- */
document.addEventListener(`DOMContentLoaded`, () => {
    fetchData()
    if (localStorage.getItem(`carrito`)){
        // Agrego al LocalStorage 
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        pintarCarrito()
    }
})
cards.addEventListener(`click`, e => {
    addCarrito(e)
})
items.addEventListener(`click`, e =>{
    btnAccion(e)
})

/* -- Traigo productos con Fetch -- */
const fetchData = async () => {
    try{
        const res = await fetch(`JSON/productosTienda.json`)
        const data = await res.json()
        pintarCards(data)
    } catch (error) {
        console.log(error)
    }
}

/* -- Pinto productos en tienda -- */
const pintarCards = data => {
    data.forEach(producto =>{
        templateCard.querySelector(`h3`).textContent = producto.nombre
        templateCard.querySelector(`h5`).textContent = producto.precio
        templateCard.querySelector(`p`).textContent = producto.talle  
        templateCard.querySelector(`.color`).textContent = producto.color    
        templateCard.querySelector(`img`).setAttribute("src", producto.imagen)
        templateCard.querySelector(`.btn-dark`).dataset.id = producto.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

/* -- Pinto productos en carrito -- */
const addCarrito = e => {
    if(e.target.classList.contains(`btn-dark`)){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {

    const producto = {
        id: objeto.querySelector(`.btn-dark`).dataset.id,
        nombre: objeto.querySelector(`h3`).textContent,
        precio: objeto.querySelector(`h5`).textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    pintarCarrito()
}

const pintarCarrito = () => {
   items.innerHTML = ``
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector(`th`).textContent = producto.id
        templateCarrito.querySelectorAll(`td`)[0].textContent = producto.nombre
        templateCarrito.querySelectorAll(`td`)[1].textContent = producto.cantidad
        templateCarrito.querySelector(`span`).textContent = producto.cantidad * producto.precio
        templateCarrito.querySelector(`.btn-info`).dataset.id = producto.id
        templateCarrito.querySelector(`.btn-danger`).dataset.id = producto.id
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
    pintarFooter()
    // Agrego al LocalStorage 
    localStorage.setItem(`carrito`, JSON.stringify(carrito))
}

/* -- Sumar y restar productos -- */
const btnAccion = e => {

    if(e.target.classList.contains(`btn-info`)) {
        const producto =  carrito[e.target.dataset.id]
        producto.cantidad ++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()    
    }
    if(e.target.classList.contains(`btn-danger`)) {
        const producto =  carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        pintarCarrito()
    }
    e.stopPropagation()
}

/* -- Pinto total en footer -- */
const pintarFooter = () => {
    footerCarrito.innerHTML = ``
    if(Object.keys(carrito).length === 0){
        footerCarrito.innerHTML = `

        <th scope="row" colspan="5">Carrito vacío - Puede comenzar a comprar !</th>
        
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad,precio}) => acc + cantidad * precio,0) 

    templateFooter.querySelectorAll(`td`)[0].textContent = nCantidad
    templateFooter.querySelector(`span`).textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footerCarrito.appendChild(fragment)

    const btnVaciar = document.getElementById(`vaciar-carrito`)
    btnVaciar.addEventListener(`click`, () =>{
        // Confirmar compra
        let confirmacion = prompt("¿Está seguro que desea finalizar la compra?");

        if(confirmacion === "Si" || confirmacion === "si"){
            carrito = {}
        } else {
            alert("Puede seguir comprando")
        }        
        pintarCarrito()
    })
}


