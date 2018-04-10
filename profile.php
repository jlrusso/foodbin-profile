<?php
  session_start();
  include_once "includes/dbh-inc.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible">
    <link rel="stylesheet" href="profile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
	<title>Profile | Foodbin</title>
</head>
<body>
	<div id="body-wrapper">
		<nav>
        <div id="nav-logo"><a href="foodbin.php"><b>Foodbin</b></a></div>
         <div id="horizontal-nav">
            <ul>
                <?php
                  # - check if order is in progress
                  if(isset($_SESSION['order-in-progress'])){
                    if($_SESSION['order-in-progress'] == "yes"){
                      echo "<span id='order-in-progress'>yes</span>";
                    } else {
                      echo "<span id='order-in-progress'>no</span>";
                    }
                  }
                  if (isset($_SESSION['edit-in-progress'])){
                    if($_SESSION['edit-in-progress'] == "yes"){
                      echo "<span id='edit-in-progress'>yes</span>";
                    } else {
                      echo "<span id='edit-in-progress'>no</span>";
                    }
                  }
                  # - end of order in progress check

                  if (isset($_SESSION['user_id'])){
                    echo '<li><i class="fa fa-user"></i>
                            <ul class="user-list">
                              <li id="signed-in-as">Signed in as: &nbsp; <b>' . $_SESSION["user_username"] . '</b></li>
                              <li id="my-deliveries"><i class="fa fa-truck"></i> &nbsp;My deliveries</li>
                              <li id="notifications-li"><i class="fa fa-bell-o"></i> &nbsp;Notifications</li>
                              <li id="conversations-li"><i class="fa fa-envelope"></i> &nbsp;Conversations</li>
                              <li id="logout-btn"><i class="fa fa-sign-out"></i>&nbsp; Logout</li>
                            </ul>
                          </li>
                          <form action="includes/logout-inc.php" method="POST" id="logout-form">
                            <input type="submit" name="submit" value="Logout" id="logout-submit"/>
                          </form>
                          ';
                  } else {
                    echo '<li id="login-btn"><a href="login.php">Login</a></li>
                          <li id="signup-btn"><a href="signup.php">Sign Up</a></li>';
                  }
                  ?>
            </ul>
        </div>
    </nav>

		<div id="profile-area">
			<div id="profile-inner">
				<div class="col-4" id="pic-and-info">
					<div id="image-container">
            <?php
              if(isset($_SESSION['user_id'])){
                $id = $_SESSION['user_id'];
                $sql = "SELECT * FROM imgupload WHERE user_id='$id';";
                $result = mysqli_query($conn, $sql);
                $resultRows = mysqli_num_rows($result);
                if($resultRows > 0){
                  while($row = mysqli_fetch_assoc($result)){
                    $id = $row['user_id'];
                    if($row['img_status'] == 0){
                      $fileName = "uploads/profile".$id."*";
                      $allFiles = glob($fileName);
                      $fileArr = explode(".", $allFiles[0]);
                      $fileExt = strtolower($fileArr[1]);
                      echo "<input type='image' src='uploads/profile".$id.".".$fileExt."?".mt_rand()."' id='profile-pic'/>";
                    }
                  }
                }
              } else {
                echo "<input type='image' src='../img/user-icon.png'>";
              }
            ?>
					</div>
					<div id="input-container">
            <form action="includes/upload-inc.php" method="POST" enctype="multipart/form-data">
              <input type="file" name="file" id="file-input"/>
              <input type="button" value="Change Pic" id="change-pic-btn"/>
              <input type="submit" name="submit-pic" value="Upload" id="upload-pic-btn"/>
            </form>
					</div>
					<div class="line-divider"></div>
					<div class="user-info-container">
						<div class="user-info-inner">
							<?php
								echo
                  "<ul id='user-list'>
  									<li><span id='profile-name'>Name: </span> " . $_SESSION['user_first'] . " " .  $_SESSION['user_last'] . "</li>" .
  									"<li><span id='profile-email'>Email: </span>" . $_SESSION['user_email'] . "</li>" .
  									"<li id='user-city'><span id='profile-city'>City: </span>" . $_SESSION['user_city']. "</li>" .
  								"</ul>";
							?>
						</div>
						<button id="edit-btn">Edit</button>
					</div>
				</div>
				<div class="col-8">
            <h2 id="current-order-heading">Orders in Progress</h2>
            <div id="current-order-outer">
              <div id="current-order-inner">
                <div id="curr-order-tooltip">Shift + scroll to scroll sideways</div>
              <?php
                $id = $_SESSION['user_id'];
                $sql = "SELECT * FROM current_orders WHERE user_id=$id;";
                $result = mysqli_query($conn, $sql);
                $resultRows = mysqli_num_rows($result); //this is the number of rows returned
                $currData = array();
                while($row = mysqli_fetch_assoc($result)){
                  $currData[] = $row;
                }
                if($resultRows < 1){
                  echo "<h3 style='text-align: center'>No orders at this time</h3>";
                  echo "<p style='text-align: center'><a href='foodbin.php'>Order Now</a></p>";
                } else {
                  for($orderRow = 0; $orderRow < $resultRows; $orderRow++){
                    $itemIdsString = $currData[$orderRow]['food_ids'];
                    $itemArr = explode(" ", $itemIdsString);
                    //array_shift($itemArr);
                    array_pop($itemArr);
                    //print_r($itemArr);
                    $itemArrLength = count($itemArr);
                    echo "
                      <div class='store-location-container'>
                        <div class='order-store-name'>
                          " . $currData[$orderRow]['store_name'] . "
                        </div>
                        <div class='order-store-address'>
                          " . $currData[$orderRow]['store_address'] . "
                        </div>
                        <div class='order-store-city'>
                          " . $currData[$orderRow]['store_city'] . "
                        </div>";
                    $fullDateTime = $currData[$orderRow]['order_date'];
                    $fullDateTimeArr = explode(" ", $fullDateTime);
                    $datePart = $fullDateTimeArr[0];
                    $deliveryTime = $currData[$orderRow]['delivery_time'];
                    echo "<div class='order-store-date'>" . $datePart . " | " . $deliveryTime . "</div>";
                    echo "
                      </div>
                    ";
                    echo "<div id='current-order-row'>";
                    for($col = 0; $col < $itemArrLength; $col++){
                      $specStr = $currData[$orderRow]['item_' . $itemArr[$col] . '_specs'];
                      $specsArr = explode(" | ", $specStr);
                      echo "
                        <div class='order-item'>
                          <input type='image' src='../foodbin/img/image". $itemArr[$col] . ".jpg'/>
                          <div class='item-details'>
                            " . $specsArr[0] . "<br/>" . $specsArr[1] . "<br/>" . $specsArr[2] . "<br/>" . $specsArr[3] . "
                          </div>
                        </div>
                      ";
                    }
                    echo "</div>";
                    echo "
                      <form action='includes/editOrder.php' method='POST' id='edit-order-form'>
                        <input type='submit' name='submit' id='edit-order-submit'/>
                      </form>
                      <form action='includes/orderCompleted.php' method='POST' id='order-completed-form'>
                        <input type='submit' name='submit' id='order-complete-submit'/>
                      </form>
                      <form action='includes/cancelOrder.php' method='POST' id='cancel-order-form'>
                        <input type='submit' name='submit' id='cancel-order-submit'/>
                      </form>
                    ";

                    echo "
                      <div class='current-order-footer'>
                        <button id='edit-order-btn'>Edit Order</button>
                      ";
                      $currOrderStatus = $currData[$orderRow]['order_status'];
                      $currOrderDelivered = $currData[$orderRow]['order_delivered'];
                      if($currOrderStatus == 0){
                        echo "<button id='cancel-order-btn'>Cancel</button>";
                        echo "<button id='order-completed-btn'>Completed</button>";
                      } else if ($currOrderStatus == 1){
                        if($currOrderDelivered == "No"){
                          echo "<span id='in-progress-span'>In Progress..</span>";
                        } else if ($currOrderDelivered == "Yes"){
                          echo "<button id='order-completed-btn'>Completed</button>";
                        }
                      }
                      echo "</div><div class='line-divider'></div>"; //end of current order footer
                  }
                }
              ?>
              </div>
            </div>
            <div id="previous-orders-container">
              <?php
                $sql = "SELECT * FROM previous_orders WHERE user_id='$id';";
                $result = mysqli_query($conn, $sql);
                $resultRows2 = mysqli_num_rows($result);
                $prevData = array();
                while($row = mysqli_fetch_assoc($result)){
                  $prevData[] = $row;
                }
                if($resultRows2 > 0){
                  if($resultRows == 0 || $resultRows2 > 0){
                    echo "
                      <h2 id='previous-orders-heading'>Previous Orders (Newest - Oldest)</h2>
                      <div class='previous-order-outer'>
                    ";
                  } else {
                    echo "
                      <div class='previous-order-outer'>
                      <div class='previous-order-inner'>
                    ";
                    echo "<div class='prev-order-tooltip'>Shift + scroll to scroll sideways</div>";
                  }
                  $sqlCheck = "SELECT * FROM current_orders WHERE user_id=$id;";
                  $resultRows3 = mysqli_num_rows(mysqli_query($conn, $sqlCheck));
                  if($resultRows3 < 1){
                    for($orderRow = ($resultRows2 - 1); $orderRow > -1; $orderRow--){
                      $itemIdsString = $prevData[$orderRow]['food_ids'];
                      $itemArr = explode(" ", $itemIdsString);
                      array_pop($itemArr);
                      $itemArrLength = count($itemArr);
                      echo "<div class='previous-order-inner'>";
                      echo "<div class='prev-order-tooltip'>Shift + scroll to scroll sideways</div>";
                      echo "
                        <div class='store-location-container' verse='1'>
                          <div class='order-store-name'>
                            " . $prevData[$orderRow]['store_name'] . "
                          </div>
                          <div class='order-store-address'>
                            " . $prevData[$orderRow]['store_address'] . "
                          </div>
                          <div class='order-store-city'>
                            " . $prevData[$orderRow]['store_city'] . "
                          </div>";
                          $fullDateTime = $prevData[$orderRow]['order_date'];
                          $fullDateTimeArr = explode(" ", $fullDateTime);
                          $datePart = $fullDateTimeArr[0];
                          $deliveryTime = $prevData[$orderRow]['delivery_time'];
                          echo "<div class='order-store-date'>" . $datePart . " | " . $deliveryTime . "</div>";
                      echo "
                        </div>
                      ";
                      echo "<div class='previous-order-row'>";
                      for($col = 0; $col < $itemArrLength; $col++){
                        $specStr = $prevData[$orderRow]['item_' . $itemArr[$col] . '_specs'];
                        $specsArr = explode(" | ", $specStr);
                        echo "
                          <div class='order-item'>
                            <input type='image' src='../foodbin/img/image". $itemArr[$col] . ".jpg'/>
                            <div class='item-details'>
                              " . $specsArr[0] . "<br/>" . $specsArr[1] . "<br/>" . $specsArr[2] . "<br/>" . $specsArr[3] . "
                            </div>
                          </div>
                        ";
                      }
                      echo "</div>";
                      echo "
                        <div class='previous-order-footer'>
                          <button class='order-again-btn'>Order Again</button>
                          <form action='includes/orderAgain.php' method='POST' class='order-again-form'>
                            <input type='number' name='num' value='" . $prevData[$orderRow]['id'] . "'/>
                            <input type='submit' name='submit' class='order-again-submit-btn'/>
                          </form>
                          <button class='remove-order-btn'>Remove Order</button>
                          <form action='includes/removePrevOrder.php' method='POST' class='remove-prev-form'>
                            <input type='number' name='num' value='" . $prevData[$orderRow]['id'] . "'/>
                            <input type='submit' name='submit' class='remove-order-submit-btn'/>
                          </form>
                        </div>
                        <div class='line-divider'></div>
                      ";
                      echo "</div>"; # - closing tag for previous-order-inner
                    }
                  } else {
                    for($orderRow = ($resultRows2 - 2); $orderRow > -1; $orderRow--){
                      $itemIdsString = $prevData[$orderRow]['food_ids'];
                      $itemArr = explode(" ", $itemIdsString);
                      array_pop($itemArr);
                      $itemArrLength = count($itemArr);
                      echo "<div class='previous-order-inner'>";
                      echo "<div class='prev-order-tooltip'>Shift + scroll to scroll sideways</div>";
                      echo "
                        <div class='store-location-container'>
                          <div class='order-store-name'>
                            " . $prevData[$orderRow]['store_name'] . "
                          </div>
                          <div class='order-store-address'>
                            " . $prevData[$orderRow]['store_address'] . "
                          </div>
                          <div class='order-store-city'>
                            " . $prevData[$orderRow]['store_city'] . "
                          </div>";
                          $fullDateTime = $prevData[$orderRow]['order_date'];
                          $fullDateTimeArr = explode(" ", $fullDateTime);
                          $datePart = $fullDateTimeArr[0];
                          $deliveryTime = $prevData[$orderRow]['delivery_time'];
                          echo "<div class='order-store-date'>" . $datePart . " | " . $deliveryTime . "</div>";
                      echo "
                        </div>
                      ";
                      echo "<div class='previous-order-row'>";
                      for($col = 0; $col < $itemArrLength; $col++){
                        $specStr = $prevData[$orderRow]['item_' . $itemArr[$col] . '_specs'];
                        $specsArr = explode(" | ", $specStr);
                        echo "
                          <div class='order-item'>
                            <input type='image' src='../foodbin/img/image". $itemArr[$col] . ".jpg'/>
                            <div class='item-details'>
                              " . $specsArr[0] . "<br/>" . $specsArr[1] . "<br/>" . $specsArr[2] . "<br/>" . $specsArr[3] . "
                            </div>
                          </div>
                        ";
                      }
                      echo "</div>"; # - closing order-row tag
                      echo "
                        <div class='previous-order-footer'>
                          <button class='order-again-btn'>Order Again</button>
                          <form action='includes/orderAgain.php' method='POST' class='order-again-form'>
                            <input type='number' name='num' value='" . $prevData[$orderRow]['id'] . "'/>
                            <input type='submit' name='submit' class='order-again-submit-btn'/>
                          </form>
                          <button class='remove-order-btn'>Remove Order</button>
                          <form action='includes/removePrevOrder.php' method='POST' class='remove-prev-form'>
                            <input type='number' name='num' value='" . $prevData[$orderRow]['id'] . "'/>
                            <input type='submit' name='submit' class='remove-order-submit-btn'/>
                          </form>
                        </div>
                        <div class='line-divider'></div>
                      ";
                      echo "</div>"; # - closing tag for previous-order-inner
                    }
                  }
                } else {
                  if($resultRows2 == 1 && $resultRows  == 1){
                    echo "<h3 style='text-align: center'>No previous orders</h3>";
                  }
                }
              ?>
              </div>
            </div>
				</div>
			</div>
		</div>

    <div class="modal-window" id="edit-modal-window">
      <div class="close-btn-container">
        <span class="modal-close-btn"></span>
      </div>
      <div id="modal-inner-container">
        <div id="modal-inner-content">
          <h3>Edit My Info</h3>
          <form action="includes/editprofile.php" method="POST" id="edit-profile-form">
            <?php
              if(isset($_SESSION['user_id'])){
                $first = $_SESSION['user_first'];
                $last = $_SESSION['user_last'];
                $email = $_SESSION['user_email'];
                echo "
                <input type='text' name='first' placeholder='First name' required autocomplete='off' value='" . $first . "'/'/>
                <input type='text' name='last' placeholder='Last name' required autocomplete='off' value='" . $last . "'/'/>
                <input type='text' name='email' placeholder='E-mail' required autocomplete='off' value='" . $email . "'/'/>
                <select required name='city' id='city-selection'>
                  <option value=' id='city-heading'>City:</option>
                  <option value='Sacramento, CA'>Sacramento, CA</option>
                  <option value='San Francisco, CA'>San Francisco, CA</option>
                  <option value='Oakland, CA'>Oakland, CA</option>
                  <option value='Fremont, CA'>Fremont, CA</option>
                  <option value='Berkeley, CA'>Berkeley, CA</option>
                  <option value='Stockton, CA'>Stockton, CA</option>
                  <option value='San Jose, CA'>San Jose, CA</option>
                  <option value='Los Angeles, CA'>Los Angeles, CA</option>
                  <option value='San Diego, CA'>San Diego, CA</option>
                  <option value='Santa Barbara, CA'>Santa Barbara, CA</option>
                  <option value='Riverside, CA'>Riverside, CA</option>
                  <option value='Long Beach, CA'>Long Beach, CA</option>
                  <option value='Anaheim, CA'>Anaheim, CA</option>
                  <option value='Irvine, CA'>Irvine, CA</option>
                </select>
                <input type='submit' name='edit-submit' id='edit-submit-btn'/>
                ";
              }
            ?>
          </form>
        </div>
      </div>
    </div>

    <div class="modal-window" id="notifications-modal">
      <div class="close-btn-container">
        <span class="modal-close-btn"></span>
      </div>
      <div id="modal-body-wrapper">
        <div id="modal-body">
          <h2>My Notifications</h2>
          <div id="notifications-container"></div>
          <?php
            $usersQuery = "SELECT * FROM users;";
            $result = mysqli_query($conn, $usersQuery);
            $numOfUsers = mysqli_num_rows($result);
            $checkQuery = "SELECT * FROM notification_system WHERE recipient_id='$id' AND reg_msg !='Yes';";
            $resultCheck = mysqli_query($conn, $checkQuery);
            $checkRows = mysqli_num_rows($resultCheck);
            if($checkRows < 1){
              echo "<p id='no-notifications'>No Notifications</p>";
            }
            $selQuery = "SELECT * FROM notification_system WHERE recipient_id='$id' OR sender_id='$id';";
            $result = mysqli_query($conn, $selQuery);
            $resultRows = mysqli_num_rows($result);
            $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
            for($x = 0; $x < ($numOfUsers + 1); $x++){
              $newQuery = "SELECT * FROM notification_system WHERE recipient_id='$id' AND sender_id='$x' OR recipient_id='$x' AND sender_id='$id';";
              $result = mysqli_query($conn, $newQuery);
              $rr = mysqli_num_rows($result);
              $newRow = mysqli_fetch_all($result, MYSQLI_ASSOC);
              for($x2 = 0; $x2 < $rr; $x2++){
                if($newRow[$x2]['accept_deny'] == "Yes" AND $newRow[$x2]['recipient_id'] == $id){
                  echo "
                    <div class='user-notification'>
                      <p class='accept-deny-message'>" . $newRow[$x2]['message'] . "</p>
                      <div class='accept-deny-container'>
                        <button class='accept-btn'>Accept</button>
                        <button class='deny-btn'>Deny</button>
                      </div>
                      <form class='deny-form' method='POST' action='includes/denyDeliveryOffer.php'>
                        <input type='number' name='sender-id' value='" . $newRow[$x2]['sender_id'] . "'/>
                        <input type='number' name='noti-id' value='" . $newRow[$x2]['noti_id'] . "' />
                        <input type='submit' name='submit' class='deny-offer-submit'/>
                      </form>
                      <form class='accept-form' method='POST' action='includes/acceptDeliveryOffer.php'>
                        <input type='number' name='sender-id' value='" . $newRow[$x2]['sender_id'] . "'/>
                        <input type='number' name='noti-id' value='" . $newRow[$x2]['noti_id'] . "' />
                        <input type='submit' name='submit' class='accept-offer-submit'/>
                      </form>
                    </div>
                  ";
                } else {
                  if($newRow[$x2]['decision'] == "Yes" && $newRow[$x2]['recipient_id'] == $id){
                    if($newRow[$x2]['accepted'] == "Yes"){
                      echo "
                       <div class='user-notification'>
                          <p class='decision-message'>" . $newRow[$x2]['message'] . "</p>
                          <span class='mail-icon' title='Send Message'><i class='fa fa-envelope'></i></span>
                          <div class='close-noti-container'>
                            <span class='close-bar-one'></span>
                            <span class='close-bar-two'></span>
                            <span class='close-box'></span>
                          </div>
                          <form class='send-message-form' method='POST' action='includes/sendMessage.php'>
                            <input type='number' name='sender-id' class='hidden' value='" . $newRow[$x2]['sender_id'] . "'/>
                            <div class='text-submit-container'>
                              <input type='text' name='message' placeholder='Message' required='required'/>
                              <input type='submit' name='submit' class='send-message-submit' value='Send'/>
                            </div>
                          </form>
                          <form class='remove-noti-form' method='POST' action='includes/removeNoti.php'>
                            <input type='number' name='noti-id' value='" . $newRow[$x2]['noti_id'] . "'/>
                            <input type='submit' name='submit' class='remove-noti-submit'/>
                          </form>
                        </div>
                      ";
                    }else {
                     echo "
                     <div class='user-notification'>
                       <p class='decision-message'>" . $newRow[$x2]['message'] . "</p>
                       <div class='close-noti-container'>
                         <span class='close-bar-one'></span>
                         <span class='close-bar-two'></span>
                         <span class='close-box'></span>
                       </div>
                       <form class='remove-noti-form' method='POST' action='includes/removeNoti.php'>
                         <input type='number' name='noti-id' value='" . $newRow[$x2]['noti_id'] . "'/>
                         <input type='submit' name='submit' class='remove-noti-submit'/>
                       </form>
                      </div>
                     ";
                   }
                  }
                }
              }
            }
          ?>
        </div>
      </div>
    </div>

    <div class="modal-window" id="conversations-modal">
      <div class="close-btn-container">
        <span class="modal-close-btn"></span>
      </div>
      <div id="convo-body-wrapper">
        <div id="convo-body">
          <h2>My Conversations</h2>
          <div id="conversations-container">
            <?php
            $userInvolved = "SELECT DISTINCT sender_id FROM notification_system WHERE recipient_id='$id' AND reg_msg='Yes';";
            $result1 = mysqli_query($conn, $userInvolved);
            if($result1){
              $resultRows1 = mysqli_num_rows($result1);
              $row1 = mysqli_fetch_all($result1, MYSQLI_ASSOC);
              for($x = 0; $x < $resultRows1; $x++){
                $otherId = $row1[$x]['sender_id'];
                $usrQuery = "SELECT * FROM users WHERE id='$otherId';";
                $result = mysqli_query($conn, $usrQuery);
                $row2 = mysqli_fetch_all($result, MYSQLI_ASSOC);
                $otherFirst = ucfirst($row2[0]['user_first']);
                $otherLast = ucfirst($row2[0]['user_last']);
                $otherLastInitial = $otherLast[0] . ".";
                $otherFull = $otherFirst . " " . $otherLastInitial;
                echo "
                  <div class='view-convo'>
                     <p>Conversation with " . $otherFull . "</p>
                     <button class='view-btn'>View</button>
                  </div>
                ";
                $seeMessages = "SELECT * FROM `notification_system` WHERE reg_msg='Yes' AND sender_id='$id' AND recipient_id='$otherId' OR reg_msg='Yes' AND recipient_id='$id' AND sender_id='$otherId' ORDER BY noti_date;";
                $resultMsgs = mysqli_query($conn, $seeMessages);
                $messagesRowsNum = mysqli_num_rows($resultMsgs);
                $messagesRows = mysqli_fetch_all($resultMsgs, MYSQLI_ASSOC);
                echo "<div class='messages-between'>";
                for($x2 = 0; $x2 < $messagesRowsNum; $x2++){
                  $msg = $messagesRows[$x2]['message'];
                  if($messagesRows[$x2]['recipient_id'] == $id){
                    $senderId = $messagesRows[$x2]['sender_id'];
                    echo "
                      <div class='received-message-grid'>
                        <p><span class='received-msg'>" . $msg . "</span></p>
                        <div></div>
                      </div>
                    ";
                  } else {
                    $senderId = $messagesRows[$x2]['recipient_id'];
                    echo "
                      <div class='sent-message-grid'>
                        <div></div>
                        <p><span  class='sent-msg'>" . $msg . "</span></p>
                      </div>
                    ";
                  }

                }
                echo "
                  <form class='reply-msg-form' method='POST' action='includes/sendMessage.php'>
                    <input type='number' class='hidden' name='sender-id' value='" . $senderId. "' />
                    <input type='text' name='message' placeholder='Message' autocomplete='off'/>
                    <input type='submit' name='submit' value='Send' />
                  </form>
                ";
                echo "</div>"; //end of 'messages-between div'
              }
            } else {
              echo "<p id='no-conversations'>No Conversations</p>";
            }


            // if($row1[0]['sender_id'] == $id){
            //   $test = 5;
            // } else if ($row1[0]['recipient_id'] == $id){
            //   $test = 10;
            // }
            // if($test == 5){
            //   $otherId = $row1[0]['recipient_id'];
            //   $getOtherName = "SELECT * FROM users WHERE id='$otherId';";
            //   $otherResult = mysqli_query($conn, $getOtherName);
            //   $row2 = mysqli_fetch_all($otherResult, MYSQLI_ASSOC);
            //   $otherFirst = $row2[0]['user_first'];
            //   $otherLast = $row2[0]['user_last'];
            //   $lastInitial = $otherLast[0] . ".";
            //   $otherFull = $otherFirst . " " . $lastInitial;
            //   echo "<p>Conversation with " . $otherFull . "</p>";
            // } else if ($test == 10){
            //   $otherId = $row1[0]['sender_id'];
            //   $getOtherName = "SELECT * FROM users WHERE id='$otherId';";
            //   $otherResult = mysqli_query($conn, $getOtherName);
            //   $row2 = mysqli_fetch_all($otherResult, MYSQLI_ASSOC);
            //   $otherFirst = $row2[0]['user_first'];
            //   $otherLast = $row2[0]['user_last'];
            //   $lastInitial = $otherLast[0] . ".";
            //   $otherFull = $otherFirst . " " . $lastInitial;
            //   echo "
            //    <div class='view-convo'>
            //      <p>Conversation with " . $otherFull . "</p>
            //      <button class='view-btn'>View</button>
            //    </div>
            //   ";
            // }
            ?>
          </div>
        </div>
      </div>
    </div>

	</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="profile.js"></script>
</body>
</html>
