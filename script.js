const infoForm = document.querySelector("#info-form");
const planForm = document.querySelector("#plan-form");
const addOnsForm = document.querySelector("#add-ons-form");
const summaryForm = document.querySelector("#summary-form");
const nextBtn = document.querySelector("#next-btn");

let curStep = 1;

nextBtn.addEventListener("click", () => {
  let activeForm = document.querySelector(`[data-step="${curStep}"]`);
  let nextForm = document.querySelector(`[data-step="${++curStep}"]`);

  activeForm.classList.add("hidden");
  nextForm.classList.remove("hidden");

  // TODO: Remove when back button is implemented
  if (curStep === 4) {
    nextBtn.classList.add("hidden");
  }
});
