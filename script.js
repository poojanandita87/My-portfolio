document.getElementById("contactForm")
.addEventListener("submit", async function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const message = document.getElementById("message").value;

await fetch("/contact",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({name,email,message})

});

alert("Message sent!");

});
const skills = document.querySelectorAll('.skill');

skills.forEach(skill => {
  const percentEl = skill.querySelector('.percent');
  const value = parseInt(percentEl.getAttribute('data-value'));
  let count = 0;
  const interval = setInterval(() => {
    if (count >= value) {
      clearInterval(interval);
    } else {
      count++;
      percentEl.textContent = count + '%';
    }
  }, 20); // adjust speed here
});