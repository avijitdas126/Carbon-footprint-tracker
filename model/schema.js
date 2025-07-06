import mongoose from "mongoose";
import { MONGODB_URL } from "../export";
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connection Successfully With Community DB");
  })
  .catch((err) => {
    console.log(err);
  });

let user = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },

});

let codeDetail = new mongoose.model("Community", community);
