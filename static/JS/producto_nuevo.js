function guardar() {
    let t = document.getElementById("titular").value
    let a = document.getElementById("autor").value
    let f = document.getElementById("fecha").value
    let co = document.getElementById("copete").value
    let cu = document.getElementById("cuerpo").value
    let i = document.getElementById("imagen").value

    // {
    //     "imagen": "https://picsum.photos/200/300?grayscale",
    //     "nombre": "MICROONDAS",
    //     "precio": 50000,
    //     "stock": 10
    //   }

    let producto = {
        titular: t,
        autor: a,
        fecha: f,
        copete: co,
        cuerpo: cu,
        imagen: i
        
    }
    let url = "https://crud23010.pythonanywhere.com/productos"
    var options = {
        body: JSON.stringify(producto),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            // Devuelve el href (URL) de la página actual
            window.location.href = "./productos.html";  
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}
