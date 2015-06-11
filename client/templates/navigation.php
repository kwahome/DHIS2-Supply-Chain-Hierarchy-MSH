<!--Default Navigation -->
<div class = "col-md-3" style = "margin-left:10px;margin-top:-10px;border-radius:5px;max-height:300px;">
    <div>
        <!--begin collapsible-->  
        <div>
            <div class="panel-group" id="accordion" style = "cursor:auto">

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <p>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" style = "padding-left:5px">SEARCH</a>
                            <a class="pull-left"  data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                                <span class="glyphicon glyphicon-minus-sign changed" onclick="javascript:changeIcon()"></span>
                            </a>
                        </p>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse in">
                        <div class="panel-body">
                            <div>
                                <input placeholder="Search"></input>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <p>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseFacilities" style = "padding-left:5px">CLASSIFY FACILITIES</a>
                            <a class="pull-left" data-toggle="collapse" data-parent="#accordion" href="#collapseFacilities">
                                <span class="glyphicon glyphicon-plus-sign" onclick="javascript:changeIcon()"></span>
                            </a>
                        </p>
                    </div>
                    <div id="collapseFacilities" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class = "btn btn-info btn-md" onclick="javascript:classifyFacilities(1)" data-toggle="collapse" data-parent="#accordion" href="#collapseOrgUnits">
                                Central Sites
                            </div>
                            <br>
                            <div class = "btn btn-success btn-md" onclick="javascript:classifyFacilities(2)" data-toggle="collapse" data-parent="#accordion" href="#collapseOrgUnits">
                                Satellite Sites
                            </div>
                            <br>
                            <div class = "btn btn-warning btn-md" onclick="javascript:classifyFacilities(3)" data-toggle="collapse" data-parent="#accordion" href="#collapseOrgUnits">
                                Stand Alones
                            </div>
                        </div>
                    </div>
                </div>

                <!-- HIERARCHY BASED ON THE ORGANIZATION UNITS AS CAPTURED IN DHIS -->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <p>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOrgUnits" style = "padding-left:5px">ORGANIZATION UNITS</a>
                            <a class="pull-left" data-toggle="collapse" data-parent="#accordion" href="#collapseOrgUnits">
                                <span class="glyphicon glyphicon-plus-sign" onclick="javascript:changeIcon()"></span>
                            </a>
                        </p>
                    </div>
                    <div id="collapseOrgUnits" class="panel-collapse collapse" style = "font-size:8pt">
                        <div class="panel-body">
                            <p>
                                <span data-toggle="collapse" data-parent="#collapseOrgUnits" href="" style = "padding-left:5px">
                                    <span class = "unclickedColor color" onclick="javascript:updateSelectList(1)">Kenya</span>
                                </span>
                                <a class="pull-left" data-toggle="collapse" data-parent="#collapseOrgUnits" href="#counties">
                                    <span class="glyphicon glyphicon-plus-sign" onclick="javascript:changeIcon()"></span>
                                    <i class="icon-folder-close-al"></i>
                                </a>
                            </p>
                            <div id="counties" class="panel-collapse collapse">
                                <div class="panel-body">
                                    <?php
                                        require "db/db_auth/db_con.php";

                                        //Color code :#23527C
                                        //Fetch counties
                                        $county = "SELECT * FROM counties";
                                        $result = mysqli_query($conn,$county);
                                        if(mysqli_num_rows($result)>0)
                                        {
                                            while($row = mysqli_fetch_assoc($result)) 
                                            {
                                                //class = 'unclickedColor color' onclick='javascript:changeColor()'
                                                $c_id = $row['county_id'];
                                                echo "<p style = 'font:8pt'>
                                                        <span data-toggle='collapse' data-parent='#".$row['county_id']."' class = 'unclickedColor' style = 'padding-left:5px' onclick='javascript:updateSelectList(2,\"$c_id\")'>"
                                                        .$row["county_name"].
                                                        "</span>";
                                                echo "<a class='pull-left' data-toggle='collapse' data-parent='#".$row['county_id']."' href='#".$row['county_id']."'>
                                                            <span class='glyphicon glyphicon-plus-sign' onclick='javascript:changeIcon()'></span>
                                                        </a>
                                                    </p>";

                                                echo "<div id='".$row['county_id']."' class='panel-collapse collapse'>
                                                        <div class='panel-body'>";

                                                        /* LOGIC UNDER COUNTIES GOES IN HERE */

                                                            //Fetch subcounties of the current county
                                                            //Using a WHERE comparison
                                                            $county_id = $row['county_id'];
                                                            $sub_county = "SELECT * FROM sub_counties WHERE parent_id = '$county_id'";
                                                            $response = mysqli_query($conn,$sub_county);
                                                            if(mysqli_num_rows($response)>0)
                                                            {
                                                                while ($data = mysqli_fetch_assoc($response))
                                                                {
                                                                    $sc_id = $data['sub_county_id'];

                                                                    echo "<p>
                                                                            <span data-toggle='collapse' data-parent='#".$data['sub_county_id']."' class = 'unclickedColor' style = 'padding-left:5px' onclick='javascript:updateSelectList(3,\"$sc_id\")'>"
                                                                            .$data["sub_county_name"].
                                                                            "</span>";
                                                                    echo "<a class='pull-left' data-toggle='collapse' data-parent='#".$data['sub_county_id']."' href='#".$data['sub_county_id']."'>
                                                                                <span class='glyphicon glyphicon-plus-sign' onclick='javascript:changeIcon()'></span>
                                                                            </a>
                                                                        </p>";

                                                                    echo "<div id='".$data['sub_county_id']."' class='panel-collapse collapse'>
                                                                            <div class='panel-body'>";

                                                                            /* LOGIC UNDER SUB-COUNTIES GOES IN HERE */
                                                                            //Fetch facilities under the current sub county
                                                                            $sub_county_id = $data['sub_county_id'];
                                                                            $facility = "SELECT * FROM facilities WHERE parent_id = '$sub_county_id'";
                                                                            $return= mysqli_query($conn,$facility);
                                                                            if(mysqli_num_rows($return)>0)
                                                                            {
                                                                                while ($facilities = mysqli_fetch_assoc($return))
                                                                                {
                                                                                    $f_id = $facilities['facility_id'];
                                                                                    echo "<span onclick='javascript:updateSelectList(4,\"$f_id\")' class = 'unclickedColor color'>";
                                                                                    echo $facilities['facility_name'];
                                                                                    echo "<br>";
                                                                                    echo "</span>";
                                                                                }
                                                                            }
                                                                    echo    "</div>
                                                                        </div>";
                                                                }
                                                            }
                                                echo    "</div>
                                                    </div>";
                                            }
                                        }    
                                        mysqli_close($conn);
                                    ?>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- END HIERARCHY BASED ON THE ORGANIZATION UNITS AS CAPTURED IN DHIS -->

                <!-- UPDATES -->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <p>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseUpdates" style = "padding-left:5px">UPDATES</a>
                            <a class="pull-left" data-toggle="collapse" data-parent="#accordion" href="#collapseUpdates">
                                <span class="glyphicon glyphicon-plus-sign" onclick="javascript:changeIcon()"></span>
                            </a>
                        </p>
                    </div>
                    <div id="collapseUpdates" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class = "btn btn-info btn-md" onclick="javascript:getData(2)">Counties</div>
                            <div class = "btn btn-info btn-md" onclick="javascript:getData(3)">Sub Counties</div>
                            <div class = "btn btn-info btn-md" onclick="javascript:getData(4)">Facilities</div>
                        </div>
                    </div>
                </div>
                <!-- END UPDATES -->

                <!-- REPORTS -->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <p>
                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseReports" style = "padding-left:5px">REPORTS</a>
                            <a class="pull-left" data-toggle="collapse" data-parent="#accordion" href="#collapseReports">
                                <span class="glyphicon glyphicon-plus-sign" onclick="javascript:changeIcon()"></span>
                            </a>
                        </p>
                    </div>
                    <div id="collapseReports" class="panel-collapse collapse">
                        <div class="panel-body">
                            <div class = "btn btn-info btn-md" onclick="javascript:getData(2)">Counties</div>
                            <div class = "btn btn-info btn-md" onclick="javascript:getData(3)">Sub Counties</div>
                            <div class = "btn btn-info btn-md" onclick="javascript:getData(4)">Facilities</div>
                        </div>
                    </div>
                </div>
                <!-- END REPORTS -->

            </div>
        </div>   
        <!-- end collapsible--> 
    </div>
</div>
<!-- Default Navigation -->