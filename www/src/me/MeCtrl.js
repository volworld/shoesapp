export default function($scope, $state, Item, Brand, Order, User) {

  $scope.ready = () => {
    return $scope.likedProducts &&  $scope.likedBrands &&  $scope.orders;
  };

  Item.getLiked().then((data) => {
    $scope.likedProducts = data;
    $scope.$digest();
    console.log('ITEMS', data)
  });

  Brand.getLiked().then((data) => {
    $scope.likedBrands = data;
    $scope.$digest();
    console.log('BRAND', data)
  });

  Order.get().then((data) => {
    $scope.orders = data || [];
    $scope.orderLength = Object.keys( $scope.orders ).length;
    $scope.$digest();
    console.log('ORDRS',  $scope.orders)

  });

  User.getUserInfo().then((data) => {
    $scope.user = data;
  });


  $scope.toOrders = () => {
      $state.go("tab.me-orders");
  };

  $scope.toBrands = () => {
      $state.go("tab.me-brands");
  };

  $scope.toSettings = () => {
      $state.go("tab.me-settings");
  };

}
