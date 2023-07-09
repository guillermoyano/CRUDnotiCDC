function eliminar() {
    let id = document.getElementById("id").value;
    let url = "https://crud23010.pythonanywhere.com/productos/" + id;  //no sé si esta ruta será la adecuada
    var options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("eliminado");
            alert("Registro eliminado");
            window.location.href = "./productos.html";  //no sé si esta ruta será la adecuada
        })
        .catch(err => {
            console.error(err);
            alert("Error al eliminar");
        });
}