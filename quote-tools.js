(() => {
  const whatsappNumber = "5218781280497";
  const quoteForm = document.querySelector("#quote-form");
  const product = document.querySelector("#quote-product");
  const quantity = document.querySelector("#quote-quantity");
  const width = document.querySelector("#quote-width");
  const height = document.querySelector("#quote-height");
  const design = document.querySelector("#quote-design");
  const date = document.querySelector("#quote-date");
  const notes = document.querySelector("#quote-notes");
  const file = document.querySelector("#quote-file");
  const estimate = document.querySelector("#quote-estimate");
  const detail = document.querySelector("#quote-detail");
  const dimensionFields = document.querySelectorAll(".dimension-field");
  const productNames = {
    lona: "Lona",
    vinil: "Vinil o rotulación",
    papeleria: "Papelería, tarjetas o copias",
    personalizado: "Playera, taza o personalizado",
    otro: "Otro producto"
  };
  const money = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

  const updateEstimate = () => {
    if (!product) return;
    const isLona = product.value === "lona";
    dimensionFields.forEach((field) => field.hidden = product.value && !isLona);
    width.required = isLona;
    height.required = isLona;

    if (!product.value) {
      estimate.textContent = "Selecciona un producto";
      detail.textContent = "El precio final se confirma después de revisar materiales, archivos y dificultad del diseño.";
      return;
    }

    if (isLona) {
      const area = Number(width.value) * Number(height.value);
      const pieces = Math.max(1, Number(quantity.value) || 1);
      if (area > 0) {
        estimate.textContent = money.format(area * 120 * pieces);
        detail.textContent = `${area.toFixed(2)} m² × ${pieces} pieza(s) × $120. Diseño y acabados adicionales se cotizan por separado.`;
      } else {
        estimate.textContent = "Ingresa las medidas";
        detail.textContent = "Calcularemos el área de la lona a $120 por m².";
      }
    } else {
      estimate.textContent = "Precio por confirmar";
      detail.textContent = "Prepararemos tu solicitud y confirmaremos el precio por WhatsApp.";
    }
  };

  [product, quantity, width, height].forEach((field) => field?.addEventListener("input", updateEstimate));
  updateEstimate();

  quoteForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const lines = [
      "Hola, quiero solicitar una cotización.",
      `Producto: ${productNames[product.value] || product.value}`,
      `Cantidad: ${quantity.value}`
    ];
    if (product.value === "lona") {
      const area = Number(width.value) * Number(height.value);
      lines.push(`Medidas: ${width.value} m × ${height.value} m`);
      lines.push(`Estimado de lona: ${money.format(area * 120 * Math.max(1, Number(quantity.value) || 1))}`);
    }
    lines.push(`Diseño: ${design.value}`);
    if (date.value) lines.push(`Fecha requerida: ${date.value}`);
    if (notes.value.trim()) lines.push(`Detalles: ${notes.value.trim()}`);
    if (file.files[0]) lines.push(`Archivo para adjuntar en el chat: ${file.files[0].name}`);
    lines.push("Entiendo que el precio final se confirma después de revisar el proyecto.");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  });

  const stars = document.querySelectorAll(".stars input");
  const starLabels = document.querySelectorAll(".stars label");
  stars.forEach((radio) => radio.addEventListener("change", () => {
    const selected = Number(radio.value);
    starLabels.forEach((label) => label.classList.toggle("is-selected", Number(label.dataset.value) <= selected));
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
