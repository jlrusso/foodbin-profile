<?php
session_start();
include_once "dbh-inc.php";
$id = $_SESSION['user_id'];
if(isset($_POST['sender'])){
  $sender = $_POST['sender'];
}
$getNewMsgs = "SELECT * FROM msg_system WHERE recipient_id='$id' AND sender_id='$sender' AND msg_status='unread';";
$msgResult = mysqli_query($conn, $getNewMsgs);
$msgResultNum = mysqli_num_rows($msgResult);
if($msgResultNum > 0){
  $msgArr = mysqli_fetch_all($msgResult, MYSQLI_ASSOC);
  for($x = 0; $x < $msgResultNum; $x++){
    $msg = $msgArr[$x]['message'];
    $msgId = $msgArr[$x]['msg_id'];
    echo "
      <div class='received-message-grid'>
        <p><span class='received-msg'>" . $msg . "</span></p>
        <div></div>
      </div>
    ";
    $updateMsg = "UPDATE msg_system SET msg_status='read' WHERE msg_id='$msgId';";
    mysqli_query($conn, $updateMsg);
  }
}
