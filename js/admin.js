import { Serie } from "./serieClass.js";

// traemos los elementos del formulario
let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let imagen = document.getElementById("imagen");
let genero = document.getElementById("genero");
let formulario = document.getElementById("formSerie");

let listaSeries = [];

// Agregar validaciones

formulario.addEventListener("submit", crearSerie)

function crearSerie(e){
    e.preventDefault()
    // Volver a validar todos los campos
    let nuevaSerie = new Serie(codigo.value, titulo.value, descripcion.value, imagen.value, genero.value);
    // Agregamos la serie al final del arreglo
    listaSeries.push(nuevaSerie)
    // limpiamos formulario
    limpiarFormulario()
}

function limpiarFormulario(){
    formulario.reset();
}