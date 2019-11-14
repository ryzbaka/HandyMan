const gif_links={
    'A':"https://giphy.com/embed/JO4n4uibU3i7bylYok",
    'B':"https://giphy.com/embed/MC322ygNOukMKek11X",
    'C':"https://giphy.com/embed/ZCfmErnNWb4yXZ7b8J"
}
const options=document.querySelectorAll('.sidebar-option')
const gifContainer=document.querySelector('.gif')
for(let i=0;i<options.length;i++){
    options[i].classList.add('hoverable')
    options[i].classList.add('waves-effect')
    options[i].style.justifyContent="center"
    options[i].addEventListener('click',function(){
        const option=options[i].innerText
        gifContainer.setAttribute('src',gif_links[option])
    })
}