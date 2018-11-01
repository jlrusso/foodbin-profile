const deliveriesModalObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.myDeliveriesBtn = document.getElementById("my-deliveries");
    this.deliveriesModalWindow = document.getElementById("deliveries-modal-window");
    this.deliveriesModalWrapper = document.getElementById("deliveries-modal-wrapper");
    this.closeDeliveriesBtn = document.getElementById("close-deliveries-btn");
  },
  bindEvents: function(){
    if(this.myDeliveriesBtn){
      this.myDeliveriesBtn.addEventListener("click", this.showDeliveriesHandler.bind(this));
      this.deliveriesModalWindow.addEventListener("click", this.closeDeliveriesHandler.bind(this));
      this.closeDeliveriesBtn.addEventListener("click", this.closeDeliveriesHandler.bind(this));
    }
    document.addEventListener("click", function(e){
      e = e || window.event;
      switch(e.target.getAttribute("class")){
        case ("delivery-cancel-btn"):
          this.cancelDeliveryHandler(e);
          break;
        case ("delivery-completed-btn"):
          this.completeDeliveryHandler(e);
          break;
        case ("delivery-msg-submit"):
          this.deliveryMsgHandler(e);
          break;
        case ("delivery fa fa-send-o"):
          this.deliveryMsgHandler(e);
          break;
      }
    }.bind(this));
  },
  cancelDeliveryHandler: function(e){
    e = e || window.event;
    var $btnsWrap = $(e.target).parents(".delivery-btns-container");
    var $cancelSubmitBtn = $btnsWrap.next(".cancel-delivery-form").find(".delivery-cancel-submit");
    $cancelSubmitBtn.click();
  },
  completeDeliveryHandler: function(){
    var $btnsWrap = $(e.target).parents(".delivery-btns-container");
    var $completedSubmitBtn = $btnsWrap.next(".delivery-completed-form").find(".offer-completed-submit");
    $completedSubmitBtn.click();
  },
  showDeliveriesHandler: function(){
    this.deliveriesModalWindow.style.display = "block";
    this.deliveriesModalWrapper.style.display = "block";
    $("body").addClass("stop-scrolling");
    headerObj.userMenu.style.display = "none";
    headerObj.userMenuWindow.style.display = "none";
  },
  closeDeliveriesHandler: function(){
    this.deliveriesModalWindow.style.display = "none";
    this.deliveriesModalWrapper.style.display = "none";
    $("body").removeClass("stop-scrolling");
  },
  deliveryMsgHandler: function(e){
    e = e || window.event;
    var $deliveryMsgForm = $(e.target).parents(".delivery-msg-form");
    var $otherId = $deliveryMsgForm.find(".hidden").val();
    var $message = $deliveryMsgForm.find(":text").val();
    if($message == ""){
      alert("cannot send blank");
    } else {
      this.sendAjaxMsg($otherId, $message);
      $deliveryMsgForm.children(":text").val("");
    }
  },
  sendAjaxMsg: function(otherId, message){
    fetch("../includes/sendAjaxMsg.php", {
      method: "POST",
      body: "other-id=" + otherId + "&message=" + message,
      headers: {
        "Content-type":"application/x-www-form-urlencoded"
      }
    }).then(res => res.text()).then(function(res){
      if(res.length > 0){
        var data = `
          <div class='sent-message-grid'>
           <div></div>
            <p><span  class='sent-msg'>${message}</span></p>
          </div>
        `;
        $("#with-user-" + otherId).append(data);
        msgConfirmObj.showMsgConfirmHandler();
      }
    }.bind(this));
  }
};
deliveriesModalObj.init();
module.exports = deliveriesModalObj;