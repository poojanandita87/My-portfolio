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
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.querySelector("[name='name']").value;
  const email = document.querySelector("[name='email']").value;
  const message = document.querySelector("[name='message']").value;

  fetch("http://localhost:3000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  })
  .then(res => res.text())
  .then(data => {
    alert("✅ " + data);
  })
  .catch(err => {
    alert("❌ Error");
  });
});