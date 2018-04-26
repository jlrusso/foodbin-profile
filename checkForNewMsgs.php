<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['sender'])){
  $senderId = $_POST['sender'];
}
$id = $_SESSION['user_id'];
$unreadMsgs = "SELECT * FROM msg_system WHERE recipient_id='$id' AND sender_id='$senderId' AND msg_status='unread';";
$unreadMsgResult = mysqli_query($conn, $unreadMsgs);
$msgResultNum = mysqli_num_rows($unreadMsgResult);
if($msgResultNum > 0){
  echo $senderId;
}
