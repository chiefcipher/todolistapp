let editModal = document.querySelector('#edit-list') ;
let editInputTag = document.querySelector('#edit-area') ; 
let confirmBtn = document.querySelector('.edit-entry') ;
let reverseBtn = document.querySelector('.edit-reverse') ; 

editInputTag.addEventListener('keypress', (e)=> { 
    if (e.keyCode === 13) { 
        e.preventDefault() ; 
        confirmBtn.click()
    }
})

reverseBtn.addEventListener('click', ()=> { 
    editModal.style.display = 'none' ; 
})

function enterKeyToEdit() { 
let editBtns = document.querySelectorAll('.edit-btn') ;
    for (let i = 0 ; i < editBtns.length ; i++) { 
        editBtns[i].addEventListener('keypress', (e)=> { 
         if (e.keyCode === 13) { 
             e.preventDefault() ; 
             editBtns[i].click() ;
         }
        })
    }
}

function activateEditEventListeners() { 
    let editBtns = document.querySelectorAll('.edit-btn') ;
    for (let i = 0 ; i < editBtns.length ; i++) {     
        editBtns[i].addEventListener('click' , function () { 
          editModal.style.display ='flex';
          addEditValue(listArray[i],  i)
      } )
    }
    enterKeyToEdit() ;

  }

  function addEditValue (theValue , arrayIndex ){ 
    editInputTag.value = theValue ; 

    confirmBtn.onclick =  ()=> {     
        listArray[arrayIndex] = editInputTag.value ;
        editModal.style.display = 'none' ;
        displayList() ;
    }

}