document.getElementById("contactForm")
.addEventListener("submit", async function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    const res = await fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Message sent!");
      document.getElementById("contactForm").reset();
    } else {
      alert("❌ Error");
    }

  } catch (err) {
    alert("❌ Server not working");
  }
});