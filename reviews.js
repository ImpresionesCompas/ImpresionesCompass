(() => {
  const storageKey = "impresiones-compas-reviews-v1";
  const form = document.querySelector("#review-form");
  const list = document.querySelector("#reviews-list");
  const radios = document.querySelectorAll(".stars input");
  const labels = document.querySelectorAll(".stars label");

  if (!form || !list) return;

  const readReviews = () => {
    try {
      const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  };

  const saveReviews = (reviews) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews.slice(0, 20)));
    } catch {
      return false;
    }
    return true;
  };

  const renderReviews = () => {
    const reviews = readReviews();
    list.replaceChildren();
    if (!reviews.length) {
      const empty = document.createElement("p");
      empty.className = "reviews-empty";
      empty.textContent = "Aún no hay calificaciones guardadas en este navegador.";
      list.append(empty);
      return;
    }

    reviews.forEach((review) => {
      const card = document.createElement("article");
      card.className = "review-card";
      const name = document.createElement("strong");
      name.textContent = review.name;
      const stars = document.createElement("span");
      stars.className = "review-stars";
      stars.setAttribute("aria-label", `${review.rating} de 5 estrellas`);
      stars.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
      card.append(name, stars);
      if (review.comment) {
        const comment = document.createElement("p");
        comment.className = "review-comment";
        comment.textContent = review.comment;
        card.append(comment);
      }
      list.append(card);
    });
  };

  radios.forEach((radio) => radio.addEventListener("change", () => {
    const selected = Number(radio.value);
    labels.forEach((label) => {
      label.classList.toggle("is-selected", Number(label.dataset.value) <= selected);
    });
  }));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = document.querySelector("#review-name").value.trim();
    const comment = document.querySelector("#review-comment").value.trim();
    const selected = form.querySelector('input[name="estrellas"]:checked');
    if (!name || !comment || !selected) return;

    const reviews = readReviews();
    reviews.unshift({ name, rating: Number(selected.value), comment });
    saveReviews(reviews);
    form.reset();
    labels.forEach((label) => label.classList.remove("is-selected"));
    renderReviews();
  });

  renderReviews();
})();
