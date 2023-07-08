const newsList = document.getElementById('news-list');

async function onLoad() {
    const url = 'http://127.0.0.1:5000/noticias';
    const options = {
        method: 'GET',
    };

    try {

        await fetch(url, options)
            .then(response => response.json())
            .then(data => setNewsData(data));

    } catch (error) {
        console.error(error);
    }

}
function setNewsData(data) {
    console.log(data);
    data.forEach((article) => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('target', '_blank');
        a.setAttribute('href', 'noticiaGetOne.html?' + article.id);
       // a.setAttribute('onclick','apiNews_GetOne('+article.id+')');
       // a.setAttribute('value', article.id);
        a.textContent = article.titular;

        li.appendChild(a);
        document.getElementById('news-list').appendChild(li);

    })

    document.getElementById("loader").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("back__btn").style.display = "block";
}




