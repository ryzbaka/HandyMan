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
