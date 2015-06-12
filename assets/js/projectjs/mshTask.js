/***********************************************************************************
* HI4KENYA AFYAINFO BOOTCAMP 2015                                                  *
* -------------------------------                                                  *
* GROUP ONE                                                                        *
* MSH SUPPLY CHAIN HIERARCHY PROJECT                                               *
* JUNE 2015                                                                        *
* ----------------------------------                                               *
* KELVIN WAHOME                                                                    *
* Computer Science                                                                 *
* School of Computing and Informatics                                              *
* The University of Nairobi                                                        *
* kevowahome@gmail.com                                                             *
* ---------------------------------------------------------------------------------*
*This file contains JavaScript functions for the MSH Supply Chain Hierarchy project*
**
**
* ---------------------------------------------------------------------------------*/

/*Function to change the icon in the collapsible menu*/
function changeIcon()
{
    var icon=$(".changed");
    if (icon.hasClass("glyphicon-plus-sign"))
    {
        icon.removeClass("glyphicon-plus-sign").addClass("glyphicon-minus-sign");
    }
    else if (icon.hasClass("glyphicon-minus-sign"))
    {
        icon.removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
    }
    else
    {
        icon.removeClass("glyphicon-minus-sign").addClass("glyphicon-plus-sign");
    }                

}

/*--------------------------------------------------------------------------------------------------------------------------------*/

/*Function to change the color of the clicked item*/
function changeColor(type)
{
    var color=$(".color");
    if (color.hasClass("unclickedColor"))
    {
        color.removeClass("unclickedColor").addClass("clickedColor");
    } 

    else if (color.hasClass("clickedColor"))
    {
        color.removeClass("clickedColor").addClass("unclickedColor");
    }              
             

}
/*--------------------------------------------------------------------------------------------------------------------------------*/

/*Function to get data from DHIS2 web API and insert into the database*/
function getData(level) 
{
    var count=1
    for(count =1;count<=20;count++)
    {
        var url = "http://test.hiskenya.org/api/organisationUnits.jsonp?page="+count+"&callback=?";
        $.getJSON( url, 
        function(data) 
        {
            $.each(data.organisationUnits, function(s, values) 
            {
                var query = values.href+".jsonp?callback=?";
                $.getJSON( query, 
                function(response)
                {
                    if(level==4)
                    {
                        $('div#returned_messages').html("<span class = 'fa fa-exclamation-triangle' style = 'color:blue;'> Updating facilities. This may take a while <img src='assets/img/ajax-loader-3.gif'></span>");
                        if(response.level==4)
                        {
                            $.post
                            (
                                'db/insertion/insert_facilities.php',
                                {id:response.id,name:response.name,parent:response.parent.id,mfl_code:response.code},
                                function(message)
                                {
                                    if(message == 0)
                                    {
                                        $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+response.name+" Inserted</span>");
                                    }

                                    else if(message == 1)
                                    {
                                        $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:green;'>"+response.name+" Found</span>");
                                    }

                                    else if(message == -1)
                                    {
                                        $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:red;'>Error. "+response.name+" not inserted</span>");
                                    }
                                }
                            );

                            $('div#returned_messages').html("<span class = 'fa fa-check-square' style = 'color:green;'> Update Finished Successfully</span>");
                            
                            // Fetch the number of facilities
                            var status_url = "db/fetch/system_status.php";  
                            $.getJSON
                            (
                                status_url,
                                {level:4},
                                function(status)
                                {
                                    $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+status.length+" Facilities found</span>");
                                    for(var j=0; j<status.length;j++)
                                    {
                                        //$('span#note').html("Loading <img src='assets/img/ajax-loader.gif'>");   
                                        //$("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("div#facilities");
                                    }   
                                }
                            );
                        }

                    }

                    else if(level == 3)
                    {
                        $('div#returned_messages').html("<span class = 'fa fa-exclamation-triangle' style = 'color:blue;'> Updating sub counties. This may take a while <img src='assets/img/ajax-loader-3.gif'></span>");
                        if(response.level==3)
                        {
                            $.post
                            (
                                'db/insertion/insert_sub_counties.php',
                                {id:response.id,name:response.name,parent:response.parent.id},
                                function(message)
                                {
                                    if(message == 0)
                                    {
                                        $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+response.name+" Inserted</span>");
                                    }

                                    else if(message == 1)
                                    {
                                        $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:green;'>"+response.name+" Found</span>");
                                    }

                                    else if(message == -1)
                                    {
                                        $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:red;'>Error</span>");
                                    }
                                }
                            );
                            
                            $('div#returned_messages').html("<span class = 'fa fa-check-square' style = 'color:green;'> Update Finished Successfully</span>");
                            
                            // Fetch the number of sub counties
                            var status_url = "db/fetch/system_status.php";  
                            $.getJSON
                            (
                                status_url,
                                {level:3},
                                function(status)
                                {
                                    $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+status.length+" Sub Counties found</span>");
                                    for(var j=0; j<status.length;j++)
                                    {
                                        // $('span#note').html("Loading <img src='assets/img/ajax-loader.gif'>");   
                                        // $("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("div#facilities");
                                    }   
                                }
                            );
                        }

                    }

                    else if(level == 2)
                    {
                        $('div#returned_messages').html("<span class = 'fa fa-exclamation-triangle' style = 'color:blue;'> Updating counties. This may take a while <img src='assets/img/ajax-loader-3.gif'></span>");
                        if(response.level==2)
                        {
                            $.post
                            (
                                'db/insertion/insert_counties.php',
                                {id:response.id,name:response.name,parent:response.parent.id},
                                function(message)
                                {
                                    //alert(message);
                                    if(message == 0)
                                    {
                                        $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+response.name+" Inserted</span>");
                                    }

                                    else if(message == 1)
                                    {
                                        $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:green;'>"+response.name+" Found</span>");
                                    }

                                    else if(message == -1)
                                    {
                                        $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:red;'>Error</span>");
                                    }
                                }
                            );
                            
                            $('div#returned_messages').html("<span class = 'fa fa-check-square' style = 'color:green;'> Update Finished Successfully</span>");
                            
                            // Fetch the number of counties
                            var status_url = "db/fetch/system_status.php";  
                            $.getJSON
                            (
                                status_url,
                                {level:2},
                                function(status)
                                {
                                    $('div#facilities').html("<span class = 'fa fa-ok' style = 'color:blue;'>"+status.length+" Counties found</span>");
                                    for(var j=0; j<status.length;j++)
                                    {
                                        // $('span#note').html("Loading <img src='assets/img/ajax-loader.gif'>");   
                                        // $("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("div#facilities");
                                    }   
                                }
                            );
                        }

                    }

                });

            });
        });
    }
    //alert(count);
    // if(count>2)
    // {
    //     $('div#returned_messages').html("<span class = 'fa fa-cog' style = 'color:green;'> Update finished successfully</span>");
    // }
}
/*End of function*/
/*--------------------------------------------------------------------------------------------------------------------------------*/

