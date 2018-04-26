<?php
  $userFirst = $_SESSION['user_first'];
  $userLast = $_SESSION['user_last'];
  $userFull = ucfirst($userFirst) . " " . ucfirst($userLast[0]) . ".";
  $id = $_SESSION['user_id'];
  $queryOrders = "SELECT * FROM current_orders WHERE delivery_by='$id' AND order_status='2';";
  $queryResults = mysqli_query($conn, $queryOrders);
  $resultNum = mysqli_num_rows($queryResults);
  $rowArr = mysqli_fetch_all($queryResults, MYSQLI_ASSOC);
  if($resultNum > 0){
    for($i = 0; $i < $resultNum; $i++){
      echo "
        <div class='store-grid'>
          <span>Ordered by: " . getOrdererName($rowArr, $conn, $i) . "</span>
          <span>" . $rowArr[$i]['store_name'] ."</span>
          <span>" . $rowArr[$i]['store_address'] ."</span>
          <span>Deliver by: " . $rowArr[$i]['delivery_time'] ."</span>
        </div>
      ";

      $foodIdsStr = $rowArr[$i]['food_ids'];
      $foodIdsArr = explode(" ", $foodIdsStr);
      array_pop($foodIdsArr);
      $foodIdsArrLength = count($foodIdsArr);

      echo "
        <div class='delivery-order-outer'>
          <div class='delivery-order-inner'>
      ";
      for($x = 0; $x < $foodIdsArrLength; $x++){
        $specStr = $rowArr[$i]['item_' . $foodIdsArr[$x] . '_specs'];
        $specsArr = explode(" | ", $specStr);
        echo "
          <div class='delivery-item'>
            <img src='../foodbin/img/image". $foodIdsArr[$x] . ".jpg'/>
            <div class='item-details'>
              " . $specsArr[0] . "<br/>" . $specsArr[1] . "<br/>" . $specsArr[2] . "<br/>" . $specsArr[3] . "
            </div>
          </div>
        ";
      }
      echo "</div>"; //end of delivery order inner
      echo "</div>"; //end of delivery order outer
      echo "
        <div class='delivery-btns-container'>
          <button class='delivery-cancel-btn'>Cancel</button>
          <button class='delivery-completed-btn'>Completed</button>
        </div>
        <form class='cancel-delivery-form' method='POST' action='includes/cancelDelivery.php'>
          <input type='text' name='from' value='home' class='hidden'/>
          <input type='text' name='user' value='" . $userFull ."'/>
          <input type='number' name='other-id' value='" . $rowArr[$i]['user_id'] . "'/>
          <input type='submit' name='submit' class='delivery-cancel-submit'/>
        </form>
        <form class='delivery-completed-form' method='POST' action='includes/deliveryCompleted.php'>
          <input type='text' name='from' value='home' class='hidden'/>
          <input type='text' name='user' value='" . $userFull ."'/>
          <input type='number' name='other-id' value='" . $rowArr[$i]['user_id'] . "'/>
          <input type='submit' name='submit' class='delivery-completed-submit'/>
        </form>
        <form class='delivery-msg-form' method='POST' action='includes/sendMessage.php'>
          <input type='number' name='other-id' value='" . $rowArr[$i]['user_id'] . "' class='hidden'/>
          <input type='text' name='message' placeholder='Message' autocomplete='off'/>
          <button type='submit' name='submit' class='delivery-msg-submit'>
            <i class='fa fa-send-o' style='font-size: 20px'></i>
          </button>
        </form>
      ";
      echo "<div class='delivery-line-divider'></div>";
    } // end of main for loop
  } else {
    echo "<p>You have no current deliveries.</p>";
  }

  function getOrdererName($rowArr, $conn, $i){
    $person1 = $rowArr[$i]['user_id'];
    $getName = "SELECT * FROM users WHERE id='$person1';";
    $result = mysqli_query($conn, $getName);
    $row = mysqli_fetch_all($result, MYSQLI_ASSOC);
    $firstName = $row[0]['user_first'];
    $lastInitial = $row[0]['user_last'][0] . ".";
    $fullName = ucfirst($firstName) . " " . ucfirst($lastInitial);
    return $fullName;
  }



?>
