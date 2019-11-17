const gif_links = {
  A: "/content/A.mp4",
  B: "/content/B.mp4",
  C: "/content/C.mp4"
};
if (document.cookie !== "") {
  const cookie = JSON.parse(document.cookie);
  const userName = cookie.username;
  const options = document.querySelectorAll(".sidebar-option");
  const sessionProgress = 0;
  const locationDetails = String(window.location).split("/");
  const courseName = locationDetails[locationDetails.length - 1];
  const userObject = {
    username: userName,
    courseName: courseName
  };
  let pastProgress = 0;
  const rawReponse = fetch("/progress/fetch_progress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userObject)
  });
  rawReponse
    .then(raw => {
      return raw.json();
    })
    .then(data => {
      pastProgress = data.progress;
      console.log(pastProgress);
      const tabs = document.querySelectorAll(".sidebar-option");
      for (let i = 0; i < pastProgress; i++) {
        tabs[i].classList.add("hoverable");
        tabs[i].classList.add("waves-effect");
        tabs[i].style.justifyContent = "center";
        tabs[i].addEventListener("click", function() {
          const gifContainer = document.querySelector(".gif");
          const option = options[i].innerText;
          gifContainer.setAttribute("src", gif_links[option]);
        });
        //add gif change
      } //making previously accessed options available
      if (pastProgress < data.total) {
        tabs[pastProgress].classList.add("hoverable");
        tabs[pastProgress].classList.add("waves-effect");
        tabs[pastProgress].addEventListener("click", function() {
          const updatedProgress = fetch("/progress/update_progress", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              progress: pastProgress + 1,
              username: userName,
              courseName: courseName
            })
          });
          updatedProgress
            .then(raw => {
              return raw.json();
            })
            .then(response => {
              console.log(response);
              window.location.reload();
              //automatically loads up to the top most option gif
            });
        });
      }
    });

  //disable access to future content forcing the user to move sequentially
  //Under no circumstances should the user be allowed to view content before completing previous stuff
}
