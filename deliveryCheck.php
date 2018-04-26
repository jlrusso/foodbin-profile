<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
  $id = $_SESSION['user_id'];
  $notiId = mysqli_real_escape_string($conn, $_POST['noti-id']);
  $completeOrder = "UPDATE current_orders SET order_status='3' WHERE user_id='$id';";
  mysqli_query($conn, $completeOrder);
  $removeNoti = "DELETE FROM notification_system WHERE recipient_id='$id' AND noti_id='$notiId';";
  mysqli_query($conn, $removeNoti);
  if(isset($_POST['from'])){
    header("Location: ../foodbin.php?order-completed");
    exit();
  } else {
    header("Location: ../profile.php?order-completed");
    exit();
  }
} else {
  if(isset($_POST['from'])){
    header("Location: ../foodbin.php?order-error");
    exit();
  } else {
    header("Location: ../profile.php?order-error");
    exit();
  }
}
