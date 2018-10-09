const headerObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.userIcon = document.getElementsByClassName("fa-user")[0];
    this.userMenu = document.getElementsByClassName("user-menu")[0];
    this.goHomeBtn = document.getElementById("go-home-btn");
    this.logoutBtn = document.getElementById("logout-btn");
    this.logoutSubmit = document.getElementById("logout-submit");
  },
  bindEvents: function(){
    this.userIcon.addEventListener("click", this.showUserMenu.bind(this));
    this.goHomeBtn.addEventListener("click", this.redirectToHome.bind(this));
    this.logoutBtn.addEventListener("click", this.logOutHandler.bind(this));
  },
  showUserMenu: function(){
    if(this.userMenu.style.display === "block"){
      this.userMenu.style.display = "none";
    } else {
      this.userMenu.style.display = "block"
    }
  },
  redirectToHome: function(){
    document.getElementById("home-anchor").click();
  },
  logOutHandler: function(){
    this.logoutSubmit.click();
  }
}
headerObj.init();




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

var closeBtnContainers = document.getElementsByClassName("close-btn-container");
for(let i = 0; i < closeBtnContainers.length; i++){
  closeBtnContainers[i].addEventListener("click", function(){
    var window = this.parentElement;
    window.style.display = "none";
    $("body").removeClass("stop-scrolling");
    closeOtherConvos();
  })
}

var modalWindows = document.getElementsByClassName("modal-window");
for(let i = 0; i < modalWindows.length; i++){
  modalWindows[i].addEventListener("click", function(e){
    if(e.target.matches(".modal-window")){
      this.style.display = "none";
      $("body").removeClass("stop-scrolling");
      closeOtherConvos();
    }
  })
}

/*--- Start of User Icon JS --*/
    // var userIcon = document.getElementsByClassName("fa-user")[0],
    //     userList = document.getElementsByClassName("user-menu")[0];
    //     if(userIcon){
    //         userIcon.addEventListener("click", function(){
    //             userList.classList.toggle("show-user-menu");
    //         });
    //     }

    // var goHomeBtn = document.getElementById("go-home-btn");
    // if(goHomeBtn){
    //   goHomeBtn.addEventListener("click", function(){
    //     document.getElementById("home-anchor").click();
    //   })
    // }

    // window.addEventListener("click", function(e){
    //     if(userIcon){
    //         if(!e.target.matches(".fa-user")){
    //             if(userList.classList.contains("show-user-menu")){
    //                 userList.classList.remove("show-user-menu");
    //             }
    //         }
    //     }
    // });

    // var logoutBtn = document.getElementById("logout-btn"),
    //     logoutSubmit = document.getElementById("logout-submit");
    // if(logoutBtn){
    //   logoutBtn.addEventListener("click", function(){
    //     logoutSubmit.click();
    //   })
    // }
/*--- End of User Icon JS ---*/

var notificationsBtn = document.getElementById("my-notifications-btn"),
    notificationsModal = document.getElementById("notifications-modal"),
    closeBtnContainerTwo = document.getElementsByClassName("close-btn-container")[1];
    notificationsBtn.addEventListener("click", function(){
        notificationsModal.style.display = "block";
        closeBtnContainerTwo.style.display = "block";
    })

var conversationsBtn = document.getElementById("my-conversations-btn"),
    conversationsModal = document.getElementById("conversations-modal"),
    closeBtnContainerThree = document.getElementsByClassName("close-btn-container")[2];
    conversationsBtn.addEventListener("click", function(){
      conversationsModal.style.display = "block";
      closeBtnContainerThree.style.display = "block";
    })



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


/*--- When user clicks order completed btn ---*/
var currentOrderRow = document.getElementById("current-order-row");
var currOrderTooltip = document.getElementById("curr-order-tooltip");
var orderCompletedSubmit = document.getElementById("order-complete-submit");
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
var currOrder;

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

function removeCurrentOrder(){
  $("#current-order-outer").add("#current-order-heading").animate({
    height: "0px"
  }, 1000, function(){
    setTimeout(function(){
      switch(true){
        case (currOrder == "editing"):
          editOrderSubmit.click();
        break;
        case (currOrder == "completed"):
          orderCompletedSubmit.click();
        break;
        case (currOrder == "cancelled"):
          cancelOrderSubmit.click();
        break;
      }
      $(this).remove();
    }, 50)
  })
}

/*--- End of 'order completed' btn click ---*/

/*--- When user clicks edit btn ---*/
var editBtn = document.getElementById("edit-btn"),
    editModalWindow = document.getElementById("edit-modal-window"),
    closeBtnContainerOne = document.getElementsByClassName("close-btn-container")[0];

