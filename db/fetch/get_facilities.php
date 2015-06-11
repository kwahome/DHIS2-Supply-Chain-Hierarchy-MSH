<?php
	require '../db_auth/db_con.php';
    /*
    NOTES: ORG. LEVELS
    4 - Facility level
    3 - Sub-County Level
    2 - County level
    1 - Kenya

    */
    $id = $_GET['id'];
    $org_level = $_GET['type'];

    //Facility Level
    if($org_level==4)
    {
        $data = array();
        $facilities = "SELECT * FROM facilities WHERE facility_id='$id'";
        $result = mysqli_query($conn,$facilities);
        if(mysqli_num_rows($result)>0)
        {
            while($row = mysqli_fetch_assoc($result)) 
            {
                $data[] = $row;
            }
            $return = json_encode($data);
            echo $return;
        }
    }

    //Sub-County Level
    else if($org_level==3)
    {
        $data = array();
        $facilities = "SELECT * FROM facilities WHERE parent_id='$id'";
        $result = mysqli_query($conn,$facilities);
        if(mysqli_num_rows($result)>0)
        {
            while($row = mysqli_fetch_assoc($result)) 
            {
                $data[] = $row;
            }
            $return = json_encode($data);
            echo $return;
        }

    }

    //County Level
    else if($org_level==2)
    {
        $data = array();
        $sub_counties_query = "SELECT * FROM sub_counties WHERE parent_id = '$id'";
        $answer = mysqli_query($conn,$sub_counties_query);
        if(mysqli_num_rows($answer)>0)
        {
            $sc_id = array();
            $count = 0;
            while($row = mysqli_fetch_assoc($answer)) 
            {
                $sc_id[] = $row['sub_county_id'];
                $count = $count+1;
            }

            $i=0;
            for($i=0;$i<$count;$i++)
            {
                $parent_id = $sc_id[$i];
                $facilities_query = "SELECT * FROM facilities WHERE parent_id = '$parent_id'";
                $result = mysqli_query($conn,$facilities_query);
                if(mysqli_num_rows($result)>0)
                {
                    while($the_row = mysqli_fetch_assoc($result))
                    {
                        $data[] = $the_row;
                    }
                }
            }
            $return = json_encode($data);
            echo $return;
        }
    }

    //Country Level (Kenya)
    else if($org_level==1)
    {
        $data = array();
        $facilities = "SELECT * FROM facilities";
        $result = mysqli_query($conn,$facilities);
        if(mysqli_num_rows($result)>0)
        {
            while($row = mysqli_fetch_assoc($result)) 
            {
                $data[] = $row;
            }
            $return = json_encode($data);
            echo $return;
        }

    }
	mysqli_close($conn);
?> 