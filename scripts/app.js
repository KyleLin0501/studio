async function loadSiteData() {
  const response = await fetch("data/site-content.json");
  if (!response.ok) {
    throw new Error(`Failed to load site-content.json: ${response.status}`);
  }

  return await response.json();
}

function renderLoadError(error) {
  console.error(error);

  document.body.innerHTML = `
    <div style="min-height:100vh;display:grid;place-items:center;padding:24px;font-family:'Noto Sans TC',sans-serif;background:#f6f0e7;color:#182228;">
      <div style="max-width:720px;padding:32px;border:1px solid rgba(24,34,40,0.12);border-radius:24px;background:#ffffff;box-shadow:0 16px 36px rgba(24,34,40,0.08);">
        <p style="margin:0 0 12px;font-size:0.9rem;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#925b2a;">Data Load Error</p>
        <h1 style="margin:0 0 16px;font-size:2rem;line-height:1.3;">無法載入網站內容 JSON</h1>
        <p style="margin:0;line-height:1.8;">請確認你是透過本機伺服器開啟網站，且 <code>data/site-content.json</code> 路徑與 JSON 格式都正確。</p>
        <pre style="margin:20px 0 0;padding:16px;border-radius:16px;background:#f4efe6;overflow:auto;white-space:pre-wrap;">${String(error.message)}</pre>
      </div>
    </div>
  `;
}

const CONTACT_FORM_CONFIG = {
  web3FormsAccessKey: "5f3c4f91-ac34-44d6-ae0d-12e23bbc4f93",
  minSubmitDelayMs: 4000,
  rateLimitWindowMs: 10 * 60 * 1000,
  rateLimitMaxAttempts: 3
};

function renderServices(services) {
  const container = document.querySelector("#section-services-grid");
  container.innerHTML = services
    .map(
      (service) => `
        <article class="service-card">
          <div class="service-card__icon">${service.icon}</div>
          <h3 class="service-card__title">${service.title}</h3>
          <p class="service-card__description">${service.description}</p>
          <span class="service-card__meta">${service.meta}</span>
        </article>
      `
    )
    .join("");
}

