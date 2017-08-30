let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/app";

function update_tasks(task_title, task, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            alert('Unable to connect to db')
        } else {
            updateRecords(db, task_title, task, function(numUpdated) {
                db.close();
                callback(numUpdated)
            });

        }

    });
}

function find_tasks(callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            alert('Unable to connect to db')
        } else {
          db.collection('all_tasks').find({}).toArray(function(err, data) {
              callback(data)

          });
          db.close()
        }
    });
}

function find_task(task_title, task, callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            alert('Unable to connect to db')
        } else {

            let tasks_collection = db.collection('all_tasks')
            tasks_collection.find({
                'title': task_title
            }).toArray(function(err, tasks) {
                callback(tasks);
            });

            db.close();
        }

    });
}

var updateRecords = function(db, title, task, callback) {
    db.collection('all_tasks').updateOne({
            "title": title
        }, {
            $addToSet: {
                "tasks": task
            }
        },
        function(err, numUpdated) {
            console.log(numUpdated);
            callback(numUpdated);
        });
};


function insert_tasks(task_title, task) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            alert('Unable to connect to db')
        } else {
            let tasks_collection = db.collection('all_tasks');

            let data = {
                'title': task_title,
                'tasks': [task]
            }
            tasks_collection.insert(data);
            db.close();
        }

    });
}
