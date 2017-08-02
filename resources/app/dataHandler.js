function get_tasks_from_app(callback) {
    var tasks_dict = {}
    var task_index = 0
    $(".task").each(function() {
        task_index++
        tasks_dict[task_index] = $(this).text()

    })
    callback(tasks_dict)
}

function save_tasks(tasks_dict) {
    fs.writeFile("tasks.json", JSON.stringify(tasks_dict), "utf8", () => {})
}

function get_tasks_from_file(callback) {
    var content = fs.readFileSync("tasks.json");
    content = JSON.parse(content)
    callback(content)
}


function reload_tasks(content_dict) {

    for (var taskKey in content_dict) {
        let updatedString = '<p class="task"><input type="checkbox" id="' + taskKey + '"/><label for="' + taskKey + '"><h7 id="task_list"> ' + content_dict[taskKey] + '</h7></label></p>'
        $('#task_form').append(updatedString)
    }
}