function renderPackages(packages) {
  const grid = document.querySelector("#section-pricing-grid");

  grid.innerHTML = packages
    .map(
      (item) => `
        <article class="pricing-card ${item.featured ? "pricing-card--featured" : ""}">
          <span class="pricing-card__badge">${item.badge}</span>
          <h3 class="pricing-card__title">${item.name}</h3>
          <p class="pricing-card__description">${item.description}</p>
          <p class="pricing-card__price">${item.displayPrice}</p>
          <ul class="pricing-card__features">
            ${item.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>
          <div class="pricing-card__actions">
            <a
              class="button button--primary pricing-card__button"
              href="#section-contact"
            >
              點我報價
            </a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderAddons(addons) {
  const container = document.querySelector("#section-pricing-addons");
  container.innerHTML = `
    <div class="pricing-addons__header">
      <p class="pricing-addons__eyebrow">Add-ons</p>
      <h3 class="pricing-addons__title">附加功能報價</h3>
    </div>
    <div class="pricing-addons__grid">
      ${addons
        .map(
          (item) => `
            <article class="addon-card">
              <p class="addon-card__name">${item.name}</p>
              <p class="addon-card__price">${item.displayPrice}</p>
              <p class="addon-card__description">${item.description}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderPortfolio(portfolio) {
  const container = document.querySelector("#section-portfolio-grid");
  container.innerHTML = portfolio
    .map(
      (item) => `
        <a class="portfolio-card portfolio-card--link" href="${item.website}" target="_blank" rel="noreferrer" aria-label="前往 ${item.client} 官網">
          <div class="portfolio-card__visual">
            ${
              item.thumbnail
                ? `<img class="portfolio-card__image" src="${item.thumbnail}" alt="${item.client} 網站縮圖" />`
                : `
                  <div class="portfolio-card__placeholder" aria-hidden="true">
                    <span class="portfolio-card__placeholder-icon">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M4 20V8.5A1.5 1.5 0 0 1 5.5 7H10v13M10 4h8.5A1.5 1.5 0 0 1 20 5.5V20M7 10.5h0M7 13.5h0M7 16.5h0M13 8h0M16 8h0M13 11h0M16 11h0M13 14h0M16 14h0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    <span class="portfolio-card__placeholder-label">${item.client}</span>
                  </div>
                `
            }
          </div>
          <div class="portfolio-card__header">
            <div class="portfolio-card__company-copy">
              <p class="portfolio-card__company-name">${item.client}</p>
              <p class="portfolio-card__company-summary">${item.companySummary}</p>
            </div>
          </div>
          <div class="portfolio-card__meta">
            <div class="portfolio-card__tags">
              <span class="portfolio-card__tag">${item.industry}</span>
              ${item.tags.map((tag) => `<span class="portfolio-card__tag">${tag}</span>`).join("")}
            </div>
            ${
              item.plan
                ? `<span class="portfolio-card__plan">${item.plan}</span>`
                : ""
            }
          </div>
        </a>
      `
    )
    .join("");
}

function renderProcess(process) {
  const container = document.querySelector("#section-process-timeline");
  container.innerHTML = process
    .map(
      (step, index) => `
        <article class="process-step">
          <span class="process-step__index">${String(index + 1).padStart(2, "0")}</span>
          <h3 class="process-step__title">${step.title}</h3>
          <p class="process-step__description">${step.description}</p>
        </article>
      `
    )
    .join("");
}

function renderFaq(faq) {
  const container = document.querySelector("#section-faq-accordion");
  container.innerHTML = faq
    .map(
      (item) => `
        <article class="faq-item">
          <button
            class="faq-item__button"
            type="button"
            aria-expanded="false"
          >
            <span class="faq-item__question">${item.question}</span>
            <span class="faq-item__icon" aria-hidden="true"></span>
          </button>
          <div class="faq-item__content-wrapper">
            <div class="faq-item__content">
              <p class="faq-item__answer">${item.answer}</p>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  container.querySelectorAll(".faq-item__button").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.contains("is-open");

      container.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("is-open");
        faqItem.querySelector(".faq-item__button")?.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}

function setupHeaderMenu() {
  const button = document.querySelector("#section-header-menu-button");
  const nav = document.querySelector("#section-header-navigation");

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function setupContactForm() {
  const form = document.querySelector("#section-contact-form");
  const submitButton = form.querySelector("button[type='submit']");
  const startTimeField = document.querySelector("#section-contact-form-start-time");
  const accessKeyField = document.querySelector("#section-contact-form-access-key");
  const modal = document.querySelector("#section-contact-modal");
  const modalEyebrow = document.querySelector("#section-contact-modal-eyebrow");
  const modalTitle = document.querySelector("#section-contact-modal-title");
  const modalMessage = document.querySelector("#section-contact-modal-message");
  const modalIcon = document.querySelector("#section-contact-modal-icon");
  let lastFocusedElement = null;

  if (startTimeField) {
    startTimeField.value = String(Date.now());
  }

  if (accessKeyField) {
    accessKeyField.value = CONTACT_FORM_CONFIG.web3FormsAccessKey;
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("has-modal-open");

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  }

  function openModal({ eyebrow, title, message, type }) {
    lastFocusedElement = document.activeElement;
    modalEyebrow.textContent = eyebrow;
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalIcon.classList.toggle("is-error", type === "error");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-modal-open");
    modal.querySelector("[data-modal-close]")?.focus();
  }

  function isRateLimited() {
    const storageKey = "contact_form_attempts";
    const now = Date.now();
    const windowStart = now - CONTACT_FORM_CONFIG.rateLimitWindowMs;
    const attempts = JSON.parse(localStorage.getItem(storageKey) || "[]").filter(
      (timestamp) => timestamp >= windowStart
    );

    if (attempts.length >= CONTACT_FORM_CONFIG.rateLimitMaxAttempts) {
      return true;
    }

    attempts.push(now);
    localStorage.setItem(storageKey, JSON.stringify(attempts));
    return false;
  }

  function validateBeforeSubmit(formData) {
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const honeypot = String(formData.get("botcheck") || "").trim();
    const startTime = Number(formData.get("formStartTime") || 0);
    const phoneDigits = phone.replace(/[^\d+]/g, "");

    if (honeypot) {
      throw new Error("表單驗證未通過。");
    }

    if (!name || !email || !phone) {
      throw new Error("請完整填寫所有必填欄位。");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("請輸入正確的電子郵件格式。");
    }

    if (phoneDigits.length < 8) {
      throw new Error("請輸入正確的聯絡電話。");
    }

    if (!startTime || Date.now() - startTime < CONTACT_FORM_CONFIG.minSubmitDelayMs) {
      throw new Error("送出速度過快，請確認內容後再送出。");
    }

    if (isRateLimited()) {
      throw new Error("送出次數過於頻繁，請稍後再試。");
    }
  }

  async function sendFormEmail(formData) {
    const accessKey = CONTACT_FORM_CONFIG.web3FormsAccessKey.trim();

    if (!accessKey) {
      throw new Error("尚未設定 Web3Forms Access Key，請先在 scripts/app.js 設定 CONTACT_FORM_CONFIG.web3FormsAccessKey。");
    }

    formData.set("access_key", accessKey);
    formData.set("subject", "網站詢問表單通知");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`寄送失敗：${response.status}`);
    }

    const result = await response.json();
    if (result.success !== true) {
      throw new Error(result.message || "寄送失敗，請稍後再試。");
    }
  }

  modal.querySelectorAll("[data-modal-close]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    try {
      validateBeforeSubmit(formData);
      submitButton.disabled = true;
      submitButton.textContent = "送出中...";

      await sendFormEmail(formData);

      form.reset();
      if (startTimeField) {
        startTimeField.value = String(Date.now());
      }
      openModal({
        eyebrow: "送出成功",
        title: "需求已成功送出",
        message: "我們已收到您的需求內容，接下來會盡快以電子郵件或電話與您聯繫。",
        type: "success"
      });
    } catch (error) {
      openModal({
        eyebrow: "送出失敗",
        title: "目前無法完成送出",
        message: error.message || "表單送出失敗，請稍後再試。",
        type: "error"
      });
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "送出需求";
    }
  });
}

function updateFooterYear() {
  document.querySelector("#section-footer-year").textContent = new Date().getFullYear();
}

async function initializeSite() {
  try {
    const data = await loadSiteData();

    renderServices(data.services);
    renderPackages(data.packages);
    renderAddons(data.addons);
    renderPortfolio(data.portfolio);
    renderProcess(data.process);
    renderFaq(data.faq);
    setupHeaderMenu();
    setupContactForm();
    updateFooterYear();
  } catch (error) {
    renderLoadError(error);
  }
}

initializeSite();
