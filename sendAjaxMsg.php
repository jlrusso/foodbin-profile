<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['other-id']) && isset($_POST['message'])){
  $otherId = $_POST['other-id'];
  $message = $_POST['message'];
}
$id = $_SESSION['user_id'];
$sendMsg = "INSERT INTO msg_system (sender_id, recipient_id, message, msg_status) VALUES ('$id', '$otherId', '$message', 'unread');";
mysqli_query($conn, $sendMsg);
$getLastMsgSent = "SELECT * FROM msg_system WHERE sender_id='$id' AND recipient_id='$otherId' AND msg_status='unread';";
$getLastMsgResult = mysqli_query($conn, $getLastMsgSent);
$getLastResultNum = mysqli_num_rows($getLastMsgResult);
$lastMsgArr = mysqli_fetch_all($getLastMsgResult, MYSQLI_ASSOC);
$msg = $lastMsgArr[0]['message'];
echo "
  <div class='sent-message-grid'>
    <div></div>
    <p><span  class='sent-msg'>" . $msg . "</span></p>
  </div>
";
