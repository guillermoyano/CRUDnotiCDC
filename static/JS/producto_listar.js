function listar() {
    let url = "https://crud23010.pythonanywhere.com/productos";  // No sé si esta ruta es correcta
    var options = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(url, options)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al obtener la lista de productos.');
            }
        })
        .then(function (data) {
            // ¿Podemos disponer la forma en que mostramos los datos?
            
            console.log(data);
            
        })
        .catch(function (error) {
            console.error(error);
            alert("Error al obtener la lista de productos.");
        });
}
