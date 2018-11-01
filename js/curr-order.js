const currOrderObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.currentOrderHeading = document.getElementById("current-order-heading");
    this.currentOrderOuter = document.getElementById("current-order-outer");
    this.orderCompletedSubmit = document.getElementById("order-complete-submit");
    this.entireOrdersSection = document.getElementsByClassName(".col-8")[0];
    this.currentOrderRow = document.getElementById("current-order-row");
    this.currentOrderDestination = document.getElementsByClassName(".location-address-name-container")[0];
    this.inProcessSpan = document.getElementById("in-process-span");
    this.orderCompletedBtn = document.getElementById("order-completed-btn");
    this.editOrderBtn = document.getElementById("edit-order-btn");
    this.editOrderSubmit = document.getElementById("edit-order-submit");
    this.cancelOrderBtn = document.getElementById("cancel-order-btn");
    this.cancelOrderSubmit = document.getElementById("cancel-order-submit");
    this.currOrderFooter = document.getElementsByClassName("current-order-footer")[0];
  },
  bindEvents: function(){
    if(this.currentOrderRow){
      if(this.editOrderBtn){
        this.editOrderBtn.addEventListener("click", this.removeOrderHandler.bind(this, 'edit'));
      }
      if(this.cancelOrderBtn){
        this.cancelOrderBtn.addEventListener("click", this.removeOrderHandler.bind(this, 'cancel'));
      }
      if(this.orderCompletedBtn){
        this.orderCompletedBtn.addEventListener("click", this.removeOrderHandler.bind(this, 'complete'));
      }
      if(this.orderCompletedBtn || this.inProcessSpan){
        this.currOrderFooter.classList.add("single-order-footer");
      } else {
        this.currOrderFooter.classList.remove("single-order-footer");
      }
    }
  },
  removeOrderHandler: function(text){
    $("#current-order-outer").animate({
      height: "0px"
    }, 1000, function(){
      switch(true){
          case (text == "edit"):
            this.editOrderSubmit.click();
          break;
          case (text == "complete"):
            this.orderCompletedSubmit.click();
          break;
          case (text == "cancel"):
            this.cancelOrderSubmit.click();
          break;
        }
    }.bind(this));
  }
}
currOrderObj.init();
module.exports = currOrderObj;