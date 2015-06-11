<?php
	require '../db_auth/db_con.php';

	//Check if the facility exists
    $id = $_POST['id'];
	$number = "SELECT * FROM facilities WHERE facility_id = '$id'";
	$result = mysqli_query($conn,$number);
    if(mysqli_num_rows($result)>0)
    {
        echo $id;
    }
    //echo mysqli_num_rows($result);
	mysqli_close($conn);
?> 