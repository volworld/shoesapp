import ShowcaseCtrl from './showcase/controller'
import ProductCtrl from './product/controller'
import BrandsCtrl from './brands/controller'
import SearchCtrl from './search/controller'
import MeCtrl from './me/controller'
import LoginCtrl from './login/controller'
import MeSettingsCtrl from './settings/settings'
import MeSettingsPromoCtrl from './settings/promo/promo'

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  var deploy = new Ionic.Deploy();

  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    deploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      console.log('Ionic Deploy: Progress... ', prog);
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
  }
})

// Login page
.controller('LoginCtrl', LoginCtrl)

.controller('ShowcaseCtrl', ShowcaseCtrl)
  // Product in showcase
  .controller('productCtrl', ($scope, $state, $ionicPopover)=> {

    $scope.openProduct = () => {
      $state.go("tab.product")
    }
  })

// Product subtab
.controller('ProductCtrl', ProductCtrl)

// Brands tab
.controller('BrandsCtrl', BrandsCtrl)

// Search tab
.controller('SearchCtrl', SearchCtrl)

.controller('MeCtrl', MeCtrl)

.controller('MeSettingsPromoCtrl', MeSettingsPromoCtrl)

.controller('MeSettingsCtrl', MeSettingsCtrl)

.controller('MeBrandsCtrl', function($scope){

  $scope.brandList = [1,1,1,1,1,1,1,1,1];

})

.controller('ShopCtrl', function($scope, Category) {


  $scope.cats = Category.get();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CategoryContentCtrl', function($scope, $ionicPopover, $state,  Widgets) {


  $ionicPopover.fromTemplateUrl('./src/shop/category-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };


  $scope.toShowcase = () => {
    $scope.popover.hide();
    $state.go("tab.showcase")
  };

    // Call Widget service method to
    // fetch data by current category
  Widgets.fetch('/man').then(data => {$scope.widgets = data})
});
