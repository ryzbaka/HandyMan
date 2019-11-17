if (document.cookie !== "") {
  const cards = document.querySelectorAll(".card-content");
  const userCookie = JSON.parse(document.cookie);
  const username = userCookie.username;
  for (let i = 0; i < cards.length; i++) {
    const classes = cards[i].classList.value.split(" ");
    const tag = classes[classes.length - 1];
    console.log(tag);
    const progressTag = tag + "-progress";
    const totalTag = tag + "-total";
    const progress = document.querySelector(`.${progressTag}`);
    const total = document.querySelector(`.${totalTag}`);
    const dataKey={
        username:username,
        coursename:tag
    }
    const rawReponse = fetch("/fetch_user_graph", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataKey)
    });
    rawReponse.then(response=>{
        return response.json()
    }).then(data=>{
        console.log(data)
        progress.innerText=`Progress: ${data.progress}`
        total.innerText=`Total: ${data.total}`
    })
    //progress.innerText = "Progress: 12";
    //total.innerText = "Total: 12";
  }
} else {
  window.location.replace("/sign_in");
}
/*
const graphs = document.querySelectorAll(".ldBar");
  for (let i = 0; i < graphs.length; i++) {
    const graphClass = graphs[i].classList.value.split(" ");
    const classLength = graphClass.length;
    const tag = graphClass[classLength - 1];
    const userCookie = JSON.parse(document.cookie);
    const userName=userCookie.username
    const dataKey={
        username:userName,
        coursename:tag
    }
    const rawReponse = fetch("/fetch_user_graph", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataKey)
      });
    rawReponse.then(something=>{
        return something.json()
    }).then(data=>{
        console.log(`Course:${tag}`)
        console.log(`Progress:${data.progress}`)
        console.log(`Total:${data.total}`)
        const percent=(data.progress/data.total)*100
        console.log(`Percent ${percent}`)
        
    })*/
