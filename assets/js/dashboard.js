document.getElementById("plan-switch").addEventListener("change", function(){
    if (this.checked) {
        document.getElementById("price-starter").innerHTML = "12$<small>/month</small>";
        document.getElementById("price-starter").style.color = "#398584";
        document.getElementById("pricing-pro").innerHTML = "40$<small>/month</small>";
        document.getElementById("pricing-pro").style.color = "#398584";
        document.getElementById("pricing-enterprise").innerHTML = "160$<small>/month</small>";
        document.getElementById("pricing-enterprise").style.color = "#398584";
        document.querySelectorAll(".discount").forEach((e) => e.style.display = "flex");
        document.getElementById("monthly-plan-switch").style.color = "#7a7a7a";
        document.getElementById("yearly-plan-switch").style.color = "black";
    } else {
        document.getElementById("price-starter").innerHTML = "15$<small>/month</small>"
        document.getElementById("price-starter").style.color = "black";
        document.getElementById("pricing-pro").innerHTML = "50$<small>/month</small>"
        document.getElementById("pricing-pro").style.color = "black";
        document.getElementById("pricing-enterprise").innerHTML = "199$<small>/month</small>";
        document.getElementById("pricing-enterprise").style.color = "black";
        document.querySelectorAll(".discount").forEach((e) => e.style.display = "none");
        document.getElementById("yearly-plan-switch").style.color = "#7a7a7a";
        document.getElementById("monthly-plan-switch").style.color = "black";
    }
})


document.getElementById("add-project-fab").addEventListener("click", function(){
    const noProjectsContainer = document.getElementById("no-projects");
    const addProjectsContainer = document.getElementById("add-project-container");

    noProjectsContainer.classList.add('hidden');
    addProjectsContainer.style.transform = 'translateX(0)';
    document.getElementById("back-btn").addEventListener("click", function(){
        noProjectsContainer.classList.remove('hidden');
        addProjectsContainer.style.transform = 'translateX(100%)';
    })
})

function updateButton(ev) {
    let typed = Boolean(ev.target.value.replaceAll(" ", "").length);
    if (typed) {
        document.getElementById("name-next-step").removeAttribute("disabled")
    } else {
        document.getElementById("name-next-step").setAttribute("disabled", "true")
    }
}

let currentStep = 1;

function goToStep(step) {
    // Highlight current step in the list
    document.querySelectorAll('.md-list-item').forEach(item => {
        item.classList.remove('active-step');
    });
    document.getElementById(`list-item-${currentStep}`).classList.remove('active-step');

    if (step > currentStep) {
        document.getElementById(`list-number-${currentStep}`).innerHTML = `<span class="material-symbols-outlined ">
    check
  </span>`;
        document.getElementById(`list-number-${currentStep}`).classList.add('done-number');
    }

    document.getElementById(`list-item-${step}`).classList.add('active-step');

    // Animation between steps
    const currentStepEl = document.getElementById(`step-${currentStep}`);
    const nextStepEl = document.getElementById(`step-${step}`);

    // Set animation direction
    const direction = step > currentStep ? 'right' : 'left';

    // Add animation classes
    currentStepEl.classList.add(`slide-out-${direction}`);
    nextStepEl.classList.remove('hidden');
    nextStepEl.classList.add(`slide-in-${direction}`);

    // After animation completes
    setTimeout(() => {
        currentStepEl.classList.add('hidden');
        currentStepEl.classList.remove(`slide-out-${direction}`);
        nextStepEl.classList.remove(`slide-in-${direction}`);
        currentStep = step;
    }, 300);
}

// Initialize first step as active
document.getElementById(`list-item-${currentStep}`).classList.add('active-step');

let currentPlan = 3;

function selectPlan(plan) {
    document.getElementById(`select-plan-${plan}`).classList.add("selected-plan-btn")
    document.getElementById(`select-plan-${plan}`).innerHTML = "<span class=\"material-symbols-outlined feature-tick\">\n" +
        "            check_circle\n" +
        "        </span>Selected";
    document.getElementById(`select-plan-${currentPlan}`).classList.remove("selected-plan-btn");
    document.getElementById(`select-plan-${currentPlan}`).innerHTML = "Select";
    currentPlan = plan;
}