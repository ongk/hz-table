/* jshint globalstrict: true */
(function() {
  'use strict';

  var app = angular.module('hz.widgets.table', [ 'smart-table' ]);

  app.directive('hzTable', function() {
    return {
      restrict: 'A',
      scope: true,
      controller: function($scope) {
        $scope.selected = {};
        $scope.numSelected = 0;

        $scope.updateSelectCount = function(row) {
          if ($scope.selected.hasOwnProperty(row.id)) {
            var checkedState = $scope.selected[row.id].checked;

            if (checkedState) {
              $scope.numSelected += 1;
            } else {
              $scope.numSelected -= 1;
            }
          }
        };

        this.select = function(row, checkedState) {
          var oldCheckedState = $scope.selected.hasOwnProperty(row.id) ?
                                $scope.selected[row.id].checked :
                                false;

          $scope.selected[row.id] = {
            checked: checkedState,
            item: row
          };

          if (checkedState && !oldCheckedState) {
            $scope.numSelected += 1;
          } else if (!checkedState && oldCheckedState) {
            $scope.numSelected -= 1;
          }
        };
      }
    };
  });

  app.directive('hzSelectAll', function() {
    return {
      restrict: 'A',
      require: '^hzTable',
      scope: {
        rows: '=hzSelectAll'
      },
      link: function(scope, element, attrs, hzTableCtrl) {
        element.on('click', function() {
          scope.$apply(function() {
            var checkedState = element.prop('checked');
            angular.forEach(scope.rows, function(row) {
              hzTableCtrl.select(row, checkedState);
            });
          });
        });
      }
    };
  });

  app.directive('hzExpandDetail', function() {
    return {
      restrict: 'A',
      scope: {
        icons: '@hzExpandDetail',
        duration: '@'
      },
      link: function(scope, element) {
        element.on('click', function() {
          var iconClasses = scope.icons || 'fa-chevron-right fa-chevron-down';
          element.toggleClass(iconClasses);

          var summaryRow = element.parent().parent();
          var detailRow = summaryRow.next();
          var detailCell = detailRow[0].querySelector('.detail');
          var duration = scope.duration ? parseInt(scope.duration) : 400;

          if (summaryRow.hasClass('expanded')) {
            var options = {
              duration: duration,
              complete: function() {
                summaryRow.toggleClass('expanded');
              }
            };

            jQuery(detailCell.querySelector('.detail-expanded')).slideUp(options);
          } else {
            summaryRow.toggleClass('expanded');

            if (!detailCell.querySelector('.detail-expanded')) {
              // Slide down animation doesn't work on table cells
              // so a <div> wrapper needs to be added
              jQuery(detailCell).wrapInner('<div class="detail-expanded"></div>');
            }

            jQuery(detailCell.querySelector('.detail-expanded')).slideDown(duration);
          }
        });
      }
    };
  });

})();