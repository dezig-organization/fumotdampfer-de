const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

window.addEventListener("load", () => {
    if (localStorage.getItem("ageConfirmed") != "true") {
        ageModal.style.display = "flex";
    } else {
        ageModal.style.display = "none";
    }
});

yesBtn.addEventListener("click", () => {
    localStorage.setItem("ageConfirmed", "true");
    ageModal.style.display = "none";
});

noBtn.addEventListener("click", () => {
    alert("Zugang verweigert. Diese Website ist nur für Personen ab 18 Jahren.");
    window.close();
    window.location.href = "https://www.google.pt";
});


// Mobile Menu Toggle
const warmup = document.querySelector('.warn');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

if (hamburger && navMenu && warmup) {
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        warmup.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            warmup.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            warmup.classList.remove('active');
        }
    });
}


function handleSwipe() {
    const swipeThreshold = 50;

    if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - next
        nextBtn.click();
    }

    if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - previous
        prevBtn.click();
    }
}

// Auto-rotate carousel (optional - can be enabled)
let autoRotate = false;
let rotateInterval;

if (autoRotate) {
    rotateInterval = setInterval(() => {
        nextBtn.click();
    }, 4000);

    // Pause auto-rotation on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(rotateInterval);
    });

    carousel.addEventListener('mouseleave', () => {
        rotateInterval = setInterval(() => {
            nextBtn.click();
        }, 4000);
    });
}



document.addEventListener('DOMContentLoaded', function () {
    // ÐŸÐ¾Ð»ÑƒÑ‡Ð°ÐµÐ¼ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ñ‹
    const modal = document.getElementById('myModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.querySelector('.close-button');

    // Ð¤ÑƒÐ½ÐºÑ†Ð¸Ñ Ð´Ð»Ñ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¸Ñ Ð¼Ð¾Ð´Ð°Ð»ÑŒÐ½Ð¾Ð³Ð¾ Ð¾ÐºÐ½Ð°
    openBtn.onclick = function () {
        modal.classList.add('active');
    }

    // Ð¤ÑƒÐ½ÐºÑ†Ð¸Ñ Ð´Ð»Ñ Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸Ñ Ð¿Ð¾ ÐºÐ½Ð¾Ð¿ÐºÐµ X
    closeBtn.onclick = function () {
        modal.classList.remove('active');
    }

    // Ð¤ÑƒÐ½ÐºÑ†Ð¸Ñ Ð´Ð»Ñ Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸Ñ Ð¿Ð¾ ÐºÐ»Ð¸ÐºÑƒ Ð²Ð½Ðµ Ð¾ÐºÐ½Ð°
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.remove('active');
        }
    }
});

// Image carousel logic
const imageWrappers = document.querySelectorAll('.image-wrapper');
const heroProductLink = document.getElementById('heroProductLink');
let currentIndex = 0;
const transitionInterval = 4000; // 4 seconds

function updateHeroProductLink() {
    const currentImage = imageWrappers[currentIndex];
    const productUrl = currentImage ? currentImage.dataset.productUrl : '';
    if (heroProductLink && productUrl) {
        heroProductLink.href = productUrl;
    }
}

