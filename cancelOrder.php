<?php
session_start();
include_once "dbh-inc.php";
if(isset($_POST['submit'])){
  $id = $_SESSION['user_id'];
  $query = "DELETE FROM previous_orders WHERE user_id='$id' ORDER BY id DESC LIMIT 1;";
  mysqli_query($conn, $query);
  $query = "DELETE FROM edit_orders WHERE user_id='$id';";
  mysqli_query($conn, $query);
  $query = "DELETE FROM current_orders WHERE user_id='$id';";
  $result = mysqli_query($conn, $query);
  if($result){
    $_SESSION['order-in-progress'] = "no";
    $_SESSION['same-order-in-progress'] = "no";
    $_SESSION['edit-in-progress'] = "no";
    header("Location: ../profile.php?order-cancelled");
    exit();
  }
} else {
  header("Location: ../profile.php?cancel-error");
  exit();
}
