const notisModalObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
    setInterval(function(){
      this.checkNewNotifications();
    }.bind(this), 2000);
  },
  cacheDom: function(){
    this.notisBtn = document.getElementById("my-notifications-btn");
    this.notiBadge = document.getElementById("noti-badge");
    this.notisModalWindow = document.getElementById("notis-modal-window");
    this.notisModalWrapper = document.getElementById("notis-modal-wrapper");
    this.notiContent = document.getElementById("notis-modal-content");
    this.closeNotisBtn = document.getElementById("close-notis-btn");
    this.noNotisMsg = document.getElementById("no-notis-msg");
  },
  bindEvents: function(){
    if(this.notisBtn){
      this.notisBtn.addEventListener("click", this.showNotisHandler.bind(this));
      this.notisModalWindow.addEventListener("click", this.closeNotisHandler.bind(this));
      this.closeNotisBtn.addEventListener("click", this.closeNotisHandler.bind(this));
    }
    document.addEventListener("click", function(e){
      e = e || window.event;
      switch(e.target.getAttribute("class")){
        case ("mail-icon"):
          this.mailIconClickHandler(e);
          break;
        case ("fa fa-envelope"):
          this.mailIconClickHandler(e);
          break;
        case ("noti fa fa-send-o"):
          this.notiMsgHandler(e);
          break;
        case ("noti-message-submit"):
          this.notiMsgHandler(e);
          break;
        case ("close-box"):
          this.removeNotiHandler(e);
          break;
        case ("fa fa-close"):
          this.removeNotiHandler(e);
          break;
        case ("accept-btn"):
          this.acceptOfferHandler(e);
          break;
        case ("deny-btn"):
          this.denyOfferHandler(e);
          break;
        case ("yes-btn"):
          this.deliveryCompletedHandler(e);
          break;
        case ("no-btn"):
          this.deliveryIncompleteHandler(e);
          break;
      }
    }.bind(this));
  },
  deliveryIncompleteHandler: function(e){
    e = e || window.event;
    var $notiWrap = $(e.target).parents(".user-notification");
    var $deliveryIncompleteSubmit = $notiWrap.find(".delivery-incomplete-submit");
    $deliveryIncompleteSubmit.click();
  },
  deliveryCompletedHandler: function(e){
    e = e || window.event;
    var $notiWrap = $(e.target).parents(".user-notification");
    var $deliveryCompleteSubmit = $notiWrap.find(".delivery-complete-submit");
    $deliveryCompleteSubmit.click();
  },
  acceptOfferHandler: function(e){
    e = e || window.event;
    var $notiWrap = $(e.target).parents(".user-notification");
    var $acceptOfferSubmit = $notiWrap.find(".accept-offer-submit");
    $acceptOfferSubmit.click();
  },
  denyOfferHandler: function(e){
    e = e || window.event;
    var $notiWrap = $(e.target).parents(".user-notification");
    var $denyOfferSubmit = $notiWrap.find(".deny-offer-submit");
    $denyOfferSubmit.click();
  },
  removeNotiHandler: function(e){
    e = e || window.event;
    var $notiWrap = $(e.target).parents(".user-notification");
    var $removeNotiSubmit = $notiWrap.find(".remove-noti-submit");
    $removeNotiSubmit.click();
  },
  mailIconClickHandler: function(e){
    e = e || window.event;
    var $notiWrap = $(e.target).parents(".user-notification");
    var $notiMsgForm = $notiWrap.next(".send-message-form");
    $notiMsgForm.toggle("toggle-send-message-form");
  },
  notiMsgHandler: function(e){
    e = e || window.event;
    var $textSubmitContainer = $(e.target).parents(".text-submit-container");
    var $otherId = $textSubmitContainer.children(".hidden").val();
    var $message = $textSubmitContainer.children(":text").val();
    if($message == ""){
      alert("cannot send blank");
    } else {
      this.sendAjaxMsg($otherId, $message);
      $textSubmitContainer.children(":text").val("");
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
    });
  },
  showNotisHandler: function(){
    this.notisModalWindow.style.display = "block";
    this.notisModalWrapper.style.display = "block";
    $("body").addClass("stop-scrolling");
    this.getNewNotifications();
    headerObj.userMenu.style.display = "none";
    headerObj.userMenuWindow.style.display = "none";
  },
  closeNotisHandler: function(){
    this.notisModalWindow.style.display = "none";
    this.notisModalWrapper.style.display = "none";
    $("body").removeClass("stop-scrolling");
    this.closeNotiMsgForms();
  },
  closeNotiMsgForms: function(){
    this.notiMsgForms = document.getElementsByClassName("send-message-form");
    for(let i = 0; i < this.notiMsgForms.length; i++){
      if(this.notiMsgForms[i].style.display === "block"){
        this.notiMsgForms[i].style.display = "none";
      }
    }
  },
  checkNewNotifications: function(){
    fetch("../includes/checkNewNotifications.php")
    .then(res => res.text()).then(function(res){
      if(res.length > 0){
        this.notiBadge.style.opacity = "1";
      } else {
        this.notiBadge.style.opacity = "0";
      }
    }.bind(this));
  },
  getNewNotifications: function(){
    fetch("../includes/getNewNotifications.php")
    .then(res => res.text()).then(function(res){
      if(res){
        const targetNoti = document.querySelector(".user-notification");
        const newNoti = document.createElement("div");
        newNoti.setAttribute("class", "user-notification");
        newNoti.innerHTML = res;
        this.notiContent.insertBefore(newNoti, targetNoti);
      }
      this.checkAllNotis();
    }.bind(this));
  },
  checkAllNotis: function(){
    fetch("../includes/checkAllNotis.php")
    .then(res => res.text()).then(function(res){
      if(res.length > 0){
        this.noNotisMsg.style.display = "none";
      } else {
        this.noNotisMsg.style.display = "block";
      }
    }.bind(this));
  },
};
notisModalObj.init();
module.exports = notisModalObj;