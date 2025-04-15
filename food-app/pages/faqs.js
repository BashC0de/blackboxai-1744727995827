export function init() {
    // Set user name from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.name) {
        document.getElementById('userName').textContent = userData.name;
    }

    // Setup FAQ toggle functionality
    setupFAQToggle();
}

function setupFAQToggle() {
    // Add click event to all FAQ questions
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle answer visibility
            answer.classList.toggle('hidden');
            
            // Toggle icon between chevron down and up
            if (answer.classList.contains('hidden')) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
            
            // Close other open FAQs in the same section
            const parentSection = question.closest('.faq-item');
            parentSection.parentElement.querySelectorAll('.faq-item').forEach(item => {
                if (item !== parentSection) {
                    item.querySelector('.faq-answer').classList.add('hidden');
                    item.querySelector('i').classList.remove('fa-chevron-up');
                    item.querySelector('i').classList.add('fa-chevron-down');
                }
            });
        });
    });

    // Add smooth animation to FAQ answers
    const style = document.createElement('style');
    style.textContent = `
        .faq-answer {
            transition: all 0.3s ease;
            max-height: 0;
            overflow: hidden;
        }
        .faq-answer:not(.hidden) {
            max-height: 500px;
        }
    `;
    document.head.appendChild(style);
}
