/**
 * Metadata Verification:
 * Copyright: Clandestino Kitchen ® 2026 
 * DBA Brand ID: JoEs TaBLe
 * Author IP of Company: CK Events Management & Hospitality Group LLC 
 * Reg. No: 2026-001995375
 * All rights protected : CK Events Management & Hospitality Group LLC ® 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  const MASK_IMAGE_PATH = 'VOUCHER-MASTER-TOKEN.JPG';
  
  preloadMaskImage(MASK_IMAGE_PATH);
  initEventListeners();
  updateVoucherPreview(); // Run initial calculation
});

/**
 * Preload the image asset into cache and verify background setup
 */
function preloadMaskImage(imagePath) {
  const img = new Image();
  img.src = imagePath;
  
  img.onload = () => {
    const maskElement = document.querySelector('.voucher-mask');
    if (maskElement) {
      maskElement.style.backgroundImage = `url('${imagePath}')`;
    }
  };

  img.onerror = () => {
    console.warn(`[Voucher App] Image asset failed to load at path: "${imagePath}". Ensure file case sensitivity matches exact repository filename on GitHub.`);
  };
}

/**
 * Safely bind event listeners to prevent runtime errors
 */
function initEventListeners() {
  const inputs = document.querySelectorAll('.controls-panel input, .controls-panel select');
  
  inputs.forEach(input => {
    input.addEventListener('input', updateVoucherPreview);
  });

  const printBtn = document.getElementById('btn-print-trigger') || document.querySelector('.btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', handlePdfPrint);
  }
}

/**
 * Live sync form inputs with voucher dynamic output layers
 */
function updateVoucherPreview() {
  const titleInput = document.getElementById('in-title');
  const nameInput = document.getElementById('in-name');
  const codeInput = document.getElementById('in-code');
  const dateInput = document.getElementById('in-date');

  const outTitle = document.getElementById('out-title');
  const outName = document.getElementById('out-name');
  const outCode = document.getElementById('out-code');
  const outDate = document.getElementById('out-date');

  if (outTitle && titleInput) {
    outTitle.textContent = titleInput.value.trim() !== '' ? titleInput.value : 'GIFT VOUCHER';
  }

  if (outName && nameInput) {
    outName.textContent = nameInput.value.trim() !== '' ? `Recipient: ${nameInput.value}` : 'Recipient: ---';
  }

  if (outCode && codeInput) {
    outCode.textContent = codeInput.value.trim() !== '' ? `Code: ${codeInput.value}` : 'Code: ---';
  }

  if (outDate && dateInput) {
    outDate.textContent = dateInput.value ? `Valid Until: ${dateDateFormatted(dateInput.value)}` : 'Valid Until: ---';
  }
}

/**
 * Utility to format input dates cleanly
 */
function dateDateFormatted(dateStr) {
  if (!dateStr) return '---';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[1]}/${parts[2]}/${parts[0]}`;
}

/**
 * Handles PDF execution across browsers cleanly
 */
function handlePdfPrint(event) {
  if (event) event.preventDefault();
  
  // Triggers native browser print engine (uses @media print stylesheet rules)
  window.print();
}
