<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
  $id = $_SESSION['user_id'];
  $firstName = $_SESSION['user_first'];
  $lastName = $_SESSION['user_last'];
  $lastInitial = $lastName[0];
  $notiHeading = $firstName . " " . $lastInitial . ". sent you a message";
  $recipientId = mysqli_real_escape_string($conn, $_POST['sender-id']);
  $notiId = mysqli_real_escape_string($conn, $_POST['noti-id']);
  $message = mysqli_real_escape_string($conn, $_POST['message']);
  $sendQuery = "INSERT INTO notification_system (sender_id, recipient_id, message, accept_deny, decision, accepted, noti_heading) VALUES ('$id', '$recipientId', '$message', 'No', 'No', 'No', '$notiHeading');";
  $result = mysqli_query($conn, $sendQuery);
  if($result){
    header("Location: ../profile.php?message-sent");
    exit();
  }
} else {
  header("Location: ../profile.php?message-error");
  exit();
}
