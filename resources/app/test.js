let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/app";

function insert_tasks(task_title, task) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            alert('Unable to connect to db')
        } else {

            let task_title_slug = task_title.trim().split(' ').join('_');
            let tasks_collection = db.collection(task_title_slug);

            let data = {
                'title': task_title,
                'task': task
            }
            tasks_collection.insert(data);
            db.close();
        }

    });
}

function find_tasks(callback) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            alert('Unable to connect to db')
        } else {
            db.collection('Collection_5').find({}).toArray(function(err, data) {
                alert(data);

            });

            db.listCollections().toArray(function(err, cols) {

                cols.forEach(function(col) {
                    console.log(col.name.toString().trim())

                    db.collection(col.name.toString().trim()).find({}).toArray(function(err, task_data) {
                        alert(task_data);
                    })
                });
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
            let task_title_slug = task_title.split(' ').join('_');
            let tasks_collection = db.collection(task_title_slug)
            tasks_collection.find({
                'title': task_title,
                'task': task
            }).toArray(function(err, tasks) {
                callback(tasks);
            });

            db.close();
        }

    });
}

var updateRestaurants = function(db, callback) {
   db.collection('restaurants').updateOne(
      { "restaurant_id" : "41156888" },
      { $set: { "address.street": "East 31st Street" } },
      function(err, results) {
        console.log(results);
        callback();
   });
};
