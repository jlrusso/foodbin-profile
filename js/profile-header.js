window.onbeforeunload = function(){
  window.scrollTo(0,0);
}

const headerObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.navBar = document.getElementsByTagName("nav")[0];
    this.userMenuWindow = document.getElementById("user-menu-window");
    this.orderInProgress = document.getElementById("order-in-progress");
    if(this.orderInProgress) this.orderInProgressVal = this.orderInProgress.textContent;
    this.editInProgress = document.getElementById("edit-in-progress");
    if(this.editInProgress) this.editInProgressVal = this.editInProgress.textContent;
    this.sameOrderInProgress = document.getElementById("same-order-in-progress");
    if(this.sameOrderInProgress) this.sameOrderInProgressVal = this.sameOrderInProgress.textContent;
    this.userIcon = document.getElementsByClassName("fa-user")[0];
    this.userMenu = document.getElementsByClassName("user-menu")[0];
    this.goHomeBtn = document.getElementById("go-home-btn");
    this.logoutBtn = document.getElementById("logout-btn");
    this.logoutSubmit = document.getElementById("logout-submit");
  },
  bindEvents: function(){
    this.navBar.addEventListener("click", function(e){
      if(e.target.getAttribute("class") != "fa fa-user"){
        if(this.userMenuWindow.style.display === "block"){
          this.toggleUserMenu();
        }
      }
    }.bind(this));
    this.userMenuWindow.addEventListener("click", this.toggleUserMenu.bind(this));
    this.userIcon.addEventListener("click", this.toggleUserMenu.bind(this));
    this.goHomeBtn.addEventListener("click", this.redirectToHome.bind(this));
    this.logoutBtn.addEventListener("click", this.logOutHandler.bind(this));
  },
  toggleUserMenu: function(){
    if(this.userMenu.style.display != "grid"){
      this.userMenuWindow.style.display = "block";
      this.userMenu.style.display = "grid";
      convosObj.checkForNewMsgs();
    } else {
      this.userMenu.style.display = "none"
      this.userMenuWindow.style.display = "none";
    }
  },
  redirectToHome: function(){
    document.getElementById("home-anchor").click();
  },
  logOutHandler: function(){
    this.logoutSubmit.click();
  }
};
headerObj.init();
module.exports = headerObj;