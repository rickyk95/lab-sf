//Code to submit quote form;

const checkoutForm = document.querySelector('#checkout-form form');
checkoutForm.addEventListener('submit',function(e){
    console.log('Form submission begun');
    e.preventDefault();
    let name,lastName,email;
    formSubmit({
        selectedTests:selectedTests,
        name:checkoutForm.querySelector('input[name=nombre').value,
        lastName:checkoutForm.querySelector('input[name=apellido').value,
        email:checkoutForm.querySelector('input[name=correo').value,
        website_form:'quote_individual'
    });
})


function formSubmit(formData){
        console.log('Form being submiited');
        fetch('/quote',{
            headers:{'Content-type':'application/json;charset=UTF-8'},
            method:'POST',
            body:JSON.stringify(formData)
        }).then((response)=>{
            checkoutForm.style.textAlign='center';
            checkoutForm.innerHTML=`<i class="fa-solid fa-check" style="font-size:3rem;color:green;"></i>\n<h2>Tu cotización ha sido enviada!</h2>`;
            count=0;
            testsCounter.innerText=count;
            checkoutList.innerHTML='';        
            // setTimeout(()=>{
            //     prevStep();
            //     stepCount=0;
            // },1000);
            return response.text();
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
}

//Code to submit contact form
const contactForm = document.querySelector('#contact-form form');
contactForm.addEventListener('submit',async (e)=>{
        try{ 
            e.preventDefault();
           let result =  await fetch('/contact',{
                headers:{'Content-type':'application/json;charset=UTF-8'},
                method:'POST',
                body:JSON.stringify({
                    nombre:contactForm.querySelector('input[name=nombre').value,
                    lastName:contactForm.querySelector('input[name=lastName').value,
                    email:contactForm.querySelector('input[name=email').value,
                    website_form:'contact_individual'
                })
            });
            if(result.ok){
                contactForm.innerHTML='<h2> Tu mensaje ha sido recibido. </h2>';
            }
        }
        catch(e){
            console.log(e,'Error occurred');
        }
  
});

