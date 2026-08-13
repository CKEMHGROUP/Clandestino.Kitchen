function loadLocalImage(event) {
  const file = event.target.files; 
  if (file && file[0]) {
    const targetImage = document.getElementById('render-bg');
    
    if (targetImage.src && targetImage.src.startsWith('blob:')) {
      URL.revokeObjectURL(targetImage.src);
    }
    
    targetImage.src = URL.createObjectURL(file[0]);
  }
}

// Maps input text values and slider font size selections to the preview layout card
function updateVoucher() {
  const fields = [
    { id: 'city-country' },
    { id: 'issued-for' },
    { id: 'voucher-pi' },
    { id: 'day-month-year' },
    { id: 'complementary' },
    { id: 'customer-payment-id' }
  ];

  fields.forEach(field => {
    const textVal = document.getElementById(`input-${field.id}`).value;
    const sizeVal = document.getElementById(`size-${field.id}`).value;
    
    // Update live text node
    const renderNode = document.getElementById(`render-${field.id}`);
    renderNode.textContent = textVal;
    renderNode.style.fontSize = `${sizeVal}px`;
    
    // Sync slider number label badge
    document.getElementById(`badge-${field.id}`).textContent = `${sizeVal}px`;
  });
}

function generatePerfectPDF() {
  window.print();
}

window.onload = function() {
  const bgImg = document.getElementById('render-bg');
  
  if (window.location.hostname.includes('clandestino.kitchen')) {
    bgImg.src = "/print/VOUCHER-MASTER-TOKEN.jpg";
  } else {
    bgImg.src = "VOUCHER-MASTER-TOKEN.jpg";
  }

  updateVoucher();
};
