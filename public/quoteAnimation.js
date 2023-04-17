const mailIcon = document.querySelector('#quotation i');
const mobileQuotation = document.querySelector('#abrir-cotizador');
const openQuotationIcons = [mailIcon,mobileQuotation];
openQuotationIcons.forEach((icon)=>{
  icon.addEventListener('click',()=>{
    if(checkout.classList.contains('slide-right')){
      checkout.classList.remove('slide-right');
      if(icon.innerText.toLowerCase() === 'abrir cotizador'){
        icon.innerText='Cerrar Cotizador';
      }
    }else{
      checkout.classList.add('slide-right');
      if(innerWidth <= 612){
        icon.innerText='Abrir Cotizador';
      }
    }
  })
})

