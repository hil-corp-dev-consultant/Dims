

DIMS.factory('DIMSSFDCFactory', function ($http) {
    return {
        getTempData: function () {
            return $http.get('../../Home/getData');
        },
        getMasterData: function (masterType) {
            return $http({ url: '../../SFDC/getMasterData', method: 'POST', data: { MasterType: masterType } });
        },
        SaveOrderData: function (TotalOrderData) {
            return $http({ url: '../../SFDC/SaveOrderData', method: 'POST', data: { TotalData: TotalOrderData } });
        },
        GetOrderDataforEdit: function (EditId) {
            return $http({ url: '../../SFDC/GetOrderDetails', method: 'POST', data: { OrderNumber: EditId } });
        },
        GetPresentDateAndTime: function () {
            return $http({ url: '../../Home/getServerDateTime', method: 'GET' });
        },
        SaveJourneyPlan: function (TotalPlanData) {
            return $http({ url: '../../SFDC/SaveJourneyPlan', method: 'POST', data: { TotalJourneyPlan: TotalPlanData } });
        },
        GetUserBasedJourneyPlan: function (Data) {
            return $http({ url: '../../SFDC/GetUserBasedJourneyPlan', method: 'POST', data: { MasterType: Data } });
        },
        GetJourneyPlanDetailsforEdit: function (EditId) {
            return $http({ url: '../../SFDC/GetJourneyPlanDetailsforEdit', method: 'POST', data: { JourneyPlanMonth: EditId } });
        },
        SaveMarketMapData: function (TotalMarketMap) {
            return $http({ url: '../../SFDC/SaveMarketMap', method: 'POST', data: { SaveMarketMapData: TotalMarketMap } });
        },
        getMarketMapList: function (Data) {
            return $http({ url: '../../SFDC/GetMarketMapList', method: 'POST', data: { MasterType: Data } });
        },
        GetMarketMapDataForEdit: function (EditMarketMapId) {
            return $http({ url: '../../SFDC/GetMarketMapDataForEdit', method: 'POST', data: { EditId: EditMarketMapId } });
        },
        SavePartnerissue: function (TotalIssueData) {
            return $http({ url: '../../SFDC/SavePartnerissue', method: 'POST', data: { TotalPartnerIssue: TotalIssueData } });
        },
        GetPartnerIssuesList: function (Data) {
            return $http({ url: '../../SFDC/GetPartnerIssuesList', method: 'POST', data: { MasterType: Data } });
        },
        GetPartnerIssueDataForEdit: function (EditPartnerIssueId) {
            return $http({ url: '../../SFDC/GetPartnerIssueDataForEdit', method: 'POST', data: { EditId: EditPartnerIssueId } });
        },
        SaveNewCounterData: function (TotalJsonData) {
            return $http({ url: '../../SFDC/SaveNewCounterData', method: 'POST', data: { Data: TotalJsonData } });
        },
        GetAllPagesList: function (Data) {
            return $http({ url: '../../SFDC/GetAllPagesList', method: 'POST', data: { ListType: Data } });
        },
        GetCounterDataForEdit: function (EditCounterId) {
            return $http({ url: '../../SFDC/GetCounterDataForEdit', method: 'POST', data: { EditId: EditCounterId } });
        },
        GetZonesListForHolidayConfig: function () {
            return $http({ url: '../../SFDC/GetZonesListForHolidayConfig', method: 'GET' });
        },
        GetDateBasedDayinHoliday: function (Date) {
            return $http({ url: '../../SFDC/GetDateBasedDayinHoliday', method: 'POST', data: { Date: Date } });
        },
        SaveHolidayData: function (TotalHolidayData) {
            return $http({ url: '../../SFDC/SaveHolidayData', method: 'POST', data: { TotalData: TotalHolidayData } });
        },
        GetStatesListbasedonId: function (id) {
            return $http({ url: '../../SFDC/GetStatesbasedonId', method: 'POST', data: { HolidayId: id } });
        },
        GetLatestOrdernumber: function () {
            return $http.get('../../SFDC/GetLatestOrdernumber');
        },
        GetFSOIncharge: function (StockistCode) {
            return $http({ url: '../../SFDC/GetFSOIncharge', method: 'POST', data: { StockistCode: StockistCode } });
        },
        UpdateJourneyPlanStatus: function (jsondata) {
            return $http({ url: '../../SFDC/UpdateJourneyPlanStatus', method: 'POST', data: { jsondata: jsondata } });
        },
        GetJPLogiOrgIds: function (Data) {
            return $http({ url: '../../SFDC/GetJPLogiOrgIds', method: 'POST', data: { Data: Data } });
        },

        //mani
        GetSchemeDetails: function (id) {
            return $http({ url: '../../SFDC/GetStatesbasedonId', method: 'POST', data: { HolidayId: id } });
        },
        SaveSchemeData: function (Data) {
            return $http({ url: '../../SFDC/SaveSchemeData', method: 'POST', data: { TotalSchemeData: Data } });
        },
        GetSchemeDataForEdit: function (EditId) {
            return $http({ url: '../../SFDC/GetSchemeDetails', method: 'POST', data: { EditId: EditId } });
        },
        GetFilterDataForSchemes: function (FilterData) {
            return $http({ url: '../../SFDC/GetFilterDataForSchemes', method: 'POST', data: { FilterData: FilterData } });
        },
        GetFilterDataForPartnerIssue: function (FilterData) {
            return $http({ url: '../../SFDC/GetFilterDataForPartnerIssue', method: 'POST', data: { FilterData: FilterData } });
        },
        GetSchemeId: function () {
            return $http({ url: '../../SFDC/GetSchemeId', method: 'GET' });
        },
        GetPartnerIssueNumber: function () {
            return $http({ url: '../../SFDC/GetPartnerIssueNumber', method: 'POST' });
        },
        GetAverageMonthlySale: function (CustomerCode) {
            alert("ss" + CustomerCode);
            return $http({ url: '../../SFDC/GetAverageMonthlySale', method: 'POST', data: { CustomerData: CustomerCode } });
        },
        SaveInventoryTracking: function (TotalData) {
            return $http({ url: '../../SFDC/SaveInventoryTracking', method: 'POST', data: { TotalData: TotalData } });
        },
        GetInventoryDataForEdit: function (EditId) {
            return $http({ url: '../../SFDC/GetInventoryDetails', method: 'POST', data: { EditId: EditId } });
        },
        GetFilterDataForInventory: function (FilterData) {
            return $http({ url: '../../SFDC/GetFilterDataForInventory', method: 'POST', data: { FilterData: FilterData } });
        },
        GetFilterDataForSalesHuddles: function (FilterData) {
            return $http({ url: '../../SFDC/GetFilterDataForSalesHuddles', method: 'POST', data: { FilterData: FilterData } });
        },
        GetSalesHuddleData: function (UserData_sales) {
            return $http({ url: '../../SFDC/GetSalesHuddleData', method: 'POST', data: { SessionData: UserData_sales } });
        },
        GetSalesHuddleApprovalData: function (Data) {
            return $http({ url: '../../SFDC/GetSalesHuddleApprovalData', method: 'POST', data: { SessionUserCode: Data } });
        },
        getPartnerIssueMasterData: function (masterType) {
            return $http({ url: '../../SFDC/GetPartnerIssueMasterData', method: 'POST', data: { MasterType: masterType } });
        },
        UpdateSalesHuddleData: function (TotalData) {
            return $http({ url: '../../SFDC/UpdateSalesHuddleData', method: 'POST', data: { TotalData: TotalData } });
        },
        GetFilterDataForSalesHuddlesApproval: function (FilterData) {
            return $http({ url: '../../SFDC/GetFilterDataForSalesHuddlesApproval', method: 'POST', data: { FilterData: FilterData } });
        },
        //karthik
        getHolidayData: function (HolidayData) {
            return $http({ url: '../../SFDC/getHolidayData', method: 'POST', data: { MasterType: masterType } });
        },
        GetFilterDataForCounters: function (FilterDataForCounters) {
            return $http({ url: '../../SFDC/GetFilterDataForCounters', method: 'POST', data: { FilterDataForCounters: FilterDataForCounters } });
        },
        DeleteHolidayData: function (TotalHolidayData) {
            return $http({ url: '../../SFDC/DeleteHolidayData', method: 'POST', data: { TotalData: TotalHolidayData } });
        },
        GetStatesListbasedonId: function (id) {
            return $http({ url: '../../SFDC/GetStatesbasedonId', method: 'POST', data: { HolidayId: id } });
        },
        SaveHolidayData: function (TotalHolidayData) {
            return $http({ url: '../../SFDC/SaveHolidayData', method: 'POST', data: { TotalData: TotalHolidayData } });
        },
        GetFilterDataForMarkertMapHIL: function (FilterDataForMarketMapHIL) {
            return $http({ url: '../../SFDC/GetFilterDataForMarkertMapHIL', method: 'POST', data: { FilterDataForMarketMapHIL: FilterDataForMarketMapHIL } });
        },

        GetPartnerIssueSummary: function () {
            return $http({ url: '../../SFDC/PartnerIssueSummary', method: 'GET' });
        },

        GetPartnerIssueSummaryList: function (state) {
            return $http({ url: '../../SFDC/PartnerIssueSummaryList', method: 'POST', data: { state: state } });
        },

        GetfilterdataForPartnerIssueSummary: function (Dates) {
            return $http({ url: '../../SFDC/GetfilterdataForPartnerIssueSummary', method: 'POST', data: { Dates: Dates } });
        }
        //karthikSSSSSSSSS

    }

});





//SFDC
DIMS.controller('DailyOrderTracking', function ($scope, $location, DIMSSFDCFactory, $http, DIMSFactory) {
    $('#DailyOrderTableId').hide();
    $scope.templatesettings = { HeaderTitle: "Daily Order tracking" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };

    var width = $(window).width(), height = $(window).height();//---------

    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });//-----------


    $('#SalesEmapName').SumoSelect({ placeholder: 'Sales Employee' });
    $('#PlantSumo').SumoSelect({ placeholder: 'Plant' });
    $('#Zone').SumoSelect({ placeholder: 'Zone' });
    $('#State').SumoSelect({ placeholder: 'State' });
    $('#TerriotryArea').SumoSelect({ placeholder: 'Terriotry/Area' });
    $('#ProductCategory').SumoSelect({ placeholder: 'Product Category' });

    var data_value = ""; var all_zones = ""; var all_states = ""; var all_territories = ""; var all_customers = ""; var CustomerArray = new Array();
    ShowLoader();
    if ((SessionValue == "ZH") || (SessionValue == "RCC") || (SessionValue == "ZSC")) {
        $("#Zone").attr("disabled", false); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                if (FilterList.dtZone.length == 0) {
                    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterList.dtZone.length - 1) {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            $('select#Zone')[0].sumo.selectItem(0);
            $('#Zone').trigger("change");
            //all_states = "";
            //for (var i = 0; i < FilterList.dtState.length; i++) {
            //    if (FilterList.dtState.length == 0) {
            //        all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else if (i == FilterList.dtState.length - 1) {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
            //    }
            //}
            //all_territories = "";
            //for (var i = 0; i < FilterList.dtTerritory.length; i++) {
            //    if (FilterList.dtTerritory.length == 0) {
            //        all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else if (i == FilterList.dtTerritory.length - 1) {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
            //    }
            //}
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            //$('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            //}
        });
    } else if (SessionValue == "SH") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            $('#State').trigger("change");
            //all_territories = "";
            //for (var i = 0; i < FilterList.dtTerritory.length; i++) {
            //    if (FilterList.dtTerritory.length == 0) {
            //        all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else if (i == FilterList.dtTerritory.length - 1) {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
            //    }
            //}
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            // }
        });
    }

    else if (SessionValue == "TM") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + "TM" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            //all_customers = "";
            // for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            //}
        });
    }

    else if (SessionValue == "FSO" || SessionValue == "FSO_BU2") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        if(SessionValue == "FSO"){
            data_value = "{\"Role\":\"" + "FSO" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        }else {
            data_value = "{\"Role\":\"" + "FSO_BU2" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        }
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            $('select#TerriotryArea')[0].sumo.selectItem(0);
            $('#TerriotryArea').trigger("change");
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            // }
        });
    }

    else if ((SessionValue == "STOCKIST") || (SessionValue == "C&F")) {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", true); $('#CustomerCode').attr("disabled", true); $('#CustomerCode').css({ "class": "gray" });// $("#StockistID").attr("disabled", true);

        data_value = "{\"Role\":\"" + "STOCKIST" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            $('select#TerriotryArea')[0].sumo.selectItem(0);
            //all_customers = "";
            for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                CustomerArray.push(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                $('#CustomerCode').val(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                //if (FilterList.dtCustomer.length == 0) {
                //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
                //} else if (i == FilterList.dtCustomer.length - 1) {
                //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
                //} else {
                //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
                //}
            }
            $("#CustomerCode").typeahead({
                source: CustomerArray
            });
            // $('select#StockistID')[0].sumo.selectItem(0);
        });
    } else {
        $("#Zone").attr("disabled", false); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + SessionValue + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                if (FilterList.dtZone.length == 0) {
                    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterList.dtZone.length - 1) {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            CustomerArray.length = 0;
            $("#CustomerCode").val("");
            if (FilterList.dtCustomer.length > 0) {
                for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                    CustomerArray.push(FilterList.dtCustomer[i]["STOCKIST_ID"].toString() + ":" + FilterList.dtCustomer[i]["STOCKIST_NAME"].toString());
                }
            }
        });

    }
    HideLoader();
    $('#Zone').on('keyup change', function () {
        ShowLoader();
        var Clear_State = $('#State option').length;
        for (var i = 0; i < Clear_State; i++) {
            $('#State')[0].sumo.remove(0);
        }

        //   var Clear_Cust = $('#StockistID option').length;
        //  for (var i = 0; i < Clear_Cust; i++) {
        //      $('#StockistID')[0].sumo.remove(0);
        // }
        CustomerArray.length = 0;//---------------------------9
        $('#CustomerCode').val("");

        var Clear_Terrytory = $('#TerriotryArea option').length;
        for (var i = 0; i < Clear_Terrytory; i++) {
            $('#TerriotryArea')[0].sumo.remove(0);
        }

        var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
        $http({ url: '../../Home/GetStatesforZone', method: 'POST', data: { Data: data_value } }).success(function (res) {
            if (res != "") {
                var dtState = JSON.parse(res);
                for (var i = 0; i < dtState.length; i++) {
                    $('#State')[0].sumo.add(dtState[i]["STATE_CODE"], dtState[i]["STATE_NAME"]);
                }
                HideLoader();
            } else { HideLoader(); }

            $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                if (Cust_res != "") {
                    var dtCust = JSON.parse(Cust_res);
                    for (var i = 0; i < dtCust.length; i++) {
                        CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//---------------------1
                        //   $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                        //  $('#StockistName')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_NAME"].toString());
                    }
                }
            });
        });

    });

    var SelectedState = ""; var Actual_SelectedState = ""; var Actual_SelectedTerritory = "";
    $('#State').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedState = "";
        var Clear_Territory = $('#TerriotryArea option').length;
        for (var i = 0; i < Clear_Territory; i++) {
            $('#TerriotryArea')[0].sumo.remove(0);
        }
        // var Clear_Cust = $('#StockistID option').length;
        //  for (var i = 0; i < Clear_Cust; i++) {
        //     $('#StockistID')[0].sumo.remove(0);
        //  }

        CustomerArray.length = 0;//------------------------------------2
        $('#CustomerCode').val("");

        if ($('#State').val() != null) {
            var seleState = $('#State').val();

            for (var k = 0; k < seleState.length; k++) {
                SelectedState += "'" + seleState[k] + "',";
                Actual_SelectedState += "'" + seleState[k] + "',";
            }
            SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
            Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 
        }

        var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
        $http({ url: '../../Home/GetTerritoriesforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
            if (res != "") {

                var dtTerritory = JSON.parse(res);
                for (var i = 0; i < dtTerritory.length; i++) {
                    $('#TerriotryArea')[0].sumo.add(dtTerritory[i]["TERRITORY_CODE"], dtTerritory[i]["TERRITORY_NAME"]);
                }
                //  ShowLoader();
                $http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        // ShowLoader();

                        var dtCust = JSON.parse(res);

                        for (var i = 0; i < dtCust.length; i++) {
                            // $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());

                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//---------------------3
                        }
                        HideLoader();
                    } else {
                        HideLoader();
                    }
                });
            }
            HideLoader();
        });

        if ($("#State").val() == null) {
            var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
            if ((SessionValue != "SH") && (SessionValue != "TM") && (SessionValue != "FSO") && (SessionValue != "FSO_BU2") && (SessionValue != "STOCKIST") && (SessionValue != "C&F")) {
                $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                    if (Cust_res != "") {
                        var dtCust = JSON.parse(Cust_res);
                        for (var i = 0; i < dtCust.length; i++) {
                            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                        }
                        HideLoader();
                    } else {
                        HideLoader();
                    }
                });
            }
            HideLoader();
        }
        SelectedState = "";
        // HideLoader();
    });

    var SelectedTerritory = "";
    $('#TerriotryArea').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedTerritory = ""; Actual_SelectedState = "";
        if ((SessionValue == "TM") || (SessionValue == "FSO") || (SessionValue == "FSO_BU2")) {
            if ($("#TerriotryArea").val() == null) {
                //  var Clear_Cust = $('#StockistID option').length;
                //  for (var i = 0; i < Clear_Cust; i++) {
                //      $('#StockistID')[0].sumo.remove(0);
                //  }
                CustomerArray.length = 0;//-------------------------------------4
                $('#CustomerCode').val("");

                HideLoader();
            } else if ($("#TerriotryArea").val() != null) {
                var seleTerritory = $('#TerriotryArea').val();
                for (var k = 0; k < seleTerritory.length; k++) {
                    SelectedTerritory += "'" + seleTerritory[k] + "',";
                    Actual_SelectedTerritory += "'" + seleTerritory[k] + "',";
                }
                SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTerritory = Actual_SelectedTerritory.substring(',', Actual_SelectedTerritory.length - 1);//Selected Territories with ' '. 

                var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                $http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {
                            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"], dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);//--------------------5
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            }
        } else {
            //  var Clear_Cust = $('#StockistID option').length;
            //  for (var i = 0; i < Clear_Cust; i++) {
            //   $('#StockistID')[0].sumo.remove(0);
            //   }
            CustomerArray.length = 0;//-------------------------------------6
            $('#CustomerCode').val("");

            if ($('#TerriotryArea').val() != null) {
                var seleTerritory = $('#TerriotryArea').val();
                for (var k = 0; k < seleTerritory.length; k++) {
                    SelectedTerritory += "'" + seleTerritory[k] + "',";
                    Actual_SelectedTerritory += "'" + seleTerritory[k] + "',";
                }
                SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTerritory = Actual_SelectedTerritory.substring(',', Actual_SelectedTerritory.length - 1);//Selected Territories with ' '. 
            }
            if ($("#TerriotryArea").val() == null) {
                var seleState = $('#State').val();

                for (var k = 0; k < seleState.length; k++) {
                    SelectedState += "'" + seleState[k] + "',";
                    Actual_SelectedState += "'" + seleState[k] + "',";
                }
                SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
                Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 

                var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
                $http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {
                            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//--------------7
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            } else {
                var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                $http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {
                            // $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"], dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);//-------------8
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            }
        }
        SelectedTerritory = "";
        SelectedState = "";
    });

    var Actual_SelectedPruduct = "";
    $('#ProductCategory').on('keyup change', function () {
        Actual_SelectedPruduct = "";
        var seleProduct = $('#ProductCategory').val();
        if (seleProduct != null) {
            for (var k = 0; k < seleProduct.length; k++) {
                Actual_SelectedPruduct += "'" + seleProduct[k].toUpperCase() + "',";
            }
            Actual_SelectedPruduct = Actual_SelectedPruduct.substring(',', Actual_SelectedPruduct.length - 1);//Selected States with ' '. 
        }
    });
    $('#CustomerCode').typeahead({
        source: CustomerArray
    });


    //var table1 = $('#DailyOrder').DataTable({
    //    scrollY: "200px",
    //    scrollX: true,
    //    scrollCollapse: true,
    //    paging: true,    
    //    fixedColumns: {
    //        leftColumns: 0
    //    }
    //});

    //var Data = JSON.stringify({
    //    MasterType: "SFDCDailyOrderList",
    //    ID: "2"
    //});

    $scope.GetDailyOrders = function () {
        var FromDate = $('#OrderFromDate').val();
        var ToDate = $('#OrderToDate').val();
        var ZoneValue = $('#Zone').val();
        var StateValue = $('#State').val();
        var TerritoryValue = $('#TerriotryArea').val();
        var isValidCustCode = isValidCode_Cust($("#CustomerCode").val(), CustomerArray);

        var UserRole = $('#SessionUserRole').val();


        if (FromDate == "" || FromDate == null) {
            alert("Please select from date");
        } else if (ToDate == "" || ToDate == null) {
            alert("Please select to date");
        } else if (SessionValue == "ZH" && ZoneValue == null) {
            alert("please select zone");
        }
        else if (SessionValue == "SH" && StateValue == null) {
            alert("please select state");
        } else if (SessionValue == "TM" && TerritoryValue == null) {
            alert("please select Territory");
        }
        else if ((SessionValue == "FSO" || SessionValue == "FSO_BU2") && TerritoryValue == null) {
            alert("please select Territory");
        }
        else if (($("#CustomerCode").val() != "") && (isValidCustCode == false)) {
            alert("Please select proper customer code");
        } else {
            ShowLoader();
            var DateRange = DateSplitter('OrderFromDate', 'OrderToDate');

            var WhereClause = "WHERE CDO.DIMS_ORDER_DATE BETWEEN " + DateRange + "";
            if ($("#CustomerCode").val() != "") {
                if (($("#CustomerCode").val() != "") && (isValidCustCode == false)) {
                } else {
                    WhereClause += " and CAST(CDO.CUSTOMER_CODE AS BIGINT) IN (" + $("#CustomerCode").val().split(':')[0] + ")";
                }
            } else if ($("#TerriotryArea").val() != null) {
                WhereClause += " and CAST(CDO.CUSTOMER_CODE AS BIGINT) IN (select DISTINCT ecc.CUSTOMER_CODE from cms_employee_customer_configuration ecc inner join CUSTOMER_SALES_VIEW csv on CAST(ecc.CUSTOMER_CODE AS BIGINT)=CAST(CDO.CUSTOMER_CODE AS BIGINT) where ecc.ORG_LEVEL_ID IN(" + Actual_SelectedTerritory + "))";
            } else if ($("#State").val() != null) {
                WhereClause += " and CM.STATE IN(" + Actual_SelectedState + ")";
            }
            else if ($("#Zone").val() != null) {
                WhereClause += " AND ZSM.ZONE_CODE IN(" + $("#Zone").val() + ")";
            }
            if ($('#ProductCategory').val() != null) {
                WhereClause += " AND UPPER(CDO.PRODUCT_CATEGORY_NAME) IN (" + Actual_SelectedPruduct + ")";
            }
            if (($("#Zone").val() == null) && ($("#State").val() == null) && ($("#TerriotryArea").val() == null) && ($("#CustomerCode").val() == "")) {
                WhereClause += " ";
            }

            WhereClause += " GROUP BY CDO.DIMS_ORDER_NO,CDO.DIMS_ORDER_DATE,CDO.CUSTOMER_CODE,CM.STOCKIST_NAME,CDO.RETAILER_CODE,EM.EMPLOYEE_NAME,CS.STATE_DESC,CM.CUSTOMER_DISTRICT,CDO.SALES_ORDER_NUMBER,CDO.ORDER_FROM,CDO.PRODUCT_CATEGORY_NAME";
            // WhereClause = "";
            var Data = JSON.stringify({
                MasterType: "DailyOrderTracking",
                ID: "561",
                UserCode: $("#UserCode").val(),
                "Type": "Get",
                ReportName: "DailyOrderTracking",
                WhereClause: WhereClause
            });

            DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
                var Result = JSON.parse(response.tabledata);

                if (Result != "") {
                    $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
                    if (Result.hasOwnProperty('UserListColumnNames')) {
                        var data1 = JSON.parse(Result["UserListColumnNames"]);

                        var selectedcolumnname = data1["ColumnNames"];

                        CustomColumnID = Result["UserListID"];
                        $('#undo_redo_to').empty();
                        var ColArray = new Array();
                        for (var i = 0; i < selectedcolumnname.length; i++) {


                            ColArray.push({
                                "data": selectedcolumnname[i],
                                "name": selectedcolumnname[i], "bSortable": true
                            });
                            $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                        }
                        //$scope.UserSelectedColumnName = ColArray;
                        UserSelectedColumnName = ColArray;
                    } else {

                        var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                        var selectedcolumnname = data1["ColumnNames"];

                        CustomColumnID = "0";

                        $('#undo_redo_to').empty();
                        var ColArray = new Array();
                        for (var i = 0; i < selectedcolumnname.length; i++) {
                            ColArray.push({
                                "data": selectedcolumnname[i],
                                "name": selectedcolumnname[i],
                                "bSortable": "true"
                            });
                            $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                        }
                        //$scope.UserSelectedColumnName = ColArray;
                        UserSelectedColumnName = ColArray;
                    }
                }
                ShowLoader();
                DIMSFactory.getReportData(Data).success(function (response) {
                    ShowLoader();
                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "DailyOrder", UserSelectedColumnName);
                    $('#DailyOrderTableId').show();
                    var table1 = $('#DailyOrder').DataTable();
                    $('#DailyOrder tbody').on('click', 'tr', function () {
                        // if (UserRole == "FSO" || UserRole == "STOCKIST") {
                        var d = table1.row(this).data()
                        var ID = $(this).find('td:eq(0)').text();
                        //  alert("id :" + ID);
                        //  alert("d :" + d[3]);
                        //   var ID = d[3];
                        //  var OrderFrom = $(this).find('td:eq(18)').text();
                        var OrderFrom = $(this).find('td:eq(13)').text();
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {
                            $("#DailyOrder").DataTable().$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                        if (ID != "") {
                            var scope = angular.element($("#AddOrdersDiv")).scope();
                            if (OrderFrom == "STOCKIST") {
                                scope.$apply(function () {
                                    scope.go("AddOrderForFSO/" + ID);
                                })
                            } else {
                                scope.$apply(function () {
                                    scope.go("AddOrder/" + ID);
                                })
                            }
                        }
                        // }
                    });
                });
            });
        }


    }





    //    DIMSSFDCFactory.getMasterData(Data).success(function (response) {
    //        $('#DailyOrder tbody').empty();

    //        var table1 = $('#DailyOrder').DataTable({
    //            scrollY: "200px",
    //            scrollX: true,
    //            scrollCollapse: true,
    //            paging: true,
    ////            "columnDefs": [
    ////            {
    ////                "targets": [0],
    ////                "visible": false
    ////            },
    ////            {
    ////                "targets": [1],
    ////                "visible": false
    ////            },
    ////            {
    ////                "targets": [2],
    ////                "visible": false
    ////            },
    ////{
    ////    "targets": [20],
    ////    "visible": false
    ////}
    ////            ],
    //            fixedColumns: {
    //                leftColumns: 0
    //            }
    //        });

    //        //$("#DailyOrder").DataTable({
    //        //    // "bScrollCollapse": true
    //        //});
    //        //jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');//--------
    //        var Result = JSON.parse(response.tabledata);

    //        for (var i = 0; i < Result.length; i++) {
    //            //var StockistID = Result[i]["CUSTOMER_CODE"];
    //            //var StockistIDexists = $('#StockistID option').filter(function () {
    //            //    return $(this).text() == StockistID;
    //            //}).length;


    //            //if ((Result[i]["CUSTOMER_CODE"] != "") && (StockistIDexists == 0)) {
    //            //    $('#StockistID')[0].sumo.add(Result[i]["CUSTOMER_CODE"], Result[i]["CUSTOMER_CODE"]);
    //            //}

    //            //var STOCKIST_NAME = Result[i]["STOCKIST_NAME"];
    //            //var StockistNameexists = $('#Stockistname option').filter(function () {
    //            //    return $(this).text() == STOCKIST_NAME;
    //            //}).length;


    //            //if ((Result[i]["STOCKIST_NAME"] != "") && (StockistNameexists == 0)) {
    //            //    $('#Stockistname')[0].sumo.add(Result[i]["CUSTOMER_CODE"], Result[i]["STOCKIST_NAME"]);
    //            //}

    //            //var PrdName = Result[i]["PRODUCT_CATEGORY_NAME"];
    //            //var PrdNameexists = $('#ProductCatg option').filter(function () {
    //            //    return $(this).text() == PrdName;
    //            //}).length;


    //            //if ((Result[i]["PRODUCT_CATEGORY_NAME"] != "") && (PrdNameexists == 0)) {
    //            //    $('#ProductCatg')[0].sumo.add(Result[i]["PRODUCT_CATEGORY_NAME"], Result[i]["PRODUCT_CATEGORY_NAME"]);
    //            //}

    //            //var Zone = Result[i]["ZONE_CODE"];
    //            //var Zoneexists = $('#Zone option').filter(function () {
    //            //    return $(this).val() == Zone;
    //            //}).length;

    //            //if ((Result[i]["ZONE_CODE"] != "") && (Zoneexists == 0)) {
    //            //    $('#Zone')[0].sumo.add(Result[i]["ZONE_CODE"], Result[i]["ZONE_NAME"]);
    //            //}

    //            //var State = Result[i]["STATE_CODE"];
    //            //var Stateexists = $('#State option').filter(function () {
    //            //    return $(this).val() == State;
    //            //}).length;
    //            //if ((Result[i]["STATE_CODE"] != "") && (Stateexists == 0)) {
    //            //    $('#State')[0].sumo.add(Result[i]["STATE_CODE"], Result[i]["STATE_DESC"]);
    //            //}

    //            //var District = Result[i]["DISTRICT"];
    //            //var Districtexists = $('#TerritoryArea option').filter(function () {
    //            //    return $(this).text() == District;
    //            //}).length;
    //            //if ((Result[i]["DISTRICT"] != "") && (Districtexists == 0)) {
    //            //    $('#TerritoryArea')[0].sumo.add(Result[i]["DISTRICT"], Result[i]["DISTRICT"]);
    //            //}

    //            //var SalesEmpName = Result[i]["SALES_EMPLOYEE_CODE"];
    //            //var SalesEmpNameexists = $('#EmapName option').filter(function () {
    //            //    return $(this).val() == SalesEmpName;
    //            //}).length;
    //            //if ((Result[i]["SALES_EMPLOYEE_CODE"] != "") && (SalesEmpNameexists == 0)) {
    //            //    $('#EmapName')[0].sumo.add(Result[i]["SALES_EMPLOYEE_CODE"], Result[i]["EMPLOYEE_NAME"]);
    //            //}

    //          //  $('#DailyOrder').dataTable().fnAddData([Result[i]["ZONE_CODE"], Result[i]["STATE_CODE"], Result[i]["SALES_EMPLOYEE_CODE"], Result[i]["DIMS_ORDER_NO"], Result[i]["ORDER_DATE"], Result[i]["CUSTOMER_CODE"], Result[i]["STOCKIST_NAME"], Result[i]["Ship to Party Code"], Result[i]["Ship to Party Name"], Result[i]["PRODUCT_CATEGORY_NAME"], Result[i]["SKU_SIZE"], Result[i]["UOM"], Result[i]["QUANTITY_NO_OF_SHEET"], Result[i]["QUANTITY_IN_METER"], Result[i]["QUANTITY_IN_METER"], Result[i]["EMPLOYEE_NAME"], Result[i]["STATE_DESC"], Result[i]["DISTRICT"], Result[i]["SALES_ORDER_NUMBER"], Result[i]["SALES_ORDER_STATUS"], Result[i]["ORDER_FROM"]]);
    //            $('#DailyOrder').dataTable().fnAddData([Result[i]["DIMS_ORDER_NO"], Result[i]["ORDER_DATE"], Result[i]["CUSTOMER_CODE"], Result[i]["STOCKIST_NAME"], Result[i]["Ship to Party Code"], Result[i]["Ship to Party Name"], Result[i]["PRODUCT_CATEGORY_NAME"], Result[i]["SKU_SIZE"], Result[i]["UOM"], Result[i]["QUANTITY_NO_OF_SHEET"], Result[i]["QUANTITY_IN_METER"], Result[i]["QUANTITY_IN_METER"], Result[i]["EMPLOYEE_NAME"], Result[i]["STATE_DESC"], Result[i]["DISTRICT"], Result[i]["SALES_ORDER_NUMBER"], Result[i]["SALES_ORDER_STATUS"]]);
    //        }

    //        $('#OrderFromDate').datepicker().on('changeDate', function (ev) {
    //            $("#OrderToDate").val("");
    //            table1.draw();
    //        });
    //        $('#OrderToDate').datepicker().on('changeDate', function (ev) {
    //            table1.draw();
    //        });

    //        //    $.fn.dataTableExt.afnFiltering.push(
    //        //    function (oSettings, aData, iDataIndex) {

    //        //        var iFini = document.getElementById('OrderFromDate').value;
    //        //        console.log("as :" + iFini);
    //        //        var iFfin = document.getElementById('OrderToDate').value;
    //        //        var iStartDateCol = 4;
    //        //        var iEndDateCol = 4;

    //        //        iFini = iFini.substring(6, 10) + iFini.substring(3, 5) + iFini.substring(0, 2);
    //        //        iFfin = iFfin.substring(6, 10) + iFfin.substring(3, 5) + iFfin.substring(0, 2);

    //        //        // alert(aData[iEndDateCol].substring(6, 10));
    //        //        var datofini = aData[iStartDateCol].substring(6, 10) + aData[iStartDateCol].substring(3, 5) + aData[iStartDateCol].substring(0, 2);
    //        //        var datoffin = aData[iEndDateCol].substring(6, 10) + aData[iEndDateCol].substring(3, 5) + aData[iEndDateCol].substring(0, 2);

    //        //        if (iFini === "" && iFfin === "") {
    //        //            return true;
    //        //        }
    //        //        else if (iFini <= datofini && iFfin === "") {
    //        //            return true;
    //        //        }
    //        //        else if (iFfin >= datoffin && iFini === "") {
    //        //            return true;
    //        //        }
    //        //        else if (iFini <= datofini && iFfin >= datoffin) {
    //        //            return true;
    //        //        }
    //        //        return false;
    //        //    }
    //        //);




    //        //var firstRowsHeght = 0;
    //        //for (var j = 0; j < 5; j++) {
    //        //    firstRowsHeght += $('#DailyOrder tr').eq(j).height();
    //        //}

    //        //   alert($('.dataTables_scroll table > tbody').html());
    //        //   $('.dataTables_scroll').css({ "max-height": '', 'overflow': '' });

    //        //  $('.dataTables_scroll table > tbody').css({ "max-height": firstRowsHeght, "overflow-y": "auto" });

    //        $('#DailyOrder tbody').on('click', 'tr', function () {
    //            var d = table1.row(this).data()
    //            var ID = $(this).find('td:eq(0)').text();
    //          //  alert("id :" + ID);
    //          //  alert("d :" + d[3]);
    //            var ID = d[3];
    //          //  var OrderFrom = $(this).find('td:eq(18)').text();
    //            var OrderFrom = d[20];         

    //            if ($(this).hasClass('selected')) {
    //                $(this).removeClass('selected');
    //            }
    //            else {
    //                $("#DailyOrder").DataTable().$('tr.selected').removeClass('selected');
    //                $(this).addClass('selected');
    //            }
    //            if (ID != "") {                
    //                var scope = angular.element($("#AddOrdersDiv")).scope();
    //                if (OrderFrom == "STOCKIST") {                   
    //                    scope.$apply(function () {
    //                        scope.go("AddOrderForFSO/" + ID);
    //                    })                    
    //                } else {                   
    //                    scope.$apply(function () {
    //                        scope.go("AddOrder/" + ID);
    //                    })
    //                }
    //            }
    //        });
    //    });
});


function isValidCode_Cust(code, ArrayValue) {
    return ($.inArray(code, ArrayValue) > -1);
}

DIMS.controller('JourneyPlanDetails', function ($scope, $location, DIMSSFDCFactory, $http, $routeParams, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Journey Plan Details" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    JourneyPlanScope = $scope;
    $scope.GetSalesDistrict = function () {
        var JsonData = JSON.stringify({
            "MasterType": "EmployeeSalesDistrict",
            "UserCode": $('#SessionUserCode').val(),
            "Role": $('#SessionUserRole').val()
        });
        DIMSSFDCFactory.getMasterData(JsonData).success(function (response) {
            if (response != "") {
                var Res = JSON.parse(response);
                $("#SalesDistric").empty();
                $("#SalesDistric").append($("<option></option>").val("").html("Select"));
                for (var j = 0; j < Res.length; j++) {
                    $("#SalesDistric").append($("<option></option>").val(Res[j]["CUSTOMER_DISTRICT"]).html(Res[j]["CUSTOMER_DISTRICT"]));
                }
            }
        });
    }
    var PresentStatus = "In Progress";
    var Res = "";
    angular.element(document).ready(function () {
        var width = $(window).width(), height = $(window).height();
        //var totalheight = height - 148;
        var totalheight = height - 191;
        if (height <= 800) {
            totalheight = height - 148;
        }
        $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
        $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
        $scope.JPDStatus = "In Progress";

        $('#JPDStatus').val("In Progress");
        ShowLoader();
        var Data = JSON.stringify({
            "LoginUserCode": $('#SessionUserCode').val(),
            "LoginUserRole": $('#SessionUserRole').val()
        });
        DIMSSFDCFactory.GetJPLogiOrgIds(Data).success(function (res) {
            if (res != "") {
                var Response = JSON.parse(res);
                $('#LoginUserOrgLevelId').val(Response[0]["ORG_LEVEL_ID"]);
            }
        });

        $scope.GetSalesDistrict();

        var EditId = $routeParams.ID;
        if (EditId == undefined || EditId == "") {
            EditId = 0;
            var UName = $('#LoginUsername').val();
            $scope.LoginUsername = UName;

            $('#JPSendApprove').css("pointer-events", "none");
            DIMSSFDCFactory.GetPresentDateAndTime().success(function (response) {//To get Present Date and time        
                var result = JSON.parse(response.tabledata);
                if (result == "") {
                }
                else {
                    $('#JPDCreatedDate').val(result);
                }
            });
            HideLoader();
        } else {
            //  ShowLoader();
            DIMSSFDCFactory.GetJourneyPlanDetailsforEdit(EditId).success(function (response) {
                var Data = JSON.parse(response);
                var HeaderData = Data["Header"];
                // $scope.LoginUsername = HeaderData[0]["SALES_EMPLOYEE"];
                $scope.LoginUsername = HeaderData[0]["JOURNEY_PLAN_NAME"];
                $scope.JPDMonth = HeaderData[0]["PLAN_FOR_MONTH"];
                $scope.JPDCreatedDate = HeaderData[0]["PLAN_CREATED_DATE"];


                $('#ActualVisit').val(HeaderData[0]["ACTUAL_VISIT_COUNT"]);                
                $('#VistPlaned').val(HeaderData[0]["VISIT_PLANED_COUNT"]);
               // $('#PlanedDistrictCount').val(HeaderData[0]["VISIT_PLANED_DISTRICT_COUNT"]);
              //  alert(HeaderData[0]["ACTUAL_VISIT_COUNT"]);
                $('#LoginUserParentId').val(HeaderData[0]["PARENT_ID"]);//Created JP parent Id
                var parentlevelId = $('#LoginUserParentId').val();

                var JPLoginOrgLevelId = $('#LoginUserOrgLevelId').val();
                console.log("parentlevelId :" + parentlevelId);
                console.log("JPLoginOrgLevelId :" + JPLoginOrgLevelId);
                setTimeout(function () {
                    if ((parentlevelId == JPLoginOrgLevelId) && (HeaderData[0]["STATUS"] != "In Progress")) {
                        $('#ParentJPDStatus').empty();
                        var StatusHtml = '<select class="form-control" id="JPDStatus" data-ng-model="JPDStatus">';
                        StatusHtml += '<option value="">Select</option>';
                        StatusHtml += '<option value="In Progress">In Progress</option>';
                        StatusHtml += '<option value="Waiting for Approval" disabled=disabled>Waiting for Approval</option>';
                        StatusHtml += '<option value="Approved">Approved</option>';
                        StatusHtml += '<option value="Reject">Reject</option>';
                        StatusHtml += '</select>';
                        $('#ParentJPDStatus').append(StatusHtml);
                        $('#JPSendApprove').hide();
                    }
                    $('#JPDStatus').val(HeaderData[0]["STATUS"]);
                    $scope.JPDStatus = HeaderData[0]["STATUS"];
                    PresentStatus = HeaderData[0]["STATUS"];
                }, 10);





                Res = HeaderData[0]["TOTAL_NO_OF_DAYS_IN_MONTH"];
                NoofDaysInmonth = Res;
                var StockistDetails = Data["StockistTable"];
                var StockistPlanedDates = Data["StockistDates"];
                var PlanedDates = Data["PlanedDates"];
                var SelectedMonth = HeaderData[0]["PLAN_FOR_MONTH"];


                $("#JPDTableHead").empty();
                //$('#JPDTable').dataTable().clear().draw();
                var Html = "";
                Html += "<tr>";
                Html += "<th rowspan='2' data-bSortable='true'>Customer Code</th>";
                Html += "<th rowspan='2' data-bSortable='true'>Customer Name</th>";
                Html += "<th rowspan='2' data-bSortable='true'>Customer Type</th>";
                Html += "<th rowspan='2' data-bSortable='true'>Sales Region</th>";
                Html += "<th rowspan='2' data-bSortable='true'>Sales District</th>";
                Html += "<th rowspan='2' data-bSortable='true'>Last Year Same Month (MT)</th>";
                Html += "<th rowspan='2' data-bSortable='true'>Last Three Months Average (MT)</th>";
                Html += "<th rowspan='2' data-bSortable='true'>Volume Plan for Month (MT)</th>";
                Html += "<th rowspan='2' data-bSortable='true'>Actual Volume MTD (MT)</th>";
                Html += "<th rowspan='2' data-bSortable='true'>No of days in Month</th>";
                Html += "<th rowspan='2' data-bSortable='true'>Last Order Date</th>";
                Html += "<th rowspan='2' data-bSortable='true'>Expected Date for Next Order</th>";
                // Html += "<th colspan=" + Res + ">" + $scope.JPDMonth + "</th>";

                //$('#GetDetails').data('res', Res);
                //Html += "</tr>";
                //Html += "<tr>";
                //for (var i = 1; i <= Res; i++) {
                //    Html += "<th>" + i + "</th>";
                //}
                //Html += "</tr>";


                var MonthName = $scope.JPDMonth.split('-');
                for (var i = 1; i <= Res; i++) {
                    if (i.toString().length < 2)
                        i = "0" + i;
                    Html += "<th colspan='2' style='text-align:center;'>" + MonthName[0] + "-" + i + "</th>";
                }
                $('#GetDetails').data('res', Res);
                Html += "</tr>";

                Html += "<tr>";
                for (var i = 1; i <= Res; i++) {
                    Html += "<th style='text-align:center;'>Planned</th>";
                    Html += "<th style='text-align:center;'>Actual</th>";
                }
                Html += "</tr>";

                HtmlBody = "";
                for (var i = 0; i < StockistDetails.length; i++) {
                    HtmlBody += "<tr>";
                    HtmlBody += "<td style='text-align:right;'>" + StockistDetails[i]["CUSTOMER_CODE"] + "</td>";
                    HtmlBody += "<td style='text-align:left;'>" + StockistDetails[i]["CUSTOMER_NAME"] + "</td>";
                    HtmlBody += "<td style='text-align:left;'>" + StockistDetails[i]["CUSTOMER_TYPE"] + "</td>";
                    HtmlBody += "<td style='text-align:left;'>" + StockistDetails[i]["STATE_DESC"] + "</td>";
                    HtmlBody += "<td style='text-align:left;'>" + StockistDetails[i]["SALES_DISTRICT"] + "</td>";
                    HtmlBody += "<td style='text-align:right;'>" + StockistDetails[i]["LAST_YEAR_SAME_MONTH_AVG"] + "</td>";
                    HtmlBody += "<td style='text-align:right;'>" + StockistDetails[i]["LAST_QUARTER_MONTH_AVG"] + "</td>";
                    HtmlBody += "<td style='text-align:right;'>" + StockistDetails[i]["VOLUME_PLAN_FOR_MONTH"] + "</td>";
                    HtmlBody += "<td style='text-align:right;'>" + StockistDetails[i]["ACTUAL_VOLUME_MTD"] + "</td>";
                    HtmlBody += "<td style='text-align:right;'>" + StockistDetails[i]["NO_OF_DAYS_IN_MONTH"] + "</td>";
                    HtmlBody += "<td style='text-align:right;'>" + StockistDetails[i]["LAST_ORDER_DATE"] + "</td>";
                    HtmlBody += "<td style='text-align:right;'>" + StockistDetails[i]["NEXT_ORDER_DATE"] + "</td>";



                    for (var l = 0; l < Res; l++) {
                        var j = parseInt(l + 1);
                        HtmlBody += "<td class='Planed" + j + "' style='text-align:center;'>" + "<input type='checkbox' name='Planed' data-dist='" + StockistDetails[i]["SALES_DISTRICT"] + "' class='Planed' id='" + StockistDetails[i]["CUSTOMER_CODE"] + "_" + SelectedMonth + "_" + j + "'/>" + "</td>";
                        HtmlBody += "<td class='Actual" + j + "' style='text-align:center;'>" + "<input type='checkbox' name='Actual' class='Actual' data-dist='" + StockistDetails[i]["SALES_DISTRICT"] + "' id='" + StockistDetails[i]["CUSTOMER_CODE"] + "_" + SelectedMonth + "_" + "Actual" + "_" + j + "' disabled=disabled />" + "</td>";
                    }

                    HtmlBody += "</tr>";
                }

                Htmlfoot = "<tr>";
                Htmlfoot += "<th colspan='7' style='text-align: left'>TOTAL:</th>";
                Htmlfoot += "<th>0</th>";
                Htmlfoot += "<th>0</th>";

                Htmlfoot += "<th colspan='3' style='text-align: left'>TOTAL:</th>";
                for (var i = 1; i <= Res; i++) {
                    Htmlfoot += "<th class='Planed_Foot" + i + "' style='text-align:right;'>0</th>";
                    Htmlfoot += "<th class='Actual_Foot" + i + "' style='text-align:right;'>0</th>";
                }
                Htmlfoot += "</tr>";
                Htmlfoot += "<tr>";
                Htmlfoot += "<th colspan='12' style='text-align: left;'>Sum of District:</th>";
                for (var i = 1; i <= Res; i++) {
                    Htmlfoot += "<th class='Planed_District" + i + "' style='text-align:right;'>0</th>";
                    Htmlfoot += "<th class='Actual_District" + i + "' style='text-align:right;'>0</th>";
                }
                Htmlfoot += "</tr>";

                $('#JPDTable > tbody').append(HtmlBody);
                $('#JPDTableHead').append(Html);
                $('#JPDTTableFoot').empty();
                $('#JPDTTableFoot').append(Htmlfoot);


                PrepareDatatable();

                for (var k = 0; k < StockistPlanedDates.length; k++) {
                    // $("#" + StockistPlanedDates[k]["PLANED_VISITING_DATE"]).prop('checked', true);
                    $("#" + StockistPlanedDates[k]["ACTUAL_VISITING_DATE"]).prop('checked', true);
                    // $("#" + StockistPlanedDates[k]["Journeyplan_Actual_Id"]).prop('checked', true);
                    // $("#" + StockistPlanedDates[k]["JP_COUNTERDETAILS_ID"]).prop('checked', true);
                }

                for (var k = 0; k < PlanedDates.length; k++) {
                    $("#" + PlanedDates[k]["PLANED_VISITING_DATE"]).prop('checked', true);
                }

                //$('#JPDTable').find('input[type="checkbox"]:checked').each(function () {
                //    var ParentClassname = $(this).parent().attr('class');
                //    var totalSeen = 0;
                //    var PlannedDistrict1 = new Array();
                //    var dynamicid = $(this).attr('id');

                //    if (dynamicid.indexOf('NEW_') > -1) {
                //        dynamicid = dynamicid.replace("NEW_", "ABC");
                //    }


                //    $("." + ParentClassname + " input:checked").each(function () {
                //        totalSeen++;

                //        if ($.inArray($(this).attr('data-dist'), PlannedDistrict1) == -1)
                //            PlannedDistrict1.push($(this).attr('data-dist'));
                //    });
                //    $(".Planed_Foot" + dynamicid.split('_')[2]).html(totalSeen);

                //    $(".Planed_District" + dynamicid.split('_')[2]).html(PlannedDistrict1.length);

                //    if (ParentClassname.indexOf('Actual') > -1) {
                //        $(".Actual_Foot" + dynamicid.split('_')[3]).html(totalSeen);



                //        $(".Actual_District" + dynamicid.split('_')[3]).html(PlannedDistrict1.length);
                //    } else {

                //    }




                //    var planedcount = 0;
                //    var ActualPlanedCount = 0;
                //    var planeddistrictcount = 0;
                //    var Actualdistrictcount = 0;
                //    for (var i = 1; i <= NoofDaysInmonth; i++) {
                //        $("#JPDTable .Planed_Foot" + i).each(function () {
                //            planedcount += parseInt($(this).text());
                //        });
                //        $("#JPDTable .Actual_Foot" + i).each(function () {
                //            ActualPlanedCount += parseInt($(this).text());
                //        });

                //        $("#JPDTable .Planed_District" + i).each(function () {
                //            planeddistrictcount += parseInt($(this).text());
                //        });

                //        $("#JPDTable .Actual_District" + i).each(function () {
                //            Actualdistrictcount += parseInt($(this).text());
                //        });
                //    }
                //   // alert(planedcount);
                //    $('#VistPlaned').val(planedcount);
                //    $('#ActualVisit').val(ActualPlanedCount);
                //    $('#PlanedDistrictCount').val(planeddistrictcount);
                //    $('#ActualDistrictCount').val(Actualdistrictcount);
                //});


                if ((HeaderData[0]["STATUS"] != "In Progress") && (parentlevelId != JPLoginOrgLevelId)) {
                    $('#NewCounterPrioritization').attr("disabled", true);
                    $('input[type=checkbox]').attr("disabled", true);
                    $('#SaveJP').css("pointer-events", "none");
                    $('#JPSendApprove').css("pointer-events", "none");
                }

                if ((HeaderData[0]["STATUS"] == "In Progress") && (parentlevelId == JPLoginOrgLevelId)) {
                    $('#NewCounterPrioritization').attr("disabled", true);
                    $('input[type=checkbox]').attr("disabled", true);
                    $('#SaveJP').css("pointer-events", "none");
                    $('#JPSendApprove').css("pointer-events", "none");
                } else if (((HeaderData[0]["STATUS"] == "Approved") || (HeaderData[0]["STATUS"] == "Reject")) && (parentlevelId == JPLoginOrgLevelId)) {
                    $('#NewCounterPrioritization').attr("disabled", true);
                    $('input[type=checkbox]').attr("disabled", true);
                    $('#JPSendApprove').css("pointer-events", "none");
                } else { }

                HideLoader();
            });
            $('#LoginUsername').attr("disabled", true);
            $('#JPDMonth').attr("disabled", true);
        }
    });

    $scope.SaveJourneyPlanDetails = function () {
        var EditId = $routeParams.ID;
        if (EditId == "" || EditId == undefined) {
            EditId = "0";
        }
        var LoginUserName = $scope.LoginUsername;
        var selectedmonth = $scope.JPDMonth;
        var CreatedDateTime = $('#JPDCreatedDate').val();

        var Status = $('#JPDStatus').val();
        Status = "";
        var parentlevelId = $('#LoginUserParentId').val();
        var JPLoginOrgLevelId = $('#LoginUserOrgLevelId').val();
        if ((parentlevelId == JPLoginOrgLevelId) && (PresentStatus != "In Progress")) {
            Status = $('#JPDStatus option:selected').val();
        }

        if (parentlevelId != JPLoginOrgLevelId) {
            Status = $('#JPDStatus').val();
        }

        //Status = $scope.JPDStatus;        

        //alert(PresentStatus);       
        var PlanDetails = new Array();
        var checkboxchecked = new Array();
        var Actualcheckboxchecked = new Array();
        var TotalCheckBoxCount = "";
        var TotalUnCheckBoxCount = "";
        var LineStockistNameforValidation = "";
        var UserRole = $('#SessionUserRole').val();
        var LoginUserCode = $('#SessionUserCode').val();



        var tablelength = $('#JPDTable > tbody > tr').length;
        var tabletext = $('#JPDTable tbody tr td').text();


        //$('#JPDTable tr').filter(':has(:checkbox:checked)').find('td').each(function () {
        //    // this = td element

        //});
        var count = 0;
        var countA = 0;
        $('#JPDTable tbody tr').each(function () {


            var $tds = $(this).find('td');
            var hdn = $(this).find('input[name^="Planed"]');
            count = $(this).find(':checkbox:checked').length;
            hdn.val(count);


            var $tdsA = $(this).find('td');
            var hdnA = $(this).find('input[name^="Actual"]');
            countA = $(this).find(':checkbox:checked').length;
            hdnA.val(countA);


            //TotalCheckBoxCount = $(this).find('td').find('input:checkbox').hasClass('Planed').length;
            //TotalUnCheckBoxCount = $(this).find('td').find('input:checkbox:not(:checked)').hasClass('Planed').length;

            //if (TotalCheckBoxCount == TotalUnCheckBoxCount) {
            //    LineStockistNameforValidation += $tds.eq(0).text() + ",";
            //} else {
            //    LineStockistNameforValidation = "";
            //}


            if (count != 0 || countA != 0) {
                $(this).find('input[name^="Planed"]:checked').each(function () {
                    // checkboxchecked = new Array();
                    var Id = $(this).attr('id');
                    var PlanedCustDist = $(this).attr('data-dist');
                    checkboxchecked.push({
                        checkboxcheckedId: Id,
                        PlanedCustDist: PlanedCustDist
                    });
                });

                $(this).find('input[name^="Actual"]:checked').each(function () {
                    //  Actualcheckboxchecked = new Array();
                    var Id1 = $(this).attr('id');
                    var CustomerDistrict = $(this).attr('data-dist');
                    Actualcheckboxchecked.push({
                        ActualcheckboxcheckedId: Id1,
                        CustomerDistrict: CustomerDistrict
                    });
                });

                PlanDetails.push({
                    CustomerCode: $tds.eq(0).text(),
                    CusomerName: $tds.eq(1).text(),
                    CustomerType: $tds.eq(2).text(),
                    SalesRegion: $tds.eq(3).text(),
                    SalesDistrict: $tds.eq(4).text(),
                    LastYearSameMonth: $tds.eq(5).text(),
                    LastYearQuarterMonth: $tds.eq(6).text(),
                    VolumePlanforMont: $tds.eq(7).text(),
                    ActualVolumeMTD: $tds.eq(8).text(),
                    NoofDaysinMonth: $tds.eq(9).text(),
                    LastOrderDate: $tds.eq(10).text(),
                    ExceptedDateforNextorder: $tds.eq(11).text(),
                    checkboxcheckedId: checkboxchecked,
                    ActualcheckboxcheckedId: Actualcheckboxchecked
                });
            }

        });

        if (selectedmonth == "" || selectedmonth == null) {
            alert("Please Select Month for Plan");
        }
        else if (Status == "" || Status == null) {
            alert("Please Select Status");
        }
        else if (tabletext == "No data available in table") {
            alert("Please Add Stockist Details");
        }
        else if (count == 0 && PlanDetails.length == 0) {
            alert("Please select atleast one date for customers");
        }
            //else if ($('#JPDTable').dataTable().fnSettings().aoData.length == 0) {
            //    alert("Please Add Stockist Details");
            //}
            //else if (LineStockistNameforValidation != "") {
            //    alert("Please Select atleast one date for " + LineStockistNameforValidation);
            //}
        else {
            if (PresentStatus != Status) {
                if (confirm("Are you sure,you want to change status")) {
                    ShowLoader();
                    var TotalPlanData = JSON.stringify({
                        "EditId": EditId,
                        "LoginUserName": LoginUserName,
                        "LoginUserCode": LoginUserCode,
                        "selectedmonth": selectedmonth,
                        "CreatedDateTime": CreatedDateTime,
                        "VistPlaned": $('#VistPlaned').val(),//total visit planed checkbox count
                        "ActualVisit": $('#ActualVisit').val(),//total actual checkbox count
                        "VisitPlanedDistrict": $('#PlanedDistrictCount').val(),//total sum planed of distinct district count
                        "ActualDistrict": $('#ActualDistrictCount').val(),//total sum actual of distinct district count
                        "UserRole": UserRole,
                        "Status": Status,
                        "PlanDetails": PlanDetails//child table data with checkbox id
                    });
                    DIMSSFDCFactory.SaveJourneyPlan(TotalPlanData).success(function (response) {
                        HideLoader();
                        if (response == "Save") {
                            if (parentlevelId == JPLoginOrgLevelId) {
                                if (Status == "Waiting for Approval") {
                                    alert("Saved successfully");
                                } else {
                                    alert("" + Status + " Successfully");
                                }
                            } else {
                                alert("Saved successfully");
                            }
                            $scope.go('JourneyPlanList');
                        } else if (response == "Fail") {
                            alert("Error Occured while Saving");
                        } else if (response == "Update") {
                            alert("Update Successfully");
                            $scope.go('JourneyPlanList');
                        } else if (response == "UpdateFail") {
                            alert("Error Occured while Update");
                        } else {
                            alert(response);
                        }
                    });
                }
            } else {
                ShowLoader();
                var TotalPlanData = JSON.stringify({
                    "EditId": EditId,
                    "LoginUserName": LoginUserName,
                    "LoginUserCode": LoginUserCode,
                    "selectedmonth": selectedmonth,
                    "CreatedDateTime": CreatedDateTime,
                    "VistPlaned": $('#VistPlaned').val(),//total visit planed checkbox count
                    "ActualVisit": $('#ActualVisit').val(),//total actual checkbox count
                    "VisitPlanedDistrict": $('#PlanedDistrictCount').val(),//total sum planed of distinct district count
                    "ActualDistrict": $('#ActualDistrictCount').val(),//total sum actual of distinct district count
                    "UserRole": UserRole,
                    "Status": Status,
                    "PlanDetails": PlanDetails//child table data with checkbox id
                });
                DIMSSFDCFactory.SaveJourneyPlan(TotalPlanData).success(function (response) {
                    HideLoader();
                    if (response == "Save") {
                        if (parentlevelId == JPLoginOrgLevelId) {
                            if (Status == "Waiting for Approval") {
                                alert("Saved successfully");
                            } else {
                                alert("" + Status + " Successfully");
                            }
                        } else {
                            alert("Saved successfully");
                        }
                        $scope.go('JourneyPlanList');
                    } else if (response == "Fail") {
                        alert("Error Occured while Saving");
                    } else if (response == "Update") {
                        alert("Update Successfully");
                        $scope.go('JourneyPlanList');
                    } else if (response == "UpdateFail") {
                        alert("Error Occured while Update");
                    } else {
                        alert(response);
                    }
                });
            }
        }

    }

    $scope.GetStockistdata = function (Methodname, MasterType, Heading) {
        var JsonData = JSON.stringify({
            "MasterType": MasterType,
            "UserCode": $('#SessionUserCode').val(),
            "Role": $('#SessionUserRole').val()
        });
        DIMSSFDCFactory.getMasterData(JsonData).success(function (response) {
            getLookUpData(response, Methodname, Heading);
        });
    }

    angular.element(document).on("change", 'input[type=checkbox]', function () {        
        $('#VistPlaned').val($('.Planed:checked').length);
    });
    //angular.element(document).on("change", 'input[type=checkbox]', function () {

    //    var PlannedDistrict1 = new Array();

    //    var ParentClassname = $(this).parent().attr('class');

    //    var dynamicid = $(this).attr('id');
    //    if (dynamicid.indexOf('NEW_') > -1) {
    //        dynamicid = dynamicid.replace("NEW_", "ABC");
    //    }
    //    // alert(ParentClassname);

    //    var totalSeen = 0;
    //    $("." + ParentClassname + " input:checked").each(function () {
    //        totalSeen++;
    //        if ($.inArray($(this).attr('data-dist'), PlannedDistrict1) == -1)
    //            PlannedDistrict1.push($(this).attr('data-dist'));
    //    });

    //    $(".Planed_Foot" + dynamicid.split('_')[2]).html(totalSeen);
    //    $(".Planed_District" + dynamicid.split('_')[2]).html(PlannedDistrict1.length);

    //    if (ParentClassname.indexOf('Actual') > -1) {
    //        $(".Actual_Foot" + dynamicid.split('_')[3]).html(totalSeen);
    //        $(".Actual_District" + dynamicid.split('_')[3]).html(PlannedDistrict1.length);
    //    } else {

    //    }
    //    var planedcount = 0;
    //    var ActualPlanedCount = 0;
    //    var planeddistrictcount = 0;
    //    var Actualdistrictcount = 0;

    //    for (var i = 1; i <= NoofDaysInmonth; i++) {
    //        $("#JPDTable .Planed_Foot" + i).each(function () {
    //            planedcount += parseInt($(this).text());
    //        });
    //        $("#JPDTable .Actual_Foot" + i).each(function () {
    //            ActualPlanedCount += parseInt($(this).text());
    //        });

    //        $("#JPDTable .Planed_District" + i).each(function () {
    //            planeddistrictcount += parseInt($(this).text());
    //        });

    //        $("#JPDTable .Actual_District" + i).each(function () {
    //            Actualdistrictcount += parseInt($(this).text());
    //        });
    //    }

    //    $('#VistPlaned').val(planedcount);
    //    $('#ActualVisit').val(ActualPlanedCount);
    //    $('#PlanedDistrictCount').val(planeddistrictcount);
    //    $('#ActualDistrictCount').val(Actualdistrictcount);
    //});

    $scope.SendForApproval = function () {
        var PresentStatus = $('#JPDStatus').val();
        var JourneyPlanName = $('#LoginUsername').val();
        var planformonth = $('#JPDMonth').val();
        var JPparentlevelId = $('#LoginUserParentId').val();
        var LoginOrgLevelId = $('#LoginUserOrgLevelId').val();

        //if (JPparentlevelId != LoginOrgLevelId) {
        //    alert("you're not eligible to approve this Journey plan");
        //} else {
        if (PresentStatus == "In Progress") {
            ShowLoader();
            PresentStatus = "Waiting for Approval";
            var jsondata = JSON.stringify({
                "Status": PresentStatus,
                "PlanName": JourneyPlanName,
                "UserCode": $('#SessionUserCode').val(),
                "UserRole": $('#SessionUserRole').val(),
                "Planformonth": planformonth
            });
            DIMSSFDCFactory.UpdateJourneyPlanStatus(jsondata).success(function (res) {
                HideLoader();
                if (res == "Update") {
                    alert("Sent for Approval Successfully");
                    $scope.go('JourneyPlanList');
                } else if (res == "Error") {
                    alert("Something went wrong")
                } else {
                    alert(res);
                }
            });
        } else {
            alert("you're not eligible to send for approval");
        }
    }

    $scope.MakeApprovedJP = function () {
        var JPparentlevelId = $('#LoginUserParentId').val();
        var LoginOrgLevelId = $('#LoginUserOrgLevelId').val();
        var JPStatus = $('#JPDStatus option:selected').val();

        var PlanName = $('#LoginUsername').val();
        var planformonth = $('#JPDMonth').val();

        if (JPparentlevelId != LoginOrgLevelId) {
            alert("you're not eligible to approve this Journey plan");
        } else {
            if (confirm("Are you sure,you want to change status")) {
                ShowLoader();
                var jsondata = JSON.stringify({
                    "UserCode": $('#SessionUserCode').val(),
                    "UserRole": $('#SessionUserRole').val(),
                    "Planformonth": planformonth,
                    "Status": JPStatus,
                    "PlanName": PlanName
                });
                DIMSSFDCFactory.UpdateJourneyPlanStatus(jsondata).success(function (res) {
                    HideLoader();
                    if (res == "Update") {
                        alert("" + JPStatus + " Successfully");
                        $scope.go('JourneyPlanList');
                    } else if (res == "Error") {
                        alert("Something went wrong")
                    } else {
                        alert(res);
                    }
                });
            }


            // $('#myModal_ApproveReject').modal('show');
        }
    }

    function GetSumRowValues() {
        var planedcount = 0;
        for (var i = 1; i < Res; i++) {
            $(".Planed_Foot" + i).each(function () {
                alert($(this).text());
            });
        }
    }

});

DIMS.controller('JourneyPlanList', function ($scope, $location, DIMSSFDCFactory, $http, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Journey Plan List" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    $('#JourneyPlanTableId').hide();
    var width = $(window).width(), height = $(window).height();//---------

    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });//-----------


    var data_value = ""; var all_zones = ""; var all_states = ""; var all_territories = ""; var all_customers = ""; var CustomerArray = new Array();
    ShowLoader();
    if ((SessionValue == "ZH") || (SessionValue == "RCC") || (SessionValue == "ZSC")) {
        $("#Zone").attr("disabled", false); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                if (FilterList.dtZone.length == 0) {
                    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterList.dtZone.length - 1) {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            $('select#Zone')[0].sumo.selectItem(0);
            $('#Zone').trigger("change");
            //all_states = "";
            //for (var i = 0; i < FilterList.dtState.length; i++) {
            //    if (FilterList.dtState.length == 0) {
            //        all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else if (i == FilterList.dtState.length - 1) {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
            //    }
            //}
            //all_territories = "";
            //for (var i = 0; i < FilterList.dtTerritory.length; i++) {
            //    if (FilterList.dtTerritory.length == 0) {
            //        all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else if (i == FilterList.dtTerritory.length - 1) {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
            //    }
            //}
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            //$('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            //}
        });
    } else if (SessionValue == "SH") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            $('#State').trigger("change");
            //all_territories = "";
            //for (var i = 0; i < FilterList.dtTerritory.length; i++) {
            //    if (FilterList.dtTerritory.length == 0) {
            //        all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else if (i == FilterList.dtTerritory.length - 1) {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
            //    }
            //}
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            // }
        });
    }

    else if (SessionValue == "TM") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + "TM" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            //all_customers = "";
            // for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            //}
        });
    }

    else if (SessionValue == "FSO" || SessionValue == "FSO_BU2") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        if (SessionValue == "FSO") {
            data_value = "{\"Role\":\"" + "FSO" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        } else {
            data_value = "{\"Role\":\"" + "FSO_BU2" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        }
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            $('select#TerriotryArea')[0].sumo.selectItem(0);
            $('#TerriotryArea').trigger("change");
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            // }
        });
    }

    else if ((SessionValue == "STOCKIST") || (SessionValue == "C&F")) {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", true); $('#CustomerCode').attr("disabled", true); $('#CustomerCode').css({ "class": "gray" });// $("#StockistID").attr("disabled", true);

        data_value = "{\"Role\":\"" + "STOCKIST" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            $('select#TerriotryArea')[0].sumo.selectItem(0);
            //all_customers = "";
            for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                CustomerArray.push(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                $('#CustomerCode').val(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                //if (FilterList.dtCustomer.length == 0) {
                //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
                //} else if (i == FilterList.dtCustomer.length - 1) {
                //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
                //} else {
                //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
                //}
            }
            $("#CustomerCode").typeahead({
                source: CustomerArray
            });
            // $('select#StockistID')[0].sumo.selectItem(0);
        });
    } else {
        $("#Zone").attr("disabled", false); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + SessionValue + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                if (FilterList.dtZone.length == 0) {
                    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterList.dtZone.length - 1) {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            CustomerArray.length = 0;
            $("#CustomerCode").val("");
            if (FilterList.dtCustomer.length > 0) {
                for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                    CustomerArray.push(FilterList.dtCustomer[i]["STOCKIST_ID"].toString() + ":" + FilterList.dtCustomer[i]["STOCKIST_NAME"].toString());
                }
            }
        });

    }
    HideLoader();
    $('#Zone').on('keyup change', function () {
        ShowLoader();
        var Clear_State = $('#State option').length;
        for (var i = 0; i < Clear_State; i++) {
            $('#State')[0].sumo.remove(0);
        }

        //   var Clear_Cust = $('#StockistID option').length;
        //  for (var i = 0; i < Clear_Cust; i++) {
        //      $('#StockistID')[0].sumo.remove(0);
        // }
        CustomerArray.length = 0;//---------------------------9
        $('#CustomerCode').val("");

        var Clear_Terrytory = $('#TerriotryArea option').length;
        for (var i = 0; i < Clear_Terrytory; i++) {
            $('#TerriotryArea')[0].sumo.remove(0);
        }

        var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
        $http({ url: '../../Home/GetStatesforZone', method: 'POST', data: { Data: data_value } }).success(function (res) {
            if (res != "") {
                var dtState = JSON.parse(res);
                for (var i = 0; i < dtState.length; i++) {
                    $('#State')[0].sumo.add(dtState[i]["STATE_CODE"], dtState[i]["STATE_NAME"]);
                }
                HideLoader();
            } else { HideLoader(); }

            $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                if (Cust_res != "") {
                    var dtCust = JSON.parse(Cust_res);
                    for (var i = 0; i < dtCust.length; i++) {
                        CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//---------------------1
                        //   $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                        //  $('#StockistName')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_NAME"].toString());
                    }
                }
            });
        });

    });

    var SelectedState = ""; var Actual_SelectedState = ""; var Actual_SelectedTeritory = "";
    $('#State').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedState = "";
        var Clear_Territory = $('#TerriotryArea option').length;
        for (var i = 0; i < Clear_Territory; i++) {
            $('#TerriotryArea')[0].sumo.remove(0);
        }
        // var Clear_Cust = $('#StockistID option').length;
        //  for (var i = 0; i < Clear_Cust; i++) {
        //     $('#StockistID')[0].sumo.remove(0);
        //  }

        CustomerArray.length = 0;//------------------------------------2
        $('#CustomerCode').val("");

        if ($('#State').val() != null) {
            var seleState = $('#State').val();

            for (var k = 0; k < seleState.length; k++) {
                SelectedState += "'" + seleState[k] + "',";
                Actual_SelectedState += "'" + seleState[k] + "',";
            }
            SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
            Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 
        }

        var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
        $http({ url: '../../Home/GetTerritoriesforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
            if (res != "") {

                var dtTerritory = JSON.parse(res);
                for (var i = 0; i < dtTerritory.length; i++) {
                    $('#TerriotryArea')[0].sumo.add(dtTerritory[i]["TERRITORY_CODE"], dtTerritory[i]["TERRITORY_NAME"]);
                }
                //  ShowLoader();
                $http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        // ShowLoader();

                        var dtCust = JSON.parse(res);

                        for (var i = 0; i < dtCust.length; i++) {
                            // $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());

                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//---------------------3
                        }
                        HideLoader();
                    } else {
                        HideLoader();
                    }
                });
            }
            HideLoader();
        });

        if ($("#State").val() == null) {
            var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
            if ((SessionValue != "SH") && (SessionValue != "TM") && (SessionValue != "FSO") && (SessionValue != "FSO_BU2") && (SessionValue != "STOCKIST") && (SessionValue != "C&F")) {
                $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                    if (Cust_res != "") {
                        var dtCust = JSON.parse(Cust_res);
                        for (var i = 0; i < dtCust.length; i++) {
                            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                        }
                        HideLoader();
                    } else {
                        HideLoader();
                    }
                });
            }
            HideLoader();
        }
        SelectedState = "";
        // HideLoader();
    });

    var SelectedTerritory = "";
    $('#TerriotryArea').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedTeritory = ""; Actual_SelectedState = "";
        if ((SessionValue == "TM") || (SessionValue == "FSO") || (SessionValue == "FSO_BU2")) {
            if ($("#TerriotryArea").val() == null) {
                //  var Clear_Cust = $('#StockistID option').length;
                //  for (var i = 0; i < Clear_Cust; i++) {
                //      $('#StockistID')[0].sumo.remove(0);
                //  }
                //   CustomerArray.length = 0;//-------------------------------------4
                //  $('#CustomerCode').val("");

                HideLoader();
            } else if ($("#TerriotryArea").val() != null) {
                var seleTerritory = $('#TerriotryArea').val();
                for (var k = 0; k < seleTerritory.length; k++) {
                    SelectedTerritory += "'" + seleTerritory[k] + "',";
                    Actual_SelectedTeritory += "'" + seleTerritory[k] + "',";
                }
                SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTeritory = Actual_SelectedTeritory.substring(',', Actual_SelectedTeritory.length - 1);//Selected Territories with ' '. 
                HideLoader();
                //var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                //$http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                //    if (res != "") {
                //        var dtCust = JSON.parse(res);
                //        for (var i = 0; i < dtCust.length; i++) {
                //            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"], dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);
                //            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);//--------------------5
                //        }
                //        HideLoader();
                //    } else { HideLoader(); }
                // });
            }
        } else {
            //  var Clear_Cust = $('#StockistID option').length;
            //  for (var i = 0; i < Clear_Cust; i++) {
            //   $('#StockistID')[0].sumo.remove(0);
            //   }
            //   CustomerArray.length = 0;//-------------------------------------6
            //  $('#CustomerCode').val("");

            if ($('#TerriotryArea').val() != null) {
                var seleTerritory = $('#TerriotryArea').val();
                for (var k = 0; k < seleTerritory.length; k++) {
                    SelectedTerritory += "'" + seleTerritory[k] + "',";
                    Actual_SelectedTeritory += "'" + seleTerritory[k] + "',";
                }
                SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTeritory = Actual_SelectedTeritory.substring(',', Actual_SelectedTeritory.length - 1);//Selected Territories with ' '. 
            }
            if ($("#TerriotryArea").val() == null) {
                var seleState = $('#State').val();

                for (var k = 0; k < seleState.length; k++) {
                    SelectedState += "'" + seleState[k] + "',";
                    Actual_SelectedState += "'" + seleState[k] + "',";
                }
                SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
                Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 
                HideLoader();
                //var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
                //$http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                //    if (res != "") {
                //        var dtCust = JSON.parse(res);
                //        for (var i = 0; i < dtCust.length; i++) {
                //            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                //            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//--------------7
                //        }
                //        HideLoader();
                //    } else { HideLoader(); }
                //});
            } else {
                HideLoader();
                //var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                //$http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                //    if (res != "") {
                //        var dtCust = JSON.parse(res);
                //        for (var i = 0; i < dtCust.length; i++) {
                //            // $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"], dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);
                //            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);//-------------8
                //        }
                //        HideLoader();
                //    } else { HideLoader(); }
                //});
            }
        }
        SelectedTerritory = "";
        SelectedState = "";
    });


    //$('#CustomerCode').typeahead({
    //    source: CustomerArray
    //});



    $scope.GetJourneyPlanList = function () {

        var ZoneValue = $('#Zone').val();
        var StateValue = $('#State').val();
        var TerritoryValue = $('#TerriotryArea').val();
        var Status = $('#Status').val();

        var Actual_SelectedTeritory = ""; var Actual_SelectedState = ""; var Actual_Status = "";
        if (TerritoryValue != null) {
            for (var k = 0; k < TerritoryValue.length; k++) {
                Actual_SelectedTeritory += "'" + TerritoryValue[k] + "',";
            }
            Actual_SelectedTeritory = Actual_SelectedTeritory.substring(',', Actual_SelectedTeritory.length - 1);//Selected Territories with ' '. 
        }

        if (StateValue != null) {
            for (var k = 0; k < StateValue.length; k++) {
                Actual_SelectedState += "'" + StateValue[k] + "',";
            }
            Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 
        }





        // var isValidCustCode = isValidCode_Cust($("#CustomerCode").val(), CustomerArray);
        //  var isValidEmpCode = isValidCode_Cust($("#EmployeeCode").val(), EmployeeArray);
        var UserRole = $('#SessionUserRole').val();



        if (SessionValue == "ZH" && ZoneValue == null) {
            alert("please select zone");
        }
        else if (SessionValue == "SH" && StateValue == null) {
            alert("please select state");
        } else if (SessionValue == "TM" && TerritoryValue == null) {
            alert("please select Territory");
        }
        else if ((SessionValue == "FSO" || SessionValue == "FSO_BU2") && TerritoryValue == null) {
            alert("please select Territory");
        }
        else {
            ShowLoader();
            var WhereClause = "";
            var ZHWhereClase = "";
            //var DateRange = DateSplitter('OrderFromDate', 'OrderToDate');

            //var WhereClause = "WHERE CDO.DIMS_ORDER_DATE BETWEEN " + DateRange + "";
            //if ($("#CustomerCode").val() != "") {
            //    if (($("#CustomerCode").val() != "") && (isValidCustCode == false)) {
            //    } else {
            //        WhereClause += " and CAST(CDO.CUSTOMER_CODE AS BIGINT) IN (" + $("#CustomerCode").val().split(':')[0] + ")";
            //    }
            //} else

            if (Status != null) {
                for (var k = 0; k < Status.length; k++) {
                    Actual_Status += "'" + Status[k] + "',";
                }
                Actual_Status = Actual_Status.substring(',', Actual_Status.length - 1);//Selected States with ' '.                 
            }



            if ($("#TerriotryArea").val() != null) {
                //  WhereClause += " and CAST(CDO.CUSTOMER_CODE AS BIGINT) IN (select DISTINCT ecc.CUSTOMER_CODE from cms_employee_customer_configuration ecc inner join CUSTOMER_SALES_VIEW csv on CAST(ecc.CUSTOMER_CODE AS BIGINT)=CAST(CDO.CUSTOMER_CODE AS BIGINT) where ecc.ORG_LEVEL_ID IN(" + Actual_SelectedTerritory + "))";
                WhereClause += " WHERE OL.ORG_LEVEL_ID in(" + Actual_SelectedTeritory + ") or ol.EMPLOYEE_CODE='" + $("#UserCode").val() + "'";
                ZHWhereClase += " WHERE OL.ORG_LEVEL_ID in(" + Actual_SelectedTeritory + ") or ol.EMPLOYEE_CODE='" + $("#UserCode").val() + "'";
            } else if ($("#State").val() != null) {
                WhereClause += " WHERE cs.STATE_CODE IN(" + Actual_SelectedState + ") ";
            }
            else if ($("#Zone").val() != null) {
                WhereClause += " join cms_zone_state_mapping as zsm on zsm.STATE_CODE=jpcd.SALES_REGION WHERE zsm.ZONE_CODE IN(" + $("#Zone").val() + ")  ";
                ZHWhereClase += " join cms_zone_state_mapping as zsm on zsm.STATE_CODE=(select top 1 STATE from cms_employee_role_configuration where EMPLOYEE_CODE=sjpd.SALES_EMPLOYEE_CODE) WHERE zsm.ZONE_CODE IN(" + $("#Zone").val() + ") ";
            }


            if ($('#PlanFromDate').val() != "") {
                if (WhereClause.indexOf('WHERE') > -1) {
                    if ($("#TerriotryArea").val() != null) {
                        WhereClause += "AND ajpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";
                        ZHWhereClase += "AND sjpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";

                    } else if ($("#State").val() != null) {
                        WhereClause += "AND ajpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";
                        ZHWhereClase += "AND sjpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";

                    } else if ($("#Zone").val() != null) {
                        WhereClause += "AND ajpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";
                        ZHWhereClase += "AND sjpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";

                    } else {
                        WhereClause += " ajpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";
                        ZHWhereClase += " sjpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";

                    }

                    //if (($("#TerriotryArea").val() != null) && ($("#State").val() != null) && ($("#Zone").val() != null)) {
                    //    WhereClause += "AND ajpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";
                    //} else {
                    //    WhereClause += " ajpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";
                    //}
                } else {
                    WhereClause += " WHERE ajpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";
                    ZHWhereClase += " WHERE sjpd.PLAN_FOR_MONTH='" + $('#PlanFromDate').val() + "'";

                }
            }

            if ($('#Status').val() != null) {
                if (WhereClause.indexOf('WHERE') > -1) {
                    if ($("#TerriotryArea").val() != null) {
                        WhereClause += " AND ajpd.status in(" + Actual_Status + ")";
                        ZHWhereClase += " AND sjpd.status in(" + Actual_Status + ")";
                    } else if ($("#State").val() != null) {
                        WhereClause += " AND ajpd.status in(" + Actual_Status + ")";
                        ZHWhereClase += " AND sjpd.status in(" + Actual_Status + ")";
                    } else if ($("#Zone").val() != null) {
                        WhereClause += " AND ajpd.status in(" + Actual_Status + ")";
                        ZHWhereClase += " AND sjpd.status in(" + Actual_Status + ")";
                    } else if ($('#PlanFromDate').val() != "") {
                        WhereClause += " AND ajpd.status in(" + Actual_Status + ")";
                        ZHWhereClase += " AND sjpd.status in(" + Actual_Status + ")";
                    } else {
                        WhereClause += " ajpd.status in (" + Actual_Status + ")";
                        ZHWhereClase += " sjpd.status in(" + Actual_Status + ")";
                    }

                    //if (($("#TerriotryArea").val() != null) && ($("#State").val() != null) && ($("#Zone").val() != null) || ($('#PlanFromDate').val() != "")) {
                    //    WhereClause += " AND ajpd.status in(" + Actual_Status + ")";
                    //} else {
                    //    WhereClause += " ajpd.status in (" + Actual_Status + ")";
                    //}
                } else {
                    WhereClause += " WHERE ajpd.status in(" + Actual_Status + ")";
                    ZHWhereClase += " WHERE sjpd.status in(" + Actual_Status + ")";
                }
            }

            if (($("#Zone").val() == null) && ($("#State").val() == null) && ($("#TerriotryArea").val() == null) && ($("#PlanFromDate").val() == "") && ($("#Status").val() == null)) {
                WhereClause += " ";
                ZHWhereClase += " ";
            }
            WhereClause += " group by ajpd.JOURNEY_PLAN_NAME,ajpd.PLAN_FOR_MONTH,ajpd.SALES_EMPLOYEE_CODE,ajpd.STATUS,cs.STATE_DESC,em.EMPLOYEE_NAME,jpcd.NO_OF_DAYS_IN_MONTH";

            if ($("#State").val() == null) {
                WhereClause += " union select sjpd.JOURNEY_PLAN_NAME as 'Journey Plan Name','Month Start Date' as 'Month Start Date',sjpd.PLAN_FOR_MONTH as 'Month Name',";
                WhereClause += " '01' as 'No of Days in Month',EM.EMPLOYEE_NAME as 'Sales Employee Name','Sales Region' as 'Sales Region',";
                WhereClause += " 'Count of Customer' as 'Count of Customer','Planned Visits' as 'Planned Visits', 'Actual Visits' as 'Actual Visits', 'Rating' as 'Rating', 'Status' as 'Status' ";
                WhereClause += " from SFDC_ADV_JOURNEY_PLAN_DETAILs sjpd join SPM_ZH_JOURNEY_PLAN_DETAILS ZHJPD on sjpd.ID=ZHJPD.HEADER_ID";
                WhereClause += " join cms_employeemaster em on em.EMPLOYEE_CODE=sjpd.SALES_EMPLOYEE_CODE ";
                WhereClause += " JOIN cms_organization_level AS OL ON sjpd.SALES_EMPLOYEE_CODE=OL.EMPLOYEE_CODE  ";
                WhereClause += ZHWhereClase;
                //  WhereClause += " join cms_zone_state_mapping as zsm on zsm.STATE_CODE=(select top 1 STATE from cms_employee_role_configuration where EMPLOYEE_CODE=sjpd.SALES_EMPLOYEE_CODE) WHERE zsm.ZONE_CODE IN(" + $("#Zone").val() + ") ";
                WhereClause += " group by sjpd.JOURNEY_PLAN_NAME,sjpd.PLAN_FOR_MONTH,sjpd.SALES_EMPLOYEE_CODE,sjpd.STATUS,em.EMPLOYEE_NAME";
            }


            var Data = JSON.stringify({
                MasterType: "JourneyPlanReport",
                ID: "561",
                UserCode: $("#UserCode").val(),
                "Type": "Get",
                ReportName: "JourneyPlanReport",
                WhereClause: WhereClause
            });


            DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
                var Result = JSON.parse(response.tabledata);

                if (Result != "") {
                    $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
                    if (Result.hasOwnProperty('UserListColumnNames')) {
                        var data1 = JSON.parse(Result["UserListColumnNames"]);

                        var selectedcolumnname = data1["ColumnNames"];

                        CustomColumnID = Result["UserListID"];
                        $('#undo_redo_to').empty();
                        var ColArray = new Array();
                        for (var i = 0; i < selectedcolumnname.length; i++) {


                            ColArray.push({
                                "data": selectedcolumnname[i],
                                "name": selectedcolumnname[i], "bSortable": true
                            });
                            $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                        }
                        //$scope.UserSelectedColumnName = ColArray;
                        UserSelectedColumnName = ColArray;
                    } else {

                        var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                        var selectedcolumnname = data1["ColumnNames"];

                        CustomColumnID = "0";

                        $('#undo_redo_to').empty();
                        var ColArray = new Array();
                        for (var i = 0; i < selectedcolumnname.length; i++) {
                            ColArray.push({
                                "data": selectedcolumnname[i],
                                "name": selectedcolumnname[i],
                                "bSortable": "true"
                            });
                            $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                        }
                        //$scope.UserSelectedColumnName = ColArray;
                        UserSelectedColumnName = ColArray;
                    }
                }
                ShowLoader();
                DIMSFactory.getReportData(Data).success(function (response) {
                    ShowLoader();
                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "JourneyPlanList", UserSelectedColumnName);
                    $('#JourneyPlanTableId').show();
                    var table1 = $('#JourneyPlanList').DataTable();
                    $('#JourneyPlanList tbody').on('click', 'tr', function () {

                        var d = table1.row(this).data()
                        var ID = $(this).find('td:eq(0)').text();

                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        }
                        else {
                            $("#JourneyPlanList").DataTable().$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                        if (ID != "") {
                            var scope = angular.element($("#AddjpDiv")).scope();
                            scope.$apply(function () {
                                if (ID.indexOf('ZH') > -1) {
                                    scope.go("ZHJourneyPlanDetails/" + ID);
                                } else {
                                    scope.go("JourneyPlanDetails/" + ID);
                                }
                            });
                        }
                        // }
                    });
                });
            });
        }


    }


    //DIMSSFDCFactory.GetUserBasedJourneyPlan(Data).success(function (res) {//To get Present Date and time        
    //    var Result = JSON.parse(res.tabledata);
    //    var scrollY = $(window).height() * 58 / 100;
    //    $(window).resize(function () {
    //        scrollY = $(window).height() * 58 / 100;
    //    });

    //    $('#JourneyPlanList tbody').empty();

    //    var oTable = $('#JourneyPlanList').dataTable({
    //        // "sScrollY": "300px",
    //        //  "sScrollX": true
    //        // "bPaginate": false
    //    });

    //    $(window).bind('resize', function () {
    //        oTable.fnAdjustColumnSizing();
    //    });


    //    //$("#JourneyPlanList").DataTable({
    //    //    //"bAutoWidth": true,      
    //    //    //"sScrollY": "300"
    //    //    // "bAutoWidth": true,
    //    //    // "bScrollCollapse": false,
    //    //    //  "sScrollX": true               
    //    //});



    //    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
    //    // jQuery('.dataTable thead').wrap('<div class="dataTables_scrollBody" />');

    //    // $("#JourneyPlanList").dataTable().fnAdjustColumnSizing();

    //    //  $('.dataTables_scroll').css({ "position": fixed, "max-height": 300, "overflow": scroll });

    //    for (var i = 0; i < Result.length; i++) {
    //        $('#JourneyPlanList').dataTable().fnAddData([Result[i]["ID"], "Plan Name", Result[i]["MONTH_STRAT_DATE"], Result[i]["PLAN_FOR_MONTH"], Result[i]["NOOF_DAYS_IN_MONTH"], Result[i]["SALES_EMPLOYEE"], Result[i]["SALES_REGION"], Result[i]["SALES_DISTRICT"], Result[i]["STOCKIST_NAME_COUNT"], Result[i]["SUB_STOCKIST_NAME_COUNT"], Result[i]["NO_OF_VISITING_DATES"], "1", "Rating", Result[i]["STATUS"], "HIL", "ADMIN"]);
    //    }

    //    $("#JourneyPlanList").DataTable().column(0).visible(false);
    //    $("#JourneyPlanList").DataTable().columns.adjust().draw(false);

    //    $('#JourneyPlanList tbody').on('click', 'tr', function () {
    //        var ID = $("#JourneyPlanList").DataTable().row(this).data()[0]
    //        if ($(this).hasClass('selected')) {
    //            $(this).removeClass('selected');
    //        }
    //        else {
    //            $("#JourneyPlanList").DataTable().$('tr.selected').removeClass('selected');
    //            $(this).addClass('selected');
    //        }
    //        if (ID != "") {
    //            var scope = angular.element($("#AddOrdersDiv")).scope();
    //            scope.$apply(function () {
    //                scope.go("JourneyPlanDetails/" + ID);
    //            })
    //        }

    //    });
    //});



});



DIMS.controller('EditScheme', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Edit Scheme" };
    $scope.go = function (path) {
        $location.path(path);
    };
});

DIMS.controller('SalesAchievements', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Sales Achievements" };
    $scope.go = function (path) {
        $location.path(path);
    };
});
DIMS.controller('SalesAchievementMonthly', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Sales Achievement Monthly" };
    $scope.go = function (path) {
        $location.path(path);
    };
});

DIMS.controller('AddOrder', function ($scope, $location, DIMSSFDCFactory, $routeParams, DIMSFactory) {
    AddOrder = $scope;
    $scope.templatesettings = { HeaderTitle: "Add Order" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    // var totalheight = height - 148;
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    angular.element(document).ready(function () {

        var SERVER_DATE = "";
        $.ajax({
            url: '../../Home/getServerDateTime',
            type: 'GET',
            async: false,
            success: function (response) {
                SERVER_DATE = JSON.parse(response.tabledata);
            }
        });

        var today = new Date();

        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = dd + '/' + mm + '/' + yyyy;
        $scope.OrderDate = SERVER_DATE;


        $scope.Sales_Employee = $('#SessionUserCode').val();
        $scope.Sales_Employee_Name = $('#SessionUserName').val();






        var EditId = $routeParams.ID;
        if (EditId == undefined || EditId == "") {
            EditId = 0;
            DIMSSFDCFactory.GetLatestOrdernumber().success(function (res) {
                $scope.DIMSOrderId = res;
            });
        } else {
            DIMSSFDCFactory.GetOrderDataforEdit(EditId).success(function (response) {
                var Data = JSON.parse(response);
                var HeaderData = Data["Header"];
                $scope.DIMSOrderId = HeaderData[0]["DIMS_ORDER_NO"];
                $scope.OrderDate = HeaderData[0]["ORDER_DATE"];
                $scope.SalesOrderNumber = HeaderData[0]["SALES_ORDER_NUMBER"];
                $scope.SODate = HeaderData[0]["SALES_ORDER_DATE"];
                $scope.Sales_Employee = HeaderData[0]["SALES_EMPLOYEE_CODE"];
                $scope.Sales_Employee_Name = HeaderData[0]["EMPLOYEE_NAME"];

                var DeliverySource = HeaderData[0]["DELIVERY_SOURCE"];


                //  $('input:radio[value=' + DeliverySource + ']').attr('checked', 'checked');
                // $scope.DeliverySource = HeaderData[0]["DELIVERY_SOURCE"];

                $scope.Plant_DepoName = HeaderData[0]["PLANT_DEPO_NAME"];
                $('#Email').val(HeaderData[0]["PLANT_DEPO_EMAIL"]);
                $('#PlantDepoCodes').val(HeaderData[0]["SALES_CO_ORDINATOR_CODE"]);
                $scope.BillingToAddress = HeaderData[0]["BILL_TO_ADDRESS"];
                $scope.ShipTo = HeaderData[0]["SHIP_TO_ADDRESS"];

                $scope.CreditLimit = HeaderData[0]["CREDIT_LIMIT"];
                $scope.OutStandingLimit = HeaderData[0]["CURRENT_OUT_STANDING"];

                $('#Product').val(HeaderData[0]["PRODUCT_CATEGORY_NAME"]);
                ProductChange();

                $scope.CustomerCode = HeaderData[0]["CUSTOMER_CODE"];
                $scope.StockistName = HeaderData[0]["STOCKIST_NAME"];

                $scope.SourceZone = HeaderData[0]["ZoneName"];
                $scope.State = HeaderData[0]["StateDesc"];
                $scope.TerritoryArea = HeaderData[0]["AreaName"];
                $scope.Location = HeaderData[0]["CityName"];

                $scope.PinCode = HeaderData[0]["PinCode"];

                $scope.RetailerCode = HeaderData[0]["RETAILER_CODE"];
                $scope.RetailerName = HeaderData[0]["RETAILER_NAME"];

                // $scope.DeliveryType = HeaderData[0]["DELIVERY_TYPE"];
                var DeliveryType = HeaderData[0]["DELIVERY_TYPE"];
                $scope.DeliveryType = DeliveryType;
                $scope.DeliverySource = DeliverySource;
                $('input[name=DeliveryType][value=' + DeliveryType + ']').prop('checked', true);
                $('input[name=optradio][value=' + DeliverySource + ']').prop('checked', true);
                // $('input:radio[value=' + HeaderData[0]["DELIVERY_TYPE"] + ']').attr('checked', 'checked');
                $scope.CFormRequired = HeaderData[0]["CFROM_REQUIRED"];
                $scope.ProjectCustomer = HeaderData[0]["PROJECT_CUSTOMER"];

                var ChildData = Data["ProductTable"];
                var disabled = "disabled";
                var UserRole = $('#SessionUserRole').val();



                for (var i = 0; i < ChildData.length; i++) {
                    if (HeaderData[0]["PRODUCT_CATEGORY_NAME"] == "ACSheet") {
                        $('#AddOrder').dataTable().fnAddData([
        ChildData[i]["PRODUCT_TYPE_NAME"],
       ChildData[i]["SKU_SIZE"],
       ChildData[i]["UOM"],
        ChildData[i]["QUANTITY_NO_OF_SHEET"],
        ChildData[i]["QUANTITY_IN_RUNNING_METER"],
        ChildData[i]["QUANTITY_IN_METER"],
        "<a href='#' class='DeleteExperience' style='padding: 0px 0px;' onclick='DeleteExperience($(this));return false'><i class='glyphicon glyphicon-trash'></i></a>"
                        ]
        );

                    } else {
                        $('#AddCCSheetOrder').dataTable().fnAddData([
  ChildData[i]["PRODUCT_TYPE_NAME"],
  ChildData[i]["COLOR"],
  ChildData[i]["THICKNESS"],
  ChildData[i]["SKU_SIZE_IN_FEET"],
  ChildData[i]["SKU_SIZE_INC"],
  ChildData[i]["UOM"],
  ChildData[i]["QUANTITY_NO_OF_SHEET"],
  ChildData[i]["QUANTITY_IN_KGS"],
  ChildData[i]["QUANTITY_IN_METER"],
  "<a href='#' class='DeleteExperience' style='padding: 0px 0px;' onclick='DeleteExperience($(this));return false'><i class='glyphicon glyphicon-trash'></i></a>"
                        ]
  );
                    }
                }


                // if (UserRole != "FSO" && UserRole != "STOCKIST") {
                $('.DeleteExperience').css("pointer-events", "none");
                //  }
                //for (var i = 0; i < ChildData.length; i++) {
                //    $('#AddOrder').dataTable().fnAddData([ChildData[i]["PRODUCT_NAME"], ChildData[i]["UOM"], ChildData[i]["QUANTITY"], "<a href='#' style='padding: 0px 0px;' onclick='DeleteExperience($(this));return false'><i class='glyphicon glyphicon-trash'></i></a>"]);
                //}

                //  $('#DIMSOrderId').attr("disabled", true);
                //  $('#SalesOrderNumber').attr("disabled", true);


            });
            pageloading();
        }


    });
    function pageloading() {
        var UserRole = $('#SessionUserRole').val();
        // if (UserRole != "FSO" && UserRole != "STOCKIST") {
        $('#AddNew').css("pointer-events", "none");
        $('#SaveOrder').css("pointer-events", "none");
        $('.input-group-btn').children('.btn-default').css("pointer-events", "none");

        $("input[type=radio]").attr('disabled', true);
        $("input[type=checkbox]").attr('disabled', true);
        $('#ActionControls').children().children('.btn-info').css("pointer-events", "none");
        $('#Plant_DepoName').attr("disabled", "disabled");
        // }
    }

    // alert($scope.EditID);
    $scope.Getdata = function (Methodname, MasterType, Heading) {
        var Data = JSON.stringify({
            MasterType: MasterType,
            ID: "2"
        });
        DIMSSFDCFactory.getMasterData(Data).success(function (response) {
            getLookUpData(response, Methodname, Heading);
        });
    }

    $scope.GetdataForCustomer = function (Methodname, MasterType, Heading) {
        var Data = JSON.stringify({
            MasterType: MasterType,
            "UserCode": $('#SessionUserCode').val(),
            "Role": $('#SessionUserRole').val(),
            ID: "2"
        });

        WhereClause = "";
        var Data = JSON.stringify({
            MasterType: MasterType,
            ID: "561",
            UserCode: $('#SessionUserCode').val(),
            "Role": $('#SessionUserRole').val(),
            "Type": "Get",
            ReportName: "SFDCCustomerMasterList",
            WhereClause: WhereClause
        });

        DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
            var Result = JSON.parse(response.tabledata);

            if (Result != "") {
                $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
                if (Result.hasOwnProperty('UserListColumnNames')) {
                    var data1 = JSON.parse(Result["UserListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];

                    CustomColumnID = Result["UserListID"];
                    $('#undo_redo_to').empty();
                    var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {


                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i], "bSortable": true
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    //$scope.UserSelectedColumnName = ColArray;
                    UserSelectedColumnName = ColArray;
                } else {

                    var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];

                    CustomColumnID = "0";

                    $('#undo_redo_to').empty();
                    var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i],
                            "bSortable": "true"
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    //$scope.UserSelectedColumnName = ColArray;
                    UserSelectedColumnName = ColArray;
                }
            }
            ShowLoader();
            DIMSFactory.getReportData(Data).success(function (response) {

                ShowLoader();
                var OnclickClass = "";
                if (Methodname == "GetRetailerList") {
                    OnclickClass = "RetailerRowClick";
                } else {
                    OnclickClass = "CustomerRowClick";
                }
                getLookUpData_Preview_ServerSide_SFDC_CustomerMaster("", Heading, "ReportPreviewTable", "ReportsPopUpModal", "PreviewStatus", UserSelectedColumnName, OnclickClass);
                //  getLookUpData_Preview_ServerSide("", "Customer Master", "CustomerMasterTable", "ReportsPopUpModal", "PreviewStatus", UserSelectedColumnName);
                //  getLookUpData_Preview_ServerSide("", "EnrollmentNodataLabel", "", "DailyOrder", UserSelectedColumnName);
                //getLookUpData_Preview_ServerSide("", "Preview", "ReportPreviewTable", "ReportsPopUpModal", "PreviewStatus", UserSelectedColumnName);
                HideLoader();
                //   getLookUpData_Preview_ServerSide("", "EnrollmentNodataLabel", Heading, "PopHeading", UserSelectedColumnName);
            });
        });



        //DIMSSFDCFactory.getMasterData(Data).success(function (response) {
        //    alert("asdf");
        //    alert(response);

        // //   getLookUpData_Customer_Master(response, Methodname, Heading);
        //});
    }
    $("#ReportPreviewTable").delegate("tr.CustomerRowClick", "click", function () {
        GetCustomerList(this);
    });

    $("#ReportPreviewTable").delegate("tr.RetailerRowClick", "click", function () {
        GetRetailerList(this);
    });

    $scope.GetdataForCoordinator = function (Methodname, MasterType, Heading) {

        var DeliverySource = $scope.DeliverySource;

        if (DeliverySource != undefined) {
            var Data = JSON.stringify({
                MasterType: MasterType,
                ZoneCode: $('#SessionUserZone').val(),//to be change
                StateCode: $('#SessionUserState').val(),
                UserCode: $('#SessionUserCode').val(),
                "Role": $('#SessionUserRole').val(),
                DeliverySource: DeliverySource,
                ID: "2"
            });
            Heading = DeliverySource + " List";
            DIMSSFDCFactory.getMasterData(Data).success(function (response) {
                getLookUpData_Customer_Master(response, Methodname, Heading);
            });
        }
        else {
            alert("Please select Delivery Source");
        }

    }
    $scope.SaveOrderData = function () {

        var EditId = $routeParams.ID;
        if (EditId == "" || EditId == undefined) {
            EditId = "0";
        }


        var DIMSId = $scope.DIMSOrderId;
        var CreatedOrderDate = $scope.OrderDate;
        var SalesEmpCode = $scope.Sales_Employee;
        var SalesEmpName = $scope.Sales_Employee_Name;
        var DeliverySource = $scope.DeliverySource;

        var PlantDepoName = $('#Plant_DepoName').val();
        var PlantDepoEmail = $('#Email').val();

        var SalesCoordinator = $scope.SalesCoorinator;
        var CustomerCode = $scope.CustomerCode;
        var RetailerCode = $scope.RetailerCode;
        var RetailerName = $scope.RetailerName;
        var CFormRequired = $scope.CFormRequired;//Checkbox
        var ProjectCustomer = $scope.ProjectCustomer;//checkbox
        var DeliveryType = $scope.DeliveryType;//Radio

        var BillingToAddress = $scope.BillingToAddress;
        var ShipTo = $scope.ShipTo;

        var SalesOrderNumber = $scope.SalesOrderNumber;
        var SODate = $scope.SODate;

        //var CreditLimit = $scope.CreditLimit;
        var CreditLimit = $('#CreditLimit').val();
        //var OutStandingLimit = $scope.OutStandingLimit;
        var OutStandingLimit = $('#OutStandingLimit').val();
        var ProductCategory = $scope.PrdCat;

        var ProductCategory = $('#Product').val();

        //ProductCategory = "CC Sheet";
        var userRole = $('#SessionUserRole').val();

        if (userRole.trim() != "STOCKIST") {
            userRole = "EMPLOYEE";
        }

        var PlantDepoCordinatorCode = $('#PlantDepoCodes').val();
        if (DeliverySource == undefined) { DeliverySource = ""; }
        if (SalesCoordinator == undefined) { SalesCoordinator = ""; }
        if (CustomerCode == undefined) {
            CustomerCode = "";
        }
        if (RetailerCode == undefined) { RetailerCode = ""; }
        if (BillingToAddress == undefined) { BillingToAddress = ""; }
        if (ShipTo == undefined) { ShipTo = ""; }
        if (DeliveryType == undefined) { DeliveryType = ""; }
        if (SalesOrderNumber == undefined) { SalesOrderNumber = ""; }
        if (SODate == undefined) { SODate = ""; }
        if (CreditLimit == undefined) { CreditLimit = 0; }
        if (OutStandingLimit == undefined) { OutStandingLimit = 0; }

        if (ProjectCustomer == undefined) { ProjectCustomer = "false"; }
        if (CFormRequired == undefined) { CFormRequired = "false"; }

        var OrderDetails = new Array();
        if (CustomerCode == "") {
            alert("Please Select Customer Code");
        }
        else if (DeliverySource == "" || DeliverySource == null) {
            alert("Please Select any one from Delivery Source");
        }
            //else if (SalesCoordinator == "") {
            //    alert("Please Select Sales Co-ordinator");
            //}
        else if (PlantDepoName == "" || PlantDepoName == null) {
            alert("Please select Plant or Depo Name");
        } else if (PlantDepoEmail == "" || PlantDepoEmail == null) {
            alert("Plant or Depo Email is Required");
        }
        else if (RetailerCode == "" || RetailerCode == null) {
            alert("Please select Retailer Code");
        }
        else if (DeliveryType == "" || DeliveryType == null) {
            alert("Please Select Delivery Type");
        }
        else if (($('#AddOrder').dataTable().fnSettings().aoData.length == 0) && ($('#AddCCSheetOrder').dataTable().fnSettings().aoData.length == 0)) {
            alert("Please Add Product Details");
        }
        else {

            if (OutStandingLimit > CreditLimit) {
                alert("Current Outstanding is morethan credit limit for the customer :" + $('#StockistName').val());
            }

            SalesCoordinator = PlantDepoCordinatorCode;
            if (ProductCategory == "ACSheet") {
                var ACSheetTable = $('#AddOrder').dataTable().fnGetData();
                for (var i = 0; i < ACSheetTable.length; i++) {
                    OrderDetails.push({
                        productType: ACSheetTable[i][0],
                        SKUSIze: ACSheetTable[i][1],
                        UOM: ACSheetTable[i][2],
                        QuantityNoOfSheet: ACSheetTable[i][3],
                        QuantityInRunning: ACSheetTable[i][4],
                        QuantityInMT: ACSheetTable[i][5]
                    });
                }
            } else {
                var CCSheetTable = $('#AddCCSheetOrder').dataTable().fnGetData();
                for (var j = 0; j < CCSheetTable.length; j++) {
                    OrderDetails.push({
                        productType: CCSheetTable[j][0],
                        color: CCSheetTable[j][1],
                        Thickness: CCSheetTable[j][2],
                        SKUSizeFeet: CCSheetTable[j][3],
                        SKUSizeInch: CCSheetTable[j][4],
                        UOM: CCSheetTable[j][5],
                        QuantityNoOfSheet: CCSheetTable[j][6],
                        QuantityInKgs: CCSheetTable[j][7],
                        QuantityInMT: CCSheetTable[j][8]
                    });
                }
            }

            $('#DIMSOrderId_html').text(DIMSId);

            $('#OrderDate_html').text(CreatedOrderDate);

            $('#Sales_Employee_html').text(SalesEmpCode);
            $('#CustomerCode_html').text(CustomerCode);
            $('#Sales_Employee_Name_html').text($('#Sales_Employee_Name').val());

            $('#StockistName_html').text($('#StockistName').val());

            $('#DeliverySource_html').text(DeliverySource);

            $('#BillingToAddress_Html').text(BillingToAddress);


            $('#Plant_DepoName_html').text(PlantDepoName);

            $('#RetailerCode_html').text(RetailerCode);

            $('#Location_html').text($('#Location').val());

            $('#RetailerName_html').text($('#RetailerName').val());


            $('#TerritoryArea_html').text($('#TerritoryArea').val());

            $('#ShipTo_html').text(ShipTo);

            $('#State_html').text($('#State').val());

            $('#SourceZone_html').text($('#SourceZone').val());

            $('#PinCode_html').text($('#PinCode').val());

            $('#CreditLimit_html').text(CreditLimit);

            if (CFormRequired == "true" || CFormRequired == true) {
                $('#CFormRequired_html').text("Yes");
            } else {
                $('#CFormRequired_html').text("No");
            }


            if (ProjectCustomer == "true" || ProjectCustomer == true) {
                $('#ProjectCustomer_html').text("Yes");
            } else {
                $('#ProjectCustomer_html').text("No");
            }


            $('#OutStandingLimit_html').text(OutStandingLimit);


            $('#DeliveryType_html').text(DeliveryType);

            var TotalOrderData = JSON.stringify({
                "EditId": EditId,
                "DIMSOrderID": DIMSId,
                "DIMSOrderDate": CreatedOrderDate,
                "SalesOrderNumber": SalesOrderNumber,
                "SODate": SODate,
                "SalesEmployee": SalesEmpCode,
                "DeliverySource": DeliverySource,
                "PlantDepoName": PlantDepoName,
                "PlantDepoEmail": PlantDepoEmail,
                "SalesCoorinator": SalesCoordinator,
                "CustomerCode": CustomerCode,
                "RetailerCode": RetailerCode,
                "BillingToAddress": BillingToAddress,
                "ShipTo": ShipTo,
                "CreditLimit": CreditLimit,
                "OutStandingLimit": OutStandingLimit,
                "CFormRequired": CFormRequired,
                "ProjectCustomer": ProjectCustomer,
                "DeliveryType": DeliveryType,
                "ProductCategory": ProductCategory,
                "OrderFrom": userRole,//Need to Insert
                "CreatedBy": $('#SessionUserCode').val(),//Need to Insert
                "OrderDetails": OrderDetails//Child Table Data
            });



            if (ProductCategory == "ACSheet") {

                $('#addOrderview_HTML').append("<div style='height: 25px;'></div><table border='1' id='AddOrderAcSheet_Html'>" + $('#AddOrder thead').html() + $('#AddOrder tbody').html() + $('#AddOrder tfoot').html() + "</table>  <div style='height: 25px;'></div>");


                var ptr = $("#AddOrderAcSheet_Html").find("tr");
                ptr.find("td:last").remove();
                ptr.find("th:last").remove();



                //  OrderDetailsHtml += "<div style='height: 25px;'></div><table border='1' id='AddOrderAcSheet'>" + $('#AddOrder thead').html() + $('#AddOrder tbody').html() + $('#AddOrder tfoot').html() + "</table>  <div style='height: 25px;'></div>";
            } else {
                $('#addOrderview_HTML').append("<div style='height: 25px;'></div><table border='1' id='AddOrderCCSheet_Html'>" + $('#AddCCSheetOrder thead').html() + $('#AddCCSheetOrder tbody').html() + $('#AddCCSheetOrder tfoot').html() + "</table>  <div style='height: 25px;'></div>");
                // OrderDetailsHtml += "<div style='height: 25px;'></div><table border='1' id='AddOrderCCSheet'>" + $('#AddCCSheetOrder thead').html() + $('#AddCCSheetOrder tbody').html() + $('#AddCCSheetOrder tfoot').html() + "</table>  <div style='height: 25px;'></div>";

                var ptr = $("#AddOrderCCSheet_Html").find("tr");
                ptr.find("td:last").remove();
                ptr.find("th:last").remove();
            }
            var OrderDetailsHtml = $('#addOrderview_HTML').html();
            ShowLoader();
            DIMSSFDCFactory.SaveOrderData(TotalOrderData).success(function (response) {
                if (response == "Insert") {
                    alert("Order Created Successfully");
                    $scope.go('DailyOrderTracking');
                    // HideLoader();

                    $scope.SendEmailCoordinater(OrderDetailsHtml, PlantDepoEmail, DIMSId);

                } else if (response == "Fail") {
                    HideLoader();
                    alert("Error Occured while Saving");
                } else if (response == "Update") {
                    HideLoader();
                    alert("Update Successfully");
                    $scope.go('DailyOrderTracking');
                } else if (response == "UpdateFail") {
                    HideLoader();
                    alert("Error Occured while Update");
                } else {
                    HideLoader();
                    alert(response);
                }
            });
        }
    }

    $scope.DeliverySourceChecked = function () {
        $('#Plant_DepoName').val("");
        $('#Email').val("");
    }

    $("#Quantity").keypress(function (event) {
        return onlyNumerics(event);
    });

    $scope.SendEmailCoordinater = function (OrderDetails, PlantDepoEmail, DIMSId) {
        //  PlantDepoEmail = "venkatesh.g@hil.in";
        $.ajax({
            url: '../../Home/ExportdataFinanceDashboard',
            type: 'POST',
            async: false,
            data: { QueryVal: OrderDetails },
            success: function (result) {
                if (result == "ok") {
                    $.ajax({
                        type: 'POST',
                        url: '../../SFDC/SendOrderDetails',
                        data: { "SenderEmail": PlantDepoEmail, "MailSubject": DIMSId },
                        success: function (res) {
                            //  alert(res);
                            console.log(res);
                            HideLoader();
                        },
                        error: function (e) {
                            HideLoader();
                            console.log("SFDC/SendOrderDetails :" + e);
                        }
                    });
                }
            },
            error: function (e) {
                HideLoader();
                console.log("Home/ExportdataFinanceDashboard :" + e);
            }
        });
    }
});
DIMS.controller('AddOrderForFSO', function ($scope, $location, DIMSSFDCFactory, $routeParams, DIMSFactory) {
    AddOrderFSo = $scope;
    $scope.templatesettings = { HeaderTitle: "Add Order" };
    $scope.go = function (path) {
        CheckUserSession();
        $location.path(path);
    };
    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    // var totalheight = height - 148;
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------

    $scope.Getdata = function (Methodname, MasterType, Heading) {
        var Data = JSON.stringify({
            MasterType: MasterType,
            ID: "2"
        });
        DIMSSFDCFactory.getMasterData(Data).success(function (response) {
            getLookUpData(response, Methodname, Heading);
        });
    }

    angular.element(document).ready(function () {
        var EditId = $routeParams.ID;
        var SERVER_DATE = "";
        $.ajax({
            url: '../../Home/getServerDateTime',
            type: 'GET',
            async: false,
            success: function (response) {
                SERVER_DATE = JSON.parse(response.tabledata);
            }
        });
        var UserRole = $('#SessionUserRole').val();
        $scope.OrderDate = SERVER_DATE;
        if (EditId == undefined || EditId == "") {
            EditId = 0;
            DIMSSFDCFactory.GetLatestOrdernumber().success(function (res) {
                $scope.DIMSOrderId = res;
            });
        } else {

            DIMSSFDCFactory.GetOrderDataforEdit(EditId).success(function (response) {
                var Data = JSON.parse(response);
                var HeaderData = Data["Header"];
                $scope.DIMSOrderId = HeaderData[0]["DIMS_ORDER_NO"];
                $scope.OrderDate = HeaderData[0]["ORDER_DATE"];
                $scope.SalesOrderNumber = HeaderData[0]["SALES_ORDER_NUMBER"];
                $scope.SODate = HeaderData[0]["SALES_ORDER_DATE"];
                $scope.FSOIncharge = HeaderData[0]["SALES_EMPLOYEE_CODE"];
                $scope.Sales_Employee_Name = HeaderData[0]["EMPLOYEE_NAME"];

                var DeliverySource = HeaderData[0]["DELIVERY_SOURCE"];


                //  $('input:radio[value=' + DeliverySource + ']').attr('checked', 'checked');
                // $scope.DeliverySource = HeaderData[0]["DELIVERY_SOURCE"];

                $scope.Plant_DepoName = HeaderData[0]["PLANT_DEPO_NAME"];
                $('#Email').val(HeaderData[0]["PLANT_DEPO_EMAIL"]);

                $scope.BillingToAddress = HeaderData[0]["BILL_TO_ADDRESS"];
                $scope.ShipTo = HeaderData[0]["SHIP_TO_ADDRESS"];

                $scope.CreditLimit = HeaderData[0]["CREDIT_LIMIT"];
                $scope.OutStandingLimit = HeaderData[0]["CURRENT_OUT_STANDING"];

                $('#Product').val(HeaderData[0]["PRODUCT_CATEGORY_NAME"]);
                ProductChange();

                $scope.CustomerCode = HeaderData[0]["CUSTOMER_CODE"];
                $scope.CustomerName = HeaderData[0]["STOCKIST_NAME"];

                $scope.SourceZone = HeaderData[0]["ZoneName"];
                $scope.State = HeaderData[0]["StateDesc"];
                $scope.TerritoryArea = HeaderData[0]["AreaName"];
                $scope.Location = HeaderData[0]["CityName"];

                $scope.PinCode = HeaderData[0]["PinCode"];

                $scope.RetailerCode = HeaderData[0]["RETAILER_CODE"];
                $scope.RetailerName = HeaderData[0]["RETAILER_NAME"];

                // $scope.DeliveryType = HeaderData[0]["DELIVERY_TYPE"];
                var DeliveryType = HeaderData[0]["DELIVERY_TYPE"];

                $('input[name=optradio][value=' + DeliveryType + ']').prop('checked', true);
                // $('input[name=optradio][value=' + DeliverySource + ']').prop('checked', true);
                // $('input:radio[value=' + HeaderData[0]["DELIVERY_TYPE"] + ']').attr('checked', 'checked');
                $scope.CFormRequired = HeaderData[0]["CFROM_REQUIRED"];
                $scope.ProjectCustomer = HeaderData[0]["PROJECT_CUSTOMER"];

                var ChildData = Data["ProductTable"];


                for (var i = 0; i < ChildData.length; i++) {
                    if (HeaderData[0]["PRODUCT_CATEGORY_NAME"] == "ACSheet") {
                        $('#AddOrder').dataTable().fnAddData([
        ChildData[i]["PRODUCT_TYPE_NAME"],
       ChildData[i]["SKU_SIZE"],
       ChildData[i]["UOM"],
        ChildData[i]["QUANTITY_NO_OF_SHEET"],
        ChildData[i]["QUANTITY_IN_RUNNING_METER"],
        ChildData[i]["QUANTITY_IN_METER"],
        "<a href='#' style='padding: 0px 0px;' class='DeleteExperience' onclick='DeleteExperience($(this));return false'><i class='glyphicon glyphicon-trash'></i></a>"
                        ]
        );

                    } else {
                        $('#AddCCSheetOrder').dataTable().fnAddData([
  ChildData[i]["PRODUCT_TYPE_NAME"],
  ChildData[i]["COLOR"],
  ChildData[i]["THICKNESS"],
  ChildData[i]["SKU_SIZE_IN_FEET"],
  ChildData[i]["SKU_SIZE_INC"],
  ChildData[i]["UOM"],
  ChildData[i]["QUANTITY_NO_OF_SHEET"],
  ChildData[i]["QUANTITY_IN_KGS"],
  ChildData[i]["QUANTITY_IN_METER"],
  "<a href='#' style='padding: 0px 0px;' class='DeleteExperience' onclick='DeleteExperience($(this));return false'><i class='glyphicon glyphicon-trash'></i></a>"
                        ]
  );
                    }
                }

                // if (UserRole != "FSO" && UserRole != "STOCKIST") {
                $('.DeleteExperience').css("pointer-events", "none");
                //  }

                //for (var i = 0; i < ChildData.length; i++) {
                //    $('#AddOrder').dataTable().fnAddData([ChildData[i]["PRODUCT_NAME"], ChildData[i]["UOM"], ChildData[i]["QUANTITY"], "<a href='#' style='padding: 0px 0px;' onclick='DeleteExperience($(this));return false'><i class='glyphicon glyphicon-trash'></i></a>"]);
                //}

                //  $('#DIMSOrderId').attr("disabled", true);
                //  $('#SalesOrderNumber').attr("disabled", true);


            });
            pageloading();
        }

        var StockistCode = $('#SessionUserCode').val();
        // var UserRole = $('#SessionUserRole').val();
        if (UserRole == "STOCKIST") {
            DIMSSFDCFactory.GetFSOIncharge(StockistCode).success(function (res) {
                if (res != "") {
                    var JsonData = JSON.parse(res);
                    $scope.FSOIncharge = JsonData[0]["EMPLOYEE_CODE"];
                    $scope.CustomerName = JsonData[0]["STOCKIST_NAME"];
                    $scope.SourceZone = JsonData[0]["Zone Name"];
                    $scope.State = JsonData[0]["STATE_DESC"];
                    $scope.Location = JsonData[0]["CITY"];
                    $scope.PinCode = JsonData[0]["POSTAL_CODE"];
                    $scope.BillingToAddress = JsonData[0]["Address"];
                    $scope.TerritoryArea = JsonData[0]["CUSTOMER_DISTRICT"];
                    $('#ZSCEmailId').val(JsonData[0]["EMAIL_ID"]);
                }
            });
            if (StockistCode != "") {
                $.ajax({
                    type: 'get',
                    async: 'false',
                    datatype: 'JSON',
                    data: { data: StockistCode },
                    url: '../../SFDC/GetCustomerCreditOutStanding',
                    success: function (data) {
                        if (data != "FALSE") {
                            var Res = JSON.parse(data);
                            if (Res != "") {
                                $('#CreditLimit').val(parseFloat(Res[0]["CUSTOMER_CREDIT_LIMIT"]).toFixed(2));
                                $('#OutStandingLimit').val(parseFloat(Res[0]["Current_OutStanding"]).toFixed(2));
                                $('#Above45Days_CreditLimit').val(parseFloat(Res[0]["Above45Days_OutStanding"]).toFixed(2));

                                $("#Product option[value='CCSheet']").prop('disabled', true);
                                $("#Product option[value='ACSheet']").prop('disabled', true);
                                for (var i = 0; i < Res.length; i++) {
                                    if (Res[i]["CustomerDivisionCode"] == "11") {
                                        // $('#Product').val("ACSheet");
                                        $("#Product option[value='ACSheet']").prop('disabled', false);
                                    } else if (Res[i]["CustomerDivisionCode"] == "14") {
                                        //  $('#Product').val("CCSheet");
                                        $("#Product option[value='CCSheet']").prop('disabled', false);
                                    } else {

                                    }
                                }
                            } else {
                                $('#CreditLimit').val(0.00);
                                $('#OutStandingLimit').val(0.00);
                            }
                        }
                    }
                });
            }
        }
        $scope.SaveStockistOrderData = function () {
            var DIMSOrderNo = $('#DIMSOrderId').val();
            var DIMSOrderDate = $("#OrderDate").val();
            var SONumber = $('#SalesOrderNumber').val();
            var SODate = $('#SODate').val();
            var BillToAddress = $('#BillingToAddress').val();
            var RetailerCode = $('#RetailerCode').val();
            var RetailerName = $('#RetailerName').val();
            var ShipToAddress = $('#ShipTo').val();
            var CreditLimit = $('#CreditLimit').val();
            var CurrentOutStanding = $('#OutStandingLimit').val();
            //var DeliveryType = $scope.DeliveryType;//Radio
            var DeliveryType = $("input[type='radio'][name='optradio']:checked").val();
            var ProductCategory = $('#Product').val();
            var FSOIncharge = $('#FSOIncharge').val();
            var ZCSEmail = $('#ZSCEmailId').val();

            var userRole = $('#SessionUserRole').val();

            if (userRole.trim() != "STOCKIST") {
                userRole = "EMPLOYEE";
            }
            var OrderDetails = new Array();
            if (RetailerCode == "") {
                alert("Please Enter Retailer code");
            } else if (RetailerCode != "" && RetailerName == "") {
                alert("Please Enter Valid Retailer code");
            }
            else if (DeliveryType == undefined || DeliveryType == null) {
                alert("Please select Delivery Type");
            }
            else if (($('#AddOrder').dataTable().fnSettings().aoData.length == 0) && ($('#AddCCSheetOrder').dataTable().fnSettings().aoData.length == 0)) {
                alert("Please Add Product Details");
            }
            else {
                if (CurrentOutStanding > CreditLimit) {
                    alert("Current Outstanding is morethan credit limit for the customer :" + $('#SessionUserCode').val());
                }




                if (ProductCategory == "ACSheet") {
                    var ACSheetTable = $('#AddOrder').dataTable().fnGetData();
                    for (var i = 0; i < ACSheetTable.length; i++) {
                        OrderDetails.push({
                            productType: ACSheetTable[i][0],
                            SKUSIze: ACSheetTable[i][1],
                            UOM: ACSheetTable[i][2],
                            QuantityNoOfSheet: ACSheetTable[i][3],
                            QuantityInRunning: ACSheetTable[i][4],
                            QuantityInMT: ACSheetTable[i][5]
                        });
                    }
                } else {
                    var CCSheetTable = $('#AddCCSheetOrder').dataTable().fnGetData();
                    for (var j = 0; j < CCSheetTable.length; j++) {
                        OrderDetails.push({
                            productType: CCSheetTable[j][0],
                            color: CCSheetTable[j][1],
                            Thickness: CCSheetTable[j][2],
                            SKUSizeFeet: CCSheetTable[j][3],
                            SKUSizeInch: CCSheetTable[j][4],
                            UOM: CCSheetTable[j][5],
                            QuantityNoOfSheet: CCSheetTable[j][6],
                            QuantityInKgs: CCSheetTable[j][7],
                            QuantityInMT: CCSheetTable[j][8]
                        });
                    }
                }


                var TotalOrderData = JSON.stringify({
                    "EditId": EditId,
                    "DIMSOrderID": DIMSOrderNo,
                    "DIMSOrderDate": DIMSOrderDate,
                    "SalesOrderNumber": SONumber,
                    "SODate": SODate,
                    "SalesEmployee": FSOIncharge,
                    "DeliverySource": "",
                    "PlantDepoName": "",
                    "PlantDepoEmail": ZCSEmail,
                    "SalesCoorinator": "",
                    "CustomerCode": $('#SessionUserCode').val(),
                    "CFormRequired": "",
                    "ProjectCustomer": "",
                    "RetailerCode": RetailerCode,
                    "BillingToAddress": BillToAddress,
                    "ShipTo": ShipToAddress,
                    "CreditLimit": CreditLimit,
                    "OutStandingLimit": CurrentOutStanding,
                    "DeliveryType": DeliveryType,
                    "ProductCategory": ProductCategory,
                    "OrderFrom": userRole,//Need to Insert
                    "CreatedBy": $('#SessionUserCode').val(),//Need to Insert
                    "OrderFrom": "STOCKIST",
                    "OrderDetails": OrderDetails//Child Table Data
                });
                $('#DIMSOrderId_html').text(DIMSOrderNo);
                $('#OrderDate_html').text(DIMSOrderDate);

                $('#Sales_Employee_html').text(FSOIncharge);
                $('#CustomerCode_html').text($('#SessionUserCode').val());
                $('#Sales_Employee_Name_html').text("-");

                $('#StockistName_html').text($('#CustomerName').val());

                $('#DeliverySource_html').text('-');

                $('#BillingToAddress_Html').text(BillToAddress);


                $('#Plant_DepoName_html').text('-');

                $('#RetailerCode_html').text(RetailerCode);

                $('#Location_html').text($('#Location').val());

                $('#RetailerName_html').text($('#RetailerName').val());


                $('#TerritoryArea_html').text($('#TerritoryArea').val());

                $('#ShipTo_html').text(ShipToAddress);

                $('#State_html').text($('#State').val());

                $('#SourceZone_html').text('-');

                $('#PinCode_html').text($('#PinCode').val());

                $('#CreditLimit_html').text(CreditLimit);
                $('#CFormRequired_html').text("-");
                $('#ProjectCustomer_html').text("-");
                $('#OutStandingLimit_html').text(CurrentOutStanding);
                $('#DeliveryType_html').text(DeliveryType);
                var OrderDetailsHtml = $('#addOrderview_HTML').html();
                if (ProductCategory == "ACSheet") {
                    OrderDetailsHtml += "<div style='height: 25px;'></div><table border='1' id='AddOrderAcSheet_Html'>" + $('#AddOrder thead').html() + $('#AddOrder tbody').html() + $('#AddOrder tfoot').html() + "</table>  <div style='height: 25px;'></div>";
                    var ptr = $("#AddOrderAcSheet_Html").find("tr");
                    ptr.find("td:last").remove();
                    ptr.find("th:last").remove();

                } else {
                    OrderDetailsHtml += "<div style='height: 25px;'></div><table border='1' id='AddOrderCCSheet_Html'>" + $('#AddCCSheetOrder thead').html() + $('#AddCCSheetOrder tbody').html() + $('#AddCCSheetOrder tfoot').html() + "</table>  <div style='height: 25px;'></div>";
                    var ptr = $("#AddOrderCCSheet_Html").find("tr");
                    ptr.find("td:last").remove();
                    ptr.find("th:last").remove();
                }
                ShowLoader();
                DIMSSFDCFactory.SaveOrderData(TotalOrderData).success(function (response) {
                    if (response == "Insert") {
                        alert("Order Created Successfully");
                        $scope.go('DailyOrderTracking');
                        $scope.SendEmailCoordinater(OrderDetailsHtml, ZCSEmail, DIMSOrderNo);
                    } else if (response == "Fail") {
                        HideLoader();
                        alert("Error Occured while Saving");
                    } else if (response == "Update") {
                        HideLoader();
                        alert("Update Successfully");
                        $scope.go('DailyOrderTracking');
                    } else if (response == "UpdateFail") {
                        HideLoader();
                        alert("Error Occured while Update");
                    } else {
                        HideLoader();
                        alert(response);
                    }
                });
            }
        }

        function pageloading() {
            var UserRole = $('#SessionUserRole').val();
            // if (UserRole != "FSO" && UserRole != "STOCKIST") {
            $('#AddNew').css("pointer-events", "none");
            $('#SaveStockistOrderData').css("pointer-events", "none");
            $('.input-group-btn').children('.btn-default').css("pointer-events", "none");

            $("input[type=radio]").attr('disabled', true);
            $("input[type=checkbox]").attr('disabled', true);
            $('#ActionControls').children().children('.btn-info').css("pointer-events", "none");
            $('#Plant_DepoName').attr("disabled", "disabled");
            //  }
        }
    });

    $scope.SendEmailCoordinater = function (OrderDetails, PlantDepoEmail, DIMSId) {
        $.ajax({
            url: '../../Home/ExportdataFinanceDashboard',
            type: 'POST',
            async: false,
            data: { QueryVal: OrderDetails },
            success: function (result) {
                if (result == "ok") {
                    $.ajax({
                        type: 'POST',
                        url: '../../SFDC/SendOrderDetails',
                        data: { "SenderEmail": PlantDepoEmail, "MailSubject": DIMSId },
                        success: function (res) {
                            // alert(res);  
                            console.log(res);
                            HideLoader();
                        },
                        error: function (e) {
                            HideLoader();
                            console.log("SFDC/SendOrderDetails :" + e);
                        }
                    });
                }
            },
            error: function (e) {
                HideLoader();
                console.log("Home/ExportdataFinanceDashboard :" + e);
            }
        });
    }

    $scope.GetdataForCustomer = function (Methodname, MasterType, Heading) {
        var FSOEmpCode = $('#FSOIncharge').val();
        if (FSOEmpCode != "") {
            //var Data = JSON.stringify({
            //    MasterType: MasterType,
            //    "EmployeeCode": FSOEmpCode,
            //    ID: "2"
            //});
            //DIMSSFDCFactory.getMasterData(Data).success(function (response) {
            //    getLookUpData(response, Methodname, Heading);
            //});
            WhereClause = "";
            var Data = JSON.stringify({
                MasterType: MasterType,
                ID: "561",
                UserCode: FSOEmpCode,
                "Role": "FSO",
                "Type": "Get",
                ReportName: "SFDCCustomerMasterList",
                WhereClause: WhereClause
            });

            DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
                var Result = JSON.parse(response.tabledata);

                if (Result != "") {
                    $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
                    if (Result.hasOwnProperty('UserListColumnNames')) {
                        var data1 = JSON.parse(Result["UserListColumnNames"]);

                        var selectedcolumnname = data1["ColumnNames"];

                        CustomColumnID = Result["UserListID"];
                        $('#undo_redo_to').empty();
                        var ColArray = new Array();
                        for (var i = 0; i < selectedcolumnname.length; i++) {


                            ColArray.push({
                                "data": selectedcolumnname[i],
                                "name": selectedcolumnname[i], "bSortable": true
                            });
                            $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                        }
                        //$scope.UserSelectedColumnName = ColArray;
                        UserSelectedColumnName = ColArray;
                    } else {

                        var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                        var selectedcolumnname = data1["ColumnNames"];

                        CustomColumnID = "0";

                        $('#undo_redo_to').empty();
                        var ColArray = new Array();
                        for (var i = 0; i < selectedcolumnname.length; i++) {
                            ColArray.push({
                                "data": selectedcolumnname[i],
                                "name": selectedcolumnname[i],
                                "bSortable": "true"
                            });
                            $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                        }
                        //$scope.UserSelectedColumnName = ColArray;
                        UserSelectedColumnName = ColArray;
                    }
                }
                ShowLoader();
                DIMSFactory.getReportData(Data).success(function (response) {

                    ShowLoader();
                    var OnclickClass = "";
                    if (Methodname == "GetStockistRetailerList") {
                        OnclickClass = "RetailerRowClick";
                    } else {
                        OnclickClass = "CustomerRowClick";
                    }
                    getLookUpData_Preview_ServerSide_SFDC_CustomerMaster("", Heading, "ReportPreviewTable", "ReportsPopUpModal", "PreviewStatus", UserSelectedColumnName, OnclickClass);
                    //  getLookUpData_Preview_ServerSide("", "Customer Master", "CustomerMasterTable", "ReportsPopUpModal", "PreviewStatus", UserSelectedColumnName);
                    //  getLookUpData_Preview_ServerSide("", "EnrollmentNodataLabel", "", "DailyOrder", UserSelectedColumnName);
                    //getLookUpData_Preview_ServerSide("", "Preview", "ReportPreviewTable", "ReportsPopUpModal", "PreviewStatus", UserSelectedColumnName);
                    HideLoader();
                    //   getLookUpData_Preview_ServerSide("", "EnrollmentNodataLabel", Heading, "PopHeading", UserSelectedColumnName);
                });
            });
        }
    }
    $("#Quantity").keypress(function (event) {
        return onlyNumerics(event);
    });
    $("#RetailerCode").keypress(function (event) {
        return onlyNumerics(event);
    });
    //$("#RetailerCode").keypress(function (event) {
    //    return onlyNumerics(event);
    //});

    $("#RetailerCode").on('keyup', function (event) {
        if ($('#RetailerCode').val().length == 7 && onlyNumerics(event) == false) {
            DIMSSFDCFactory.GetFSOIncharge($('#RetailerCode').val()).success(function (res) {
                if (res != "") {
                    var JsonData = JSON.parse(res);
                    $('#RetailerName').val(JsonData[0]["STOCKIST_NAME"]);
                    $('#ShipTo').val(JsonData[0]["Address"]);
                    $('#RetailerCode').trigger("focusout");
                } else {
                    $('#RetailerName').val("");
                    $('#ShipTo').val("");
                }
            });
        } else {
            $('#RetailerName').val("");
            $('#ShipTo').val("");
        }

    });
    //$("#RetailerCode").change(function () {
    //    alert("asdf");
    //});

    $("#ReportPreviewTable").delegate("tr.RetailerRowClick", "click", function () {
        GetStockistRetailerList(this);
    });
});

//mani region start

DIMS.controller('SchemesList', function ($scope, $location, DIMSSFDCFactory, DIMSFactory) {

    $scope.templatesettings = { HeaderTitle: "Schemes List" };
    $scope.go = function (path) {

        $location.path(path);
    };

    var width = $(window).width(), height = $(window).height();
    // var totalheight = height - 191;
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    //jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
    //$('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    //$('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------

    //var Data = JSON.stringify({
    //    ListType: "GetSchemeListDetails",
    //    ID: "2"
    //});
    //DIMSSFDCFactory.GetAllPagesList(Data).success(function (response) {

    //    $('#SchemesList tbody').empty();

    //    $("#SchemesList").DataTable({
    //        // "bScrollCollapse": true
    //    });
    //    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');//--------
    //    var Result = JSON.parse(response.tabledata);
    //    for (var i = 0; i < Result.length; i++) {

    //        $('#SchemesList').dataTable().fnAddData([Result[i]["ID"], Result[i]["Scheme Id"], Result[i]["Scheme Name"], Result[i]["Scheme Description"], Result[i]["Category"], Result[i]["Product"], Result[i]["start Date"], Result[i]["End Date"], Result[i]["Scheme Eligibility"], Result[i]["Zone Code"], Result[i]["State Code"], Result[i]["Area Code"], Result[i]["STATUS"], "1", "2", "3", "4", "5", ""]);


    //        $("#SchemesList").DataTable().column(0).visible(false);
    //        // $("#SchemesList").DataTable().columns.adjust().draw(false);

    //        //SCHEME NAME BINDING
    //        var SchemeName = Result[i]["Scheme Name"];
    //        var SchemeNameexists = $('#SchemeName option').filter(function () {
    //            return $(this).text() == SchemeName;
    //        }).length;


    //        if ((Result[i]["Scheme Name"] != "") && (SchemeNameexists == 0)) {
    //            $('#SchemeName')[0].sumo.add(Result[i]["Scheme Name"], Result[i]["Scheme Name"]);
    //        }

    //        //CATEGORY BINDING
    //        var Category = Result[i]["Category"];
    //        var Categoryexists = $('#Category option').filter(function () {
    //            return $(this).text() == Category;
    //        }).length;


    //        if ((Result[i]["Category"] != "") && (Categoryexists == 0)) {
    //            $('#Category')[0].sumo.add(Result[i]["Category"], Result[i]["Category"]);
    //        }

    //        //PRODUCT BINDING

    //        var Product = Result[i]["Product"];
    //        var Productexists = $('#Product option').filter(function () {
    //            return $(this).text() == Product;
    //        }).length;


    //        if ((Result[i]["Product"] != "") && (Productexists == 0)) {
    //            $('#Product')[0].sumo.add(Result[i]["Product"], Result[i]["Product"]);
    //        }


    //        //ZONE BINDING

    //        var Zone = Result[i]["Zone Code"];
    //        var Zoneexists = $('#Zone option').filter(function () {
    //            return $(this).text() == Zone;
    //        }).length;


    //        if ((Result[i]["Zone Code"] != "") && (Zoneexists == 0)) {
    //            $('#Zone')[0].sumo.add(Result[i]["Zone Code"], Result[i]["Zone Code"]);
    //        }


    //        //STATE BINDING

    //        var State = Result[i]["State Code"];
    //        var Stateexists = $('#State option').filter(function () {
    //            return $(this).text() == State;
    //        }).length;


    //        if ((Result[i]["State Code"] != "") && (Stateexists == 0)) {
    //            $('#State')[0].sumo.add(Result[i]["State Code"], Result[i]["State Code"]);
    //        }

    //        //LOCATION BINDING

    //        var Location = Result[i]["Location Code"];
    //        var Locationexists = $('#Location option').filter(function () {
    //            return $(this).text() == Location;
    //        }).length;


    //        if ((Result[i]["Location Code"] != "") && (Locationexists == 0)) {
    //            $('#Location')[0].sumo.add(Result[i]["Location Code"], Result[i]["Location Code"]);
    //        }

    //        //AREA BINDING

    //        var Area = Result[i]["Area Code"];
    //        var Areaexists = $('#Area option').filter(function () {
    //            return $(this).text() == Area;
    //        }).length;


    //        if ((Result[i]["Area Code"] != "") && (Areaexists == 0)) {
    //            $('#Area')[0].sumo.add(Result[i]["Area Code"], Result[i]["Area Code"]);
    //        }


    //        //
    //    }

    //    //$("#SchemesList").DataTable().column(0).visible(false);
    //    //$("#SchemesList").DataTable().columns.adjust().draw(false);
    //    //var firstRowsHeght = 0;
    //    //for (var j = 0; j < 5; j++) {
    //    //    firstRowsHeght += $('#DailyOrder tr').eq(j).height();
    //    //}

    //    //   alert($('.dataTables_scroll table > tbody').html());
    //    //   $('.dataTables_scroll').css({ "max-height": '', 'overflow': '' });

    //    //  $('.dataTables_scroll table > tbody').css({ "max-height": firstRowsHeght, "overflow-y": "auto" });

    //    $('#SchemesList tbody').on('click', 'tr', function () {

    //        var ID = $(this).find('td:eq(0)').text();

    //        if ($(this).hasClass('selected')) {
    //            $(this).removeClass('selected');
    //        }
    //        else {
    //            $("#SchemesList").DataTable().$('tr.selected').removeClass('selected');
    //            $(this).addClass('selected');
    //        }
    //        if (ID != "") {
    //            var scope = angular.element($("#SchemeListId")).scope();
    //            scope.$apply(function () {
    //                scope.go("AddScheme/" + ID);
    //            })
    //            // $scope.EditID = ID;             
    //            //$scope.go("AddOrder/" + ID);
    //            //var scope = angular.element($("#InvestigationlistDiv")).scope();
    //            //scope.$apply(function () {
    //            //    scope.go("Investigation/" + ID);
    //            //})
    //        }

    //    });
    //});

    var UserCode = '561';

    var Data = JSON.stringify({
        ID: UserCode,
        UserCode: UserCode,
        ReportName: "SchemesList"
    });

    DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
        ShowLoader();
        alert(response.tabledata)
        var Result = JSON.parse(response.tabledata);

        if (Result != "") {
            $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];

            if (Result.hasOwnProperty('UserListColumnNames')) {
                var data1 = JSON.parse(Result["UserListColumnNames"]);

                var selectedcolumnname = data1["ColumnNames"];

                CustomColumnID = Result["UserListID"];
                $('#undo_redo_to').empty();
                var ColArray = new Array();
                for (var i = 0; i < selectedcolumnname.length; i++) {
                    ColArray.push({
                        "data": selectedcolumnname[i],
                        "name": selectedcolumnname[i], "bSortable": true

                    });
                    $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                }
                //$scope.UserSelectedColumnName = ColArray;
                UserSelectedColumnName = ColArray;
            } else {

                var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                var selectedcolumnname = data1["ColumnNames"];

                CustomColumnID = "0";

                $('#undo_redo_to').empty();
                var ColArray = new Array();
                for (var i = 0; i < selectedcolumnname.length; i++) {
                    ColArray.push({
                        "data": selectedcolumnname[i],
                        "name": selectedcolumnname[i]
                    });
                    $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                }
                //$scope.UserSelectedColumnName = ColArray;
                UserSelectedColumnName = ColArray;
            }


            HideLoader();
        }

    }).error(function () {
        alert("Technical error has been occured");
        HideLoader();
    });

    var WhereCondition = "";
    var Data1 = JSON.stringify({
        ID: UserCode,
        UserCode: UserCode,
        ReportName: "SchemesList",
        WhereClause: WhereCondition, "Type": "Get"

    });
    //ShowLoader();
    setTimeout(function () {
        DIMSFactory.getReportData(Data1).success(function (response) {

            getLookUpData_Reports_ServerSideBinding("", "SchemesList", "SchemesList", "SchemesList", UserSelectedColumnName);
            HideLoader();

        }).error(function (data, status) {

        });
    }, 1000);


    //setTimeout(function () { alert($("#SchemesList tbody tr").length); }, 2000)


    angular.element(document).on('click', '#SchemesList tbody', function () {

        var ID = $(this).find('td:eq(2)').text();
        alert(ID);
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $("#SchemesList").DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        if (ID != "") {
            var scope = angular.element($("#SchemeListId")).scope();
            scope.$apply(function () {
                scope.go("AddScheme/" + ID);
            })

        }

    });
    //$('#SchemesList tbody').on('click', 'tr', function () {
    //    alert("hjh");
    //            var ID = $(this).find('td:eq(2)').text();
    //            alert(ID);
    //            if ($(this).hasClass('selected')) {
    //                $(this).removeClass('selected');
    //            }
    //            else {
    //                $("#SchemesList").DataTable().$('tr.selected').removeClass('selected');
    //                $(this).addClass('selected');
    //            }
    //            if (ID != "") {
    //                var scope = angular.element($("#SchemeListId")).scope();
    //                scope.$apply(function () {
    //                    scope.go("AddScheme/" + ID);
    //                })

    //            }

    //});




    angular.element(document).on('click', '.options li', function () {
        //Getting Scheme Names with comma seprated
        var scheme = $("#SchemeName").val();
        var SchemeNames = "";
        if (scheme != null) {
            for (var i = 0; i < scheme.length; i++) {
                if (i == 0) {
                    SchemeNames = "'" + scheme[i] + "'";
                }
                else {
                    SchemeNames += "," + "'" + scheme[i] + "'";
                }
            }
        }
        else {
            SchemeNames = "Scheme Name";
        }
        //getting Category

        var Category = $("#Category").val();
        var CategoryNames = "";
        if (Category != null) {
            for (var i = 0; i < Category.length; i++) {
                if (i == 0) {
                    CategoryNames = "'" + Category[i] + "'";
                }
                else {
                    CategoryNames += "," + "'" + Category[i] + "'";
                }
            }
        }
        else {
            CategoryNames = "Category Name";
        }
        //Getting Product
        var Product = $("#Product").val();
        var ProductNames = "";
        if (Product != null) {
            for (var i = 0; i < Product.length; i++) {
                if (i == 0) {
                    ProductNames = "'" + Product[i] + "'";
                }
                else {
                    ProductNames += "," + "'" + Product[i] + "'";
                }
            }
        }
        else {
            ProductNames = "Product Name";
        }
        //Getting ZoneCodes

        var Zone = $("#Zone").val();
        var ZoneCodes = "";
        if (Zone != null) {
            for (var i = 0; i < Zone.length; i++) {
                if (i == 0) {
                    ZoneCodes = "'" + Zone[i] + "'";
                }
                else {
                    ZoneCodes += "," + "'" + Zone[i] + "'";
                }
            }
        }
        else {
            ZoneCodes = "Zone Name";
        }
        //Getting AreaCodes
        var Area = $("#Area").val();
        var AreaCodes = "";
        if (Area != null) {
            for (var i = 0; i < Area.length; i++) {
                if (i == 0) {
                    AreaCodes = "'" + Area[i] + "'";
                }
                else {
                    AreaCodes += "," + "'" + Area[i] + "'";
                }
            }
        }
        else {
            AreaCodes = "Area Name";
        }

        //Getting States
        var States = $("#State").val();
        var StatesCodes = "";
        if (States != null) {
            for (var i = 0; i < States.length; i++) {
                if (i == 0) {
                    StatesCodes = "'" + States[i] + "'";
                }
                else {
                    StatesCodes += "," + "'" + States[i] + "'";
                }
            }
        }
        else {
            StatesCodes = "State Name";
        }
        //Getting Location

        var Location = $("#Location").val();
        var LocationNames = "";
        if (Location != null) {
            for (var i = 0; i < Location.length; i++) {
                if (i == 0) {
                    LocationNames = "'" + Location[i] + "'";
                }
                else {
                    LocationNames += "," + "'" + Location[i] + "'";
                }
            }
        }

        else {
            LocationNames = "Location Name";
        }

        var StartDate = $scope.StartDate;
        var EndDate = $scope.EndDate;

        if (StartDate == undefined || StartDate == "") { StartDate = "From Date" }

        if (EndDate == undefined || EndDate == "") { EndDate = "To Date" }

        var FilterDataForSchemes = JSON.stringify({ "Category": CategoryNames, "SchemeNames": SchemeNames, "Product": ProductNames, "Zone": ZoneCodes, "Area": AreaCodes, "Location": LocationNames, "State": StatesCodes, "FromDate": StartDate, "ToDate": EndDate });



        DIMSSFDCFactory.GetFilterDataForSchemes(FilterDataForSchemes).success(function (response) {

            $('#SchemesList').dataTable().fnClearTable();

            jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');//--------
            if (response != "No Data") {

                var Result = JSON.parse(response);

                for (var i = 0; i < Result.length; i++) {

                    $('#SchemesList').dataTable().fnAddData([Result[i]["ID"], Result[i]["Scheme Id"], Result[i]["Scheme Name"], Result[i]["Scheme Description"], Result[i]["Category"], Result[i]["Product"], Result[i]["start Date"], Result[i]["End Date"], Result[i]["Scheme Eligibility"], Result[i]["Zone Code"], Result[i]["State Code"], Result[i]["Area Code"], Result[i]["STATUS"], "1", "2", "3", "4", "5", ""]);

                    $("#SchemesList").DataTable().column(0).visible(false);
                }
            }
            $('#SchemesList tbody').on('click', 'tr', function () {


                var ID = $(this).find('td:eq(0)').text();

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    $("#SchemesList").DataTable().$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
                if (ID != "") {
                    var scope = angular.element($("#SchemeListId")).scope();
                    scope.$apply(function () {
                        scope.go("AddScheme/" + ID);
                    })
                    // $scope.EditID = ID;             
                    //$scope.go("AddOrder/" + ID);
                    //var scope = angular.element($("#InvestigationlistDiv")).scope();
                    //scope.$apply(function () {
                    //    scope.go("Investigation/" + ID);
                    //})
                }

            });
        });

    });
    angular.element(document).on('changeDate', '#FromDate', function () {

        var StartDate = $scope.StartDate;
        var EndDate = $scope.EndDate;


        var MyDate = $("#FromDate").val();
        if ($("#FromDate").val() != "") {
            //$("#Invoice_Details").val($("#Date_Supply_From").val() + " " + "To" + " " + $("#Date_Supply_TO").val());
            $("#ToDate").datepicker('setStartDate', MyDate);
            // $("#ToDate").val("");
        }

        //var dateObj = new Date(StartDate);
        //alert(dateObj);

        //var New = new Date(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate(), 0, 0, 0, 0);
        //$("#ToDate").datepicker({
        //    format: 'dd/mm/yyyy',
        //    startDate: StartDate
        //});


        if (StartDate == undefined || StartDate == "") { StartDate = "From Date" }

        if (EndDate == undefined || EndDate == "") { EndDate = "To Date" }

        //Getting Scheme Names with comma seprated
        var scheme = $("#SchemeName").val();
        var SchemeNames = "";
        if (scheme != null) {
            for (var i = 0; i < scheme.length; i++) {
                if (i == 0) {
                    SchemeNames = "'" + scheme[i] + "'";
                }
                else {
                    SchemeNames += "," + "'" + scheme[i] + "'";
                }
            }
        }
        else {
            SchemeNames = "Scheme Name";
        }
        //getting Category

        var Category = $("#Category").val();
        var CategoryNames = "";
        if (Category != null) {
            for (var i = 0; i < Category.length; i++) {
                if (i == 0) {
                    CategoryNames = "'" + Category[i] + "'";
                }
                else {
                    CategoryNames += "," + "'" + Category[i] + "'";
                }
            }
        }
        else {
            CategoryNames = "Category Name";
        }
        //Getting Product
        var Product = $("#Product").val();
        var ProductNames = "";
        if (Product != null) {
            for (var i = 0; i < Product.length; i++) {
                if (i == 0) {
                    ProductNames = "'" + Product[i] + "'";
                }
                else {
                    ProductNames += "," + "'" + Product[i] + "'";
                }
            }
        }
        else {
            ProductNames = "Product Name";
        }
        //Getting ZoneCodes

        var Zone = $("#Zone").val();
        var ZoneCodes = "";
        if (Zone != null) {
            for (var i = 0; i < Zone.length; i++) {
                if (i == 0) {
                    ZoneCodes = "'" + Zone[i] + "'";
                }
                else {
                    ZoneCodes += "," + "'" + Zone[i] + "'";
                }
            }
        }
        else {
            ZoneCodes = "Zone Name";
        }
        //Getting AreaCodes
        var Area = $("#Area").val();
        var AreaCodes = "";
        if (Area != null) {
            for (var i = 0; i < Area.length; i++) {
                if (i == 0) {
                    AreaCodes = "'" + Area[i] + "'";
                }
                else {
                    AreaCodes += "," + "'" + Area[i] + "'";
                }
            }
        }
        else {
            AreaCodes = "Area Name";
        }

        //Getting States
        var States = $("#States").val();
        var StatesCodes = "";
        if (States != null) {
            for (var i = 0; i < States.length; i++) {
                if (i == 0) {
                    StatesCodes = "'" + States[i] + "'";
                }
                else {
                    StatesCodes += "," + "'" + States[i] + "'";
                }
            }
        }
        else {
            StatesCodes = "State Name";
        }
        //Getting Location
        //var Location = $("#Location").val();

        var Location = $scope.Location;

        var LocationNames = "";
        if (Location != null) {
            for (var i = 0; i < Location.length; i++) {
                if (i == 0) {
                    LocationNames = "'" + Location[i] + "'";
                }
                else {
                    LocationNames += "," + "'" + Location[i] + "'";
                }
            }
        }
        else {
            LocationNames = "Location Name";
        }



        var FilterDataForSchemes = JSON.stringify({ "Category": CategoryNames, "SchemeNames": SchemeNames, "Product": ProductNames, "Zone": ZoneCodes, "Area": AreaCodes, "Location": LocationNames, "State": StatesCodes, "FromDate": StartDate, "ToDate": EndDate });

        //alert(FilterDataForSchemes);

        DIMSSFDCFactory.GetFilterDataForSchemes(FilterDataForSchemes).success(function (response) {

            $('#SchemesList').dataTable().fnClearTable();

            jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');//--------
            if (response != "No Data") {

                var Result = JSON.parse(response);

                for (var i = 0; i < Result.length; i++) {

                    $('#SchemesList').dataTable().fnAddData([Result[i]["ID"], Result[i]["Scheme Id"], Result[i]["Scheme Name"], Result[i]["Scheme Description"], Result[i]["Category"], Result[i]["Product"], Result[i]["start Date"], Result[i]["End Date"], Result[i]["Scheme Eligibility"], Result[i]["Zone Code"], Result[i]["State Code"], Result[i]["Area Code"], Result[i]["STATUS"], "1", "2", "3", "4", "5", ""]);

                    $("#SchemesList").DataTable().column(0).visible(false);
                }
            }
            $('#SchemesList tbody').on('click', 'tr', function () {


                var ID = $(this).find('td:eq(0)').text();

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    $("#SchemesList").DataTable().$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
                if (ID != "") {
                    var scope = angular.element($("#SchemeListId")).scope();
                    scope.$apply(function () {
                        scope.go("AddScheme/" + ID);
                    })
                    // $scope.EditID = ID;             
                    //$scope.go("AddOrder/" + ID);
                    //var scope = angular.element($("#InvestigationlistDiv")).scope();
                    //scope.$apply(function () {
                    //    scope.go("Investigation/" + ID);
                    //})
                }

            });
        });

    });
    angular.element(document).on('changeDate', '#ToDate', function () {

        var StartDate = $scope.StartDate;
        var EndDate = $scope.EndDate;

        //var dateObj = new Date(StartDate);
        //alert(dateObj);

        //var New = new Date(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate(), 0, 0, 0, 0);
        $("#ToDate").datepicker({
            format: 'dd/mm/yyyy',
            startDate: StartDate
        });


        if (StartDate == undefined || StartDate == "") { StartDate = "From Date" }

        if (EndDate == undefined || EndDate == "") { EndDate = "To Date" }

        //Getting Scheme Names with comma seprated
        var scheme = $("#SchemeName").val();
        var SchemeNames = "";
        if (scheme != null) {
            for (var i = 0; i < scheme.length; i++) {
                if (i == 0) {
                    SchemeNames = "'" + scheme[i] + "'";
                }
                else {
                    SchemeNames += "," + "'" + scheme[i] + "'";
                }
            }
        }
        else {
            SchemeNames = "Scheme Name";
        }
        //getting Category

        var Category = $("#Category").val();
        var CategoryNames = "";
        if (Category != null) {
            for (var i = 0; i < Category.length; i++) {
                if (i == 0) {
                    CategoryNames = "'" + Category[i] + "'";
                }
                else {
                    CategoryNames += "," + "'" + Category[i] + "'";
                }
            }
        }
        else {
            CategoryNames = "Category Name";
        }
        //Getting Product
        var Product = $("#Product").val();
        var ProductNames = "";
        if (Product != null) {
            for (var i = 0; i < Product.length; i++) {
                if (i == 0) {
                    ProductNames = "'" + Product[i] + "'";
                }
                else {
                    ProductNames += "," + "'" + Product[i] + "'";
                }
            }
        }
        else {
            ProductNames = "Product Name";
        }
        //Getting ZoneCodes

        var Zone = $("#Zone").val();
        var ZoneCodes = "";
        if (Zone != null) {
            for (var i = 0; i < Zone.length; i++) {
                if (i == 0) {
                    ZoneCodes = "'" + Zone[i] + "'";
                }
                else {
                    ZoneCodes += "," + "'" + Zone[i] + "'";
                }
            }
        }
        else {
            ZoneCodes = "Zone Name";
        }
        //Getting AreaCodes
        var Area = $("#Area").val();
        var AreaCodes = "";
        if (Area != null) {
            for (var i = 0; i < Area.length; i++) {
                if (i == 0) {
                    AreaCodes = "'" + Area[i] + "'";
                }
                else {
                    AreaCodes += "," + "'" + Area[i] + "'";
                }
            }
        }
        else {
            AreaCodes = "Area Name";
        }

        //Getting States
        var States = $("#States").val();
        var StatesCodes = "";
        if (States != null) {
            for (var i = 0; i < States.length; i++) {
                if (i == 0) {
                    StatesCodes = "'" + States[i] + "'";
                }
                else {
                    StatesCodes += "," + "'" + States[i] + "'";
                }
            }
        }
        else {
            StatesCodes = "State Name";
        }
        //Getting Location
        //var Location = $("#Location").val();

        var Location = $scope.Location;

        var LocationNames = "";
        if (Location != null) {
            for (var i = 0; i < Location.length; i++) {
                if (i == 0) {
                    LocationNames = "'" + Location[i] + "'";
                }
                else {
                    LocationNames += "," + "'" + Location[i] + "'";
                }
            }
        }
        else {
            LocationNames = "Location Name";
        }



        var FilterDataForSchemes = JSON.stringify({ "Category": CategoryNames, "SchemeNames": SchemeNames, "Product": ProductNames, "Zone": ZoneCodes, "Area": AreaCodes, "Location": LocationNames, "State": StatesCodes, "FromDate": StartDate, "ToDate": EndDate });
        DIMSSFDCFactory.GetFilterDataForSchemes(FilterDataForSchemes).success(function (response) {

            $('#SchemesList').dataTable().fnClearTable();

            jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');//--------
            if (response != "No Data") {

                var Result = JSON.parse(response);

                for (var i = 0; i < Result.length; i++) {

                    $('#SchemesList').dataTable().fnAddData([Result[i]["ID"], Result[i]["Scheme Id"], Result[i]["Scheme Name"], Result[i]["Scheme Description"], Result[i]["Category"], Result[i]["Product"], Result[i]["start Date"], Result[i]["End Date"], Result[i]["Scheme Eligibility"], Result[i]["Zone Code"], Result[i]["State Code"], Result[i]["Area Code"], Result[i]["STATUS"], "1", "2", "3", "4", "5", ""]);

                    $("#SchemesList").DataTable().column(0).visible(false);
                }
            }
            $('#SchemesList tbody').on('click', 'tr', function () {


                var ID = $(this).find('td:eq(0)').text();

                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    $("#SchemesList").DataTable().$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
                if (ID != "") {
                    var scope = angular.element($("#SchemeListId")).scope();
                    scope.$apply(function () {
                        scope.go("AddScheme/" + ID);
                    })
                    // $scope.EditID = ID;             
                    //$scope.go("AddOrder/" + ID);
                    //var scope = angular.element($("#InvestigationlistDiv")).scope();
                    //scope.$apply(function () {
                    //    scope.go("Investigation/" + ID);
                    //})
                }

            });
        });

    });

    $scope.ResetSchemeData = function () {
        //alert("hai");
        $scope.go('SchemesList/');
    }

});

DIMS.controller('AddScheme', function ($scope, $location, DIMSSFDCFactory, $routeParams) {
    AddNewSchemeScope = $scope;
    $scope.templatesettings = { HeaderTitle: "Add Scheme" };
    $scope.go = function (path) {
        $location.path(path);
    };
    angular.element(document).ready(function () {



        var width = $(window).width(), height = $(window).height();

        //   var totalheight = height - 191;
        var totalheight = height - 191;
        if (height <= 800) {
            totalheight = height - 148;
        }

        $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
        $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
        var EditId = $routeParams.ID;
        //alert(EditId);
        if (EditId == undefined || EditId == "") {
            DIMSSFDCFactory.GetSchemeId().success(function (response) {
                alert(response);
                // var IdAutoIncrement = parseInt(response) + 1;
                $scope.SchemeID = response;
            })
        }
        else {
            DIMSSFDCFactory.GetSchemeDataForEdit(EditId).success(function (response) {
                var BindResult = JSON.parse(response);
                $("#updatescheme").empty();
                $("#updatescheme").html("Update Scheme");
                $("#AddNewHide").hide();
                $scope.SchemeID = "";
                $scope.EditId = BindResult[0]["ID"];
                $scope.SchemeName = BindResult[0]["SCHEME_NAME"];
                $scope.SchemeID = BindResult[0]["SCHEME_ID"];
                $scope.SchemeDescription = BindResult[0]["SCHEME_DESCRIPTION"];
                $scope.Target = BindResult[0]["TARGET"];
                $scope.Eligibility = BindResult[0]["SCHEME_ELIGIBILITY"];
                $scope.Category = BindResult[0]["PRODUCT_CATEGORY_CODE"];
                $scope.Product = BindResult[0]["PRODUCT_CODE"];
                $scope.StartDate = BindResult[0]["START_DATE"];
                $scope.EndDate = BindResult[0]["END_DATE"];
                $scope.Zone = BindResult[0]["ZONE_CODE"];
                $scope.State = BindResult[0]["STATE_CODE"];
                $scope.TerritoryArea = BindResult[0]["AREA_CODE"];
                $scope.Location = BindResult[0]["LOCATION_CODE"];
                $scope.Status = BindResult[0]["STATUS"];
            });
        }
    });

    $("#Target").keypress(function (event) {
        return onlyNumerics(event);
    });

    $("#Eligibility").keypress(function (event) {
        return onlyNumerics(event);
    });
    $scope.SaveSchemesData = function () {
        var CreatedBy = $("#Created").html();
        var EditSchemeId = $scope.EditId;
        var SchemeName = $scope.SchemeName;
        var SchemeId = $scope.SchemeID;
        var SchemeDesc = $scope.SchemeDescription;
        var SchemeTarget = $scope.Target;
        var Eligibility = $scope.Eligibility;
        var Category = $scope.Category;
        var Product = $scope.Product;
        var StartDate = $scope.StartDate;
        var EndDate = $scope.EndDate;
        var Zone = $scope.Zone;
        var State = $scope.State;
        var TerritoryArea = $scope.TerritoryArea;
        var Location = $scope.Location;
        var Status = $scope.Status;

        if (EditSchemeId == "" || EditSchemeId == null) { EditSchemeId = 0; }
        if (SchemeName == "" || SchemeName == null) {
            alert("Please Enter Scheme Name");
        } else if (SchemeDesc == "" || SchemeDesc == null) {
            alert("Please Enter Scheme Description");
        } else if (SchemeTarget == "" || SchemeTarget == null) {
            alert("Please Enter Target");
        } else if (Eligibility == "" || Eligibility == null) {
            alert("Please Enter Eligibility");
        } else if (Category == "" || Category == null) {
            alert("Please Select Category");
        } else if (Product == "" || Product == null) {
            alert("Please Select Product");
        } else if (StartDate == "" || StartDate == null) {
            alert("Please Select Start Date");
        } else if (EndDate == "" || EndDate == null) {
            alert("Please Select End Date");
        } else if (Zone == "" || Zone == null) {
            alert("Please Select Zone");
        } else if (State == "" || State == null) {
            alert("Please Select State");
        }
        else if (TerritoryArea == "" || TerritoryArea == null) {
            alert("Please Select Territory/Area");
        }
            //else if (Location == "" || Location == null) {
            //    alert("Please Select Location");
            //}
        else if (Status == "" || Status == null) {
            alert("Please Select Status");
        } else {
            var TotalSchemeData = JSON.stringify({
                "EditSchemeId": EditSchemeId,
                "SchemeName": SchemeName,
                "SchemeId": SchemeId,
                "SchemeDesc": SchemeDesc,
                "SchemeTarget": SchemeTarget,
                "Eligibility": Eligibility,
                "Category": Category,
                "Product": Product,
                "StartDate": StartDate,
                "EndDate": EndDate,
                "Zone": Zone,
                "State": State,
                "TerritoryArea": TerritoryArea,
                "Location": Location,
                "Status": Status,
                "CreatedBy": CreatedBy
            });

            DIMSSFDCFactory.SaveSchemeData(TotalSchemeData).success(function (response) {
                if (response == "Insert") {
                    alert("Saved successfully");
                    //  $("#HolidayConfigListTable tbody").empty();

                    $scope.go('SchemesList');
                } else if (response == "Fail") {
                    alert("Error Occured while Saving");
                } else if (response == "Update") {
                    alert("Update Successfully");
                    $scope.go('SchemesList');

                } else if (response == "UpdateFail") {
                    alert("Error Occured while Update");
                } else {
                    alert(response);
                }
            });
        }

    }

    $scope.Getdata = function (Methodname, MasterType, Heading) {
        var State_Code = $scope.State;
        var Data = JSON.stringify({
            MasterType: MasterType,
            ID: "2",
            State_Code: State_Code
        });
        DIMSSFDCFactory.getMasterData(Data).success(function (response) {
            getLookUpData(response, Methodname, Heading);
        });
    }
});

DIMS.controller('EditScheme', function ($scope, $location, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Edit Scheme" };
    $scope.go = function (path) {
        $location.path(path);
    };
});

DIMS.controller('PartnerIssues', function ($scope, $location, DIMSSFDCFactory, $http, $compile, $routeParams, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Partner Issues" };
    $scope.go = function (path) {
        $location.path(path);
        CheckUserSession();
    };
    $('#PartnerIssueDiv').hide();
    var Data = JSON.stringify({
        MasterType: "SFDCPartnerIssues",
        ID: "2"
    });
    var width = $(window).width(), height = $(window).height();//---------

    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });//-----------


    $scope.Reset = function () {
        $scope.go('PartnerIssues/');
    }

    var data_value = ""; var all_zones = ""; var all_states = ""; var all_territories = ""; var all_customers = ""; var CustomerArray = new Array();
    ShowLoader();
    if ((SessionValue == "ZH") || (SessionValue == "RCC") || (SessionValue == "ZSC")) {
        $("#Zone").attr("disabled", false); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        //data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + "50001762" + "\"}";
        data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            if (FilterList.dtZone.length == 1) {
                $("#Zone").attr("disabled", true);
            }
            all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);

                if (FilterList.dtZone.length == 0) {
                    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterList.dtZone.length - 1) {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            $('select#Zone')[0].sumo.selectItem(0);
            $('#Zone').trigger("change");
            //all_states = "";
            //for (var i = 0; i < FilterList.dtState.length; i++) {
            //    if (FilterList.dtState.length == 0) {
            //        all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else if (i == FilterList.dtState.length - 1) {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
            //    }
            //}
            //all_territories = "";
            //for (var i = 0; i < FilterList.dtTerritory.length; i++) {
            //    if (FilterList.dtTerritory.length == 0) {
            //        all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else if (i == FilterList.dtTerritory.length - 1) {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
            //    }
            //}
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            //$('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            //}
        });
    } else if (SessionValue == "SH") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        //data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + "50002430" + "\"}";
        data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            if (FilterList.dtState.length == 1) {
                $("#State").attr("disabled", true);
            }
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            $('#State').trigger("change");
            //all_territories = "";
            //for (var i = 0; i < FilterList.dtTerritory.length; i++) {
            //    if (FilterList.dtTerritory.length == 0) {
            //        all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else if (i == FilterList.dtTerritory.length - 1) {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
            //    }
            //}
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            // }
        });
    }

    else if (SessionValue == "TM") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        //data_value = "{\"Role\":\"" + "TM" + "\",\"UserCode\":\"" + "50001144" + "\"}";
        data_value = "{\"Role\":\"" + "TM" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            if (FilterList.dtTerritory.length == 1) {
                $("#TerriotryArea").attr("disabled", true);
            }

            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            //all_customers = "";
            // for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            //}
        });
    }

    else if (SessionValue == "FSO" || SessionValue == "FSO_BU2") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        //data_value = "{\"Role\":\"" + "FSO" + "\",\"UserCode\":\"" + "50001906" + "\"}";
        if (SessionValue == "FSO") {
            data_value = "{\"Role\":\"" + "FSO" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        } else {
            data_value = "{\"Role\":\"" + "FSO_BU2" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        }
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            $('select#TerriotryArea')[0].sumo.selectItem(0);
            $('#TerriotryArea').trigger("change");
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            // }
        });
    }

    else if ((SessionValue == "STOCKIST") || (SessionValue == "C&F")) {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", true); $('#CustomerCode').attr("disabled", true); $('#CustomerCode').css({ "class": "gray" });// $("#StockistID").attr("disabled", true);
        //data_value = "{\"Role\":\"" + "STOCKIST" + "\",\"UserCode\":\"" + "1100002" + "\"}";
        data_value = "{\"Role\":\"" + "STOCKIST" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            $('select#TerriotryArea')[0].sumo.selectItem(0);
            //all_customers = "";
            for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                CustomerArray.push(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                $('#CustomerCode').val(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                //if (FilterList.dtCustomer.length == 0) {
                //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
                //} else if (i == FilterList.dtCustomer.length - 1) {
                //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
                //} else {
                //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
                //}
            }
            $("#CustomerCode").typeahead({
                source: CustomerArray
            });
            // $('select#StockistID')[0].sumo.selectItem(0);
        });
    } else {

        $("#Zone").attr("disabled", false); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        //data_value = "{\"Role\":\"" + "ADMIN" + "\",\"UserCode\":\"" + "50001657" + "\"}";
        data_value = "{\"Role\":\"" + SessionValue + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                if (FilterList.dtZone.length == 0) {
                    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterList.dtZone.length - 1) {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            CustomerArray.length = 0;
            $("#CustomerCode").val("");
            if (FilterList.dtCustomer.length > 0) {
                for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                    CustomerArray.push(FilterList.dtCustomer[i]["STOCKIST_ID"].toString() + ":" + FilterList.dtCustomer[i]["STOCKIST_NAME"].toString());
                }
            }
            //all_states = "";
            //for (var i = 0; i < FilterList.dtState.length; i++) {
            //    if (FilterList.dtState.length == 0) {
            //        all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else if (i == FilterList.dtState.length - 1) {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
            //    }
            //}
            //all_territories = "";
            //for (var i = 0; i < FilterList.dtTerritory.length; i++) {
            //    if (FilterList.dtTerritory.length == 0) {
            //        all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else if (i == FilterList.dtTerritory.length - 1) {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
            //    }
            //}
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            //$('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //   all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            //}
        });

    }
    HideLoader();
    $('#Zone').on('keyup change', function () {
        ShowLoader();
        var Clear_State = $('#State option').length;
        for (var i = 0; i < Clear_State; i++) {
            $('#State')[0].sumo.remove(0);
        }

        //   var Clear_Cust = $('#StockistID option').length;
        //  for (var i = 0; i < Clear_Cust; i++) {
        //      $('#StockistID')[0].sumo.remove(0);
        // }
        CustomerArray.length = 0;//---------------------------9
        $('#CustomerCode').val("");

        var Clear_Terrytory = $('#TerriotryArea option').length;
        for (var i = 0; i < Clear_Terrytory; i++) {
            $('#TerriotryArea')[0].sumo.remove(0);
        }

        if ($("#Zone option:selected").length == 0) {
            data_value = "{\"Role\":\"" + SessionValue + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
            $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
                var FilterList = JSON.parse(res);
                CustomerArray.length = 0;
                $("#CustomerCode").val("");
                if (FilterList.dtCustomer.length > 0) {

                    for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                        CustomerArray.push(FilterList.dtCustomer[i]["STOCKIST_ID"].toString() + ":" + FilterList.dtCustomer[i]["STOCKIST_NAME"].toString());
                    }
                }
                HideLoader();
            }).error(function () {
                HideLoader();
            });
        }
        else {
            var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
            $http({ url: '../../Home/GetStatesforZone', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res != "") {
                    var dtState = JSON.parse(res);
                    for (var i = 0; i < dtState.length; i++) {
                        $('#State')[0].sumo.add(dtState[i]["STATE_CODE"], dtState[i]["STATE_NAME"]);
                    }
                    HideLoader();
                } else { HideLoader(); }

                $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                    if (Cust_res != "") {
                        var dtCust = JSON.parse(Cust_res);
                        for (var i = 0; i < dtCust.length; i++) {
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//---------------------1
                            //   $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            //  $('#StockistName')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_NAME"].toString());
                        }
                    }
                });
            });
        }

    });

    var SelectedState = ""; var Actual_SelectedState = ""; var Actual_SelectedTerritory = "";
    $('#State').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedState = "";
        var Clear_Territory = $('#TerriotryArea option').length;
        for (var i = 0; i < Clear_Territory; i++) {
            $('#TerriotryArea')[0].sumo.remove(0);
        }
        // var Clear_Cust = $('#StockistID option').length;
        //  for (var i = 0; i < Clear_Cust; i++) {
        //     $('#StockistID')[0].sumo.remove(0);
        //  }

        CustomerArray.length = 0;//------------------------------------2
        $('#CustomerCode').val("");

        if ($('#State').val() != null) {
            var seleState = $('#State').val();

            for (var k = 0; k < seleState.length; k++) {
                SelectedState += "'" + seleState[k] + "',";
                Actual_SelectedState += "'" + seleState[k] + "',";
            }
            SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
            Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 
        }

        var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
        $http({ url: '../../Home/GetTerritoriesforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
            if (res != "") {

                var dtTerritory = JSON.parse(res);
                for (var i = 0; i < dtTerritory.length; i++) {
                    $('#TerriotryArea')[0].sumo.add(dtTerritory[i]["TERRITORY_CODE"], dtTerritory[i]["TERRITORY_NAME"]);
                }
                //  ShowLoader();
                $http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        // ShowLoader();

                        var dtCust = JSON.parse(res);

                        for (var i = 0; i < dtCust.length; i++) {
                            // $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());

                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//---------------------3
                        }
                        HideLoader();
                    } else {
                        HideLoader();
                    }
                });
            }
            HideLoader();
        });

        if ($("#State").val() == null) {
            var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
            if ((SessionValue != "SH") && (SessionValue != "TM") && (SessionValue != "FSO") && (SessionValue != "FSO_BU2") && (SessionValue != "STOCKIST") && (SessionValue != "C&F")) {
                $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                    if (Cust_res != "") {
                        var dtCust = JSON.parse(Cust_res);
                        for (var i = 0; i < dtCust.length; i++) {
                            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                        }
                        HideLoader();
                    } else {
                        HideLoader();
                    }
                });
            }
            HideLoader();
        }
        SelectedState = "";
        // HideLoader();
    });

    var SelectedTerritory = "";
    $('#TerriotryArea').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedTerritory = ""; Actual_SelectedState = "";
        if ((SessionValue == "TM") || (SessionValue == "FSO") || (SessionValue == "FSO_BU2")) {
            if ($("#TerriotryArea").val() == null) {
                //  var Clear_Cust = $('#StockistID option').length;
                //  for (var i = 0; i < Clear_Cust; i++) {
                //      $('#StockistID')[0].sumo.remove(0);
                //  }
                CustomerArray.length = 0;//-------------------------------------4
                $('#CustomerCode').val("");

                HideLoader();
            } else if ($("#TerriotryArea").val() != null) {
                var seleTerritory = $('#TerriotryArea').val();
                for (var k = 0; k < seleTerritory.length; k++) {
                    SelectedTerritory += "'" + seleTerritory[k] + "',";
                    Actual_SelectedTerritory += "'" + seleTerritory[k] + "',";
                }
                SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTerritory = Actual_SelectedTerritory.substring(',', Actual_SelectedTerritory.length - 1);//Selected Territories with ' '. 

                var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                $http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {
                            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"], dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);//--------------------5
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            }
        } else {
            //  var Clear_Cust = $('#StockistID option').length;
            //  for (var i = 0; i < Clear_Cust; i++) {
            //   $('#StockistID')[0].sumo.remove(0);
            //   }
            CustomerArray.length = 0;//-------------------------------------6
            $('#CustomerCode').val("");

            if ($('#TerriotryArea').val() != null) {
                var seleTerritory = $('#TerriotryArea').val();
                for (var k = 0; k < seleTerritory.length; k++) {
                    SelectedTerritory += "'" + seleTerritory[k] + "',";
                    Actual_SelectedTerritory += "'" + seleTerritory[k] + "',";
                }
                SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTerritory = Actual_SelectedTerritory.substring(',', Actual_SelectedTerritory.length - 1);//Selected Territories with ' '. 
            }
            if ($("#TerriotryArea").val() == null) {
                var seleState = $('#State').val();

                for (var k = 0; k < seleState.length; k++) {
                    SelectedState += "'" + seleState[k] + "',";
                    Actual_SelectedState += "'" + seleState[k] + "',";
                }
                SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
                Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 

                var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
                $http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {
                            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//--------------7
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            } else {
                var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                $http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {
                            // $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"], dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);//-------------8
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            }
        }
        SelectedTerritory = "";
        SelectedState = "";
    });

    $('#CustomerCode').typeahead({
        source: CustomerArray
    });

    $scope.GetPartnerIssuse = function () {
        try {

            var FromDate = $('#IssueFromDate').val();
            var ToDate = $('#IssueToDate').val();
            var ZoneValue = $('#Zone').val();
            var StateValue = $('#State').val();
            var TerritoryValue = $('#TerriotryArea').val();
            var isValidCustCode = isValidCode_Cust($("#CustomerCode").val(), CustomerArray);
            if (FromDate == "" || FromDate == null) {
                alert("Please select from date");
            } else if (ToDate == "" || ToDate == null) {
                alert("Please select to date");
            } else if (SessionValue == "ZH" && ZoneValue == null) {
                alert("please select zone");
            }
            else if (SessionValue == "SH" && StateValue == null) {
                alert("please select state");
            } else if (SessionValue == "TM" && TerritoryValue == null) {
                alert("please select Territory");
            }
            else if ((SessionValue == "FSO" || SessionValue == "FSO_BU2") && TerritoryValue == null) {
                alert("please select Territory");
            }
            else if (($("#CustomerCode").val() != "") && (isValidCustCode == false)) {
                alert("Please select proper customer code");
            }
            else {
                ShowLoader();

                var STDATE = ($("#IssueFromDate").val()).split('/');
                var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
                var startDateValuecmp = startDateValue.getTime();
                var ENDATE = ($("#IssueToDate").val()).split('/');
                var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
                var endDateValuecmp = endDateValue.getTime();

                if (startDateValuecmp > endDateValuecmp) {
                    alert("To Date cannot be less than From Date");
                    return;
                }

                var DateRange = DateSplitter('IssueFromDate', 'IssueToDate');

                var WhereClause = "WHERE ISSUE_CREATED_DATE BETWEEN " + DateRange + "";
                if ($("#CustomerCode").val() != "") {
                    if (($("#CustomerCode").val() != "") && (isValidCustCode == false)) {
                    } else {
                        WhereClause += " and CAST(CUSTOMER_CODE AS BIGINT) IN (" + $("#CustomerCode").val().split(':')[0] + ")";
                    }
                } else if ($("#TerriotryArea").val() != null) {
                    WhereClause += " and CAST(CUSTOMER_CODE AS BIGINT) IN (select DISTINCT ecc.CUSTOMER_CODE from cms_employee_customer_configuration ecc inner join CUSTOMER_SALES_VIEW csv on CAST(ecc.CUSTOMER_CODE AS BIGINT)=CAST(csv.cust_code AS BIGINT) where ecc.ORG_LEVEL_ID IN(" + Actual_SelectedTerritory + "))";
                } else if ($("#State").val() != null) {
                    var StateNames = "";
                    $("#State option:selected").each(function (i) {

                        if (i == 0) {
                            StateNames = "'" + $(this).text() + "'";
                        }
                        else { StateNames += ",'" + $(this).text() + "'"; }
                    });

                    WhereClause += " and STATE_CODE IN(" + StateNames + ")";
                }
                else if ($("#Zone").val() != null) {
                    var ZoneNames = "";

                    $("#Zone option:selected").each(function (i) {


                        if (i == 0) {
                            ZoneNames = "'" + $(this).text() + "'";
                        }
                        else { ZoneNames += ",'" + $(this).text() + "'"; }
                    });

                    WhereClause += " AND ZONE_CODE IN(" + ZoneNames + ")";
                }
                if (($("#Zone").val() == null) && ($("#State").val() == null) && ($("#TerriotryArea").val() == null) && ($("#CustomerCode").val() == "")) {
                    WhereClause += " ";
                }

                //Getting Verified

                var Verified = $("#Verified").val();
                var VerifiedCodes = "";
                if (Verified != null) {
                    for (var i = 0; i < Verified.length; i++) {
                        if (i == 0) {
                            VerifiedCodes = "'" + Verified[i] + "'";
                        }
                        else {
                            VerifiedCodes += "," + "'" + Verified[i] + "'";
                        }
                    }
                    WhereClause += " AND ISSUE_VERIFIED IN(" + VerifiedCodes + ")";
                }


                //Getting Status

                var Status = $("#Status").val();

                var StatusFinal = "";
                if (Status != null) {
                    for (var i = 0; i < Status.length; i++) {
                        if (i == 0) {
                            StatusFinal = "'" + Status[i] + "'";
                        }
                        else {
                            StatusFinal += "," + "'" + Status[i] + "'";
                        }
                    }
                    WhereClause += " AND ISSUE_STATUS IN(" + StatusFinal + ")";

                }

                //   ShowLoader();
                // var DateSpliter = DateSplitter('OrderFromDate', 'OrderToDate');
                //var WhereClause = "JOIN sap_customer_sales_master AS SM ON CAST(SM.STOCKIST_ID AS INT)=CAST(CM.STOCKIST_ID AS INT) WHERE CAST(CD.CUSTOMER_CODE AS INT)=CAST(CM.STOCKIST_ID AS INT) AND CD.INDICATOR='H' AND CD.DOC_TYPE='DG' AND CD.DOC_DATE BETWEEN " + DateSpliter + " AND SM.SALES_ORGANISATION='1000'";


                if (SessionValue == "CSM" || SessionValue == "QH" || SessionValue == "CSM_BU2" || SessionValue == "CSM_BU3") {
                    WhereClause += " AND ISSUE_DESCRIPTION='Breakage issue overdue for resolution'";
                }
                else if (SessionValue == "CFO" || SessionValue == "FIN_CONTROLLER/CS" || SessionValue == "BU_FIN_HEAD" || SessionValue == "RCC" || SessionValue == "NCC/Corp_Fin_Team") {
                    WhereClause += " AND (ISSUE_DESCRIPTION='Credit note not issued' or ISSUE_DESCRIPTION='Account statement not issued')";

                }
                else if (SessionValue == "SBU1MARKETING_HEAD") {
                    WhereClause += " AND ISSUE_DESCRIPTION='Loyalty program benefits not disbursed'";
                }

                var Data = JSON.stringify({
                    // MasterType: "CreditNotes",
                    ID: "561",
                    UserCode: $("#UserCode").val(),
                    "Type": "Get",
                    ReportName: "PartnerIssueList",
                    WhereClause: WhereClause
                });

                DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
                    var Result = JSON.parse(response.tabledata);

                    if (Result != "") {
                        $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
                        if (Result.hasOwnProperty('UserListColumnNames')) {
                            var data1 = JSON.parse(Result["UserListColumnNames"]);

                            var selectedcolumnname = data1["ColumnNames"];

                            CustomColumnID = Result["UserListID"];
                            $('#undo_redo_to').empty();
                            var ColArray = new Array();
                            for (var i = 0; i < selectedcolumnname.length; i++) {


                                ColArray.push({
                                    "data": selectedcolumnname[i],
                                    "name": selectedcolumnname[i], "bSortable": true
                                });
                                $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                            }
                            //$scope.UserSelectedColumnName = ColArray;
                            UserSelectedColumnName = ColArray;
                        } else {

                            var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                            var selectedcolumnname = data1["ColumnNames"];

                            CustomColumnID = "0";

                            $('#undo_redo_to').empty();
                            var ColArray = new Array();
                            for (var i = 0; i < selectedcolumnname.length; i++) {
                                ColArray.push({
                                    "data": selectedcolumnname[i],
                                    "name": selectedcolumnname[i],
                                    "bSortable": "true"
                                });
                                $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                            }
                            //$scope.UserSelectedColumnName = ColArray;
                            UserSelectedColumnName = ColArray;
                        }


                        HideLoader();
                    }
                    DIMSFactory.getReportData(Data).success(function (response) {
                        $('#PartnerIssueDiv').show();
                        getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "PartnerIssuesList", UserSelectedColumnName);

                        //$("#PartnerIssueDiv").removeClass('hidden');
                        $('#PartnerIssuesList tbody').on('click', 'tr', function () {
                            if ($("#PartnerIssuesList").DataTable().data().count() != 0) {

                                var ID = $(this).find('td:eq(0)').text();

                                if ($(this).hasClass('selected')) {
                                    $(this).removeClass('selected');
                                }
                                else {
                                    $('tr.selected').removeClass('selected');
                                    $(this).addClass('selected');
                                }

                                var scope = angular.element($("#EditPartnerIssueDiv")).scope();
                                scope.$apply(function () {
                                    scope.go("AddPartnerIssues/" + ID);
                                })
                            }

                        });
                    });
                    HideLoader();
                });


            }
        } catch (Exception) {
            HideLoader();
        }



    }

    //angular.element(document).on('changeDate', '#IssueFromDate', function (ev) {
    //    var MyDate = $("#IssueFromDate").val();
    //    if ($("#IssueFromDate").val() != "") {
    //        alert(MyDate);
    //        //$("#Invoice_Details").val($("#Date_Supply_From").val() + " " + "To" + " " + $("#Date_Supply_TO").val());
    //        $("#IssueToDate").val("");
    //        $("#IssueToDate").datepicker('setStartDate', MyDate);
    //        //$("#ToDate").val("");
    //    }
    //});
});

DIMS.controller('AddPartnerIssues', function ($scope, $location, DIMSSFDCFactory, $routeParams, DIMSFactory) {
    AddPartnerIssues = $scope;
    var Data = '';
    var State_head_Name = "";
    var today = "";

    var UserCode = $("#USERCODE_PartnerIssues").val();
    var UserName = $("#USERNAME_PartnerIssues").val();
    var UserRole = $("#USERTYPE_PartnerIssues").val();

    var DisplayName = $("#Created").html();

    // jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
    ShowLoader();
    angular.element(document).ready(function () {
        //var today = new Date();
        //var dd = today.getDate();
        //var mm = today.getMonth() + 1; //January is 0!
        //var yyyy = today.getFullYear();

        //if (dd < 10) {
        //    dd = '0' + dd
        //}

        //if (mm < 10) {
        //    mm = '0' + mm
        //}

        //today = dd + '/' + mm + '/' + yyyy;
        //$scope.CreatedDate = today;
        var EditPartnerIssueId = $routeParams.ID;

        if (EditPartnerIssueId == undefined || EditPartnerIssueId == "") {

            EditPartnerIssueId = 0;
            DIMSSFDCFactory.GetPartnerIssueNumber().success(function (response) {
                var Data = JSON.parse(response);

                $scope.PartnerIssue = Data["PartnerIssueNumber"][0]["DIMS_PARTNER_NO"];
                today = Data["PartnerIssueNumber"][0]["Date"];
                $scope.CreatedDate = today;
                State_head_Name = Data["Employee_Name"];
                if (UserRole == "FSO" || UserRole == "FSO_BU2" || UserRole == "TM") {
                    $("#Status").attr("disabled", "disabled");
                    $("#Verified").attr("disabled", "disabled");
                }

                $("#CommitClosedData").datepicker('setStartDate', today);

                if (UserRole == "FSO" || UserRole == "FSO_BU2" || UserRole == "TM") {
                    $("#CommitClosedData").attr("disabled", "disabled");
                }
                HideLoader();
            });

            $scope.CreatedBy = UserCode + ':' + DisplayName;
            HideLoader();
        }
        else {

            DIMSSFDCFactory.GetPartnerIssueDataForEdit(EditPartnerIssueId).success(function (Res) {

                if (Res != "No Data") {
                    $("#PartnerIssuesHistory").removeClass('hidden');
                    $("#CustomerCode_LookUpDiv").remove();
                    $("#CustomerCode").attr('size', '32');
                    $("#CustomerName_LookUpDiv").remove();
                    $("#CustomerName").attr('size', '32');

                    // document.getElementById("CustomerCode_LookUpDiv").disabled = true;
                    //document.getElementById("CustomerName_LookUpDiv").disabled = true;

                    // $("#CustomerCode_LookUpDiv").addClass('disabled').attr('disabled', true)

                    $('#PartnerIssuesHistory tbody').empty();
                    $('#PartnerIssuesHistory').DataTable().clear().draw();
                    $("#PartnerIssuesHistory").DataTable({
                        destroy: true,
                        "bScrollCollapse": true,
                        "bSortable": true,
                        // 'scroll': true,
                        "order": [[0, "desc"]],
                        "scrollY": "200px",
                        scrollX: true,
                        scrollCollapse: true,
                        paging: true,
                    });
                    var Result = JSON.parse(Res);
                    $("#UpdatePartnerIssue").empty();
                    $("#UpdatePartnerIssue").html("Update Partner Issue");
                    $("#AddPartnerHide").hide();
                    $scope.EditIdForPartnerIssue = EditPartnerIssueId;
                    $scope.PartnerIssue = "";
                    $scope.PartnerIssue = Result[0]["PARTNER_ISSUE_NUMBER"];
                    $scope.CreatedBy = Result[0]["ISSUE_CREATED_BY"];
                    $scope.CreatedDate = Result[0]["ISSUE_CREATED_DATE"];
                    $scope.CustomerCode = Result[0]["CUSTOMER_CODE"];
                    $scope.CustomerName = Result[0]["CUSTOMER_NAME"];
                    //$scope.Verified = Result[0]["ISSUE_VERIFIED"];
                    $scope.FirstPersonRes = Result[0]["FIRST_PERSON_RESPONSIBLE"];
                    $scope.CommitClosedData = Result[0]["ISSUE_COMMITED_CLOSER_DATE"];
                    $scope.ActualClosedData = Result[0]["ACTUAL_CLOSED_DATE"];

                    $("#CommitClosedData").datepicker("setDate", Result[0]["ISSUE_COMMITED_CLOSER_DATE"]);
                    $("#CommitClosedData").datepicker('setStartDate', today);

                    if (UserRole == "FSO" || UserRole == "FSO_BU2" || UserRole == "TM") {
                        $("#CommitClosedData").attr("disabled", "disabled");
                    }

                    //$scope.IssueDesc = Result[0]["ISSUE_DESCRIPTION"];
                    $("#IssueDesc").val(Result[0]["ISSUE_DESCRIPTION"]);
                    $("#IssueDesc").attr("disabled", "disabled");
                    today = Result[0]["Date"];


                    if (Result[0]["ISSUE_VERIFIED"] == "" && (UserRole == "FSO" || UserRole == "TM" || UserRole == "FSO_BU2")) {
                        $("#Verified").val("select");
                        $("#Status").attr("disabled", "disabled");
                        $("#Verified").attr("disabled", "disabled");
                    }
                    else if (Result[0]["ISSUE_VERIFIED"] == "") {
                        $("#Verified").val("select");
                    }
                    else if (Result[0]["ISSUE_VERIFIED"] == "Yes I have Verified and it is closed" && Result[0]["ISSUE_STATUS"] == "Closed") {

                        $("#CommitClosedData").attr("disabled", "disabled");
                        $("#Status").attr("disabled", "disabled");
                        $("#Verified").attr("disabled", "disabled");

                        $("#Verified").val(Result[0]["ISSUE_VERIFIED"]);
                        $("#Save_Partner").hide();
                        $("#OtherIssues").attr("disabled", "disabled");
                    }
                    else {
                        $("#Verified").val(Result[0]["ISSUE_VERIFIED"]);
                    }

                    $("#Status").val(Result[0]["ISSUE_STATUS"]);

                    $scope.OtherIssues = Result[0]["REMARK"];
                    $("#Zone_Name").val(Result[0]["ZONE_CODE"]);
                    $("#State_Name").val(Result[0]["STATE_CODE"]);
                    $("#Territory").val(Result[0]["TERRITORY"]);
                    for (var i = 0; i < Result.length; i++) {
                        $("#PartnerIssuesHistory").dataTable().fnAddData([Result[i]["DateTime"].replace('T', ' '), Result[i]["ModifiedBy"], Result[i]["Action"], Result[i]["Comment"]])
                    }

                    if (UserRole == "FSO" || UserRole == "FSO_BU2" || UserRole == "TM") {
                        $("#Status").attr("disabled", "disabled");
                    }
                    else {
                        $("#Verified").attr("disabled", "disabled");
                    }

                    if (SessionValue != "FSO" && SessionValue != "FSO_BU2" && SessionValue != "TM" && SessionValue != "CSM" && SessionValue != "QH" && SessionValue != "CSM_BU2" && SessionValue != "CSM_BU3" && SessionValue != "CFO" && SessionValue != "FIN_CONTROLLER/CS" && SessionValue != "BU_FIN_HEAD" && SessionValue != "RCC" && SessionValue != "NCC/Corp_Fin_Team" && SessionValue != "SBU1MARKETING_HEAD") {
                        $("#CommitClosedData").attr("disabled", "disabled");
                        $("#Status").attr("disabled", "disabled");
                        $("#Verified").attr("disabled", "disabled");

                        $("#Verified").val(Result[0]["ISSUE_VERIFIED"]);
                        $("#Save_Partner").hide();
                        $("#OtherIssues").attr("disabled", "disabled");
                    }
                    HideLoader();
                }
                HideLoader();
            });
        }
        var width = $(window).width(), height = $(window).height();
        // var totalheight = height - 191;
        var totalheight = height - 191;
        if (height <= 800) {
            totalheight = height - 148;
        }
        $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
        $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    });


    var WhereCondition = "";
    $scope.Getdata = function (Methodname, MasterType, Heading) {
        var Data = JSON.stringify({
            MasterType: MasterType,
            ID: UserCode,
            Role: UserRole,
            UserCode: UserCode,
            Type: "Get",
            ReportName: "SFDCCustomerMasterList",
            WhereClause: WhereCondition
        });


        DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
            ShowLoader();
            var Result = JSON.parse(response.tabledata);

            if (Result != "") {
                $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];

                if (Result.hasOwnProperty('UserListColumnNames')) {
                    var data1 = JSON.parse(Result["UserListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];

                    CustomColumnID = Result["UserListID"];
                    $('#undo_redo_to').empty();
                    var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i], "bSortable": true

                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    //$scope.UserSelectedColumnName = ColArray;
                    UserSelectedColumnName = ColArray;
                } else {

                    var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                    var selectedcolumnname = data1["ColumnNames"];

                    CustomColumnID = "0";

                    $('#undo_redo_to').empty();
                    var ColArray = new Array();
                    for (var i = 0; i < selectedcolumnname.length; i++) {
                        ColArray.push({
                            "data": selectedcolumnname[i],
                            "name": selectedcolumnname[i]
                        });
                        $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                    }
                    //$scope.UserSelectedColumnName = ColArray;
                    UserSelectedColumnName = ColArray;
                }


                HideLoader();
            }

            DIMSFactory.getReportData(Data).success(function (response) {
                getLookUpData_Preview_ServerSide_SFDC_CustomerMaster("", Heading, "ReportPreviewTable", "ReportsPopUpModal", "PreviewStatus", UserSelectedColumnName, "PartnerIssues_Customer");
                HideLoader();
            })


        }).error(function () {
            alert("Technical error has been occured");
            HideLoader();
        });
        //DIMSSFDCFactory.getPartnerIssueMasterData(Data).success(function (response) {
        //    //alert(response);
        //    getLookUpDataForPartnerIsuues(response, Methodname, Heading);
        //}).error(function (err) {
        //    alert("err" + err);
        //});
    }

    angular.element(document).on('click', "#ReportPreviewTable tbody tr", function () {
        $("#CustomerCode").val($(this).find('td:eq(0)').text());
        $("#CustomerName").val($(this).find('td:eq(1)').text());
        $("#Zone_Name").val($(this).find('td:eq(2)').text().trim());
        $("#State_Name").val($(this).find('td:eq(3)').text().trim());
        $("#Territory").val($(this).find('td:eq(4)').text().trim());

        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $("#ReportPreviewTable").DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        $("#ReportsPopUpModal").modal('hide');
    });

    angular.element(document).on('change', '#Status', function () {
        var status = $("#Status").val();
        //alert(status);
        if (status == "Closed") {
            //var today = new Date();
            //var dd = today.getDate();
            //var mm = today.getMonth() + 1; //January is 0!

            //var yyyy = today.getFullYear();
            //if (dd < 10) {
            //    dd = '0' + dd
            //}
            //if (mm < 10) {
            //    mm = '0' + mm
            //}
            //var today = dd + '/' + mm + '/' + yyyy;

            $("#ActualClosedData").val(today);
            //$scope.ActualClosedData = today;
            //alert(today);
            $("#Verified").val("Pending Verification");
        }

        else {
            $("#ActualClosedData").val("");
            //$scope.ActualClosedData = "";
            $("#Verified").val("select");
        }
    });

    angular.element(document).on('change', '#Verified', function () {
        if ($("#Verified").val() == "No the issue is not closed") {
            $('#Status').val("Open");
            $("#ActualClosedData").val("");
        }
        else if ($("#Verified").val() == "Yes I have Verified and it is closed" || $("#Verified").val() == "Pending Verification") {
            $('#Status').val("Closed");
            $("#ActualClosedData").val(today);


        }
        //else {
        //    alert("Please select Verification");
        //}
    })

    angular.element(document).on('change', '#IssueDesc', function () {
        //alert(Data[1]);
        var Issue = $("#IssueDesc").val();

        if (Issue == "Credit note not issued" && Issue != undefined) {
            //$scope.FirstPersonRes = "Mahesh Daga";
            $("#FirstPersonRes").val("Mahesh Daga");
        }
        else if (Issue == "Account statement not issued" && Issue != undefined) {
            // $scope.FirstPersonRes = "Mahesh Daga";
            $("#FirstPersonRes").val("Mahesh Daga");
        }
        else if (Issue == "Breakage issue overdue for resolution" && Issue != undefined) {
            //$scope.FirstPersonRes = "Akbar";
            $("#FirstPersonRes").val("Akbar");
        }
        else if (Issue == "Loyalty program benefits not disbursed" && Issue != undefined) {
            // $scope.FirstPersonRes = "Vinod";
            $("#FirstPersonRes").val("Vinod");
        }
        else if (Issue == "select" && Issue != undefined) {
            // $scope.FirstPersonRes = "Vinod";
            $("#FirstPersonRes").val("");
        }
        else {
            //alert(State_head_Name);
            // $scope.FirstPersonRes = "Vinod";
            if (State_head_Name == null || State_head_Name == "" || State_head_Name == "No Data") {
                alert("Please Try with any other Description");
                $("#FirstPersonRes").val("");
            }
            else {
                $("#FirstPersonRes").val(State_head_Name);

            }
        }
    });

    $scope.SavePartnerIssues = function () {
        // var Department = $('#Department').val();
        var PartnerIssueNo = $scope.PartnerIssue;
        var CreatedBy = $("#CreatedBy").val();
        var CreatedDate = $("#CreatedDate").val();
        //var CustomerCode = $scope.CustomerCode;
        var CustomerCode = $("#CustomerCode").val();
        var CustomerName = $("#CustomerName").val();
        var Verified = $("#Verified").val();
        var Status = $("#Status").val();
        // var FirstPersonRes = $scope.FirstPersonRes;
        var FirstPersonRes = $("#FirstPersonRes").val();
        var CommitedCloserDate = $("#CommitClosedData").val();
        var ActualClosedDate = $("#ActualClosedData").val();
        var IssueDesc = $("#IssueDesc").val();
        var Remarks = $("#OtherIssues").val();
        var Data = UserCode;
        var ZoneCode = $("#Zone_Name").val();
        var StateCode = $("#State_Name").val();
        var Territory = $("#Territory").val();

        if (PartnerIssueNo == undefined) { PartnerIssueNo = ""; }
        if (CreatedBy == undefined) { CreatedBy = ""; }
        if (CreatedDate == undefined) { CreatedDate = ""; }
        if (CustomerCode == undefined) { CustomerCode = ""; }
        if (Verified == "select" || Verified == undefined) { Verified = ""; }
        if (Status == undefined) { Status = ""; }
        if (FirstPersonRes == undefined) { FirstPersonRes = ""; }
        if (CommitedCloserDate == undefined) { CommitedCloserDate = ""; }
        if (ActualClosedDate == undefined) { ActualClosedDate = ""; }
        if (IssueDesc == undefined) { IssueDesc = ""; }
        if (Remarks == undefined) { Remarks = ""; }
        if (CustomerName == undefined) { CustomerName = ""; }

        var EditPartnerIssueId = $routeParams.ID;

        if (CustomerCode == "" || CustomerCode == null) {
            alert("Please Select Customer Code");
        }
        else if (CustomerName == "" || CustomerName == null) {
            alert("Please select Customer Name");
        }
            //else if (Verified == "" || Verified == null) {
            //    alert("Please Select Verified");
            //}
        else if (Status == "" || Status == null) {
            alert("Please Select Status");
        }
        else if (IssueDesc == "" || IssueDesc == null) {
            alert("Please select Issue Description");
        }
        else if (FirstPersonRes == "" || FirstPersonRes == null) {
            alert("Please Enter First Person Responsible");
        }
        else if ((CommitedCloserDate == "" || CommitedCloserDate == null) && UserRole != "FSO" && UserRole != "FSO_BU2" && UserRole != "TM") {
            alert("Please select commited to closer date");
        }
        else if ((UserRole == "TM" || UserRole == "FSO" || UserRole == "FSO_BU2") && Status == "Closed" && (Verified == "" || Verified == null) && (EditPartnerIssueId != undefined || EditPartnerIssueId != "")) {
            alert("Please select  verification");
        }
        else {
            if (EditPartnerIssueId == undefined || EditPartnerIssueId == "") {
                EditPartnerIssueId = 0;
            }

            var TotalIssueData = JSON.stringify({
                "EditPartnerIssueId": EditPartnerIssueId,
                "PartnerIssueNo": PartnerIssueNo,
                "CreatedBy": CreatedBy,
                "CreatedDate": CreatedDate,
                "CustomerCode": CustomerCode,
                "CustomerName": CustomerName,
                "Verified": Verified,
                "Status": Status,
                "FirstPersonRes": FirstPersonRes,
                "CommitedCloserDate": CommitedCloserDate,
                "ActualClosedDate": ActualClosedDate,
                "IssueDesc": IssueDesc,
                "Remarks": Remarks,
                "Zone_Name": ZoneCode,
                "State_Name": StateCode,
                "Territory": Territory,
                "LogginUserCode": Data,
                "LogginUserName": DisplayName
            });
            ShowLoader();
            DIMSSFDCFactory.SavePartnerissue(TotalIssueData).success(function (response) {
                if (response == "Save") {
                    alert("Saved successfully");
                    $scope.go('PartnerIssues');
                    HideLoader();
                } else if (response == "Fail") {
                    alert("Error Occured while Saving");
                    HideLoader();
                } else if (response == "Update") {
                    alert("Update Successfully");
                    HideLoader();
                    $scope.go('PartnerIssues');
                } else if (response == "UpdateFail") {
                    alert("Error Occured while Update");
                    HideLoader();
                } else {
                    alert(response);
                    HideLoader();
                }
                HideLoader();
            });

        }

    }

});

DIMS.controller('AddInventoryTrack', function ($scope, $location, DIMSSFDCFactory, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Add Inventory Track" };
    $scope.go = function (path) {
        $location.path(path);
    };
    var width = $(window).width(), height = $(window).height();
    //var totalheight = height - 148;
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    InventoryFactory = DIMSSFDCFactory;
    AddInventoryTrack = $scope;
    ShowLoader();

    //DIMSSFDCFactory.GetAverageMonthlySale().success(function (response) {

    //    var Result = JSON.parse(response.tabledata);

    //    $scope.AverageMonthlySaleHIL = Result[0]["Monthly"];
    //    $scope.NoofdaysofStockAvg = Result[0]["Daily"];

    //}).error(function (err) {
    //    alert(err)
    //});
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------

    angular.element(document).ready(function () {

        var table = $('#InventoryTrackTableLines').DataTable({
            "bSort": false,
            "bScrollCollapse": true,
            "paging": false,
            "ordering": false,
            "info": false,
            "bFilter": false,
            "columnDefs": [
    { className: "Edit Set", "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13] },
    { className: "Set", "targets": [11, 12] }
    //{ className: "Set", "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13] }
            ]
        });

        myCallbackFunction = function (updatedCell, updatedRow) {
            //alert(updatedCell.data());
            //console.log("The new value for the cell is: " + updatedCell.data());
            //console.log("The values for each cell in that row are: " + (updatedRow.data()));

            //alert(InlineeditingTable.row(PreviousRowData).data());


            var columns = InlineeditingTable.row(PreviousRowData).data();

            var FirstColumnValue = columns[1];
            FirstColumnValue = (FirstColumnValue * 3.60).toFixed(2);

            var SecondColumnValue = columns[2];
            SecondColumnValue = (SecondColumnValue * 3.00).toFixed(2);

            var ThirdColumnValue = columns[3];
            ThirdColumnValue = (ThirdColumnValue * 2.75).toFixed(2);

            var FourthColumnValue = columns[4];
            FourthColumnValue = (FourthColumnValue * 2.50).toFixed(2);

            var FifthColumnValue = columns[5];
            FifthColumnValue = (FifthColumnValue * 2.25).toFixed(2);


            var SixthColumnValue = columns[6];
            SixthColumnValue = (SixthColumnValue * 2.00).toFixed(2);

            var SevnthColumnValue = columns[7];
            SevnthColumnValue = (SevnthColumnValue * 1.75).toFixed(2);

            var EighthColumnValue = columns[8];
            EighthColumnValue = (EighthColumnValue * 1.50).toFixed(2);

            var NinthColumnValue = columns[9];
            NinthColumnValue = (NinthColumnValue * 1.25).toFixed(2);

            var TenthColumnValue = columns[10];
            TenthColumnValue = (TenthColumnValue * 1.00).toFixed(2);




            var TotalInRunMeter = parseInt(FirstColumnValue) + parseInt(SecondColumnValue) + parseInt(ThirdColumnValue) + parseInt(FourthColumnValue) + parseInt(FifthColumnValue) + parseInt(SixthColumnValue) + parseInt(SevnthColumnValue) + parseInt(EighthColumnValue) + parseInt(NinthColumnValue) + parseInt(TenthColumnValue);



            columns[11] = TotalInRunMeter;
            columns[12] = (TotalInRunMeter / 78.8).toFixed(2);

            InlineeditingTable.row(PreviousRowData).data(columns).draw();

            var Firstcolumn = InlineeditingTable.row(0).data();


            //$scope.CurrentStockinMTHIL = (TotalInRunMeter / 78.8).toFixed(2);
            //  alert($scope.CurrentStockinMTHIL);

            var FirstColumnSum = columnsum(1);
            var SecondColumnSum = columnsum(2);
            var ThirdColumnSum = columnsum(3);
            var FourthColumnSum = columnsum(4);
            var FifthColumnSum = columnsum(5);
            var SixthColumnSum = columnsum(6);
            var SeventhColumnSum = columnsum(7);
            var EighthColumnSum = columnsum(8);
            var ninthColumnSum = columnsum(9);
            var tenthcolumnsum = columnsum(10);
            var eleventhcolumnsum = columnsum(11);

            var twelfthcolumnsum = columnsum(12);
            if (twelfthcolumnsum == 0) {
                twelfthcolumnsum = "0.00";
            } else {
                twelfthcolumnsum = (twelfthcolumnsum).toFixed(2);
            }


            $("#InventoryTrackTableLines").dataTable().fnUpdate(["Total in No.", FirstColumnSum,
                SecondColumnSum,
                ThirdColumnSum,
                FourthColumnSum,
                FifthColumnSum,
                SixthColumnSum,
                SeventhColumnSum,
                EighthColumnSum,
                ninthColumnSum,
                tenthcolumnsum,
                eleventhcolumnsum, "", ""
            ], 8);

            var TotalMTforFirst = ((FirstColumnSum * 3.60) / 78.8).toFixed(2);
            var TotalMTforSecond = ((SecondColumnSum * 3.00) / 78.8).toFixed(2);
            var TotalMTforThird = ((ThirdColumnSum * 2.75) / 78.8).toFixed(2);
            var TotalMTforFourth = ((FourthColumnSum * 2.50) / 78.8).toFixed(2);
            var TotalMTforFifth = ((FifthColumnSum * 2.25) / 78.8).toFixed(2);
            var TotalMTforSixth = ((SixthColumnSum * 2.00) / 78.8).toFixed(2);
            var TotalMTforSeventh = ((SeventhColumnSum * 1.75) / 78.8).toFixed(2);
            var TotalMTforEight = ((EighthColumnSum * 1.50) / 78.8).toFixed(2);
            var TotalMTforNinth = ((ninthColumnSum * 1.25) / 78.8).toFixed(2);
            var TotalMTforTenth = ((tenthcolumnsum * 1.00) / 78.8).toFixed(2);

            //  var TotalMTforTwelfth = ((tenthcolumnsum * 1.00) / 78.8).toFixed(2);           
            $("#InventoryTrackTableLines").dataTable().fnUpdate(["Total in MT", TotalMTforFirst,
              TotalMTforSecond,
              TotalMTforThird,
              TotalMTforFourth,
              TotalMTforFifth,
              TotalMTforSixth,
              TotalMTforSeventh,
              TotalMTforEight,
              TotalMTforNinth,
              TotalMTforTenth,
              "", twelfthcolumnsum, ""
            ], 9);

            $('#CurrentStockinMTHIL').val(Firstcolumn[12]);
            var currentsale = $('#CurrentStockinMTHIL').val();
            var Monthly = $("#AverageMonthlySaleHIL").val();
            //alert(Monthly);
            if (Monthly == 0) {
                $("#NoofdaysofStockAvg").val("0");
            }
            else {
                var Daily = Monthly / 30;
                var NoOfDays = parseFloat(currentsale / Daily).toFixed(0);
                $("#NoofdaysofStockAvg").val(NoOfDays);
            }


            //  alert(SumInRow);
            //var Data1 = JSON.stringify({
            //    UserCode: UserCode,
            //    CustomerID: updatedCell.data(),
            //    MembershipID: updatedRow.data()[0]
            //});
            //DIMSUnnatiFactory.updateCustomerID(Data1).success(function (response) {
            //    var Result_CUSTOMERID = (response.tabledata);

            //    if (Result_CUSTOMERID != "") {
            //        if (Result_CUSTOMERID == "Invalid Customer Code") {
            //            alert("Invalid Customer Code");
            //            var columns = InlineeditingTable.row(PreviousRowData).data();
            //            columns[7] = InlinePreviousCellValue;
            //            InlineeditingTable.row(PreviousRowData).data(columns).draw();
            //        }
            //        else if (Result_CUSTOMERID == "CustomerID is already assigned to another membershipID") {
            //            alert("CustomerID is already assigned to another membershipID");
            //            var columns = InlineeditingTable.row(PreviousRowData).data();
            //            columns[7] = InlinePreviousCellValue;
            //            InlineeditingTable.row(PreviousRowData).data(columns).draw();
            //        }
            //        else if (Result_CUSTOMERID == "true") {

            //        } else if (Result_CUSTOMERID == "false") {
            //            alert("Error in updation");
            //            var columns = InlineeditingTable.row(PreviousRowData).data();
            //            columns[7] = InlinePreviousCellValue;
            //            InlineeditingTable.row(PreviousRowData).data(columns).draw();
            //        }
            //    }


            //});

        }
        table.MakeCellsEditable({
            "onUpdate": myCallbackFunction,
            "inputCss": 'my-input-class',
            "columns": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13],
            "allowNulls": {
                "columns": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13],
                "errorClass": 'error'
            },
            "confirmationButton": {
                "confirmCss": 'my-confirm-class',
                "cancelCss": 'my-cancel-class'
            },
            "onkeypress": 'OnlyNumber'
        });


        $('.Edit').css({ "text-align": "right" });
        //  jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');

        var EditId1 = $routeParams.ID;
        if (EditId1 != undefined) {
            DIMSSFDCFactory.GetInventoryDataForEdit(EditId1.trim()).success(function (response) {

                var Head = response.split('$$$');
                if (Head[1] == "Inventory") {
                    if (Head[0] != "") {
                        //$scope.EditId;
                        var result = JSON.parse(Head[0]);
                        $scope.CustomerCode = result[0]["CUSTOMER_CODE"];
                        $scope.CustomerName = result[0]["CUSTOMER_NAME"];
                        $("#UserCode").val(result[0]["Created By"]);
                        $scope.LastUpdatedDateTime = result[0]["LastUpdate"];
                        $scope.CustomerType = result[0]["CUSTOMER_TYPE"];
                        $scope.AverageMonthlySaleHIL = result[0]["AVERAGE_MONTHLY_SALE"];
                        $scope.NextVisitPlanned = result[0]["Next visit"];
                        $("#NextVisitPlanned").datepicker("setDate", result[0]["Next visit"]);

                        //$scope.NoofdaysofStockAvg = result[0]["NO_OF_DAYS_OF_STOCK"];

                        // $("#CurrentStockinMTHIL").val(result[0]["CURRENT_STOCK_IN_HIL"]);

                        $scope.NoofdaysofStockAvg = result[0]["No of days of stock (Avg)"];

                        $("#CurrentStockinMTHIL").val(result[0]["Current Stock in MT"]);





                        if (result[0]["REGISTER_AVAILABLE"] == "yes") {

                            $("#RegisterAvailablewithCustomer").prop('checked', true);
                        }
                        else {
                            $("#RegisterAvailablewithCustomer").prop('checked', false);
                        }
                        //$(".Customer").css({ "display": "none" });
                        //$("#CustomerCode").addClass("gray");
                        //$("#CustomerName").addClass("gray");
                    }

                    if (Head[2] != "") {
                        // alert(Head[2]);
                        $('#InventoryTrackTableLines tbody').empty();
                        $('#InventoryTrackTableLines').dataTable().fnClearTable();
                        //$('#InventoryTrackTableLines').dataTable();

                        var Child = JSON.parse(Head[2]);
                        for (var i = 0; i < Child.length; i++) {
                            $('#InventoryTrackTableLines').dataTable().fnAddData([Child[i]["COMPANY_NAME"], Child[i]["SKU_SIZE3_60"], Child[i]["SKU_SIZE_3_00"], Child[i]["SKU_SIZE_2_75"], Child[i]["SKU_SIZE_2_50"], Child[i]["SKU_SIZE_2_25"], Child[i]["SKU_SIZE_2_00"], Child[i]["SKU_SIZE_1_75"], Child[i]["SKU_SIZE_1_50"], Child[i]["SKU_SIZE_1_25"], Child[i]["SKU_SIZE_1_00"], Child[i]["TOTAL_IN_RUN_METER"], Child[i]["TOTAL_IN_MT"], Child[i]["REMARKS"]]);

                        }
                        $('#InventoryTrackTableLines tbody tr:nth-child(1)').addClass('sum');
                        $('#InventoryTrackTableLines tbody tr:nth-child(2)').addClass('sum');

                        $('#InventoryTrackTableLines tbody tr:nth-child(3)').addClass('sum');

                        $('#InventoryTrackTableLines tbody tr:nth-child(4)').addClass('sum');

                        $('#InventoryTrackTableLines tbody tr:nth-child(5)').addClass('sum');

                        $('#InventoryTrackTableLines tbody tr:nth-child(6)').addClass('sum');

                        $('#InventoryTrackTableLines tbody tr:nth-child(7)').addClass('sum');

                        $('#InventoryTrackTableLines tbody tr:nth-child(8)').addClass('sum');

                    }
                    HideLoader();
                }
                else if (Head[1] == "Counters") {
                    var result = JSON.parse(Head[0]);
                    $scope.CustomerCode = result[0]["AUTO_ID"];
                    $scope.CustomerName = result[0]["CUSTOMER_NAME"];
                    $scope.CustomerType = result[0]["SAP_CUSTOMER_TYPE"];
                    $scope.AverageMonthlySaleHIL = 0;
                }
                else {

                    if (Head[0] != "") {
                        //$scope.EditId;
                        var result = JSON.parse(Head[0]);
                        $scope.CustomerCode = result[0]["Stockist ID"];
                        $scope.CustomerName = result[0]["Stockist Name"];
                        $scope.CustomerType = result[0]["CUSTOMER_GROUP_NAME"];
                        $scope.AverageMonthlySaleHIL = result[0]["Monthly"];
                    }
                    HideLoader();
                }
                HideLoader();
            });
        }
    });

    $scope.Getdata = function (Methodname, MasterType, Heading) {
        var Data = JSON.stringify({
            MasterType: MasterType,
            ID: "2"
        });
        DIMSSFDCFactory.getMasterData(Data).success(function (response) {
            getLookUpData(response, Methodname, Heading);
        });
    }

    $scope.ClearData = function () {
        $("#CurrentStockinMTHIL").val("");
        $("#NoofdaysofStockAvg").val("");

        //InlineeditingTable.row(PreviousRowData).ClearData();
        //alert(InlineeditingTable.row(PreviousRowData).data());
        //InlineeditingTable.row(PreviousRowData).clear();
        // alert(InlineeditingTable.row(PreviousRowData).data());
        //$('.my-input-class').html('0');
        //$('tbody tr').find('.Set').each(function () {
        //    // $('#InventoryTrackTableLines').dataTable().clear().draw();            
        //    $(this).html("0");
        //    //$scope.CurrentStockinMTHIL = "";


        //    $("#CurrentStockinMTHIL").val("");
        //    $("#NoofdaysofStockAvg").val("");
        //});
        //$('#InventoryTrackTableLines').dataTable().fnClearTable();


        $('#InventoryTrackTableLines').dataTable().fnDestroy();
        var CompanyNames = ["HIL", "Everest", "Konark", "Visaka", "Ramko", "Swastik", "Uppal", "Others"];
        //alert(CompanyNames.length);
        $('#InventoryTrackTableLines tbody').empty();
        $("#NextVisitPlanned").val("");
        $("#NextVisitPlanned").datepicker("setDate", "");

        //$("#RegisterAvailablewithCustomer").is(":checked") = false;
        $('#RegisterAvailablewithCustomer').prop('checked', false);

        var Htmldata = "";
        for (var i = 0; i < CompanyNames.length; i++) {
            Htmldata = " <tr class='sum'>";
            Htmldata += "<td>" + CompanyNames[i] + "</td>";
            Htmldata += "<td class='Edit Set'></td>";
            Htmldata += "<td class='Edit Set'></td>";
            Htmldata += "<td class='Edit Set'></td>";
            Htmldata += "<td class='Edit Set'></td>";
            Htmldata += "<td class='Edit Set'></td>";
            Htmldata += "<td class='Edit Set'></td>";
            Htmldata += "<td class='Edit Set'></td>";
            Htmldata += "<td class='Edit Set'></td>";
            Htmldata += "<td class='Edit Set'></td>";
            Htmldata += "<td class='Edit Set'></td>";
            Htmldata += "<td style='text-align: right;'>0</td>";
            Htmldata += "<td style='text-align: right;'>0</td>";
            Htmldata += " <td class='Edit Set freeText'></td></tr>";
            $('#InventoryTrackTableLines tbody').append(Htmldata);
        }





        Htmldata = "<tr>";
        Htmldata += "  <td>Total in No.</td>";
        Htmldata += "<td style='text-align: right;'>0</td>";
        Htmldata += "<td style='text-align: right;'>0</td>";
        Htmldata += "<td style='text-align: right;'>0</td>";
        Htmldata += "<td style='text-align: right;'>0</td>";
        Htmldata += "<td style='text-align: right;'>0</td>";
        Htmldata += "<td style='text-align: right;'>0</td>";
        Htmldata += "<td style='text-align: right;'>0</td>";
        Htmldata += "<td style='text-align: right;'>0</td>";
        Htmldata += "<td style='text-align: right;'>0</td>";
        Htmldata += "<td style='text-align: right;'>0</td>";
        Htmldata += "<td style='text-align: right;'>0</td>";
        Htmldata += "<td></td><td></td></tr>";
        Htmldata += "<tr><td>Total in MT</td>";
        Htmldata += "<td class='TotalMT' style='text-align: right;'>0.00</td>";
        Htmldata += "<td class='TotalMT' style='text-align: right;'>0.00</td>";
        Htmldata += "<td class='TotalMT' style='text-align: right;'>0.00</td>";
        Htmldata += "<td class='TotalMT' style='text-align: right;'>0.00</td>";
        Htmldata += "<td class='TotalMT' style='text-align: right;'>0.00</td>";
        Htmldata += "<td class='TotalMT' style='text-align: right;'>0.00</td>";
        Htmldata += "<td class='TotalMT' style='text-align: right;'>0.00</td>";
        Htmldata += "<td class='TotalMT' style='text-align: right;'>0.00</td>";
        Htmldata += "<td class='TotalMT' style='text-align: right;'>0.00</td>";
        Htmldata += "<td class='TotalMT' style='text-align: right;'>0.00</td>";
        Htmldata += "<td class='TotalMT'></td>";
        Htmldata += "<td style='text-align: right;'>0.00</td>";
        Htmldata += "<td></td>";
        Htmldata += "</tr>";
        $('#InventoryTrackTableLines tbody').append(Htmldata);

        var table = $('#InventoryTrackTableLines').DataTable({
            "bSort": false,
            "bScrollCollapse": true,
            "paging": false,
            "ordering": false,
            "info": false,
            "bFilter": false,
            //        "columnDefs": [
            //{ className: "Edit Set", "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13] },
            //{ className: "Set", "targets": [11, 12] }
            //{ className: "Set", "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13] }
            //]
        });

        table.MakeCellsEditable({
            "onUpdate": myCallbackFunction,
            "inputCss": 'my-input-class',
            "columns": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13],
            "allowNulls": {
                "columns": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13],
                "errorClass": 'error'
            },
            "confirmationButton": {
                "confirmCss": 'my-confirm-class',
                "cancelCss": 'my-cancel-class'
            },
            "onkeypress": 'OnlyNumber'
        });
    }


    function columnsum(columnnum) {
        var totalSUM = 0;
        $("tbody tr.sum").each(function () {
            var getValue = $(this).find("td:eq(" + columnnum + ")").html().replace("$", "");
            var filteresValue = getValue.replace(/\,/g, '');
            totalSUM += Number(filteresValue)
        });
        return totalSUM;
    }

    function RowSum() {
        var sum = 0;
        $('tr').find('.Edit').each(function () {
            var combat = $(this).text();
            if (!isNaN(combat) && combat.length !== 0) {
                sum += parseFloat(combat);
            }
        });
        return sum;
    }

    $scope.SaveInventoryTrack = function () {

        var CreatedBy = $("#UserCode").val();
        var EditSchemeId = $scope.EditId;
        var CustomerCode = $scope.CustomerCode;
        var CurrentStock = $("#CurrentStockinMTHIL").val();
        var CustomerName = $scope.CustomerName;
        var LastUpdatedDateTime = $scope.LastUpdatedDateTime;
        var CustomerType = $scope.CustomerType;
        var AverageMonthlySale = $scope.AverageMonthlySaleHIL;
        var NextVisitPlanned = $scope.NextVisitPlanned;
        var NoofdaysofStockAvg = $("#NoofdaysofStockAvg").val();
        var Register = "";
        if ($("#RegisterAvailablewithCustomer").is(":checked") == true) {
            Register = "yes";
        }
        else {
            Register = "no";
        }

        if (EditSchemeId == "" || EditSchemeId == null) { EditSchemeId = 0; }
        if (AverageMonthlySale == "" || AverageMonthlySale == null) { AverageMonthlySale = 0; }
        if (NoofdaysofStockAvg == "" || NoofdaysofStockAvg == null) { NoofdaysofStockAvg = 0; }
        if (CurrentStock == "" || CurrentStock == null) { CurrentStock = 0; }


        if (CustomerName == "" || CustomerName == null) {
            alert("Please Enter CustomerName");
        } else if (CustomerCode == "" || CustomerCode == null) {
            alert("Please Enter CustomerCode");
        }
        else if (NextVisitPlanned == "" || NextVisitPlanned == null) {
            alert("Please Enter NextVisitPlanned");
        }

            //else if (Location == "" || Location == null) {
            //    alert("Please Select Location");
            //}
        else {
            var TotalInventoryTrackingData = JSON.stringify({
                "EditSchemeId": EditSchemeId,
                "CustomerCode": CustomerCode,
                "CurrentStock": CurrentStock,
                "CustomerName": CustomerName,
                "LastUpdatedDateTime": LastUpdatedDateTime,
                "CustomerType": CustomerType,
                "AverageMonthlySale": AverageMonthlySale,
                "NextVisitPlanned": NextVisitPlanned,
                "NoofdaysofStockAvg": NoofdaysofStockAvg,
                "Register": Register,
                "CreatedBy": CreatedBy
            });

            var obj = new Array();
            var CheckCount = 0;

            $('#InventoryTrackTableLines tbody tr').each(function () {
                //alert($(this));
                var $row = $(this);
                if ($row.children().find('input').hasClass('my-input-class') == true) {
                    alert("Please Confirm Cell Data before Saving");
                    CheckCount++;
                    HideLoader();
                    return false;
                }

                //for (var i = 0; i < 15; i++) {
                //    if (isNaN($row.find(':nth-child(' + i + ')').html()) && $row.find(':nth-child(' + i + ')').html() != "") {
                //        alert("Please Confirm Cell Data before Saving");
                //        CheckCount++;
                //        HideLoader();
                //        return false;
                //    }
                //}

                obj.push({
                    Company: $row.find(':nth-child(1)').text(),
                    Size_360: $row.find(':nth-child(2)').text(),
                    Size_300: $row.find(':nth-child(3)').text(),
                    Size_275: $row.find(':nth-child(4)').text(),
                    Size_250: $row.find(':nth-child(5)').text(),
                    Size_225: $row.find(':nth-child(6)').text(),
                    Size_200: $row.find(':nth-child(7)').text(),
                    Size_175: $row.find(':nth-child(8)').text(),
                    Size_150: $row.find(':nth-child(9)').text(),
                    Size_125: $row.find(':nth-child(10)').text(),
                    Size_100: $row.find(':nth-child(11)').text(),
                    TotalRunningmeters: $row.find(':nth-child(12)').text(),
                    Total: $row.find(':nth-child(13)').text(),
                    Remarks: $row.find(':nth-child(14)').text()
                }
                    )
            });

            // alert(JSON.stringify(obj));

            var TotalData = JSON.stringify({ "TotalInventoryTrackingData": TotalInventoryTrackingData, "TabelData": obj });
            // alert(TotalInventoryTrackingData);

            if (CheckCount == 0) {
                ShowLoader();

                DIMSSFDCFactory.SaveInventoryTracking(TotalData).success(function (response) {
                    // alert(response)
                    if (response == "Insert") {
                        alert("Saved successfully");
                        //  $("#HolidayConfigListTable tbody").empty();

                        $scope.go('InventoryTracking');
                        HideLoader();
                    } else if (response == "Fail") {
                        alert("Error Occured while Saving");
                        HideLoader();
                    } else if (response == "Updated") {
                        alert("Updated Successfully");
                        $scope.go('InventoryTracking');
                        HideLoader();
                    } else if (response == "UpdateFail") {
                        alert("Error Occured while Update");
                        HideLoader();
                    } else {
                        alert(response);
                        HideLoader();
                    }
                    HideLoader();
                });
            }
        }

    }

});

DIMS.controller('InventoryTracking', function ($scope, $location, DIMSSFDCFactory, $http, $compile, $routeParams, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Inventory Tracking" };
    $scope.go = function (path) {
        $location.path(path);
    };
    $("#InventoryTrackingDiv").hide();
    var width = $(window).width(), height = $(window).height();//---------

    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });//-----------



    $scope.Reset = function () {

        $scope.go('InventoryTracking/');
    }

    var data_value = ""; var all_zones = ""; var all_states = ""; var all_territories = ""; var all_customers = ""; var CustomerArray = new Array();
    ShowLoader();
    if ((SessionValue == "ZH") || (SessionValue == "RCC") || (SessionValue == "ZSC")) {
        $("#Zone").attr("disabled", false); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        //data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + "50001762" + "\"}";
        data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            if (FilterList.dtZone.length == 1) {
                $("#Zone").attr("disabled", true);
            }
            all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);

                if (FilterList.dtZone.length == 0) {
                    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterList.dtZone.length - 1) {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            $('select#Zone')[0].sumo.selectItem(0);
            $('#Zone').trigger("change");
            //all_states = "";
            //for (var i = 0; i < FilterList.dtState.length; i++) {
            //    if (FilterList.dtState.length == 0) {
            //        all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else if (i == FilterList.dtState.length - 1) {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
            //    }
            //}
            //all_territories = "";
            //for (var i = 0; i < FilterList.dtTerritory.length; i++) {
            //    if (FilterList.dtTerritory.length == 0) {
            //        all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else if (i == FilterList.dtTerritory.length - 1) {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
            //    }
            //}
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            //$('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            //}
        });
    } else if (SessionValue == "SH") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        //data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + "50002430" + "\"}";
        data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            if (FilterList.dtState.length == 1) {
                $("#State").attr("disabled", true);
            }
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            $('#State').trigger("change");
            //all_territories = "";
            //for (var i = 0; i < FilterList.dtTerritory.length; i++) {
            //    if (FilterList.dtTerritory.length == 0) {
            //        all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else if (i == FilterList.dtTerritory.length - 1) {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
            //    }
            //}
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            // }
        });
    }

    else if (SessionValue == "TM") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        //data_value = "{\"Role\":\"" + "TM" + "\",\"UserCode\":\"" + "50001144" + "\"}";
        data_value = "{\"Role\":\"" + "TM" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            if (FilterList.dtTerritory.length == 1) {
                $("#TerriotryArea").attr("disabled", true);
            }

            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            //all_customers = "";
            // for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            //}
        });
    }

    else if (SessionValue == "FSO" || SessionValue == "FSO_BU2") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        //data_value = "{\"Role\":\"" + "FSO" + "\",\"UserCode\":\"" + "50001906" + "\"}";
        if (SessionValue == "FSO") {
            data_value = "{\"Role\":\"" + "FSO" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        } else {
            data_value = "{\"Role\":\"" + "FSO_BU2" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        }
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            $('select#TerriotryArea')[0].sumo.selectItem(0);
            $('#TerriotryArea').trigger("change");
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            // }
        });
    }

    else if ((SessionValue == "STOCKIST") || (SessionValue == "C&F")) {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", true); $('#CustomerCode').attr("disabled", true); $('#CustomerCode').css({ "class": "gray" });// $("#StockistID").attr("disabled", true);
        //data_value = "{\"Role\":\"" + "STOCKIST" + "\",\"UserCode\":\"" + "1100002" + "\"}";
        data_value = "{\"Role\":\"" + "STOCKIST" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            //all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                //if (FilterList.dtZone.length == 0) {
                //    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else if (i == FilterList.dtZone.length - 1) {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                //} else {
                //    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                //}
            }
            $('select#Zone')[0].sumo.selectItem(0);
            //all_states = "";
            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);
                //if (FilterList.dtState.length == 0) {
                //    all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else if (i == FilterList.dtState.length - 1) {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
                //} else {
                //    all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
                //}
            }
            $('select#State')[0].sumo.selectItem(0);
            //all_territories = "";
            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);
                //if (FilterList.dtTerritory.length == 0) {
                //    all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else if (i == FilterList.dtTerritory.length - 1) {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
                //} else {
                //    all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
                //}
            }
            $('select#TerriotryArea')[0].sumo.selectItem(0);
            //all_customers = "";
            for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                // $('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                CustomerArray.push(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                $('#CustomerCode').val(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                //if (FilterList.dtCustomer.length == 0) {
                //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
                //} else if (i == FilterList.dtCustomer.length - 1) {
                //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
                //} else {
                //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
                //}
            }
            $("#CustomerCode").typeahead({
                source: CustomerArray
            });
            // $('select#StockistID')[0].sumo.selectItem(0);
        });
    } else {
        $("#Zone").attr("disabled", false); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        //data_value = "{\"Role\":\"" + "ADMIN" + "\",\"UserCode\":\"" + "50001657" + "\"}";
        data_value = "{\"Role\":\"" + SessionValue + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                if (FilterList.dtZone.length == 0) {
                    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterList.dtZone.length - 1) {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            CustomerArray.length = 0;
            $("#CustomerCode").val("");
            if (FilterList.dtCustomer.length > 0) {
                for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                    CustomerArray.push(FilterList.dtCustomer[i]["STOCKIST_ID"].toString() + ":" + FilterList.dtCustomer[i]["STOCKIST_NAME"].toString());
                }
            }
            //all_states = "";
            //for (var i = 0; i < FilterList.dtState.length; i++) {
            //    if (FilterList.dtState.length == 0) {
            //        all_states = "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else if (i == FilterList.dtState.length - 1) {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'";
            //    } else {
            //        all_states += "'" + FilterList.dtState[i]["STATE_CODE"] + "'" + ',';
            //    }
            //}
            //all_territories = "";
            //for (var i = 0; i < FilterList.dtTerritory.length; i++) {
            //    if (FilterList.dtTerritory.length == 0) {
            //        all_territories = "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else if (i == FilterList.dtTerritory.length - 1) {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'";
            //    } else {
            //        all_territories += "'" + FilterList.dtTerritory[i]["TERRITORY_CODE"] + "'" + ',';
            //    }
            //}
            //all_customers = "";
            //for (var i = 0; i < FilterList.dtCustomer.length; i++) {
            //$('#StockistID')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //$('#StockistName')[0].sumo.add(FilterList.dtCustomer[i]["CUSTOMER_CODE"], FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
            //if (FilterList.dtCustomer.length == 0) {
            //    all_customers = "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else if (i == FilterList.dtCustomer.length - 1) {
            //   all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'";
            //} else {
            //    all_customers += "'" + FilterList.dtCustomer[i]["CUSTOMER_CODE"] + "'" + ',';
            //}
            //}
        });

    }
    HideLoader();
    $('#Zone').on('keyup change', function () {
        ShowLoader();
        var Clear_State = $('#State option').length;
        for (var i = 0; i < Clear_State; i++) {
            $('#State')[0].sumo.remove(0);
        }

        //   var Clear_Cust = $('#StockistID option').length;
        //  for (var i = 0; i < Clear_Cust; i++) {
        //      $('#StockistID')[0].sumo.remove(0);
        // }
        CustomerArray.length = 0;//---------------------------9
        $('#CustomerCode').val("");

        var Clear_Terrytory = $('#TerriotryArea option').length;
        for (var i = 0; i < Clear_Terrytory; i++) {
            $('#TerriotryArea')[0].sumo.remove(0);
        }

        if ($("#Zone option:selected").length == 0) {
            data_value = "{\"Role\":\"" + SessionValue + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
            $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
                var FilterList = JSON.parse(res);
                CustomerArray.length = 0;
                $("#CustomerCode").val("");
                if (FilterList.dtCustomer.length > 0) {
                    for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                        CustomerArray.push(FilterList.dtCustomer[i]["STOCKIST_ID"].toString() + ":" + FilterList.dtCustomer[i]["STOCKIST_NAME"].toString());
                    }
                }
                HideLoader();
            });
        }
        else {
            var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
            $http({ url: '../../Home/GetStatesforZone', method: 'POST', data: { Data: data_value } }).success(function (res) {
                if (res != "") {
                    var dtState = JSON.parse(res);
                    for (var i = 0; i < dtState.length; i++) {
                        $('#State')[0].sumo.add(dtState[i]["STATE_CODE"], dtState[i]["STATE_NAME"]);
                    }
                    HideLoader();
                } else { HideLoader(); }

                $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                    if (Cust_res != "") {
                        var dtCust = JSON.parse(Cust_res);
                        for (var i = 0; i < dtCust.length; i++) {
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//---------------------1
                            //   $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            //  $('#StockistName')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_NAME"].toString());
                        }
                    }
                });
            });
        }

    });

    var SelectedState = ""; var Actual_SelectedState = ""; var Actual_SelectedTerritory = "";
    $('#State').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedState = "";
        var Clear_Territory = $('#TerriotryArea option').length;
        for (var i = 0; i < Clear_Territory; i++) {
            $('#TerriotryArea')[0].sumo.remove(0);
        }
        // var Clear_Cust = $('#StockistID option').length;
        //  for (var i = 0; i < Clear_Cust; i++) {
        //     $('#StockistID')[0].sumo.remove(0);
        //  }

        CustomerArray.length = 0;//------------------------------------2
        $('#CustomerCode').val("");

        if ($('#State').val() != null) {
            var seleState = $('#State').val();

            for (var k = 0; k < seleState.length; k++) {
                SelectedState += "'" + seleState[k] + "',";
                Actual_SelectedState += "'" + seleState[k] + "',";
            }
            SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
            Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 
        }

        var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
        $http({ url: '../../Home/GetTerritoriesforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
            if (res != "") {

                var dtTerritory = JSON.parse(res);
                for (var i = 0; i < dtTerritory.length; i++) {
                    $('#TerriotryArea')[0].sumo.add(dtTerritory[i]["TERRITORY_CODE"], dtTerritory[i]["TERRITORY_NAME"]);
                }
                //  ShowLoader();
                $http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        // ShowLoader();

                        var dtCust = JSON.parse(res);

                        for (var i = 0; i < dtCust.length; i++) {
                            // $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());

                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//---------------------3
                        }
                        HideLoader();
                    } else {
                        HideLoader();
                    }
                });
            }
            HideLoader();
        });

        if ($("#State").val() == null) {
            var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
            if ((SessionValue != "SH") && (SessionValue != "TM") && (SessionValue != "FSO") && (SessionValue != "FSO_BU2") && (SessionValue != "STOCKIST") && (SessionValue != "C&F")) {
                $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                    if (Cust_res != "") {
                        var dtCust = JSON.parse(Cust_res);
                        for (var i = 0; i < dtCust.length; i++) {
                            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                        }
                        HideLoader();
                    } else {
                        HideLoader();
                    }
                });
            }
            HideLoader();
        }
        SelectedState = "";
        // HideLoader();
    });

    var SelectedTerritory = "";
    $('#TerriotryArea').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedTerritory = ""; Actual_SelectedState = "";
        if ((SessionValue == "TM") || (SessionValue == "FSO") || (SessionValue == "FSO_BU2")) {
            if ($("#TerriotryArea").val() == null) {
                //  var Clear_Cust = $('#StockistID option').length;
                //  for (var i = 0; i < Clear_Cust; i++) {
                //      $('#StockistID')[0].sumo.remove(0);
                //  }
                CustomerArray.length = 0;//-------------------------------------4
                $('#CustomerCode').val("");

                HideLoader();
            } else if ($("#TerriotryArea").val() != null) {
                var seleTerritory = $('#TerriotryArea').val();
                for (var k = 0; k < seleTerritory.length; k++) {
                    SelectedTerritory += "'" + seleTerritory[k] + "',";
                    Actual_SelectedTerritory += "'" + seleTerritory[k] + "',";
                }
                SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTerritory = Actual_SelectedTerritory.substring(',', Actual_SelectedTerritory.length - 1);//Selected Territories with ' '. 

                var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                $http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {
                            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"], dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);//--------------------5
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            }
        } else {
            //  var Clear_Cust = $('#StockistID option').length;
            //  for (var i = 0; i < Clear_Cust; i++) {
            //   $('#StockistID')[0].sumo.remove(0);
            //   }
            CustomerArray.length = 0;//-------------------------------------6
            $('#CustomerCode').val("");

            if ($('#TerriotryArea').val() != null) {
                var seleTerritory = $('#TerriotryArea').val();
                for (var k = 0; k < seleTerritory.length; k++) {
                    SelectedTerritory += "'" + seleTerritory[k] + "',";
                    Actual_SelectedTerritory += "'" + seleTerritory[k] + "',";
                }
                SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTerritory = Actual_SelectedTerritory.substring(',', Actual_SelectedTerritory.length - 1);//Selected Territories with ' '. 
            }
            if ($("#TerriotryArea").val() == null) {
                var seleState = $('#State').val();

                for (var k = 0; k < seleState.length; k++) {
                    SelectedState += "'" + seleState[k] + "',";
                    Actual_SelectedState += "'" + seleState[k] + "',";
                }
                SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
                Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 

                var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
                $http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {
                            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//--------------7
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            } else {
                var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                $http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {
                            // $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"], dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);//-------------8
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            }
        }
        SelectedTerritory = "";
        SelectedState = "";
    });

    $('#CustomerCode').typeahead({
        source: CustomerArray
    });

    $scope.GetInventoryDetails = function () {
        try {

            //var FromDate = $('#InventoryFromDate').val();
            //var ToDate = $('#InventoryToDate').val();
            var ZoneValue = $('#Zone').val();
            var StateValue = $('#State').val();
            var TerritoryValue = $('#TerriotryArea').val();
            var isValidCustCode = isValidCode_Cust($("#CustomerCode").val(), CustomerArray);
            //if (FromDate == "" || FromDate == null) {
            //    alert("Please select from date");
            //} else if (ToDate == "" || ToDate == null) {
            //    alert("Please select to date");
            //} else

            if (SessionValue == "ZH" && ZoneValue == null) {
                alert("please select zone");
            }
            else if (SessionValue == "SH" && StateValue == null) {
                alert("please select state");
            } else if (SessionValue == "TM" && TerritoryValue == null) {
                alert("please select Territory");
            }
            else if ((SessionValue == "FSO" || SessionValue == "FSO_BU2") && TerritoryValue == null) {
                alert("please select Territory");
            }
            else if (($("#CustomerCode").val() != "") && (isValidCustCode == false)) {
                alert("Please select proper customer code");
            }
            else {
                ShowLoader();

                //var STDATE = ($("#InventoryFromDate").val()).split('/');
                //var startDateValue = new Date(STDATE[2], STDATE[1], STDATE[0]);
                //var startDateValuecmp = startDateValue.getTime();
                //var ENDATE = ($("#InventoryToDate").val()).split('/');
                //var endDateValue = new Date(ENDATE[2], ENDATE[1], ENDATE[0]);
                //var endDateValuecmp = endDateValue.getTime();

                //if (startDateValuecmp > endDateValuecmp) {
                //    alert("To Date cannot be less than From Date");
                //    return;
                //}

                // var DateRange = DateSplitter('InventoryFromDate', 'InventoryToDate');

                //var WhereClause = "WHERE ISSUE_CREATED_DATE BETWEEN " + DateRange + "";
                //var WhereClause = "WHERE sihd.DATE >= DATEADD(MONTH,DATEDIFF(MONTH,0,GETDATE()) -3,0) AND sihd.DATE <  DATEADD(MONTH,DATEDIFF(MONTH,0,GETDATE()),0) ";

                var WhereClause = "";

                if ($("#CustomerCode").val() != "") {
                    if (($("#CustomerCode").val() != "") && (isValidCustCode == false)) {
                    } else {
                        //WhereClause += " and CAST(SCM.STOCKIST_ID AS BIGINT) IN (" + $("#CustomerCode").val().split(':')[0] + ")";
                        WhereClause += "WHERE CAST(SCM.STOCKIST_ID AS BIGINT) IN (" + $("#CustomerCode").val().split(':')[0] + ")";
                        WhereClause += " AND sctm.CUSTOMER_GROUP_NAME!=''";


                    }
                } else if ($("#TerriotryArea").val() != null) {
                    //  WhereClause += " and CAST(SCM.STOCKIST_ID AS BIGINT) IN (select DISTINCT ecc.CUSTOMER_CODE from cms_employee_customer_configuration ecc inner join CUSTOMER_SALES_VIEW csv on CAST(ecc.CUSTOMER_CODE AS BIGINT)=CAST(csv.cust_code AS BIGINT) where ecc.ORG_LEVEL_ID IN(" + Actual_SelectedTerritory + "))";
                    WhereClause += "WHERE CAST(SCM.STOCKIST_ID AS BIGINT) IN (select DISTINCT ecc.CUSTOMER_CODE from cms_employee_customer_configuration ecc where ecc.ORG_LEVEL_ID IN(" + Actual_SelectedTerritory + "))";
                    WhereClause += " AND sctm.CUSTOMER_GROUP_NAME!=''";

                    WhereClause += " union SELECT Cd.[AUTO_ID] as 'Customer Code',cd.[CUSTOMER_NAME] as 'Customer Name',CD.SAP_CUSTOMER_TYPE,ltrim(REPLACE(CZM.ZONE_NAME,'SBU1','')) as 'Zone',CS.STATE_DESC as 'State',ISNULL(SITD.NO_OF_DAYS_OF_STOCK,0) as 'No of Days of Stock',ISNULL(SITD.CURRENT_STOCK_IN_HIL,0) as 'Current Stock',CONVERT(VARCHAR(10),SITD.NEXT_VISIT_PLAN_DATETIME, 101) as 'Next Visit Planned',ISNULL(SITD.AVERAGE_MONTHLY_SALE,0) as 'Monthly' FROM [SFDC_Save_COUNTER_DETAILs] CD  inner join SFDC_CustomerTye CT on CT.ID=CD.CUSTOMER_TYPE inner join cms_zone_master CZM on CZM.ZONE_CODE=(select top 1 ZONE_CODE from cms_zone_state_mapping where STATE_CODE=cd.CUSTOMER_STATE) inner join cms_state CS on CS.STATE_CODE = CD.CUSTOMER_STATE left outer join SFDC_INVENTORY_TRACK_DETAILs SITD on SITD.CUSTOMER_CODE=CD.AUTO_ID where CD.ORG_LEVEL_ID in(" + Actual_SelectedTerritory + ") and CD.SAP_CUSTOMER_TYPE is not null and SAP_CODE is null";
                } else if ($("#State").val() != null) {
                    var StateNames = "";
                    $("#State option:selected").each(function (i) {

                        if (i == 0) {
                            StateNames = "'" + $(this).val() + "'";
                        }
                        else { StateNames += ",'" + $(this).val() + "'"; }
                    });

                    WhereClause += "WHERE SCM.STATE IN(" + StateNames + ")";
                    WhereClause += " AND sctm.CUSTOMER_GROUP_NAME!=''";

                    // AND scm.STOCKIST_ID in (select distinct STOCKIST_ID from sap_customer_sales_master as scsm where  scsm.SALES_ORGANISATION='1000'  AND scsm.DIVISION!='99' AND scsm.ZONE like '1%') ";
                    WhereClause += " union SELECT Cd.[AUTO_ID] as 'Customer Code',cd.[CUSTOMER_NAME] as 'Customer Name',CD.SAP_CUSTOMER_TYPE,ltrim(REPLACE(CZM.ZONE_NAME,'SBU1','')) as 'Zone',CS.STATE_DESC as 'State',ISNULL(SITD.NO_OF_DAYS_OF_STOCK,0) as 'No of Days of Stock',ISNULL(SITD.CURRENT_STOCK_IN_HIL,0) as 'Current Stock',CONVERT(VARCHAR(10),SITD.NEXT_VISIT_PLAN_DATETIME, 101) as 'Next Visit Planned',ISNULL(SITD.AVERAGE_MONTHLY_SALE,0) as 'Monthly' FROM [SFDC_Save_COUNTER_DETAILs] CD  inner join SFDC_CustomerTye CT on CT.ID=CD.CUSTOMER_TYPE inner join cms_zone_master CZM on CZM.ZONE_CODE=(select top 1 ZONE_CODE from cms_zone_state_mapping where STATE_CODE=cd.CUSTOMER_STATE) inner join cms_state CS on CS.STATE_CODE = CD.CUSTOMER_STATE left outer join SFDC_INVENTORY_TRACK_DETAILs SITD on SITD.CUSTOMER_CODE=CD.AUTO_ID  WHERE CS.STATE_CODE in(" + StateNames + ") and CD.SAP_CUSTOMER_TYPE is not null and SAP_CODE is null";
                }
                else if ($("#Zone").val() != null) {
                    // WhereClause += " and scm.STOCKIST_ID in (select distinct STOCKIST_ID from sap_customer_sales_master as scsm where scsm.ZONE in(" + $("#Zone").val() + ") and scsm.SALES_ORGANISATION='1000'  AND scsm.DIVISION!='99' AND scsm.ZONE like '1%')";

                    WhereClause += "WHERE CZM.ZONE_CODE in(" + $("#Zone").val() + ")";
                    WhereClause += " AND sctm.CUSTOMER_GROUP_NAME!=''";

                    WhereClause += " union SELECT Cd.[AUTO_ID] as 'Customer Code',cd.[CUSTOMER_NAME] as 'Customer Name',CD.SAP_CUSTOMER_TYPE,ltrim(REPLACE(CZM.ZONE_NAME,'SBU1','')) as 'Zone',CS.STATE_DESC as 'State',ISNULL(SITD.NO_OF_DAYS_OF_STOCK,0) as 'No of Days of Stock',ISNULL(SITD.CURRENT_STOCK_IN_HIL,0) as 'Current Stock',CONVERT(VARCHAR(10),SITD.NEXT_VISIT_PLAN_DATETIME, 101) as 'Next Visit Planned',ISNULL(SITD.AVERAGE_MONTHLY_SALE,0) as 'Monthly' FROM [SFDC_Save_COUNTER_DETAILs] CD  inner join SFDC_CustomerTye CT on CT.ID=CD.CUSTOMER_TYPE inner join cms_zone_master CZM on CZM.ZONE_CODE=(select top 1 ZONE_CODE from cms_zone_state_mapping where STATE_CODE=cd.CUSTOMER_STATE) inner join cms_state CS on CS.STATE_CODE = CD.CUSTOMER_STATE left outer join SFDC_INVENTORY_TRACK_DETAILs SITD on SITD.CUSTOMER_CODE=CD.AUTO_ID  WHERE CZM.ZONE_CODE in(" + $("#Zone").val() + ") and CD.SAP_CUSTOMER_TYPE is not null and SAP_CODE is null";

                }
                if (($("#Zone").val() == null) && ($("#State").val() == null) && ($("#TerriotryArea").val() == null) && ($("#CustomerCode").val() == "")) {
                    // WhereClause += " and scm.STOCKIST_ID in (select distinct STOCKIST_ID from sap_customer_sales_master as scsm where  scsm.SALES_ORGANISATION='1000'  AND scsm.DIVISION!='99' AND scsm.ZONE like '1%')";
                    WhereClause += " AND sctm.CUSTOMER_GROUP_NAME!=''";

                    WhereClause += " union SELECT Cd.[AUTO_ID] as 'Customer Code',cd.[CUSTOMER_NAME] as 'Customer Name',CD.SAP_CUSTOMER_TYPE,ltrim(REPLACE(CZM.ZONE_NAME,'SBU1','')) as 'Zone',CS.STATE_DESC as 'State',ISNULL(SITD.NO_OF_DAYS_OF_STOCK,0) as 'No of Days of Stock',ISNULL(SITD.CURRENT_STOCK_IN_HIL,0) as 'Current Stock',CONVERT(VARCHAR(10),SITD.NEXT_VISIT_PLAN_DATETIME, 101) as 'Next Visit Planned',ISNULL(SITD.AVERAGE_MONTHLY_SALE,0) as 'Monthly' FROM [SFDC_Save_COUNTER_DETAILs] CD  inner join SFDC_CustomerTye CT on CT.ID=CD.CUSTOMER_TYPE inner join cms_zone_master CZM on CZM.ZONE_CODE=(select top 1 ZONE_CODE from cms_zone_state_mapping where STATE_CODE=cd.CUSTOMER_STATE) inner join cms_state CS on CS.STATE_CODE = CD.CUSTOMER_STATE left outer join SFDC_INVENTORY_TRACK_DETAILs SITD on SITD.CUSTOMER_CODE=CD.AUTO_ID  WHERE  CD.SAP_CUSTOMER_TYPE is not null and SAP_CODE is null";


                }


                //  WhereClause += " GROUP BY scm.STOCKIST_ID,scm.STOCKIST_NAME,CZM.ZONE_NAME,CS.STATE_DESC,CAM.AREA_NAME,SITD.NEXT_VISIT_PLAN_DATETIME,case when datediff(dd,SITD.LAST_UPDATED_SAP_DATE,getdate())>0 then (SITD.NO_OF_DAYS_OF_STOCK- case when datediff(dd,SITD.LAST_UPDATED_SAP_DATE,getdate())>=0 then datediff(dd,SITD.LAST_UPDATED_SAP_DATE,getdate()) else 0 end) else 0 end,case when datediff(dd,SITD.LAST_UPDATED_SAP_DATE,getdate())>0 then round((SITD.CURRENT_STOCK_IN_HIL-((SITD.AVERAGE_MONTHLY_SALE/30)* case when datediff(dd,SITD.LAST_UPDATED_SAP_DATE,getdate())>=0 then datediff(dd,SITD.LAST_UPDATED_SAP_DATE,getdate()) else 0 end)),2) else 0 end";

                //   ShowLoader();
                // var DateSpliter = DateSplitter('OrderFromDate', 'OrderToDate');
                //var WhereClause = "JOIN sap_customer_sales_master AS SM ON CAST(SM.STOCKIST_ID AS INT)=CAST(CM.STOCKIST_ID AS INT) WHERE CAST(CD.CUSTOMER_CODE AS INT)=CAST(CM.STOCKIST_ID AS INT) AND CD.INDICATOR='H' AND CD.DOC_TYPE='DG' AND CD.DOC_DATE BETWEEN " + DateSpliter + " AND SM.SALES_ORGANISATION='1000'";

                //WhereClause += " AND sctm.CUSTOMER_GROUP_NAME!=''";

                var Data = JSON.stringify({
                    // MasterType: "CreditNotes",
                    ID: "561",
                    UserCode: $("#UserCode").val(),
                    "Type": "Get",
                    ReportName: "Inventory Tracking",
                    WhereClause: WhereClause
                });

                DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
                    var Result = JSON.parse(response.tabledata);

                    if (Result != "") {
                        $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
                        if (Result.hasOwnProperty('UserListColumnNames')) {
                            var data1 = JSON.parse(Result["UserListColumnNames"]);

                            var selectedcolumnname = data1["ColumnNames"];

                            CustomColumnID = Result["UserListID"];
                            $('#undo_redo_to').empty();
                            var ColArray = new Array();
                            for (var i = 0; i < selectedcolumnname.length; i++) {


                                ColArray.push({
                                    "data": selectedcolumnname[i],
                                    "name": selectedcolumnname[i], "bSortable": true
                                });
                                $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                            }
                            //$scope.UserSelectedColumnName = ColArray;
                            UserSelectedColumnName = ColArray;
                        } else {

                            var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                            var selectedcolumnname = data1["ColumnNames"];

                            CustomColumnID = "0";

                            $('#undo_redo_to').empty();
                            var ColArray = new Array();
                            for (var i = 0; i < selectedcolumnname.length; i++) {
                                ColArray.push({
                                    "data": selectedcolumnname[i],
                                    "name": selectedcolumnname[i],
                                    "bSortable": "true"
                                });
                                $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                            }
                            //$scope.UserSelectedColumnName = ColArray;
                            UserSelectedColumnName = ColArray;
                        }



                    }
                    // ShowLoader();
                    DIMSFactory.getReportData(Data).success(function (response) {
                        $('#InventoryTrackingDiv').show();
                        getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "InventoryTracking", UserSelectedColumnName);

                        //$("#PartnerIssueDiv").removeClass('hidden');
                        $('#InventoryTracking tbody').on('click', 'tr', function () {
                            if ($("#InventoryTracking").DataTable().data().count() != 0) {
                                var ID = $(this).find('td:eq(0)').text();

                                if ($(this).hasClass('selected')) {
                                    $(this).removeClass('selected');
                                }
                                else {
                                    $('tr.selected').removeClass('selected');
                                    $(this).addClass('selected');
                                }

                                var scope = angular.element($("#AddInventoryDiv")).scope();
                                scope.$apply(function () {
                                    scope.go("AddInventoryTrack/" + ID);
                                })

                            }
                        });
                    });
                    HideLoader();
                });


            }
        } catch (Exception) { }



    }
});

DIMS.controller('SalesHurdleListControl', function ($scope, $location, DIMSSFDCFactory, $http, $compile, $routeParams, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Sales Huddle" };
    $scope.go = function (path) {
        $location.path(path);
    };

    var width = $(window).width(), height = $(window).height();//---------

    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }

    //$("#SalesHurdlesListDaily").hide();
    //$("#SalesHurdlesListWeekly").hide();
    //$("#SalesHurdlesListMonthly").hide();

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });//-----------

    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');

    ShowLoader();
    $http({ url: '../../Home/getServerDateTime_Sales', method: 'GET' }).success(function (response) {

        if (response == "") {
        }
        else {
            var Month = "";
            var result = JSON.parse(response.tabledata);
            Month = result[0]["Monthname"] + "-" + result[0]["Year"];
            $("#Month").datepicker('setEndDate', result[0]["Date"]);
            $("#Month").val(Month);

            var data_value = ""; var all_zones = ""; var all_states = "";
            if ((SessionValue == "ZH") || (SessionValue == "RCC") || (SessionValue == "ZSC")) {
                $("#Zone").attr("disabled", false); $("#State").attr("disabled", false);
                //data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + "50001762" + "\"}";
                data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                $http({ url: '../../Home/GetFilters_SFDC_Sales_Huddles', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    $("#Zone").empty();
                    var FilterList = JSON.parse(res);
                    if (FilterList.dtZone.length == 1) {
                        $("#Zone").attr("disabled", true);
                    }
                    all_zones = "";
                    for (var i = 0; i < FilterList.dtZone.length; i++) {
                        $("#Zone").append($("<option></option>").val(FilterList.dtZone[i]["ZONE_CODE"]).html(FilterList.dtZone[i]["ZONE_NAME"]));
                        if (FilterList.dtZone.length == 0) {
                            all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                        } else if (i == FilterList.dtZone.length - 1) {
                            all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                        } else {
                            all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                        }
                    }
                    // $('select#Zone')[0].sumo.selectItem(0);
                    // $('#Zone').trigger("change");

                    var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
                    $http({ url: '../../Home/GetStatesforZone', method: 'POST', data: { Data: data_value } }).success(function (res) {
                        if (res != "") {
                            var dtState = JSON.parse(res);
                            $("#State").empty();
                            $("#State").append($("<option></option>").val("select").html("select"));

                            for (var i = 0; i < dtState.length; i++) {
                                $("#State").append($("<option></option>").val(dtState[i]["STATE_CODE"]).html(dtState[i]["STATE_NAME"]));
                            }
                            HideLoader();
                            $scope.GetSalesHuddles();
                        } else { HideLoader(); }

                    });

                });
            } else if (SessionValue == "SH" || SessionValue == "TM" || SessionValue == "FSO") {
                $("#Zone").attr("disabled", true); $("#State").attr("disabled", false);
                //data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + "50002430" + "\"}";
                if (SessionValue == "SH") {
                    data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                }
                if (SessionValue == "TM") {
                    data_value = "{\"Role\":\"" + "TM" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                }
                if (SessionValue == "FSO") {
                    data_value = "{\"Role\":\"" + "FSO" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                }
                if (SessionValue == "FSO_BU2") {
                    data_value = "{\"Role\":\"" + "FSO_BU2" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                }
                $http({ url: '../../Home/GetFilters_SFDC_Sales_Huddles', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    var FilterList = JSON.parse(res);
                    //all_zones = "";
                    if (FilterList.dtState.length == 1) {
                        $("#State").attr("disabled", true);

                    }
                    $("#Zone").empty();
                    for (var i = 0; i < FilterList.dtZone.length; i++) {
                        $("#Zone").append($("<option></option>").val(FilterList.dtZone[i]["ZONE_CODE"]).html(FilterList.dtZone[i]["ZONE_NAME"]));
                    }
                    //all_states = "";
                    $("#State").empty();
                    for (var i = 0; i < FilterList.dtState.length; i++) {
                        $("#State").append($("<option></option>").val(FilterList.dtState[i]["STATE_CODE"]).html(FilterList.dtState[i]["STATE_NAME"]));

                    }
                    $scope.GetSalesHuddles();

                });
            } else {

                $("#Zone").attr("disabled", false); $("#State").attr("disabled", false);
                //data_value = "{\"Role\":\"" + "ADMIN" + "\",\"UserCode\":\"" + "50001657" + "\"}";
                data_value = "{\"Role\":\"" + SessionValue + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                $http({ url: '../../Home/GetFilters_SFDC_Sales_Huddles', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    var FilterList = JSON.parse(res);
                    all_zones = "";
                    for (var i = 0; i < FilterList.dtZone.length; i++) {
                        $("#Zone").append($("<option></option>").val(FilterList.dtZone[i]["ZONE_CODE"]).html(FilterList.dtZone[i]["ZONE_NAME"]));
                        if (FilterList.dtZone.length == 0) {
                            all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                        } else if (i == FilterList.dtZone.length - 1) {
                            all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                        } else {
                            all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                        }
                    }
                    $scope.GetSalesHuddles();

                });

            }
            HideLoader();


        }
    });

    $('#Zone').on('keyup change', function () {
        ShowLoader();
        var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
        $http({ url: '../../Home/GetStatesforZone', method: 'POST', data: { Data: data_value } }).success(function (res) {
            if (res != "") {
                var dtState = JSON.parse(res);
                $("#State").empty();
                $("#State").append($("<option></option>").val("select").html("select"));

                for (var i = 0; i < dtState.length; i++) {
                    $("#State").append($("<option></option>").val(dtState[i]["STATE_CODE"]).html(dtState[i]["STATE_NAME"]));
                }
                HideLoader();
            } else { HideLoader(); }

        });

    });

    $scope.GetSalesHuddles = function () {
        var Month = $("#Month").val();
        var StateCode = $("#State").val();
        var ZoneCode = $("#Zone").val();

        if (Month == "" || Month == null) {
            alert("Please select any month");
            return;
        } else if (ZoneCode == "" && ZoneCode == null) {
            alert("please select zone");
            return;
        }
        else if (StateCode == "" && StateCode == null) {
            alert("please select state");
            return;
        }
        //var month = Date[0];
        //var year = Date[1];
        var WhereClause = " where MONTH='" + Month.split('-')[0] + "' AND YEAR='" + Month.split('-')[1] + "'";

        if (SessionValue != "TM" && SessionValue != "FSO" && SessionValue != "FSO_BU2") {
            if (ZoneCode == "select") {
                WhereClause += " AND EMPLOYEE_CODE IN(select EMPLOYEE_CODE from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration) and EMPLOYEE_CODE!='' union select EMPLOYEE_CODE from cms_organization_level where ORG_LEVEL_ID IN(select distinct PARENT_ID from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration) and EMPLOYEE_CODE!=''))";

            } else {
                //WhereClause += "   AND ZONECODE='" + $("#Zone").val() + "'";
                WhereClause += " AND EMPLOYEE_CODE IN(select EMPLOYEE_CODE from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration where CUSTOMER_CODE IN(select STOCKIST_ID from sap_customer_sales_master where ZONE IN('" + $("#Zone").val() + "'))) and EMPLOYEE_CODE!='' union select EMPLOYEE_CODE from cms_organization_level where ORG_LEVEL_ID IN(select distinct PARENT_ID from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration where CUSTOMER_CODE IN(select STOCKIST_ID from sap_customer_sales_master where ZONE IN('" + $("#Zone").val() + "'))) and EMPLOYEE_CODE!=''))";

            }
            if (StateCode == "select") {

            } else {
                // WhereClause += "   AND STATECODE='" + $("#State").val() + "'";
                WhereClause += " AND EMPLOYEE_CODE IN(select EMPLOYEE_CODE from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration where CUSTOMER_CODE IN(select STOCKIST_ID from sap_customer_master where STATE='" + $("#State").val() + "')) and EMPLOYEE_CODE!='' union select EMPLOYEE_CODE from cms_organization_level where ORG_LEVEL_ID IN(select distinct PARENT_ID from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration where CUSTOMER_CODE IN(select STOCKIST_ID from sap_customer_master where STATE='" + $("#State").val() + "')) and EMPLOYEE_CODE!=''))";
            }
        }
        if (SessionValue == "TM") {
            WhereClause += " AND EMPLOYEE_CODE IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='50002110') and EMPLOYEE_CODE!='' union (select " + $("#UserCode").val() + "))";
        }
        if (SessionValue == "FSO" || SessionValue == "FSO_BU2") {
            WhereClause += " AND EMPLOYEE_CODE='" + $("#UserCode").val() + "'";
        }
        var FilterData = JSON.stringify({ "UserCode": UserCode_sales, "WhereClause": WhereClause, "Month": Month.split('-')[0], "Year": Month.split('-')[1] });
        // alert(UserCode);


        HideLoader();
        ShowLoader();
        DIMSSFDCFactory.GetFilterDataForSalesHuddles(FilterData).success(function (response) {

            if (response != "No Data") {

                var Result = JSON.parse(response);
                if (Result.Daily != "No Data") {

                    $('#SalesHurdlesListDaily tbody').empty();
                    //jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');//--------
                    $('#SalesHurdlesListDaily').dataTable().fnClearTable();

                    for (var i = 0; i < Result.Daily.length; i++) {

                        $('#SalesHurdlesListDaily').dataTable().fnAddData([Result.Daily[i]["ID"], Result.Daily[i]["Employee Name"] + "(" + Result.Daily[i]["Employee Code"] + ")", Result.Daily[i]["Employee Role"], Result.Daily[i]["1"], Result.Daily[i]["2"], Result.Daily[i]["3"], Result.Daily[i]["4"], Result.Daily[i]["5"], Result.Daily[i]["6"], Result.Daily[i]["7"], Result.Daily[i]["8"], Result.Daily[i]["9"], Result.Daily[i]["10"], Result.Daily[i]["11"], Result.Daily[i]["12"], Result.Daily[i]["13"], Result.Daily[i]["14"], Result.Daily[i]["15"], Result.Daily[i]["16"], Result.Daily[i]["17"], Result.Daily[i]["18"], Result.Daily[i]["19"], Result.Daily[i]["20"], Result.Daily[i]["21"], Result.Daily[i]["22"], Result.Daily[i]["23"], Result.Daily[i]["24"], Result.Daily[i]["25"], Result.Daily[i]["26"], Result.Daily[i]["27"], Result.Daily[i]["28"], Result.Daily[i]["29"], Result.Daily[i]["30"], Result.Daily[i]["31"]]);
                        $("#SalesHurdlesListDaily").DataTable().column(0).visible(false);
                        // $("#SchemesList").DataTable().columns.adjust().draw(false);

                    }
                    $("#SalesHurdlesListDaily tbody tr td").each(function () {

                        if ($(this).text() == "Y") {

                            $(this).addClass('green');
                        }
                        else if ($(this).text() == "N") {
                            $(this).addClass('red');
                        }
                        else if ($(this).text() == "S") {
                            $(this).addClass('purple');
                        }
                        else if ($(this).text() == "H") {
                            $(this).addClass('blue');
                        }
                    });
                    //  $("#SalesHurdlesListDaily").show();

                }
                else {
                    // $("#SalesHurdlesListDaily").show();

                    $('#SalesHurdlesListDaily').dataTable().fnClearTable();
                }
                if (Result.Weekly != "No Data") {
                    $('#SalesHurdlesListWeekly tbody').empty();
                    $('#SalesHurdlesListWeekly').dataTable().fnClearTable();

                    // jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');//--------                  
                    for (var i = 0; i < Result.Weekly.length; i++) {

                        $('#SalesHurdlesListWeekly').dataTable().fnAddData([Result.Weekly[i]["ID"], Result.Weekly[i]["Employee Name"] + "(" + Result.Weekly[i]["Employee Code"] + ")", Result.Weekly[i]["Employee Role"], Result.Weekly[i]["1"], Result.Weekly[i]["2"], Result.Weekly[i]["3"], Result.Weekly[i]["4"], Result.Weekly[i]["5"]]);
                        $("#SalesHurdlesListWeekly").DataTable().column(0).visible(false);
                        // $("#SchemesList").DataTable().columns.adjust().draw(false);

                    }
                    $("#SalesHurdlesListWeekly tbody tr td").each(function () {

                        if ($(this).text() == "Y") {

                            $(this).addClass('green');
                        }
                        else if ($(this).text() == "N") {
                            $(this).addClass('red');
                        }
                    });
                    //$("#SalesHurdlesListWeekly").show();

                }
                else {
                    //$("#SalesHurdlesListWeekly").show();

                    $('#SalesHurdlesListWeekly').dataTable().fnClearTable();
                }

                if (Result.Monthly != "No Data") {

                    $('#SalesHurdlesListMonthly tbody').empty();
                    $('#SalesHurdlesListMonthly').dataTable().fnClearTable();

                    //jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');//--------

                    for (var i = 0; i < Result.Monthly.length; i++) {

                        $('#SalesHurdlesListMonthly').dataTable().fnAddData([Result.Monthly[i]["ID"], Result.Monthly[i]["Employee Name"] + "(" + Result.Monthly[i]["Employee Code"] + ")", Result.Monthly[i]["Employee Role"], Result.Monthly[i]["1"]]);
                        $("#SalesHurdlesListMonthly").DataTable().column(0).visible(false);
                        // $("#SchemesList").DataTable().columns.adjust().draw(false);

                    }
                    $("#SalesHurdlesListMonthly tbody tr td").each(function () {

                        if ($(this).text() == "Y") {

                            $(this).addClass('green');
                        }
                        else if ($(this).text() == "N") {
                            $(this).addClass('red');
                        }
                    });
                    // $("#SalesHurdlesListMonthly").show();
                }
                else {
                    //$("#SalesHurdlesListMonthly").show();

                    $('#SalesHurdlesListMonthly').dataTable().fnClearTable();
                }
                HideLoader();

            }
            else {
                //alert("In");
                // $("#SalesHurdlesListDaily").show();
                // $("#SalesHurdlesListWeekly").show();
                // $("#SalesHurdlesListMonthly").show();
                HideLoader();
                $('#SalesHurdlesListDaily').dataTable().fnClearTable();
                $('#SalesHurdlesListWeekly').dataTable().fnClearTable();
                $('#SalesHurdlesListMonthly').dataTable().fnClearTable();
            }
        });

    }
});

DIMS.controller('SalesHurdleApprovalControl', function ($scope, $location, DIMSSFDCFactory, $routeParams, $http, $compile, $routeParams, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Sales Hurdles Approval" };
    $scope.go = function (path) {
        $location.path(path);
    };
    var StateCode = "";
    var ZoneCode = "";
    var CheckCount = 0;
    var DaysInMonth = 0;
    var table = $('#SalesHurdlesApproval').DataTable(
        {
            //"bSort": false,
            //"bScrollCollapse": true,
            //"paging": false,
            //"ordering": false,
            //"info": false,
            //"bFilter": false,
            "columnDefs": [
    { className: "Edit", "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33] },
    //{ className: "Set", "targets": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,11,12,13] }
            ],
            "fnRowCallback": function (nRow, aData) {
                //alert(DaysInMonth);
                $(nRow).children().each(function (index, td) {

                    if ($(td).html() === "Y") {
                        $(td).addClass('green');
                    } else if ($(td).html() === "N") {
                        $(td).addClass('red');
                    }
                    else if ($(this).text() == "S") {
                        $(this).addClass('purple');
                        $(this).removeClass('Edit');
                    }
                    else if ($(this).text() == "H") {
                        $(this).addClass('blue');
                        $(this).removeClass('Edit');
                    }
                    else if ($(this).text() == "M") {
                        //$(this).addClass('blue');
                        $(this).text("");
                        $(this).addClass('Holiday');
                        $(this).removeClass('Edit');
                    }

                });
                return nRow;
            }
        }
        );
    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');

    // $('#SalesHurdlesApproval').DataTable();
    table.MakeCellsEditable({
        "onUpdate": myCallbackFunction,
        "inputCss": 'my-input-class',
        "columns": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
        "allowNulls": {
            "columns": [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
            "errorClass": 'error'
        },
        "FormName": 'SalesHurdlesApproval',
        "confirmationButton": { // could also be true
            "confirmCss": 'my-confirm-class',
            "cancelCss": 'my-cancel-class'
        },
        //"inputTypes": [

        //    {
        //        "column": 2, "type": "list",
        //        "options": [
        //            { "value": "yes", "display": "yes" },
        //            { "value": "No", "display": "No" }

        //        ]
        //    }
        //    // Nothing specified for column 2 so it will default to text
        //]
    });


    function myCallbackFunction(updatedCell, updatedRow, oldValue) {
        $("#SalesHurdlesApproval tbody tr td").each(function () {

            if ($(this).text() == "Y") {

                $(this).addClass('green');
            }
            else if ($(this).text() == "N") {
                $(this).addClass('red');
            }
        });
        // alert(updatedCell.data());

        //console.log("The new value for the cell is: " + updatedCell.data());
        //console.log("The old value for that cell was: " + oldValue);
        //console.log("The values for each cell in that row are: " + updatedRow.data());
    };


    var width = $(window).width(), height = $(window).height();//---------

    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });//-----------

    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');

    ShowLoader();
    $http({ url: '../../Home/getServerDateTime_Sales', method: 'GET' }).success(function (response) {

        if (response == "") {
        }
        else {
            var Month = "";
            var result = JSON.parse(response.tabledata);
            Month = result[0]["Monthname"] + "-" + result[0]["Year"];
            $("#Month").datepicker('setEndDate', result[0]["Date"]);
            $("#Month").val(Month);

            var data_value = ""; var all_zones = ""; var all_states = "";
            ShowLoader();
            if ((SessionValue == "ZH") || (SessionValue == "RCC") || (SessionValue == "ZSC")) {
                $("#Zone").attr("disabled", false); $("#State").attr("disabled", false);
                //data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + "50001762" + "\"}";
                data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                $http({ url: '../../Home/GetFilters_SFDC_Sales_Huddles', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    $("#Zone").empty();
                    var FilterList = JSON.parse(res);
                    if (FilterList.dtZone.length == 1) {
                        $("#Zone").attr("disabled", true);
                    }
                    all_zones = "";
                    for (var i = 0; i < FilterList.dtZone.length; i++) {
                        $("#Zone").append($("<option></option>").val(FilterList.dtZone[i]["ZONE_CODE"]).html(FilterList.dtZone[i]["ZONE_NAME"]));
                        if (FilterList.dtZone.length == 0) {
                            all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                        } else if (i == FilterList.dtZone.length - 1) {
                            all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                        } else {
                            all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                        }
                    }
                    // $('select#Zone')[0].sumo.selectItem(0);
                    // $('#Zone').trigger("change");

                    var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
                    $http({ url: '../../Home/GetStatesforZone', method: 'POST', data: { Data: data_value } }).success(function (res) {
                        if (res != "") {
                            var dtState = JSON.parse(res);
                            $("#State").empty();
                            $("#State").append($("<option></option>").val("select").html("select"));

                            for (var i = 0; i < dtState.length; i++) {
                                $("#State").append($("<option></option>").val(dtState[i]["STATE_CODE"]).html(dtState[i]["STATE_NAME"]));
                            }
                            HideLoader();
                            $scope.GetSalesHuddles();
                        } else { HideLoader(); }

                    });

                });
            } else if (SessionValue == "SH" || SessionValue == "TM" || SessionValue == "FSO" || SessionValue == "FSO_BU2") {
                $("#Zone").attr("disabled", true); $("#State").attr("disabled", false);
                //data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + "50002430" + "\"}";
                if (SessionValue == "SH") {
                    data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                }
                if (SessionValue == "TM") {
                    data_value = "{\"Role\":\"" + "TM" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                }
                if (SessionValue == "FSO") {
                    data_value = "{\"Role\":\"" + "FSO" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                }
                if (SessionValue == "FSO_BU2") {
                    data_value = "{\"Role\":\"" + "FSO_BU2" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                }
                $http({ url: '../../Home/GetFilters_SFDC_Sales_Huddles', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    var FilterList = JSON.parse(res);
                    //all_zones = "";
                    if (FilterList.dtState.length == 1) {
                        $("#State").attr("disabled", true);

                    }
                    $("#Zone").empty();
                    for (var i = 0; i < FilterList.dtZone.length; i++) {
                        $("#Zone").append($("<option></option>").val(FilterList.dtZone[i]["ZONE_CODE"]).html(FilterList.dtZone[i]["ZONE_NAME"]));
                    }
                    //all_states = "";
                    $("#State").empty();
                    for (var i = 0; i < FilterList.dtState.length; i++) {
                        $("#State").append($("<option></option>").val(FilterList.dtState[i]["STATE_CODE"]).html(FilterList.dtState[i]["STATE_NAME"]));

                    }
                    $scope.GetSalesHuddles();

                });
            } else {

                $("#Zone").attr("disabled", false); $("#State").attr("disabled", false);
                //data_value = "{\"Role\":\"" + "ADMIN" + "\",\"UserCode\":\"" + "50001657" + "\"}";
                data_value = "{\"Role\":\"" + SessionValue + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
                $http({ url: '../../Home/GetFilters_SFDC_Sales_Huddles', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    var FilterList = JSON.parse(res);
                    all_zones = "";
                    for (var i = 0; i < FilterList.dtZone.length; i++) {
                        $("#Zone").append($("<option></option>").val(FilterList.dtZone[i]["ZONE_CODE"]).html(FilterList.dtZone[i]["ZONE_NAME"]));
                        if (FilterList.dtZone.length == 0) {
                            all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                        } else if (i == FilterList.dtZone.length - 1) {
                            all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                        } else {
                            all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                        }
                    }
                    $scope.GetSalesHuddles();

                });

            }
            HideLoader();


        }
    });

    $('#Zone').on('keyup change', function () {
        ShowLoader();
        var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
        $http({ url: '../../Home/GetStatesforZone', method: 'POST', data: { Data: data_value } }).success(function (res) {
            if (res != "") {
                var dtState = JSON.parse(res);
                $("#State").empty();
                $("#State").append($("<option></option>").val("select").html("select"));

                for (var i = 0; i < dtState.length; i++) {
                    $("#State").append($("<option></option>").val(dtState[i]["STATE_CODE"]).html(dtState[i]["STATE_NAME"]));
                }
                HideLoader();
            } else { HideLoader(); }

        });

    });


    $scope.SaveSalesApprovalData = function () {
        ShowLoader();
        var obj = new Array();

        var rows = $("#SalesHurdlesApproval").dataTable().fnGetNodes();
        for (var i = 0; i < rows.length; i++) {
            if ($(rows[i]).children().find('Select').hasClass('my-input-class') == true) {
                alert("Please Confirm Cell Data before Saving");
                CheckCount++;
                HideLoader();
                return false;
            }

            obj.push({
                EmployeeCode: $(rows[i]).find('.employeecode').attr('id').split('ST_')[0],
                StateHeadCode: $(rows[i]).find('.stateheadcode').attr('id').split('ST_')[0],
                StateCode: $(rows[i]).find('.employeecode').attr('id').split('ST_')[1],
                ZoneCode: $(rows[i]).find('.stateheadcode').attr('id').split('ST_')[1],
                Day1: $(rows[i]).find(':nth-child(3)').text(),
                Day2: $(rows[i]).find(':nth-child(4)').text(),
                Day3: $(rows[i]).find(':nth-child(5)').text(),
                Day4: $(rows[i]).find(':nth-child(6)').text(),
                Day5: $(rows[i]).find(':nth-child(7)').text(),
                Day6: $(rows[i]).find(':nth-child(8)').text(),
                Day7: $(rows[i]).find(':nth-child(9)').text(),
                Day8: $(rows[i]).find(':nth-child(10)').text(),
                Day9: $(rows[i]).find(':nth-child(11)').text(),
                Day10: $(rows[i]).find(':nth-child(12)').text(),
                Day11: $(rows[i]).find(':nth-child(13)').text(),
                Day12: $(rows[i]).find(':nth-child(14)').text(),
                Day13: $(rows[i]).find(':nth-child(15)').text(),
                Day14: $(rows[i]).find(':nth-child(16)').text(),
                Day15: $(rows[i]).find(':nth-child(17)').text(),
                Day16: $(rows[i]).find(':nth-child(18)').text(),
                Day17: $(rows[i]).find(':nth-child(19)').text(),
                Day18: $(rows[i]).find(':nth-child(20)').text(),
                Day19: $(rows[i]).find(':nth-child(21)').text(),
                Day20: $(rows[i]).find(':nth-child(22)').text(),
                Day21: $(rows[i]).find(':nth-child(23)').text(),
                Day22: $(rows[i]).find(':nth-child(24)').text(),
                Day23: $(rows[i]).find(':nth-child(25)').text(),
                Day24: $(rows[i]).find(':nth-child(26)').text(),
                Day25: $(rows[i]).find(':nth-child(27)').text(),
                Day26: $(rows[i]).find(':nth-child(28)').text(),
                Day27: $(rows[i]).find(':nth-child(29)').text(),
                Day28: $(rows[i]).find(':nth-child(30)').text(),
                Day29: $(rows[i]).find(':nth-child(31)').text(),
                Day30: $(rows[i]).find(':nth-child(32)').text(),
                Day31: $(rows[i]).find(':nth-child(33)').text(),
            });
        }

        if (CheckCount == 0) {
            var Date = JSON.stringify({ "Date": $("#Month").val(), "StateCode": StateCode, "ZoneCode": ZoneCode });
            var SaveData = JSON.stringify({ "TableData": obj, "NewDate": Date });
            DIMSSFDCFactory.UpdateSalesHuddleData(SaveData).success(function (response) {

                if (response == "Updated") {
                    alert("successfully Updated");
                    // $scope.go('SalesHurdleApprovalControl')
                    $scope.GetSalesHuddles();
                    //HideLoader();
                }
                else {
                    HideLoader();
                    alert(response);

                }
            });
        }
    };


    $scope.GetSalesHuddles = function () {
        var Month = $("#Month").val();
        var StateCode = $("#State").val();
        var ZoneCode = $("#Zone").val();

        if (Month == "" || Month == null) {
            alert("Please select any month");
            return;
        } else if (ZoneCode == "" && ZoneCode == null) {
            alert("please select zone");
            return;
        }
        else if (StateCode == "" && StateCode == null) {
            alert("please select state");
            return;
        }
        var month = Date[0];
        var year = Date[1];
        var WhereClause = " where MONTH='" + Month.split('-')[0] + "' AND YEAR='" + Month.split('-')[1] + "'";

        if (SessionValue != "TM" && SessionValue != "FSO" && SessionValue != "FSO_BU2") {

            if (ZoneCode == "select") {

                WhereClause += " AND EMPLOYEE_CODE IN(select EMPLOYEE_CODE from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration) and EMPLOYEE_CODE!='' union select EMPLOYEE_CODE from cms_organization_level where ORG_LEVEL_ID IN(select distinct PARENT_ID from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration) and EMPLOYEE_CODE!=''))";

            } else {
                //WhereClause += "   AND ZONECODE='" + $("#Zone").val() + "'";
                WhereClause += " AND EMPLOYEE_CODE IN(select EMPLOYEE_CODE from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration where CUSTOMER_CODE IN(select STOCKIST_ID from sap_customer_sales_master where ZONE IN('" + $("#Zone").val() + "'))) and EMPLOYEE_CODE!='' union select EMPLOYEE_CODE from cms_organization_level where ORG_LEVEL_ID IN(select distinct PARENT_ID from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration where CUSTOMER_CODE IN(select STOCKIST_ID from sap_customer_sales_master where ZONE IN('" + $("#Zone").val() + "'))) and EMPLOYEE_CODE!=''))";

            }
            if (StateCode == "select") {

            } else {
                // WhereClause += "   AND STATECODE='" + $("#State").val() + "'";
                WhereClause += " AND EMPLOYEE_CODE IN(select EMPLOYEE_CODE from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration where CUSTOMER_CODE IN(select STOCKIST_ID from sap_customer_master where STATE='" + $("#State").val() + "')) and EMPLOYEE_CODE!='' union select EMPLOYEE_CODE from cms_organization_level where ORG_LEVEL_ID IN(select distinct PARENT_ID from cms_organization_level  where ORG_LEVEL_ID IN(select distinct ORG_LEVEL_ID from cms_employee_customer_configuration where CUSTOMER_CODE IN(select STOCKIST_ID from sap_customer_master where STATE='" + $("#State").val() + "')) and EMPLOYEE_CODE!=''))";
            }
        }
        if (SessionValue == "TM") {
            WhereClause += " AND EMPLOYEE_CODE IN(select EMPLOYEE_CODE from cms_organization_level where PARENT_ID=(select ORG_LEVEL_ID from cms_organization_level where EMPLOYEE_CODE='50002110') and EMPLOYEE_CODE!='' union (select " + $("#UserCode").val() + "))";
        }
        if (SessionValue == "FSO" || SessionValue == "FSO_BU2") {
            WhereClause += " AND EMPLOYEE_CODE='" + $("#UserCode").val() + "'";
        }
        var FilterData = JSON.stringify({ "UserCode": UserCode_sales, "WhereClause": WhereClause, "Month": Month.split('-')[0], "Year": Month.split('-')[1] });
        // alert(UserCode);
        HideLoader();
        ShowLoader();
        DIMSSFDCFactory.GetFilterDataForSalesHuddlesApproval(FilterData).success(function (response) {

            // var Month = "";
            if (response != "No Data") {

                //$('#SalesHurdlesApproval tbody').empty();
                table.clear().draw();
                jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');//--------
                var mani = JSON.parse(response);
                var Result = mani.dtDaily;
                DaysInMonth = mani.DaysInMonth;
                //Month = Result[0]["Month"] + "-" + Result[0]["Year"];
                //$("#Month").val(Month);
                for (var i = 0; i < Result.length; i++) {
                    StateCode = Result[0]["State Code"];
                    ZoneCode = Result[0]["Zone Code"];

                    $('#SalesHurdlesApproval').dataTable().fnAddData([Result[i]["ID"], "<span class='employeecode' id='" + Result[i]["Employee Code"] + "ST_" + Result[i]["State Code"] + "' style='display:none'></span>" + Result[i]["Employee Name"] + "(" + Result[i]["Employee Code"] + ")", "<span class='stateheadcode' id='" + Result[i]["State Head Code"] + "ST_" + Result[i]["Zone Code"] + "' style='display:none'></span>" + Result[i]["Employee Role"], Result[i]["1"], Result[i]["2"], Result[i]["3"], Result[i]["4"], Result[i]["5"], Result[i]["6"], Result[i]["7"], Result[i]["8"], Result[i]["9"], Result[i]["10"], Result[i]["11"], Result[i]["12"], Result[i]["13"], Result[i]["14"], Result[i]["15"], Result[i]["16"], Result[i]["17"], Result[i]["18"], Result[i]["19"], Result[i]["20"], Result[i]["21"], Result[i]["22"], Result[i]["23"], Result[i]["24"], Result[i]["25"], Result[i]["26"], Result[i]["27"], Result[i]["28"], Result[i]["29"], Result[i]["30"], Result[i]["31"]]);
                    //$('#SalesHurdlesApproval').dataTable().fnAddData([Result[i]["ID"], Result[i]["Employee Name"] + "(" + Result[i]["Employee Code"] + ")", Result[i]["Employee Role"], Result[i]["1"], Result[i]["2"], Result[i]["3"], Result[i]["4"], Result[i]["5"], Result[i]["6"], Result[i]["7"], Result[i]["8"], Result[i]["9"], Result[i]["10"], Result[i]["11"], Result[i]["12"], Result[i]["13"], Result[i]["14"], Result[i]["15"], Result[i]["16"], Result[i]["17"], Result[i]["18"], Result[i]["19"], Result[i]["20"], Result[i]["21"], Result[i]["22"], Result[i]["23"], Result[i]["24"], Result[i]["25"], Result[i]["26"], Result[i]["27"], Result[i]["28"], Result[i]["29"], Result[i]["30"], Result[i]["31"]]);
                    $("#SalesHurdlesApproval").DataTable().column(0).visible(false);


                    // $("#SchemesList").DataTable().columns.adjust().draw(false);

                }
                $("#SalesHurdlesApproval tbody tr td").each(function () {
                    if ($(this).text() == "Y") {

                        $(this).addClass('green');
                    }
                    else if ($(this).text() == "N") {
                        $(this).addClass('red');
                    }
                });
                HideLoader();
            }
            else {
                HideLoader();
                $('#SalesHurdlesApproval').dataTable().fnClearTable();
            }
        });

    }

});

//endregion mani


//karthik

DIMS.controller('AddNewCounter', function ($scope, $location, DIMSSFDCFactory, $routeParams) {
    AddNewCounter = $scope;
    var EditCounterId = "";
    $scope.templatesettings = { HeaderTitle: "Add Counter" };
    $scope.go = function (path) {
        // window.location.reload();
        $location.path(path);
    };
    $scope.Getdata = function (Methodname, MasterType, Heading) {
        var Data = JSON.stringify({
            MasterType: MasterType,
            ID: "2",
            State_Code: "0",
            usercode: $("#UserId").html()
        });
        DIMSSFDCFactory.getMasterData(Data).success(function (response) {
            //alert(response);
            getLookUpData(response, Methodname, Heading);
        });

    }
    angular.element(document).ready(function () {
        var width = $(window).width(), height = $(window).height();
        //  var totalheight = height - 191;
        var totalheight = height - 191;
        if (height <= 800) {
            totalheight = height - 148;
        }
        $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
        $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------      
        //$scope.SalesRegion = "MADURAI";       
        var Id = $("#UserId").html();
        var name = $("#UserName").html();
        //var Usestate = $("#UserSalesRegion").html();
        $scope.EmployeeCode = Id;
        $scope.EmployeeName = name;
        //$scope.SalesRegion = Usestate;

        $('#StockistNameLookup').attr("disabled", true);
        EditCounterId = $routeParams.ID;
        if (EditCounterId == undefined || EditCounterId == "") {
            EditCounterId = 0;

        }
        else {

            DIMSSFDCFactory.GetCounterDataForEdit(EditCounterId).success(function (res) {
                $("#addcounter").empty();
                $("#addcounter").html("Edit Counter");


                $("#SapCodelbl").show();
                $("#SapCode").show();
                var HeadData = JSON.parse(res);
                $scope.EditId = HeadData[0]["ID"];
                $scope.EmployeeCode = Id;
                $scope.EmployeeName = name;
                //$scope.SalesRegion = Usestate;
                $scope.CustomerName = HeadData[0]["CUSTOMER_NAME"];
                //$scope.CustomerCode = HeadData[0]["CUSTOMER_TYPE"];
                $scope.CustomerType = HeadData[0]["CustomerType"];
                $scope.CustomerTypeCode = HeadData[0]["CUSTOMER_TYPE"];
                $scope.CustomerAddress = HeadData[0]["CUSTOMER_ADDRESS"];
                //$("#CustomerAddress").val(HeadData[0]["CUSTOMER_ADDRESS"]);
                //alert(HeadData[0]["CUSTOMER_ADDRESS"]);
                //$scope.StockistName = HeadData[0]["CUSTOMER_TYPE_NAME11"];
                //$scope.StockistCode = HeadData[0]["STOCKIST_CODE"];
                $scope.ExpectedVolumeTarget = HeadData[0]["EXPECTED_VOLUME_TARGET"];
                $scope.PinCode = HeadData[0]["CUSTOMER_PIN_CODE"];
                $scope.ContactPersonName = HeadData[0]["CONTACT_PERSON_NAME"];
                $scope.CustomerState = HeadData[0]["STATE_DESC"];
                $scope.ContactPersonNumber = HeadData[0]["CONTACT_PERSON_NUMBER"];
                $scope.CustomerCityLocation = HeadData[0]["CUSTOMER_CITY"];
                $scope.CustomerEmailID = HeadData[0]["CUSTOMER_EMAIL_ID"];
                $scope.PanNumber = HeadData[0]["CUSTOMER_PAN_NUMBER"];
                $scope.TinNumber = HeadData[0]["CUSTOMER_TIN_NUMBER"];
                $scope.CustomerStateCode = HeadData[0]["CUSTOMER_STATE"];
                $scope.CustomerDistrict = HeadData[0]["SALES_DISTRICT_DESC"];
                $scope.CustomerDistrictCode = HeadData[0]["CUSTOMER_DISTRICT"];

                if (HeadData[0]["CUSTOMER_TYPE_NAME1"] == "Stockist") {
                    $('#lblStockistName').find('span').remove();
                    $('#StockistNameLookup').attr("disabled", true);
                } else {
                    $('#lblStockistName').append("<span class='Mandatory'>*</span>");
                    $('#StockistNameLookup').removeAttr("disabled");
                }
            });
        }

    });
    $scope.GetStockistdata = function (Methodname, MasterType, Heading) {
        var JsonData = JSON.stringify({
            "MasterType": MasterType
        });

        DIMSSFDCFactory.getMasterData(JsonData).success(function (res) {
            getLookUpData(res, Methodname, Heading);
        });
    }

    $("#ExpectedVolumeTarget").keypress(function (event) {
        return onlyNumerics(event);
    });
    $scope.SaveCounterDetails = function () {
        EditCounterId = $scope.EditId;

        var EmployeeCode = $scope.EmployeeCode;
        var SalesEmployeeName = $scope.EmployeeName;
        var SalesEmployeeRegion = $scope.SalesRegion;
        var CustomerName = $scope.CustomerName;
        var CustomerType = $scope.CustomerType;
        var PanNumber = $scope.PanNumber;
        var TinNumber = $scope.TinNumber;
        var CustomerTypeCode = $scope.CustomerTypeCode;
        var CustomerAddress = $scope.CustomerAddress;
        var StockistName = $scope.StockistName;
        var StockistCode = $scope.StockistCode;

        var ExcepetdVolumeTarget = $scope.ExpectedVolumeTarget;
        var PinCode = $scope.PinCode;
        var CustomerContact = $scope.ContactPersonName;
        var CustomerState = $scope.CustomerState;
        var CustomerStateCode = $scope.CustomerStateCode;
        var CustomerPhone = $scope.ContactPersonNumber;
        var CustomerCity = $scope.CustomerCityLocation;
        var CustomerEmail = $scope.CustomerEmailID;
        var CustomerDistrict = $scope.CustomerDistrict;
        var CustomerDistrictCode = $scope.CustomerDistrictCode;
        var sapcode = $("#SapCode").val();
        var UserType = $("#UserType").html();

        if (EditCounterId == undefined || EditCounterId == "" || EditCounterId == null) { EditCounterId = 0; }
        if (SalesEmployeeName == undefined) { SalesEmployeeName = ""; }
        if (SalesEmployeeRegion == undefined) { SalesEmployeeRegion = ""; }
        if (CustomerName == undefined) { CustomerName = ""; }
        if (CustomerType == undefined) { CustomerType = ""; }
        if (CustomerTypeCode == undefined) { CustomerTypeCode = ""; }
        if (SalesEmployeeName == undefined) { SalesEmployeeName = ""; }
        if (CustomerAddress == undefined) { CustomerAddress = ""; }
        if (StockistName == undefined) { StockistName = ""; }
        if (StockistCode == undefined) { StockistCode = ""; }
        if (ExcepetdVolumeTarget == undefined) { ExcepetdVolumeTarget = ""; }
        if (PinCode == undefined) { PinCode = ""; }
        if (CustomerContact == undefined) { CustomerContact = ""; }
        if (CustomerState == undefined) { CustomerState = ""; }
        if (CustomerPhone == undefined) { CustomerPhone = ""; }
        if (CustomerCity == undefined) { CustomerCity = ""; }
        if (CustomerEmail == undefined) { CustomerEmail = ""; }


        //var Flag = 0;


        //if (CustomerName == "" || CustomerName == null) {
        //    Flag = Flag + 1;
        //    $("#").css("border-color", "red");
        //}
        //else{
        //    $("#").css("border-color", "#d2d6de");
        //}

        //if (CustomerType == "" || CustomerType == null) {
        //    Flag = Flag + 1;
        //}
        //else {
        //}


        //if (PanNumber == "" || PanNumber == null) {
        //    Flag = Flag + 1;
        //}
        //else {
        //}


        //if (TinNumber == "" || TinNumber == null) {
        //    Flag = Flag + 1;
        //}
        //else {
        //}

        //if (ExcepetdVolumeTarget == "" || ExcepetdVolumeTarget == null) {
        //    Flag = Flag + 1;
        //}
        //else {
        //}

        //if (CustomerAddress == "" || CustomerAddress == null) {
        //    Flag = Flag + 1;
        //}
        //else {
        //}

        //if (CustomerContact == "" || CustomerContact == null) {
        //    Flag = Flag + 1;
        //}
        //else {
        //    Flag = Flag + 1;
        //}

        //if (CustomerPhone == "" || CustomerPhone == null) {
        //    Flag = Flag + 1;
        //}
        //else {
        //    Flag = Flag + 1;
        //}




        //if (CustomerCity == "" || CustomerCity == null) {
        //    Flag = Flag + 1;
        //}
        //else {
        //}

        //if (CustomerState == "" || CustomerState == null) {
        //    Flag = Flag + 1;
        //}
        //else{
        //}


        //if (Flag > 0) {
        //    alert("Please fill all mandatory fields");
        //    return;
        //}
        //else{

        //}





        if (CustomerName == "" || CustomerName == null) {
            alert("Please Enter Customer Name");
            return;
        }
        else if (PanNumber == "" || PanNumber == null) {
            alert("Please Enter Pan Number");
            return;
        }
        else if (TinNumber == "" || TinNumber == null) {
            alert("Please Enter Tin Number");
            return;
        }
        else if (CustomerAddress == "" || CustomerAddress == null) {
            alert("Please enter Customer Address");
            return;
        }
        else if (CustomerState == "" || CustomerState == null) {
            alert("Please Select Customer State");
            return;
        }
        else if (CustomerType == "" || CustomerType == null) {
            alert("Please Select Customer Type");
            return;
        }
        else if (ExcepetdVolumeTarget == "" || ExcepetdVolumeTarget == null) {
            alert("Please Enter Excepetd Volume Target");
            return;
        }
        else if (CustomerContact == "" || CustomerContact == null) {
            alert("Please Enter Customer Contact Person Name");
            return;
        }
        else if (CustomerPhone == "" || CustomerPhone == null) {
            alert("Please Enter Customer Phone Number");
            return;
        }
        else if (CustomerCity == "" || CustomerCity == null) {
            alert("Please Enter Customer City");
            return;
        }
        else if (CustomerDistrict == "" || CustomerDistrict == null) {
            alert("Please Select Customer District");
            return;
        }

        else {
            var TotalJsonData = JSON.stringify({
                "EmployeeCode": EmployeeCode,
                "EditCounterId": EditCounterId,
                "SalesEmployeeName": SalesEmployeeName,
                "SalesRegion": SalesEmployeeRegion,
                "CustomerName": CustomerName,
                "CustomerType": CustomerType,
                "TinNumber": TinNumber,
                "PanNumber": PanNumber,
                "CustomerTypeCode": CustomerTypeCode,
                "CustomerAddress": CustomerAddress,
                "StockistName": StockistCode,
                "ExcepetdVolumeTarget": ExcepetdVolumeTarget,
                "PinCode": PinCode,
                "CustomerContact": CustomerContact,
                "CustomerState": CustomerState,
                "CustomerStateCode": CustomerStateCode,
                "CustomerPhone": CustomerPhone,
                "CustomerCity": CustomerCity,
                "CustomerEmail": CustomerEmail,
                "CustomerDistrict": CustomerDistrict,
                "CustomerDistrictCode": CustomerDistrictCode,
                "sapcode": sapcode,
                "UserType": UserType,
            });

            DIMSSFDCFactory.SaveNewCounterData(TotalJsonData).success(function (response) {
                if (response == "Save") {
                    alert("Saved successfully");
                    $scope.go('AddNewCounter/');
                } else if (response == "Fail") {
                    alert("Error Occured while Saving");
                } else if (response == "Update") {
                    alert("Updated Successfully");
                    $scope.go('AddNewCounter/');
                } else if (response == "UpdateFail") {
                    alert("Error Occured while Update");
                } else {
                    alert(response);
                }
            });
        }
    };
});
DIMS.controller('CounterList', function ($scope, $location, DIMSSFDCFactory) {
    angular.element(document).ready(function () {
        var width = $(window).width(), height = $(window).height();
        //  var totalheight = height - 191;
        var totalheight = height - 191;
        if (height <= 800) {
            totalheight = height - 148;
        }
        $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
        $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
        var Data = JSON.stringify({
            ListType: "SFDCCounterList",
            ID: "2"
        });
        //GetResetdata(DIMSSFDCFactory, Data);
        DIMSSFDCFactory.GetAllPagesList(Data).success(function (response) {
            var Result = JSON.parse(response.tabledata);
            $('#CounterList tbody').empty();
            $('#CounterList').DataTable({
                // "scrollX": true
            });
            jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
            if (Result != "") {
                for (var i = 0; i < Result.length; i++) {
                    $('#CounterList').dataTable().fnAddData([Result[i]["ID"], Result[i]["SALES_EMPLOYEE_NAME"], Result[i]["SALES_REGION"], Result[i]["CUSTOMER_NAME"], Result[i]["CUSTOMER_TYPE_NAME"], Result[i]["CUSTOMER_ADDRESS"], Result[i]["PINCODE"], Result[i]["CONTACT_PERSON_NAME"], Result[i]["CUSTOMER_PHONE_NUMBER"], Result[i]["CUSTOMER_STATE"], Result[i]["CUSTOMER_CITY"], Result[i]["EXCEPTED_VOLUME_TARGET"], Result[i]["DIMS_REF_ID"], "", "", Result[i]["CUSTOMER_STATUS"]]);

                    //Kathik
                    //Customer Code Bind
                    var StockistCode = Result[i]["STOCKIST_CODE"];
                    var StockistCodeExists = $('#StockistID option').filter(function () {
                        return $(this).text() == StockistCode;
                    }).length;
                    if ((Result[i]["STOCKIST_CODE"] != "") && (StockistCodeExists == 0)) {
                        $('#StockistID')[0].sumo.add(Result[i]["STOCKIST_CODE"], Result[i]["STOCKIST_CODE"]);
                    }

                    //Customer Name Bind
                    var CustomerName = Result[i]["CUSTOMER_NAME"];
                    var CustomerNameExists = $('#Stockistname option').filter(function () {
                        return $(this).text() == CustomerName;
                    }).length;
                    if ((Result[i]["CUSTOMER_NAME"] != "") && (CustomerNameExists == 0)) {
                        $('#Stockistname')[0].sumo.add(Result[i]["CUSTOMER_NAME"], Result[i]["CUSTOMER_NAME"]);
                    }

                    //Zone Bind
                    //var ZoneName = "Zone";
                    //var ZoneNameExists = $('#Zone option').filter(function () {
                    //    return $(this).text() == ZoneName;
                    //}).length;
                    //if ((ZoneName != "") && (ZoneNameExists == 0)) {
                    //    $('#Zone')[0].sumo.add(ZoneName, ZoneName);
                    //}

                    //State Bind
                    var StateName = Result[i]["CUSTOMER_STATE"];
                    var StateNameExists = $('#State option').filter(function () {
                        return $(this).text() == StateName;
                    }).length;
                    if ((Result[i]["CUSTOMER_STATE"] != "") && (StateNameExists == 0)) {
                        $('#State')[0].sumo.add(Result[i]["CUSTOMER_STATE"], Result[i]["CUSTOMER_STATE"]);
                    }

                    //Territory Name Bind
                    var AreaName = Result[i]["CUSTOMER_CITY"];
                    var AreaNameExists = $('#TerritoryArea option').filter(function () {
                        return $(this).text() == AreaName;
                    }).length;
                    if ((Result[i]["CUSTOMER_CITY"] != "") && (AreaNameExists == 0)) {
                        $('#TerritoryArea')[0].sumo.add(Result[i]["CUSTOMER_CITY"], Result[i]["CUSTOMER_CITY"]);
                    }

                    //Employee Name Bind
                    var EmployeeName = Result[i]["SALES_EMPLOYEE_NAME"];
                    var EmployeeNameExists = $('#EmapName option').filter(function () {
                        return $(this).text() == EmployeeName;
                    }).length;
                    if ((Result[i]["SALES_EMPLOYEE_NAME"] != "") && (EmployeeNameExists == 0)) {
                        $('#EmapName')[0].sumo.add(Result[i]["SALES_EMPLOYEE_NAME"], Result[i]["SALES_EMPLOYEE_NAME"]);
                    }

                }
                $("#CounterList").DataTable().column(0).visible(false);
                $("#CounterList").DataTable().columns.adjust().draw(false);
            }


            $('#CounterList tbody').on('click', 'tr', function () {
                var ID = $("#CounterList").DataTable().row(this).data()[0]
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    $("#CounterList").DataTable().$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
                if (ID != "") {
                    var scope = angular.element($("#CounterListId")).scope();
                    scope.$apply(function () {
                        scope.go("AddNewCounter/" + ID);
                    })
                }

            });

        });
    });

    $scope.go = function (path) {

        $location.path(path);
    };

    angular.element(document).on('click', '.options li', function () {
        //Getting Customer Code with comma seprated
        var CustomerCode = $("#StockistID").val();
        var CustomerCodeNames = "";
        if (CustomerCode != null) {
            for (var i = 0; i < CustomerCode.length; i++) {
                if (i == 0) {
                    CustomerCodeNames = "'" + CustomerCode[i] + "'";
                }
                else {
                    CustomerCodeNames += "," + "'" + CustomerCode[i] + "'";
                }
            }
        }
        else {
            CustomerCodeNames = "Customer Code";
        }
        //getting Category

        var Stockist = $("#Stockistname").val();
        var StockistNames = "";
        if (Stockist != null) {
            for (var i = 0; i < Stockist.length; i++) {
                if (i == 0) {
                    StockistNames = "'" + Stockist[i] + "'";
                }
                else {
                    StockistNames += "," + "'" + Stockist[i] + "'";
                }
            }
        }
        else {
            StockistNames = "Stockist Name";
        }

        //Getting States
        var States = $("#State").val();
        var StatesCodes = "";
        if (States != null) {
            for (var i = 0; i < States.length; i++) {
                if (i == 0) {
                    StatesCodes = "'" + States[i] + "'";
                }
                else {
                    StatesCodes += "," + "'" + States[i] + "'";
                }
            }
        }
        else {
            StatesCodes = "State Name";
        }
        //Getting Product
        //var Product = $("#Product").val();
        //var ProductNames = "";
        //if (Product != null) {
        //    for (var i = 0; i < Product.length; i++) {
        //        if (i == 0) {
        //            ProductNames = "'" + Product[i] + "'";
        //        }
        //        else {
        //            ProductNames += "," + "'" + Product[i] + "'";
        //        }
        //    }
        //}
        //else {
        //    ProductNames = "Product Name";
        //}
        ////Getting ZoneCodes

        //var Zone = $("#Zone").val();
        //var ZoneCodes = "";
        //if (Zone != null) {
        //    for (var i = 0; i < Zone.length; i++) {
        //        if (i == 0) {
        //            ZoneCodes = "'" + Zone[i] + "'";
        //        }
        //        else {
        //            ZoneCodes += "," + "'" + Zone[i] + "'";
        //        }
        //    }
        //}
        //else {
        //    ZoneCodes = "Zone Name";
        //}
        ////Getting AreaCodes
        //var Area = $("#Area").val();
        //var AreaCodes = "";
        //if (Area != null) {
        //    for (var i = 0; i < Area.length; i++) {
        //        if (i == 0) {
        //            AreaCodes = "'" + Area[i] + "'";
        //        }
        //        else {
        //            AreaCodes += "," + "'" + Area[i] + "'";
        //        }
        //    }
        //}
        //else {
        //    AreaCodes = "Area Name";
        //}


        ////Getting Location
        //var Location = $("#Location").val();
        //var LocationNames = "";
        //if (Location != null) {
        //    for (var i = 0; i < Location.length; i++) {
        //        if (i == 0) {
        //            LocationNames = "'" + Location[i] + "'";
        //        }
        //        else {
        //            LocationNames += "," + "'" + Location[i] + "'";
        //        }
        //    }
        //}
        //else {
        //    LocationNames = "Location Name";
        //}

        var FilterDataForCounters = JSON.stringify({ 'CustomerCodeNames': CustomerCodeNames, 'StockistNames': StockistNames, 'State': StatesCodes });
        DIMSSFDCFactory.GetFilterDataForCounters(FilterDataForCounters).success(function (response) {

            var table = $("#CounterList").DataTable();
            table.clear();
            var Result = JSON.parse(response.tabledata);

            for (var i = 0; i < Result.length; i++) {

                $('#CounterList').dataTable().fnAddData([Result[i]["ID"], Result[i]["SALES_EMPLOYEE_NAME"], Result[i]["SALES_REGION"], Result[i]["CUSTOMER_NAME"], Result[i]["CUSTOMER_TYPE_NAME"], Result[i]["CUSTOMER_ADDRESS"], Result[i]["PINCODE"], Result[i]["CONTACT_PERSON_NAME"], Result[i]["CUSTOMER_PHONE_NUMBER"], Result[i]["CUSTOMER_STATE"], Result[i]["CUSTOMER_CITY"], Result[i]["EXCEPTED_VOLUME_TARGET"], Result[i]["DIMS_REF_ID"], "", "", Result[i]["CUSTOMER_STATUS"]]);

            }
            $("#CounterList").DataTable().column(0).visible(false);
            $("#CounterList").DataTable().columns.adjust().draw(false);

            $('#CounterList tbody').on('click', 'tr', function () {
                var ID = $("#CounterList").DataTable().row(this).data()[0]
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    $("#CounterList").DataTable().$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
                if (ID != "") {
                    var scope = angular.element($("#CounterListId")).scope();
                    scope.$apply(function () {
                        scope.go("AddNewCounter/" + ID);
                    })
                }

            });
        });

    });

    $('.Date').datepicker().on('changeDate', function (ev) {

        //Getting Customer Code with comma seprated
        var CustomerCode = $("#StockistID").val();
        var CustomerCodeNames = "";
        if (CustomerCode != null) {
            for (var i = 0; i < CustomerCode.length; i++) {
                if (i == 0) {
                    CustomerCodeNames = "'" + CustomerCode[i] + "'";
                }
                else {
                    CustomerCodeNames += "," + "'" + CustomerCode[i] + "'";
                }
            }
        }
        else {
            CustomerCodeNames = "Customer Code";
        }
        //getting Category

        var Stockist = $("#Stockistname").val();
        var StockistNames = "";
        if (Stockist != null) {
            for (var i = 0; i < Stockist.length; i++) {
                if (i == 0) {
                    StockistNames = "'" + Stockist[i] + "'";
                }
                else {
                    StockistNames += "," + "'" + Stockist[i] + "'";
                }
            }
        }
        else {
            StockistNames = "Stockist Name";
        }

        //Getting States
        var States = $("#State").val();
        var StatesCodes = "";
        if (States != null) {
            for (var i = 0; i < States.length; i++) {
                if (i == 0) {
                    StatesCodes = "'" + States[i] + "'";
                }
                else {
                    StatesCodes += "," + "'" + States[i] + "'";
                }
            }
        }
        else {
            StatesCodes = "State Name";
        }

        //Getting Product
        //var Product = $("#Product").val();
        //var ProductNames = "";
        //if (Product != null) {
        //    for (var i = 0; i < Product.length; i++) {
        //        if (i == 0) {
        //            ProductNames = "'" + Product[i] + "'";
        //        }
        //        else {
        //            ProductNames += "," + "'" + Product[i] + "'";
        //        }
        //    }
        //}
        //else {
        //    ProductNames = "Product Name";
        //}
        ////Getting ZoneCodes

        //var Zone = $("#Zone").val();
        //var ZoneCodes = "";
        //if (Zone != null) {
        //    for (var i = 0; i < Zone.length; i++) {
        //        if (i == 0) {
        //            ZoneCodes = "'" + Zone[i] + "'";
        //        }
        //        else {
        //            ZoneCodes += "," + "'" + Zone[i] + "'";
        //        }
        //    }
        //}
        //else {
        //    ZoneCodes = "Zone Name";
        //}
        ////Getting AreaCodes
        //var Area = $("#Area").val();
        //var AreaCodes = "";
        //if (Area != null) {
        //    for (var i = 0; i < Area.length; i++) {
        //        if (i == 0) {
        //            AreaCodes = "'" + Area[i] + "'";
        //        }
        //        else {
        //            AreaCodes += "," + "'" + Area[i] + "'";
        //        }
        //    }
        //}
        //else {
        //    AreaCodes = "Area Name";
        //}


        ////Getting Location
        //var Location = $("#Location").val();
        //var LocationNames = "";
        //if (Location != null) {
        //    for (var i = 0; i < Location.length; i++) {
        //        if (i == 0) {
        //            LocationNames = "'" + Location[i] + "'";
        //        }
        //        else {
        //            LocationNames += "," + "'" + Location[i] + "'";
        //        }
        //    }
        //}
        //else {
        //    LocationNames = "Location Name";
        //}

        var FilterDataForCounters = JSON.stringify({ 'CustomerCodeNames': CustomerCodeNames, 'StockistNames': StockistNames });
        DIMSSFDCFactory.GetFilterDataForCounters(FilterDataForCounters).success(function (response) {

            var table = $("#CounterList").DataTable();
            table.clear();
            var Result = JSON.parse(response.tabledata);

            for (var i = 0; i < Result.length; i++) {

                $('#CounterList').dataTable().fnAddData([Result[i]["ID"], Result[i]["SALES_EMPLOYEE_NAME"], Result[i]["SALES_REGION"], Result[i]["CUSTOMER_NAME"], Result[i]["CUSTOMER_TYPE_NAME"], Result[i]["CUSTOMER_ADDRESS"], Result[i]["PINCODE"], Result[i]["CONTACT_PERSON_NAME"], Result[i]["CUSTOMER_PHONE_NUMBER"], Result[i]["CUSTOMER_STATE"], Result[i]["CUSTOMER_CITY"], Result[i]["EXCEPTED_VOLUME_TARGET"], Result[i]["DIMS_REF_ID"], "", "", Result[i]["CUSTOMER_STATUS"]]);

            }
            $("#CounterList").DataTable().column(0).visible(false);
            $("#CounterList").DataTable().columns.adjust().draw(false);

            $('#CounterList tbody').on('click', 'tr', function () {
                var ID = $("#CounterList").DataTable().row(this).data()[0]
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    $("#CounterList").DataTable().$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
                if (ID != "") {
                    var scope = angular.element($("#CounterListId")).scope();
                    scope.$apply(function () {
                        scope.go("AddNewCounter/" + ID);
                    })
                }
            });
        });
    });

    $scope.ResetFilters = function () {
        $scope.go("CounterList/");
    }

});


function GetStockistRetailerList(obj) {
    AddOrderFSo.$apply(function () {
        AddOrderFSo.RetailerCode = $(obj).children().eq(0).html();
        AddOrderFSo.RetailerName = $(obj).children().eq(1).html();
        AddOrderFSo.ShipTo = $(obj).children().eq(7).html();
        //AddOrderFSo.RetailerCode = $(obj).children().eq(1).html();
        //AddOrderFSo.RetailerName = $(obj).children().eq(2).html();
        //AddOrderFSo.TerritoryArea = $(obj).children().eq(5).html();
        //AddOrderFSo.ShipTo = $(obj).children().eq(8).html();
    })
    var element = angular.element('#ReportsPopUpModal');
    element.modal('hide');
}

function GetJourneyCustomerDetails(obj) {
    JourneyPlanScope.$apply(function () {
        JourneyPlanScope.Stockist = $(obj).children().eq(1).html();
        JourneyPlanScope.SubStockist = $(obj).children().eq(2).html();
        JourneyPlanScope.CustomerType = $(obj).children().eq(6).html();
        $('#lblCustomerCode').data('val', $(obj).children().eq(4).html());
        $('#lblCustomerName').data('val', $(obj).children().eq(5).html());
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}
//function GetCoordinatorList(obj) {
//    alert("asdfasdf");
//    //AddOrder.$apply(function () {        
//    //    AddOrder.SalesCoorinator = $(obj).children().eq(3).html();
//    //    AddOrder.SalesCoorinatorName = $(obj).children().eq(4).html();
//    //})
//    //var element = angular.element('#LookUpModal');
//    //element.modal('hide');
//}


function GetSalesEmployee(obj) {
    // AddOrder.Sales_Employee = $(obj).children().eq(2).html();  
    AddOrder.$apply(function () {
        AddOrder.Sales_Employee = $(obj).children().eq(2).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');

}

function PrepareDatatable() {
    var columnSort = new Array;
    $('#JPDTable').find('thead tr th').each(function () {
        if ($(this).attr('data-bSortable') == 'true') {
            columnSort.push({ "bSortable": true });
        } else {
            columnSort.push({ "bSortable": false });
        }
    });
    // $("#JPDTable").dataTable().destroy();
    $("#JPDTable").dataTable({
        destroy: true,
        "aoColumns": columnSort
    });
}


function getStockistLookUpData(res, Methodname, Heading) {
    var data = JSON.parse(res.tabledata);
    var element = angular.element('#StocuistLookUpModal');
    element.modal('show');
    $("#ModalHeading").text(Heading);

    if (data == "") {

        $("#StockistStatus").text("No Records found");
        //$("#PopUpTable").dataTable().fnDestroy();
        $('#ModalTable').empty();
    } else {
        $("#MasterStatus").text("");

        $("#ModalTable").dataTable().fnDestroy();
        $('#ModalTable').empty();

        var columns = addAllColumnHeaders(data, "ModalTable");

        for (var i = 0 ; i < data.length ; i++) {
            var row$ = $('<tr onclick="' + name + '(this)" style="cursor:pointer;" />');
            for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                var cellValue = data[i][columns[colIndex]];

                if (cellValue == null) { cellValue = ""; }
                row$.append($('<td/>').html(cellValue));
            }
            $("#ModalTable").append(row$);
        }

        $("#ModalTable tr td:nth-child(1)").hide();
        $("#ModalTable tr th:nth-child(1)").hide();

        var table = $("#ModalTable").dataTable({
            "bDestroy": true,
            'scroll': true
        });

        $('#ModalTable tbody').on('click', 'tr', function () {
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

function getLookUpData_Customer_Master(response, name, pageHeading) {

    var data = "";
    if (pageHeading == "Journeyplan Customer List") {
        data = JSON.parse(response);
    }
    else {

        if (response == "[]" || response == "") {
            alert("No Data Available");
            return;
        }
        data = JSON.parse(response);
    }
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

        for (var i = 0 ; i < data.length ; i++) {
            var row$ = $('<tr onclick="' + name + '(this)" style="cursor:pointer;" />');
            for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
                var cellValue = data[i][columns[colIndex]];

                if (cellValue == null) { cellValue = ""; }
                row$.append($('<td/>').html(cellValue));
            }
            $("#PopUpTable").append(row$);
        }

        $("#PopUpTable tr td:nth-child(1)").hide();
        $("#PopUpTable tr th:nth-child(1)").hide();

        var table = $("#PopUpTable").dataTable({
            "bDestroy": true,
            'scroll': true,
            "order": [[1, "asc"]]
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

//function GetCustomerList(obj) {
//    AddNewCounter.$apply(function () {
//        var CoustomerCode = $(obj).children().eq(1).html();
//        var CustomerType = $(obj).children().eq(2).html();

//        AddNewCounter.CustomerType = CustomerType;
//        AddNewCounter.CustomerCode = CoustomerCode;

//        if (CustomerType == "Stockiest") {
//            $('#lblStockistName').find('span').remove();
//            $('#StockistNameLookup').attr("disabled", true);
//        } else {
//            $('#lblStockistName').append("<span class='Mandatory'>*</span>");
//            $('#StockistNameLookup').removeAttr("disabled");
//        }

//    });
//    var element = angular.element('#LookUpModal');
//    element.modal('hide');
//}

function GetStockistForNewCustomer(obj) {
    AddNewCounter.$apply(function () {
        AddNewCounter.StockistName = $(obj).children().eq(2).html();
        AddNewCounter.StockistCode = $(obj).children().eq(1).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetStateMasterListValue(obj) {
    AddNewCounter.$apply(function () {
        AddNewCounter.CustomerState = $(obj).children().eq(2).html();
        AddNewCounter.CustomerStateCode = $(obj).children().eq(1).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetCityLocationValue(obj) {
    AddNewCounter.$apply(function () {
        AddNewCounter.CustomerCityLocation = $(obj).children().eq(2).html();
        AddNewCounter.CustomerCityLocationCode = $(obj).children().eq(1).html();
    })
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function getSalesEmployeeData(obj) {
    AddOrder.$apply(function () {
        AddOrder.Sales_Employee = $(obj).children().eq(1).html();
        AddOrder.Sales_Employee_Name = $(obj).children().eq(2).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetCustomerList(obj) {
    var SelectedCustomerCode = "";
    AddOrder.$apply(function () {
        AddOrder.CustomerCode = $(obj).children().eq(0).html();
        AddOrder.StockistName = $(obj).children().eq(1).html().replace('amp;', '');
        AddOrder.SourceZone = $(obj).children().eq(2).html();
        AddOrder.State = $(obj).children().eq(3).html().replace('amp;', '');
        AddOrder.TerritoryArea = $(obj).children().eq(4).html().replace('amp;', '');
        AddOrder.Location = $(obj).children().eq(5).html().replace('amp;', '');
        AddOrder.PinCode = $(obj).children().eq(6).html();
        AddOrder.BillingToAddress = $(obj).children().eq(7).html().replace('amp;', '');
        SelectedCustomerCode = $(obj).children().eq(0).html();//For Credit_Debit,Current Outstanding
    });
    var element = angular.element('#ReportsPopUpModal');
    element.modal('hide');

    if (SelectedCustomerCode != "") {
        $.ajax({
            type: 'get',
            async: 'false',
            datatype: 'JSON',
            data: { data: SelectedCustomerCode },
            url: '../../SFDC/GetCustomerCreditOutStanding',
            success: function (data) {
                if (data != "FALSE" && data != "") {
                    var Res = JSON.parse(data);
                    if (Res != "") {
                        $('#ProductRelated').show();
                        $('#CreditLimit').val(parseFloat(Res[0]["CUSTOMER_CREDIT_LIMIT"]).toFixed(2));
                        $('#OutStandingLimit').val(parseFloat(Res[0]["Current_OutStanding"]).toFixed(2));

                        $('#Above45Days_CreditLimit').val(parseFloat(Res[0]["Above45Days_OutStanding"]).toFixed(2));
                        $("#Product option[value='CCSheet']").prop('disabled', true);
                        $("#Product option[value='ACSheet']").prop('disabled', true);
                        for (var i = 0; i < Res.length; i++) {
                            if (Res[i]["CustomerDivisionCode"] == "11") {
                                // $('#Product').val("ACSheet");
                                $("#Product option[value='ACSheet']").prop('disabled', false);
                            } else if (Res[i]["CustomerDivisionCode"] == "14") {
                                //  $('#Product').val("CCSheet");
                                $("#Product option[value='CCSheet']").prop('disabled', false);
                            } else {

                            }
                        }
                        $('#Product').val("");
                        ProductChange();
                    } else {
                        $('#CreditLimit').val("0.00");
                        $('#OutStandingLimit').val("0.00");
                    }
                }
            }
        });
    }
}

function GetRetailerList(obj) {
    AddOrder.$apply(function () {
        AddOrder.RetailerCode = $(obj).children().eq(0).html();
        AddOrder.RetailerName = $(obj).children().eq(1).html().replace('amp;', '');
        AddOrder.ShipTo = $(obj).children().eq(7).html().replace('amp;', '');
    });
    var element = angular.element('#ReportsPopUpModal');
    element.modal('hide');
}

function GetCustomerCodeName(obj) {
    AddPartnerIssues.$apply(function () {
        AddPartnerIssues.CustomerCode = $(obj).children().eq(1).html();
        AddPartnerIssues.CustomerName = $(obj).children().eq(2).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetCustomerWithTypeList(obj) {
    AddInventoryTrack.$apply(function () {
        AddInventoryTrack.CustomerCode = $(obj).children().eq(1).html();
        AddInventoryTrack.CustomerName = $(obj).children().eq(2).html();
        AddInventoryTrack.CustomerType = $(obj).children().eq(3).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}


//          MANI
function GetCustomerNameForInventory(obj) {
    var CustomerCode = "";
    AddInventoryTrack.$apply(function () {
        AddInventoryTrack.CustomerCode = $(obj).children().eq(1).html();
        AddInventoryTrack.CustomerName = $(obj).children().eq(2).html();
        CustomerCode = $(obj).children().eq(1).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
    alert(CustomerCode);
    InventoryFactory.GetAverageMonthlySale(CustomerCode).success(function (response) {

        var Result = JSON.parse(response.tabledata);

        AddInventoryTrack.CustomerType = Result[0]["CustomerType"];
        //alert(Result);
        if (Result[0]["Monthly"] != "") {
            AddInventoryTrack.AverageMonthlySaleHIL = Result[0]["Monthly"];
        }
        else {
            AddInventoryTrack.AverageMonthlySaleHIL = "";

        }
        if (Result[0]["Daily"] != "") {
            $("#DailySaleInHIL").html = Result[0]["Daily"];
        }
        //AddInventoryTrack.CustomerType = Result[0]["CusType"];
    }).error(function (err) {
        alert(err)
    });
}

function GetCustomerCodeName(obj) {
    AddPartnerIssues.$apply(function () {
        AddPartnerIssues.CustomerCode = $(obj).children().eq(1).html();
        AddPartnerIssues.CustomerName = $(obj).children().eq(2).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetScheme_Product(obj) {
    AddNewSchemeScope.$apply(function () {

        AddNewSchemeScope.Product = $(obj).children().eq(2).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetScheme_Category(obj) {
    AddNewSchemeScope.$apply(function () {

        AddNewSchemeScope.Category = $(obj).children().eq(2).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetScheme_State(obj) {
    AddNewSchemeScope.$apply(function () {

        AddNewSchemeScope.State = $(obj).children().eq(2).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetScheme_Location(obj) {
    AddNewSchemeScope.$apply(function () {

        AddNewSchemeScope.Location = $(obj).children().eq(2).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetScheme_Zone(obj) {
    AddNewSchemeScope.$apply(function () {

        AddNewSchemeScope.Zone = $(obj).children().eq(2).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function GetScheme_Territory(obj) {
    AddNewSchemeScope.$apply(function () {

        AddNewSchemeScope.TerritoryArea = $(obj).children().eq(2).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

//mani

//Karthik Counter Lookup

function GetCustomertype(obj) {
    AddNewCounter.$apply(function () {
        //AddNewCounter.CustomerCode = $(obj).children().eq(1).html();
        AddNewCounter.CustomerTypeCode = $(obj).children().eq(1).html();
        AddNewCounter.CustomerType = $(obj).children().eq(2).html();
    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
    EditPanTin();
}

function GetDistrictMasterListValue(obj) {
    AddNewCounter.$apply(function () {
        //AddNewCounter.CustomerCode = $(obj).children().eq(1).html();
        AddNewCounter.CustomerDistrictCode = $(obj).children().eq(1).html();
        AddNewCounter.CustomerDistrict = $(obj).children().eq(2).html();

    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');
}

function EditPanTin() {
    var CustomerType = $("#CustomerType").val();
    if (CustomerType == "Stockist") {
        $('#SpanPan').show();
        $('#SpanTin').show();
    } else {
        $('#SpanPan').hide();
        $('#SpanTin').hide();
    }
}

function GetCustomerDetails(obj) {
    AddMarketMap.$apply(function () {
        AddMarketMap.CustomerCode = $(obj).children().eq(1).html();
        AddMarketMap.CustomerName = $(obj).children().eq(2).html();
        AddMarketMap.CustomerType = $(obj).children().eq(3).html();
        AddMarketMap.CustomerTypeCode = $(obj).children().eq(4).html();

    });
    var element = angular.element('#LookUpModal');
    element.modal('hide');

}


//Karthik


//Karhtik Market Map
DIMS.controller('MarketMapCtrl', function ($scope, $location, DIMSSFDCFactory, $http, $compile, $routeParams, DIMSFactory) {
    $scope.templatesettings = { HeaderTitle: "Market Map" };
    $scope.go = function (path) {
        $location.path(path);
    };
    var width = $(window).width(), height = $(window).height();//---------
    CounterFactory = DIMSFactory;
    CounterHttp = $http;
    var totalheight = height - 191;
    // var totalheight = height - 148;//--------    
    if (height <= 800) {
        totalheight = height - 148;
    }

    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });//-----------
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
    $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });//-----------

    if (SessionValue == "FSO" || SessionValue == "FSO_BU2") {

    }
    else if (SessionValue == "TM") {

    }
    else {
        $("#btnAddCounter").hide();
    }

    var data_value = ""; var all_zones = ""; var all_states = ""; var all_territories = ""; var all_customers = ""; var CustomerArray = new Array();
    ShowLoader();
    if ((SessionValue == "ZH") || (SessionValue == "RCC") || (SessionValue == "ZSC")) {
        $("#Zone").attr("disabled", false); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                if (FilterList.dtZone.length == 0) {
                    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterList.dtZone.length - 1) {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            $('select#Zone')[0].sumo.selectItem(0);
            $('#Zone').trigger("change");

        });
    } else if (SessionValue == "SH") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);

            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);

            }
            $('select#Zone')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);

            }
            $('select#State')[0].sumo.selectItem(0);
            $('#State').trigger("change");

        });
    }

    else if (SessionValue == "TM") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + "TM" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);

            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);

            }
            $('select#Zone')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);

            }

            $('select#State')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);


                if (ID != "") {
                    var scope = angular.element($("#EditMarketMapDiv")).scope();
                    scope.$apply(function () {

                        scope.go("AddMarketMap/" + ID);
                    })

                }

            }
        });
    }



    else if (SessionValue == "FSO" || SessionValue == "FSO_BU2") {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        if (SessionValue == "FSO") {
            data_value = "{\"Role\":\"" + "FSO" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        } else {
            data_value = "{\"Role\":\"" + "FSO_BU2" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        }
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);

            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);

            }
            $('select#Zone')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);

            }
            $('select#State')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);

            }
            $('select#TerriotryArea')[0].sumo.selectItem(0);
            $('#TerriotryArea').trigger("change");

        });
    }

    else if ((SessionValue == "STOCKIST") || (SessionValue == "C&F")) {
        $("#Zone").attr("disabled", true); $("#State").attr("disabled", true); $("#TerriotryArea").attr("disabled", true); $('#CustomerCode').attr("disabled", true); $('#CustomerCode').css({ "class": "gray" });// $("#StockistID").attr("disabled", true);

        data_value = "{\"Role\":\"" + "STOCKIST" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);

            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);

            }
            $('select#Zone')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterList.dtState.length; i++) {
                $('#State')[0].sumo.add(FilterList.dtState[i]["STATE_CODE"], FilterList.dtState[i]["STATE_NAME"]);

            }
            $('select#State')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterList.dtTerritory.length; i++) {
                $('#TerriotryArea')[0].sumo.add(FilterList.dtTerritory[i]["TERRITORY_CODE"], FilterList.dtTerritory[i]["TERRITORY_NAME"]);

            }
            $('select#TerriotryArea')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterList.dtCustomer.length; i++) {

                CustomerArray.push(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);
                $('#CustomerCode').val(FilterList.dtCustomer[i]["CUSTOMER_CODE"] + ":" + FilterList.dtCustomer[i]["CUSTOMER_NAME"]);

            }
            $("#CustomerCode").typeahead({
                source: CustomerArray
            });

        });
    } else {
        $("#Zone").attr("disabled", false); $("#State").attr("disabled", false); $("#TerriotryArea").attr("disabled", false); $('#CustomerCode').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_value = "{\"Role\":\"" + SessionValue + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_value } }).success(function (res) {
            var FilterList = JSON.parse(res);
            all_zones = "";
            for (var i = 0; i < FilterList.dtZone.length; i++) {
                $('#Zone')[0].sumo.add(FilterList.dtZone[i]["ZONE_CODE"], FilterList.dtZone[i]["ZONE_NAME"]);
                if (FilterList.dtZone.length == 0) {
                    all_zones = "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterList.dtZone.length - 1) {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zones += "'" + FilterList.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            CustomerArray.length = 0;
            $("#CustomerCode").val("");
            if (FilterList.dtCustomer.length > 0) {
                for (var i = 0; i < FilterList.dtCustomer.length; i++) {
                    CustomerArray.push(FilterList.dtCustomer[i]["STOCKIST_ID"].toString() + ":" + FilterList.dtCustomer[i]["STOCKIST_NAME"].toString());
                }
            }

        });

    }
    HideLoader();
    $('#Zone').on('keyup change', function () {
        ShowLoader();
        var Clear_State = $('#State option').length;
        for (var i = 0; i < Clear_State; i++) {
            $('#State')[0].sumo.remove(0);
        }

        CustomerArray.length = 0;//---------------------------9
        $('#CustomerCode').val("");

        var Clear_Terrytory = $('#TerriotryArea option').length;
        for (var i = 0; i < Clear_Terrytory; i++) {
            $('#TerriotryArea')[0].sumo.remove(0);
        }

        var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
        $http({ url: '../../Home/GetStatesforZone', method: 'POST', data: { Data: data_value } }).success(function (res) {
            if (res != "") {
                var dtState = JSON.parse(res);
                for (var i = 0; i < dtState.length; i++) {
                    $('#State')[0].sumo.add(dtState[i]["STATE_CODE"], dtState[i]["STATE_NAME"]);
                }
                HideLoader();
            } else { HideLoader(); }

            $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                if (Cust_res != "") {
                    var dtCust = JSON.parse(Cust_res);
                    for (var i = 0; i < dtCust.length; i++) {
                        CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//---------------------1

                    }
                }
            });
        });

    });

    var SelectedState = ""; var Actual_SelectedState = ""; var Actual_SelectedTerritory = "";
    $('#State').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedState = "";
        var Clear_Territory = $('#TerriotryArea option').length;
        for (var i = 0; i < Clear_Territory; i++) {
            $('#TerriotryArea')[0].sumo.remove(0);
        }


        CustomerArray.length = 0;//------------------------------------2
        $('#CustomerCode').val("");

        if ($('#State').val() != null) {
            var seleState = $('#State').val();

            for (var k = 0; k < seleState.length; k++) {
                SelectedState += "'" + seleState[k] + "',";
                Actual_SelectedState += "'" + seleState[k] + "',";
            }
            SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
            Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 
        }

        var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
        $http({ url: '../../Home/GetTerritoriesforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
            if (res != "") {

                var dtTerritory = JSON.parse(res);
                for (var i = 0; i < dtTerritory.length; i++) {
                    $('#TerriotryArea')[0].sumo.add(dtTerritory[i]["TERRITORY_CODE"], dtTerritory[i]["TERRITORY_NAME"]);
                }
                //  ShowLoader();
                $http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        // ShowLoader();

                        var dtCust = JSON.parse(res);

                        for (var i = 0; i < dtCust.length; i++) {
                            // $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());

                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//---------------------3
                        }
                        HideLoader();
                    } else {
                        HideLoader();
                    }
                });
            }
            HideLoader();
        });

        if ($("#State").val() == null) {
            var data_value = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
            if ((SessionValue != "SH") && (SessionValue != "TM") && (SessionValue != "FSO") && (SessionValue != "FSO_BU2") && (SessionValue != "STOCKIST") && (SessionValue != "C&F")) {
                $http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_value } }).success(function (Cust_res) {
                    if (Cust_res != "") {
                        var dtCust = JSON.parse(Cust_res);
                        for (var i = 0; i < dtCust.length; i++) {
                            //  $('#StockistID')[0].sumo.add(dtCust[i]["CUSTOMER_CODE"].toString(), dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());
                        }
                        HideLoader();
                    } else {
                        HideLoader();
                    }
                });
            }
            HideLoader();
        }
        SelectedState = "";
        // HideLoader();
    });

    var SelectedTerritory = "";
    $('#TerriotryArea').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedTerritory = ""; Actual_SelectedState = "";
        if ((SessionValue == "TM") || (SessionValue == "FSO") || (SessionValue == "FSO_BU2")) {
            if ($("#TerriotryArea").val() == null) {

                CustomerArray.length = 0;//-------------------------------------4
                $('#CustomerCode').val("");

                HideLoader();
            } else if ($("#TerriotryArea").val() != null) {
                var seleTerritory = $('#TerriotryArea').val();
                for (var k = 0; k < seleTerritory.length; k++) {
                    SelectedTerritory += "'" + seleTerritory[k] + "',";
                    Actual_SelectedTerritory += "'" + seleTerritory[k] + "',";
                }
                SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTerritory = Actual_SelectedTerritory.substring(',', Actual_SelectedTerritory.length - 1);//Selected Territories with ' '. 

                var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                $http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {

                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);//--------------------5
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            }
        } else {

            CustomerArray.length = 0;//-------------------------------------6
            $('#CustomerCode').val("");

            if ($('#TerriotryArea').val() != null) {
                var seleTerritory = $('#TerriotryArea').val();
                for (var k = 0; k < seleTerritory.length; k++) {
                    SelectedTerritory += "'" + seleTerritory[k] + "',";
                    Actual_SelectedTerritory += "'" + seleTerritory[k] + "',";
                }
                SelectedTerritory = SelectedTerritory.substring(',', SelectedTerritory.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTerritory = Actual_SelectedTerritory.substring(',', Actual_SelectedTerritory.length - 1);//Selected Territories with ' '. 
            }
            if ($("#TerriotryArea").val() == null) {
                var seleState = $('#State').val();

                for (var k = 0; k < seleState.length; k++) {
                    SelectedState += "'" + seleState[k] + "',";
                    Actual_SelectedState += "'" + seleState[k] + "',";
                }
                SelectedState = SelectedState.substring(',', SelectedState.length - 1);//Selected States with ' '. 
                Actual_SelectedState = Actual_SelectedState.substring(',', Actual_SelectedState.length - 1);//Selected States with ' '. 

                var data_value = "{\"State_Code\":\"" + SelectedState + "\"}";
                $http({ url: '../../Home/GetCustomersforState', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {

                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//--------------7
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            } else {
                var data_value = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";
                $http({ url: '../../Home/GetCustomersforTerritory', method: 'POST', data: { Data: data_value } }).success(function (res) {
                    if (res != "") {
                        var dtCust = JSON.parse(res);
                        for (var i = 0; i < dtCust.length; i++) {

                            CustomerArray.push(dtCust[i]["CUSTOMER_CODE"] + ":" + dtCust[i]["CUSTOMER_NAME"]);//-------------8
                        }
                        HideLoader();
                    } else { HideLoader(); }
                });
            }
        }
        SelectedTerritory = "";
        SelectedState = "";
    });

    $('#CustomerCode').typeahead({
        source: CustomerArray
    });
    HideLoader();

    /////////////////////////////////////////////////////////////////////////////////


    var data_valueOthers = ""; var all_zonesOthers = ""; var all_statesOthers = ""; var all_territoriesOthers = ""; var all_customersOthers = ""; var CustomerArrayOthers = new Array();
    ShowLoader();
    if ((SessionValue == "ZH") || (SessionValue == "RCC") || (SessionValue == "ZSC")) {
        $("#ZoneOthers").attr("disabled", false); $("#StateOthers").attr("disabled", false); $("#TerriotryAreaOthers").attr("disabled", false); $('#CustomerCodeOthers').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_valueOthers = "{\"Role\":\"" + "ZH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_valueOthers } }).success(function (res) {
            var FilterListOthers = JSON.parse(res);
            all_zonesOthers = "";
            for (var i = 0; i < FilterListOthers.dtZone.length; i++) {
                $('#ZoneOthers')[0].sumo.add(FilterListOthers.dtZone[i]["ZONE_CODE"], FilterListOthers.dtZone[i]["ZONE_NAME"]);
                if (FilterListOthers.dtZone.length == 0) {
                    all_zonesOthers = "'" + FilterListOthers.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterListOthers.dtZone.length - 1) {
                    all_zonesOthers += "'" + FilterListOthers.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zonesOthers += "'" + FilterListOthers.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            $('select#ZoneOthers')[0].sumo.selectItem(0);
            $('#ZoneOthers').trigger("change");

        });
    } else if (SessionValue == "SH") {
        $("#ZoneOthers").attr("disabled", true); $("#StateOthers").attr("disabled", false); $("#TerriotryAreaOthers").attr("disabled", false); $('#CustomerCodeOthers').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_valueOthers = "{\"Role\":\"" + "SH" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_valueOthers } }).success(function (res) {
            var FilterListOthers = JSON.parse(res);

            for (var i = 0; i < FilterListOthers.dtZone.length; i++) {
                $('#ZoneOthers')[0].sumo.add(FilterListOthers.dtZone[i]["ZONE_CODE"], FilterListOthers.dtZone[i]["ZONE_NAME"]);

            }
            $('select#ZoneOthers')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterListOthers.dtState.length; i++) {
                $('#StateOthers')[0].sumo.add(FilterListOthers.dtState[i]["STATE_CODE"], FilterListOthers.dtState[i]["STATE_NAME"]);

            }
            $('select#StateOthers')[0].sumo.selectItem(0);
            $('#StateOthers').trigger("change");

        });
    }

    else if (SessionValue == "TM") {
        $("#ZoneOthers").attr("disabled", true); $("#StateOthers").attr("disabled", true); $("#TerriotryAreaOthers").attr("disabled", false); $('#CustomerCodeOthers').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_valueOthers = "{\"Role\":\"" + "TM" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_valueOthers } }).success(function (res) {
            var FilterListOthers = JSON.parse(res);

            for (var i = 0; i < FilterListOthers.dtZone.length; i++) {
                $('#ZoneOthers')[0].sumo.add(FilterListOthers.dtZone[i]["ZONE_CODE"], FilterListOthers.dtZone[i]["ZONE_NAME"]);

            }
            $('select#ZoneOthers')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterListOthers.dtState.length; i++) {
                $('#StateOthers')[0].sumo.add(FilterListOthers.dtState[i]["STATE_CODE"], FilterListOthers.dtState[i]["STATE_NAME"]);

            }

            $('select#StateOthers')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterListOthers.dtTerritory.length; i++) {
                $('#TerriotryAreaOthers')[0].sumo.add(FilterListOthers.dtTerritory[i]["TERRITORY_CODE"], FilterListOthers.dtTerritory[i]["TERRITORY_NAME"]);


                if (ID != "") {
                    var scope = angular.element($("#EditMarketMapDiv")).scope();
                    scope.$apply(function () {

                        scope.go("AddMarketMap/" + ID);
                    })

                }

            }
        });
    }



    else if (SessionValue == "FSO" || SessionValue == "FSO_BU2") {
        $("#ZoneOthers").attr("disabled", true); $("#StateOthers").attr("disabled", true); $("#TerriotryAreaOthers").attr("disabled", false); $('#CustomerCodeOthers').attr("disabled", false);// $("#StockistID").attr("disabled", false);
        if (SessionValue == "FSO") {
            data_valueOthers = "{\"Role\":\"" + "FSO" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        } else {
            data_valueOthers = "{\"Role\":\"" + "FSO_BU2" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        }
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_valueOthers } }).success(function (res) {
            var FilterListOthers = JSON.parse(res);

            for (var i = 0; i < FilterListOthers.dtZone.length; i++) {
                $('#ZoneOthers')[0].sumo.add(FilterListOthers.dtZone[i]["ZONE_CODE"], FilterListOthers.dtZone[i]["ZONE_NAME"]);

            }
            $('select#ZoneOthers')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterListOthers.dtState.length; i++) {
                $('#StateOthers')[0].sumo.add(FilterListOthers.dtState[i]["STATE_CODE"], FilterListOthers.dtState[i]["STATE_NAME"]);

            }
            $('select#StateOthers')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterListOthers.dtTerritory.length; i++) {
                $('#TerriotryAreaOthers')[0].sumo.add(FilterListOthers.dtTerritory[i]["TERRITORY_CODE"], FilterListOthers.dtTerritory[i]["TERRITORY_NAME"]);

            }
            $('select#TerriotryAreaOthers')[0].sumo.selectItem(0);
            $('#TerriotryAreaOthers').trigger("change");

        });
    }

    else if ((SessionValue == "STOCKIST") || (SessionValue == "C&F")) {
        $("#ZoneOthers").attr("disabled", true); $("#StateOthers").attr("disabled", true); $("#TerriotryAreaOthers").attr("disabled", true); $('#CustomerCodeOthers').attr("disabled", true); $('#CustomerCodeOthers').css({ "class": "gray" });// $("#StockistID").attr("disabled", true);

        data_valueOthers = "{\"Role\":\"" + "STOCKIST" + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_valueOthers } }).success(function (res) {
            var FilterListOthers = JSON.parse(res);

            for (var i = 0; i < FilterListOthers.dtZone.length; i++) {
                $('#ZoneOthers')[0].sumo.add(FilterListOthers.dtZone[i]["ZONE_CODE"], FilterListOthers.dtZone[i]["ZONE_NAME"]);

            }
            $('select#ZoneOthers')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterListOthers.dtState.length; i++) {
                $('#StateOthers')[0].sumo.add(FilterListOthers.dtState[i]["STATE_CODE"], FilterListOthers.dtState[i]["STATE_NAME"]);

            }
            $('select#StateOthers')[0].sumo.selectItem(0);

            for (var i = 0; i < FilterListOthers.dtTerritory.length; i++) {
                $('#TerriotryAreaOthers')[0].sumo.add(FilterListOthers.dtTerritory[i]["TERRITORY_CODE"], FilterListOthers.dtTerritory[i]["TERRITORY_NAME"]);

            }
            $('select#TerriotryAreaOthers')[0].sumo.selectItem(0);



        });
    } else {
        $("#ZoneOthers").attr("disabled", false); $("#StateOthers").attr("disabled", false); $("#TerriotryAreaOthers").attr("disabled", false); $('#CustomerCodeOthers').attr("disabled", false);// $("#StockistID").attr("disabled", false);

        data_valueOthers = "{\"Role\":\"" + SessionValue + "\",\"UserCode\":\"" + $("#UserCode").val() + "\"}";
        $http({ url: '../../Home/GetFilters', method: 'POST', data: { Data: data_valueOthers } }).success(function (res) {
            var FilterListOthers = JSON.parse(res);
            all_zonesOthers = "";
            for (var i = 0; i < FilterListOthers.dtZone.length; i++) {
                $('#ZoneOthers')[0].sumo.add(FilterListOthers.dtZone[i]["ZONE_CODE"], FilterListOthers.dtZone[i]["ZONE_NAME"]);
                if (FilterListOthers.dtZone.length == 0) {
                    all_zonesOthers = "'" + FilterListOthers.dtZone[i]["ZONE_CODE"] + "'";
                } else if (i == FilterListOthers.dtZone.length - 1) {
                    all_zonesOthers += "'" + FilterListOthers.dtZone[i]["ZONE_CODE"] + "'";
                } else {
                    all_zonesOthers += "'" + FilterListOthers.dtZone[i]["ZONE_CODE"] + "'" + ',';
                }
            }
            CustomerArrayOthers.length = 0;


        });

    }
    HideLoader();
    $('#ZoneOthers').on('keyup change', function () {
        ShowLoader();
        var Clear_StateOthers = $('#StateOthers option').length;
        for (var i = 0; i < Clear_StateOthers; i++) {
            $('#StateOthers')[0].sumo.remove(0);
        }


        var Clear_TerrytoryOthers = $('#TerriotryAreaOthers option').length;
        for (var i = 0; i < Clear_TerrytoryOthers; i++) {
            $('#TerriotryAreaOthers')[0].sumo.remove(0);
        }

        var data_valueOthers = "{\"Zone_Code\":\"" + $("#ZoneOthers").val() + "\"}";
        $http({ url: '../../Home/GetStatesforZone', method: 'POST', data: { Data: data_valueOthers } }).success(function (res) {
            if (res != "") {
                var dtStateOthers = JSON.parse(res);
                for (var i = 0; i < dtStateOthers.length; i++) {
                    $('#StateOthers')[0].sumo.add(dtStateOthers[i]["STATE_CODE"], dtStateOthers[i]["STATE_NAME"]);
                }
                HideLoader();
            } else { HideLoader(); }

            //$http({ url: '../../Home/GetCustomersforZone', method: 'POST', data: { Data: data_valueOthers } }).success(function (Cust_res) {
            //    if (Cust_res != "") {
            //        var dtCust = JSON.parse(Cust_res);
            //        for (var i = 0; i < dtCust.length; i++) {
            //            CustomerArrayOthers.push(dtCust[i]["CUSTOMER_CODE"].toString() + ":" + dtCust[i]["CUSTOMER_NAME"].toString());//---------------------1

            //        }
            //    }
            //});
        });

    });

    var SelectedStateOthers = ""; var Actual_SelectedStateOthers = ""; var Actual_SelectedTerritoryOthers = "";
    $('#StateOthers').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedStateOthers = "";
        var Clear_TerritoryOthers = $('#TerriotryAreaOthers option').length;
        for (var i = 0; i < Clear_TerritoryOthers; i++) {
            $('#TerriotryAreaOthers')[0].sumo.remove(0);
        }


        if ($('#StateOthers').val() != null) {
            var seleStateOthers = $('#StateOthers').val();

            for (var k = 0; k < seleStateOthers.length; k++) {
                SelectedStateOthers += "'" + seleStateOthers[k] + "',";
                Actual_SelectedStateOthers += "'" + seleStateOthers[k] + "',";
            }
            SelectedStateOthers = SelectedStateOthers.substring(',', SelectedStateOthers.length - 1);//Selected States with ' '. 
            Actual_SelectedStateOthers = Actual_SelectedStateOthers.substring(',', Actual_SelectedStateOthers.length - 1);//Selected States with ' '. 
        }

        var data_valueOthers = "{\"State_Code\":\"" + SelectedStateOthers + "\"}";
        $http({ url: '../../Home/GetTerritoriesforState', method: 'POST', data: { Data: data_valueOthers } }).success(function (res) {
            if (res != "") {

                var dtTerritory = JSON.parse(res);
                for (var i = 0; i < dtTerritory.length; i++) {
                    $('#TerriotryAreaOthers')[0].sumo.add(dtTerritory[i]["TERRITORY_CODE"], dtTerritory[i]["TERRITORY_NAME"]);
                }
            }
            HideLoader();
        });

        if ($("#StateOthers").val() == null) {
            var data_valueOthers = "{\"Zone_Code\":\"" + $("#Zone").val() + "\"}";
            if ((SessionValue != "SH") && (SessionValue != "TM") && (SessionValue != "FSO") && (SessionValue != "FSO_BU2") && (SessionValue != "STOCKIST") && (SessionValue != "C&F")) {

            }
            HideLoader();
        }

    });

    var SelectedTerritoryOthers = "";
    $('#TerriotryAreaOthers').on('keyup change', function () {
        ShowLoader();
        Actual_SelectedTerritoryOthers = ""; Actual_SelectedStateOthers = "";
        if ((SessionValue == "TM") || (SessionValue == "FSO") || (SessionValue == "FSO_BU2")) {
            if ($("#TerriotryAreaOthers").val() == null) {



                HideLoader();
            } else if ($("#TerriotryAreaOthers").val() != null) {
                var seleTerritoryOthers = $('#TerriotryAreaOthers').val();
                for (var k = 0; k < seleTerritoryOthers.length; k++) {
                    SelectedTerritoryOthers += "'" + seleTerritoryOthers[k] + "',";
                    Actual_SelectedTerritoryOthers += "'" + seleTerritoryOthers[k] + "',";
                }
                SelectedTerritoryOthers = SelectedTerritoryOthers.substring(',', SelectedTerritoryOthers.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTerritoryOthers = Actual_SelectedTerritoryOthers.substring(',', Actual_SelectedTerritoryOthers.length - 1);//Selected Territories with ' '. 

                var data_valueOthers = "{\"Territory_Code\":\"" + SelectedTerritory + "\"}";

                HideLoader();
            }
        } else {



            if ($('#TerriotryAreaOthers').val() != null) {
                var seleTerritory = $('#TerriotryAreaOthers').val();
                for (var k = 0; k < seleTerritory.length; k++) {
                    SelectedTerritoryOthers += "'" + seleTerritory[k] + "',";
                    Actual_SelectedTerritoryOthers += "'" + seleTerritory[k] + "',";
                }
                SelectedTerritoryOthers = SelectedTerritoryOthers.substring(',', SelectedTerritoryOthers.length - 1);//Selected Territories with ' '. 
                Actual_SelectedTerritoryOthers = Actual_SelectedTerritoryOthers.substring(',', Actual_SelectedTerritoryOthers.length - 1);//Selected Territories with ' '. 
            }
            if ($("#TerriotryAreaOthers").val() == null) {
                var seleState = $('#StateOthers').val();

                for (var k = 0; k < seleState.length; k++) {
                    SelectedStateOthers += "'" + seleState[k] + "',";
                    Actual_SelectedStateOthers += "'" + seleState[k] + "',";
                }
                SelectedStateOthers = SelectedStateOthers.substring(',', SelectedStateOthers.length - 1);//Selected States with ' '. 
                Actual_SelectedStateOthers = Actual_SelectedStateOthers.substring(',', Actual_SelectedStateOthers.length - 1);//Selected States with ' '. 

                var data_valueOthers = "{\"State_Code\":\"" + SelectedStateOthers + "\"}";

                HideLoader();
            } else {
                HideLoader();

            }
        }

        HideLoader();
    });


    HideLoader();

    /////////////////////////////////////////////////////////////////////////////////


    $scope.GetCustomersHIL = function () {
        try {

            var FromDate = $('#OrderFromDate').val();
            var ToDate = $('#OrderToDate').val();
            var ZoneValue = $('#Zone').val();
            var StateValue = $('#State').val();
            var TerritoryValue = $('#TerriotryArea').val();
            var isValidCustCode = isValidCode_Cust($("#CustomerCode").val(), CustomerArray);

            var frmdate = FromDate.split("-");
            var tdate = ToDate.split("-");
            frmdate = frmdate[2] + "/" + frmdate[1] + "/" + frmdate[0];
            tdate = tdate[2] + "/" + tdate[1] + "/" + tdate[0];

            //if (FromDate == "" || FromDate == undefined) {
            //    alert("Please select From date");
            //    return;
            //}

            //if (ToDate == "" || ToDate == undefined) {
            //    alert("please select To date");
            //    return;
            //}

            //if (ToDate < FromDate) {
            //    alert("To date is less than From date")
            //    return;
            //}


            if (SessionValue == "NSH" && ZoneValue == null) {
                alert("please select zone");
                return;
            }
            if (SessionValue == "ADMIN" && ZoneValue == null) {
                alert("please select zone");
                return;
            }
            if (SessionValue == "ZSC" && ZoneValue == null) {
                alert("please select zone");
                return;
            }
            else if (SessionValue == "ZH" && StateValue == null) {
                alert("please select state");
                return;
            }
            else if (SessionValue == "ADMIN" && StateValue == null) {
                alert("please select state");
                return;
            }
            else if (SessionValue == "SH" && TerritoryValue == null) {
                alert("please select Territory");
            }
            else if (SessionValue == "TM" && TerritoryValue == null) {
                alert("please select Territory");
            }
            else if (($("#CustomerCode").val() != "") && (isValidCustCode == false)) {
                alert("Please select proper customer code");
            }
            else {
                ShowLoader();
                //var WhereClause = "where ITDC.COMPANY_NAME='Total in MT' and ITD.LAST_UPDATED_DATE_AND_TIME >= '" + frmdate + "' and  ITD.LAST_UPDATED_DATE_AND_TIME<='" + tdate + "' ";
                //var WhereClause = "where ITDC.COMPANY_NAME='Total in MT' ";
                var WhereClause = " where CM.STOCKIST_ID in (select distinct STOCKIST_ID from sap_customer_sales_master where DIVISION !='99' and SALES_ORGANISATION = '1000') ";
                if ($("#CustomerCode").val() != "") {
                    if (($("#CustomerCode").val() != "") && (isValidCustCode == false)) {
                    } else {
                        WhereClause += " and CAST(CM.STOCKIST_ID AS BIGINT) IN (" + $("#CustomerCode").val().split(':')[0] + ")";
                    }
                } else if ($("#TerriotryArea").val() != null) {
                    WhereClause += " and CAST(CM.STOCKIST_ID AS BIGINT) IN (select CUSTOMER_CODE from cms_employee_customer_configuration where ORG_LEVEL_ID in (" + Actual_SelectedTerritory + ")) ";
                } else if ($("#State").val() != null) {
                    WhereClause += " and CM.STATE IN(" + Actual_SelectedState + ")";
                }
                else if ($("#Zone").val() != null) {
                    WhereClause += " and ZM.ZONE_CODE IN(" + $("#Zone").val() + ") ";
                }
                if (($("#Zone").val() == null) && ($("#State").val() == null) && ($("#TerriotryArea").val() == null) && ($("#CustomerCode").val() == "")) {
                    WhereClause += " ";
                }


                var Data = JSON.stringify({
                    MasterType: "MarketMapHIL",
                    ID: "561",
                    UserCode: $("#UserCode").val(),
                    "Type": "Get",
                    ReportName: "MarketMapHIL",
                    WhereClause: WhereClause
                });

                DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
                    var Result = JSON.parse(response.tabledata);

                    if (Result != "") {
                        $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
                        if (Result.hasOwnProperty('UserListColumnNames')) {
                            var data1 = JSON.parse(Result["UserListColumnNames"]);

                            var selectedcolumnname = data1["ColumnNames"];

                            CustomColumnID = Result["UserListID"];
                            $('#undo_redo_to').empty();
                            var ColArray = new Array();
                            for (var i = 0; i < selectedcolumnname.length; i++) {


                                ColArray.push({
                                    "data": selectedcolumnname[i],
                                    "name": selectedcolumnname[i], "bSortable": true
                                });
                                $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                            }
                            //$scope.UserSelectedColumnName = ColArray;
                            UserSelectedColumnName = ColArray;
                        } else {

                            var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                            var selectedcolumnname = data1["ColumnNames"];

                            CustomColumnID = "0";

                            $('#undo_redo_to').empty();
                            var ColArray = new Array();
                            for (var i = 0; i < selectedcolumnname.length; i++) {
                                ColArray.push({
                                    "data": selectedcolumnname[i],
                                    "name": selectedcolumnname[i],
                                    "bSortable": "true"
                                });
                                $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                            }
                            //$scope.UserSelectedColumnName = ColArray;
                            UserSelectedColumnName = ColArray;
                        }



                    }
                    ShowLoader();
                    DIMSFactory.getReportData(Data).success(function (response) {
                        ShowLoader();
                        getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "MarketMap", UserSelectedColumnName);


                        //$("#CredtiNoteDetailId").show();
                        //ShowLoader();

                    });
                });


            }
        } catch (Exception) { }
    }


    angular.element(document).on('click', '#Othermart', function () {

        var FromDateOthers = $('#OrderFromDateOthers').val();
        var ToDateOthers = $('#OrderToDateOthers').val();
        var ZoneValueOthers = $('#ZoneOthers').val();
        var StateValueOthers = $('#StateOthers').val();
        var TerritoryValueOthers = $('#TerriotryAreaOthers').val();
        var isValidCustCodeOthers = isValidCode_Cust($("#CustomerCodeOthers").val(), CustomerArray);

        var frmdateOthers = FromDateOthers.split("-");
        var tdateOthers = ToDateOthers.split("-");
        frmdateOthers = frmdateOthers[2] + "/" + frmdateOthers[1] + "/" + frmdateOthers[0];
        tdateOthers = tdateOthers[2] + "/" + tdateOthers[1] + "/" + tdateOthers[0];


        if (FromDateOthers == "" || FromDateOthers == undefined) {
            alert("Please select From date");
            return;
        }

        if (ToDateOthers == "" || ToDateOthers == undefined) {
            alert("please select To date");
            return;
        }

        //if (ToDateOthers < FromDateOthers) {
        //    alert("To date is less than From date")
        //    return;
        //}


        if (SessionValue == "ZH" && ZoneValueOthers == null) {
            alert("please select zone");
        }
        else if (SessionValue == "SH" && StateValueOthers == null) {
            alert("please select state");
        } else if (SessionValue == "TM" && TerritoryValueOthers == null) {
            alert("please select Territory");
        }
        else if ((SessionValue == "FSO" || SessionValue == "FSO_BU2") && TerritoryValueOthers == null) {
            alert("please select Territory");
        }
        else {
            ShowLoader();

            var StateCodes = "";
            $("#StateOthers option").each(function (i) {

                if (i == 0) {
                    StateCodes = "'" + $(this).val() + "'";
                }
                else { StateCodes += ",'" + $(this).val() + "'"; }
            });

            var WhereClause = " where SAP_CODE is null and cast(CD.CREATED_DATE as date) between '" + frmdateOthers + "' and '" + tdateOthers + "' ";


            if ($("#TerriotryAreaOthers").val() != null) {

                WhereClause += " and CD.SALES_EMPLOYEE_CODE in (select EMPLOYEE_CODE from cms_organization_level where ORG_LEVEL_ID in ( " + Actual_SelectedTerritoryOthers + ")) ";
            } else if ($("#StateOthers").val() != null) {
                WhereClause += " and cs.STATE_CODE IN(" + Actual_SelectedStateOthers + ") ";
            }
            else if ($("#ZoneOthers").val() != null && $("#StateOthers").val() == null) {


                WhereClause += " and cs.STATE_CODE IN(" + StateCodes + ") ";
            }
            if (($("#ZoneOthers").val() == null) && ($("#StateOthers").val() == null) && ($("#TerriotryAreaOthers").val() == null) && ($("#CustomerCodeOthers").val() == "")) {
                WhereClause += " ";
            }
        }


        try {

            //var WhereClause = "";
            var Data = JSON.stringify({
                MasterType: "MarketMapOthers",
                ID: "561",
                UserCode: $("#UserCode").val(),
                "Type": "Get",
                ReportName: "MarketMapOthers",
                WhereClause: WhereClause
            });

            DIMSFactory.getReportListColumnNamesData(Data).success(function (response) {
                var Result = JSON.parse(response.tabledata);

                if (Result != "") {
                    $scope.UserDefaultListColumnNames = Result["UserDefaultListColumnNames"];
                    if (Result.hasOwnProperty('UserListColumnNames')) {
                        var data1 = JSON.parse(Result["UserListColumnNames"]);

                        var selectedcolumnname = data1["ColumnNames"];

                        CustomColumnID = Result["UserListID"];
                        $('#undo_redo_to').empty();
                        var ColArray = new Array();
                        for (var i = 0; i < selectedcolumnname.length; i++) {


                            ColArray.push({
                                "data": selectedcolumnname[i],
                                "name": selectedcolumnname[i], "bSortable": true
                            });
                            $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                        }
                        //$scope.UserSelectedColumnName = ColArray;
                        UserSelectedColumnName = ColArray;
                    } else {

                        var data1 = JSON.parse(Result["UserDefaultListColumnNames"]);

                        var selectedcolumnname = data1["ColumnNames"];

                        CustomColumnID = "0";

                        $('#undo_redo_to').empty();
                        var ColArray = new Array();
                        for (var i = 0; i < selectedcolumnname.length; i++) {
                            ColArray.push({
                                "data": selectedcolumnname[i],
                                "name": selectedcolumnname[i],
                                "bSortable": "true"
                            });
                            $("#undo_redo_to").append($("<option></option>").val(selectedcolumnname[i]).html(selectedcolumnname[i]));
                        }
                        //$scope.UserSelectedColumnName = ColArray;
                        UserSelectedColumnName = ColArray;
                    }



                }
                //ShowLoader();
                DIMSFactory.getReportData(Data).success(function (response) {
                    ShowLoader();
                    getLookUpData_Reports_ServerSideBinding("", "EnrollmentNodataLabel", "", "MarketMapCompetitorCustomersHILProspects", UserSelectedColumnName);


                    //$("#CredtiNoteDetailId").show();
                    //ShowLoader();

                    $(".dataTables_scrollHead").css("width", "100%");
                    $(".dataTables_scrollBody").css("width", "100%");
                    $(".dataTables_scrollHeadInner").css("width", "100%");
                    $("#MarketMapCompetitorCustomersHILProspects").css("width", "100%");
                    //$("#MarketMapCompetitorCustomersHILProspects").DataTable().column(6).visible(false);
                    //var contactId = $("#MarketMapCompetitorCustomersHILProspects").fnGetData(position)[6];
                    //var contactId=$("#MarketMapCompetitorCustomersHILProspects").DataTable().row(this).data()[0]
                    //alert(contactId);
                    //$('#MarketMapCompetitorCustomersHILProspects th').eq(6).hide();
                    //$('th:nth-child(6)').hide()
                    //$('th:nth-child(6),td:nth-child(6)').hide();

                    //var mani = angular.element(document).find("#MarketMapCompetitorCustomersHILProspects");

                    //$("#MarketMapCompetitorCustomersHILProspects thead").find('th:eq(6)').css("display", "none");
                    //$("#MarketMapCompetitorCustomersHILProspects").each(function () {
                    //    alert($(this).html());
                    //   // alert($(this).find('td:eq(6)').html());
                    //    $(this).find('td:eq(6)').css("display", "none");
                    //});
                    // var tr = document.getElementById("MarketMapCompetitorCustomersHILProspects");
                    //// var tbody = tr.getElementsByTagName("tbody");
                    // var trs = tbody.getElementsByTagName("tr");
                    // var tds = trs.getElementsByTagName("td");


                    // for (var i = 0; i < tds.length; i++) {
                    //     tds[6].style.display = "none";
                    // }

                });
            });
        } catch (Exception) { }
    })

    angular.element(document).on('click', '#MarketMap tbody tr', function () {
        var strin = "HILS";
        //var customerID = $("#MarketMap").DataTable().row(this).data()[0]
        var customerID = $(this).find('td:eq(0)').text();
        var ID = "HILS" + "$" + customerID;
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            $("#MarketMap").DataTable().$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        if (ID != "") {
            var scope = angular.element($("#EditMarketMapDiv")).scope();
            scope.$apply(function () {
                scope.go("AddMarketMap/" + ID);
            })
        }

    });

});

DIMS.controller('AddMarketMap', function ($scope, $location, DIMSSFDCFactory, $routeParams) {
    var Sendmaildetails = "";
    AddMarketMap = $scope;
    $scope.templatesettings = { HeaderTitle: "Add Market Map" };
    $scope.go = function (path) {

        $location.path(path);

    };

    angular.element(document).ready(function () {
        //$scope.NoOfDaysStock = "30";
        $("#logohide").hide();
        var width = $(window).width(), height = $(window).height();
        var totalheight = height - 191;
        if (height <= 800) {
            totalheight = height - 148;
        }
        // var totalheight = height - 148;
        $('.content').css({ "max-height": totalheight, "min-height": totalheight, "overflow-y": "auto" });
        $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------

        var EditMarketMapId = $routeParams.ID;
        if (EditMarketMapId == undefined || EditMarketMapId == "") {
            EditMarketMapId = 0;
        }
        else {
            DIMSSFDCFactory.GetMarketMapDataForEdit(EditMarketMapId).success(function (res) {
                Sendmaildetails = res;
                $("#AddMarket").empty();
                $("#AddMarket").html("Edit Market Map");


                if (res == "No Data") {
                    alert("No Data Available for this customer");
                    $scope.go('MarketMap');
                }
                else {
                    var resp = res.split('$$');
                    var HeadData = JSON.parse(resp[0]);
                    var result = JSON.parse(resp[1]);
                    var match = resp[2];
                    var zero = 0;
                    $("#divcustcode").removeAttr("visibility", "hidden");
                    //$("#divcustcode").hide();
                    $("#lblCustomerCode").removeAttr("visibility", "hidden");
                    $('#ExpectedVolumeTargetMT').removeAttr("visibility", "hidden");
                    $('#lblexpected').removeAttr("visibility", "hidden");
                    $('#lblnumber').removeAttr("visibility", "hidden");
                    $('#NoofdaysofStockHILAvg').removeAttr("visibility", "hidden");
                    //$("#HIL_AMS").removeAttr("gray");
                    $("#HIL_AMS").addClass("gray");
                    $('#HIL_AMS').attr("disabled", true);
                    $("#EditCounter").hide();
                    ///////

                    $("#CustomerName").addClass("gray");
                    $("#CustomerAddress").addClass("gray");
                    $('#CustomerAddress').attr("disabled", true);
                    $("#PinCode").addClass("gray");
                    $('#PinCode').attr("disabled", true);
                    $("#PanNumber").addClass("gray");
                    $('#PanNumber').attr("disabled", true);
                    $("#TinNumber").addClass("gray");
                    $('#TinNumber').attr("disabled", true);
                    $("#SalesDistrict").addClass("gray");
                    $('#SalesDistrict').attr("disabled", true);
                    $("#CustomerState").addClass("gray");
                    $('#CustomerState').attr("disabled", true);
                    $("#CustomerCityLocation").addClass("gray");
                    $('#CustomerCityLocation').attr("disabled", true);
                    $("#ContactPersonName").addClass("gray");
                    $('#ContactPersonName').attr("disabled", true);
                    $("#ContactPersonNumber").addClass("gray");
                    $('#ContactPersonNumber').attr("disabled", true);
                    $("#CustomerEmailID").addClass("gray");
                    $('#CustomerEmailID').attr("disabled", true);


                    /////

                    $scope.CustomerCode = HeadData[0]["Customer Code"];
                    $scope.CustomerName = HeadData[0]["Customer Name"];
                    $scope.CustomerType = HeadData[0]["Customer Type"];
                    $scope.CustomerAddress = HeadData[0]["Address"];
                    $scope.PinCode = HeadData[0]["PinCode"];
                    $scope.PanNumber = HeadData[0]["PanNmumber"];
                    $scope.TinNumber = HeadData[0]["TinNumber"];
                    $scope.SalesDistrict = HeadData[0]["Sales District"];
                    $scope.ContactPersonName = HeadData[0]["ContactPersonName"];
                    $scope.ContactPersonNumber = HeadData[0]["PHONE1"];
                    $scope.CustomerEmailID = HeadData[0]["EMAIL"];
                    $scope.NoofdaysofStockHILAvg = HeadData[0]["No. of days of Stock (Avg)"];
                    $scope.CustomerState = HeadData[0]["Sales Region"];
                    $scope.CustomerCityLocation = HeadData[0]["City"];
                    $scope.HIL_AMS = HeadData[0]["MonthlyAvg"];

                    if (match == "MarketMap") {

                        $scope.Ramko = HeadData[0]["RAMKO"];
                        $scope.Everest = HeadData[0]["EVEREST"];
                        $scope.Swastik = HeadData[0]["SWASTIK"];
                        $scope.Konark = HeadData[0]["KONARK"];
                        $scope.Uppal = HeadData[0]["UPPAL"];
                        $scope.Visaka = HeadData[0]["VISAKA"];
                        $scope.Others = HeadData[0]["OTHERS"];
                    }
                    else {
                        for (var i = 0; i < result.length; i++) {
                            $("#" + result[i]["COMPANY_NAME"]).val(result[i]["TOTAL_IN_MT"]);
                        }
                    }

                    if (match == "Counter") {
                        $("#SendMail").removeClass("hidden");
                        //$("#CustomerCode").hide();
                        $("#divcustcode").css("visibility", "hidden");
                        //$("#divcustcode").hide();
                        $("#lblCustomerCode").css("visibility", "hidden");
                        $("#HIL_AMS").addClass("gray");
                        $('#HIL_AMS').attr("disabled", true);
                        $('#ExpectedVolumeTargetMT').css("visibility", "hidden");
                        $('#lblexpected').css("visibility", "hidden");
                        $('#lblnumber').css("visibility", "hidden");
                        $('#NoofdaysofStockHILAvg').css("visibility", "hidden");
                        $("#EditCounter").show();
                        $("#CustomerName").addClass("gray");
                        $("#CustomerAddress").addClass("gray");
                        $('#CustomerAddress').attr("disabled", true);
                        $("#PinCode").addClass("gray");
                        $('#PinCode').attr("disabled", true);
                        $("#PanNumber").addClass("gray");
                        $('#PanNumber').attr("disabled", true);
                        $("#TinNumber").addClass("gray");
                        $('#TinNumber').attr("disabled", true);
                        $("#SalesDistrict").addClass("gray");
                        $('#SalesDistrict').attr("disabled", true);
                        $("#CustomerState").addClass("gray");
                        $('#CustomerState').attr("disabled", true);
                        $("#CustomerCityLocation").addClass("gray");
                        $('#CustomerCityLocation').attr("disabled", true);
                        $("#ContactPersonName").addClass("gray");
                        $('#ContactPersonName').attr("disabled", true);
                        $("#ContactPersonNumber").addClass("gray");
                        $('#ContactPersonNumber').attr("disabled", true);
                        $("#CustomerEmailID").addClass("gray");
                        $('#CustomerEmailID').attr("disabled", true);

                        $scope.CustomerCode = HeadData[0]["ID"];
                        $scope.CustomerName = HeadData[0]["Customer Name"];
                        $scope.CustomerType = HeadData[0]["CustomerType"];
                        $scope.CustomerAddress = HeadData[0]["CUSTOMER_ADDRESS"];
                        $scope.PinCode = HeadData[0]["CUSTOMER_PIN_CODE"];
                        $scope.PanNumber = HeadData[0]["CUSTOMER_PAN_NUMBER"];
                        $scope.TinNumber = HeadData[0]["CUSTOMER_TIN_NUMBER"];
                        $scope.SalesDistrict = HeadData[0]["Sales District"];
                        $scope.ContactPersonName = HeadData[0]["CONTACT_PERSON_NAME"];
                        $scope.ContactPersonNumber = HeadData[0]["CONTACT_PERSON_NUMBER"];
                        $scope.CustomerEmailID = HeadData[0]["CUSTOMER_EMAIL_ID"];
                        $scope.NoofdaysofStockHILAvg = HeadData[0]["No. of days of Stock (Avg)"];
                        $scope.CustomerState = HeadData[0]["Sales Region"];
                        $scope.CustomerCityLocation = HeadData[0]["CUSTOMER_CITY"];
                        $scope.HIL_AMS = zero;
                        $scope.Ramko = zero;
                        $scope.Everest = zero;
                        $scope.Swastik = zero;
                        $scope.Konark = zero;
                        $scope.Uppal = zero;
                        $scope.Visaka = zero;
                        $scope.Others = zero;
                    }
                    if (match == "CounterMarket") {
                        $("#SendMail").removeClass("hidden");
                        //$("#CustomerCode").hide();
                        $("#divcustcode").css("visibility", "hidden");
                        //$("#divcustcode").hide();
                        $("#lblCustomerCode").css("visibility", "hidden");
                        $("#HIL_AMS").addClass("gray");
                        $('#HIL_AMS').attr("disabled", true);
                        $('#ExpectedVolumeTargetMT').css("visibility", "hidden");
                        $('#lblexpected').css("visibility", "hidden");
                        $('#lblnumber').css("visibility", "hidden");
                        $('#NoofdaysofStockHILAvg').css("visibility", "hidden");
                        $("#EditCounter").show();
                        $("#CustomerName").addClass("gray");
                        $("#CustomerAddress").addClass("gray");
                        $('#CustomerAddress').attr("disabled", true);
                        $("#PinCode").addClass("gray");
                        $('#PinCode').attr("disabled", true);
                        $("#PanNumber").addClass("gray");
                        $('#PanNumber').attr("disabled", true);
                        $("#TinNumber").addClass("gray");
                        $('#TinNumber').attr("disabled", true);
                        $("#SalesDistrict").addClass("gray");
                        $('#SalesDistrict').attr("disabled", true);
                        $("#CustomerState").addClass("gray");
                        $('#CustomerState').attr("disabled", true);
                        $("#CustomerCityLocation").addClass("gray");
                        $('#CustomerCityLocation').attr("disabled", true);
                        $("#ContactPersonName").addClass("gray");
                        $('#ContactPersonName').attr("disabled", true);
                        $("#ContactPersonNumber").addClass("gray");
                        $('#ContactPersonNumber').attr("disabled", true);
                        $("#CustomerEmailID").addClass("gray");
                        $('#CustomerEmailID').attr("disabled", true);

                        $scope.CustomerCode = HeadData[0]["ID"];
                        $scope.CustomerName = HeadData[0]["Customer Name"];
                        $scope.CustomerType = HeadData[0]["CustomerType"];
                        $scope.CustomerAddress = HeadData[0]["CUSTOMER_ADDRESS"];
                        $scope.PinCode = HeadData[0]["CUSTOMER_PIN_CODE"];
                        $scope.PanNumber = HeadData[0]["CUSTOMER_PAN_NUMBER"];
                        $scope.TinNumber = HeadData[0]["CUSTOMER_TIN_NUMBER"];
                        $scope.SalesDistrict = HeadData[0]["Sales District"];
                        $scope.ContactPersonName = HeadData[0]["CONTACT_PERSON_NAME"];
                        $scope.ContactPersonNumber = HeadData[0]["CONTACT_PERSON_NUMBER"];
                        $scope.CustomerEmailID = HeadData[0]["CUSTOMER_EMAIL_ID"];
                        $scope.NoofdaysofStockHILAvg = HeadData[0]["No. of days of Stock (Avg)"];
                        $scope.CustomerState = HeadData[0]["Sales Region"];
                        $scope.CustomerCityLocation = HeadData[0]["CUSTOMER_CITY"];
                        $scope.HIL_AMS = HeadData[0]["HIL"];
                        $scope.Ramko = HeadData[0]["RAMKO"];
                        $scope.Everest = HeadData[0]["EVEREST"];
                        $scope.Swastik = HeadData[0]["SWASTIK"];
                        $scope.Konark = HeadData[0]["KONARK"];
                        $scope.Uppal = HeadData[0]["UPPAL"];
                        $scope.Visaka = HeadData[0]["VISAKA"];
                        $scope.Others = HeadData[0]["OTHERS"];
                    }



                    if (match == "CUSTMarketMap") {
                        $("#HIL_AMS").addClass("gray");
                        $('#HIL_AMS').attr("disabled", true);
                        $("#divcustcode").removeAttr("visibility", "hidden");
                        //$("#divcustcode").hide();
                        $("#lblCustomerCode").removeAttr("visibility", "hidden");
                        $('#ExpectedVolumeTargetMT').removeAttr("visibility", "hidden");
                        $('#lblexpected').removeAttr("visibility", "hidden");
                        $('#lblnumber').removeAttr("visibility", "hidden");
                        $('#NoofdaysofStockHILAvg').removeAttr("visibility", "hidden");
                        //$("#HIL_AMS").removeAttr("gray");
                        $("#EditCounter").hide();
                        $scope.CustomerCode = HeadData[0]["Customer Code"];
                        $scope.CustomerName = HeadData[0]["Customer Name"];
                        $scope.CustomerType = HeadData[0]["Customer Type"];
                        $scope.CustomerAddress = HeadData[0]["Address"];
                        $scope.PinCode = HeadData[0]["PinCode"];
                        $scope.PanNumber = HeadData[0]["PanNmumber"];
                        $scope.TinNumber = HeadData[0]["TinNumber"];
                        $scope.SalesDistrict = HeadData[0]["Sales District"];
                        $scope.ContactPersonName = HeadData[0]["ContactPersonName"];
                        $scope.ContactPersonNumber = HeadData[0]["PHONE1"];
                        $scope.CustomerEmailID = HeadData[0]["EMAIL"];
                        $scope.NoofdaysofStockHILAvg = zero;
                        $scope.CustomerState = HeadData[0]["Sales Region"];
                        $scope.CustomerCityLocation = HeadData[0]["City"];
                        $scope.HIL_AMS = HeadData[0]["HIL"];
                        $scope.Ramko = zero;
                        $scope.Everest = zero;
                        $scope.Swastik = zero;
                        $scope.Konark = zero;
                        $scope.Uppal = zero;
                        $scope.Visaka = zero;
                        $scope.Others = zero;

                    }
                }
            });
            $('#Stockist').attr("disabled", true);
            $('#SubStockist').attr("disabled", true);
        }

        $scope.EditCounter = function () {
            $scope.go("AddNewCounter/" + EditMarketMapId);
        }

        var width = $(window).width(), height = $(window).height();
        var totalheight = height - 191;

        $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });

    });
    $scope.Getdata = function (Methodname, MasterType, Heading) {
        var Data = JSON.stringify({
            MasterType: MasterType,
            ID: "2"
        });
        DIMSSFDCFactory.getMasterData(Data).success(function (response) {
            getLookUpData(response, Methodname, Heading);
        });
    }
    $scope.SaveMarketMap = function () {
        var UserId = $("#UserId").html();
        var UserName = $("#UserName").html();
        var CustomerCode = $scope.CustomerCode;
        var CustomerName = $scope.CustomerName;
        var CustomerType = $scope.CustomerType;
        var CustomerAddress = $scope.CustomerAddress;
        var PinCode = $scope.PinCode;
        var PanNumber = $scope.PanNumber;
        var TinNumber = $scope.TinNumber;
        var NoofdaysofStockHILAvg = $scope.NoofdaysofStockHILAvg;
        var SalesDistrict = $scope.SalesDistrict;
        var CustomerState = $scope.CustomerState;
        var CustomerCityLocation = $scope.CustomerCityLocation;
        var ExpectedVolumeTarget = $scope.ExpectedVolumeTargetMT;
        var ContactPersonName = $scope.ContactPersonName;
        var ContactPersonNumber = $scope.ContactPersonNumber;
        var CustomerEmailID = $scope.CustomerEmailID;
        var HIL_AMS = $("#HIL_AMS").val();
        var Ramko = $("#Ramko").val();
        var Everest = $("#Everest").val();
        var Swastik = $("#Swastik").val();
        var Uppal = $("#Uppal").val();
        var Visaka = $("#Visaka").val();
        var Others = $("#Others").val();
        var Konark = $("#Konark").val();
        var EditMarketMapId = $routeParams.ID;
        if (ExpectedVolumeTarget == undefined || ExpectedVolumeTarget == "") {
            ExpectedVolumeTarget = 0;
        }
        if (NoofdaysofStockHILAvg == "" || NoofdaysofStockHILAvg == null || NoofdaysofStockHILAvg == undefined) {
            NoofdaysofStockHILAvg = "0";
        }
        if (HIL_AMS == "" || HIL_AMS == null || HIL_AMS == undefined) {
            HIL_AMS = "0";
        }
        if (Ramko == "" || Ramko == undefined) {
            Ramko = "0";
        }
        if (Everest == "" || Everest == undefined) {
            Everest = "0";
        }
        if (Swastik == "" || Swastik == undefined) {
            Swastik = "0";
        }
        if (Uppal == "" || Uppal == undefined) {
            Uppal = "0";
        }
        if (Visaka == "" || Visaka == undefined) {
            Visaka = "0";
        }
        if (Konark == "" || Konark == undefined) {
            Konark = "0";
        }
        if (Others == "" || Others == undefined) {
            Others = "0";
        }
        if (ContactPersonNumber == "" || ContactPersonNumber == undefined) {
            ContactPersonNumber = null;
        }
        if (CustomerName == "" || CustomerName == undefined) {
            alert("Please Select Customer Name");
        }
        else {
            var TotalMarketMap = JSON.stringify({
                "EditMarketMapId": EditMarketMapId,
                "CustomerCode": CustomerCode,
                "CustomerName": CustomerName,
                "CustomerType": CustomerType,
                "CustomerAddress": CustomerAddress,
                "PinCode": PinCode,
                "PanNumber": PanNumber,
                "TinNumber": TinNumber,
                "NoofdaysofStockHILAvg": NoofdaysofStockHILAvg,
                "SalesDistrict": SalesDistrict,
                "CustomerState": CustomerState,
                "CustomerCityLocation": CustomerCityLocation,
                "ExpectedVolumeTarget": ExpectedVolumeTarget,
                "ContactPersonName": ContactPersonName,
                "ContactPersonNumber": ContactPersonNumber,
                "CustomerEmailID": CustomerEmailID,
                "HIL_AMS": HIL_AMS,
                "Ramko": Ramko,
                "Everest": Everest,
                "Swastik": Swastik,
                "Uppal": Uppal,
                "Visaka": Visaka,
                "Konark": Konark,
                "Others": Others,
                "UserId": UserId,
                "UserName": UserName
            });

            DIMSSFDCFactory.SaveMarketMapData(TotalMarketMap).success(function (response) {
                if (response == "Save") {
                    alert("Saved successfully");
                    $scope.go('MarketMap');
                } else if (response == "Fail") {
                    alert("Error Occured while Saving");
                } else if (response == "Update") {
                    alert("Update Successfully");
                    $scope.go('MarketMap');
                } else if (response == "UpdateFail") {
                    alert("Error Occured while Update");
                } else {
                    alert(response);
                }
            });
        }
    };

    angular.element(document).on('click', '#SendMail', function () {

        var resp = Sendmaildetails.split('$$');
        var HeadData = resp[0];
        var result = JSON.parse(resp[1]);
        var match = resp[2];
        $.ajax({
            url: '../SFDC/SendMailCounterDetails',
            type: 'post',
            async: 'false',
            datatype: 'JSON',
            data: { Sendmaildetails: HeadData },
            success: function (response) {
                alert(response);
                // window.location.reload();

                var scope = angular.element($("#ScopeAddMM")).scope();
                scope.$apply(function () {
                    scope.go("MarketMap");
                })

            }
        })
    });
});
//Karhtik End Market Map


DIMS.controller('HolidayConfigurationControl', function ($scope, $location, DIMSSFDCFactory) {
    $scope.templatesettings = { HeaderTitle: "Holiday Configuration" };
    $scope.go = function (path) {
        $location.path(path);
    };
    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });

    angular.element(document).ready(function () {

        HolidayYearBind();
        HolidayList(DIMSSFDCFactory, 0);
        var UserName = $("#UserName").html();
        var UserId = $("#UserId").html();
        var Data = JSON.stringify({
            MasterType: "StateMasterForHoliday",
            ID: "2", 'UserId': UserId, 'UserName': UserName, 'SessionValue': SessionValue
        });

        DIMSSFDCFactory.getMasterData(Data).success(function (response) {

            var data = JSON.parse(response);
            $("#ApplicableStates").empty();

            for (var i = 0; i < data.length; i++) {
                $("#ApplicableStates").append($("<option></option>").val(data[i]["STATE_CODE"]).html(data[i]["STATE_DESC"]));
            }

            $("#ApplicableStates").SumoSelect({ placeholder: 'Select State' });
        });
        HolidayFact = DIMSSFDCFactory;
    });
    HolidayScope = $scope;


    $('#OccasionDate').datepicker().on('changeDate', function (ev) {
        var eventDate = $('#OccasionDate').val();
        DIMSSFDCFactory.GetDateBasedDayinHoliday(eventDate).success(function (response) {
            if (response != "")
                $scope.OccasionDay = response;
        });
    });

    $scope.SaveRDFSData = function () {
        var UserId = $("#UserId").html();
        var UserName = $("#UserName").html();
        //var EditId = $scope.HolidayID;
        var EditId = $('#HolidayID').val();
        var Occasion_Desc = $('#OccasionDescription').val();
        var OccasionDate = $('#OccasionDate').val();
        var Occasion_day = $('#OccasionDay').val();
        //var Occasion_Desc = $scope.OccasionDescription;
        //var OccasionDate = $scope.OccasionDate;
        //var Occasion_day = $scope.OccasionDay;
        var Zones = $scope.ApplicableZones;
        // var Applicable_States = $scope.ApplicableStates;
        var Applicable_States = $('#ApplicableStates').val();
        // var Status = $scope.OccasionStatus;
        var Status = $('#OccasionStatus').val();

        if (EditId == "" || EditId == null) { EditId = 0; }
        if (Occasion_Desc == undefined) { Occasion_Desc = ""; }
        if (OccasionDate == undefined) { OccasionDate = ""; }
        if (Occasion_day == undefined) { Occasion_day = ""; }
        if (Zones == undefined) { Zones = ""; }
        // if (Applicable_States == undefined) { Applicable_States = ""; }
        // if (Status == undefined) { Status = ""; }       
        if (Occasion_Desc == "" || Occasion_Desc == null) {
            alert("Please Enter Occasion Description");
        } else if (OccasionDate == "" || OccasionDate == null) {
            alert("Please Select Occasion Date");
        } else if (Applicable_States == "" || Applicable_States == null) {
            alert("Please Select Applicable States");
        } else if (Status == "" || Status == null) {
            alert("Please Select Status");
        } else {
            var TotalHolidayData = JSON.stringify({
                "EditId": EditId,
                "Occasion_Desc": Occasion_Desc,
                "OccasionDate": OccasionDate,
                "Occasion_day": Occasion_day,
                "Applicable_States": Applicable_States,
                "Status": Status,
                "UserId": UserId

            });

            DIMSSFDCFactory.SaveHolidayData(TotalHolidayData).success(function (response) {
                if (response == "Insert") {
                    alert("Saved successfully");
                    //  $("#HolidayConfigListTable tbody").empty();
                    HolidayList(DIMSSFDCFactory, 1);
                    //  $scope.go('DailyOrderTracking');
                } else if (response == "Fail") {
                    alert("Error Occured while Saving");
                } else if (response == "Update") {
                    alert("Update Successfully");
                    HolidayList(DIMSSFDCFactory, 1);
                    //  HolidayList(DIMSSFDCFactory);
                    // $scope.go('DailyOrderTracking');
                } else if (response == "UpdateFail") {
                    alert("Error Occured while Update");
                } else {
                    alert(response);
                }
            });
        }

    }

    $scope.DeleteRDFS = function () {

        //var EditId = $scope.HolidayID;
        var EditId = $('#HolidayID').val();
        var Occasion_Desc = $('#OccasionDescription').val();
        var OccasionDate = $('#OccasionDate').val();
        var Occasion_day = $('#OccasionDay').val();
        //var Occasion_Desc = $scope.OccasionDescription;
        //var OccasionDate = $scope.OccasionDate;
        //var Occasion_day = $scope.OccasionDay;
        var Zones = $scope.ApplicableZones;
        // var Applicable_States = $scope.ApplicableStates;
        var Applicable_States = $('#ApplicableStates').val();
        // var Status = $scope.OccasionStatus;
        var Status = $('#OccasionStatus').val();

        if (EditId == "" || EditId == null) { EditId = 0; }
        if (Occasion_Desc == undefined) { Occasion_Desc = ""; }
        if (OccasionDate == undefined) { OccasionDate = ""; }
        if (Occasion_day == undefined) { Occasion_day = ""; }
        if (Zones == undefined) { Zones = ""; }
        // if (Applicable_States == undefined) { Applicable_States = ""; }
        // if (Status == undefined) { Status = ""; }       
        if (Occasion_Desc == "" || Occasion_Desc == null) {
            alert("Please Enter Occasion Description");
        } else if (OccasionDate == "" || OccasionDate == null) {
            alert("Please Select Occasion Date");
        } else if (Applicable_States == "" || Applicable_States == null) {
            alert("Please Select Applicable States");
        } else if (Status == "" || Status == null) {
            alert("Please Select Status");
        } else {
            var TotalHolidayData = JSON.stringify({
                "EditId": EditId,
                "Occasion_Desc": Occasion_Desc,
                "OccasionDate": OccasionDate,
                "Occasion_day": Occasion_day,
                "Applicable_States": Applicable_States,
                "Status": Status
            });

            DIMSSFDCFactory.DeleteHolidayData(TotalHolidayData).success(function (response) {
                alert(response);
                var table = $("#HolidayConfigListTable").DataTable();
                table.clear();
                HolidayList(DIMSSFDCFactory, 0);
                //$(".modal-content").modal("hide");

            });
        }

    }


    //var table = $('#HolidayConfigListTable').DataTable();
    //$('#HolidayConfigListTable tbody').on('click', 'tr', function () {
    //    $('#HolidayConfigListTable tbody tr').each(function () {
    //        $(this).removeClass('selected');
    //    });
    //    $(this).toggleClass('selected');
    //    var RowData = table.row(this).data();
    //    $("#HolidayFormModel").modal('show');
    //    $('#HolidayID').val(RowData[0]);
    //    $('#OccasionDescription').val(RowData[2]);
    //    $('#OccasionDate').val(RowData[3]);
    //    $('#OccasionDay').val(RowData[4]);

    //    $('#ApplicableStates')[0].sumo.unSelectAll();
    //    //  $('#ApplicableStates')[0].sumo.unload();
    //    var obj;
    //    $('#ApplicableStates option').each(function () {
    //        if ($(this).text() == RowData[5]) {
    //            obj = $(this).index();
    //        }
    //    });

    //    $('#ApplicableStates')[0].sumo.selectItem(obj);
    //    $("#OccasionStatus option:contains(" + RowData[6] + ")").attr('selected', 'selected');
    //});

    angular.element(document).on('change', '#YearFilter', function () {
        var table = $("#HolidayConfigListTable").DataTable();
        table.clear();
        HolidayList(DIMSSFDCFactory, 0);
    })
});

DIMS.controller('PartnerIssueSummaryControl', function ($scope, $location, DIMSSFDCFactory) {
    $scope.templatesettings = { HeaderTitle: "Partner Issue Summary" };
    $scope.go = function (path) {
        $location.path(path);
    };
    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });

    angular.element(document).ready(function () {
        //$("#PartnerIssueSummarytbl").dataTable().fnClearTable();
        ShowLoader();
        DIMSSFDCFactory.GetPartnerIssueSummary().success(function (Result) {
            if (Result != "") {

                var LoggedinIssues = ResolvedIssues = PendingIssues = 0;
                var HtmlData = '';

                //if (Result[0]["ZONE_NAME"] != "" && Result[0]["ZONE_NAME"] != null && Result[0]["ZONE_NAME"] != "null") {
                HtmlData += '<tr>';
                HtmlData += '<td>' + Result[0]["STATE"] + '</td>';
                HtmlData += '<td>' + Result[0]["No of Issue Logged in"] + '</td>';
                HtmlData += '<td>' + Result[0]["Issues resolved"] + '</td>';
                HtmlData += '<td>' + Result[0]["Issues Pending"] + '</td>';
                HtmlData += '</tr>';
                //}
                var FirstRecord = 0;

                for (var i = 1; i < Result.length; i++) {
                    if (Result[i]["ZONE_NAME"] == Result[i - 1]["ZONE_NAME"] || FirstRecord == 0) {
                        HtmlData += '<tr>';
                        HtmlData += '<td>' + Result[i]["STATE"] + '</td>';
                        HtmlData += '<td>' + Result[i]["No of Issue Logged in"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues resolved"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues Pending"] + '</td>';
                        HtmlData += '</tr>';
                        LoggedinIssues += parseInt(Result[i]["No of Issue Logged in"]);
                        ResolvedIssues += parseInt(Result[i]["Issues resolved"]);
                        PendingIssues += parseInt(Result[i]["Issues Pending"]);
                        FirstRecord = 1;
                    }
                    else {
                        HtmlData += '<tr style="background-color: #ECF0F5">';
                        HtmlData += '<td>' + Result[i - 1]["ZONE_NAME"] + '</td>';
                        HtmlData += '<td>' + LoggedinIssues + '</td>';
                        HtmlData += '<td>' + ResolvedIssues + '</td>';
                        HtmlData += '<td>' + PendingIssues + '</td>';
                        HtmlData += '</tr>';
                        LoggedinIssues = ResolvedIssues = PendingIssues = 0;
                        FirstRecord = 0;

                        HtmlData += '<tr>';
                        HtmlData += '<td>' + Result[i]["STATE"] + '</td>';
                        HtmlData += '<td>' + Result[i]["No of Issue Logged in"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues resolved"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues Pending"] + '</td>';
                        HtmlData += '</tr>';
                        LoggedinIssues += parseInt(Result[i]["No of Issue Logged in"]);
                        ResolvedIssues += parseInt(Result[i]["Issues resolved"]);
                        PendingIssues += parseInt(Result[i]["Issues Pending"]);
                        //$('#PartnerIssueSummarytbl').dataTable().fnAddData([Result[i]["STATE"], Result[i]["No of Issue Logged in"], Result[i]["Issues resolved"], Result[i]["Issues Pending"]]);                       
                    }
                }

                HtmlData += '<tr style="background-color:#ECF0F5">';
                HtmlData += '<td>' + Result[Result.length - 1]["ZONE_NAME"] + '</td>';
                HtmlData += '<td>' + LoggedinIssues + '</td>';
                HtmlData += '<td>' + ResolvedIssues + '</td>';
                HtmlData += '<td>' + PendingIssues + '</td>';
                HtmlData += '</tr>';

                $('#PartnerIssueSummarytbl').append(HtmlData);
                $('#PartnerIssueSummarytbl').dataTable({
                    "ordering": false,
                    bPaginate: false
                });

            }
            else {
                $("#PartnerIssueSummarytbl").dataTable().fnClearTable();
            }
            //$("#PartnerIssueSummarytbl").DataTable().columns.adjust().draw(false);
        })
        HideLoader();

    });

    angular.element(document).on('changeDate', '#FromDate', function () {

        var StartDate = $scope.StartDate;
        var EndDate = $scope.EndDate;


        var MyDate = $("#FromDate").val();
        if ($("#FromDate").val() != "") {
            //$("#Invoice_Details").val($("#Date_Supply_From").val() + " " + "To" + " " + $("#Date_Supply_TO").val());
            $("#ToDate").datepicker('setStartDate', MyDate);
            $("#ToDate").val("");
        }

        if (StartDate == undefined || StartDate == "") { StartDate = "From Date" }

        if (EndDate == undefined || EndDate == "") { EndDate = "To Date" }

        var Dates = JSON.stringify({ "FromDate": StartDate, "ToDate": EndDate })


        DIMSSFDCFactory.GetfilterdataForPartnerIssueSummary(Dates).success(function (Result) {
            ShowLoader();
            $('#PartnerIssueSummarytbl tbody').empty();
            if (Result != "") {
                var LoggedinIssues = ResolvedIssues = PendingIssues = 0;
                var HtmlData = '';

                //if (Result[0]["ZONE_NAME"] != "" && Result[0]["ZONE_NAME"] != null && Result[0]["ZONE_NAME"] != "null") {
                HtmlData += '<tr>';
                HtmlData += '<td>' + Result[0]["STATE"] + '</td>';
                HtmlData += '<td>' + Result[0]["No of Issue Logged in"] + '</td>';
                HtmlData += '<td>' + Result[0]["Issues resolved"] + '</td>';
                HtmlData += '<td>' + Result[0]["Issues Pending"] + '</td>';
                HtmlData += '</tr>';
                //}
                var FirstRecord = 0;

                for (var i = 1; i < Result.length; i++) {
                    if (Result[i]["ZONE_NAME"] == Result[i - 1]["ZONE_NAME"] || FirstRecord == 0) {
                        HtmlData += '<tr>';
                        HtmlData += '<td>' + Result[i]["STATE"] + '</td>';
                        HtmlData += '<td>' + Result[i]["No of Issue Logged in"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues resolved"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues Pending"] + '</td>';
                        HtmlData += '</tr>';
                        LoggedinIssues += parseInt(Result[i]["No of Issue Logged in"]);
                        ResolvedIssues += parseInt(Result[i]["Issues resolved"]);
                        PendingIssues += parseInt(Result[i]["Issues Pending"]);
                        FirstRecord = 1;
                    }
                    else {
                        HtmlData += '<tr style="background-color: #ECF0F5">';
                        HtmlData += '<td>' + Result[i - 1]["ZONE_NAME"] + '</td>';
                        HtmlData += '<td>' + LoggedinIssues + '</td>';
                        HtmlData += '<td>' + ResolvedIssues + '</td>';
                        HtmlData += '<td>' + PendingIssues + '</td>';
                        HtmlData += '</tr>';
                        LoggedinIssues = ResolvedIssues = PendingIssues = 0;
                        FirstRecord = 0;

                        HtmlData += '<tr>';
                        HtmlData += '<td>' + Result[i]["STATE"] + '</td>';
                        HtmlData += '<td>' + Result[i]["No of Issue Logged in"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues resolved"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues Pending"] + '</td>';
                        HtmlData += '</tr>';
                        LoggedinIssues += parseInt(Result[i]["No of Issue Logged in"]);
                        ResolvedIssues += parseInt(Result[i]["Issues resolved"]);
                        PendingIssues += parseInt(Result[i]["Issues Pending"]);
                        //$('#PartnerIssueSummarytbl').dataTable().fnAddData([Result[i]["STATE"], Result[i]["No of Issue Logged in"], Result[i]["Issues resolved"], Result[i]["Issues Pending"]]);                       
                    }
                }

                HtmlData += '<tr style="background-color:#ECF0F5">';
                HtmlData += '<td>' + Result[Result.length - 1]["ZONE_NAME"] + '</td>';
                HtmlData += '<td>' + LoggedinIssues + '</td>';
                HtmlData += '<td>' + ResolvedIssues + '</td>';
                HtmlData += '<td>' + PendingIssues + '</td>';
                HtmlData += '</tr>';

                $('#PartnerIssueSummarytbl').append(HtmlData);
                //$('#PartnerIssueSummarytbl').dataTable({
                //    "ordering": false,
                //    bPaginate: false
                //});
            }
            else {
                $("#PartnerIssueSummarytbl").dataTable().fnClearTable();
            }
            HideLoader();
        })
    })

    angular.element(document).on('changeDate', '#ToDate', function () {
        var StartDate = $scope.StartDate;
        var EndDate = $scope.EndDate;
        $("#ToDate").datepicker({
            format: 'dd/mm/yyyy',
            startDate: StartDate
        });


        if (StartDate == undefined || StartDate == "") { StartDate = "From Date" }

        if (EndDate == undefined || EndDate == "") { EndDate = "To Date" }

        var Dates = JSON.stringify({ "FromDate": StartDate, "ToDate": EndDate })

        DIMSSFDCFactory.GetfilterdataForPartnerIssueSummary(Dates).success(function (Result) {
            ShowLoader();
            $('#PartnerIssueSummarytbl tbody').empty();
            if (Result != "") {
                var LoggedinIssues = ResolvedIssues = PendingIssues = 0;
                var HtmlData = '';

                //if (Result[0]["ZONE_NAME"] != "" && Result[0]["ZONE_NAME"] != null && Result[0]["ZONE_NAME"] != "null") {
                HtmlData += '<tr>';
                HtmlData += '<td>' + Result[0]["STATE"] + '</td>';
                HtmlData += '<td>' + Result[0]["No of Issue Logged in"] + '</td>';
                HtmlData += '<td>' + Result[0]["Issues resolved"] + '</td>';
                HtmlData += '<td>' + Result[0]["Issues Pending"] + '</td>';
                HtmlData += '</tr>';
                //}
                var FirstRecord = 0;

                for (var i = 1; i < Result.length; i++) {
                    if (Result[i]["ZONE_NAME"] == Result[i - 1]["ZONE_NAME"] || FirstRecord == 0) {
                        HtmlData += '<tr>';
                        HtmlData += '<td>' + Result[i]["STATE"] + '</td>';
                        HtmlData += '<td>' + Result[i]["No of Issue Logged in"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues resolved"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues Pending"] + '</td>';
                        HtmlData += '</tr>';
                        LoggedinIssues += parseInt(Result[i]["No of Issue Logged in"]);
                        ResolvedIssues += parseInt(Result[i]["Issues resolved"]);
                        PendingIssues += parseInt(Result[i]["Issues Pending"]);
                        FirstRecord = 1;
                    }
                    else {
                        HtmlData += '<tr style="background-color: #ECF0F5">';
                        HtmlData += '<td>' + Result[i - 1]["ZONE_NAME"] + '</td>';
                        HtmlData += '<td>' + LoggedinIssues + '</td>';
                        HtmlData += '<td>' + ResolvedIssues + '</td>';
                        HtmlData += '<td>' + PendingIssues + '</td>';
                        HtmlData += '</tr>';
                        LoggedinIssues = ResolvedIssues = PendingIssues = 0;
                        FirstRecord = 0;

                        HtmlData += '<tr>';
                        HtmlData += '<td>' + Result[i]["STATE"] + '</td>';
                        HtmlData += '<td>' + Result[i]["No of Issue Logged in"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues resolved"] + '</td>';
                        HtmlData += '<td>' + Result[i]["Issues Pending"] + '</td>';
                        HtmlData += '</tr>';
                        LoggedinIssues += parseInt(Result[i]["No of Issue Logged in"]);
                        ResolvedIssues += parseInt(Result[i]["Issues resolved"]);
                        PendingIssues += parseInt(Result[i]["Issues Pending"]);
                        //$('#PartnerIssueSummarytbl').dataTable().fnAddData([Result[i]["STATE"], Result[i]["No of Issue Logged in"], Result[i]["Issues resolved"], Result[i]["Issues Pending"]]);                       
                    }
                }

                HtmlData += '<tr style="background-color:#ECF0F5">';
                HtmlData += '<td>' + Result[Result.length - 1]["ZONE_NAME"] + '</td>';
                HtmlData += '<td>' + LoggedinIssues + '</td>';
                HtmlData += '<td>' + ResolvedIssues + '</td>';
                HtmlData += '<td>' + PendingIssues + '</td>';
                HtmlData += '</tr>';

                $('#PartnerIssueSummarytbl').append(HtmlData);
                //$('#PartnerIssueSummarytbl').dataTable({
                //    "ordering": false,
                //    bPaginate: false
                //});
            }
            else {
                $("#PartnerIssueSummarytbl").dataTable().fnClearTable();
            }
            HideLoader();
        })
    })

    $scope.Reset = function () {

        $scope.go('PartnerIssueSummary/');
    }

    angular.element(document).on('click', '#PartnerIssueSummarytbl tbody tr', function () {
        var state = $("#PartnerIssueSummarytbl").DataTable().row(this).data()[0];
        DIMSSFDCFactory.GetPartnerIssueSummaryList(state).success(function (Result) {
            ShowLoader();
            if (Result != '') {
                $("#PartnerIssueSummaryListtbl").dataTable().fnClearTable();
                for (var i = 0; i < Result.length; i++) {

                    $('#PartnerIssueSummaryListtbl').dataTable().fnAddData([Result[i]["State"], Result[i]["Issue Description"], Result[i]["Issue Status"]]);
                }
            }
            else {
                $("#PartnerIssueSummaryListtbl").dataTable().fnClearTable();
            }
            HideLoader();
            $("#PartnerIssueSummaryList").modal('show');

        })
    });
});

function HolidayList(DIMSSFDCFactory, dummy) {

    var SelectedYear = $("#YearFilter").val();

    if (SelectedYear == "") {
        var HolidayList = JSON.stringify({
            ListType: "GetHolidayListDetails",
            ID: "2", SelectedYear: "Select"
        });
    }
    else {

        var HolidayList = JSON.stringify({
            ListType: "GetHolidayListDetails",
            ID: "2", SelectedYear: SelectedYear
        });
    }


    if (dummy == 0) {
        $("#HolidayConfigListTable tbody").empty();
        $("#HolidayConfigListTable").DataTable();
    } else {
        $('#HolidayConfigListTable').dataTable().fnClearTable();
    }
    DIMSSFDCFactory.GetAllPagesList(HolidayList).success(function (response) {
        //HolidayYearBind();
        var Result = JSON.parse(response.tabledata);

        for (var i = 0; i < Result.length; i++) {
            var Status = Result[i]["Status"];
            if (Status == "Y") {
                Status = "Active";
            } else {
                Status = "Inactive"
            }

            if (SessionValue == "ADMIN" || SessionValue == "ZSC") {

                $('#HolidayConfigListTable').dataTable().fnAddData(["<span class='id'>" + Result[i]["ID"] + "</span>", "<span class='rowid' data-tblid='" + Result[i]["ID"] + "'>" + parseInt(i + 1) + "</span>", "<a id='" + Result[i]["Occasion/Description"] + "' onclick='ViewDetails($(this),this.id);return false' Class='Occassion'>" + Result[i]["Occasion/Description"] + "</a>", "<span class='Date'>" + Result[i]["Date"] + "</span>", "<span class='Day'>" + Result[i]["Day"] + "</span>", "<a id='" + Result[i]["ID"] + "' class='ViewClass' onclick='EditState(this.id);'>View</a>", "<span class='status'>" + Status + "</span>", Result[i]["Occasion Year"]]);
            }
            else {

                $('#HolidayConfigListTable').dataTable().fnAddData([Result[i]["ID"], parseInt(i + 1), Result[i]["Occasion/Description"], Result[i]["Date"], Result[i]["Day"], "<a id='" + Result[i]["ID"] + "' class='ViewClass' onclick='EditState(this.id);'>View</a>", Status, Result[i]["Occasion Year"]]);
            }
        }
        $("#HolidayConfigListTable").DataTable().column(0).visible(false);
        $("#HolidayConfigListTable").DataTable().column(7).visible(false);
        $("#HolidayConfigListTable").DataTable().columns.adjust().draw(false);
    });
    $("#HolidayFormModel").modal('hide');
}
function HolidayYearBind() {

    $("#YearFilter").append(function () {
        $.ajax({
            type: 'get',
            async: 'false',
            datatype: 'JSON',
            url: '../../SFDC/GetHolidayYears',
            success: function (data) {
                var year = JSON.parse(data);
                $("#YearFilter").empty();
                $("#YearFilter").append($("<option></option>").val("").html("--select--"));
                for (var j = 0; j < year.length; j++) {
                    $("#YearFilter").append($("<option></option>").val(year[j]["Occasion Year"]).html(year[j]["Occasion Year"]));
                }
            }
        })
    });
}
function EditState(id) {
    $("#HolidayFormModel").modal('hide');
    HolidayFact.GetStatesListbasedonId(id).success(function (response) {

        $("#HolidayFormModel").modal('hide');
        $('#StateModel').modal('show');

        var Result = JSON.parse(response.tabledata);

        $("#StatesList").DataTable();
        $('#StatesList').dataTable().fnClearTable();
        for (var i = 0; i < Result.length; i++) {
            $('#StatesList').dataTable().fnAddData([parseInt(i + 1), Result[i]["STATE_NAME"]]);
        }
    });
}
function ViewDetails(obj, pid) {

    var id = obj.parent().parent().find('.rowid').attr('data-tblid');
    var occasion = obj.parent().parent().find('.occasion').html();
    var Date = obj.parent().parent().find('.Date').html();
    var Day = obj.parent().parent().find('.Day').html();
    var status = obj.parent().parent().find('.status').html();

    $("#HolidayFormModel").modal('show');
    $("#HolidayFormModel").draggable();
    $('#HolidayID').val(id);
    $('#OccasionDescription').val(pid);
    $('#OccasionDate').val(Date);
    $('#OccasionDay').val(Day);
    HolidayFact.GetStatesListbasedonId(id).success(function (response) {

        var Result = JSON.parse(response.tabledata);
        $('#ApplicableStates')[0].sumo.unSelectAll();
        var res;
        for (var i = 0; i < Result.length; i++) {
            $('#ApplicableStates option').each(function () {

                if ($(this).text() == Result[i]["STATE_NAME"]) {
                    res = $(this).index();
                    $('#ApplicableStates')[0].sumo.selectItem(res);
                }
            });
        }
    });
    $("#OccasionStatus option:contains(" + status + ")").attr('selected', 'selected');
}

//          MANI

//Markrt Map Others --- By Karthik
angular.element(document).on('click', '#OthersTabA', function () {



})

angular.element(document).on('click', '#MarketMapCompetitorCustomersHILProspects tbody tr', function () {
    var strin = "DIMS";
    //var customerID = $("#MarketMapCompetitorCustomersHILProspects").DataTable().row(this).data()[6];
    var customerID = $(this).find('td:eq(6)').text();
    //var table = $("#MarketMapCompetitorCustomersHILProspects").DataTable();
    //var column = table.row(this).data()[6];
    //alert(customerID);
    var ID = "DIMS" + "$" + customerID;
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
    }
    else {
        $("#MarketMapCompetitorCustomersHILProspects").DataTable().$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
    }
    if (ID != "") {
        var scope = angular.element($("#EditMarketMapDiv")).scope();
        scope.$apply(function () {
            scope.go("AddMarketMap/" + ID);
        })
    }
});


//Hanumanth







DIMS.controller('KSMReportControl', function ($scope, $location, DIMSFactory) {

    var Html = "";
    $scope.templatesettings = { HeaderTitle: "KSMReport" };
    $scope.go = function (path) {
        $location.path(path);
    };
    $("#KSMReport_Table").dataTable({
    });
    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------

});

DIMS.controller('KSMReportDetailControl', function ($scope, $location, DIMSFactory) {

    var Html = "";
    $scope.templatesettings = { HeaderTitle: "KSMReportDetail" };
    $scope.go = function (path) {
        $location.path(path);
    };
    $("#KSMReportDownload").dataTable({
    });
    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    if (height <= 800) {
        totalheight = height - 148;
    }
    jQuery('.dataTable').wrap('<div class="dataTables_scroll" />');
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });
    $('.content-header > h2').css({ "font-size": "18px", "font-weight": "500" });//----------
});




//angular.element(document).on('click', '#CreateTargetList tbody tr', function () {

//    var customerID = $(this).find('td:eq(0)').text();
//    var ID = customerID;
//    if ($(this).hasClass('selected')) {
//        $(this).removeClass('selected');
//    }
//    else {
//        $("#MarketMap").DataTable().$('tr.selected').removeClass('selected');
//        $(this).addClass('selected');
//    }


//    if (ID != "") {
//        alert(ID);
//        //var scope = angular.element($("#CreateTargetListID")).scope();
//        //scope.$apply(function () {
//        //    scope.go("CreateTargetFC/" + ID);
//        //})
//    }

//});

//end  Hanumanth







var ScoreCardListScope;

DIMS.controller('ScoreCards', function ($scope, $location, DIMSFactory) {
    ScoreCardListScope = $scope;
    $scope.templatesettings = { HeaderTitle: "Score Cards" };
    $scope.go = function (path) {
        $location.path(path);
    };
    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });

    angular.element(document).ready(function () {

        ScoreCardListScope = $scope;


        CheckUserSession();

        try {

            var UserCode = $("#UserCode").val();
            var UserType = $("#UserType").val();

            if (UserCode == "" || UserType == "") {
                return;
            }
            else {

            }

            var WhereClause = "";

            if (UserType == "FSO" || UserType == "FSO_BU2" || UserType == "TM" || UserType == "SH" || UserType == "ZH") {
                $("#GetMyScoreCard").css("display", "block");
            }

            if (UserType == "") {
                return;
            }
            else if (UserType == "FSO" || UserType == "FSO_BU2") {
                //GoToScoreCard(UserCode);
            }
            else {

                var UserData = JSON.stringify({
                    UserCode: UserCode,
                    UserRole: ""
                });

                $.ajax({
                    url: '../../SFDC/GetScoreCardList',
                    type: 'GET',
                    data: { UserData: UserData },
                    success: function (RES) {

                        if (RES == "") {
                            alert("No Data Found");
                        }
                        else {
                            RES = JSON.parse(RES);

                            var HtmlString = "<thead><tr><td>Employee Code</td><td>Employee Name</td><td>Role</td><td>State</td><td>Zone</td><td>Score</td></tr></thead><tbody>";

                            var RolesList = new Array();

                            for (var i = 0; i < RES.length; i++) {

                                HtmlString = HtmlString + "<tr onclick='GoToScoreCard(" + RES[i]["EMPLOYEE_CODE"] + ")'>";
                                //HtmlString = HtmlString + "<tr ng-click='GoToScoreCard(" + RES[i]["EMPLOYEE_CODE"] + ")'>";

                                HtmlString = HtmlString + "<td>" + RES[i]["EMPLOYEE_CODE"] + "</td>";
                                HtmlString = HtmlString + "<td>" + RES[i]["EMPLOYEE_NAME"] + "</td>";
                                HtmlString = HtmlString + "<td>" + RES[i]["USER_ROLE"] + "</td>";
                                HtmlString = HtmlString + "<td>" + RES[i]["USER_STATE"] + "</td>";
                                HtmlString = HtmlString + "<td>" + RES[i]["USER_ZONE"] + "</td>";
                                HtmlString = HtmlString + "<td>" + RES[i]["SCORE"] + "</td>";

                                HtmlString = HtmlString + "</tr>";

                                //alert(RolesList.indexOf(RES[i]["USER_ROLE"]) + "\t" + (RolesList.indexOf(RES[i]["USER_ROLE"]) > -1));

                                if (RolesList.indexOf(RES[i]["USER_ROLE"]) > -1) {
                                }
                                else {
                                    RolesList.push(RES[i]["USER_ROLE"]);
                                }



                            }

                            HtmlString = HtmlString + "</tbody>";

                            $("#SC_RoleFilter").empty();

                            var option = $('<option></option>').attr("value", "").text("select");
                            $("#SC_RoleFilter").append(option);


                            for (var i = 0; i < RolesList.length; i++) {
                                var option = $('<option></option>').attr("value", RolesList[i]).text(RolesList[i]);
                                $("#SC_RoleFilter").append(option);
                            }


                            $("#ScorecardsTable").append(HtmlString);
                            $("#ScorecardsTable").dataTable({
                                scrollY: "200px",
                                scrollX: true,
                                scrollCollapse: true,
                                paging: true,
                                destroy: true,
                                fixedColumns: {
                                    leftColumns: 0
                                }
                            });



                        }

                    }
                });
            }

        }
        catch (e) {
            alert("Error : DocReady : " + e);
        }
    });

});


function GoToScoreCard(EmpCode) {
    try {
        var scope = angular.element($("#ScorecardsTableScope")).scope();

        ScoreCardListScope.$apply(function () {
            ScoreCardListScope.go("ScoreCardsDetails/" + EmpCode);
        });

        //scope.$apply(function () {
        //    scope.go("ScoreCardsDetails/" + EmpCode);
        //});
    }
    catch (e) {
        alert("Error : GoToScoreCard : " + e);
    }
}


DIMS.controller('ScoreCardsDetails', function ($scope, $location, $http, DIMSFactory, $routeParams) {
    $scope.templatesettings = { HeaderTitle: "Score Card Details" };
    $scope.go = function (path) {
        $location.path(path);
    };
    var width = $(window).width(), height = $(window).height();
    var totalheight = height - 191;
    $('.content').css({ "max-height": totalheight, "overflow-y": "auto" });

    angular.element(document).ready(function () {


        CheckUserSession();

        try {


            if ($routeParams.ID == undefined || $routeParams.ID == "") {
            }
            else {
                $("#SCD_CurrentDate").val(TodayDateTime);

                var UserType = $("#LoggedUserTypeCode").val();

                $("#SCD_Employee_Code").val($routeParams.ID);
                //$("#SCD_Employee_Name").val($("#LoggedUserName").val());
                $("#SCD_MonthYearFilter").datepicker('setDate', $("#SomeId").val());
                //$("#SCD_MonthYearFilter").val("December-2016");

                GetTheScoreCardDetails();

            }

        }
        catch (e) {
            alert(e);
        }
    });


});

DIMS.controller('KeyStockistUploadControl', function ($scope, $location, $http, DIMSFactory, $routeParams) { });
