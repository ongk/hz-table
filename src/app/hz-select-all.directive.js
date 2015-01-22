(function() {
  'use strict';

  angular
    .module('hz.widgets.table')
    .directive('hzSelectAll', hzSelectAll);

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

})();