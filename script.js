document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  function activate(tabName) {
    tabButtons.forEach((btn) => {
      const isActive = btn.dataset.tab === tabName;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    });
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === tabName);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => activate(btn.dataset.tab));
  });

  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", () => activate(el.dataset.goto));
  });

  // Product "how to use" modal
  const productInfo = {
    original: {
      icon: "🐉",
      name: "Original",
      accent: "#b3311f",
      tagline: "The blend that started it all — balanced, savory, and endlessly versatile.",
      usage: "An all-purpose everyday seasoning. Sprinkle on eggs, roasted vegetables, popcorn, or french fries. Great as a base rub on chicken or steak before grilling, or stirred into rice and soups for an easy flavor boost."
    },
    asian: {
      icon: "🥢",
      name: "Asian Seasoning",
      accent: "#c2703a",
      tagline: "Ginger, garlic, and umami-forward notes inspired by East Asian flavor profiles.",
      usage: "Toss with stir-fried vegetables, noodles, or fried rice. Rub onto chicken, pork, or tofu before pan-searing. Also great mixed into dipping sauces or sprinkled over dumplings and edamame."
    },
    mexican: {
      icon: "🌮",
      name: "Mexican Seasoning",
      accent: "#d99a3d",
      tagline: "Smoky chili and bold spice, built for tacos, grilled corn, and everything in between.",
      usage: "Season ground beef or chicken for tacos and burritos. Sprinkle on grilled corn, black beans, or roasted potatoes. Mix into guacamole or salsa for an extra kick, or use as a rub before grilling fajita meat."
    },
    spicy: {
      icon: "🔥",
      name: "Spicy Seasoning",
      accent: "#8f1d1d",
      tagline: "For the heat-seekers — all the Dragon Dust flavor with a serious kick.",
      usage: "Use anywhere you want extra heat: wings, grilled meats, or roasted nuts. Sprinkle over pizza or eggs for a spicy finish. Start light and add more to taste — this one packs a punch."
    },
    indian: {
      icon: "🍛",
      name: "Indian Seasoning",
      accent: "#a8541f",
      tagline: "Warm cumin, coriander, and curry spices layered for a rich, aromatic finish.",
      usage: "Stir into simmering curries, lentils, or rice dishes. Rub onto chicken or cauliflower before roasting. Also good whisked into yogurt for a quick marinade or dip."
    },
    bbq: {
      icon: "🍖",
      name: "BBQ Seasoning",
      accent: "#7a4a1f",
      tagline: "Sweet, smoky, and rich — rub it on before the grill does its thing.",
      usage: "Rub generously onto ribs, brisket, or chicken before smoking or grilling. Sprinkle on burgers, roasted corn, or baked beans. Mix into homemade barbecue sauce for extra depth."
    }
  };

  const modal = document.getElementById("product-modal");
  const modalClose = document.getElementById("modal-close");
  const modalBadge = document.getElementById("modal-badge");
  const modalTitle = document.getElementById("modal-title");
  const modalTagline = document.getElementById("modal-tagline");
  const modalUsage = document.getElementById("modal-usage");

  function openModal(key) {
    const info = productInfo[key];
    if (!info) return;
    modalBadge.textContent = info.icon;
    modalBadge.style.setProperty("--accent", info.accent);
    modalTitle.textContent = info.name;
    modalTagline.textContent = info.tagline;
    modalUsage.textContent = info.usage;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.product));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.dataset.product);
      }
    });
  });

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