function switchImage() {
    if (imageWrappers.length < 2) return;

    imageWrappers[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % imageWrappers.length;
    imageWrappers[currentIndex].classList.add('active');
    updateHeroProductLink();
}

if (imageWrappers.length > 0) {
    updateHeroProductLink();
    if (imageWrappers.length > 1) {
        setInterval(switchImage, transitionInterval);
    }
    console.log('[v1] Floating image carousel initialized with ' + imageWrappers.length + ' images');
}


const carouselPrev = document.querySelector('.carousel-btn-prev');
const carouselNext = document.querySelector('.carousel-btn-next');
const carouselTrack = document.querySelector('.carousel-track');
const carouselCards = document.querySelectorAll('.carousel-card');

if (carouselPrev && carouselNext && carouselTrack && carouselCards.length > 0) {
    let currentIndex = Math.floor(carouselCards.length / 2); // Start with center card
    const totalSlides = carouselCards.length;
    let startTranslate = 0;

    // Touch/drag state
    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let dragDistance = 0;
    let isTouching = false;  // verjin
    let suppressClickUntil = 0; //vetjin
    let startY = 0;      //Õ¶Õ¸Ö€Õ¡Õ¾Õ¥Õ¬Õ¡ÖÖ€Õ¡Õ®
    let lockedDirection = null; // 'x' or 'y' nÕ¸Ö€Õ¡Õ¾Õ¥Õ¬Õ¡ÖÖ€Õ¡Õ®
    // let startTranslate = 0;  //Õ¶Õ¸Ö€Õ¡Õ¾Õ¥Õ¬Õ¡ÖÖ€Õ¡Õ®
    const DRAG_THRESHOLD = 10;  // Minimum pixels to consider it a drag vs click
    const SWIPE_THRESHOLD = 50; // Minimum pixels to trigger slide change

    // Update carousel - assign position classes
    const updateCarousel = () => {
        carouselCards.forEach((card, index) => {
            // Remove all position classes
            card.classList.remove('active', 'left-1', 'left-2', 'right-1', 'right-2');

            // Calculate relative position to active card
            let diff = index - currentIndex;

            // Handle wraparound
            if (diff > totalSlides / 2) diff -= totalSlides;
            if (diff < -totalSlides / 2) diff += totalSlides;

            // Assign classes based on position
            if (diff === 0) {
                card.classList.add('active');
            } else if (diff === -1) {
                card.classList.add('left-1');
            } else if (diff === -2) {
                card.classList.add('left-2');
            } else if (diff === 1) {
                card.classList.add('right-1');
            } else if (diff === 2) {
                card.classList.add('right-2');
            }
        });
    };

    // Navigate to next slide
    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    };

    // Navigate to previous slide
    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };

    // Button click handlers
    carouselNext.addEventListener('click', nextSlide);
    carouselPrev.addEventListener('click', prevSlide);

    //Touch event handlers


    const handleTouchStart = (e) => {
        isTouching = true;
        suppressClickUntil = Date.now() + 450;

        isDragging = true;
        lockedDirection = null;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        currentX = startX;
        dragDistance = 0;
    };



    const handleTouchMove = (e) => {
        if (!isDragging) return;

        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        const dx = x - startX;
        const dy = y - startY;

        currentX = x;
        dragDistance = Math.abs(dx);

        if (!lockedDirection && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
            lockedDirection = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        }

        if (lockedDirection === 'x' && e.cancelable) {
            e.preventDefault();
        }
    };





    const handleTouchEnd = () => {
        if (!isDragging) return;

        const deltaX = currentX - startX;

        if (lockedDirection === 'x' && Math.abs(deltaX) > SWIPE_THRESHOLD) {
            deltaX > 0 ? prevSlide() : nextSlide();
        }

        isDragging = false;
        lockedDirection = null;
        setTimeout(() => {
            isTouching = false;
        }, 0);
    };

    // Mouse event handlers for desktop
    const handleMouseDown = (e) => {
        isDragging = true;
        startX = e.clientX;
        currentX = startX;
        dragDistance = 0;
        startTranslate = -currentIndex * 100;
        carouselTrack.style.transition = 'none';
        carouselTrack.style.cursor = 'grabbing';
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        currentX = e.clientX;
        const deltaX = currentX - startX;
        dragDistance = Math.abs(deltaX);

        if (dragDistance > DRAG_THRESHOLD) {
            // Calculate drag percentage
            const containerWidth = carouselTrack.offsetWidth / totalSlides;
            const dragPercent = (deltaX / containerWidth) * 100;
            const newTranslate = startTranslate + dragPercent;

            carouselTrack.style.transform = `translateX(${newTranslate}%)`;
        }
    };

    const handleMouseUp = (e) => {
        if (!isDragging) return;

        const deltaX = currentX - startX;

        // Check if drag was significant enough
        if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
            if (deltaX > 0) {
                prevSlide(); // Dragged right
            } else {
                nextSlide(); // Dragged left
            }
        } else {
            updateCarousel(); // Snap back to current slide
        }

        isDragging = false;
        carouselTrack.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            updateCarousel(); // Snap back if mouse leaves
            isDragging = false;
            carouselTrack.style.cursor = 'grab';
        }
    };

    // Add event listeners for touch
    carouselTrack.addEventListener('touchstart', handleTouchStart, { passive: false });
    carouselTrack.addEventListener('touchmove', handleTouchMove, { passive: false });
    carouselTrack.addEventListener('touchend', handleTouchEnd);

    // Add event listeners for mouse
    carouselTrack.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    carouselTrack.addEventListener('mouseleave', handleMouseLeave);




    carouselCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // Õ¥Õ©Õ¥ touch Õ§ Õ¥Õ²Õ¥Õ¬ Õ¯Õ¡Õ´ swipe Õ§ Õ¥Õ²Õ¥Õ¬ â†’ click-Õ¨ Õ¡Õ¶Õ¿Õ¥Õ½Õ¥Õ¬
            if (isTouching || dragDistance > DRAG_THRESHOLD) {
                e.preventDefault();
                return;
            }

            // tap Õ¸Õ¹ Õ¡Õ¯Õ¿Õ«Õ¾ card-Õ« Õ¾Ö€Õ¡ â†’ Õ¤Õ¡Ö€Õ±Õ¶Õ¸Ö‚Õ´ Õ¥Õ¶Ö„ active
            if (index !== currentIndex) {
                e.preventDefault();
                currentIndex = index;
                updateCarousel();
            }
        });
    });

    // Set initial cursor
    carouselTrack.style.cursor = 'grab';

    // Initialize on load
    updateCarousel();

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

