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

// Si hay algo en localStorage Traer datos, Si no hay nada listaSeries tiene que ser un arreglo vacio "[]"
let listaSeries = JSON.parse(localStorage.getItem("listaSeriesKey")) || [];

// Agregar validaciones
titulo.addEventListener("blur",()=>{validacionNombre(titulo)});
descripcion.addEventListener("blur",()=> {cantidadCaracteres(10,400,descripcion)});
imagen.addEventListener("blur",()=> {validacionURL(imagen)});

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

}

function limpiarFormulario(){
    formulario.reset();
    // Si usamos la clases isvalid o isInvalid de bootstrap hay que resetearlas
}

function guardarListaSeries(){
    localStorage.setItem("listaSeriesKey", JSON.stringify(listaSeries));
}