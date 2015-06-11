<?php
	require '../db_auth/db_con.php';

	//Check if the facility exists
	$facility = "SELECT * FROM sub_counties";
	$result = mysqli_query($conn,$facility);
	if(mysqli_num_rows($result)>0)
    {
        while($row = mysqli_fetch_assoc($result)) 
        {
            //foreach
            echo "<tr>";
                echo"<td>";
                echo $row["sub_county_id"];
                echo "</td>";

                echo"<td>";
                echo $row["sub_county_name"];
                echo "</td>";
            echo "</tr>";
        }
   }

    else
    {
        echo "Does not exist";
    }

    echo "HERE";
	mysqli_close($conn);
?> 