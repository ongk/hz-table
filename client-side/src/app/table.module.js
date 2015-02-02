(function() {
  'use strict';

  var app = angular.module('hz.widgets.table', [ 'smart-table', 'lrDragNDrop', 'hz.widgets.charts' ]);

  function MainCtrl($scope) {
    $scope.rowHeaders = [
      { label: 'Name', key: 'name', priority: 1, size: 'tcol-lg' },
      { label: 'VCPUs', key: 'vcpus', priority: 2, size: 'tcol-sm' },
      { label: 'RAM (MB)', key: 'ram', priority: 2, size: 'tcol-med' },
      { label: 'Total Disk (GB)', key: 'totalDisk', priority: 2, size: 'tcol-med' },
      { label: 'Root Disk (GB)', key: 'rootDisk', priority: 3, size: 'tcol-med' },
      { label: 'Ephemeral Disk (GB)', key: 'ephemeralDisk', priority: 3, size: 'tcol-med' },
      { label: 'Public', key: 'isPublic', priority: 4, size: '' }
    ];

    $scope.rowCollection = [
        { idx: 0, id: 'm1.nano', name: 'm1.nano', vcpus: 2, ram: 64, totalDisk: 0, rootDisk: 0, ephemeralDisk: 0, isPublic: 'Yes' },
        { idx: 1, id: 'm1.small', name: 'm1.small', vcpus: 1, ram: 2048, totalDisk: 20, rootDisk: 20, ephemeralDisk: 0, isPublic: 'Yes' },
        { idx: 2, id: 'm1.medium', name: 'm1.medium', vcpus: 1, ram: 4096, totalDisk: 40, rootDisk: 40, ephemeralDisk: 0, isPublic: 'Yes' },
        { idx: 3, id: 'm1.large', name: 'm1.large', vcpus: 2, ram: 64, totalDisk: 0, rootDisk: 0, ephemeralDisk: 0, isPublic: 'Yes' },
        { idx: 4, id: 'm1.xl', name: 'm1.xl', vcpus: 1, ram: 2048, totalDisk: 20, rootDisk: 20, ephemeralDisk: 0, isPublic: 'Yes' },
        { idx: 5, id: 'm1.xxl', name: 'm1.xxl', vcpus: 1, ram: 4096, totalDisk: 40, rootDisk: 40, ephemeralDisk: 0, isPublic: 'Yes' },
        { idx: 6, id: 'm2.nano', name: 'm2.nano', vcpus: 2, ram: 64, totalDisk: 0, rootDisk: 0, ephemeralDisk: 0, isPublic: 'Yes' },
        { idx: 7, id: 'm2.small', name: 'm2.small', vcpus: 1, ram: 2048, totalDisk: 20, rootDisk: 20, ephemeralDisk: 0, isPublic: 'Yes' },
        { idx: 8, id: 'm2.medium', name: 'm2.medium', vcpus: 1, ram: 4096, totalDisk: 40, rootDisk: 40, ephemeralDisk: 0, isPublic: 'Yes' },
        { idx: 9, id: 'm2.large', name: 'm2.large', vcpus: 2, ram: 64, totalDisk: 0, rootDisk: 0, ephemeralDisk: 0, isPublic: 'Yes' },
        { idx: 10, id: 'm2.xl', name: 'm2.xl', vcpus: 1, ram: 2048, totalDisk: 20, rootDisk: 20, ephemeralDisk: 0, isPublic: 'Yes' },
        { idx: 11, id: 'm2.xxl', name: 'm2.xxl', vcpus: 1, ram: 4096, totalDisk: 40, rootDisk: 40, ephemeralDisk: 0, isPublic: 'Yes' }
    ];

    $scope.displayedCollection = [];

    $scope.addRow = function() {
      var randomId = Math.round(Math.random() * 100000);
      var name = 'm1.' + randomId;
      var large = { id: randomId, name: name, vcpus: '1', ram: '4096 MB', totalDisk: '40 GB', rootDisk: '40 GB', ephemeralDisk: '0 GB', isPublic: 'Yes' };
      $scope.rowCollection.push(large);
    }
  };

  app.controller('MainCtrl', [ '$scope', MainCtrl ]);

})();