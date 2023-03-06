const button = document.querySelector('button')
const h2 = document.querySelector('h2')
button.addEventListener('click',()=> {
    fetch ('https://api.adviceslip.com/advice')
    .then((response)=> response.json())
    .then((data)=> console.log(data.slip.advice))
});