/*
    Function classifyFacilities()
    1 - Central Sites
    2 - Satellite Sites
    3 - Stand Alone Sites
*/

function classifyFacilities(type)
{
    /* CENTRAL STORES */
    if(type == 1)
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:0px'> CENTRAL STORES<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt'>NOTE: Use DHIS2 Organization Units to sort and drill down</span></span>");

        var data = "<div class='panel-heading' style = 'height:5%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initIt();'>"+
                        "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='javascript:classifyFacilities(1)'>Reset</button>"+
                        "<span style = 'margin-left:100px'>Available</span>"+
                        "<span class = 'glyphicon glyphicon-forward pull-right' style = 'color:#2A6496' ONCLICK='addIt();'></span>"+
                        "<span class = 'glyphicon glyphicon-chevron-right pull-right' style = 'margin-right:10px;color:#2A6496' ONCLICK='addIt();'></span>"+
                    "</div>"+
                   // Selected header
                   "<div class='panel-heading' style = 'height:5%;width:40%;margin-bottom:5px'>"+                           
                        "<span class = 'glyphicon glyphicon-backward pull-left' style = 'color:#2A6496' ONCLICK='delIt();'></span>"+
                        "<span class = 'glyphicon glyphicon-chevron-left pull-left' style = 'margin-left:10px;color:#2A6496' ONCLICK='delIt();'></span>"+
                        "<span style = 'margin-left:30px'>Selected</span>"+ 
                        "<button class ='btn btn-success btn-sm' style = 'margin-left:130px;width:20%' ONCLICK='submitIt(1)'>Submit</button>"+                 
                    "</div>"+
                    // All facilities area
                    "<div id = 'all_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                        //border:2px solid #2A6496
                        // Search for filtering purposes
                        "<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input><br>"+
                        "<select NAME='SelectList' ID='SelectList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                        "</select>"+
                    "</div>"+
                    
                    // selected area
                    "<form id = 'facilities_to_insert'>"+
                    "<div id = 'selected_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                        "<div id = 'search_field'><input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input></div>"+
                        "<select NAME='PickList' ID='PickList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                        "</select>"+
                    "</div>"+
                    "</form>";
        // Append
        $('div#facilities').html(data);

        // Fetch facilities and display in the picklist
        var url = "db/fetch/get_facilities.php";
        $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");      
        $.getJSON
        (
            url,
            {id:"",type:1},
            function(received)
            {
                for(var j=0; j<received.length;j++)
                {
                    $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");    
                    $("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("select#SelectList");
                }
                $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
            }
        );
    }
    /*End CENTRAL STORES*/
    /*-------------------------------------------------------------------------------------------------------------------------*/

    /*SATELLITE SITES*/
    else if(type == 2)
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:0px'> SATELLITE SITES (Have Central Stores as their parent)<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt'>NOTE: Use DHIS2 Organization Units to sort and drill down</span></span>");
                    
                    // Select Central Store which ones the satellites
        var data = "<span class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;color:blue;'>"+
                        "Central Store: The store selected is the parent to the satellite sites"+
                    "</span>"+
                    // Available Header
                    "<div class='panel-heading' style = 'height:5%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initIt();'>"+
                        "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='javascript:classifyFacilities(2)'>Reset</button>"+
                        "<span style = 'margin-left:100px'>Available</span>"+
                        "<span class = 'glyphicon glyphicon-forward pull-right' style = 'color:#2A6496' ONCLICK='addCs();'></span>"+
                        "<span class = 'glyphicon glyphicon-chevron-right pull-right' style = 'margin-right:10px;color:#2A6496' ONCLICK='addCs();'></span>"+
                    "</div>"+
                   // Selected header
                   "<div class='panel-heading' style = 'height:5%;width:40%;margin-bottom:5px'>"+                           
                        "<span class = 'glyphicon glyphicon-backward pull-left' style = 'color:#2A6496' ONCLICK='delCs();'></span>"+
                        "<span class = 'glyphicon glyphicon-chevron-left pull-left' style = 'margin-left:10px;color:#2A6496' ONCLICK='delCs();'></span>"+
                        "<span style = 'margin-left:30px'>Selected</span>"+ 
                        "<button class ='btn btn-success btn-sm' style = 'margin-left:130px;width:20%' ONCLICK='submitIt(2)'>Submit</button>"+                 
                    "</div>"+
                    // All facilities area
                    "<div id = 'all_central_stores' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                        //border:2px solid #2A6496
                        // Search for filtering purposes
                        "<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input><br>"+
                        "<select NAME='CSSelectList' ID='CSSelectList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:150px'>"+
                        "</select>"+
                    "</div>"+
                    
                    // selected area
                    "<div id = 'selected_central_store' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                        "<div id = 'cs_search_field'><input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input></div>"+
                        "<select NAME='CSPickList' ID='CSPickList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:150px'>"+
                        "</select>"+
                    "</div>"+
                    /*End Central Store*/

                    /*SATELLITE SITES FOR THE ABOVE CENTRAL STORE*/
                    // Available Header
                    "<span class='panel-heading' style = 'height:5%;width:81%;margin-bottom:5px;color:brown;'>"+
                        "Satellite Sites: Have the Central Store above as their parent"+
                    "</span>"+
                    "<div class='panel-heading' style = 'height:5%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initIt();'>"+
                        // "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='javascript:classifyFacilities(2)'>Reset</button>"+
                        "<span style = 'margin-left:100px'>Available</span>"+
                        "<span class = 'glyphicon glyphicon-forward pull-right' style = 'color:#2A6496' ONCLICK='addIt();'></span>"+
                        "<span class = 'glyphicon glyphicon-chevron-right pull-right' style = 'margin-right:10px;color:#2A6496' ONCLICK='addIt();'></span>"+
                    "</div>"+
                   // Selected header
                   "<div class='panel-heading' style = 'height:5%;width:40%;margin-bottom:5px'>"+                           
                        "<span class = 'glyphicon glyphicon-backward pull-left' style = 'color:#2A6496' ONCLICK='delIt();'></span>"+
                        "<span class = 'glyphicon glyphicon-chevron-left pull-left' style = 'margin-left:10px;color:#2A6496' ONCLICK='delIt();'></span>"+
                        "<span style = 'margin-left:30px'>Selected</span>"+ 
                        // "<button class ='btn btn-success btn-sm' style = 'margin-left:130px;width:20%' ONCLICK='submitIt(3)'>Submit</button>"+                 
                    "</div>"+
                    // All facilities area
                    "<div id = 'all_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                        //border:2px solid #2A6496
                        // Search for filtering purposes
                        "<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input><br>"+
                        "<select NAME='SelectList' ID='SelectList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                        "</select>"+
                    "</div>"+
                    
                    // selected area
                    "<div id = 'selected_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                        "<div id = 'search_field'><input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input></div>"+
                        "<select NAME='PickList' ID='PickList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                        "</select>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);
        // Fetch Central Stores and display in the Central Stores picklist
        var cs_url = "db/fetch/get_central_stores.php";
        $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");         
        $.getJSON
        (
            cs_url,
            function(returned)
            {
                for(var j=0; j<returned.length;j++)
                {
                    $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");   
                    $("<option VALUE='"+returned[j].facility_id+"'>"+returned[j].facility_name+"</option>").appendTo("select#CSSelectList");
                }
                //$('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
            }
        );

        // Fetch facilities and display in the picklist
        var url = "db/fetch/get_facilities.php";
        $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");         
        $.getJSON
        (
            url,
            {id:"",type:1},
            function(received)
            {
                for(var j=0; j<received.length;j++)
                {
                    $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");    
                    $("<option VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("select#SelectList");
                }
                $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
            }
        );
    }
    /*END SATELLITE SITES*/
    /*--------------------------------------------------------------------------------------------------------------------------------*/

    /*STAND ALONES*/
    else if(type == 3)
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:0px'> STAND ALONE SITES<br><span id = 'note' style ='color:blue;font-weight:normal;font-size:10pt'>NOTE: Use DHIS2 Organization Units to sort and drill down</span></span>");

        var data = "<div class='panel-heading' style = 'height:5%;width:40%;margin-right:10px;margin-bottom:5px' onLoad='initIt();'>"+
                        "<button class ='btn btn-info btn-sm' style = 'margin-left:px;width:20%' onclick='javascript:classifyFacilities(3)'>Reset</button>"+
                        "<span style = 'margin-left:100px'>Available</span>"+
                        "<span class = 'glyphicon glyphicon-forward pull-right' style = 'color:#2A6496' ONCLICK='addIt();'></span>"+
                        "<span class = 'glyphicon glyphicon-chevron-right pull-right' style = 'margin-right:10px;color:#2A6496' ONCLICK='addIt();'></span>"+
                    "</div>"+
                   // Selected header
                   "<div class='panel-heading' style = 'height:5%;width:40%;margin-bottom:5px'>"+                           
                        "<span class = 'glyphicon glyphicon-backward pull-left' style = 'color:#2A6496' ONCLICK='delIt();'></span>"+
                        "<span class = 'glyphicon glyphicon-chevron-left pull-left' style = 'margin-left:10px;color:#2A6496' ONCLICK='delIt();'></span>"+
                        "<span style = 'margin-left:30px'>Selected</span>"+ 
                        "<button class ='btn btn-success btn-sm' style = 'margin-left:130px;width:20%' ONCLICK='submitIt(3)'>Submit</button>"+                 
                    "</div>"+
                    // All facilities area
                    "<div id = 'all_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                        //border:2px solid #2A6496
                        // Search for filtering purposes
                        "<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input><br>"+
                        "<select NAME='SelectList' ID='SelectList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                        "</select>"+
                    "</div>"+
                    
                    // selected area
                    "<form id = 'facilities_to_insert'>"+
                    "<div id = 'selected_facilities' class='panel-heading' style = 'height:auto;width:40%;background-color:white;margin-right:10px;font-size:8pt;'>"+
                        "<div id = 'search_field'><input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input></div>"+
                        "<select NAME='PickList' ID='PickList' SIZE='10' multiple='multiple' style = 'width:100%;min-height:270px'>"+
                        "</select>"+
                    "</div>"+
                    "</form>";
        // Append
        $('div#facilities').html(data);

        // Fetch facilities and display in the picklist
        var url = "db/fetch/get_facilities.php";
        $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");          
        $.getJSON
        (
            url,
            {id:"",type:1},
            function(received)
            {
                for(var j=0; j<received.length;j++)
                {
                    $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");  
                    $("<option id = 'options' VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("select#SelectList");
                }
                $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
            }
        );

    }
    /*END STAND ALONES*/
    /*--------------------------------------------------------------------------------------------------------------------------------------*/

    else
    {

    }
}
/*End Function*/
/*--------------------------------------------------------------------------------------------------------------------------------*/

