
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


const dropdownBtn = document.querySelector('.dropdown-btn');
const dropdownContent = document.querySelector('.dropdown-content');

function toggleDropdown() {
    dropdownContent.style.display =
        dropdownContent.style.display === 'block' ? 'none' : 'block';
}

dropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDropdown();
});

document.addEventListener('click', (e) => {
    if (!dropdownBtn.contains(e.target)) {
        dropdownContent.style.display = 'none';
    }
});

const modal = document.getElementById('infoModal');
const closeModalBtn = document.getElementById('closeModal');


closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});


const form = document.getElementById('contactForm');
const successMsg = document.getElementById('successMessage');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm() {
    let isValid = true;

    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name) {
        nameError.textContent = 'Please enter your name';
        isValid = false;
    }

    if (!email) {
        emailError.textContent = 'Please enter your email';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }

    if (!message) {
        messageError.textContent = 'Please enter your message';
        isValid = false;
    }

    return isValid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        successMsg.style.display = 'block';
        form.reset();

        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('active');

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});


const animateElements = document.querySelectorAll('.animate-on-scroll');

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Animate only once
        }
    });
}, observerOptions);

animateElements.forEach(el => {
    observer.observe(el);
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});