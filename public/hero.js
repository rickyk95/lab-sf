const imagesMap={
    web:['images/web/main.jpg','images/web/main-2.jpg'],
    mobile:['images/mobile/main.jpg','images/mobile/main-2.jpg']
}
var images = imagesMap['web'];
var currentImage = images[0];
var counter = 0;

function chooseImages(){
    if(window.innerWidth <= 612){
        images = imagesMap['mobile'];
    }else{
        images = imagesMap['web'];
    }
};

window.addEventListener('resize',chooseImages)
window.addEventListener('load',chooseImages);
setInterval(()=>{
    counter >= images.length-1 ? counter = 0 : counter++;
    currentImage = images[counter];
    console.log(currentImage,'ci',counter);
    document.getElementById('main').style.backgroundImage=`url(${currentImage})`;
},2000);