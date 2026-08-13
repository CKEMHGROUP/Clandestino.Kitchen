/**
 * Clandestino Kitchen ® 2026
 * DBA Brand ID: JoEs TaBLe
 * Author IP of Company: CK Events Management & Hospitality Group LLC
 * Reg. No: 2026-001995375
 * All rights protected : CK Events Management & Hospitality Group LLC ® 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  // Preload and verify background mask image loading
  const maskImageUrl = 'VOUCHER-MASTER-TOKEN.JPG';
  preloadMaskImage(maskImageUrl);

  // Initialize input bindings and print triggers
  initEventListeners();
});

/**
 * Preload the mask image directly into browser cache
 */
function preloadMaskImage(url) {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    const maskElement = document.querySelector('.voucher-mask');
    if (maskElement) {
      maskElement.style.backgroundImage = `url('${url}')`;
    }
  };
  img.onerror = () => {
    console.warn(`[Voucher App] Could not load mask image at path: ${url}. Ensure case-sensitivity matches GitHub repository.`);
  };
}

/**
 * Bind DOM elements for live input rendering and print behavior
 */
function initEventListeners() {
  const inputs = document.querySelectorAll('.controls-panel input, .controls-panel select');
  
  inputs.forEach(input => {
    input.addEventListener('input', updateVoucherPreview);
  });

  const printBtn = document.querySelector('.btn-print') || document.getElementById('print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', handlePdfPrint);
  }
}

/**
 * Update real-time text overlays on the voucher preview
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

  if (outTitle && titleInput) outTitle.textContent = titleInput.value || '';
  if (outName && nameInput) outName.textContent = nameInput.value ? `Recipient: ${nameInput.value}` : 'Recipient: ---';
  if (outCode && codeInput) outCode.textContent = codeInput.value ? `Code: ${codeInput.value}` : 'Code: ---';
  if (outDate && dateInput) outDate.textContent = dateInput.value ? `Valid Until: ${dateInput.value}` : 'Valid Until: ---';
}

/**
 * Trigger HTML-to-PDF / native print prompt
 */
function handlePdfPrint(e) {
  if (e) e.preventDefault();
  
  // Trigger native browser print dialog (saves cleanly to PDF via CSS media rules)
  window.print();
}
