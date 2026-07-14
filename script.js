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
const summarySelectedPlan = document.querySelector("#summary-selected-plan");
const summaryPlanPrice = document.querySelector("#summary-plan-price");
const summarySeparator = document.querySelector("#summary-separator");
const summaryAddonList = document.querySelector("#summary-addon-list");
const summaryTotalCycle = document.querySelector("#summary-total-cycle");
const summaryTotalPrice = document.querySelector("#summary-total-price");

let curStep = 1;

const state = {
  billingCycle: "mo",
  selectedPlan: "arcade",
  selectedAddons: [],
};

const plans = {
  arcade: {
    name: "Arcade",
    price: {
      mo: 9,
      yr: 90,
    },
  },
  advanced: {
    name: "Advanced",
    price: {
      mo: 12,
      yr: 120,
    },
  },
  pro: {
    name: "Pro",
    price: {
      mo: 15,
      yr: 150,
    },
  },
};

const addons = {
  online: {
    name: "Online service",
    price: {
      mo: 1,
      yr: 10,
    },
  },
  storage: {
    name: "Larger storage",
    price: {
      mo: 2,
      yr: 20,
    },
  },
  profile: {
    name: "Customizable profile",
    price: {
      mo: 2,
      yr: 20,
    },
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

const renderPlans = () => {
  const cycle = state.billingCycle;
  arcadePrice.textContent = `$${plans.arcade.price[cycle]}/${cycle}`;
  advancedPrice.textContent = `$${plans.advanced.price[cycle]}/${cycle}`;
  proPrice.textContent = `$${plans.pro.price[cycle]}/${cycle}`;
};

const renderAddons = () => {
  const cycle = state.billingCycle;
  onlinePrice.textContent = `+$${addons.online.price[cycle]}/${cycle}`;
  storagePrice.textContent = `+$${addons.storage.price[cycle]}/${cycle}`;
  profilePrice.textContent = `+$${addons.profile.price[cycle]}/${cycle}`;
};

const renderSummary = () => {
  const cycle = state.billingCycle;
  const selectedPlan = state.selectedPlan;
  const selectedAddons = state.selectedAddons;
  let totalPrice = plans[selectedPlan].price[cycle];
  let addonListItems = "";

  summarySelectedPlan.textContent = `${plans[selectedPlan].name} (${cycle === "mo" ? "Monthly" : "Yearly"})`;
  summaryPlanPrice.textContent = `$${plans[selectedPlan].price[cycle]}/${cycle}`;

  if (selectedAddons.length === 0) {
    summarySeparator.classList.add("hidden");
  } else {
    summarySeparator.classList.remove("hidden");
  }

  for (let addon of selectedAddons) {
    addonListItems += `<li class="flex justify-between items-center">
                        <p class="text-preset-4-regular text-grey-500">
                          ${addons[addon].name}
                        </p>
                        <p class="text-preset-4-regular">+$${addons[addon].price[cycle]}/${cycle}</p>
                      </li>`;
    totalPrice += addons[addon].price[cycle];
  }

  summaryAddonList.innerHTML = addonListItems;
  summaryTotalCycle.textContent = cycle === "mo" ? "month" : "year";
  summaryTotalPrice.textContent = `$${totalPrice}/${cycle}`;
};

const renderAll = () => {
  renderPlans();
  renderAddons();
  renderSummary();
};

const init = () => {
  renderAll();
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
    state.billingCycle = "yr";
    renderAll();
  } else {
    monthlyOption.checked = true;
    state.billingCycle = "mo";
    renderAll();
  }
});

monthlyOption.addEventListener("change", () => {
  state.billingCycle = "mo";
  renderAll();
});

yearlyOption.addEventListener("change", () => {
  state.billingCycle = "yr";
  renderAll();
});

planPanel.addEventListener("change", (e) => {
  if (!e.target.matches('input[name="plan"]')) return;

  state.selectedPlan = e.target.value;

  renderSummary();
});

addonPanel.addEventListener("change", (e) => {
  if (!e.target.matches('input[name="addon"]')) return;

  // To maintain order in which add-on options are displayed
  state.selectedAddons = [
    ...addonPanel.querySelectorAll('input[name="addon"]:checked'),
  ].map((checkbox) => checkbox.value);

  renderSummary();
});

init();
