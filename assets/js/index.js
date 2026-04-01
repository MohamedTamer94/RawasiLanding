// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ?
        '<span class="material-symbols-outlined">close</span>' :
        '<span class="material-symbols-outlined">menu</span>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form step navigation
let currentStep = 1;

function nextStep(step) {
    if (validateStep(step)) {
        document.getElementById(`step-form-${step}`).classList.remove('active');
        document.getElementById(`step-${step}`).classList.remove('active');
        document.getElementById(`step-${step}`).classList.add('completed');

        currentStep = step + 1;

        document.getElementById(`step-form-${currentStep}`).classList.add('active');
        document.getElementById(`step-${currentStep}`).classList.add('active');

        // Special handling for payment step
        if (currentStep === 4) {
            const selectedPlan = document.getElementById('selected-plan').value;
            if (selectedPlan === 'free') {
                document.getElementById('free-plan-notice').style.display = 'block';
                document.getElementById('paid-plan-section').style.display = 'none';
            } else {
                document.getElementById('free-plan-notice').style.display = 'none';
                document.getElementById('paid-plan-section').style.display = 'block';
            }
        }

        // Scroll to top of form
        document.querySelector('.create-lms-container').scrollIntoView({behavior: 'smooth', block: 'start'});
    }
}

function prevStep(step) {
    document.getElementById(`step-form-${step}`).classList.remove('active');
    document.getElementById(`step-${step}`).classList.remove('active');

    currentStep = step - 1;

    document.getElementById(`step-form-${currentStep}`).classList.add('active');
    document.getElementById(`step-${currentStep}`).classList.add('active');
    document.getElementById(`step-${currentStep}`).classList.remove('completed');

    // Scroll to top of form
    document.querySelector('.create-lms-container').scrollIntoView({behavior: 'smooth', block: 'start'});
}

function validateStep(step) {
    if (step === 1) {
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!fullName || !email || !password) {
            alert(translations[currentLang].validation_required_fields);
            return false;
        }

        if (password.length < 8) {
            alert(translations[currentLang].validation_password_length);
            return false;
        }

        return true;
    } else if (step === 2) {
        const lmsName = document.getElementById('lms-name').value;
        const displayName = document.getElementById('lms-display-name').value;

        if (!lmsName || !displayName) {
            alert(translations[currentLang].validation_required_fields);
            return false;
        }

        return true;
    } else if (step === 3) {
        const selectedPlan = document.getElementById('selected-plan').value;

        if (!selectedPlan) {
            alert(translations[currentLang].validation_select_plan);
            return false;
        }

        return true;
    } else if (step === 4) {
        const selectedPlan = document.getElementById('selected-plan').value;

        if (selectedPlan !== 'free') {
            const paymentMethod = document.getElementById('payment-method').value;

            if (!paymentMethod) {
                alert(translations[currentLang].validation_select_payment);
                return false;
            }

            if (paymentMethod === 'credit-card') {
                const cardNumber = document.getElementById('card-number').value;
                const cardExpiry = document.getElementById('card-expiry').value;
                const cardCvc = document.getElementById('card-cvc').value;
                const cardName = document.getElementById('card-name').value;

                if (!cardNumber || !cardExpiry || !cardCvc || !cardName) {
                    alert(translations[currentLang].validation_card_details);
                    return false;
                }
            }
        }

        return true;
    }

    return true;
}

function selectPlan(plan) {
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });

    document.querySelector(`.plan-card:nth-child(${plan === 'free' ? 1 : plan === 'starter' ? 2 : 3})`).classList.add('selected');
    document.getElementById('selected-plan').value = plan;
}

function selectPaymentMethod(method) {
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });

    document.querySelector(`.payment-method:nth-child(${method === 'credit-card' ? 1 : 2})`).classList.add('selected');
    document.getElementById('payment-method').value = method;

    document.querySelectorAll('.payment-form').forEach(form => {
        form.classList.remove('active');
    });

    document.getElementById(`${method}-form`).classList.add('active');
}

function submitForm() {
    if (validateStep(4)) {
        // Collect form data
        const formData = {
            fullName: document.getElementById('full-name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            lmsName: document.getElementById('lms-name').value,
            displayName: document.getElementById('lms-display-name').value,
            plan: document.getElementById('selected-plan').value,
            paymentMethod: document.getElementById('payment-method').value,
            cardDetails: document.getElementById('payment-method').value === 'credit-card' ? {
                number: document.getElementById('card-number').value,
                expiry: document.getElementById('card-expiry').value,
                cvc: document.getElementById('card-cvc').value,
                name: document.getElementById('card-name').value
            } : null
        };

        // Here you would typically send the data to your backend
        console.log('Form data to be sent:', formData);

        // For demo purposes, we'll just show the success message
        document.getElementById('step-form-4').classList.remove('active');
        document.getElementById('step-4').classList.remove('active');
        document.getElementById('step-4').classList.add('completed');

        currentStep = 5;

        document.getElementById('step-form-5').classList.add('active');
        document.getElementById('step-5').classList.add('active');

        // Scroll to top of form
        document.querySelector('.create-lms-container').scrollIntoView({behavior: 'smooth', block: 'start'});
    }
}

// Language switcher functionality
let currentLang = 'en';


// Update page language
function updatePageLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];

            // For input placeholders
            if (el.tagName === 'INPUT' && el.getAttribute('placeholder')) {
                el.setAttribute('placeholder', translations[lang][key]);
            }
        }
    });

    // Save language preference
    localStorage.setItem('Rawasi-lang', lang);
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('Rawasi-lang') || 'en';
    updatePageLanguage(savedLang);

    // Update language display
    document.querySelectorAll('.current-lang').forEach(e => {
        e.textContent = savedLang === 'en' ? 'EN' : 'الع';
    });

    // Language dropdown functionality
    document.querySelectorAll('.dropdown-menu button').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const lang = this.dataset.lang;
            updatePageLanguage(lang);

            // Update language display
            document.querySelectorAll('.current-lang').forEach(e => {
                e.textContent = lang === 'en' ? 'EN' : 'الع';
            });

            // Close dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    });

    // Dropdown toggle functionality
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);

            const menu = this.nextElementSibling;
            if (menu.classList.contains('dropdown-menu')) {
                menu.classList.toggle('show');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function () {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
});
