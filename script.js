const infoForm = document.querySelector("#info-form");
const planForm = document.querySelector("#plan-form");
const addOnsForm = document.querySelector("#add-ons-form");
const summaryForm = document.querySelector("#summary-form");
const nextBtn = document.querySelector("#next-btn");

let curStep = 1;

nextBtn.addEventListener("click", () => {
  let nextStep = curStep + 1;

  const activePanel = document.querySelector(`[data-step-panel="${curStep}"]`);
  const nextPanel = document.querySelector(`[data-step-panel="${nextStep}"]`);
  const activeStepIndicator = document.querySelector(
    `[data-step-item="${curStep}"]`,
  );
  const nextStepIndicator = document.querySelector(
    `[data-step-item="${nextStep}"]`,
  );

  activePanel.classList.add("hidden");
  nextPanel.classList.remove("hidden");

  activeStepIndicator.removeAttribute("data-active");
  nextStepIndicator.setAttribute("data-active", "");

  curStep = nextStep;

  // TODO: Remove when back button is implemented
  if (curStep === 4) {
    nextBtn.classList.add("hidden");
  }
});
