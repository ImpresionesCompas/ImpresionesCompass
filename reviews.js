(() => {
  const whatsappNumber = "5218781280497";
  const stars = document.querySelectorAll(".stars input");
  const starLabels = document.querySelectorAll(".stars label");

  stars.forEach((radio) => radio.addEventListener("change", () => {
    const selected = Number(radio.value);
    starLabels.forEach((label) => {
      label.classList.toggle("is-selected", Number(label.dataset.value) <= selected);
    });
  }));

  document.querySelector("#review-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const name = document.querySelector("#review-name").value.trim();
    const rating = form.querySelector('input[name="estrellas"]:checked').value;
    const message = `Hola, quiero dejar una calificación para Impresiones Compás.\nNombre: ${name}\nCalificación: ${rating} de 5 estrellas.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  });
})();
