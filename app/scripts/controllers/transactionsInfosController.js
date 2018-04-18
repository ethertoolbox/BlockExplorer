var BigNumber = require('bignumber.js');
angular.module('ethExplorer')
    .controller('transactionsInfosCtrl', function ($rootScope, $scope, $location,$routeParams,$q) {
       
        $scope.init=function()
        {
            $scope.transactionId=$routeParams.transactionId;
            if($scope.transactionId!==undefined ) {
                if (parseInt($scope.transactionId)<0){
                    $scope.transactionId=0;
                }
                updateTXList();
            }
        }
        
        $scope.init();

        web3.eth.filter("latest", function(error, result){
            if (!error) {
                updateTXList();
              $scope.$apply();
            }
          });

          $scope.processRequest= function(){
            var requestStr = $scope.ethRequest;


            if (requestStr!==undefined){
                var regexpTx = /[0-9a-zA-Z]{64}?/;
                result = regexpTx.test(requestStr);
                if (result===true){
                    goToTxInfos(requestStr)
                }
            }
            else{
                return null;
            }
        };

        function goToTxInfos (requestStr){
            $location.path('/tx/'+requestStr);
       }

       function updateTXList() {
        $scope.lastblock = web3.eth.blockNumber;
        $scope.recenttransactions = [];
        var blocknumber=$scope.transactionId;
        var count=0;
        for (var i=0; blocknumber - i >= 0; i++) {
          var y = web3.eth.getBlock(blocknumber - i);
          if (y.transactions.length>0){
            for (var t=0;t<y.transactions.length;t++){
              var x = web3.eth.getTransaction(y.transactions[t]);
              if (x!=null) {$scope.recenttransactions.push(x); count++;};
            }
            if (count>0) break;
          }
          if (count>0) break;
          $scope.blocknumber=blocknumber - i-2;
        }
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
      