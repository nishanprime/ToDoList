const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const ToDoList = require("../models/toDoListModel");
const { generateToken } = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)

  const { username, email, name, password } = req.body;
  console.log("I am in")
  if (
    name.length === 0 ||
    email.length === 0 ||
    username.length === 0 ||
    password.length === 0
  ) {
    res.status(400);
    throw new Error("Make sure you enter all values correctly");
  }
  const userExists =
    (await User.findOne({ email })) || (await User.findOne({ username }));
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password, username });
  const userToDoList = await ToDoList.insertMany({
    user: user._id,
    toDoList: [],
  });
  console.log(user)
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await user.matchPassword(password))) {
    const toDoList = await ToDoList.find({ user: user._id });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      todoListId: toDoList[0]._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

//PRIVATE ROUTE
//ONLY LOGGED IN AND RIGHT USER CAN EDIT
//HIS/HER TODOS
const updateToDos = asyncHandler(async (req, res) => {
  const {
    title = "",
    content = "",
    shallEdit = false,
    shallDelete = false,
    toDoListId = "",
    dataId = "",
    complete,
  } = req.body;
  const user = await User.findById(req.user._id);
  if (shallDelete) {
    console.log(shallDelete);
    await ToDoList.findOneAndUpdate(
      {
        _id: toDoListId,
      },
      {
        $pull: { toDoList: { _id: dataId } },
      }
    );
  } else {
    if (shallEdit && title.length > 0 && content.length > 0) {
      if (user) {
        await ToDoList.findOneAndUpdate(
          {
            _id: "6119e3b96685144e2ab4b750",
            "toDoList._id": "6119e3b96685144e2ab4b753",
          },

          {
            $set: {
              "toDoList.$.title": title,
              "toDoList.$.content": content,
              "toDoList.$.updated": Date.now(),
              "toDoList.$.complete": complete,
            },
          },
          { new: true },
          (err, data) => {
            console.log(data);
          }
        );
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } else {
      res.status(401);
      throw new Error("Not valid input");
    }
  }
});

//PRIVATE ROUTE
//ONLY LOGGEDIN USER CAN PERFORM ACTION
const addToDos = asyncHandler(async (req, res) => {
  const { title, content, createNow, toDoListId } = req.body;
  if (createNow && title.length > 0 && content.length > 0) {
    const user = await User.findById(req.user._id);
    if (user) {
      const addedToList = await ToDoList.updateOne(
        { _id: toDoListId },
        {
          $push: {
            toDoList: {
              complete: false,
              created: Date.now(),
              updated: Date.now(),
              title: title,
              content: content,
            },
          },
        }
      );
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.status(401);
    throw new Error("Invalid entry.Make sure title and content are not empty");
  }
});

//PRIVATE ROUTE
//ONLY LOGGED IN USER CAN VIEW
//AND CAN ONLY VIEW HIS/HER Todos
const mytodos = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const mytodoList = await ToDoList.find({ user: user._id });
    res.json(mytodoList);
    // res.json({
    //   name: user.name,
    //   email: user.email,
    //   username: user.username,
    //   toDoListsID: mytodoList[0]._id,
    //   toDoLists: mytodoList[0].toDoList,
    //   createdAtUpdatedAt: {
    //     createdAt: mytodoList[0].createdAt,
    //     updatedAt: mytodoList[0].updatedAt,
    //   },
    // });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { authUser, mytodos, registerUser, updateToDos, addToDos };
