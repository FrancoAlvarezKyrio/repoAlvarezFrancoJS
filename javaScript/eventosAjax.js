// ---- Traigo tabla de Próximos eventos con AJAX---- //
 document.querySelector(`#botonEventos`).addEventListener(`click`, mostrarDatos);
 function mostrarDatos(){
 const xhttp = new XMLHttpRequest();
 
     xhttp.open(`GET`, `JSON/proximosEventos.json`, true);
     xhttp.send();
     xhttp.onreadystatechange = function(){        

         if(this.readyState == 4 && this.status == 200){
             let datosDeJason = JSON.parse(this.responseText);
             let datosTabla = document.querySelector(`#datosTabla`)
             datosTabla.innerHTML = ``;

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