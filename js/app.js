//  Verificar si hay datos en el localStorage
let listaSerie = JSON.parse(localStorage.getItem("listaSeriesKey")) || [];

// Si hay datos dibujar las cards
listaSerie.forEach((serie)=>{
    crearColumna(serie);
})

function crearColumna(serie) {
    let grillaSeries = document.getElementById("grillaSeries");
    grillaSeries.innerHTML += `
        <article class="col-12 col-md-4 col-lg-3 mb-3">
            <div class="card">
                <img src="${serie.imagen}" class="card-img-top" alt="${serie.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${serie.titulo}</h5>
                    <a href="#" class="btn btn-primary">Ver Detalle</a>
                </div>
            </div>
        </article>
    `
}