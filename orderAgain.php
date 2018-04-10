<?php
session_start();
if(isset($_POST['submit'])){
  include_once "dbh-inc.php";
  $id = $_SESSION['user_id'];
  $orderId = mysqli_real_escape_string($conn, $_POST[num]);
  $sql = "SELECT * FROM previous_orders WHERE id=$orderId;";
  $result = mysqli_query($conn, $sql);
  $resultRows = mysqli_num_rows($result);
  if($resultRows > 0){
    $_SESSION['order-requested-again'] = $orderId;
    $_SESSION['same-order-in-progress'] = "yes";
    $_SESSION['edit-in-progress'] = "no";
    header("Location: ../foodbin.php?orderagain=progress");
    exit();
  } else {
    header("Location: ../profile.php?noresults=error");
    exit();
  }
} else {
  header("Location: ../profile.php?submit=error");
  exit();
}
