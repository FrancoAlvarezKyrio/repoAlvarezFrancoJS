/* ---- Respuesta automática de Formulario con "Fetch" ----- */
let formulario = document.getElementById(`formulario`)
formulario.addEventListener(`submit`, function(e){
    e.preventDefault()
    let nombre = document.getElementById(`nombreForm`).value
    let mail = document.getElementById(`mailForm`).value
    let mensaje = document.getElementById(`mensajeForm`).value

    fetch("https://jsonplaceholder.typicode.com/posts",{
        method: `POST`,
        body: JSON.stringify({
            nombre:nombre,
            mail:mail,
            mensaje:mensaje
        }),
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        let resultadoDeFormulario = document.getElementById(`resultadoFormulario`)
        resultadoDeFormulario.innerHTML = `<p> Perfecto, ${data.nombre}. <br> En breve nos podremos en contacto contigo al correo electrónino ${data.mail}. 
        <br> ¡Muchas gracias! Atte. UFC official store.
         </p>
        `
    })
})

/* ---- Validacion de formulario con "jQuery" ----- */
$ (document).ready(function (){
    $("#botonEnviar").click(function (){
        let nombre = $("#nombreForm").val();
        let correo = $("#mailForm").val();
        let mensaje = $("#mensajeForm").val();

        if(nombre === ""){
            $("#mensaje1").fadeIn();
            return false;
            }else{
            $("#mensaje1").fadeOut();
        if(correo === "") {
                $("#mensaje2").fadeIn();
                return false
            }else{
                $("#mensaje2").fadeOut();            
        if(mensaje === ""){
                $("#mensaje3").fadeIn();
                return false                
            }else{
                $("#mensaje3").fadeOut();
            }
            }
        } 
    })
}) 