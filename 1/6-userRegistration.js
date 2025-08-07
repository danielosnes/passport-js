/**
 * Let's learn how to register a user without a databse.
 * In a real production environment, you should use a database.
 * But we've simplified this example to focus on the creation of new users.
 * 
 * Instead of a database, we'll use an array holding data:
 */
// users:
let records = [
    {
        id: 1,
        username: "sam",
        password: "codec@demy10",
    },
    {
        id: 2,
        username: "jill",
        password: "p@ssword123!",
    },
];
// Using a custom helper function we created in {users.js}, we can retrieve user data upon registraction and update the [records] array:
function createUser(user) {
    return new Promise((resolve, reject) => {
        const newUser = {
            // getNewId creates an updated ID for the new user
            id: getNewId(records),
            ...user,
        };
        records = [newUser, ...records];
        resolve(newUser);
    });
};
/**
 * In the [createUser()] function, we're creating a [Promise] in order to prevent events from becoming blocked when running the application.
 * 
 * [createUser()] creates a new user and inserts them into our database [recorrds].
 * Once created, we resolve the [Promise] and send back the newly created user.
 * 
 * Note: since we're not making use of a database, the newly created user will not be persisted if the server restarts.
 */
/****************************************************************************************************************************************************************/
/*
//before:
let records = [
  {
    id: 1,
    username: "sam",
    password: "codec@demy10",
  },
  {
    id: 2,
    username: "jill",
    password: "birthday",
  },
];

const getNewId = (array) => {
  if (array.length > 0) {
    return array[array.length - 1].id + 1;
  } else {
    return 1;
  }
};

exports.createUser = function (user) {
  return new Promise((resolve, reject) => {
    const newUser = {
      id: getNewId(records),
      ...user,
    };
    records = [newUser, ...records];
    console.log(records);
    resolve(newUser);
  });
};

exports.findById = function (id, cb) {
  process.nextTick(function () {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error("User " + id + " does not exist"));
    }
  });
};

exports.findByUsername = function (username, cb) {
  process.nextTick(function () {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};

*/
/****************************************************************************************************************************************************************/
// Instructions
// Now we can make use of this helper function in our endpoint to create users, let’s move on to the next exercise to see how to accomplish that!
