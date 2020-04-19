var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http) {
  $scope.formData = {};

  // when landing on the page, get all todos and show them
  $http
    .get("/api/todos")
    .success(function (data) {
      $scope.todos = data;
    })
    .error(function (data) {
      console.log("Error: " + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function () {
    $http
      .post("/api/todos", $scope.formData)
      .success(function (data) {
        $("input").val("");
        $scope.todos = data;
        $scope.applySearchFilter($scope.status);
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.updateTodo = function (item) {
    console.log($scope.status);
    $http
      .put("/api/todos/" + item._id, item)
      .success(function (data) {
        $scope.todos = data;
        $scope.applySearchFilter($scope.status);
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function (id) {
    $http
      .delete("/api/todos/" + id)
      .success(function (data) {
        $scope.todos = data;
        $scope.applySearchFilter($scope.status);
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  $scope.applySearchFilter = function (done) {
    console.log($scope.status);
    $scope.status = done;
    angular.forEach($scope.todos, function (todo) {
      if (done === null) todo.excludedByFilter;
      else todo.excludedByFilter = !todo.done === done;
    });
  };
}
