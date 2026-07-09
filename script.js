const infoForm = document.querySelector("#info-form");
const planForm = document.querySelector("#plan-form");
const addOnsForm = document.querySelector("#add-ons-form");
const summaryForm = document.querySelector("#summary-form");
const nextBtn = document.querySelector("#next-btn");
const backBtn = document.querySelector("#back-btn");
const confirmBtn = document.querySelector("#confirm-btn");

let curStep = 1;

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
