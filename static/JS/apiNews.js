const apiKey = '-9MTuUSK0I8mYdLb-x6lC0tDiZvKHBlIbpQu2420tuo';
const input = "ciudad argentina buenos aires";
const newsList = document.getElementById('news-list');


async function onLoad() {
    const url = 'https://news-api14.p.rapidapi.com/top-headlines?country=AR&language=%20es-419&pageSize=10&sortBy=timestamp';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e9fc51bdd9msh85cb0b34bdb93a3p1133cdjsn7c55bf4fa9d5',
            'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
        }
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
    data.articles.forEach((article) => {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', article.url);
        a.setAttribute('target', '_blank');
        a.textContent = article.title;

        li.appendChild(a);
        document.getElementById('news-list').appendChild(li);

    })

    document.getElementById("loader").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("back__btn").style.display = "block";
}

