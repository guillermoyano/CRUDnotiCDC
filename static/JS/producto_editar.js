//RECIBE ->
// id=1&nombre=MICROONDAS&precio=50000&stock=10&imagen=https://picsum.photos/200/300?grayscale

console.log(location.search)     // lee los argumentos pasados a este formulario
var args = location.search.substr(1).split('&');  
//separa el string por los “&” creando una lista
// [“id=3” , “nombre=’tv50’” , ”precio=1200”,”stock=20”]
// console.log('Argumentos Recibidos')
// console.log(args)


var parts = []
for (let i = 0; i < args.length; ++i) {
    // console.log(args[i])
    // console.log(args[i].split('='))
    parts[i] = args[i].split('=');
    // console.log(parts[i])
}
console.log('Resultado For Part')
console.log(parts)

//// [[“id",3] , [“nombre",’tv50’]]
//decodeUriComponent elimina los caracteres especiales que recibe en la URL 
// noticia_editar.html?id='+ noticia.id+
// '&titular=' +noticia.titular+'
// &autor=' +noticia.autor+
// '&fecha=' +noticia.fecha+ 
// '&copete='+noticia.copete+
// '&cuerpo='+noticia.cuerpo +
//   '&imagen='+noticia.imagen">Modificar</a>
document.getElementById("id").value = decodeURIComponent(parts[0][1])
document.getElementById("titular").value = decodeURIComponent(parts[1][1])
document.getElementById("autor").value = decodeURIComponent(parts[2][1])
document.getElementById("fecha").value = decodeURIComponent( parts[3][1])
document.getElementById("copete").value =decodeURIComponent( parts[4][1])
document.getElementById("cuerpo").value =decodeURIComponent( parts[5][1])
document.getElementById("imagen").value =decodeURIComponent( parts[6][1])


function modificar() {
    //(variable === undefined || variable === null)?'Noticia en desarrollo':variable;
    //( === undefined ||  === null)?'Noticia en desarrollo':;
    let id = document.getElementById("id").value
    let t  = document.getElementById("titular").value
    let a  = document.getElementById("autor").value
    let f  = document.getElementById("fecha").value
    let co = document.getElementById("copete").value
    let cu = document.getElementById("cuerpo").value
    let i  = document.getElementById("imagen").value

    let today = new Date().toJSON().slice(0,10);
    
    let noticia = {
        titular: (t === undefined || t === null|| t.length<=0)?'Noticia en desarrollo':t,
        autor: ( a=== undefined ||  a=== null|| a.length<=0)?'Anonimo':a,
        fecha: ( f=== undefined ||  f=== null || f.length<=0)?today:f,
        copete: ( co=== undefined ||  co=== null|| co.length<=0)?'':co,
        cuerpo: ( cu=== undefined ||  cu=== null|| cu.length<=0)?'Noticia en desarrollo':cu,
        imagen: ( i=== undefined ||  i=== null)?'':i
    }
    let url = "https://zorrobsas.pythonanywhere.com/noticias/"+id
    var options = {
        body: JSON.stringify(noticia),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }
    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Registro modificado")
            window.location.href = "./crud.html";  
        //NUEVO,  si les da error el fetch  comentar esta linea que puede dar error  
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al Modificar")
        })      
}