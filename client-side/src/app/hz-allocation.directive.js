(function() {
  'use strict';

  angular
    .module('hz.widgets.table')
    .directive('hzAllocation', hzAllocation);

  function hzAllocation() {
    var defObj = {
      restrict: 'E',
      templateUrl: 'partials/allocation-tables-single.html',
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

      $scope.displayedAllocated = [].concat($scope.allocated);

      $scope.instances = {
        title: 'Total Instances',
        data: [
          { label: 'Current', slice: 1 },
          { label: 'Applied', slice: 1 },
          { label: 'Available', slice: 6, showKey: false }
        ],
        colors: [ '#1f83c6', '#81c1e7', '#d1d3d4' ],
        text: '20%'
      };

      $scope.vcpus = {
        title: 'Total VCPUs',
        data: [
          { label: 'Current', slice: 1 },
          { label: 'Applied', slice: 1 },
          { label: 'Available', slice: 6, showKey: false }
        ],
        colors: [ '#1f83c6', '#81c1e7', '#d1d3d4' ],
        text: '30%'
      };

      $scope.ram = {
        title: 'Total RAM',
        data: [
          { label: 'Current', slice: 2048 },
          { label: 'Applied', slice: 1024 },
          { label: 'Available', slice: 10240, showKey: false }
        ],
        colors: [ '#1f83c6', '#81c1e7', '#d1d3d4' ],
        text: '50%'
      };

      this.setMaxAllocation = function(maxAllocation) {
        $scope.maxAllocation = maxAllocation;
      }

      this.allocate = function(rowIndex) {
        var row = $scope.available[rowIndex];
        var newRow = angular.copy(row);
        if ($scope.maxAllocation < 0 || $scope.numAllocated < $scope.maxAllocation) {
          newRow.aIdx = $scope.numAllocated;
          $scope.allocated.push(newRow);
          $scope.numAllocated += 1;

          row.allocated = true;
        } else if ($scope.maxAllocation === 1) {
          var oldRowIdx = $scope.allocated[0].idx;
          $scope.available[oldRowIdx].allocated = false;

          newRow.aIdx = 0;
          $scope.allocated[0] = newRow;

          row.allocated = true;
        } else {
          alert('Maximum allocations reached. Please de-allocate an item.');
        }
      }

      this.deallocate = function(rowIndex) {
        var oldRow = $scope.allocated.splice(rowIndex, 1)[0];
        $scope.available[oldRow.idx].allocated = false;
        $scope.numAllocated -= 1;

        // update indices
        for (var idx = rowIndex; idx < $scope.numAllocated; idx++) {
          $scope.allocated[idx].aIdx -= 1;
        }
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