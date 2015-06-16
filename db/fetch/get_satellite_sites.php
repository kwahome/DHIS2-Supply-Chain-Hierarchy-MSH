<?php
    require '../db_auth/db_con.php';

    $central_id = $_GET['central_id'];
    $data = array();
    $facility_data = array();
    $query = "SELECT * FROM satelite_site WHERE central_id='$central_id'";
    $result = mysqli_query($conn,$query);
    if(mysqli_num_rows($result)>0)
    {
        $count = 0;
        while($row = mysqli_fetch_assoc($result)) 
        {
            $data[] = $row['satelite_id'];
            $count++;
        }

        // Get details of the satellite site
        $i=0;
        for($i=0;$i<$count;$i++)
        {
            $id=$data[$i];
            $facility_name = "SELECT * FROM facilities WHERE facility_id = '$id'";
            $response= mysqli_query($conn,$facility_name);
            if(mysqli_num_rows($response)>0)
            {
                while($the_row = mysqli_fetch_assoc($response)) 
                {
                    $facility_data[$i]= $the_row;
                }
            }
        }

        // Attach the central store whose satellites are being returned
        //$facility_data[$i]= $central_id;
        $parent = "SELECT * FROM facilities WHERE facility_id = '$central_id'";
        $parent_data= mysqli_query($conn,$parent);
        if(mysqli_num_rows($parent_data)>0)
        {
            while($the_parent = mysqli_fetch_assoc($parent_data)) 
            {
                $facility_data[$i]= $the_parent;
            }
        }

        // Return the entire array with both satellite sites and their parent (central store details)
        $return = json_encode($facility_data);
        echo $return;
    }
    mysqli_close($conn);
?> 