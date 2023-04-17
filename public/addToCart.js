var testsCounter = document.getElementById('counter');
var testsCounterMobile = document.getElementById('mobile-counter');
var count = 0;
const addToCart = Array.from(document.querySelectorAll('button.add-to-cart-btn'));
var checkout = document.querySelector('#checkout');
var checkoutListContainer = document.querySelector('#checkout-list');
var checkoutFormContainer = document.querySelector('#checkout-form');
var checkoutList = document.querySelector('#checkout-list-inner');
var proceedToCheckout = document.querySelector('#next-btn');
var prevBtn = document.querySelector('#prev-btn');
const selectedTests = [];
var stepCount = 0;

function nextStep(){
  console.log('Im running');
  console.log(stepCount,'scn');
  if(stepCount < 1){
    checkoutListContainer.style.display='none';
    checkoutFormContainer.style.display='flex';
    stepCount++;
  }else{
    return;
  }
}
function prevStep(){
  console.log(stepCount,'scp');
  if(stepCount > 0){
      checkoutListContainer.style='block';
      checkoutFormContainer.style.display='none';
      stepCount--;
  }else{
    return;
  }
}
proceedToCheckout.addEventListener('click',nextStep);
prevBtn.addEventListener('click',prevStep);
function animateBtn({target}){
  target['style']['animation'] = 'button-animation 800ms ease-in-out';
}
function increaseCounter(){
  count++;
  testsCounterMobile.innerText=count;
  testsCounter.innerText=count;
}
function decreaseCounter(){
  count--;
  testsCounterMobile.innerText=count;
  testsCounter.innerText=count;
}
function getName(e){
  let test = e.target.parentNode.parentNode;
  test = test.querySelector('.test-name h3');
  console.log(test);
  return test.getAttribute('data-test-name');
}
function createTest(testName){
  let div = document.createElement('div');
  div.appendChild(addName(testName));
  div.appendChild(addCancelBtn(testName));
  checkoutList.appendChild(div);
}
function addName(testName){
  let span = document.createElement('span');
  span.appendChild(document.createTextNode(testName));
  return span;
};
function addCancelBtn(testName){
  let cancelBtn = document.createElement('span');
  cancelBtn.appendChild(document.createTextNode('X'));
  cancelBtn.addEventListener('click',function(){
    selectedTests.splice(selectedTests.indexOf(testName),1);
    this.parentElement.remove();
    decreaseCounter();
});
    return cancelBtn;
}
function addTest(selectedTest){
  let testName = getName(selectedTest);
  selectedTests.push(testName);
  animateBtn(selectedTest);
  increaseCounter();
  createTest(testName);
  setTimeout(() => {
    selectedTest['target']['style']['animation'] = 'none';
  }, 1000);
}
addToCart.forEach((btn) => {
  btn.addEventListener('click',function(e){
    addTest(e);
  });
});