editBtn.addEventListener("click", function(){
  editModalWindow.style.display = "block";
  closeBtnContainerOne.style.display = "block";
})
/*--- end of user clicks edit btn ---*/


var ordersContainer = document.getElementById("all-orders-container");

/*--- When user clicks 'Edit Order' Btn ---*/
var editOrderBtn = document.getElementById("edit-order-btn"),
    editOrderSubmit = document.getElementById("edit-order-submit");

var cancelOrderBtn = document.getElementById("cancel-order-btn"),
    cancelOrderSubmit = document.getElementById("cancel-order-submit");


if(editOrderBtn){
  editOrderBtn.addEventListener("click", function(){
    currOrder = "editing";
    removeCurrentOrder();
  });
}
if(orderCompletedBtn) {
  orderCompletedBtn.addEventListener("click", function(){
    currOrder = "completed";
    removeCurrentOrder();
  });
}
if(cancelOrderBtn){
  cancelOrderBtn.addEventListener("click", function(){
    currOrder = "cancelled";
    removeCurrentOrder();
  })
}

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


var notificationsContainer = document.getElementById("notifications-container"),
    notiBadge = document.getElementById("noti-badge"),
    removeBtns = document.getElementsByClassName("close-box"),
    denyBtns = document.getElementsByClassName("deny-btn"),
    acceptBtns = document.getElementsByClassName("accept-btn"),
    mailIcons = document.getElementsByClassName("mail-icon"),
    denyOfferSubmit = document.getElementsByClassName("deny-offer-submit"),
    removeNotiSubmit = document.getElementsByClassName("remove-noti-submit"),
    acceptOfferSubmit = document.getElementsByClassName("accept-offer-submit"),
    denyBtnsLen = denyBtns.length,
    removeBtnsLen = removeBtns.length,
    acceptBtnsLen = acceptBtns.length,
    sendMessageForms = document.getElementsByClassName("send-message-form"),
    closeNotiContainers = document.getElementsByClassName("close-noti-container"),
    closeBarOnes = document.getElementsByClassName("close-bar-one"),
    closeBarTwos = document.getElementsByClassName("close-bar-two");

if(notificationsBtn){
  notificationsBtn.addEventListener("click", function(){
      notificationsModal.style.display = "block";
      $(".close-btn-container").css("display", "block");
      $("body").addClass("stop-scrolling");
      getNewNotifications();
  })
}

function acceptOfferFunc(){
  if(acceptBtns){
    for(let i = 0; i < acceptBtns.length; i++){
      acceptBtns[i].addEventListener("click", function(){
        acceptOfferSubmits[i].click();
      })
    }
  }
}
function denyOfferFunc(){
  if(denyBtns){
    for(let i = 0; i < denyBtns.length; i++){
      denyBtns[i].addEventListener("click", function(){
        denyOfferSubmits[i].click();
      })
    }
  }
}

function setMailBtnFunc(){
  if(mailIcons){
    for(let i = 0; i < mailIcons.length; i++){
      mailIcons[i].addEventListener("click", function(){
        sendMessageForms[i].classList.toggle("toggle-send-message-form");
        removeBtns[i].classList.toggle("toggle-close-box");
        mailIcons[i].classList.toggle("toggle-move-up");
        closeBarOnes[i].classList.toggle("toggle-move-up");
        closeBarTwos[i].classList.toggle("toggle-move-up");
      })
    }
  }
}


function setRemoveBtnFunc(){
  if(removeBtns){
    for(let i = 0; i < removeBtns.length; i++){
      removeBtns[i].addEventListener("click", function(){
        removeNotiSubmits[i].click();
      })
    }
  }
}

function getNewNotifications(){
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "includes/getNewNotifications.php", true);
  xhr.onload = function(){
    if(this.status == 200){
      var data = this.responseText;
      if(data){
        $("#modal-body").append(data);
      }
    }
    acceptOfferFunc();
    denyOfferFunc();
    setMailBtnFunc();
    setRemoveBtnFunc();
  }
  xhr.send();
}

function checkNewNotifications(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../includes/checkNewNotifications.php", true);
  xhr.onload = function(){
    if(this.status == 200){
      var data = this.responseText;
      if(data){
        if(noNotifications){
          noNotifications.style.display = "none";
        }
        notiBadge.style.opacity = "1";
      } else {
        notiBadge.style.opacity = "0";
      }
    }
  }
  xhr.send();
}

setInterval(checkNewNotifications, 2000);


