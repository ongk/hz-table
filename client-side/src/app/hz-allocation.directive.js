(function() {
  'use strict';

  angular
    .module('hz.widgets.table')
    .directive('hzAllocation', hzAllocation);

  function hzAllocation() {
    var defObj = {
      restrict: 'E',
      templateUrl: function(elem, attrs) {
        return 'partials/' + attrs.version + '.html';
      },
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
      $scope.views = {
        allocated: true,
        available: true
      };
      $scope.showAvailable = true;

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

      $scope.allocate = function(row) {
        if ($scope.maxAllocation < 0 || $scope.numAllocated < $scope.maxAllocation) {
          row.allocIdx = $scope.numAllocated;
          row.allocated = true;
          $scope.allocated.push(row);

          $scope.numAllocated += 1;
        } else if ($scope.maxAllocation === 1) {
          $scope.allocated[0].allocated = false;

          row.allocIdx = $scope.numAllocated;
          row.allocated = true;
          $scope.allocated[0] = row;
        } else {
          alert('Maximum allocations reached. Please de-allocate an item.');
        }
      }

      $scope.deallocate = function(row) {
        var rowIndex = row.allocIdx;
        var oldRow = $scope.allocated.splice(rowIndex, 1)[0];
        oldRow.allocated = false;

        $scope.numAllocated -= 1;

        for (var i = rowIndex; i < $scope.numAllocated; i++) {
          $scope.allocated[i].allocIdx -= 1;
        }
      }

      $scope.toggleView = function(view) {
        var show = $scope.views[view];
        $scope.views[view] = !show;
      }

      $scope.updateIndexes = function(e, item) {
        var itemOldIdx = item.allocIdx;
        var curIdx = $scope.allocated[itemOldIdx].allocIdx;
        var startIdx = itemOldIdx;
        var direction = curIdx < itemOldIdx ? -1 : 1;
        while (startIdx !== $scope.allocated[startIdx].allocIdx) {
          $scope.allocated[startIdx].allocIdx = startIdx;
          startIdx += direction;
          if (startIdx < 0 || startIdx === $scope.numAllocated) {
            break;
          }
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
    }
  }

})();