// Horizon Heights Service Gateway Scripts

document.addEventListener('DOMContentLoaded', () => {

    // Modal Logic
    const openButtons = document.querySelectorAll('.btn-open-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    const backdrops = document.querySelectorAll('.modal-backdrop');

    // Open Modal
    openButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling to panel click if we add that later
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal (X button)
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-backdrop');
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        });
    });

    // Close Modal (Click Backdrop)
    backdrops.forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Optional: Make entire panel clickable to open modal (desktop UX enhancement)
    const panels = document.querySelectorAll('.service-panel');
    panels.forEach(panel => {
        panel.addEventListener('click', (e) => {
            // Only if not clicking the button directly (avoid double trigger)
            if (!e.target.classList.contains('btn-open-modal')) {
                const btn = panel.querySelector('.btn-open-modal');
                if (btn) btn.click();
            }
        });
    });

    // Real Estate Form Logic (Land vs Residential/Commercial)
    const reRadioButtons = document.querySelectorAll('input[name="re-type"]');
    const landFields = document.getElementById('re-land-fields');
    const standardFields = document.getElementById('re-standard-fields');

    reRadioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'land') {
                landFields.style.display = 'block';
                // Optional: Hide standard fields if they aren't relevant for land, 
                // but address is usually still needed. We'll keep them visible for now 
                // or you can toggle them off if preferred.
            } else {
                landFields.style.display = 'none';
            }
        });
    });

});
