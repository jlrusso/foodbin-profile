<?php
$id = $_SESSION['user_id'];
$p2pMessage = "SELECT DISTINCT sender_id FROM msg_system WHERE recipient_id='$id';";
$p2pResult = mysqli_query($conn, $p2pMessage);
$p2pResultNum = mysqli_num_rows($p2pResult);
$p2pArr = mysqli_fetch_all($p2pResult, MYSQLI_ASSOC);
if($p2pResultNum < 1){
  echo "<p id='no-conversations'>No Conversations</p>";
} else {
  for($x = 0; $x < $p2pResultNum; $x++){
    $otherPersonId = $p2pArr[$x]['sender_id'];
    $getUsers = "SELECT * FROM users WHERE id='$otherPersonId';";
    $getUsersResult = mysqli_query($conn, $getUsers);
    $usersArr = mysqli_fetch_all($getUsersResult, MYSQLI_ASSOC);
    $otherFirst = ucfirst($usersArr[0]['user_first']);
    $otherLast = ucfirst($usersArr[0]['user_last']);
    $otherLastInitial = $otherLast[0] . ".";
    $otherFull = $otherFirst . " " . $otherLastInitial;
    echo "
      <div class='view-convo' sender='" . $otherPersonId . "' id='" . $otherPersonId . "-user'>
       <img src='../foodbin/uploads/profile" . $otherPersonId . ".jpg'/>
       <p>" . $otherFull . " &nbsp; <span class='new-msg-alert'>New Message</span></p>
       <input type='checkbox' id='checkbox-" . $otherPersonId . "' class=' hidden convo-checkbox'/>
      </div>
    ";
    $getConvo = "SELECT * FROM msg_system WHERE sender_id='$otherPersonId' AND recipient_id='$id' AND msg_status='read' OR sender_id='$id' AND recipient_id='$otherPersonId';";
    $getConvoResult = mysqli_query($conn, $getConvo);
    $convoResultNum = mysqli_num_rows($getConvoResult);
    $convoArr = mysqli_fetch_all($getConvoResult, MYSQLI_ASSOC);
    echo "<div class='messages-outer'>";
      echo "<div class='messages-inner' id='with-user-" . $otherPersonId . "'>";
    for($x2 = 0; $x2 < $convoResultNum; $x2++){
      $msg = $convoArr[$x2]['message'];
      if($convoArr[$x2]['recipient_id'] == $id){
        $otherId = $convoArr[$x2]['sender_id'];
        echo "
          <div class='received-message-grid'>
            <p><span class='received-msg'>" . $msg . "</span></p>
            <div></div>
          </div>
        ";
      } else {
        $otherId = $convoArr[$x2]['recipient_id'];
        echo "
          <div class='sent-message-grid'>
            <div></div>
            <p><span  class='sent-msg'>" . $msg . "</span></p>
          </div>
        ";
      }
    }
    echo "</div>"; //end of 'messages-inner'
    echo "
      <form class='reply-msg-form' method='POST' action='includes/sendMessage.php'>
        <input type='number' class='hidden' name='other-id' value='" . $otherId. "' />
        <input type='text' name='message' placeholder='Message' autocomplete='off'/>
        <button type='submit' name='submit' class='convo-send-submit'>
          <i class='fa fa-send-o' style='font-size: 20px'></i>
        </button>
      </form>
    ";
    echo "</div>"; //end of 'messages-outer'
  }
}