/*Function updateSelectList()*/
//Use the DHIS2 Org Units to drill the list down
function updateSelectList(level,unit_id)
{
    var url = "db/fetch/get_facilities.php";
    $('span#note').html("<span class ='fa fa-exclamation-triangle'></span> Loading <img src='assets/img/ajax-loader-3.gif'>");       
    $.getJSON
    (
        url,
        {id:unit_id,type:level},
        function(received)
        {
            $("select#SelectList").empty();
            for(var j=0; j<received.length;j++)
            {
                //alert(received[j].facility_name);
                $("<option id = 'options' VALUE='"+received[j].facility_id+"'>"+received[j].facility_name+"</option>").appendTo("select#SelectList");
            }
            $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
        }
    );
 
}
/*End Function*/
/*--------------------------------------------------------------------------------------------------------------------------------*/
//PICKLIST

// PickList script
// Control flags for list selection and sort sequence
// Sequence is on option value (first 2 chars - can be stripped off in form processing)
// It is assumed that the select list is in sort sequence initially
var singleSelect = true;  // Allows an item to be selected once only
var sortSelect = true;  // Only effective if above flag set to true
var sortPick = true;  // Will order the picklist in sort sequence

// Initialise - invoked on load
function initIt() 
{
  var selectList = document.getElementById("SelectList");
  var selectOptions = selectList.options;
  var selectIndex = selectList.selectedIndex;
  var pickList = document.getElementById("PickList");
  var pickOptions = pickList.options;
  pickOptions[0] = null;  // Remove initial entry from picklist (was only used to set default width)
  if (!(selectIndex > -1)) 
  {
    selectOptions[0].selected = true;  // Set first selected on load
    selectOptions[0].defaultSelected = true;  // In case of reset/reload
  }
  selectList.focus();  // Set focus on the selectlist
}

