const form = document.querySelector("#input");

async function sendData() {
  
  const formData = new FormData(form);

  const formDataArray = Array.from(formData);
console.log(formDataArray);

  try {
    const response = await fetch("https://example.org/post", {
      method: "POST",
      
      body: formData,
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}


form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});
