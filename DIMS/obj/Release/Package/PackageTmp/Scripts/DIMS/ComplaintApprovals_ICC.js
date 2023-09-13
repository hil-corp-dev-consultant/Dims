DIMS.controller('ComplaintPendingApprovalCtrl_ICC', function ($scope, $location, $compile, DIMSFactory, $http) {
    $scope.templatesettings = { HeaderTitle: "Complaint Pending Approval" };

    angular.element(document).ready(function () {


        HideLoader();

        try {

            ShowLoader();

            $.ajax({
                type: 'POST',
                url: '../../ComplaintRegistrationICC/FillCMSStateFilter',
                async: true,
                success: function (response) {
                    $("#StateFilter_ICC").empty();

                    if (response == "") {
                    }
                    else {
                        response = JSON.parse(response);

                        var UserType = $("#SessionUserTypeID_ICC").val();

                        var option = "";


                        if (UserType == "CSM" || UserType == "QH" || UserType == "CSM_BU2" || UserType == "CSM_BU3") {
                            option = $('<option></option>').attr("value", "ALL").text("ALL");
                            $("#StateFilter_ICC").append(option);
                        }


                        for (var i = 0; i < response.length; i++) {
                            option = $('<option></option>').attr("value", response[i]["STATE_CODE"]).text(response[i]["STATE_DESC"]);
                            $("#StateFilter_ICC").append(option);
                        }

                        var CMSState_ICC = $("#CMSState_ICC").val();

                        if (CMSState_ICC == "" || typeof CMSState_ICC == "undefined") {
                            $("#StateFilter_ICC").val(response[0]["STATE_CODE"]);
                            $("#CMSState_ICC").val(response[0]["STATE_CODE"]);
                        }
                        else {
                            $("#StateFilter_ICC").val(CMSState_ICC);
                        }


                        var CMSState_ICC = $("#StateFilter_ICC").val();
                        AssnState = CMSState_ICC;
                        HideLoader();
                        DIMSFactory.getMasterClickData_ICC("listComplaintpendingApprovals_ICC$" + AssnState).success(function (response) {

                            var obj = JSON.parse(response.tabledata);
                            tcount = obj.length;
                            var TableRow = "";
                            $("#pendingApprovalsList_ICC").dataTable().fnDestroy();
                            $("#pendingApprovalsList_ICC tbody").empty();

                            var SessionUserCode_ICC = $("#SessionUserCode_ICC").val();

                            for (var i = 0; i < tcount; i++) {

                                TableRow = TableRow + "<tr style='cursor:pointer;' id='PendingAppr_" + i + "' ng-click='GotoApprovalApplication_ICC(obj,$event)'>";
                                TableRow = TableRow + "<td>" + obj[i]["Doc Code"] + "</td>";
                                TableRow = TableRow + "<td>" + obj[i]["Doc No"] + "</td>";
                                //TableRow = TableRow + "<td>" + obj[i]["Complaint Id"] + "</td>";
                                TableRow = TableRow + "<td>" + obj[i]["Complaint No"] + "</td>";
                                TableRow = TableRow + "<td>" + obj[i]["STATE_DESC"] + "</td>";
                                //TableRow = TableRow + "<td>" + obj[i]["Doc Series Code"] + "</td>";
                                TableRow = TableRow + "<td>" + obj[i]["Originated On"] + "</td>";
                                TableRow = TableRow + "<td>" + obj[i]["Originator"] + "</td>";

                                // TableRow = TableRow + "<td>" + obj[i]["Doc Status"] + "</td>";
                                //TableRow = TableRow + "<td>" + obj[i]["Complaint Management Id"] + "</td>";
                                TableRow = TableRow + "</tr>";

                                //TableRow = TableRow + "<tr style='cursor:pointer;' id='PendingAppr_" + i + "' ng-click='GotoApprovalApplication_ICC(obj,$event)'>";
                                //TableRow = TableRow + "<td>" + obj[i]["Doc Code"] + "</td>";
                                //TableRow = TableRow + "<td>" + obj[i]["Doc No"] + "</td>";
                                //TableRow = TableRow + "<td>" + obj[i]["Complaint Id"] + "</td>";
                                //TableRow = TableRow + "<td>" + obj[i]["Complaint No"] + "</td>";
                                //TableRow = TableRow + "<td>" + obj[i]["Doc Series Code"] + "</td>";
                                //TableRow = TableRow + "<td>" + obj[i]["Originator"] + "</td>";
                                //TableRow = TableRow + "<td>" + obj[i]["Originated On"] + "</td>";
                                //TableRow = TableRow + "<td>" + obj[i]["Doc Status"] + "</td>";
                                //TableRow = TableRow + "<td>" + obj[i]["Complaint Management Id"] + "</td>";
                                //TableRow = TableRow + "</tr>";




                                ////SessionUserCode_ICC   HardCoded Permission Given By Mr.Akbar (50001049)
                                //if (SessionUserCode_ICC == "50000985") {

                                //    if (obj[i]["Doc Code"] == "Compensation_ICC") {
                                //        TableRow = TableRow + "<tr style='cursor:pointer;' id='PendingAppr_" + i + "' ng-click='GotoApprovalApplication_ICC(obj,$event)'>";
                                //        TableRow = TableRow + "<td>" + obj[i]["Doc Code"] + "</td>";
                                //        TableRow = TableRow + "<td>" + obj[i]["Doc No"] + "</td>";
                                //        TableRow = TableRow + "<td>" + obj[i]["Complaint Id"] + "</td>";
                                //        TableRow = TableRow + "<td>" + obj[i]["Complaint No"] + "</td>";
                                //        TableRow = TableRow + "<td>" + obj[i]["Doc Series Code"] + "</td>";
                                //        TableRow = TableRow + "<td>" + obj[i]["Originator"] + "</td>";
                                //        TableRow = TableRow + "<td>" + obj[i]["Originated On"] + "</td>";
                                //        TableRow = TableRow + "<td>" + obj[i]["Doc Status"] + "</td>";
                                //        TableRow = TableRow + "<td>" + obj[i]["Complaint Management Id"] + "</td>";
                                //        TableRow = TableRow + "</tr>";
                                //    }
                                //}

                                //    //SessionUserCode_ICC   HardCoded Permission Given By Mr.Akbar (50001049)
                                //else if (SessionUserCode_ICC == "50002213") {
                                //    if (obj[i]["Originator"] == "KAM" || obj[i]["Originator"] == "50002304") {
                                //        if (obj[i]["Doc Code"] == "Compensation_ICC") {

                                //        }
                                //        else {
                                //            TableRow = TableRow + "<tr style='cursor:pointer;' id='PendingAppr_" + i + "' ng-click='GotoApprovalApplication_ICC(obj,$event)'>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Doc Code"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Doc No"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Complaint Id"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Complaint No"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Doc Series Code"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Originator"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Originated On"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Doc Status"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Complaint Management Id"] + "</td>";
                                //            TableRow = TableRow + "</tr>";
                                //        }
                                //    }
                                //    else {
                                //    }
                                //}

                                //    //SessionUserCode_ICC   HardCoded Permission Given By Mr.Akbar (50001049)
                                //else if (SessionUserCode_ICC == "50001049" || SessionUserCode_ICC == "50001048") {
                                //    if (obj[i]["Originator"] == "KAM") {
                                //    }
                                //    else {
                                //        if (obj[i]["Doc Code"] == "Compensation_ICC") {

                                //        }
                                //        else {
                                //            TableRow = TableRow + "<tr style='cursor:pointer;' id='PendingAppr_" + i + "' ng-click='GotoApprovalApplication_ICC(obj,$event)'>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Doc Code"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Doc No"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Complaint Id"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Complaint No"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Doc Series Code"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Originator"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Originated On"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Doc Status"] + "</td>";
                                //            TableRow = TableRow + "<td>" + obj[i]["Complaint Management Id"] + "</td>";
                                //            TableRow = TableRow + "</tr>";
                                //        }
                                //    }
                                //}


                            }

                            var html = $compile(TableRow)($scope);
                            var el = angular.element($("#pendingApprovalsList_ICC tbody"));
                            el.append(html);
                            $compile(html)($scope);

                            //$('#pendingApprovalsList_ICC tbody').append(TableRow);
                            var table = $("#pendingApprovalsList_ICC").dataTable({
                                "bDestroy": true,
                                //scrollY: "200px",
                                //scrollX: true,
                                scrollCollapse: true,
                                paging: true
                                //fixedColumns: {
                                //    leftColumns: 0
                                //},
                            });

                            $(".dataTables_scrollHeadInner").css({ "width": "100%" });
                            $(".table ").css({ "width": "100%" });

                            HideLoader();

                        });



                    }

                    HideLoader();

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr + "\n" + ajaxOptions + "\n" + thrownError);

                    alert(json.stringify(xhr) + "\n" + json.stringify(ajaxOptions) + "\n" + json.stringify(thrownError));
                    HideLoader();

                }
            });
            HideLoader();

        }
        catch (e) {
            alert("ComplaintPendingApprovalCtrl_ICC + " + e);
            HideLoader();

        }

        HideLoader();
    });

    $scope.StateChange_ICC = function () {
        AssnState = $("#StateFilter_ICC").val();
        DIMSFactory.getMasterClickData_ICC("listComplaintpendingApprovals_ICC$" + AssnState).success(function (response) {

            var obj = JSON.parse(response.tabledata);
            tcount = obj.length;
            var TableRow = "";

            if (AssnState == "ALL") { }
            else {
                $("#CMSState_ICC").val(AssnState);
            }

            $("#pendingApprovalsList_ICC").DataTable().clear().draw();
            $("#pendingApprovalsList_ICC").DataTable().destroy();
            // $("#pendingApprovalsList_ICC").dataTable().fnDestroy();


            var SessionUserCode_ICC = $("#SessionUserCode_ICC").val();

            for (var i = 0; i < tcount; i++) {
                TableRow = TableRow + "<tr style='cursor:pointer;' id='PendingAppr_" + i + "' ng-click='GotoApprovalApplication_ICC(obj,$event)'>";
                TableRow = TableRow + "<td>" + obj[i]["Doc Code"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["Doc No"] + "</td>";
                //TableRow = TableRow + "<td>" + obj[i]["Complaint Id"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["Complaint No"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["STATE_DESC"] + "</td>";
                //TableRow = TableRow + "<td>" + obj[i]["Doc Series Code"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["Originated On"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["Originator"] + "</td>";

                // TableRow = TableRow + "<td>" + obj[i]["Doc Status"] + "</td>";
                //TableRow = TableRow + "<td>" + obj[i]["Complaint Management Id"] + "</td>";
                TableRow = TableRow + "</tr>";
            }
            $("#pendingApprovalsList_ICC tbody").empty();
            var html = $compile(TableRow)($scope);
            var el = angular.element($("#pendingApprovalsList_ICC tbody"));
            el.append(html);
            $compile(html)($scope);

            //$('#pendingApprovalsList_ICC tbody').append(TableRow);
            var table = $("#pendingApprovalsList_ICC").dataTable({
                "bDestroy": true,
                //scrollY: "200px",
                //scrollX: true,
                scrollCollapse: true,
                paging: true
                //fixedColumns: {
                //    leftColumns: 0
                //},
            });
        });
    }

    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);

    };


    $scope.GotoApprovalApplication_ICC = function (obj, $event) {
        var id = $($event.target).parent().attr("id");
        var Appl = $("#pendingApprovalsList_ICC tbody #" + id + " td")[0].innerHTML;
        var Cmpl_Mngmt_Id = $("#pendingApprovalsList_ICC tbody #" + id + " td")[1].innerHTML;
        $("#HiddenForCMS").val("FromPendingAppr");
        if (Appl == "Complaint Registration") {
            $scope.go("Registration_ICC/" + Cmpl_Mngmt_Id);
        }
        else if (Appl == "Corrective Measures") { PendingApprCmplType = "Corrective Measures"; $scope.go("CorrectiveMeasure/" + Cmpl_Mngmt_Id); }
        else if (Appl == "Compensation") { PendingApprCmplType = "Compensation_ICC"; $scope.go("Compensation_ICC/" + Cmpl_Mngmt_Id); }
        else if (Appl == "Investigation") { PendingApprCmplType = "Investigation_ICC"; $scope.go("Investigation_ICC/" + Cmpl_Mngmt_Id); }
    }

});

