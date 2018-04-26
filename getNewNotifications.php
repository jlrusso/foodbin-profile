<?php
session_start();
include_once "dbh-inc.php";
$id = $_SESSION['user_id'];
$getNotis = "SELECT * FROM notification_system WHERE recipient_id='$id' AND noti_status='unread';";
$getResult = mysqli_query($conn, $getNotis);
$resultNum = mysqli_num_rows($getResult);
if($resultNum > 0){
  $getUsers = "SELECT * FROM users WHERE id!='$id';";
  $getResult = mysqli_query($conn, $getUsers);
  $numOfUsers = mysqli_num_rows($getResult);
  $usersArr = mysqli_fetch_all($getResult, MYSQLI_ASSOC);
  for($x = 0; $x < $numOfUsers; $x++){
    $otherPersonId = $usersArr[$x]['id'];
    $notiWithUserX = "SELECT * FROM notification_system WHERE sender_id='$otherPersonId' AND recipient_id='$id' AND noti_status='unread';";
    $userNotiResult = mysqli_query($conn, $notiWithUserX);
    $numOfUserXnotis = mysqli_num_rows($userNotiResult);
    $notiArr = mysqli_fetch_all($userNotiResult, MYSQLI_ASSOC);
    for($x3 = 0; $x3 < $numOfUserXnotis; $x3++){
      if($notiArr[$x3]['noti_type'] == 'offer'){
        echo "
          <div class='user-notification'>
            <p class='accept-deny-message'>" . $notiArr[$x3]['message'] . "</p>
            <div class='accept-deny-container'>
              <button class='accept-btn'>Accept</button>
              <button class='deny-btn'>Deny</button>
            </div>
            <form class='deny-form' method='POST' action='includes/denyDeliveryOffer.php'>
              <input type='number' name='offerer-id' value='" . $notiArr[$x3]['sender_id'] . "'/>
              <input type='number' name='noti-id' value='" . $notiArr[$x3]['noti_id'] . "' />
              <input type='submit' name='submit' class='deny-offer-submit'/>
            </form>
            <form class='accept-form' method='POST' action='includes/acceptDeliveryOffer.php'>
              <input type='number' name='offerer-id' value='" . $notiArr[$x3]['sender_id'] . "'/>
              <input type='number' name='noti-id' value='" . $notiArr[$x3]['noti_id'] . "' />
              <input type='submit' name='submit' class='accept-offer-submit'/>
            </form>
          </div>
        ";
      } else if ($notiArr[$x3]['noti_type'] == 'accept-offer'){
        echo "
         <div class='user-notification'>
            <p class='decision-message'>" . $notiArr[$x3]['message'] . "</p>
            <span class='mail-icon' title='Send Message'><i class='fa fa-envelope'></i></span>
            <div class='close-noti-container'>
              <span class='close-bar-one'></span>
              <span class='close-bar-two'></span>
              <span class='close-box'></span>
            </div>
            <form class='send-message-form' method='POST' action='includes/sendMessage.php'>
              <input type='number' name='other-id' class='hidden' value='" . $notiArr[$x3]['sender_id'] . "'/>
              <div class='text-submit-container'>
                <input type='text' name='message' placeholder='Message' required='required'/>
                <input type='submit' name='submit' class='noti-message-submit' value='Send'/>
              </div>
            </form>
            <form class='remove-noti-form' method='POST' action='includes/removeNoti.php'>
              <input type='number' name='noti-id' value='" . $notiArr[$x3]['noti_id'] . "'/>
              <input type='submit' name='submit' class='remove-noti-submit'/>
            </form>
          </div>
        ";
      } else if ($notiArr[$x3]['noti_type'] == 'deny-offer'){
        echo "
         <div class='user-notification'>
            <p class='decision-message'>" . $notiArr[$x3]['message'] . "</p>
            <div class='close-noti-container'>
              <span class='close-bar-one'></span>
              <span class='close-bar-two'></span>
              <span class='close-box'></span>
            </div>
            <form class='remove-noti-form' method='POST' action='includes/removeNoti.php'>
              <input type='number' name='noti-id' value='" . $notiArr[$x3]['noti_id'] . "'/>
              <input type='submit' name='submit' class='remove-noti-submit'/>
            </form>
          </div>
        ";
      } else if ($notiArr[$x3]['noti_type'] == 'delivery-complete'){
        echo "
         <div class='user-notification'>
            <p class='decision-message'>" . $notiArr[$x3]['message'] . "</p>
            <div class='accept-deny-container'>
              <button class='yes-btn'>Yes</button>
              <button class='no-btn'>No</button>
            </div>
            <form class='delivery-check-form' method='POST' action='includes/deliveryCheck.php'>
             <input type='number' name='noti-id' value='" . $notiArr[$x3]['noti_id'] . "' />
             <input type='submit' name='submit' class='delivery-check-submit'/>
            </form>
         </div>
        ";
      } else if ($notiArr[$x3]['noti_type'] == 'delivery-cancel'){
        echo "
         <div class='user-notification'>
            <p class='decision-message'>" . $notiArr[$x3]['message'] . "</p>
            <span class='mail-icon' title='Send Message'><i class='fa fa-envelope'></i></span>
            <div class='close-noti-container'>
              <span class='close-bar-one'></span>
              <span class='close-bar-two'></span>
              <span class='close-box'></span>
            </div>
            <form class='send-message-form' method='POST' action='includes/sendMessage.php'>
              <input type='number' name='other-id' class='hidden' value='" . $notiArr[$x3]['sender_id'] . "'/>
              <div class='text-submit-container'>
                <input type='text' name='message' placeholder='Message' required='required'/>
                <input type='submit' name='submit' class='noti-message-submit' value='Send'/>
              </div>
            </form>
            <form class='remove-noti-form' method='POST' action='includes/removeNoti.php'>
              <input type='number' name='noti-id' value='" . $notiArr[$x3]['noti_id'] . "'/>
              <input type='submit' name='submit' class='remove-noti-submit'/>
            </form>
          </div>
        ";
      }
    }
    for($x2 = 0; $x2 < $numOfUserXnotis; $x2++){
      $notiId = $notiArr[$x2]['noti_id'];
      $updateStatus = "UPDATE notification_system SET noti_status='read' WHERE noti_id='$notiId';";
      mysqli_query($conn, $updateStatus);
    }
  }
}
