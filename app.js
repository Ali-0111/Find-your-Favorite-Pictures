const key = 'AZTiUtbS1nUrvt4u3UGWvKhTjDKOTbBbrFURaCkP7VJaGrBB4fJB7pwt';
const searchInput = document.querySelector('.search-input');
const searchForm = document.querySelector('.search');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.more-btn');
let isSearched = false;
let searchedWord;
let counter = 1;

function generateImgFromData(data) {
  data.photos.forEach((element) => {
    const img = document.createElement('div');
    img.className = 'gallery-img';
    img.innerHTML = `
          <div class="flex-row download">
          <p>Photo by ${element.photographer}</p>
          <a href="${element.src.original}" target="_blank">
          Download
          </a>
          </div>
          <img class='test' src="${element.src.large}" alt="loading">
          `;
    gallery.appendChild(img);
  });
}

async function fetchApi(url) {
  const datafetch = await fetch(url,
    {
      headers: {
        Authorization: key,
      },
    });
  const data = await datafetch.json();
  return data;
}

async function createMorePhoto() {
  let data;
  counter += 1;
  if (!isSearched) {
    data = await fetchApi(`https://api.pexels.com/v1/curated?page=${counter}`);
  } else {
    data = await fetchApi(
      `https://api.pexels.com/v1/search?query=${searchedWord}&page=${counter}`,
    );
  }
  generateImgFromData(data);
}

async function photo() {
  const data = await fetchApi('https://api.pexels.com/v1/curated?page=1');
  generateImgFromData(data);
}

function clear() {
  gallery.innerHTML = '';
  searchInput.value = '';
}

function isSearchedAction(asks) {
  isSearched = true;
  searchedWord = asks;
  counter = 1;
}

async function searchPhoto(asks) {
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${asks}&page=1`,
  );
  clear();
  generateImgFromData(data);
  isSearchedAction(asks);
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  searchPhoto(searchInput.value);
});

moreBtn.addEventListener('click', createMorePhoto);

window.onload = () => {
  photo();
};
