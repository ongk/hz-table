(function() {
  'use strict';

  angular
    .module('hz.widgets.table')
    .directive('hzAllocation', hzAllocation);

  function hzAllocation() {
    var defObj = {
      restrict: 'E',
      templateUrl: 'partials/allocation-tables.html',
      scope: {
        headers: '=',
        allocated: '=',
        available: '='
      },
      controller: hzAllocController,
      link: link
    };

    return defObj;

    function hzAllocController($scope) {
      $scope.maxAllocation = 1;
      $scope.numAllocated = 0;

      this.setMaxAllocation = function(maxAllocation) {
        $scope.maxAllocation = maxAllocation;
      }

      this.allocate = function(rowIndex) {
        if ($scope.numAllocated < $scope.maxAllocation) {
          $scope.allocated.push($scope.available.splice(rowIndex, 1)[0]);
          $scope.numAllocated += 1;
        } else if ($scope.maxAllocation === 1) {
          // swap
          var oldAllocatedRow = $scope.allocated.pop();
          $scope.allocated.push($scope.available.splice(rowIndex, 1)[0]);
          $scope.available.push(oldAllocatedRow);
        } else {
          alert('Maximum allocations reached. Please de-allocate an item.');
        }
      }

      this.deallocate = function(rowIndex) {
        var allocateRow = $scope.allocated.splice(rowIndex, 1);
        $scope.available.push(allocateRow[0]);
        $scope.numAllocated -= 1;
      }
    }

    function link(scope, element, attrs, hzAllocCtrl) {
      if (attrs.hasOwnProperty('maxAllocation')) {
        var maxAllocation = parseInt(attrs.maxAllocation);
        if (typeof maxAllocation === 'number') {
          hzAllocCtrl.setMaxAllocation(maxAllocation);
        }
      }

      scope.allocate = function(rowIndex) {
        hzAllocCtrl.allocate(rowIndex);
      }

      scope.deallocate = function(rowIndex) {
        hzAllocCtrl.deallocate(rowIndex);
      }
    }
  }

})();