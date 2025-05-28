const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

let formData = {
  email: "",
  message: ""
};

const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
    
  try {
    const parsed = JSON.parse(saved);
    formData = { ...formData, ...parsed };
    form.elements.email.value = parsed.email || "";
    form.elements.message.value = parsed.message || "";
       
  } catch (error) {
    console.error("Помилка при читанні з localStorage:", error);
  }
}

form.addEventListener("input", event => {

  const { name, value } = event.target;
  formData[name] = value.trim(); // оновлюємо тільки одне поле
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});


form.addEventListener("submit", event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  console.log(formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
});
