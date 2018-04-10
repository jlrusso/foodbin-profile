<?php
# - when 'Remove Order' btn is pressed
session_start();
if(isset($_POST['submit'])){
  $id = $_SESSION['user_id'];
  include_once "dbh-inc.php";
  $orderId = mysqli_real_escape_string($conn, $_POST['num']);
  $sql = "DELETE FROM previous_orders WHERE id=$orderId AND user_id=$id;";
  mysqli_query($conn, $sql);
  header("Location: ../profile.php?prevremove=success");
  exit();
} else {
  header("Location: ../profile.php?submit=error");
  exit();
}
