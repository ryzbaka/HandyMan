if (document.cookie === "") {
  const courseLinks = document.querySelectorAll(".course-link");
  for (let i = 0; i < courseLinks.length; i++) {
    courseLinks[i].innerText = "Sign in to access content";
    courseLinks[i].setAttribute("href", "/sign_in");
  }
} else {
  const courseLinks = document.querySelectorAll(".course-link");
  const courses=['isl-alphabets','basic-words-one','isl-alphabets-two','basic-words-two','food-and-weather']
  for (let i = 0; i < courseLinks.length; i++) {
    courseLinks[i].setAttribute("href",'/learn/'+courses[i]);
  }
}
