import { Serie } from "./serieClass.js";
import { cantidadCaracteres, validacionNombre, validacionURL } from "./validaciones.js";

// traemos los elementos del formulario
let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let imagen = document.getElementById("imagen");
let genero = document.getElementById("genero");
let formulario = document.getElementById("formSerie");
const modalAdminSerie = new bootstrap.Modal(document.getElementById("modalSerie"));
let btnCrearSerie = document.getElementById("btnCrearSerie");

// Si hay algo en localStorage Traer datos, Si no hay nada listaSeries tiene que ser un arreglo vacio "[]"
let listaSeries = JSON.parse(localStorage.getItem("listaSeriesKey")) || [];

// Agregar validaciones
titulo.addEventListener("blur",()=>{validacionNombre(titulo)});
descripcion.addEventListener("blur",()=> {cantidadCaracteres(10,400,descripcion)});
imagen.addEventListener("blur",()=> {validacionURL(imagen)});
btnCrearSerie.addEventListener("click", ()=>{
    limpiarFormulario();
    modalAdminSerie.show();
})
//Verifica si hay datos para dibujar en la tabla
cargaInicial();

formulario.addEventListener("submit", crearSerie)

function crearSerie(e){
    e.preventDefault()
    // Volver a validar todos los campos
    let nuevaSerie = new Serie(codigo.value, titulo.value, descripcion.value, imagen.value, genero.value);
    // Agregamos la serie al final del arreglo
    listaSeries.push(nuevaSerie);
    // limpiamos formulario
    limpiarFormulario();
    // Guardar la lista de series en localStorage
    guardarListaSeries();
    // Cerrar modal que administra series
    modalAdminSerie.hide();
    // mostrar cartel al usuario
    Swal.fire(
        'Serie Creada!',
        'La serie fue creada correctamente',
        'success'
    );
    // Crear o dibujar fila en la tabla
    crearFila(nuevaSerie)
}

function limpiarFormulario(){
    formulario.reset();
    // Si usamos la clases isvalid o isInvalid de bootstrap hay que resetearlas
}

function guardarListaSeries(){
    localStorage.setItem("listaSeriesKey", JSON.stringify(listaSeries));
}

function cargaInicial(){
    if (listaSeries.length > 0) {
        // Dibujar tabla
        listaSeries.forEach((itemSerie)=>{crearFila(itemSerie)});
    }
}

function crearFila(itemSerie) {
    let tablaSeries = document.getElementById("listaSeries");
    tablaSeries.innerHTML += `
    <tr>
        <th scope="row">${itemSerie.codigo}</th>
        <td class="text-truncate">${itemSerie.titulo}</td>
        <td class="text-truncate">${itemSerie.descripcion}</td>
        <td class="text-truncate">${itemSerie.imagen}</td>
        <td>${itemSerie.genero}</td>
        <td>
            <button class="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
            <button class="btn btn-danger" onclick="borrarProducto('${itemSerie.codigo}')"><i class="bi bi-x-square"></i></button>
        </td>
    </tr>
    `;
}

window.borrarProducto = function (codigo) {
    console.log(codigo)
    // Preguntar al usuario si estoy seguro de borrar
    Swal.fire({
        title: 'Estas seguro de eliminar la serie?',
        text: "No podras volver atras!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar la serie!',
        cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Borrar la listaSeries y tambien del localStorage

                // Actualizar la tabla

                // Mostrar cartel de operacion exitosa
            Swal.fire(
                'Borrado!',
                'La serie fue borrada.',
                'success'
            )
            }
        })

}