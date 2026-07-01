document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);
    
    setTimeout(() => {

        /* =========================================================
           0. MAGNETIC BUTTONS & LINKS
           ========================================================= */
        const magnets = document.querySelectorAll('.nav-exact-links a, .nav-exact-icons svg, .sh-btn, .cb-info, .chatbot-close, .chatbot-toggle, .ni-text-link');
        magnets.forEach(magnet => {
            magnet.addEventListener('mousemove', (e) => {
                const rect = magnet.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(magnet, { x: x * 0.4, y: y * 0.4, duration: 0.5, ease: 'power2.out' });
            });
            magnet.addEventListener('mouseleave', () => {
                gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
            });
        });

        /* =========================================================
           0.5 LIQUID IMAGE HOVER (SVG DISPLACEMENT)
           ========================================================= */
        const liquidImages = document.querySelectorAll('.seo-col-img-wrapper img, .ni-img-box img, .bc-image-container img, .sh-image-container > img');
        
        liquidImages.forEach(img => {
            img.style.filter = "url('#liquid-filter')";
        });

        const filterMap = document.querySelector('#liquid-filter feDisplacementMap');
        
        if (filterMap) {
            liquidImages.forEach(img => {
                img.addEventListener('mouseenter', () => {
                    gsap.to(filterMap, { attr: { scale: 30 }, duration: 1, ease: 'power3.out' });
                });
                img.addEventListener('mouseleave', () => {
                    gsap.to(filterMap, { attr: { scale: 0 }, duration: 1, ease: 'power3.out' });
                });
            });
        }

        /* =========================================================
           1. TYPOGRAPHIE FLUIDE (Split Text Manual Reveal)
           ========================================================= */
        const textElements = document.querySelectorAll('.fade-up-text h2, .seo-aw-title');
        textElements.forEach(el => {
            const text = el.innerText;
            el.innerHTML = '';
            text.split(' ').forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.style.display = 'inline-block';
                wordSpan.style.marginRight = '0.2em';
                wordSpan.style.overflow = 'hidden'; 
                word.split('').forEach(char => {
                    const charSpan = document.createElement('span');
                    charSpan.innerText = char;
                    charSpan.style.display = 'inline-block';
                    wordSpan.appendChild(charSpan);
                });
                el.appendChild(wordSpan);
            });
            
            const chars = el.querySelectorAll('span > span');
            gsap.from(chars, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%"
                },
                y: '100%',
                rotationZ: 10,
                opacity: 0,
                duration: 1.5,
                stagger: 0.02,
                ease: 'expo.out'
            });
        });

        const textPs = document.querySelectorAll('.fade-up-text p, .seo-aw-item p');
        textPs.forEach(p => {
            gsap.from(p, {
                scrollTrigger: {
                    trigger: p,
                    start: "top 85%"
                },
                y: 40,
                opacity: 0,
                duration: 2,
                ease: 'power3.out',
                delay: 0.3
            });
        });

        /* =========================================================
           2. INVERSION COULEURS (Dark Mode)
           ========================================================= */
        ScrollTrigger.create({
            trigger: ".seo-about-white",
            start: "top 50%",
            end: "bottom 30%",
            onEnter: () => document.body.classList.add("dark-mode"),
            onLeave: () => document.body.classList.remove("dark-mode"),
            onEnterBack: () => document.body.classList.add("dark-mode"),
            onLeaveBack: () => document.body.classList.remove("dark-mode"),
            markers: false
        });

        /* =========================================================
           3. SLOW MASK REVEALS (Images)
           ========================================================= */
        const maskImages = gsap.utils.toArray('.sh-image-container, .bc-image-container');
        maskImages.forEach(container => {
            gsap.from(container, {
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%"
                },
                clipPath: "inset(100% 0% 0% 0%)",
                duration: 2.5,
                ease: "power4.inOut"
            });
            
            const img = container.querySelector('img');
            if(img) {
                gsap.from(img, {
                    scrollTrigger: {
                        trigger: container,
                        start: "top 80%"
                    },
                    scale: 1.3,
                    duration: 2.5,
                    ease: "power4.inOut"
                });
            }
        });

        /* =========================================================
           4. SECONDARY HERO & ABOUT US (Existing 3D)
           ========================================================= */
        const shWidget = document.querySelector('.sh-floating-widget');
        if (shWidget) {
            gsap.from(shWidget, {
                scrollTrigger: {
                    trigger: ".secondary-hero-section",
                    start: "top 60%",
                    scrub: 1
                },
                z: -500,
                scale: 0.5,
                rotationY: 20,
                transformPerspective: 1000,
                ease: "none"
            });
        }

        const collageImages = gsap.utils.toArray('.seo-col-img-wrapper');
        if (collageImages.length > 0) {
            gsap.from(collageImages, {
                scrollTrigger: {
                    trigger: ".seo-collage-container",
                    start: "top 80%"
                },
                z: -800,
                rotationX: 45,
                y: 200,
                opacity: 0,
                duration: 2,
                stagger: 0.15,
                transformPerspective: 1200,
                ease: "expo.out"
            });
        }

        /* =========================================================
           5. NEW IN SECTION (Staggered 3D Card Flip)
           ========================================================= */
        const newInItems = gsap.utils.toArray('.ni-item');
        if (newInItems.length > 0) {
            gsap.from(newInItems, {
                scrollTrigger: {
                    trigger: ".ni-grid",
                    start: "top 75%"
                },
                rotationY: -90, 
                opacity: 0,
                z: -200,
                duration: 2,
                stagger: 0.1,
                transformPerspective: 1500,
                transformOrigin: "left center",
                ease: "expo.out"
            });
        }

        /* =========================================================
           6. LOGO MARQUEE (Perspective Tilt)
           ========================================================= */
        const marqueeSection = document.querySelector('.logo-marquee-section');
        const marqueeTrack = document.querySelector('.marquee-track');
        if (marqueeSection && marqueeTrack) {
            gsap.set(marqueeSection, { transformPerspective: 1000 });
            gsap.to(marqueeTrack, {
                scrollTrigger: {
                    trigger: marqueeSection,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                },
                rotationX: 35,
                scale: 0.9,
                ease: "none"
            });
        }

        /* =========================================================
           7. FOOTER (Reveal from Behind 3D)
           ========================================================= */
        const footer = document.querySelector('.footer-premium');
        if (footer) {
            gsap.from(footer, {
                scrollTrigger: {
                    trigger: footer,
                    start: "top 95%"
                },
                rotationX: -25,
                y: 150,
                opacity: 0,
                duration: 2,
                transformPerspective: 1500,
                transformOrigin: "top center",
                ease: "expo.out"
            });
        }

    }, 200);

});
