/* ========== SERVICES PAGE ENHANCED INTERACTIONS ========== */

document.addEventListener('DOMContentLoaded', () => {
    initPackageBuilder();
    initBeforeAfterSlider();
    initROICalculator();
});

// ========== PACKAGE BUILDER ==========
function initPackageBuilder() {
    const options = document.querySelectorAll('.service-option');
    const modules = document.getElementById('packageModules');
    const deliverablesList = document.getElementById('selectedDeliverables');
    const subtotalEl = document.getElementById('packageSubtotal');
    const totalEl = document.getElementById('packageTotal');
    const savingsEl = document.getElementById('bundleSavings');
    const savingsAmountEl = document.getElementById('savingsAmount');

    if (!options.length) return;

    const deliverables = {
        photos: ['25-35 edited photos', 'MLS-ready formats', 'Window pulls', '48hr delivery'],
        aerial: ['10-15 aerial shots', 'Boundary overlays', 'Unique perspectives', 'High-res downloads'],
        video: ['2-3 min cinematic tour', 'Licensed music', '4K quality', 'Social media cuts'],
        twilight: ['5-8 golden hour shots', 'Enhanced lighting', 'Dramatic skies', 'Premium editing'],
        social: ['3 short-form videos', 'Instagram/TikTok optimized', 'Trending audio', 'Caption suggestions']
    };

    options.forEach(option => {
        const checkbox = option.querySelector('input[type="checkbox"]');
        const moduleType = option.dataset.module;

        checkbox.addEventListener('change', () => {
            updatePackage();

            if (checkbox.checked) {
                addModule(moduleType);
            } else {
                removeModule(moduleType);
            }
        });
    });

    function updatePackage() {
        let subtotal = 0;
        const selected = [];
        const selectedDeliverables = [];

        options.forEach(option => {
            const checkbox = option.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                const price = parseInt(option.dataset.price);
                const service = option.dataset.service;
                subtotal += price;
                selected.push(service);
                selectedDeliverables.push(...deliverables[service]);
            }
        });

        // Calculate bundle discount (10% off for 3+ services)
        let savings = 0;
        if (selected.length >= 3) {
            savings = Math.round(subtotal * 0.1);
            savingsEl.style.display = 'flex';
            savingsAmountEl.textContent = `-$${savings}`;
        } else {
            savingsEl.style.display = 'none';
        }

        const total = subtotal - savings;

        subtotalEl.textContent = `$${subtotal}`;
        totalEl.textContent = `$${total}`;

        // Update deliverables list
        if (selectedDeliverables.length > 0) {
            deliverablesList.innerHTML = selectedDeliverables
                .map(item => `<li>✓ ${item}</li>`)
                .join('');
        } else {
            deliverablesList.innerHTML = '<li style="opacity: 0.5; font-style: italic;">Select services to see deliverables...</li>';
        }
    }

    function addModule(type) {
        const module = document.createElement('div');
        module.className = 'drone-module';
        module.dataset.type = type;

        // Position modules around the drone
        const positions = {
            camera: 'top: 30%; left: 60%;',
            propeller: 'top: 15%; left: 45%;',
            gimbal: 'top: 50%; left: 65%;',
            light: 'bottom: 30%; left: 40%;',
            antenna: 'top: 20%; right: 30%;'
        };

        module.style.cssText = positions[type] || 'top: 50%; left: 50%;';
        module.innerHTML = `
            <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="15" fill="var(--hh-brand-teal)" opacity="0.6"/>
                <circle cx="20" cy="20" r="8" fill="var(--hh-brand-orange)"/>
            </svg>
        `;

        modules.appendChild(module);
    }

    function removeModule(type) {
        const module = modules.querySelector(`[data-type="${type}"]`);
        if (module) {
            module.style.animation = 'moduleDisappear 0.3s ease forwards';
            setTimeout(() => module.remove(), 300);
        }
    }
}

// ========== BEFORE/AFTER SLIDER ==========
function initBeforeAfterSlider() {
    const sliders = document.querySelectorAll('.comparison-slider');

    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const afterImage = slider.querySelector('.after-image');
        const container = slider.querySelector('.comparison-images');

        if (!handle || !afterImage || !container) return;

        let isDragging = false;

        const updateSlider = (e) => {
            const rect = container.getBoundingClientRect();
            let x = e.clientX || e.touches[0].clientX;
            let percent = ((x - rect.left) / rect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));

            handle.style.left = `${percent}%`;
            afterImage.style.clipPath = `polygon(${percent}% 0, 100% 0, 100% 100%, ${percent}% 100%)`;
        };

        handle.addEventListener('mousedown', () => isDragging = true);
        handle.addEventListener('touchstart', () => isDragging = true);

        document.addEventListener('mousemove', (e) => {
            if (isDragging) updateSlider(e);
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) updateSlider(e);
        });

        document.addEventListener('mouseup', () => isDragging = false);
        document.addEventListener('touchend', () => isDragging = false);

        // Click to position
        container.addEventListener('click', (e) => {
            if (!isDragging) updateSlider(e);
        });
    });
}

// ========== ROI CALCULATOR ==========
function initROICalculator() {
    const propertyValueInput = document.getElementById('propertyValue');
    const monthlyHoldingInput = document.getElementById('monthlyHolding');
    const packageCostSelect = document.getElementById('packageCost');

    if (!propertyValueInput || !monthlyHoldingInput || !packageCostSelect) return;

    const calculate = () => {
        const propertyValue = parseFloat(propertyValueInput.value) || 0;
        const monthlyHolding = parseFloat(monthlyHoldingInput.value) || 0;
        const packageCost = parseFloat(packageCostSelect.value) || 0;

        // Market data: Homes with professional photos sell 68% faster
        const normalDays = 68;
        const withPhotoDays = Math.round(normalDays * 0.32); // 68% faster = 32% of time

        const normalCosts = Math.round((normalDays / 30) * monthlyHolding);
        const withCosts = Math.round((withPhotoDays / 30) * monthlyHolding);

        const savings = (normalCosts - withCosts) - packageCost;
        const roiPercent = Math.round((savings / packageCost) * 100);

        // Update DOM
        document.getElementById('normalDays').textContent = `${normalDays} days`;
        document.getElementById('normalCosts').textContent = `$${normalCosts.toLocaleString()}`;
        document.getElementById('withDays').textContent = `${withPhotoDays} days`;
        document.getElementById('withCosts').textContent = `$${withCosts.toLocaleString()}`;
        document.getElementById('photoCost').textContent = `$${packageCost}`;
        document.getElementById('totalSavings').textContent = `$${savings.toLocaleString()}`;
        document.getElementById('roiMultiple').textContent = `${roiPercent}%`;
    };

    propertyValueInput.addEventListener('input', calculate);
    monthlyHoldingInput.addEventListener('input', calculate);
    packageCostSelect.addEventListener('change', calculate);

    // Initial calculation
    calculate();
}

// Add CSS animation for module disappear
const style = document.createElement('style');
style.textContent = `
    @keyframes moduleDisappear {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(style);
