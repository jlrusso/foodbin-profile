<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
  $id = $_SESSION['user_id'];
  $senderId = mysqli_real_escape_string($conn, $_POST['sender-id']);
  $notiId = mysqli_real_escape_string($conn, $_POST['noti-id']);
  $firstName = $_SESSION['user_first'];
  $lastName = $_SESSION['user_last'];
  $lastInitial = $lastName[0];
  $delQuery = "DELETE FROM notification_system WHERE recipient_id='$id' AND sender_id='$senderId' AND noti_id='$notiId';";
  mysqli_query($conn, $delQuery);
  $message = $_SESSION['user_first'] . " " . $lastInitial . ". has accepted your offer";
  $sendQuery = "INSERT INTO notification_system (sender_id, recipient_id, message, accept_deny, decision, accepted, reg_msg) VALUES ('$id', '$senderId', '$message', 'No', 'Yes', 'Yes', 'No');";
  $result = mysqli_query($conn, $sendQuery);
  if($result){
    header("Location: ../profile.php?accept-success");
    exit();
  }
} else {
  header("Location: ../profile.php?accept-error");
  exit();
}
