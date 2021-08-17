const express = require("express");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const todoListRoutes = require("./routes/todoListRouter");
const userRoutes = require("./routes/userRoute");
const app = express();
app.use(express.json());
connectDB();
app.get("/",(req,res)=>{
  res.send(`
  /todos => get route => only admin can access
  <br>
  <br>
  /api/users/login => post route => to auth user => takes in username and password
  <br>
  <br>
  /api/users => post route => to register a new user => takes in username, email, name, and password: all required
  <br>
  <br>
  /api/users/mytodos => get route => private route => shows todos of logged in user
  <br>
  <br>
  /api/users/mytodos => post route => private => logged in user can add new todos
  <br>
  <br>
  /api/users/mytodos/ => put route => logged in user can edit their todos/delete their todos
  `)
})
app.use("/todos", todoListRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(5000, () => {
  console.log("Server Up and Running");
});
