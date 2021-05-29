// -------------------------------------------------- Ajax ------------------------------------------------------- //

 // LLAMO AL BOTÓN A TRAVÉS DE SU SELECTOR Y ESCUCHO EL EVENTO CLICK DANDOLE UNA FUNCIÓN //
 document.querySelector(`#botonEventos`).addEventListener(`click`, mostrarDatos);

 // CREO ESA FUNCIÓN //
 function mostrarDatos(){
 // UTILIZO FUNCIONES AJAX PARA LLAMAR A MI ARCHIVO JSON //
 const xhttp = new XMLHttpRequest();
 
     xhttp.open(`GET`, `proximosEventos.json`, true);
 
     xhttp.send();
 
     xhttp.onreadystatechange = function(){        
 // VALIDO Y PARSEO CON JSON //
         if(this.readyState == 4 && this.status == 200){
             let datosDeJason = JSON.parse(this.responseText);
 //LLAMO AL BODY DE LA TABLA A TRAVÉS DE SU SELECTOR PARA AGREGARLE LOS DATOS DEL JSON//
             let datosTabla = document.querySelector(`#datosTabla`)
             datosTabla.innerHTML = ``;
 // CICLO QUE RECORRE JSON PARA AGREGARLE LOS DATOS A MI DIV //
             for(dato of datosDeJason){
               datosTabla.innerHTML += `         
               <tr>
               <td class="parrafoTabla">${dato.numeroDeEvento}</td>
               <td>${dato.fechaDeEvento}</td>
               <td>${dato.ubicacion}</td>
               <td>${dato.precio}</td>
               <td>${dato.estelar}</td>
               </tr>
 
               `
             }          
         }
     }
 } 