const gif_links={
    'A':"https://giphy.com/embed/USmkES7qttoxW8MNT5",
    'B':"https://giphy.com/embed/lTdmiZp1gHv97700bl",
    'C':"https://giphy.com/embed/RIqyULVUeUkMXW35b8"
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