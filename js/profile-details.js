const profileDetailsObj = {
  init: function(){
    this.cacheDom();
    this.bindEvents();
    this.setUserImage();
  },
  cacheDom: function(){
    this.imageContainer = document.getElementById("image-container");
    this.inputFileElement = document.getElementById("file-input");
    this.changePicBtn = document.getElementById("change-pic-btn");
    this.uploadPicBtn = document.getElementById("upload-pic-btn");
  },
  bindEvents: function(){
    this.changePicBtn.addEventListener("click", this.changePicHandler.bind(this));
    this.uploadPicBtn.addEventListener("click", this.uploadPicHandler.bind(this));
  },
  changePicHandler: function(){
    this.inputFileElement.click();
    this.changePicBtn.style.display = "none";
    this.uploadPicBtn.style.display = "block";
  },
  uploadPicHandler: function(){
    this.changePicBtn.style.display = "block";
    this.uploadPicBtn.style.display = "none";
    this.setUserImage();
  },
  setUserImage: function(){
    var userId = this.imageContainer.getAttribute("data-id");
    fetch("../includes/getProfileImage.php", {
      method: "POST",
      body: "userId=" + userId,
      headers: {
        "Content-type":"application/x-www-form-urlencoded"
      }
    }).then(res => res.text()).then(function(res){
      if(res){
        this.imageContainer.style.backgroundImage = "" + res;
      }
    }.bind(this));
  }
};
profileDetailsObj.init();
module.exports = profileDetailsObj;