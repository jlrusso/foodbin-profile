<?php
session_start();
include_once "dbh-inc.php";
$id = $_SESSION['user_id'];
$query = "SELECT * FROM notification_system WHERE recipient_id='$id' AND noti_status='unread';";
$result = mysqli_query($conn, $query);
$resultNum = mysqli_num_rows($result);
if($resultNum > 0){
  echo 1;
}
