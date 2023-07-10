function guardar() {
    let t = document.getElementById("titular").value
    let a = document.getElementById("autor").value
    let f = document.getElementById("fecha").value
    let co = document.getElementById("copete").value
    let cu = document.getElementById("cuerpo").value
    let i = document.getElementById("imagen").value

    let today = new Date().toJSON().slice(0,10);
    
    let noticia = {
        titular: (t === undefined || t === null|| t.length<=0)?'Noticia en desarrollo':t,
        autor: ( a=== undefined ||  a=== null|| a.length<=0)?'Anonimo':a,
        fecha: ( f=== undefined ||  f=== null || f.length<=0)?today:f,
        copete: ( co=== undefined ||  co=== null|| co.length<=0)?'':co,
        cuerpo: ( cu=== undefined ||  cu=== null|| cu.length<=0)?'Noticia en desarrollo':cu,
        imagen: ( i=== undefined ||  i=== null)?'':i
    }

    let url = "https://zorrobsas.pythonanywhere.com/noticias"
    var options = {
        body: JSON.stringify(noticia),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            // Devuelve el href (URL) de la página actual
            window.location.href = "./crud.html";  
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}
