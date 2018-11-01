const editModalObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
  },
  cacheDom: function(){
    this.editBtn = document.getElementById("edit-btn");
    this.editModalWindow = document.getElementById("edit-modal-window");
    this.editModalWrapper = document.getElementById("edit-modal-wrapper");
    this.closeEditModalBtn = document.getElementById("close-edit-modal-btn");
  },
  bindEvents: function(){
    this.editBtn.addEventListener("click", this.showEditModalHandler.bind(this));
    this.editModalWindow.addEventListener("click", this.closeEditModalHandler.bind(this));
    this.closeEditModalBtn.addEventListener("click", this.closeEditModalHandler.bind(this));
  },
  showEditModalHandler: function(){
    this.editModalWindow.style.display = "block";
    this.editModalWrapper.style.display = "block";
    $("body").addClass("stop-scrolling");
  },
  closeEditModalHandler: function(){
    this.editModalWindow.style.display = "none";
    this.editModalWrapper.style.display = "none";
    $("body").removeClass("stop-scrolling");
  }
};
editModalObj.init();
module.exports = editModalObj;