/*--- Conversations --*/
/*-- Conversations Modal --*/
var orderItemsLength = document.getElementsByClassName("order-item").length,
    deliveryOrderInners = document.getElementsByClassName("delivery-order-inner"),
    conversationsBtn = document.getElementById("my-conversations-btn"),
    conversationsModal = document.getElementById("conversations-modal"),
    convoBodyWrapper = document.getElementById("convo-body-wrapper"),
    closeBtnContainerThree = document.getElementsByClassName("close-btn-container")[2],
    viewConvos = document.getElementsByClassName("view-convo"),
    regMsgReadSubmits = document.getElementsByClassName("reg-msg-read-submit"),
    messagesOuters = document.getElementsByClassName("messages-outer"),
    messagesInners = document.getElementsByClassName("messages-inner");


if(conversationsBtn){
    conversationsBtn.addEventListener("click", function(){
    conversationsModal.style.display = "block";
    closeBtnContainerThree.style.display = "block";
    convoBodyWrapper.style.left = 0;
    $("body").addClass("stop-scrolling");
    $(".close-btn-container").css("display", "block");
  })
}

var convoBadge = document.getElementById("convo-badge");
setInterval(getAllConvoBtns, 2000);


function getAllConvoBtns(){
  if(viewConvos){
    for(let i = 0; i < viewConvos.length; i++){
      var senderId = viewConvos[i].getAttribute("sender");
      checkForNewMsgs(senderId);
    }
  }
}

function checkForNewMsgs(senderId){
  var xhr = new XMLHttpRequest();
  var param = "sender=" + senderId + "";
  xhr.open("POST", "includes/checkForNewMsgs.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status == 200){
      var data = this.responseText;
      if(data){
        convoBadge.style.opacity = "1";
        $("#" + senderId + "-user").find(".new-msg-alert").css("display", "block");
      } else {
        convoBadge.style.opacity = "0";
        $("#" + senderId + "-user").find(".new-msg-alert").css("display", "none");
      }
    }
  }
  xhr.send(param);
}

var msgInt;
var convoCheckboxes = document.getElementsByClassName("convo-checkbox");
if(viewConvos){
  for(let i = 0; i < viewConvos.length; i++){
    viewConvos[i].addEventListener("click", function(){
      closeOtherConvos(i);
      scrollMsgsToBottom();
      var senderId = this.getAttribute("sender");
      uncheckOtherBoxes(i, senderId);
      var thisCheckbox = convoCheckboxes[i];
      if(thisCheckbox.checked == false){
        thisCheckbox.checked = true;
      } else if(thisCheckbox.checked == true){
        thisCheckbox.checked = false;
      }
      checkBoxFunc(thisCheckbox, senderId, i);
      this.classList.toggle("toggle-view-convo");
      messagesOuters[i].classList.toggle("toggle-messages-outer");
    })
  }
}

function uncheckOtherBoxes(thisNum, senderId){
  for(let i = 0; i < convoCheckboxes.length; i++){
    if(i != thisNum){
      convoCheckboxes[i].checked = false;
      var thisCheckbox = convoCheckboxes[i];
      checkBoxFunc(thisCheckbox, senderId);
    }
  }
}

function checkBoxFunc(thisCheckbox, senderId){
  if(thisCheckbox.checked == true){
    msgInt = setInterval(function(){
      console.log("getting msgs from " + senderId);
      getNewMessages(senderId);
    }, 2000);
  } else if(thisCheckbox.checked == false){
    console.log("stop log");
    stopLog();
  }
}
function stopLog(){
  clearInterval(msgInt);
}

conversationsModal.addEventListener("click", function(e){
  if(e.target.matches("#conversations-modal")){
    for(let i = 0; i < convoCheckboxes.length; i++){
      convoCheckboxes[i].checked = false;
      var thisCheckbox = convoCheckboxes[i];
      checkBoxFunc(thisCheckbox);
    }
    console.log("modal-clicked");
  }
})

$(".close-btn-container").click(function(){
  for(let i = 0; i < convoCheckboxes.length; i++){
    convoCheckboxes[i].checked = false;
    var thisCheckbox = convoCheckboxes[i];
    checkBoxFunc(thisCheckbox);
  }
  console.log("close clicked");
})



function getNewMessages(senderId){
  var xhr = new XMLHttpRequest();
  var sender = "sender=" + senderId;
  xhr.open("POST", "includes/getNewMessages.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status == 200){
      var data = this.responseText;
      if(data){
        $("#with-user-" + senderId + "").append(data);
      }
    }
  }
  xhr.send(sender);
}

function scrollMsgsToBottom(){
  for(let i = 0; i < messagesInners.length; i++){
    messagesInners[i].scrollTop = messagesInners[i].scrollHeight;
  }
}

