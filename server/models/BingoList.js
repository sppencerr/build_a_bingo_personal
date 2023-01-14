const { Schema, model } = require("mongoose");


const bingoListSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  list: {
    type: [String],
    required: true,
    maxLength: 120,
    validate: {
      validator: function(arr) {
        function checkUnique () {
          for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
              if (arr[j] === arr[i]) {
                return false;
              }
            }
          }
          return true;
        }
        return arr.length >= 24 && checkUnique();
      },
      message:
        "A list must contain 24 or more entries and each entry must be unique.",
    },
  },
});

const BingoList = model("BingoList", bingoListSchema);

module.exports = BingoList;
