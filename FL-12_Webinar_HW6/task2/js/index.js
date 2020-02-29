const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");

$.fn.renderItem = function(item) {
  this.append('<li class="item"></li>');

  $('.item:last-child').append(`
  <span class="item-text">${item.text}</span>
  <button class="item-remove">Remove</button>`);

  if(item.done === 'true') {
    $('.item:last-child span').addClass('done');
  }

  $('.item-text').last().click(markDone);
  $('.item-remove').last().click(removeTask);
}

const todos = fillTodos();

function fillTodos() {
  let arr = []
  for(let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    arr.push({text: key, done: localStorage.getItem(key)});
    $list.renderItem(arr[i]);
  }
  return arr
}


$add.click(() => {
  const task = $.trim($input[0].value);
  if(task !== '' && localStorage.getItem($input[0].value) === null){
    todos.push({text: task, done: false});
    localStorage.setItem(task, false);
    $input[0].value = '';
    $list.renderItem(todos[todos.length-1]);
  }else {
    alert('Nothing to add / task is already added');
  }
  return false;
});

function removeTask(event) {
  const target = event.target;
  const task = $(target).prev();

  localStorage.removeItem(task[0].innerText);

  for(let i = 0; i < todos.length; i++) {
    if(todos[i].text === task[0].innerText) {
      todos.splice(i, 1);
    }
  }

  task.parent().remove();
}

function markDone(event) {
  const target = event.target;
  if($(target).hasClass('done')) {
    $(target).toggleClass('done');
    localStorage.setItem(target.innerText, false);
    for(let i = 0; i < todos.length; i++) {
      if(todos[i].text === target.innerText) {
        todos[i].done = false;
      }
    }
  } else {
    $(target).toggleClass('done');
    localStorage.setItem(target.innerText, true);
    for(let i = 0; i < todos.length; i++) {
      if(todos[i].text === target.innerText) {
        todos[i].done = true;
      }
    }
  }
}
