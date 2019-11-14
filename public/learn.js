if(document.cookie===''){
 const courseLinks=document.querySelectorAll('.course-link')
 for(let i=0;i<courseLinks.length;i++){
     courseLinks[i].innerText="Sign in to access content"
     courseLinks[i].setAttribute('href','/sign_in')
 }   
}
