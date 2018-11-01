const prevOrderObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.prevOrdersContainer = document.getElementById("previous-orders-container");
    this.prevOrdersHeading = document.getElementById("previous-orders-heading");
    this.prevOrderRows = document.getElementsByClassName("previous-order-row");
    this.orderAgainBtns = document.getElementsByClassName("order-again-btn");
    this.orderAgainSubmits = document.getElementsByClassName("order-again-submit-btn");
    this.removeOrderBtns = document.getElementsByClassName("remove-order-btn");
    this.removeOrderSubmits = document.getElementsByClassName("remove-order-submit-btn");
    this.prevOrderInners = document.getElementsByClassName("previous-order-inner");
  },
  bindEvents: function(){
    if(this.prevOrderRows){
      for(let i = 0; i < this.prevOrderRows.length; i++){
        this.orderAgainBtns[i].addEventListener("click", this.orderAgainHandler.bind(this, i));
        this.removeOrderBtns[i].addEventListener("click", this.removeOrderHandler.bind(this, i));
      }
    }
  },
  orderAgainHandler: function(index){
    if(headerObj.orderInProgressVal == "yes" || headerObj.editInProgressVal == "yes" || headerObj.sameOrderInProgressVal == "yes"){
      alert("Complete current order before ordering again");
    } else {
      this.orderAgainSubmits[index].click();
    }
  },
  removeOrderHandler: function(index){
    $(".previous-order-inner").eq(index).animate({
      height: "0px"
    }, 1000, function(){
      this.removeOrderSubmits[index].click();
    }.bind(this));
  }
};
prevOrderObj.init();
module.exports = prevOrderObj;