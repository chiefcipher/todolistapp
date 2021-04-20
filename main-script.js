let inputArea = document.querySelector("#input-area");
let addBtn = document.querySelector("#add-btn");
let listArray = [];

inputArea.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addBtn.click();
  }
});

addBtn.addEventListener("click", () => {
  if (inputArea.value != "") {
    addArray(inputArea.value);
    displayList();
    inputArea.value = "";
  } else {
    alert("Cannot add empty input values");
  }
});

addBtn.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    addBtn.click();
  }
});

function addArray(toAdd) {
  listArray.push(toAdd);
}

function displayList() {
  if (listArray.length < 0) {
    console.log("no list to display");
  } else {
    document.querySelector("#list-holder").innerHTML = "";
    for (let i = 0; i < listArray.length; i++) {
      let newRow = `<div class='list-row' > <div class='content'>  ${listArray[i]}  </div> <div class='controls'> 
      <img tabindex=0 src='svg/edit.svg' title='Edit' alt='Delete' class='control-btns edit-btn'/>
      <img tabindex=0 src='svg/004-delete.svg' title='Delete' alt='Delete' class='control-btns delete-btn'/> 
      </div> </div>`;
      document.querySelector("#list-holder").innerHTML += newRow;
    }
  }

  activateDelEventListeners();
  activateEditEventListeners() ; 

  storeLocalStorage(listArray);
  displayClearAll(); 
  scrollToBottom() ; 
}




function addEnterKeyToDelBtn() {
  let delBtns = document.querySelectorAll(".delete-btn");

  for (let c = 0; c < delBtns.length; c++) {
    delBtns[c].addEventListener("keyup", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        delBtns[c].click();
      }
    });
  }
}


function activateDelEventListeners() {
  let delBtns = document.querySelectorAll(".delete-btn");
  for (let i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener("click", () => {
      deleteArrayElement(i);
    });
  }
  addEnterKeyToDelBtn();
}

function deleteArrayElement(toDelete) {
  listArray.splice(toDelete, 1);
  displayList();
  if (document.querySelectorAll(".list-row").length == 0) {
    localStorage.clear();
  }
}

function storeLocalStorage(listArray) {
  localStorage.setItem("listArray", JSON.stringify(listArray));
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("listArray")) {
    listArray = JSON.parse(localStorage.getItem("listArray"));
    displayList();
  }

  if (document.querySelectorAll(".list-row").length == 0) {
    document.querySelector("#list-container").style.animationName =
      "leftRightContainer";
  }

  displayClearAll();
});

const displayClearAll = () => {
  if (document.querySelectorAll(".list-row").length == 0) {
    document.querySelector("#clear-all").style.display = "none";
  } else {
    document.querySelector("#clear-all").style.display = "block";
  }

  let noOfRow = document.querySelectorAll(".list-row").length;
  document.querySelector("#number-left span").innerText = noOfRow;
};


let clearBtn = document.querySelector("#clear-all button") ; 
let confirmationModal = document.querySelector("#confirmation-box") ; 
clearBtn.addEventListener("click", () => { 
    confirmationModal.style.display = 'flex' ;  
    document.querySelector(".delete").addEventListener('click' , function () { 
      listArray.length = 0 ; 
      confirmationModal.style.display = 'none' ; 
      displayList();
    })
    document.querySelector('.reverse').addEventListener('click' , ()=> { 
      confirmationModal.style.display = 'none' ; 
    })
});


document.querySelector('#clear-all ').addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {e.preventDefault();clearBtn.click(); }
});


function scrollToBottom(){
  let listHolder  = document.querySelector("#list-holder");
  listHolder.scrollTop = listHolder.scrollHeight ; 
}