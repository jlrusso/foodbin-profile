var imageContainer = document.getElementById("image-container"),
 		inputFileElement = document.getElementById("file-input"),
 		changePicBtn = document.getElementById("change-pic-btn"),
		uploadPicBtn = document.getElementById("upload-pic-btn");
changePicBtn.addEventListener("click", function(){
	inputFileElement.click();
	changePicBtn.style.display = "none";
	uploadPicBtn.style.display = "block";
})

uploadPicBtn.addEventListener("click", function(){
	changePicBtn.style.display = "block";
	uploadPicBtn.style.display = "none";
})

/*--- Start of User Icon JS --*/
    var userIcon = document.getElementsByClassName("fa-user")[0],
        userList = document.getElementsByClassName("user-list")[0];
        username = document.getElementById("user");
        userParent = document.getElementById("user-parent");
        if(userIcon){
            userIcon.addEventListener("click", function(){
                userList.classList.toggle("show-user-list");
            });
        }

    window.addEventListener("click", function(e){
        if(userIcon){
            if(!e.target.matches(".fa-user")){
                if(userList.classList.contains("show-user-list")){
                    userList.classList.remove("show-user-list");
                }
            }
        }
    });
/*--- End of User Icon JS ---*/

/*--- Check if Order is in Progress ---*/
var orderInProgress = document.getElementById("order-in-progress"),
    orderInProgressVal;
if(orderInProgress){
  orderInProgressVal = orderInProgress.textContent;
}
/*--- End of Order in Progress Check ---*/

/*--- Check if Order is being Editted ---*/
var editInProgress = document.getElementById("edit-in-progress"),
    editInProgressVal;
if(editInProgress){
  editInProgressVal = editInProgress.textContent;
}
/*--- End of Edit Order Check ---*/

/*--- Check if Same Order in Progress ---*/
var sameOrderInProgress = document.getElementById("same-order-in-progress"),
    sameOrderInProgressVal;
if(sameOrderInProgress){
  sameOrderInProgressVal = sameOrderInProgress.textContent;
}
/*--- Check if Same Order in Progress ---*/

/*--- When user clicks order completed btn ---*/
var currentOrderRow = document.getElementById("current-order-row");
var currOrderTooltip = document.getElementById("curr-order-tooltip");
var eraseOrderBtn = document.getElementById("erase-order-btn");
if(currentOrderRow){
  var entireOrdersSection = document.getElementsByClassName(".col-8")[0],
      currentOrderHeading = document.getElementById("current-order-heading"),
      currentOrderOuter = document.getElementById("current-order-outer"),
      currentOrderDestination = document.getElementsByClassName(".location-address-name-container")[0],
      orderCompletedBtn = document.getElementById("order-completed-btn");
}
var previousOrdersContainer = document.getElementById("previous-orders-container");
var previousOrdersHeading = document.getElementById("previous-orders-heading");
var previousOrderRows = document.getElementsByClassName("previous-order-row");
var prevOrderTooltips = document.getElementsByClassName("prev-order-tooltip");
var previousOrderFooter;
var test;

/*--- Show Sideways Scroll Tooltip ---*/
if(currentOrderRow){
  currentOrderRow.addEventListener("mouseover", function(){
    currOrderTooltip.style.opacity = "1";
  })
  currentOrderRow.addEventListener("mouseout", function(){
    currOrderTooltip.style.opacity = "0";
  })
}

if(previousOrderRows){
  for(let i = 0; i < previousOrderRows.length; i++){
    previousOrderRows[i].addEventListener("mouseover", function(){
      prevOrderTooltips[i].style.opacity = "1";
    })

    previousOrderRows[i].addEventListener("mouseout", function(){
      prevOrderTooltips[i].style.opacity = "0";
    })
  }
}
/*--- End of Sideways Scroll Tooltip ---*/

if(orderCompletedBtn) {
  orderCompletedBtn.addEventListener("click", function(){
    test = 10;
    removeCurrentOrder();
  });
}

function removeCurrentOrder(){
  $("#current-order-outer").add("#current-order-heading").animate({
    height: "0px"
  }, 1000, function(){
    setTimeout(function(){
      if(test == 5){
        removeSubmitBtn.click();
      } else {
        eraseOrderBtn.click();
      }
      $(this).remove();
    }, 50)
  })
}

/*--- End of 'order completed' btn click ---*/

/*--- When user clicks edit btn ---*/
var editBtn = document.getElementById("edit-btn"),
    editModalWindow = document.getElementById("modal-window"),
    closeBtnContainer = document.getElementById("close-btn-container");

editBtn.addEventListener("click", function(){
  editModalWindow.style.display = "block";
  closeBtnContainer.style.display = "block";
})
/*--- end of user clicks edit btn ---*/

window.onclick = function(e){
  if(e.target.matches("#modal-window") || e.target.matches("#close-btn-container") || e.target.matches("#modal-close-btn")){
    editModalWindow.style.display = "none";
    closeBtnContainer.style.display = "none";
  }
}

/*--- Set the Width of itemListInner based on number of items in the order row ---*/

var ordersContainer = document.getElementById("all-orders-container");

/*--- End of Setting width of itemListInner ---*/


/*--- When user clicks 'Edit Order' Btn ---*/
var editOrderBtn = document.getElementById("edit-order-btn");
var removeSubmitBtn = document.getElementById("remove-submit");
var hiddenLink = document.getElementById("hidden-link");
if(editOrderBtn){
  editOrderBtn.addEventListener("click", function(){
    test = 5;
    removeCurrentOrder();
  });
}
/*--- End of Edit Order Function ---*/

/*--- When user clicks 'Order Again' Btn ---*/
var orderAgainBtns = document.getElementsByClassName("order-again-btn");

for(let i = 0; i < orderAgainBtns.length; i++){
  orderAgainBtns[i].addEventListener("click", function(e){
    var $orderAgainSubmitBtn = $(this).siblings(".order-again-form").find(".order-again-submit-btn");
    if(orderInProgressVal == "yes" || editInProgressVal == "yes"){
      e.preventDefault();
      alert("Complete current order before ordering again");
    } else {
      $orderAgainSubmitBtn.click();
    }
  })
}
/*--- End of Order Again Function ---*/

/*--- When user clicks 'Remove Order' Btn ---*/
var removeOrderBtns = document.getElementsByClassName("remove-order-btn");
for(let i = 0; i < removeOrderBtns.length; i++){
  removeOrderBtns[i].addEventListener("click", function(){
    var $rmOrderSubmitBtn = $(this).siblings(".remove-prev-form").find(".remove-order-submit-btn");
    var $wholePrevOrder = $(this).parents(".previous-order-inner");
    removeThisPrevOrder($wholePrevOrder, $rmOrderSubmitBtn);
  })
}

function removeThisPrevOrder($order, $btn){
  $order.animate({
    height: "0px"
  }, 1000, function(){
    $order.css("display", "none");
    $btn.click();
  })
}
/*--- End of Remove Order Function ---*/
