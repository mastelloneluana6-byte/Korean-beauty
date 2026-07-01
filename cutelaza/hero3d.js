document.addEventListener("DOMContentLoaded", () => {
    const heroSplit = document.querySelector('.hero-split');
    const productWidget = document.querySelector('.product-widget');
    const productImg = document.querySelector('.product-widget img');
    const modelImg = document.querySelector('.split-right .bg-img');

    if (!heroSplit || !productWidget || !modelImg) return;

    // Enable 3D perspective on the parent containers
    document.querySelector('.split-left').style.perspective = "1000px";
    document.querySelector('.split-right').style.perspective = "1000px";
    
    // Make product image behave like a 3D layer
    productImg.style.transformStyle = "preserve-3d";
    
    // Add continuous floating animation to the product widget
    gsap.to(productWidget, {
        y: "-=15",
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
    });

    // 3D Mouse Parallax effect
    heroSplit.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const rect = heroSplit.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the hero section (-1 to 1)
        const xPos = (clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const yPos = (clientY - rect.top - rect.height / 2) / (rect.height / 2);

        // 3D Tilt for the product image (rotates away from the mouse like a floating card)
        gsap.to(productImg, {
            rotationY: xPos * 25, // max 25 degrees
            rotationX: -yPos * 25,
            transformPerspective: 1000,
            transformOrigin: "center center",
            ease: "power2.out",
            duration: 0.5
        });

        // Add a dynamic shadow that moves opposite to the tilt for deep 3D realism
        const shadowX = -xPos * 30;
        const shadowY = -yPos * 30;
        gsap.to(productImg, {
            boxShadow: `${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.15)`,
            ease: "power2.out",
            duration: 0.5
        });

        // Subtle parallax pan for the background model image
        gsap.to(modelImg, {
            x: -xPos * 20, 
            y: -yPos * 20,
            scale: 1.05, // keep slightly scaled so it doesn't show edges when panning
            ease: "power2.out",
            duration: 1
        });
    });

    heroSplit.addEventListener('mouseleave', () => {
        // Reset product tilt and shadow
        gsap.to(productImg, {
            rotationY: 0,
            rotationX: 0,
            boxShadow: "0px 15px 30px rgba(0,0,0,0.05)",
            ease: "power3.out",
            duration: 1
        });
        // Reset background pan
        gsap.to(modelImg, {
            x: 0,
            y: 0,
            scale: 1,
            ease: "power3.out",
            duration: 1
        });
    });
    
    // Set initial states
    gsap.set(productImg, {
        boxShadow: "0px 15px 30px rgba(0,0,0,0.05)",
        borderRadius: "4px"
    });
    gsap.set(modelImg, {
        scale: 1
    });
});
