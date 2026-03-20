document.getElementById("contactForm")
.addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const btn = document.querySelector("button");
  btn.innerText = "Sending...";
  btn.disabled = true;

  try {
    const res = await fetch("https://my-portfolio-2-46me.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Message sent successfully!");
      document.getElementById("contactForm").reset();
    } else {
      alert("❌ " + data.error);
    }

  } catch (err) {
    alert("❌ Server error");
  } finally {
    btn.innerText = "Send";
    btn.disabled = false;
  }
});

fetch("https://my-portfolio-2-46me.onrender.com/")
  .then(res => res.json())
  .then(data => {
    document.getElementById("status").innerText = data.message;
  })
  .catch(err => {
    document.getElementById("status").innerText = "Error connecting ❌";
  });