DIMS.controller('ComplaintsAssigningCtrl_ICC', function ($scope, $location, $compile, $http, DIMSFactory) {
    var AssnState = "";
    //$scope.GetComplaintAssignData();
    $scope.templatesettings = { HeaderTitle: "Assign Complaint ICC" };
    MasterScope = $scope;
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };

    angular.element(document).ready(function () {
        $("#CompRegSave_ICC").css("visibility", "visible");
        $("#CompRegList_ICC").css('visibility', 'visible');
        $("#CompRegAssign_ICC").css('visibility', 'hidden');
        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistrationICC/FillCMSStateFilter',
            async: true,
            success: function (response) {
                $("#StateFilter_ICC").empty();
                if (response == "") {

                }
                else {
                    response = JSON.parse(response);

                    var option = "";
                    var UserType = $("#SessionUserTypeID_ICC").val();
                    //svprasadk 17-06-2020 SBU 1 requirement to bulk assign complaints start
                    var USER_PRODUCT_TYPE_CODE_ICC = $("#USER_PRODUCT_TYPE_CODE_ICC").val();
                    //svprasadk 17-06-2020 SBU 1 requirement to bulk assign complaints end

                    if (UserType == "CSM" || UserType == "QH" || UserType == "CSM_BU2" || UserType == "CSM_BU3") {
                        option = $('<option></option>').attr("value", "ALL").text("ALL");
                        $("#StateFilter_ICC").append(option);
                    }


                    for (var i = 0; i < response.length; i++) {
                        option = $('<option></option>').attr("value", response[i]["STATE_CODE"]).text(response[i]["STATE_DESC"]);
                        $("#StateFilter_ICC").append(option);
                    }

                    var CMSState_ICC = $("#CMSState_ICC").val();

                    if (CMSState_ICC == "" || typeof CMSState_ICC == "undefined") {
                        $("#StateFilter_ICC").val(response[0]["STATE_CODE"]);
                        $("#CMSState_ICC").val(response[0]["STATE_CODE"]);
                    }
                    else {
                        $("#StateFilter_ICC").val(CMSState_ICC);
                    }
                    var CMSState_ICC = $("#StateFilter_ICC").val();
                    AssnState = CMSState_ICC;
                    DIMSFactory.getMasterClickData_ICC("ComplaintAssignCreate_ICC$" + AssnState).success(function (response) {

                        var data = JSON.parse(response.tabledata);
                        MasterName = "ComplaintAssignCreate_ICC";
                        $("#MasterTable_ICC").dataTable().fnDestroy();
                        $('#MasterTable_ICC').empty();

                        //svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints start
                        var columns = addAllColumnHeadersForAsgnCmpl_ICC(data, "MasterTable_ICC", USER_PRODUCT_TYPE_CODE_ICC);
                        //svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints end

                        //var columns = addAllColumnHeadersForAsgnCmpl_ICC(data, "MasterTable_ICC");

                        //alert(JSON.stringify(data));
                        var SessionUserCode_ICC = $("#SessionUserCode_ICC").val();

                        for (var i = 0; i < data.length; i++) {
                            var Assgn_row_ICC$ = $('<tr />');
                            //Assgn_row_ICC$.append($('<td onclick="EditMasterData_ICC(this)" />').html('<a style="background-color: #9760b3; border-color: #9760b3; padding: 6px 6px;" class="btn btn-info"><i class="fa fa-fw fa-pencil-square-o"></i>Edit</a>'));
                            //svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints start
                            if (USER_PRODUCT_TYPE_CODE_ICC == "SBU1") {
                                Assgn_row_ICC$.append($('<td />').html('<input type="checkbox" class="roles_ICC" name="chkAssn_ICC" id="chkAsgnUser_ICC' + i + '" /><input type="text" style="display:none;" id="BU_ICC_' + i + '" value=' + data[i]["Product Type"] + ' />'));
                            } else {
                                Assgn_row_ICC$.append($('<td />').html('<input type="checkbox" name="chkAssn_ICC" id="chkAsgnUser_ICC' + i + '" onclick="EditAssignUser_ICC(this,' + i + ')" /><input type="text" style="display:none;" id="BU_ICC_' + i + '" value=' + data[i]["Product Type"] + ' />'));
                            }
                            //svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints end
                            //Assgn_row_ICC$.append($('<td />').html('<input type="checkbox" name="chkAssn_ICC" id="chkAsgnUser_ICC' + i + '" onclick="EditAssignUser_ICC(this,' + i + ')" /><input type="text" style="display:none;" id="BU_ICC_' + i + '" value=' + data[i]["Product Type"] + ' />'));
                            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                                var cellValue = data[i][columns[colIndex]];
                                if (cellValue == null) { cellValue = ""; }
                                Assgn_row_ICC$.append($('<td/>').html(cellValue));
                            }
                            //svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints start
                            if (USER_PRODUCT_TYPE_CODE_ICC != "SBU1") {
                                Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserRole_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserRoleData_ICC" + '\',\'' + "AssnUserRoleMaster_ICC" + '\',\'' + "User Role List" + '\',' + i + ')" />'));
                                Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserName_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserData_ICC" + '\',\'' + "AssnUserMaster_ICC" + '\',\'' + "User List" + '\',' + i + ')" />'));
                            }
                            //svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints end
                            //Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserRole_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserRoleData_ICC" + '\',\'' + "AssnUserRoleMaster_ICC" + '\',\'' + "User Role List" + '\',' + i + ')" />'));
                            //Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserName_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserData_ICC" + '\',\'' + "AssnUserMaster_ICC" + '\',\'' + "User List" + '\',' + i + ')" />'));
                            $("#MasterTable_ICC").append(Assgn_row_ICC$);
                        }



                        $("#MasterTable_ICC tr td:nth-child(2)").hide();
                        $("#MasterTable_ICC tr th:nth-child(2)").hide();

                        var table = $("#MasterTable_ICC").dataTable({
                            "bDestroy": true,
                            'bPaginate': false,
                            'bFilter': false,
                            //scrollY: "200px",
                            //scrollX: true,
                            scrollCollapse: true,
                            paging: true
                            //fixedColumns: {
                            //    leftColumns: 0
                            //},
                        });

                        //$(".dataTables_scrollHeadInner").css({ "width": "100%" });
                        //$(".table ").css({ "width": "100%" });

                        $('#MasterTable_ICC tbody').on('click', 'tr', function () {
                            if ($(this).hasClass('selected')) {
                                $(this).removeClass('selected');
                            }
                            else {
                                table.$('tr.selected').removeClass('selected');
                                $(this).addClass('selected');
                            }
                        });
                    });

                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });

    });

    $scope.StateChange_ICC = function () {

        AssnState = $("#StateFilter_ICC").val();
        DIMSFactory.getMasterClickData_ICC("" + MasterName + "$" + AssnState).success(function (response) {

            var data = JSON.parse(response.tabledata);

            if (MasterName == "ComplaintAssign_ICC") {
                if (data == "" || data == "[]") {
                    alert("No Data Available");


                    $("#MasterTable_ICC").DataTable().clear().draw();
                    return;
                }

                $("#CompRegSave_ICC").css("visibility", "hidden");
                $("#CompRegList_ICC").css('visibility', 'hidden');
                $("#CompRegAssign_ICC").css('visibility', 'visible');
                $("#Add").prop('disabled', true);


                $("#MasterTable_ICC").dataTable().fnDestroy();
                $('#MasterTable_ICC thead').remove();
                $('#MasterTable_ICC tbody').empty();


                var columns = addAllColumnHeaders_ICC(data, "MasterTable_ICC");


                for (var i = 0; i < data.length; i++) {
                    var row$ = $('<tr onclick="EditMasterData_ICC(this)" style="cursor:pointer;" />');
                    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                        var cellValue = data[i][columns[colIndex]];

                        if (cellValue == null) { cellValue = ""; }
                        row$.append($('<td/>').html(cellValue));
                    }
                    $("#MasterTable_ICC").append(row$);
                }

            } else {
                //  MasterName = "ComplaintAssignCreate_ICC";
                $("#MasterTable_ICC").dataTable().fnDestroy();
                $('#MasterTable_ICC').empty();

                //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
                var USER_PRODUCT_TYPE_CODE_ICC = $("#USER_PRODUCT_TYPE_CODE_ICC").val();
                //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end

                //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
                var columns = addAllColumnHeadersForAsgnCmpl_ICC(data, "MasterTable_ICC", USER_PRODUCT_TYPE_CODE_ICC);
                //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end

                //var columns = addAllColumnHeadersForAsgnCmpl_ICC(data, "MasterTable_ICC");
                var SessionUserCode_ICC = $("#SessionUserCode_ICC").val();

                for (var i = 0; i < data.length; i++) {
                    var Assgn_row_ICC$ = $('<tr />');
                    //Assgn_row_ICC$.append($('<td onclick="EditMasterData_ICC(this)" />').html('<a style="background-color: #9760b3; border-color: #9760b3; padding: 6px 6px;" class="btn btn-info"><i class="fa fa-fw fa-pencil-square-o"></i>Edit</a>'));
                    //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
                    if (USER_PRODUCT_TYPE_CODE_ICC == "SBU1") {
                        Assgn_row_ICC$.append($('<td />').html('<input type="checkbox" class="roles_ICC" name="chkAssn_ICC" id="chkAsgnUser_ICC' + i + '" /><input type="text" style="display:none;" id="BU_ICC_' + i + '" value=' + data[i]["Product Type"] + ' />'));
                    } else {
                        Assgn_row_ICC$.append($('<td />').html('<input type="checkbox" name="chkAssn_ICC" id="chkAsgnUser_ICC' + i + '" onclick="EditAssignUser_ICC(this,' + i + ')" /><input type="text" style="display:none;" id="BU_ICC_' + i + '" value=' + data[i]["Product Type"] + ' />'));
                    }
                    //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end
                    //Assgn_row_ICC$.append($('<td />').html('<input type="checkbox" name="chkAssn_ICC" id="chkAsgnUser_ICC' + i + '" onclick="EditAssignUser_ICC(this,' + i + ')" /><input type="text" style="display:none;" id="BU_ICC_' + i + '" value=' + data[i]["Product Type"] + ' />'));
                    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                        var cellValue = data[i][columns[colIndex]];

                        if (cellValue == null) { cellValue = ""; }
                        Assgn_row_ICC$.append($('<td/>').html(cellValue));
                    }
                    //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
                    if (USER_PRODUCT_TYPE_CODE_ICC != "SBU1") {
                        Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserRole_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserRoleData_ICC" + '\',\'' + "AssnUserRoleMaster_ICC" + '\',\'' + "User Role List" + '\',' + i + ')" />'));
                        Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserName_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserData_ICC" + '\',\'' + "AssnUserMaster_ICC" + '\',\'' + "User List" + '\',' + i + ')" />'));
                    }
                    //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end
                    //Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserRole_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserRoleData_ICC" + '\',\'' + "AssnUserRoleMaster_ICC" + '\',\'' + "User Role List" + '\',' + i + ')" />'));
                    //Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserName_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserData_ICC" + '\',\'' + "AssnUserMaster_ICC" + '\',\'' + "User List" + '\',' + i + ')" />'));
                    $("#MasterTable_ICC").append(Assgn_row_ICC$);
                }

                $("#MasterTable_ICC tr td:nth-child(2)").hide();
                $("#MasterTable_ICC tr th:nth-child(2)").hide();
            }
            var table = $("#MasterTable_ICC").dataTable({
                "bDestroy": true,
                'bPaginate': false,
                'bFilter': false,
                //scrollY: "200px",
                //scrollX: true,
                scrollCollapse: true,
                paging: true
                //fixedColumns: {
                //    leftColumns: 0
                //},
            });

            $('#MasterTable_ICC tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        });
    }

    $("#Add").prop('disabled', false);
    //DIMSFactory.getMasterClickData_ICC("ComplaintAssignCreate_ICC$" + AssnState + "").success(function (response) {



    $scope.GetFieldData = function (Methodname, MasterType, Heading) {
        if (Methodname == "GetAssnUserLookupData_ICC") {
            if ($scope.txtAssToUserRole_Model_ICC != "") {
                DIMSFactory.GetComplAssgnUserData_ICC(MasterType, $scope.txtAssToUserRole_Model_ICC).success(function (response) {
                    getFieldLookUpData_ICC(response, Methodname, Heading);
                });
            } else {
                alert("Please Select User Role");
            }
        }
        else {
            DIMSFactory.getMasterClickData_ICC(MasterType).success(function (response) {
                getFieldLookUpData_ICC(response, Methodname, Heading);
            });
        }
    };

    $scope.AssnComplList_ICC = function () {

        DIMSFactory.getMasterClickData_ICC("ComplaintAssign_ICC$" + AssnState).success(function (response) {
            var data = JSON.parse(response.tabledata);
            MasterName = "ComplaintAssign_ICC";


            if (data == "" || data == "[]") {
                alert("No Data Available");
                return;
            }

            $("#CompRegSave_ICC").css("visibility", "hidden");
            $("#CompRegList_ICC").css('visibility', 'hidden');
            $("#CompRegAssign_ICC").css('visibility', 'visible');
            $("#Add").prop('disabled', true);


            $("#MasterTable_ICC").dataTable().fnDestroy();
            $('#MasterTable_ICC thead').remove();
            $('#MasterTable_ICC tbody').empty();


            var columns = addAllColumnHeaders_ICC(data, "MasterTable_ICC");


            for (var i = 0; i < data.length; i++) {
                var row$ = $('<tr onclick="EditMasterData_ICC(this)" style="cursor:pointer;" />');
                for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                    var cellValue = data[i][columns[colIndex]];

                    if (cellValue == null) { cellValue = ""; }
                    row$.append($('<td/>').html(cellValue));
                }
                $("#MasterTable_ICC").append(row$);
            }


            //$("#MasterTable_ICC tr td:nth-child(1)").hide();
            //$("#MasterTable_ICC tr th:nth-child(1)").hide();

            var table = $("#MasterTable_ICC").dataTable({
                "bDestroy": true,
                'scroll': true,
                //scrollY: "200px",
                //scrollX: true,
                scrollCollapse: true,
                paging: true
                //fixedColumns: {
                //    leftColumns: 0
                //},
            });

            $('#MasterTable_ICC tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        });
    }


    $scope.CreateAssnCompl_ICC = function () {

        DIMSFactory.getMasterClickData_ICC("ComplaintAssignCreate_ICC$" + AssnState).success(function (response) {
            var data = JSON.parse(response.tabledata);
            MasterName = "ComplaintAssignCreate_ICC";


            if (data == "" || data == "[]") {
                //alert("No Data Available");
                //return;
            }

            $("#CompRegSave_ICC").css("visibility", "visible");
            $("#CompRegList_ICC").css('visibility', 'visible');
            $("#CompRegAssign_ICC").css('visibility', 'hidden');
            $("#Add").prop('disabled', false);

            $("#MasterTable_ICC").dataTable().fnDestroy();
            $('#MasterTable_ICC thead').remove();
            $('#MasterTable_ICC tbody').empty();

            var SessionUserCode_ICC = $("#SessionUserCode_ICC").val();
            //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
            var USER_PRODUCT_TYPE_CODE_ICC = $("#USER_PRODUCT_TYPE_CODE_ICC").val();
            //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end
            $("#actotal_ICC").val(data.length);
            //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
            var columns = addAllColumnHeadersForAsgnCmpl_ICC(data, "MasterTable_ICC", USER_PRODUCT_TYPE_CODE_ICC);
            //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end
            //var columns = addAllColumnHeadersForAsgnCmpl_ICC(data, "MasterTable_ICC");

            for (var i = 0; i < data.length; i++) {

                var Assgn_row_ICC$ = $('<tr />');
                //Assgn_row_ICC$.append($('<td onclick="EditMasterData_ICC(this)" />').html('<a style="background-color: #9760b3; border-color: #9760b3; padding: 6px 6px;" class="btn btn-info"><i class="fa fa-fw fa-pencil-square-o"></i>Edit</a>'));
                //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
                if (USER_PRODUCT_TYPE_CODE_ICC == "SBU1") {
                    Assgn_row_ICC$.append($('<td />').html('<input type="checkbox" class="roles_ICC" name="chkAssn_ICC" id="chkAsgnUser_ICC' + i + '" /><input type="text" style="display:none;" id="BU_ICC_' + i + '" value=' + data[i]["Product Type"] + ' />'));
                } else {
                    Assgn_row_ICC$.append($('<td />').html('<input type="checkbox" name="chkAssn_ICC" id="chkAsgnUser_ICC' + i + '" onclick="EditAssignUser_ICC(this,' + i + ')" /><input type="text" style="display:none;" id="BU_ICC_' + i + '" value=' + data[i]["Product Type"] + ' />'));
                }
                //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end
                //Assgn_row_ICC$.append($('<td />').html('<input type="checkbox" name="chkAssn_ICC" id="chkAsgnUser_ICC' + i + '" onclick="EditAssignUser_ICC(this,' + i + ')" /><input type="text" style="display:none;" id="BU_ICC_' + i + '" value=' + data[i]["Product Type"] + ' />'));
                for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                    var cellValue = data[i][columns[colIndex]];

                    if (cellValue == null) { cellValue = ""; }
                    Assgn_row_ICC$.append($('<td/>').html(cellValue));
                }
                //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
                if (USER_PRODUCT_TYPE_CODE_ICC != "SBU1") {
                    Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserRole_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserRoleData_ICC" + '\',\'' + "AssnUserRoleMaster_ICC" + '\',\'' + "User Role List" + '\',' + i + ')" />'));
                    Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserName_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserData_ICC" + '\',\'' + "AssnUserMaster_ICC" + '\',\'' + "User List" + '\',' + i + ')" />'));
                }
                //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end
                //Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserRole_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserRoleData_ICC" + '\',\'' + "AssnUserRoleMaster_ICC" + '\',\'' + "User Role List" + '\',' + i + ')" />'));
                //Assgn_row_ICC$.append($('<td />').html('<input type="text" id="txtAssgnUserName_ICC' + i + '" style="visibility:hidden" readonly onclick="EditAssnUserRole_ICC(this,\'' + "GetAssnUserData_ICC" + '\',\'' + "AssnUserMaster_ICC" + '\',\'' + "User List" + '\',' + i + ')" />'));
                $("#MasterTable_ICC").append(Assgn_row_ICC$);

            }

            $("#MasterTable_ICC tr td:nth-child(2)").hide();
            $("#MasterTable_ICC tr th:nth-child(2)").hide();

            var table = $("#MasterTable_ICC").dataTable({
                "bDestroy": true,
                'scroll': true,
                'bPaginate': false,
                'bFilter': false,
                //scrollY: "200px",
                //scrollX: true,
                scrollCollapse: true,
                paging: true
                //fixedColumns: {
                //    leftColumns: 0
                //},
            });

            $('#MasterTable_ICC tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        });
    }

    var Data = "";
    $scope.SaveAssnCompl_ICC = function () {
        //alert($("[name='chkAssn_ICC']:checked").length);
        //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
        var USER_PRODUCT_TYPE_CODE_ICC = $("#USER_PRODUCT_TYPE_CODE_ICC").val();
        //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end
        //debugger;
        if (USER_PRODUCT_TYPE_CODE_ICC == "SBU1" && ($("#userRoleMasterCode_ICC").val() == "" || typeof $("#userRoleMasterCode_ICC").val() == undefined)) {
            alert("Please select User Role");
            return false;
        } else if (USER_PRODUCT_TYPE_CODE_ICC == "SBU1" && ($("#usersBasedonRoleCode_ICC").val() == "" || typeof $("#usersBasedonRoleCode_ICC").val() == undefined)) {
            alert("Please select User Name");
            return false;
        } else {
            Data = $("input:checkbox[name=chkAssn_ICC]:checked").map(function () {
                var str = $(this).attr("id");
                var rowcnt = str.slice(15);
                var table = document.getElementById('MasterTable_ICC');
                // jQuery to get the content of row n, column 1
                //var rowcountAssn_ICC = (parseInt(rowcnt) % 10) + 1;
                var rowcountAssn_ICC = (parseInt(rowcnt) % $('select[name="MasterTable_ICC_length"]').val()) + 1;
                var ss = $(table.rows[rowcountAssn_ICC].cells[1]).text();
                if (USER_PRODUCT_TYPE_CODE_ICC == "SBU1") {
                    return ss + "$" + $("#userRoleMaster_ICC").val() + "$" + $("#usersBasedonRole_ICC").val() + "$" + $("#userRoleMasterCode_ICC").val() + "$" + $("#usersBasedonRoleCode_ICC").val();
                } else {
                    return ss + "$" + $("#txtAssgnUserRole_ICC" + rowcnt + "").val() + "$" + $("#txtAssgnUserName_ICC" + rowcnt + "").val();
                }
                //return ss + "$" + $("#txtAssgnUserRole_ICC" + rowcnt + "").val() + "$" + $("#txtAssgnUserName_ICC" + rowcnt + "").val();
            }).get().join(",");

            if (Data != "") {

                if (confirm("Do you want to Assign Complaints?")) {
                }
                else {
                    return;
                }

                //var MasterType = "{\"MasterType\":\"" + "Assign Complaint ICC" + "\",\"ComplAssnValues\":\"" + Data + "\",\"UserCode\":\"" + $("#SessionUserCode_ICC").val() + "\"}";
                var MasterType = "{\"MasterType\":\"" + "Assign Complaint ICC" + "\",\"ComplAssnValues\":\"" + Data + "\",\"UserCode\":\"" + $("#SessionUserCode_ICC").val() + "\",\"USER_PRODUCT_TYPE_CODE\":\"" + $("#USER_PRODUCT_TYPE_CODE_ICC").val() + "\"}";
                DIMSFactory.SaveMasterData_ICC(MasterType).success(function (response) {
                    alert("Complaint has been successfully assigned");
                    $("#userRoleMasterCode_ICC").val('');
                    $("#usersBasedonRoleCode_ICC").val('')
                    $scope.CreateAssnCompl_ICC();
                });
            }
            else {
                alert("Please select atleast one record");
            }
        }

        //var table = document.getElementById('MasterTable_ICC');

        //var rowLength = table.rows.length;

        //alert(rowLength);

        //for (var i = 1; i < rowLength; i += 1) {
        //    var row = table.rows[i];

        //    //your code goes here, looping over every row.
        //    //cells are accessed as easy

        //    var cellLength = row.cells.length;

        //    alert(cellLength);

        //    for (var y = 0; y < 2; y += 1) {
        //        var cell = row.cells[y].innerHTML;
        //        //var ss = cell.attr('id').text(); alert(ss);

        //        alert(cell);

        //        //do something with every cell here
        //    }
        //}
    }

    $scope.SaveCmplAssignData_ICC = function () {
        var MasterType = "{\"MasterType\":\"" + "Assign Complaint List Update ICC" + "\",\"Compl_Id\":\"" + $scope.CmplAssn_id_Model_ICC + "\",\"Compl_No\":\"" + $scope.txtCmplNo_Model_ICC + "\",\"Compl_Date\":\"" + $scope.txtCmplDate_Model_ICC + "\",\"AssnToUserRole\":\"" + $scope.txtAssToUserRole_Model_ICC + "\",\"AssnToUser\":\"" + $scope.txtAssToUser_Model_ICC + "\",\"AssnBy\":\"" + $scope.txtAssBy_Model_ICC + "\",\"AssnOn\":\"" + $scope.txtAssOn_Model_ICC + "\"}";
        DIMSFactory.SaveMasterData_ICC(MasterType).success(function (response) {
            alert("Record has been successfully updated");
            $scope.AssnComplList_ICC();
        });
        var element = angular.element('#CmplAssnModal_ICC');
        element.modal('hide');
    }


});

DIMS.controller('ComplaintsApprovalReportCtrl_ICC', function ($scope, $location, DIMSFactory, $http) {
    $scope.templatesettings = { HeaderTitle: "Complaint Approval Report" };

    angular.element(document).ready(function () {
        $.ajax({
            type: 'POST',
            url: '../../ComplaintRegistrationICC/FillCMSStateFilter',
            async: true,
            success: function (response) {
                $("#StateFilter_ICC").empty();
                if (response == "") {

                }
                else {
                    response = JSON.parse(response);
                    for (var i = 0; i < response.length; i++) {
                        var option = $('<option></option>').attr("value", response[i]["STATE_CODE"]).text(response[i]["STATE_DESC"]);
                        $("#StateFilter_ICC").append(option);
                    }
                    var CMSState_ICC = $("#CMSState_ICC").val();

                    if (CMSState_ICC == "" || typeof CMSState_ICC == "undefined") {
                        $("#StateFilter_ICC").val(response[0]["STATE_CODE"]);
                        $("#CMSState_ICC").val(response[0]["STATE_CODE"]);
                    }
                    else {
                        $("#StateFilter_ICC").val(CMSState_ICC);
                    }
                    var CMSState_ICC = $("#StateFilter_ICC").val();
                    AssnState = CMSState_ICC;

                    DIMSFactory.getMasterClickData_ICC("listComplaintApprovals_ICC$" + AssnState).success(function (response) {

                        var obj = JSON.parse(response.tabledata);
                        tcount = obj.length;
                        var TableRow = "";
                        $("#ApprovalsList_ICC").dataTable().fnDestroy();
                        $("#ApprovalsList_ICC tbody").empty();

                        for (var i = 0; i < tcount; i++) {
                            TableRow = TableRow + "<tr class='MousePointer'>";
                            TableRow = TableRow + "<td>" + obj[i]["Doc Code"] + "</td>";
                            TableRow = TableRow + "<td>" + obj[i]["Doc No"] + "</td>";
                            TableRow = TableRow + "<td>" + obj[i]["Complaint Id"] + "</td>";
                            TableRow = TableRow + "<td>" + obj[i]["Complaint No"] + "</td>";
                            TableRow = TableRow + "<td>" + obj[i]["Doc series code"] + "</td>";
                            TableRow = TableRow + "<td>" + obj[i]["Originator"] + "</td>";
                            TableRow = TableRow + "<td>" + obj[i]["Originated On"] + "</td>";
                            TableRow = TableRow + "<td>" + obj[i]["Doc Status"] + "</td>";
                            //TableRow = TableRow + "<td>" + obj[i].STAGE + "</td>";
                            TableRow = TableRow + "</tr>";

                        }

                        $('#ApprovalsList_ICC tbody').append(TableRow);
                        var table = $("#ApprovalsList_ICC").dataTable({
                            "bDestroy": true,
                            scrollCollapse: true,
                            paging: true
                        });
                    });

                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
            }
        });
    });

    $scope.StateChange_ICC = function () {
        AssnState = $("#StateFilter_ICC").val();
        DIMSFactory.getMasterClickData_ICC("listComplaintApprovals_ICC$" + AssnState).success(function (response) {

            var obj = JSON.parse(response.tabledata);
            tcount = obj.length;
            var TableRow = "";
            $("#ApprovalsList_ICC").dataTable().fnDestroy();
            $("#ApprovalsList_ICC tbody").empty();

            for (var i = 0; i < tcount; i++) {
                TableRow = TableRow + "<tr class='MousePointer'>";
                TableRow = TableRow + "<td>" + obj[i]["Doc Code"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["Doc No"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["Complaint Id"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["Complaint No"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["Doc series code"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["Originator"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["Originated On"] + "</td>";
                TableRow = TableRow + "<td>" + obj[i]["Doc Status"] + "</td>";
                //TableRow = TableRow + "<td>" + obj[i].STAGE + "</td>";
                TableRow = TableRow + "</tr>";

            }

            $('#ApprovalsList_ICC tbody').append(TableRow);
            var table = $("#ApprovalsList_ICC").dataTable({
                "bDestroy": true,
                scrollCollapse: true,
                paging: true
            });
        });
    }

    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);

    };

});

function addAllColumnHeadersForAsgnCmpl_ICC(myList, TableName, USER_PRODUCT_TYPE_CODE_ICC) {
    var columnSet = [];
    var html = "";
    html += '<thead><tr style="background-color: #d2401a; color: white; font-size: 13px;">';
    var headerTr$ = $('<tr/>');
    //svprasadk 25-06-2020 SBU 1 requirement to bulk assign complaints start
    if (myList.length > 0) {
        html += '<th><input type="checkbox" id="AssignComplaintCheckAll_ICC" onchange="AssignComplaintCheckAllChange_ICC()" /></th>';
    } else {
        html += '<th></th>';
    }
    //svprasadk 26-06-2020 SBU 1 requirement to bulk assign complaints end
    //html += "<th></th>";
    //debugger;
    for (var i = 0; i < myList.length; i++) {

        var rowHash = myList[i];
        for (var key in rowHash) {

            if ($.inArray(key, columnSet) == -1) {

                columnSet.push(key);
                // headerTr$.append($('<th/>').html(key));

                html += '<th>' + key + '</th>';

            }

        }
    }

    //svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints start
    if (USER_PRODUCT_TYPE_CODE_ICC != "SBU1") {
        html += "<th>User Role</th>";
        html += "<th>User Name</th>";
    }
    //svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints end

    html += "</tr></thead>";
    $("#" + TableName).append(html);


    return columnSet;
}

function EditAssnUserRole_ICC(obj, Methodname, Master, Heading, TextCount, DIMSFactory) {
    txtUserRoleCnt_ICC = "txtAssgnUserRole_ICC" + TextCount;
    txtUserNameCnt = "txtAssgnUserName_ICC" + TextCount;
    var scope = angular.element(document.getElementById("MainWrap")).scope();
    if (Master == "AssnUserRoleMaster_ICC") {
        angular.injector(['ng', 'DIMSApp']).get("DIMSFactory").getMasterClickData_ICC(Master).success(function (response) {
            getFieldLookUpData_ICC(response, Methodname, Heading);
        });
    }
    else if (Master == "AssnUserMaster_ICC") {
        if ($("#" + txtUserRoleCnt_ICC).val() != "") {
            angular.injector(['ng', 'DIMSApp']).get("DIMSFactory").GetComplAssgnUserData_ICC(Master, $("#" + txtUserRoleCnt_ICC).val()).success(function (response) {
                getFieldLookUpData_ICC(response, Methodname, Heading);
            });
        }
        else {
            alert("Please Select User Role");
        }
    }
}


function EditAssignUser_ICC(obj, cnt, DIMSFactory) {

    if ($("#chkAsgnUser_ICC" + cnt + "").prop('checked') == true) {
        $("#txtAssgnUserRole_ICC" + cnt + "").css("visibility", "visible");
        $("#txtAssgnUserName_ICC" + cnt + "").css("visibility", "visible");

        var BusinessUnit = $("#BU_" + cnt).val();


        if (BusinessUnit == "SBU1") {
            $("#txtAssgnUserRole_ICC" + cnt + "").val("Customer Service Officer");
        }
        else if (BusinessUnit == "SBU2") {
            $("#txtAssgnUserRole_ICC" + cnt + "").val("Customer Service Manager-BU2");
        }
        else if (BusinessUnit == "SBU3" || BusinessUnit == "UPVC" || BusinessUnit == "CPVC" || BusinessUnit == "COLUMN" || BusinessUnit == "Traded material" || BusinessUnit == "Traded") {
            //$("#txtAssgnUserRole_ICC" + cnt + "").val("Quality Audit Manager Plant");
            $("#txtAssgnUserRole_ICC" + cnt + "").val("Quality Assurance Manager Plant");
        }
        else {
            $("#txtAssgnUserRole_ICC" + cnt + "").val("");
        }
    }
    else {
        $("#txtAssgnUserRole_ICC" + cnt + "").css("visibility", "hidden");
        $("#txtAssgnUserName_ICC" + cnt + "").css("visibility", "hidden");
        $("#txtAssgnUserRole_ICC" + cnt + "").val("");
    }

}

function GetAssnUserRoleLookupData_ICC(obj) {
    MasterScope.$apply(function () {
        //MasterScope.txtDeptCompCode_Model = $(obj).children().eq(1).html();
        MasterScope.txtAssToUserRole_Model = $(obj).children().eq(2).html();
        MasterScope.txtAssToUser_Model = "";

    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetAssnUserLookupData_ICC(obj) {
    MasterScope.$apply(function () {
        MasterScope.txtAssToUser_Model = $(obj).children().eq(2).html();
        //alert($(obj).children().eq(2).html());
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetAssnUserRoleData_ICC(obj) {
    //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
    var USER_PRODUCT_TYPE_CODE_ICC = $("#USER_PRODUCT_TYPE_CODE_ICC").val();
    if (USER_PRODUCT_TYPE_CODE_ICC == "SBU1") {
        $("#userRoleMaster_ICC").val($(obj).children().eq(2).html());
        $("#userRoleMaster_ICCCode").val($(obj).children().eq(1).html());
    } else {
        $("#" + txtUserRoleCnt_ICC).val($(obj).children().eq(2).html());
    }
    //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end
    //$("#" + txtUserRoleCnt_ICC).val($(obj).children().eq(2).html());
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetAssnUserData_ICC(obj) {
    //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
    var USER_PRODUCT_TYPE_CODE_ICC = $("#USER_PRODUCT_TYPE_CODE_ICC").val();
    if (USER_PRODUCT_TYPE_CODE_ICC == "SBU1") {
        $("#usersBasedonRole_ICC").val($(obj).children().eq(2).html());
        $("#usersBasedonRoleCode_ICC").val($(obj).children().eq(1).html());
    } else {
        $("#" + txtUserNameCnt).val($(obj).children().eq(2).html());
    }
    //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end
    //$("#" + txtUserNameCnt).val($(obj).children().eq(2).html());
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

//svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints start
function getuserRoleMaster_ICC(Methodname, Master, Heading) {
    if ($('.roles_ICC:checkbox:checked').length == 0) {
        alert("Please select atleast one record");
    } else {
        angular.injector(['ng', 'DIMSApp']).get("DIMSFactory").getMasterClickData_ICC(Master).success(function (response) {
            getFieldLookUpData_ICC(response, Methodname, Heading);
        });
    }
}

function getusersBasedonRole_ICC(Methodname, Master, Heading) {
    //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints start
    if ($('.roles_ICC:checkbox:checked').length == 0) {
        alert("Please select atleast one record");
    }
    //svprasadk 19-06-2020 SBU 1 requirement to bulk assign complaints end
    else if ($("#userRoleMaster_ICC").val() != "") {
        angular.injector(['ng', 'DIMSApp']).get("DIMSFactory").GetComplAssgnUserData_ICC(Master, $("#userRoleMaster_ICC").val()).success(function (response) {
            getFieldLookUpData_ICC(response, Methodname, Heading);
        });
    }
    else {
        alert("Please Select User Role");
    }
}
//svprasadk 18-06-2020 SBU 1 requirement to bulk assign complaints end

function getFieldLookUpData_ICC(response, name, pageHeading) {
    var data = JSON.parse(response.tabledata);
    var element = angular.element('#LookUpModal');
    element.modal('show');
    $("#PopHeading").text(pageHeading);

    if (data == "") {

        $("#MasterStatus").text("No Records found");
        //$("#PopUpTable").dataTable().fnDestroy();
        $('#PopUpTable').empty();
    } else {
        $("#MasterStatus").text("");

        $("#PopUpTable").dataTable().fnDestroy();
        $('#PopUpTable').empty();

        var columns = addAllColumnHeaders(data, "PopUpTable");

        for (var i = 0; i < data.length; i++) {
            var row$ = $('<tr onclick="' + name + '(this)" style="cursor:pointer;" />');
            for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                var cellValue = data[i][columns[colIndex]];

                if (cellValue == null) { cellValue = ""; }
                row$.append($('<td/>').html(cellValue));
            }
            $("#PopUpTable").append(row$);
        }

        $("#PopUpTable tr td:nth-child(1)").hide();
        $("#PopUpTable tr th:nth-child(1)").hide();

        if (MasterName == "State") {
            $("#PopUpTable tr td:nth-child(4)").hide();
            $("#PopUpTable tr th:nth-child(4)").hide();
        } else if (MasterName == "City") {
            $("#PopUpTable tr td:nth-child(4)").hide();
            $("#PopUpTable tr th:nth-child(4)").hide();
        }
        else if (MasterName == "Location") {
            $("#PopUpTable tr td:nth-child(4)").hide();
            $("#PopUpTable tr th:nth-child(4)").hide();
            $("#PopUpTable tr td:nth-child(6)").hide();
            $("#PopUpTable tr th:nth-child(6)").hide();
            $("#PopUpTable tr td:nth-child(8)").hide();
            $("#PopUpTable tr th:nth-child(8)").hide();
        }
        else if (MasterName == "Depo Master") {
            $("#PopUpTable tr td:nth-child(3)").hide();
            $("#PopUpTable tr th:nth-child(3)").hide();
            $("#PopUpTable tr td:nth-child(5)").hide();
            $("#PopUpTable tr th:nth-child(5)").hide();
            $("#PopUpTable tr td:nth-child(7)").hide();
            $("#PopUpTable tr th:nth-child(7)").hide();

        }
        else if (MasterName == "CurrencyMaster") {

            //$("#PopUpTable tr td:nth-child(1)").hide();
            //$("#PopUpTable tr th:nth-child(1)").hide();

        }
        else if (MasterName == "Group Company Details") {
            $("#PopUpTable tr td:nth-child(4)").hide();
            $("#PopUpTable tr th:nth-child(4)").hide();
            $("#PopUpTable tr td:nth-child(6)").hide();
            $("#PopUpTable tr th:nth-child(6)").hide();
            $("#PopUpTable tr td:nth-child(8)").hide();
            $("#PopUpTable tr th:nth-child(8)").hide();
        }
        else if (MasterName == "Company Details") {
            $("#PopUpTable tr td:nth-child(4)").hide();
            $("#PopUpTable tr th:nth-child(4)").hide();
            $("#PopUpTable tr td:nth-child(6)").hide();
            $("#PopUpTable tr th:nth-child(6)").hide();
            $("#PopUpTable tr td:nth-child(8)").hide();
            $("#PopUpTable tr th:nth-child(8)").hide();
        }

        var table = $("#PopUpTable").dataTable({
            "bDestroy": true,
            'scroll': true
        });

        $('#PopUpTable tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
    }
}