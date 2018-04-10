<?php
# - when 'Completed' btn is clicked
session_start();
include_once "dbh-inc.php";
$id = $_SESSION['user_id'];
if(isset($_POST['submit'])){
  $sqlEdit = "DELETE FROM edit_orders WHERE user_id=$id;";
  mysqli_query($conn, $sqlEdit);
  unset($_SESSION['order-requested-again']);
  $sql = "DELETE FROM current_orders WHERE user_id=$id;";
  $result = mysqli_query($conn, $sql);
  $resultRows = mysqli_num_rows($result);
  $_SESSION['order-in-progress'] = "no";
  $_SESSION['same-order-in-progress'] = "no";
  $_SESSION['edit-in-progress'] = "no";
  if($result){
    header("Location: ../profile.php?row=deleted");
    exit();
  }
} else {
  header("Location ../profile.php?session=error");
  exit();
}
