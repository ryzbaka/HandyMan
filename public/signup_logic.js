const signUpButton = document.querySelector(".sign-up-button");
signUpButton.addEventListener("click", () => {
  const fName = document.querySelector("#first-name");
  const lName = document.querySelector("#last_name");
  const uName = document.querySelector("#user-name");
  const pWord = document.querySelector("#password");

  const newUser = {
    firstName: fName.value,
    lastName: lName.value,
    username: uName.value,
    password: pWord.value
  };
  console.log(JSON.stringify(newUser));
  const rawReponse = fetch("/sign_up/send_details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  });
  rawReponse
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });
});
