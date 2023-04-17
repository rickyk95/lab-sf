const searchBox = document.querySelector('#search-box input');
const tests = Array.from(document.querySelectorAll('.test-name h3'));

searchBox.addEventListener('keyup',({target})=>{
    tests.forEach((test)=>{
        if(test.getAttribute('data-test-name')){
            if(test.getAttribute('data-test-name').toLowerCase().includes(target.value.toLowerCase())){
                test.parentElement.parentElement.classList.remove('hidden');
            }else{
                test.parentElement.parentElement.classList.add('hidden');
            }
        }
    })
});
