function loadLocalImage(event) {
  const file = event.target.files[0]; // Fixes file uploading array bugs
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('render-bg').src = e.target.result;
    };
    reader.readAsDataURL(file);
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

// Triggers direct native print pipeline without popup blocking issues
function generatePerfectPDF() {
  window.print();
}

window.onload = function() {
  // Preload and initialize default image path
  const img = new Image();
  img.src = "VOUCHER-MASTER-TOKEN.JPG";
  
  updateVoucher();
};
