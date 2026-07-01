/**
 * Cutelaza - 30K Luxury Editorial JS (Phase 2)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP ScrollTrigger Integration
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time)=>{ lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // 2. Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: "power2.out" });
    });

    gsap.ticker.add(() => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        gsap.set(follower, { x: cursorX, y: cursorY });
    });

    const hoverElements = document.querySelectorAll('a, [data-cursor="hover"]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.style.display = 'none';
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.style.display = 'block';
        });
    });

    // 3. Preloader & Hero
    let progress = 0;
    const counterEl = document.querySelector('.counter');
    const preloaderEl = document.querySelector('.preloader');
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            counterEl.textContent = "100%";
            
            gsap.to(preloaderEl, {
                yPercent: -100,
                duration: 1.5,
                ease: "expo.inOut",
                delay: 0.5,
                onComplete: () => {
                    document.body.classList.remove('loading');
                    initHeroAnimations();
                }
            });
        } else {
            counterEl.textContent = progress + "%";
        }
    }, 50);

    function initHeroAnimations() {
        const tl = gsap.timeline();
        tl.from(".hero-lux .line", { y: "120%", duration: 1.2, stagger: 0.1, ease: "power4.out" }, 0);
        tl.from(".hero-image-container .img-mask", { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", duration: 1.5, ease: "expo.out" }, 0.5);
        tl.from(".hero-image-container img", { scale: 1.5, duration: 1.5, ease: "expo.out" }, 0.5);
    }

    // The 3D scroll journey is handled by scroll-journey.js

    // 5. Reviews Slider Logic
    const slides = document.querySelectorAll('.review-slide');
    if(slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000);
    }

});
