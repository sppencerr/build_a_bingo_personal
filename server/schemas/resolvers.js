const { AuthenticationError } = require("apollo-server-express");
const { User, BingoCard, BingoList } = require("../models");
const { signToken } = require("../utils/auth");
const { checkWin } = require('../utils/bingo');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    user: async (parent, { username }) => {
      const user = await User.findOne({ username });
      return user;
    },
    users: async (parent, args) => {
      const users = await User.find({});
      return users;
    },
    card: async (parent, { cardId }) => {
      const card = await BingoCard.findOne({ _id: cardId })
        .populate('owner')
        .populate('parentList');
      return card;
    },
    cards: async (parent, args) => {
      const cards = await BingoCard.find({})
      .populate('owner');
      return cards;
    },
    list: async (parent, { listId }) => {
      const list = await BingoList.findById({ _id: listId })
      .populate('owner');
      return list;
    },
    lists: async (parent, args) => {
      const lists = await BingoList.find({})
        .populate('owner');
      return lists;
    },
    listsByUser: async (parent, { ownerId }, context) => {
      const lists = await BingoList.find({ owner: ownerId })
        .populate('owner');
      return lists;
    },
    cardsByUser: async (parent, { ownerId }, context) => {
      const lists = await BingoCard.find({ owner: ownerId })
        .populate({
          path: 'parentList',
          populate: 'owner'
        })
        .populate('owner');
      return lists;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    deleteCard: async (parent, { cardId }, context) => {
      // if (context.user) {
        await BingoCard.findOneAndDelete({ _id: cardId });

        // const updatedCards = BingoCard.find({});
        // return updatedCards.map((card) => {
        //   card.toJSON();
        // });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
    deleteList: async (parent, { listId }, context) => {
      // if (context.user) {
        await BingoList.findOneAndDelete({ _id: listId }, { new: true });

        const updatedLists = BingoList.find({});
        return updatedLists.map((list) => {
          list.toJSON();
        });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    saveCard: async (parent, { owner, parentList, squares }) => {
      const newCard = await BingoCard.create({ owner, parentList, squares });
      return newCard;
    },
    saveList: async (parent, { owner, name, list }) => {
      const newList = await BingoList.create({ owner, name, list });
      return newList;
    },
    // Currently expects an array of 1 item. We can change this to expect specific properties: (squareLocation, squareStatus) if that would be better
    updateCard: async (parent, { cardId, square }) => {
      console.log(square);
      let card = await BingoCard.findOneAndUpdate({ _id: cardId, "squares.location": square.location }, { $set: { "squares.$.status": square.status } }, { new: true });
      // console.log(card);
      const winStatus = checkWin(card);
      if (winStatus !== card.status) {
        card = await BingoCard.findOneAndUpdate({ _id: cardId }, { $set: { status: card.status } }, { new: true });
      }
      return card;
    },
  },
};

module.exports = resolvers;
