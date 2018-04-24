var BigNumber = require('bignumber.js');
angular.module('ethExplorer')
    .controller('blocksInfosCtrl', function ($rootScope, $scope, $location,$routeParams,$q) {
       
        $scope.init=function()
        {
            $scope.pageId=$routeParams.pageId;
            if($scope.pageId!==undefined ) {
                if (parseInt($scope.pageId)<0){
                    $scope.pageId=0;
                }
                updateBlockList();
            }
        }
        
        $scope.init();

        web3.eth.filter("latest", function(error, result){
            if (!error) {
                updateBlockList();
              $scope.$apply();
            }
          });

          $scope.processRequest= function(){
            var requestStr = $scope.ethRequest;


            if (requestStr!==undefined){
                var regexpBlock = /[0-9]{1,7}?/;;
                result = regexpBlock.test(requestStr);
                if (result===true){
                    goToBlockInfos(requestStr)
                }
            }
            else{
                return null;
            }
        };

        function goToBlockInfos(requestStr){
            $location.path('/block/'+requestStr);
        }

       function updateBlockList() {
        var currentBlockNumber = web3.eth.blockNumber;
        $scope.blockNumber = currentBlockNumber;
        $scope.blocks = [];
        var currentpage=$scope.pageId;
        for (var i=0; i < 30 && currentBlockNumber-(currentpage*30) - i >= 0; i++) {
            $scope.blocks.push(web3.eth.getBlock(currentBlockNumber-(currentpage*30) - i));
            }
            $scope.pageIdminus=parseInt($scope.pageId)>0?parseInt($scope.pageId)-1:parseInt($scope.pageId);
            $scope.totalpages=parseInt(currentBlockNumber/30);
            $scope.pageIdplus=parseInt($scope.pageId)<$scope.totalpages?parseInt($scope.pageId)+1:parseInt($scope.pageId);
        }
    });

    angular.module('filters', []).
    filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            } else {
                return String(text).substring(0, length-end.length) + end;
            }
        };
        }).
    filter('diffFormat', function () {
        return function (diffi) {
        if (isNaN(diffi)) return diffi;
        var n = diffi / 1000000000000;
        return n.toFixed(3) + " T";
        };
    }).
    filter('stylize', function () {
        return function (style) {
        if (isNaN(style)) return style;
        var si = '<span class="btn btn-primary">' + style + '</span>';
        return si;
        };
    }).
    filter('stylize2', function () {
        return function (text) {
        if (isNaN(text)) return text;
        var si = '<i class="fa fa-exchange"></i> ' + text;
        return si;
        };
    }).
    filter('hashFormat', function () {
        return function (hashr) {
        if (isNaN(hashr)) return hashr;
        var n = hashr / 1000000000000;
        return n.toFixed(3) + " TH/s";
        };
    }).
    filter('gasFormat', function () {
        return function (txt) {
        if (isNaN(txt)) return txt;
        var b = new BigNumber(txt);
        return b.toFormat(0) + " m/s";
        };
    }).
    filter('BigNum', function () {
        return function (txt) {
        if (isNaN(txt)) return txt;
        var b = new BigNumber(txt);
        var w = web3.fromWei(b, "ether");
        return w.toFixed(6) + " ETH";
        };
    }).
    filter('sizeFormat', function () {
        return function (size) {
        if (isNaN(size)) return size;
        var s = size / 1000;
        return s.toFixed(3) + " kB";
        };
    });
      