    <!-- Include header page -->
    <?php include "client/templates/header.php";?>

    <!-- This pages content -->
    <div class = "row">

        <!-- Include default navigation -->
        <?php require "client/templates/navigation.php";?>

        <div class = "col-md-8" style = "margin-left:2px;margin-top:-10px;border-radius:5px;">
            
            <div class="panel panel-default" style = "background-color:white;min-height:600px">
                <div class="panel-heading" style = "width:100%;height:50px;margin-bottom:30px">                                
                    <!-- <div class="btn btn-default btn-md pull-left" style = "margin-right:30px;">UPDATE</div>  -->
                    <span>SUPPLY CHAIN HIERARCHY</span>
                                              
                </div>
                <div class="panel-heading" id = "returned_messages" style = "height:50px;width:90%;margin-left:30px;color:blue">User Guide</div>

                <!-- Append facilities here -->
                <div class="row panel-body" id = "facilities" style = "margin-left:20px">
                    <?php require "client/templates/userguide.php";?>
                </div>
            </div>
        </div>

    <!-- Include footer page -->
    <?php include "client/templates/footer.php";?> 