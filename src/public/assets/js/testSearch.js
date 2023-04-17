const testSearch = document.querySelector('#test-search');
var testDivContainers = Array.from(document.querySelectorAll('.test-div'));
var testDivsHeaders = Array.from(document.querySelectorAll('.test-div h4'));
var currentIndex = 0;
var searchTerm = '';
testSearch.addEventListener('keyup',(e)=>{
    searchTerm=e.target.value.toLowerCase();
    currentIndex = searchTerm.length;
    testDivsHeaders.forEach((testDivHeader,index)=>{
        let searchableTerm = testDivHeader.innerText.trim().slice(0,currentIndex).toLowerCase();
        if(searchableTerm !== searchTerm){
            testDivContainers[index].style.display="none";
        }else{
            testDivContainers[index].style.display="block";
        }
        
    });
});