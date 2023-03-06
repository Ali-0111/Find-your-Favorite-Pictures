const key = 'AZTiUtbS1nUrvt4u3UGWvKhTjDKOTbBbrFURaCkP7VJaGrBB4fJB7pwt'
const searchInput = document.querySelector('.search-input')
const searchForm = document.querySelector('.search')
const searchBtn = document.querySelector('.search-btn')
const gallery = document.querySelector('.gallery')

searchForm.addEventListener('submit',(event)=> {
    event.preventDefault()
    searchPhoto(searchInput.value);

})

async function photo() {
    const datafetch = await fetch("https://api.pexels.com/v1/curated?page=2",
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: key
        }
    }
    )
    const data = await datafetch.json()
    data.photos.forEach(element => {
        const img = document.createElement('div');
        img.className = 'gallery-img'
        img.innerHTML = `
        <img class='test' src="${element.src.large}" alt="loading">
        <p>Photo by ${element.photographer}</p>
        `
        gallery.appendChild(img);
    });
}

async function searchPhoto(asks) {
    const datafetch = await fetch(
        `https://api.pexels.com/v1/search?query=${asks}&page=2&per_page=15`,
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: key
        }
    }
    )
    const data = await datafetch.json()
    data.photos.forEach(element => {
        const img = document.createElement('div');
        img.className = 'gallery-img'
        img.innerHTML = `
        <img class='test' src="${element.src.large}" alt="notLoaded">
        <p>Photo by ${element.photographer}</p>
        `
        gallery.appendChild(img);
    });
}

window.onload = ()=> {
    photo()
}
