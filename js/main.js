'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll using IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial check for elements already in view
    const animateBoxes = document.querySelectorAll('.animate-box');
    animateBoxes.forEach(el => {
        revealObserver.observe(el);
    });

    // Fallback: If elements are not revealed after 1 second, force reveal them
    // This prevents the "black screen" issue if JS execution is interrupted or observer fails
    setTimeout(() => {
        animateBoxes.forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });
    }, 1500);

    // Extracurriculars Pagination Logic
    const impactItems = document.querySelectorAll('.extracurricular-item');
    const prevBtn = document.getElementById('prev-impact');
    const nextBtn = document.getElementById('next-impact');
    const itemsPerPage = 2;
    let currentImpactPage = 0;

    const updateImpactPagination = () => {
        impactItems.forEach((item, index) => {
            const start = currentImpactPage * itemsPerPage;
            const end = start + itemsPerPage;

            if (index >= start && index < end) {
                item.classList.remove('hidden');
                // Re-trigger reveal if not already revealed
                if (!item.classList.contains('reveal')) {
                    item.classList.add('reveal');
                }
            } else {
                item.classList.add('hidden');
            }
        });

        // Update button states
        prevBtn.disabled = currentImpactPage === 0;
        nextBtn.disabled = (currentImpactPage + 1) * itemsPerPage >= impactItems.length;

        // Smooth scroll to section top if not on initial load
        if (window.scrollY > document.getElementById('extracurriculars').offsetTop) {
            window.scrollTo({
                top: document.getElementById('extracurriculars').offsetTop - 50,
                behavior: 'smooth'
            });
        }
    };

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentImpactPage > 0) {
                currentImpactPage--;
                updateImpactPagination();
            }
        });

        nextBtn.addEventListener('click', () => {
            if ((currentImpactPage + 1) * itemsPerPage < impactItems.length) {
                currentImpactPage++;
                updateImpactPagination();
            }
        });

        // Initialize pagination
        updateImpactPagination();
    }

    // Profile Image Shuffle Animation
    const profileImg = document.getElementById('about-profile-img');
    const projectImages = [
        'images/about-1.jpg',
        'images/about-2.jpg'
    ];
    let currentImgIndex = projectImages.indexOf(profileImg.getAttribute('src'));
    if (currentImgIndex === -1) currentImgIndex = 0;

    if (profileImg) {
        profileImg.addEventListener('click', () => {
            // Prevent clicking while animation is running
            if (profileImg.classList.contains('shuffle-animation')) return;

            // Start animation
            profileImg.classList.add('shuffle-animation');

            // Wait for half of the animation to change the source (at the bottom position)
            setTimeout(() => {
                currentImgIndex = (currentImgIndex + 1) % projectImages.length;
                profileImg.src = projectImages[currentImgIndex];
            }, 200);

            // Remove class after animation finishes (0.4s)
            setTimeout(() => {
                profileImg.classList.remove('shuffle-animation');
            }, 400);
        });
    }
});
