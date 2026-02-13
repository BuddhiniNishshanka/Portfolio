// Typing Animation (Name + Roles)
const typingElement = document.getElementById('typing');
const roleElement = document.getElementById('role');

const nameText = "Buddhini Nishshanka";
const roles = ["Web Developer", "Software Engineer", "Front-End Developer"];

let nameIndex = 0;
let roleIndex = 0;
let roleCharIndex = 0;
let isDeleting = false;

const typingSpeed = 150;
const deletingSpeed = 75;
const pause = 1500;

// Type Name first
function typeName(callback) {
    if (nameIndex < nameText.length) {
        typingElement.textContent += nameText.charAt(nameIndex);
        nameIndex++;
        setTimeout(() => typeName(callback), typingSpeed);
    } else {
        setTimeout(callback, 500); // start roles after name
    }
}

// Type and delete roles loop
function typeRoles() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        roleCharIndex++;
        roleElement.textContent = currentRole.substring(0, roleCharIndex);

        if (roleCharIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(typeRoles, pause);
        } else {
            setTimeout(typeRoles, typingSpeed);
        }
    } else {
        roleCharIndex--;
        roleElement.textContent = currentRole.substring(0, roleCharIndex);

        if (roleCharIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length; // loop to next role
            setTimeout(typeRoles, 500);
        } else {
            setTimeout(typeRoles, deletingSpeed);
        }
    }
}

// Add blinking cursor
const style = document.createElement('style');
style.innerHTML = `
#typing::after, #role::after {
    content: '|';
    margin-left: 3px;
    animation: blink 0.7s infinite;
}
@keyframes blink {
    0%,50%,100% { opacity: 1; }
    25%,75% { opacity: 0; }
}`;
document.head.appendChild(style);


// Smooth scroll for navbar links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}


// Fade-in sections on scroll
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.2 });
sections.forEach(section => observer.observe(section));


// Mobile menu toggle
function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}


// Project modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    document.querySelectorAll('.modal').forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}


// Start everything on window load
window.onload = () => {
    typeName(typeRoles);
};
