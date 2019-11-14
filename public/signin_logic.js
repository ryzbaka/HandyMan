if (document.cookie === "") {
  const signInButton = document.querySelector(".sign-in-button");
  signInButton.addEventListener("click", () => {
    const username = document.querySelector("#user-name").value;
    const password = document.querySelector("#password").value;
    const errorMessage = document.querySelector("#error-message");
    errorMessage.innerText = "Sign In";
    errorMessage.style.backgroundColor = "";
    errorMessage.style.color = "black";
    //this script is for sending the details(if complete) to the API interfacing with mongodb to see if the user is valid and then set a cookie to maintain session
    if (username === "" || password === "") {
      //incomplete information
      errorMessage.innerText = "Missing information.";
      errorMessage.style.color = "white";
      errorMessage.style.backgroundColor = "red";
      return;
    } else {
      //make call to API to validate details
      const userCredentials = {
        username: username,
        password: password
      };
      const rawReponse = fetch("/sign_in/send_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userCredentials)
      });
      rawReponse
        .then(something => {
          return something.json();
        })
        .then(auth_response => {
          errorMessage.innerText = auth_response.message;
          if (auth_response.message === "Authentication successful") {
            errorMessage.style.color = "lightgreen";
            errorMessage.style.backgroundColor = "green";
            document.cookie = JSON.stringify({
              username: userCredentials.username,
              signed_in: true
            });
            return;
          } else {
            errorMessage.style.color = "white";
            errorMessage.style.backgroundColor = "red";
            return;
          }
        });
    }
  });
} else {
  const userInfo = JSON.parse(document.cookie);
  const errorMessage = document.querySelector("#error-message");
  const signInButton = document.querySelector(".sign-in-button");
  signInButton.style.backgroundColor = "grey";
  errorMessage.innerText = `Already signed in as ${userInfo.username}. You can sign out instead.`;
  errorMessage.style.color = "darkyellow";
  errorMessage.style.backgroundColor = "yellow";
  signInButton.innerText = "Sign Out";
  signInButton.addEventListener("click", () => {
    document.cookie = "";
    errorMessage.innerText = "Signed out.";
  });
}
