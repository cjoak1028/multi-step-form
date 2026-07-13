const nextBtn = document.querySelector("#next-btn");
const backBtn = document.querySelector("#back-btn");
const confirmBtn = document.querySelector("#confirm-btn");
const billingToggle = document.querySelector("#billing-toggle");
const monthlyOption = document.querySelector("#monthly-option");
const yearlyOption = document.querySelector("#yearly-option");
const arcadePrice = document.querySelector("#arcade-price");
const advancedPrice = document.querySelector("#advanced-price");
const proPrice = document.querySelector("#pro-price");
const onlinePrice = document.querySelector("#online-price");
const storagePrice = document.querySelector("#storage-price");
const profilePrice = document.querySelector("#profile-price");
const planPanel = document.querySelector("#plan-panel");
const addonPanel = document.querySelector("#addon-panel");

let curStep = 1;

const state = {
  billingCycle: "mo",
  selectedPlan: "arcade",
  selectedAddons: [],
};

const plans = {
  arcade: {
    mo: 9,
    yr: 90,
  },
  advanced: {
    mo: 12,
    yr: 120,
  },
  pro: {
    mo: 15,
    yr: 150,
  },
};

const addons = {
  online: {
    mo: 1,
    yr: 10,
  },
  storage: {
    mo: 2,
    yr: 20,
  },
  profile: {
    mo: 2,
    yr: 20,
  },
};

const goNextStep = (step, reverse = false) => {
  const nextStep = reverse ? step - 1 : step + 1;

  const activePanel = document.querySelector(`[data-step-panel="${step}"]`);
  const nextPanel = document.querySelector(`[data-step-panel="${nextStep}"]`);
  const activeStepIndicator = document.querySelector(
    `[data-step-item="${step}"]`,
  );
  const nextStepIndicator = document.querySelector(
    `[data-step-item="${nextStep}"]`,
  );

  activePanel.classList.add("hidden");
  nextPanel.classList.remove("hidden");

  activeStepIndicator.removeAttribute("data-active");
  nextStepIndicator.setAttribute("data-active", "");

  return nextStep;
};

const renderPlans = (cycle = "mo") => {
  arcadePrice.textContent = `$${plans.arcade[cycle]}/${cycle}`;
  advancedPrice.textContent = `$${plans.advanced[cycle]}/${cycle}`;
  proPrice.textContent = `$${plans.pro[cycle]}/${cycle}`;
};

const renderAddons = (cycle = "mo") => {
  onlinePrice.textContent = `+$${addons.online[cycle]}/${cycle}`;
  storagePrice.textContent = `+$${addons.storage[cycle]}/${cycle}`;
  profilePrice.textContent = `+$${addons.profile[cycle]}/${cycle}`;
};

const render = (cycle = "mo") => {
  renderPlans(cycle);
  renderAddons(cycle);
};

const init = () => {
  render();
};

nextBtn.addEventListener("click", () => {
  const nextStep = goNextStep(curStep);

  curStep = nextStep;

  if (nextStep === 4) {
    nextBtn.classList.add("hidden");
    confirmBtn.classList.remove("hidden");
  }

  if (nextStep > 1) {
    backBtn.classList.remove("hidden");
    backBtn.removeAttribute("data-hidden-back");
  }
});

backBtn.addEventListener("click", () => {
  const nextStep = goNextStep(curStep, true);

  curStep = nextStep;

  if (nextStep === 1) {
    backBtn.classList.add("hidden");
    backBtn.setAttribute("data-hidden-back", "");
  }

  if (nextStep === 3) {
    nextBtn.classList.remove("hidden");
    confirmBtn.classList.add("hidden");
  }
});

// TODO: Refactor toggle logic
billingToggle.addEventListener("click", () => {
  if (monthlyOption.checked) {
    yearlyOption.checked = true;
    render("yr");
    state.billingCycle = "yr";
  } else {
    monthlyOption.checked = true;
    render("mo");
    state.billingCycle = "mo";
  }
});

monthlyOption.addEventListener("change", () => {
  render("mo");
  state.billingCycle = "mo";
});

yearlyOption.addEventListener("change", () => {
  render("yr");
  state.billingCycle = "yr";
});

planPanel.addEventListener("change", (e) => {
  if (!e.target.matches('input[name="plan"]')) return;

  state.selectedPlan = e.target.value;
});

addonPanel.addEventListener("change", (e) => {
  if (!e.target.matches('input[name="addon"]')) return;

  // To maintain order in which add-on options are displayed
  state.selectedAddons = [
    ...addonPanel.querySelectorAll('input[name="addon"]:checked'),
  ].map((checkbox) => checkbox.value);
});

init();
