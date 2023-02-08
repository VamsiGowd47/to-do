$(document).ready(function () {

  var todoList = [];

  function renderList() {
    $("#list").empty();
    for (var i = 0; i < todoList.length; i++) {
      var val = todoList[i];
      $("#list").append(
        "<li class='item'>" +
        "<span class='bullet'>&#9679;</span>" +
        "<span class='text'>" + val.substr(0, 1).toUpperCase() + val.substr(1) + "</span>" +
        "<button class='edit'>Edit</button>" +
        "<button class='delete'>Delete</button>" +
        "</li>"
      );
    }
  }

  $("form").submit(function (e) {
    e.preventDefault();
    var item = $("#todo-input").val().substr(0, 1).toUpperCase() + $("#todo-input").val().substr(1);
    if (item) {
      todoList.push(item);
      $("#todo-input").val("");
      renderList();
    }
  });

  $("#list").on("click", ".edit", function () {
    var parent = $(this).parent();
    $("#edit-input").val(parent.find(".text").text());
    $("#edit-id").val(parent.index());
    $("#edit-container").show();
  });

  $("#edit-container").submit(function (e) {
    e.preventDefault();
    var editValue = $("#edit-input").val();
    var editIndex = $("#edit-id").val();
    if (editValue) {
      var todoItem = $("#list").find("li").eq(editIndex);
      todoItem.find(".text").text(editValue);
      $("#edit-container").hide();
      todoList[id] = item;
      $("#todo-input").val("");
      $("#edit-id").val("");
      renderList();
    }
  });

  $("#list").on("click", ".delete", function () {
    var parent = $(this).parent();
    var deldata = parent.find(".text").text();
    for (var i = 0; i < todoList.length; i++) {
      if (todoList[i] == deldata) {
        todoList.splice(parent.index(), 1);
        localStorage.setItem("todoList", JSON.stringify(todoList));
      }
    }
    renderList();
  });

  $("#save-button").click(function () {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  });

  $("#load-button").click(function () {
    var savedList = JSON.parse(localStorage.getItem("todoList"));
    if (savedList) {
      todoList = savedList;
      renderList();
    }
  });
  renderList();
});
