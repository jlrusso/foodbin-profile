<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
  $notiId = mysqli_real_escape_string($conn, $_POST['noti-id']);
  $id = $_SESSION['user_id'];
  $delQuery = "DELETE FROM notification_system WHERE noti_id='$notiId' AND recipient_id='$id';";
  mysqli_query($conn, $delQuery);
  header("Location: ../profile.php?remove-success");
  exit();
} else {
  header("Location: ../profile.php?remove-error");
  exit();
}
