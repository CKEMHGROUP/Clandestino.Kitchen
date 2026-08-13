function loadLocalImage(event) {
  const files = event.target.files;
  if (files && files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('render-bg').src = e.target.result;
    };
    reader.readAsDataURL(files[0]);
  }
}

function updateVoucher() {
  document.getElementById('render-city-country').textContent = document.getElementById('input-city-country').value;
  document.getElementById('render-issued-for').textContent = document.getElementById('input-issued-for').value;
  document.getElementById('render-voucher-pi').textContent = document.getElementById('input-voucher-pi').value;
  document.getElementById('render-day-month-year').textContent = document.getElementById('input-day-month-year').value;
  document.getElementById('render-complementary').textContent = document.getElementById('input-complementary').value;
  document.getElementById('render-customer-payment-id').textContent = document.getElementById('input-customer-payment-id').value;
}

// SECURE ONE-CLICK DOWNLOAD ON LIVE SERVERS
function generatePerfectPDF() {
  const element = document.getElementById('voucher-doc');
  const rawName = document.getElementById('input-issued-for').value;
  const safeName = rawName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const filenameStr = safeName ? `joestable-voucher-${safeName}.pdf` : 'joestable-voucher.pdf';
  
  const configurationOptions = {
    margin:       0,
    filename:     filenameStr,
    image:        { type: 'jpeg', quality: 1.0 },
    html2canvas:  { 
      scale: 2, 
      useCORS: true, // Crucial for live server graphic assets
      logging: false,
      letterRendering: true
    },
    // Trims canvas boundaries cleanly to match the 1000px width aspect exactly
    jsPDF:        { unit: 'pt', format: [1000, 323.5], orientation: 'landscape' }
  };

  html2pdf().from(element).set(configurationOptions).save();
}

window.onload = function() {
  updateVoucher();
};