const warn = document.querySelector(".warn");
if (warn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            warn.style.display = "none";
        } else {
            warn.style.display = "";
        }
    });
}


// footer
const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three a");
if (city) {
    city.addEventListener("click", toggleCont);
}

function toggleCont() {
    if (!city) return;
    city.classList.toggle("active");
    Array.from(cont).forEach((el) => {
        el.style.display = el.style.display === "block" ? "none" : "block";
    });
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('js-enhanced');
    requestAnimationFrame(() => {
        document.body.classList.add('is-ready');
    });

    const updateNavbarState = () => {
        if (!navbar) return;
        navbar.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    updateNavbarState();
    window.addEventListener('scroll', updateNavbarState, { passive: true });

    const revealTargets = [
        ...document.querySelectorAll('.carousel-wrapper, .features-container, .product-intro, .social, .footer-cont, .foot-cont-three, .copyright'),
        ...document.querySelectorAll('.feature-image-large, .feature-content')
    ];

    if (!reduceMotion && revealTargets.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.16,
            rootMargin: '0px 0px -8% 0px'
        });

        const revealInViewport = () => {
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            revealTargets.forEach((element) => {
                if (element.classList.contains('is-visible')) return;

                const rect = element.getBoundingClientRect();
                const isNearViewport = rect.top < viewportHeight * 1.55 && rect.bottom > viewportHeight * 0.02;

                if (isNearViewport) {
                    element.classList.add('is-visible');
                    revealObserver.unobserve(element);
                }
            });
        };

        revealTargets.forEach((element, index) => {
            element.classList.add('reveal-on-scroll');

            if (element.classList.contains('feature-image-large')) {
                element.classList.add(index % 2 === 0 ? 'reveal-right' : 'reveal-left');
            }

            if (element.classList.contains('feature-content')) {
                element.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
            }

            element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`);
            revealObserver.observe(element);
        });

        requestAnimationFrame(revealInViewport);
        window.addEventListener('scroll', revealInViewport, { passive: true });
        window.addEventListener('resize', revealInViewport);
    } else {
        revealTargets.forEach((element) => element.classList.add('is-visible'));
    }

    const mobileFeatureMedia = window.matchMedia('(max-width: 768px)');
    const collapsibleFeatureTexts = Array.from(document.querySelectorAll('#features .feature-content .feature-text'));

    const ensureFeatureTextToggle = (textBlock) => {
        let toggle = textBlock.parentElement.querySelector('.feature-text-toggle');
        if (toggle) return toggle;

        toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'feature-text-toggle';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Mehr lesen';
        textBlock.insertAdjacentElement('afterend', toggle);

        toggle.addEventListener('click', () => {
            const isExpanded = textBlock.classList.toggle('is-expanded');
            textBlock.classList.toggle('is-collapsed', !isExpanded);
            toggle.textContent = isExpanded ? 'Weniger' : 'Mehr lesen';
            toggle.setAttribute('aria-expanded', String(isExpanded));
        });

        return toggle;
    };

    const updateFeatureTextCollapse = () => {
        collapsibleFeatureTexts.forEach((textBlock) => {
            const toggle = ensureFeatureTextToggle(textBlock);
            textBlock.classList.add('feature-text-collapsible');

            if (mobileFeatureMedia.matches) {
                if (!textBlock.classList.contains('is-expanded')) {
                    textBlock.classList.add('is-collapsed');
                }
                toggle.hidden = false;
            } else {
                textBlock.classList.remove('is-collapsed', 'is-expanded');
                toggle.hidden = true;
                toggle.textContent = 'Mehr lesen';
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    };

    updateFeatureTextCollapse();
    if (typeof mobileFeatureMedia.addEventListener === 'function') {
        mobileFeatureMedia.addEventListener('change', updateFeatureTextCollapse);
    } else if (typeof mobileFeatureMedia.addListener === 'function') {
        mobileFeatureMedia.addListener(updateFeatureTextCollapse);
    }

    if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
        const heroSurface = document.querySelector('.hero-container');
        const heroFrame = document.querySelector('.image-frame');

        if (heroSurface && heroFrame) {
            let frameAnimation = 0;

            heroSurface.addEventListener('mousemove', (event) => {
                const rect = heroSurface.getBoundingClientRect();
                const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
                const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

                cancelAnimationFrame(frameAnimation);
                frameAnimation = requestAnimationFrame(() => {
                    heroFrame.style.transform = `translate3d(${offsetX * 16}px, ${offsetY * 14}px, 0) rotateX(${-offsetY * 5}deg) rotateY(${offsetX * 6}deg)`;
                });
            });

            heroSurface.addEventListener('mouseleave', () => {
                heroFrame.style.transform = '';
            });
        }
    }
});
