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
  //validating form
  const userIn = document.querySelector("#user-name");
  userIn.style.backgroundColor = "";
  const errorBtn = document.querySelector("#error-message");
  errorBtn.innerText = "Sign Up";
  errorBtn.style.backgroundColor = "";
  let flag = 0;
  features = Object.keys(newUser);
  features.forEach((item, index) => {
    if (newUser[item] === "") {
      flag = 1;
    }
  });
  if (flag == 1) {
    const errorBtn = document.querySelector("#error-message");
    errorBtn.innerText = "MISSING VALUES";
    errorBtn.style.backgroundColor = "red";
    errorBtn.style.color = "white";
    return;
  }
  flag = 0;
  const checkValid = fetch(`/sign_up/get_details/${newUser.username}`);
  checkValid
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.length === 0) {
        const rawReponse = fetch("/sign_up/send_details", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newUser)
        });
        const errorBtn = document.querySelector("#error-message");
        errorBtn.style.backgroundColor = "green";
        errorBtn.style.color = "lightgreen";
        errorBtn.innerText = "Account created successfully";
        return;
      } else {
        const userIn = document.querySelector("#user-name");
        userIn.style.backgroundColor = "red";
        const errorBtn = document.querySelector("#error-message");
        errorBtn.innerText = "Username already in use!";
        errorBtn.style.backgroundColor = "red";
        errorBtn.style.color = "white";
        return;
      }
    });
});
//
//rawReponse
//  .then(function(response) {
//    return response.json();
//  })
//.then(function(data) {
//  console.log(data);
//});
