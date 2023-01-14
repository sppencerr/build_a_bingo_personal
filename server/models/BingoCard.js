const { Schema, model } = require("mongoose");

// subdocument schema to be used inside bingoCardSchema
const squareSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      match: [/^[a-e][1-5]$/, "Invalid format for square address"],
    },
    status: {
      type: Boolean,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    }
  });

squareSchema.virtual("col").get(function () {
  return this.location.split("")[0];
});

squareSchema.virtual("row").get(function () {
  return this.location.split("")[1];
});

const bingoCardSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    parentList: {
      type: Schema.Types.ObjectId,
      ref: "BingoList",
    },
    squares:
    {
      type: [squareSchema],
      required: true,
      validate: {
        //custom validator to check if there are enough squares and if each square has a unique address
        validator: function (arr) {
          function checkUnique() {
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].location === /[c][3]/) {
                return false;
              }
              for (let j = i + 1; j < arr.length; j++) {
                if (arr[j].location === arr[i].location) {
                  return false;
                }
              }
            }
            return true;
          }
          return arr.length >= 24 && checkUnique();
        },
        message:
          "A card must contain 24 or more squares and each square must have a unique address between a1 and e5. C3 may not be used.",
      },
    },
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

const BingoCard = model("BingoCard", bingoCardSchema);

module.exports = BingoCard;
