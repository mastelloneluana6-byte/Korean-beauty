document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector('.bsc-wrapper');
    const items = document.querySelectorAll('.bsc-item');

    if (!wrapper || items.length === 0) return;

    // Center the second item by default (index 1) to match the layout
    setTimeout(() => {
        const defaultItem = items[1] || items[0];
        // Calculate offset to center this item
        // The track has padding-left: 50vw. 
        // We just scroll the item into view.
        defaultItem.scrollIntoView({ behavior: 'auto', inline: 'center' });
    }, 100);

    // Setup Intersection Observer to detect which item is in the center
    const observerOptions = {
        root: wrapper,
        rootMargin: '0px',
        threshold: 0.6 // Item must be at least 60% visible to become active
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all
                items.forEach(item => item.classList.remove('active'));
                // Add active class to the intersecting one
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    items.forEach(item => {
        observer.observe(item);

        // Click to scroll into center
        item.addEventListener('click', () => {
            item.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        });
    });
});
