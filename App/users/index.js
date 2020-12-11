const userRouter = require("./router");

module.exports = (app) => {
    app.use("/user", userRouter);
}
