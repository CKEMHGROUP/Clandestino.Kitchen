// FIX: Uses absolute blob storage pointers to load uploaded assets with zero CORS blockades
function loadLocalImage(event) {
  const file = event.target.files[0]; 
  if (file) {
    const targetImage = document.getElementById('render-bg');
    
    // Revoke previous memory objects to prevent internal leak crashes
    if (targetImage.src && targetImage.src.startsWith('blob:')) {
      URL.revokeObjectURL(targetImage.src);
    }
    
    // Generate an absolute runtime link binding the local file to the live page instance
    targetImage.src = URL.createObjectURL(file);
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

function generatePerfectPDF() {
  const voucherHTML = document.getElementById('voucher-doc').innerHTML;
  const printWindow = window.open('', '_blank', 'width=1000,height=324');
  
  printWindow.document.write(`
    <html>
    <head>
      <title>Voucher Export Engine</title>
      <style>
        * { box-sizing: border-box; }
        html, body { 
          margin: 0 !important; padding: 0 !important; 
          background: #111; overflow: hidden !important;
          width: 1000px !important; height: 323.5px !important;
        }
        .voucher-container { width: 1000px !important; height: 323.5px !important; position: relative; overflow: hidden; }
        .voucher-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: fill; }
        .overlay-text {
          position: absolute; font-family: Arial, Helvetica, sans-serif; font-weight: 800;
          text-transform: uppercase; white-space: nowrap; display: flex; align-items: center;
          line-height: 1; color: #000000; background: transparent !important;
        }
        .val-city-country { top: 90px; left: 236px; width: 130px; height: 16px; font-size: 10px; letter-spacing: 0.5px; }
        .val-issued-for { top: 135px; left: 236px; width: 350px; height: 30px; font-size: 15px; letter-spacing: 0.5px; }
        .val-day-month-year { top: 39px; left: 28px; width: 37px; height: 236px; font-size: 16px; letter-spacing: 1.5px; writing-mode: vertical-rl; justify-content: center; text-align: center; }
        .val-voucher-pi { top: 220px; left: 226px; width: 150px; height: 24px; font-size: 10px; letter-spacing: 0.5px; }
        .val-complementary { top: 112px; left: 131px; width: 22px; height: 140px; font-size: 7.5px; letter-spacing: 1px; writing-mode: vertical-rl; justify-content: center; text-align: center; }
        .val-customer-payment-id { top: 32px; left: 975px; width: 16px; height: 258px; font-size: 7.5px; letter-spacing: 0.8px; writing-mode: vertical-rl; transform: rotate(180deg); justify-content: center; text-align: center; }
        @media print {
          @page { size: 1000pt 323.5pt landscape; margin: 0 !important; }
          html, body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      </style>
    </head>
    <body>
      <div class="voucher-container">${voucherHTML}</div>
      <script>
        window.addEventListener('load', function() {
          setTimeout(function() { window.print(); window.close(); }, 250);
        });
      <\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

// FIX: Auto-loads an absolute server directory lookup loop path if it detects execution from the clandestino domain
window.onload = function() {
  const bgImg = document.getElementById('render-bg');
  
  if (window.location.hostname.includes('clandestino.kitchen')) {
    // If executing from production, source the image path out of the live server route root directory explicitly
    bgImg.src = "/print/VOUCHER-MASTER-TOKEN.jpg";
  } else {
    // Standard local fallback directory link path mapping
    bgImg.src = "VOUCHER-MASTER-TOKEN.jpg";
  }

  updateVoucher();
};
