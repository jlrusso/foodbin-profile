<?php
# - when 'Edit Order' btn is clicked
session_start();
if(isset($_POST['submit'])){
  $id = $_SESSION['user_id'];
  include_once "dbh-inc.php";
  $sql = "DELETE FROM current_orders WHERE user_id=$id;";
  mysqli_query($conn, $sql);
  $sql2 = "DELETE FROM previous_orders WHERE user_id=$id ORDER BY order_id DESC LIMIT 1;";
  mysqli_query($conn, $sql2);
  $_SESSION['edit-in-progress'] = "yes";
  $_SESSION['order-in-progress'] = "no";
  header("Location: ../foodbin.php?removal=success");
  exit();
}
