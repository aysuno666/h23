
const FEEDBACK_FORM = document.querySelector("#form");

function sendFeedback(feedback) {
  fetch("/api/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feedback),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Форма успешно отправлена!");
    })
    .catch((error) => {
      alert("Произошла ошибка. Пожалуйста, попробуйте еще раз.");
    });
}

FEEDBACK_FORM.addEventListener("submit", (e) => {
  e.preventDefault();
  const feedbackFormData = new FormData(e.target);
  const feedback = Object.fromEntries(feedbackFormData);
  e.target.reset()
  
  sendFeedback(feedback);
});
