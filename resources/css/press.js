document.onkeypress = function (event) {
  event = (event || window.event);
  if (event.keyCode == 123) {
    return false;
  }
}
document.onmousedown = function (event) {
  event = (event || window.event);
  if (event.keyCode == 123) {
    return false;
  }
}
document.onkeydown = function (event) {
  event = (event || window.event);
  if (event.keyCode == 123) {
    return false;
  }
  if(event.ctrlKey && event.shiftKey && event.keyCode == 'I'.charCodeAt(0)){
    return false;
  }
  if(event.ctrlKey && event.shiftKey && event.keyCode == 'J'.charCodeAt(0)){
    return false;
  }
  if(event.ctrlKey && event.keyCode == 'U'.charCodeAt(0)){
    return false;
  }
}
