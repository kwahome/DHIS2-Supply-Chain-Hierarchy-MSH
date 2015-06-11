<?php

	require '../db_auth/db_con.php';

	$id= $_POST['data'];
	$facility_type = $_POST['type'];
	$central_id = $_POST['central'];

	// Central Stores
	if($facility_type=="Central Store")
	{
		//Check if the facility exists
		$exists = "SELECT * FROM central_site WHERE central_id = '$id'";
		$result = mysqli_query($conn,$exists);
		if(mysqli_num_rows($result)>0)
		{
			echo 1;
		}

		else
		{
			$check = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
			$response = mysqli_query($conn,$check);
			if(mysqli_num_rows($response)>0)
			{
				echo 10;
			}

			else
			{
				$sql = "INSERT INTO central_site(central_id)
				VALUES ('$id')";

				if (mysqli_query($conn, $sql)) 
				{
				    echo 0;
				} 
				else 
				{
				    echo -1;
				}
			}

		}

	}

	// Satellite Sites
	else if($facility_type=="Satellite Site")
	{
		//Check if the facility exists
		$exists = "SELECT * FROM satelite_site WHERE satelite_id = '$id'";
		$result = mysqli_query($conn,$exists);
		if(mysqli_num_rows($result)>0)
		{
			echo 1;
		}

		else
		{
			$check = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
			$response = mysqli_query($conn,$check);
			if(mysqli_num_rows($response)>0)
			{
				echo 10;
			}

			else
			{
				$sql = "INSERT INTO satelite_site(satelite_id,central_id)
				VALUES ('$id','$central_id')";

				if (mysqli_query($conn, $sql)) 
				{
				    echo 0;
				} 
				else 
				{
				    echo -1;
				}
			}

		}

	}

	// Stand alone sites
	else if ($facility_type=="Stand Alone")
	{
		//Check if the facility exists
		$exists = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
		$result = mysqli_query($conn,$exists);
		if(mysqli_num_rows($result)>0)
		{
			echo 1;
		}

		else
		{
			$check = "SELECT * FROM central_site WHERE central_id = '$id'";
			$response = mysqli_query($conn,$check);
			if(mysqli_num_rows($response)>0)
			{
				echo 10;
			}

			else
			{
				$sql = "INSERT INTO standalone_site(standalone_id)
				VALUES ('$id')";

				if (mysqli_query($conn, $sql)) 
				{
				    echo 0;
				} 
				else 
				{
				    echo -1;
				}
			}

		}

	}
	mysqli_close($conn);
?> 