function closeOtherConvos(thisNum){
  for(let i = 0; i < messagesOuters.length; i++){
    if(i != thisNum){
      if(messagesOuters[i].classList.contains("toggle-messages-outer")){
        messagesOuters[i].classList.remove("toggle-messages-outer");
      }
      if(viewConvos[i].classList.contains("toggle-view-convo")){
        viewConvos[i].classList.remove("toggle-view-convo");
      }
    }
  }
}



var sendMsgSubmits = document.getElementsByClassName("send-message-submit");
if(sendMsgSubmits){
  for(let i = 0; i < sendMsgSubmits.length; i++){
    sendMsgSubmits[i].addEventListener("click", function(e){
      e.preventDefault();
      var $otherId = $(this).parent(".text-submit-container").siblings(".hidden").attr("value");
      var $message = $(this).siblings(":text").val();
      sendAjaxMsg($otherId, $message);
      $(this).siblings(":text").val("");
    })
  }
}

var convoSendSubmits = document.getElementsByClassName("convo-send-submit");
if(convoSendSubmits){
  for(let i = 0; i < convoSendSubmits.length; i++){
    convoSendSubmits[i].addEventListener("click", function(e){
      e.preventDefault();
      var $otherId = $(this).siblings(".hidden").attr("value");
      var $message = $(this).siblings(":text").val();
      if($message == ""){
        alert("cannot send blank");
      } else {
        sendAjaxMsg($otherId, $message);
        $(this).siblings(":text").val("");
      }
    })
  }
}

function sendAjaxMsg(otherId, message){
  var xhr = new XMLHttpRequest();
  var params = "other-id=" + otherId + "&message=" + message + "";
  xhr.open("POST", "includes/sendAjaxMsg.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function(){
    if(this.status == 200){
      var data = this.responseText;
      if(data){
        $("#with-user-" + otherId + "").append(data);
        scrollMsgsToBottom();
      }
    }
  }
  scrollMsgsToBottom();
  xhr.send(params);
}


/*-- Deliveries Modal --*/
var myDeliveriesBtn = document.getElementById("my-deliveries"),
    myDeliveriesModal = document.getElementById("my-deliveries-modal"),
    myDeliveriesContainer = document.getElementById("my-deliveries-container"),
    deliveryCancelBtns = document.getElementsByClassName("delivery-cancel-btn"),
    deliveryCancelSubmits = document.getElementsByClassName("delivery-cancel-submit"),
    deliveryCompletedBtns = document.getElementsByClassName("delivery-completed-btn"),
    deliveryCompletedSubmits = document.getElementsByClassName("delivery-completed-submit");

if(myDeliveriesBtn){
  myDeliveriesBtn.addEventListener("click", function(){
    myDeliveriesModal.style.display = "block";
    $(".close-btn-container").css("display", "block");
    myDeliveriesContainer.style.top = "50%";
    $("body").addClass("stop-scrolling");
  })
}

if(deliveryCancelBtns){
  for(let i = 0; i < deliveryCancelBtns.length; i++){
    deliveryCancelBtns[i].addEventListener("click", function(){
      deliveryCancelSubmits[i].click();
    })
  }
}

if(deliveryCompletedBtns){
  for(let i = 0; i < deliveryCompletedBtns.length; i++){
    deliveryCompletedBtns[i].addEventListener("click", function(){
      deliveryCompletedSubmits[i].click();
    })
  }
}

var deliveryMsgSubmits = document.getElementsByClassName("delivery-msg-submit");
if(deliveryMsgSubmits){
  for(let i = 0; i < deliveryMsgSubmits.length; i++){
    deliveryMsgSubmits[i].addEventListener("click", function(e){
      e.preventDefault();
      var $otherId = $(this).siblings(".hidden").attr("value");
      var $message = $(this).siblings(":text").val();
      if($message == ""){
        alert("cannot send blank");
      } else {
        sendAjaxMsg($otherId, $message);
        $(this).siblings(":text").val("");
      }
    })
  }
}

window.addEventListener("resize", function(){
  var windowWidth = window.innerWidth;
  if(windowWidth < 1250 && windowWidth > 1185){
    var orderItems = document.getElementsByClassName("order-item");
    var elmtWidth = document.getElementsByClassName("order-store-date")[0].offsetWidth;
    for(let i = 0; i < orderItems.length; i++){
      orderItems[i].style.width = (elmtWidth - 0.1) + "px";
    }
  }
})

window.addEventListener("load", function(){
  var windowWidth = window.innerWidth;
  if(windowWidth < 1250 && windowWidth > 1185){
    var orderItems = document.getElementsByClassName("order-item");
    var elmtWidth = document.getElementsByClassName("order-store-date")[0].offsetWidth;
    for(let i = 0; i < orderItems.length; i++){
      orderItems[i].style.width = (elmtWidth) + "px";
    }
  }
})