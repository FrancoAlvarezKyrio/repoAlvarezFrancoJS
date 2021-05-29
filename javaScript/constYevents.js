const cards = document.getElementById(`cards`)
const items = document.getElementById(`items`)
const footerCarrito = document.getElementById(`footerCarrito`)
const templateCard = document.getElementById(`templateCard`).content
const templateFooter = document.getElementById(`templateFooter`).content
const templateCarrito = document.getElementById(`templateCarrito`).content
const fragment = document.createDocumentFragment()
let carrito = {}

document.addEventListener(`DOMContentLoaded`, () => {
    fetchData()
    if (localStorage.getItem(`carrito`)){
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
