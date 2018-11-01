const msgConfirmObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.msgConfirmation = document.getElementById("msg-confirmation");
    this.closeMsgConfirmBtn = document.getElementById("close-msg-confirm-btn");
  },
  bindEvents: function(){
    this.closeMsgConfirmBtn.addEventListener("click", this.hideMsgConfirmHandler.bind(this));
  },
  hideMsgConfirmHandler: function(){
    this.msgConfirmation.style.top = "-120px";
  },
  showMsgConfirmHandler: function(){
    this.msgConfirmation.style.top = "120px";
    setTimeout(function(){
      this.msgConfirmation.style.top = "-120px";
    }.bind(this), 2500);
  }
}
msgConfirmObj.init();
module.exports = msgConfirmObj;