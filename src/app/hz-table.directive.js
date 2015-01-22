(function() {
  'use strict';

  angular
    .module('hz.widgets.table')
    .directive('hzTable', hzTable);

  function hzTable() {

    var defObj = {
      restrict: 'A',
      controller: hzTableController
    };

    return defObj;

    function hzTableController($scope) {
      $scope.selected = {};
      $scope.numSelected = 0;

      $scope.toggle = function(row) {
        var checkedState = $scope.selected[row.id].checked;

        if (checkedState) {
          $scope.numSelected += 1;
        } else {
          $scope.numSelected -= 1;
        }
      }

      this.select = function(row, checkedState) {
        var oldCheckedState = $scope.selected.hasOwnProperty(row.id) ? $scope.selected[row.id].checked : false;

        $scope.selected[row.id] = {
          checked: checkedState,
          item: row
        };

        if (checkedState && !oldCheckedState) {
          $scope.numSelected += 1;
        } else if (!checkedState && oldCheckedState) {
          $scope.numSelected -= 1;
        }
      }

      this.setValue = function(row, key, value) {
        // set new value on $scope?
      }

      this.setOrder = function() {
        // set new ordering
      }
    }
  }

})();