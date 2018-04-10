<?php
session_start();
if(isset($_POST['edit-submit'])){
  include_once "dbh-inc.php";
  $id = $_SESSION['user_id'];
  $first = mysqli_real_escape_string($conn, $_POST['first']);
  $last = mysqli_real_escape_string($conn, $_POST['last']);
  $email = mysqli_real_escape_string($conn, $_POST['email']);
  $city = mysqli_real_escape_string($conn, $_POST['city']);

  if(empty($first) || empty($last) || empty($email) || empty($city)){
    header("Location: ../profile.php?empty=error");
    exit();
  } else {
    $sql = "SELECT * FROM users WHERE id!=$id AND user_email='$email';";
    $result = mysqli_query($conn, $sql);
    $resultRows = mysqli_num_rows($result);
    if($resultRows > 0){
      header("Location: ../profile.php?email=taken");
      exit();
    } else {
      $sql2 = "UPDATE users SET user_first='$first', user_last='$last', user_email='$email', user_city='$city' WHERE id=$id;";
      mysqli_query($conn, $sql2);
      $_SESSION['user_first'] = $first;
      $_SESSION['user_last'] = $last;
      $_SESSION['user_email'] = $email;
      $_SESSION['user_city'] = $city;
      header("Location: ../profile.php?edit=success");
      exit();
    }
  }
} else {
  header("Location ../profile.php?edit=error");
  exit();
}
