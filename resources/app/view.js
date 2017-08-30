let $ = require('jquery') // jQuery now loaded and assigned to $
let ipcRenderer = require('electron').ipcRenderer

let task_id_index = 0

$('#reload').on('click', (ev) => {
    find_tasks(function(data) {
        data.forEach(function(task_data) {
            ipcRenderer.send('add-child-window');
            $('#test').attr('value', task_data.title);

            alert(task_data.title);
        });
    });
});

$('#submit').on('click', () => {
    let task = $('#task_string').val()
    let task_title = $('#task_title').val()

    if (task != '') {
        find_task(task_title, task, function(found_task) {
            if (found_task.length == 0) {

                task_id_index++

                let updatedString = '<p><input type="checkbox" id="' + task_id_index + '"/><label for="' + task_id_index + '"><h7 id="task_list"> ' + task + '</h7></label></p>'

                $('#task_form').append(updatedString)
                insert_tasks(task_title, task)
            } else {
                update_tasks(task_title, task, function(numUpdated) {
                    if (numUpdated) {
                        task_id_index++

                        let updatedString = '<p><input type="checkbox" id="' + task_id_index + '"/><label for="' + task_id_index + '"><h7 id="task_list"> ' + task + '</h7></label></p>'

                        $('#task_form').append(updatedString)
                    }
                })
            }
        });
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


$('#task_list').on('hover', () => {
    $('#del_task').css('background-color', 'red');
    $('#del_task').css('visibility', 'visible');
})

$("body").css("overflow", "auto");


$("#add").on('click', () => {
    ipcRenderer.send('add-child-window');
});
