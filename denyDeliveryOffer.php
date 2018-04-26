<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
  $id = $_SESSION['user_id'];
  $firstName = $_SESSION['user_first'];
  $lastName = $_SESSION['user_last'];
  $lastInitial = $lastName[0];
  $notiId = mysqli_real_escape_string($conn, $_POST['noti-id']);
  $offererId = mysqli_real_escape_string($conn, $_POST['offerer-id']);
  $delQuery = "DELETE FROM notification_system WHERE sender_id='$offererId' AND recipient_id='$id' AND noti_id='$notiId';";
  mysqli_query($conn, $delQuery);
  $message = ucfirst($firstName) . " " . ucfirst($lastInitial) . ". has denied your offer";
  $sendQuery = "INSERT INTO notification_system (sender_id, recipient_id, message, noti_type, noti_status) VALUES ('$id', '$offererId', '$message', 'deny-offer', 'unread');";
  $result = mysqli_query($conn, $sendQuery);
  if($result){
    header("Location: ../profile.php?deny-success");
    exit();
  }
} else {
  header("Location: ../profile.php?deny-error");
  exit();
}
