(function() {
  'use strict';

  angular
    .module('hz.widgets.table')
    .directive('hzTable', hzTable)
    .directive('hzSelectAll', hzSelectAll)
    .directive('hzExpandDetail', hzExpandDetail);

  function hzTable() {
    var defObj = {
      restrict: 'A',
      scope: true,
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
    }
  }

  function hzSelectAll() {
    var defObj = {
      restrict: 'A',
      require: '^hzTable',
      scope: { rows: '=hzSelectAll' },
      link: link
    };

    return defObj;

    function link(scope, element, attrs, hzTableCtrl) {
      element.on('click', function() {
        scope.$apply(function() {
          var checkedState = element.prop('checked');
          angular.forEach(scope.rows, function(row) {
            hzTableCtrl.select(row, checkedState);
          });
        });
      });
    }
  }

  function hzExpandDetail() {
    var defObj = {
      restrict: 'A',
      link: link
    };

    return defObj;

    function link(scope, element) {
      element.on('click', function() {
        element
          .toggleClass('fa-chevron-right')
          .toggleClass('fa-chevron-down');

        element.parent()
                  .parent()
                  .toggleClass("expanded");
      });
    }
  }

})();