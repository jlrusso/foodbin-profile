const convosModalObj = {
  init: function(){
    this.cacheStaticDom();
    this.bindEvents();
  },
  cacheStaticDom: function(){
    this.conversationsBtn = document.getElementById("my-conversations-btn");
    this.convoBadge = document.getElementById("convo-badge");
    this.convosModalWindow = document.getElementById("convos-modal-window");
    this.convosModalWrapper = document.getElementById("convos-modal-wrapper");
    this.closeConvosBtn = document.getElementById("close-convos-btn");
  },
  bindEvents: function(){
    if(this.conversationsBtn){
      this.conversationsBtn.addEventListener("click", this.showConvosHandler.bind(this));
      this.closeConvosBtn.addEventListener("click", this.closeConvosHandler.bind(this));
      this.convosModalWindow.addEventListener("click", this.closeConvosHandler.bind(this));
    }
    document.addEventListener("click", function(e){
      e = e || window.event;
      switch(e.target.getAttribute("class")){
        case ("convo-send-submit"):
          this.sendMsgHandler(e);
          break;
        case ("convo fa fa-send-o"):
          this.sendMsgHandler(e);
          break;
        case ("view-convo"):
          this.convoClickHandler(e);
          break;
        case ("convo-img-wrap"):
          this.convoClickHandler(e);
          break;
        case ("other-name"):
          this.convoClickHandler(e);
          break;
        case ("view-convo toggle-view-convo"):
          this.convoClickHandler(e);
          break;
        case ("new-msg-alert"):
          this.convoClickHandler(e);
          break;
        case ("convos fa fa-arrow-left"):
          this.closeCurrentConvo(e);
          break;
      }
    }.bind(this));
  },
  closeCurrentConvo: function(e){
    $assocConvoBtn = $(e.target).parents(".messages-outer").prev(".view-convo");
    $assocConvoBtn.click();
  },
  sendMsgHandler: function(e){
    e = e || window.event;
    var $thisReplyForm = $(e.target).parents(".reply-msg-form");
    var $otherId = $thisReplyForm.find(".hidden").val();
    var $msg = $thisReplyForm.find(":text").val();
    if($msg == ""){
      alert("cannot send blank");
    } else {
      this.sendAjaxMsg($otherId, $msg);
      $(".hidden").siblings(":text").val("");
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
      var data = `
        <div class='sent-message-grid'>
         <div></div>
          <p><span  class='sent-msg'>${message}</span></p>
        </div>
      `;
      $("#with-user-" + otherId).append(data);
      this.scrollMsgsToBottom();
    }.bind(this));
  },
  convoClickHandler: function(e){
    e = e || window.event;
    if($(e.target).attr("class") == "view-convo"){
      $viewConvo = $(e.target);
      $viewConvoId = $(e.target).attr("id");
      var viewConvo = document.getElementById("" + $viewConvoId);
      var $index = $(".view-convo").index(viewConvo);
      this.viewConvoHandler($index);
    } else {
      var $viewConvo = $(e.target).closest(".view-convo");
      $viewConvoId = $viewConvo.attr("id");
      var viewConvo = document.getElementById("" + $viewConvoId);
      var $index = $(".view-convo").index(viewConvo);
      this.viewConvoHandler($index);
    }
  },
  viewConvoHandler: function(index){
    this.cacheDynamicDom();
    this.closeOtherConvos(index);
    this.scrollMsgsToBottom();
    var senderId = this.viewConvos[index].getAttribute("sender");
    this.uncheckOtherBoxes(index, senderId);
    var thisCheckbox = this.convoCheckboxes[index];
    if(thisCheckbox.checked == false){
      thisCheckbox.checked = true;
    } else if(thisCheckbox.checked == true){
      thisCheckbox.checked = false;
    }
    this.toggleConversation(index);
    this.openConversation(thisCheckbox, senderId);
  },
  toggleConversation: function(index){
    this.viewConvos[index].classList.toggle("toggle-view-convo");
    this.messagesOuters[index].classList.toggle("toggle-messages-outer");
  },
  cacheDynamicDom: function(){
    this.viewConvos = document.getElementsByClassName("view-convo");
    this.messagesOuters = document.getElementsByClassName("messages-outer");
    this.messagesInners = document.getElementsByClassName("messages-inner");
    this.convoCheckboxes = document.getElementsByClassName("convo-checkbox");
  },
  showConvosHandler: function(){
    this.convosModalWindow.style.display = "block";
    this.convosModalWrapper.style.display = "block";
    this.convosModalWrapper.style.left = "0";
    $("body").addClass("stop-scrolling");
    headerObj.userMenu.style.display = "none";
    headerObj.userMenuWindow.style.display = "none";
    this.convoInt = setInterval(function(){
      this.getNewConvos();
    }.bind(this), 2000);
  },
  closeConvosHandler: function(){
    this.convosModalWindow.style.display = "none";
    this.convosModalWrapper.style.display = "none";
    $("body").removeClass("stop-scrolling");
    if(this.viewConvos) this.closeAllConvos();
    this.stopMsgLoading();
  },
  checkForNewMsgs: function(){
    fetch("../includes/checkForNewMsgs.php").then(function(res){
      return res.text();
    }).then(function(res){
      if(res.length > 0){
        var data = JSON.parse(res);
        for(let i = 0; i < data.length; i++){
          this.displayNewMsgAlert(data[i]);
        }
      } else {
        this.convoBadge.style.opacity = "0";
      }
    }.bind(this));
  },
  displayNewMsgAlert: function(senderId){
    $("#" + senderId + "-user").find(".new-msg-alert").css("display", "block");
    this.toDisplayBadge();
  },
  toDisplayBadge: function(){
    fetch("../includes/toDisplayBadge.php")
    .then(res => res.text()).then(function(res){
      if(res.length > 0){
        this.convoBadge.style.opacity = "1";
      } else {
        this.convoBadge.style.opacity = "0";
      }
    }.bind(this));
  },
  closeOtherConvos: function(index){
    for(let i = 0; i < this.messagesOuters.length; i++){
      if(i != index){
        if(this.messagesOuters[i].classList.contains("toggle-messages-outer")){
          this.messagesOuters[i].classList.remove("toggle-messages-outer");
        }
        if(this.viewConvos[i].classList.contains("toggle-view-convo")){
          this.viewConvos[i].classList.remove("toggle-view-convo");
        }
      }
    }
  },
  scrollMsgsToBottom: function(){
    for(let i = 0; i < this.messagesInners.length; i++){
      this.messagesInners[i].scrollTop = this.messagesInners[i].scrollHeight;
    }
  },
  uncheckOtherBoxes: function(index, senderId){
    for(let i = 0; i < this.convoCheckboxes.length; i++){
      if(i != index){
        this.convoCheckboxes[i].checked = false;
        var thisCheckbox = this.convoCheckboxes[i];
        this.openConversation(thisCheckbox, senderId);
      }
    }
  },
  openConversation: function(thisCheckbox, senderId){
    if(thisCheckbox.checked == true){
      this.msgInt = setInterval(function(){
        this.getNewMessages(senderId);
      }.bind(this), 1000);
    } else if(thisCheckbox.checked == false){
      this.stopMsgLoading();
    }
  },
  getNewConvos: function(){
    var existingConvoIds = this.getExistingConvoIds();
    fetch("../includes/getNewConvos.php", {
      method: "POST",
      body: "convoIds=" + existingConvoIds,
      headers: {
        "Content-type":"application/x-www-form-urlencoded"
      }
    }).then(res => res.text()).then(function(res){
      if(res.length > 0){
        $("#conversations-container").append(res);
        var $msgAlertLength = $(".new-msg-alert").length;
        var $lastMsgAlert = $(".new-msg-alert").eq($msgAlertLength - 1);
        $lastMsgAlert.css("display", "block");
      }
    });
  },
  getExistingConvoIds: function(){
    var $viewConvos = $(".view-convo");
    var convoIds = [];
    $viewConvos.each(function(){
      $senderId = $(this).attr("sender");
      convoIds.push($senderId);
    });
    return convoIds.join(",");
  },
  getNewMessages: function(senderId){
    fetch("../includes/getNewMessages.php", {
      method: "POST",
      body: "sender=" + senderId,
      headers: {
        "Content-type":"application/x-www-form-urlencoded"
      }
    }).then(res => res.text()).then(function(res){
      if(res.length > 0){
        $("#with-user-" + senderId + "").append(res);
        this.setUpNewMsgImage(senderId);
        $("#" + senderId + "-alert").css("display","none");
        this.scrollMsgsToBottom();
      } else {
        $("#" + senderId + "-alert").css("display","none");
      }
    }.bind(this));
  },
  stopMsgLoading: function(){
    clearInterval(this.msgInt);
    clearInterval(this.convoInt);
  },
  closeAllConvos: function(){
    for(let i = 0; i < this.convoCheckboxes.length; i++){
      this.convoCheckboxes[i].checked = false;
      if(this.messagesOuters[i].classList.contains("toggle-messages-outer")){
        this.messagesOuters[i].classList.remove("toggle-messages-outer");
      }
      if(this.viewConvos[i].classList.contains("toggle-view-convo")){
        this.viewConvos[i].classList.remove("toggle-view-convo");
      }
    }
  },
  setUpNewMsgImage: function(senderId){
    var $ImgWraps = $("#with-user-" + senderId).find(".msg-img-wrap");
    var $newWrap = $ImgWraps.eq($ImgWraps.length - 1);
    var $targetId = $newWrap.attr("data-for");
    this.targetViewConvo = document.getElementById("" + $targetId);
    var bgImage = this.targetViewConvo.getAttribute("style");
    $ImgWraps.each(function(){
       $(this).attr("style", bgImage);
    });
  }
};
convosModalObj.init();
module.exports = convosModalObj;