const form = document.querySelector('form')
const nombre = form['nombre']
const apellido = form['apellido']
const correo = form['correo']
const checkboxes = document.querySelectorAll('input[type="checkbox"]')
const inputs = [nombre,apellido,correo]
console.log(nombre.nextElementSibling.id,1000)
console.log(apellido.nextElementSibling.id,1000)
console.log(correo.nextElementSibling.id,1000)

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


function inputValidation(input,index){
    if(input.value.trim().length === 0){
        input.style.border="2px red solid";
        input.nextElementSibling.innerText="Este campo esta vacío";
        input.nextElementSibling.style.color="red";

        return false
    }else{
        input.style.border="2px green solid";
        input.nextElementSibling.innerText="";
    
    }
    if(index === 2 && validateEmail(input.value.trim()) === false ){
        input.nextElementSibling.innerText="Este correo no es válido";
        input.style.border="2px red solid";
        input.nextElementSibling.style.color="red";

        return false
    }

    return true

}



form.addEventListener('submit',(e)=>{
       var wrongInputCount = 0;
       var checkedCount = 0;
      inputs.forEach((input,index)=>{   
         inputValidation(input,index) ? '' : wrongInputCount++
         console.log(wrongInputCount)
      })
      checkboxes.forEach((checkbox)=>{
        checkbox.checked ? checkedCount++ : ''
      })

      console.log(checkedCount,'checkedCount')
      if(wrongInputCount > 0 || checkedCount < 1){
          e.preventDefault()
      }
     
})