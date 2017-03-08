let $ = require('jquery') // jQuery now loaded and assigned to $
let task_id_index = 0

$('#submit').on('click', () => {
    let task = $('#task_string').val()
    if (task != '') {
      task_id_index++

      let updatedString = '<p><input type="checkbox" id="' + task_id_index + '"/><label for="' + task_id_index + '"><h7 id="task_list"> ' + task + '</h7></label></p>'

      $('#task_form').append(updatedString)
    }

})

$('#reset_btn').on('click', () => {
    $('#task_form').text('')
})

$('#task_string').on('keypress', (ev) => {
    if (ev.which === 13) {
        ev.preventDefault();
        $(this).value = ''
        $('#submit').click();
    }
})

$('#task_list').on('hover', () =>{
  $('#del_task').css('background-color', 'red');
  $('#del_task').css('visibility', 'visible');
})

$("body").css("overflow", "auto");
