const newsTitle = document.getElementById('title');
const newsCopete = document.getElementById('copete');
const newsCuerpo = document.getElementById('cuerpo');
const newsImg = document.getElementById('img');

const {
    host, hostname, href, origin, pathname, port, protocol, search
} = window.location
//a href="#" class="leftlinks" onclick="updateParent(control)" id="2" value="2">CLICK HERE</a>
const idNoticia = search.replace('?', '');
async function onLoad() {
    const url = 'http://127.0.0.1:5000/noticias/'+idNoticia  ;
    const options = {
        method: 'GET',
    };

    try {

        await fetch(url, options)
            .then(response => response.json())
            .then(data => setNewsPageData(data));

    } catch (error) {
        console.error(error);
    }

}
//  titulo <h2>Crecimiento de las terrazas verdes en la Ciudad</h2>
// copete   <br><b>¿Cuáles son los beneficios y los aportes para el medioambiente?</b><br>
//<br>De acuerdo a la información publicada en el Gobierno de la Ciudad de Buenos Aires, otras de
// las contribuciones de estos espacios se encuentran ligadas al favorecimiento de la
// biodiversidad; al menor consumo energético de la vivienda; a la retención del agua pluvial;
// entre otros.<br>
// image <img src="/IMG/fotox.jpg" alt="Imagen no Disponible">

function setNewsPageData(data) {
    console.log(data);
    
        let h2 = document.createElement('h2') ;
        h2.innerHTML = data.titular;
        document.getElementById('title').appendChild(h2);

        let br = document.createElement('br') ;
        let b  = document.createElement('b') ;
        b.innerHTML = data.newsCopete
        br.appendChild(b);    
        document.getElementById('copete').appendChild(br);

        let p = document.createElement('p')
        p.innerHTML = data.cuerpo;
        document.getElementById('cuerpo').appendChild(p);

        let img = document.createElement('img')
        img.setAttribute('src', data.imagen);
        img.setAttribute( 'alt','Imagen no Disponible');
        document.getElementById('img').appendChild(img);

        // let a = document.createElement('a');
        // a.setAttribute('href', 'test.html');
        // a.setAttribute('target', '_blank');
        // a.textContent = article.titular;

        // li.appendChild(a);
        // document.getElementById('news-list').appendChild(li);

    

    
}




