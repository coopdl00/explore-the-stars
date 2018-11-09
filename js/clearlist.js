document.addEventListener('DOMContentLoaded', function(){
  let clearList = document.querySelector('.clear')
  clearList.addEventListener('click', function () {
    let myNode = document.getElementById("list");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
  })
})