// Adds a selected item into the picklist
function addIt() 
{
  var selectList = document.getElementById("SelectList");
  var selectIndex = selectList.selectedIndex;
  var selectOptions = selectList.options;
  var pickList = document.getElementById("PickList");
  var pickOptions = pickList.options;
  var pickOLength = pickOptions.length;
  // An item must be selected
  while (selectIndex > -1) 
  {
    pickOptions[pickOLength] = new Option(selectList[selectIndex].text);
    pickOptions[pickOLength].value = selectList[selectIndex].value;
    // If single selection, remove the item from the select list
    if (singleSelect) 
    {
      selectOptions[selectIndex] = null;
    }
    if (sortPick) 
    {
      var tempText;
      var tempValue;
      // Sort the pick list
      while (pickOLength > 0 && pickOptions[pickOLength].value < pickOptions[pickOLength-1].value) {
        tempText = pickOptions[pickOLength-1].text;
        tempValue = pickOptions[pickOLength-1].value;
        pickOptions[pickOLength-1].text = pickOptions[pickOLength].text;
        pickOptions[pickOLength-1].value = pickOptions[pickOLength].value;
        pickOptions[pickOLength].text = tempText;
        pickOptions[pickOLength].value = tempValue;
        pickOLength = pickOLength - 1;
      }
    }
    selectIndex = selectList.selectedIndex;
    pickOLength = pickOptions.length;
    $('div#search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
  }
  selectOptions[0].selected = true;
}

// Adds a selected item into the Central Store picklist
function addCs() 
{
  var selectList = document.getElementById("CSSelectList");
  var selectIndex = selectList.selectedIndex;
  var selectOptions = selectList.options;
  var pickList = document.getElementById("CSPickList");
  var pickOptions = pickList.options;
  var pickOLength = pickOptions.length;
  // An item must be selected
  while (selectIndex > -1) 
  {
    pickOptions[pickOLength] = new Option(selectList[selectIndex].text);
    pickOptions[pickOLength].value = selectList[selectIndex].value;
    // If single selection, remove the item from the select list
    if (singleSelect) 
    {
      selectOptions[selectIndex] = null;
    }
    if (sortPick) 
    {
      var tempText;
      var tempValue;
      // Sort the pick list
      while (pickOLength > 0 && pickOptions[pickOLength].value < pickOptions[pickOLength-1].value) 
      {
        tempText = pickOptions[pickOLength-1].text;
        tempValue = pickOptions[pickOLength-1].value;
        pickOptions[pickOLength-1].text = pickOptions[pickOLength].text;
        pickOptions[pickOLength-1].value = pickOptions[pickOLength].value;
        pickOptions[pickOLength].text = tempText;
        pickOptions[pickOLength].value = tempValue;
        pickOLength = pickOLength - 1;
      }
    }
    selectIndex = selectList.selectedIndex;
    pickOLength = pickOptions.length;
    $('div#search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
  }
  selectOptions[0].selected = true;
}

// Deletes an item from the picklist
function delIt() 
{
  var selectList = document.getElementById("SelectList");
  var selectOptions = selectList.options;
  var selectOLength = selectOptions.length;
  var pickList = document.getElementById("PickList");
  var pickIndex = pickList.selectedIndex;
  var pickOptions = pickList.options;
  while (pickIndex > -1) 
  {
    // If single selection, replace the item in the select list
    if (singleSelect) 
    {
      selectOptions[selectOLength] = new Option(pickList[pickIndex].text);
      selectOptions[selectOLength].value = pickList[pickIndex].value;
    }
    pickOptions[pickIndex] = null;
    if (singleSelect && sortSelect) 
    {
      var tempText;
      var tempValue;
      // Re-sort the select list
      while (selectOLength > 0 && selectOptions[selectOLength].value < selectOptions[selectOLength-1].value) 
      {
        tempText = selectOptions[selectOLength-1].text;
        tempValue = selectOptions[selectOLength-1].value;
        selectOptions[selectOLength-1].text = selectOptions[selectOLength].text;
        selectOptions[selectOLength-1].value = selectOptions[selectOLength].value;
        selectOptions[selectOLength].text = tempText;
        selectOptions[selectOLength].value = tempValue;
        selectOLength = selectOLength - 1;
      }
    }
    pickIndex = pickList.selectedIndex;
    selectOLength = selectOptions.length;
  }
}

// Deletes an item from the Central Store picklist
function delCs() 
{
  var selectList = document.getElementById("CSSelectList");
  var selectOptions = selectList.options;
  var selectOLength = selectOptions.length;
  var pickList = document.getElementById("CSPickList");
  var pickIndex = pickList.selectedIndex;
  var pickOptions = pickList.options;
  while (pickIndex > -1) 
  {
    // If single selection, replace the item in the select list
    if (singleSelect) 
    {
      selectOptions[selectOLength] = new Option(pickList[pickIndex].text);
      selectOptions[selectOLength].value = pickList[pickIndex].value;
    }
    pickOptions[pickIndex] = null;
    if (singleSelect && sortSelect) 
    {
      var tempText;
      var tempValue;
      // Re-sort the select list
      while (selectOLength > 0 && selectOptions[selectOLength].value < selectOptions[selectOLength-1].value) 
      {
        tempText = selectOptions[selectOLength-1].text;
        tempValue = selectOptions[selectOLength-1].value;
        selectOptions[selectOLength-1].text = selectOptions[selectOLength].text;
        selectOptions[selectOLength-1].value = selectOptions[selectOLength].value;
        selectOptions[selectOLength].text = tempText;
        selectOptions[selectOLength].value = tempValue;
        selectOLength = selectOLength - 1;
      }
    }
    pickIndex = pickList.selectedIndex;
    selectOLength = selectOptions.length;
  }
}
/*--------------------------------------------------------------------------------------------------------------------------------*/

/*
    Function submitIt(btn) 
    1 - Central Sites
    2 - Satellite Sites
    3 - Stand Alone Sites
*/

// Selection - invoked on submit
function submitIt(btn) 
{
  var pickList = document.getElementById("PickList");
  var pickOptions = pickList.options;
  var pickOLength = pickOptions.length;

  if(btn==2)
  {
      // Central Store picklist
      var CSpickList = document.getElementById("CSPickList");
      var CSpickOptions = CSpickList.options;
      var CSpickOLength = CSpickOptions.length;

      if (CSpickOLength < 1) 
      {
        $('div#cs_search_field').html("<span class = 'fa fa-ok' style = 'color:red;font-size:8pt'>No Central Store has been selected. \nPlease add facilities from the Available list by selecting the facility and clicking the [>] button</span>");
        //alert("No Selections in the Picklist\nPlease Select using the [->] button");
        return false;
      }
      else
      {
        $('div#cs_search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
        if (pickOLength < 1) 
        {
            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;font-size:8pt'>No facilities selected. \nPlease add facilities from the Available list by selecting the facility and clicking the [>] button</span>");
            //alert("No Selections in the Picklist\nPlease Select using the [->] button");
            return false;
        }
        else
        {
            $('div#search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
        }
      }
  }

  else
  {
    $('div#cs_search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
    if (pickOLength < 1) 
    {
        $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;font-size:8pt'>No facilities selected. \nPlease add facilities from the Available list by selecting the facility and clicking the [>] button</span>");
        //alert("No Selections in the Picklist\nPlease Select using the [->] button");
        return false;
    }
    else
    {
        $('div#search_field').html("<input placeholder = 'Search' style = 'width:100%;margin-bottom:3px'></input>");
    }
  }

  for (var i = 0; i < pickOLength; i++) 
  {
    pickOptions[i].selected = true;
    //selectOptions[selectOLength-1].value
    //alert(pickOptions[i].value);

    if(btn == 1)
    {
        $.ajax
        (
            { 
                type: "POST",   
                     url: "db/insertion/insert_stores.php",   
                     async: false,
                     data:{data:pickOptions[i].value,type:"Central Store"},
                     success:function(result)
                     {
                        if(result == -1)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>An error occured. Reset and try again<br><br></span>");
                        }
                        else if(result == 0)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:green;'>Central stores inserted<br><br></span>");
                        }

                        else if(result == 1)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Store exists<br><br></span>");
                        }
                        else if(result == 10)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Facility exists as a Stand Alone Site<br><br></span>");
                        }


                     }
            }
        );

    }

    else if(btn == 2)
    {
        $.ajax
        (
            { 
                type: "POST",   
                     url: "db/insertion/insert_stores.php",   
                     async: false,
                     data:{data:pickOptions[i].value,central:CSpickOptions[0].value,type:"Satellite Site"},
                     success:function(result)
                     {
                        if(result == -1)
                        {
                            $('div#cs_search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>An error occured. Reset and try again<br><br></span>");
                        }
                        else if(result == 0)
                        {
                            $('div#cs_search_field').html("<span class = 'fa fa-ok' style = 'color:green;'>Satellite Sites inserted<br><br></span>");
                        }

                        else if(result == 1)
                        {
                            $('div#cs_search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Satelite Site exists<br><br></span>");
                        }
                        else if(result == 10)
                        {
                            $('div#cs_search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Selected Satelite Site exists as a Stand Alone Site<br><br></span>");
                        }


                     }
            }
        );

    }

    else if(btn == 3)
    {
        $.ajax
        (
            { 
                type: "POST",   
                     url: "db/insertion/insert_stores.php",   
                     async: false,
                     data:{data:pickOptions[i].value,type:"Stand Alone"},
                     success:function(result)
                     {
                        if(result == -1)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>An error occured. Reset and try again<br><br></span>");
                        }
                        else if(result == 0)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:green;'>Stand alone site inserted<br><br></span>");
                            //delIt();
                        }

                        else if(result == 1)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Store exists<br><br></span>");
                        }

                        else if(result == 10)
                        {
                            $('div#search_field').html("<span class = 'fa fa-ok' style = 'color:red;'>Facility exists as a central store<br><br></span>");
                        }


                     }
            }
        );

    }
  }
  return true;
}
/*-----------------------------------------------------------------------------------------------------------------------------------------------*/
/*function getReports(2)*/
function getReports(type)
{
    if(type == 1)
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:0px'> Supply Pipeline Hierarchy</span></span>");
                    //Central Stores 
        var data = "<div class='panel panel-default' style = 'width:40%'>"+
                        "<div class='panel-heading'> "+                               
                            "<h3 class='panel-title'>Central Stores</h3> "+                             
                        "</div>"+
                        "<div class='panel-body' id = 'central_stores'>"+
                        "</div>"+
                    "</div>"+

                    //Stand Alone sites
                    "<div class='panel panel-default' style = 'width:40%;margin-left:10px'>"+
                        "<div class='panel-heading'> "+                               
                            "<h3 class='panel-title'>Stand Alone Sites</h3> "+                             
                        "</div>"+
                        "<div class='panel-body' id = 'standalone_sites'>"+
                        "</div>"+
                    "</div>"+

                    //Satellite sites
                    "<div class='panel panel-default' style = 'width:40%;margin-left:10px'>"+
                        "<div class='panel-heading'> "+                               
                            "<h3 class='panel-title'>All Satellite Sites</h3> "+                             
                        "</div>"+
                        "<div class='panel-body' id = 'satellite_sites'>"+
                        "</div>"+
                    "</div>";
        // Append
        $('div#facilities').html(data);

        //Fetch Central Stores
        var centralstores_url = "db/fetch/get_central_stores.php";
        $.getJSON
        (
            centralstores_url,
            function(received)
            {
                for(var j=0; j<received.length;j++)
                {
                    // $('span#note').html("Loading <img src='assets/img/ajax-loader-3.gif'>");
                    //VALUE='"+received[j].facility_id+"' 
                    var toAppend = "<div style='color:#23527C;font-size:8pt' id='central_accordion'>"+
                                        "<a data-toggle='collapse' data-parent='#"+received[j].facility_id+"' href='#"+received[j].facility_id+"'>"+
                                            "<span class='glyphicon glyphicon-plus-sign'></span> "+
                                        "</a>"+
                                        "<span class = 'fa fa-folder-o unclickedColor' onclick ='javascript:getReports(2)'> "+received[j].facility_name+"</span>"+                                            
                                    "</div>"+
                                    "<div id='"+received[j].facility_id+"' class='panel-collapse collapse'>"+
                                        "<div class='panel-body' id = 'satellite_sites_area'>"+
                                        "</div>"+
                                    "</div>";
                    $(toAppend).appendTo("div#central_stores");

                    //Fetch Satellite Sites for the current Central Store
                    var satellite_url = "db/fetch/get_satellite_sites.php";
                    $.getJSON
                    (
                        satellite_url,
                        {central_id:received[j].facility_id},
                        function(values)
                        {
                            for(var k=0; k<values.length;k++)
                            {  
                                var satellitesToAppend ="<div style='color:#23527C;font-size:8pt' onclick ='javascript:getReports(2)'>"+
                                                            values[k].facility_name+
                                                            "<span style = 'color:black'> [Satellite Site]</span>"+
                                                        "</div>";
                                $("div#satellite_sites_area").append(satellitesToAppend);
                            }  
                        }
                    );
                }
                // $('span#note').html("NOTE: Use DHIS2 Organization Units to sort and drill down");   
            }
        );

        //Fetch Stand Alone Sites
        var standalone_url = "db/fetch/get_standalone_sites.php";
        $.getJSON
        (
            standalone_url,
            // {id:"",type:1},
            function(received)
            {
                for(var j=0; j<received.length;j++)
                {  
                    var standalonesToAppend = "<div class = 'unclickedColor color' style='color:#23527C;font-size:8pt' onclick ='javascript:getReports(2)'>"+
                                                received[j].facility_name+
                                                "</div>";
                    $(standalonesToAppend).appendTo("div#standalone_sites");
                }  
            }
        );

        //Fetch All Satellite Sites
        var satellite_url = "db/fetch/get_all_satellite_sites.php";
        $.getJSON
        (
            satellite_url,
            function(get)
            {
                for(var i=0; i<get.length;i++)
                {  
                    var allSatellitesToAppend = "<div class = 'unclickedColor' style='color:#23527C;font-size:8pt' onclick ='javascript:getReports(2)'>"+
                                                    get[i].facility_name+
                                                    " <span style = 'color:black' id = 'satellite_parent' onclick = 'javascript:getReports(2)'></span>"+
                                                "</div>";
                    $(allSatellitesToAppend).appendTo("div#satellite_sites");
                }

                //Get the parent for the satellite site
                for(var i=0; i<get.length;i++)
                {
                   //Get Satellite site parent (Central store)
                    var parent_url = "db/fetch/central_store_name.php";
                    $.getJSON
                    ( 
                        parent_url,
                        {central_store_id:get[i].facility_id},
                        function(data) 
                        {
                            //alert(data[0].facility_name);
                            $('span#satellite_parent').html("[Parent: "+data[0].facility_name+"]");
                        }
                    );
                }  
            }
        );
    }

    else if(type == 2)
    {
        $('div#returned_messages').html("<span style = 'color:green;margin-left:0px'> MOH 729 FORM</span></span>");
        $('div#facilities').empty();
        var url = "http://test.hiskenya.org/api/dataSets/CcrrIEt35vP.jsonp?callback=?";
        $.getJSON( url, 
        function(data) 
        {
            //alert(data.dataEntryForm.htmlCode);
            $('div#facilities').html("<div style = 'width:50%'>"+data.dataEntryForm.htmlCode+"</div>");
        });
    }

}