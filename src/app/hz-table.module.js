(function() {
  'use strict';

  var app = angular.module('hz.widgets.table', [ 'smart-table' ]);

  function MainCtrl($scope) {
    $scope.rowCollection = [
        { id: 'm1.nano', name: 'm1.nano', vcpus: '2', ram: '64 MB', totalDisk: '0 GB', rootDisk: '0 GB', ephemeralDisk: '0 GB', isPublic: 'Yes' },
        { id: 'm1.small', name: 'm1.small', vcpus: '1', ram: '2048 MB', totalDisk: '20 GB', rootDisk: '20 GB', ephemeralDisk: '0 GB', isPublic: 'Yes' },
        { id: 'm1.medium', name: 'm1.medium', vcpus: '1', ram: '4096 MB', totalDisk: '40 GB', rootDisk: '40 GB', ephemeralDisk: '0 GB', isPublic: 'Yes' },
        { id: 'm1.large', name: 'm1.large', vcpus: '2', ram: '64 MB', totalDisk: '0 GB', rootDisk: '0 GB', ephemeralDisk: '0 GB', isPublic: 'Yes' },
        { id: 'm1.xl', name: 'm1.xl', vcpus: '1', ram: '2048 MB', totalDisk: '20 GB', rootDisk: '20 GB', ephemeralDisk: '0 GB', isPublic: 'Yes' },
        { id: 'm1.xxl', name: 'm1.xxl', vcpus: '1', ram: '4096 MB', totalDisk: '40 GB', rootDisk: '40 GB', ephemeralDisk: '0 GB', isPublic: 'Yes' }
    ];

    $scope.addRow = function() {
      var large = { id: 'm1.enormous', name: 'm1.enormous', vcpus: '1', ram: '4096 MB', totalDisk: '40 GB', rootDisk: '40 GB', ephemeralDisk: '0 GB', isPublic: 'Yes' };
      $scope.rowCollection.push(large);
    }
  };

  app.controller('MainCtrl', [ '$scope', MainCtrl ]);

})();