console.log('Nav script running');
const list = document.querySelector('nav ul');
const listItems = Array.from(document.querySelectorAll('nav ul li'));
const toggler = document.querySelector('#toggler i');
toggler.addEventListener('click',()=>{
    if(list.classList.contains('hide-nav-bar')){
        list.classList.remove('hide-nav-bar');
        toggler.classList.remove('fa-toggle-off');
        toggler.classList.add('fa-toggle-on');
    }else{
        list.classList.add('hide-nav-bar');
        toggler.classList.remove('fa-toggle-on');
        toggler.classList.add('fa-toggle-off');
    }
})
window.onload=function(){
    if(window.innerWidth <= 612){
        list.classList.add('hide-nav-bar');
    }
}