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
                    <div class="panel panel-default">
                        <div class="panel-heading">                                
                            <h3 class="panel-title">DHIS2 Datasets</h3>                              
                        </div>

                        <div class="panel-body">
                            <table id= "entrydata" style = "border-radius:5px">                            
                                <thead>
                                    <tr>
                                        <td rowspan="3" style="width:186px;height:66px;">
                                        <p align="center">&nbsp;</p>

                                        <p align="center"><strong>Name</strong></p>
                                        </td>
                                        <td rowspan="2" style="width:35px;height:66px;">
                                        <p align="center"><strong>Unit Pack Size</strong></p>
                                        </td>
                                        <td style="width:98px;height:66px;">
                                        <p align="center"><strong>Beginning Balance</strong></p>
                                        </td>
                                        <td style="width:98px;height:66px;">
                                        <p align="center"><strong>Quantity Received this period</strong></p>
                                        </td>
                                        <td colspan="2" style="width:157px;height:66px;">
                                        <p align="center">Total Quantity Dispensed this period &nbsp;</p>
                                        </td>
                                        <td style="width:98px;height:66px;">
                                        <p align="center"><strong>Losses (Damages, Expiries, Missing)</strong></p>
                                        </td>
                                        <td colspan="2" rowspan="1" style="width:98px;height:66px;">
                                        <p align="center"><strong>Adjustments In Packs</strong></p>
                                        </td>
                                        <td style="width:98px;height:66px;">
                                        <p align="center"><strong>End of Month Physical Count</strong></p>
                                        </td>
                                        <td colspan="2" style="width:196px;height:66px;">
                                        <p align="center"><strong>Drugs with less than 6 months to expiry&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Central site / District store)</strong></p>
                                        </td>
                                        <td rowspan="2" style="width:98px;height:66px;">
                                        <p align="center"><b style="color: rgb(31, 73, 125); font-family: Calibri, sans-serif; font-size: 15px;">Days out of Stock this Month</b></p>
                                        </td>
                                        <td style="width:98px;height:66px;">
                                        <p align="center"><strong>Quantity required for RESUPPLY</strong></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width:98px;height:12px;">
                                        <p align="center"><strong>In Packs</strong></p>
                                        </td>
                                        <td style="width:98px;height:12px;">
                                        <p align="center"><strong>In Packs</strong></p>
                                        </td>
                                        <td style="width:76px;height:12px;">
                                        <p>In Units(tabs, caps, bottles for Liquids, etc)</p>
                                        </td>
                                        <td style="width:82px;height:12px;">
                                        <p align="center"><strong>In Packs</strong></p>
                                        </td>
                                        <td style="width:98px;height:12px;">
                                        <p align="center"><strong>In Packs</strong></p>
                                        </td>
                                        <td style="width:98px;height:12px;">
                                        <p align="center"><b>Positive</b></p>
                                        </td>
                                        <td style="width:98px;height:12px;"><strong>Negative</strong></td>
                                        <td style="width:98px;height:12px;">
                                        <p align="center"><strong>In Packs</strong></p>
                                        </td>
                                        <td style="width:98px;height:12px;">
                                        <p align="center"><strong>Quantity</strong></p>
                                        </td>
                                        <td style="width:98px;height:12px;">
                                        <p align="center"><strong>Expiry Date</strong></p>
                                        </td>
                                        <td style="width:98px;height:12px;">
                                        <p align="center"><strong>In Packs</strong></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="width:35px;height:20px;">&nbsp;</td>
                                        <td style="width:98px;height:20px;">
                                        <p align="center"><strong>A</strong></p>
                                        </td>
                                        <td style="width:98px;height:20px;">
                                        <p align="center"><strong>B</strong></p>
                                        </td>
                                        <td style="width:76px;height:20px;">C</td>
                                        <td style="width:82px;height:20px;">
                                        <p align="center"><b>D</b></p>
                                        </td>
                                        <td style="width:98px;height:20px;">
                                        <p align="center"><strong>E</strong></p>
                                        </td>
                                        <td style="width:98px;height:20px;">
                                        <p align="center"><strong>F</strong></p>
                                        </td>
                                        <td style="width:98px;height:20px;"><strong>G</strong></td>
                                        <td style="width:98px;height:20px;">
                                        <p align="center"><strong>H</strong></p>
                                        </td>
                                        <td style="width:98px;height:20px;">
                                        <p align="center"><strong>I</strong></p>
                                        </td>
                                        <td style="width:98px;height:20px;">
                                        <p align="center"><strong>J</strong></p>
                                        </td>
                                        <td style="width:98px;height:20px;">
                                        <p align="center"><strong>K</strong></p>
                                        </td>
                                        <td style="width:98px;height:20px;">
                                        <p align="center"><strong>L</strong></p>
                                        </td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <!-- Include footer page -->
    <?php include "client/templates/footer.php";?> 