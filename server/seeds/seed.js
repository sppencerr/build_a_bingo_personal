const db = require('../config/connection');
const { User, BingoList, BingoCard } = require('../models');
const { emailList, usernameList, bingoList, } = require('./lists');
const { createBingoCardData, getRandomIndex, getRandomIndexValue, createDummyUserData, getRandomNumber, createBingoListRandomNumberData, createUser, createBingoList, createBingoCard } = require('../utils/data');

db.once('open', async () => {

    await User.deleteMany({});
    await BingoList.deleteMany({});
    await BingoCard.deleteMany({});

    // create users list, then add them to the db
    const dummyUserData = createDummyUserData(usernameList, emailList, 10);
    const users = await Promise.all(dummyUserData.map(async (user) => {
        const newUser = await createUser(user);
        return newUser;
    }));


    const userIdForNewLists = await User.findOne({}).select('_id').exec();

    // Since the bingoList items don't have an owner and owners are dynamically generated, we'll need to add the owner property to each list.
    bingoList.map(async (list) => {
        list.owner = userIdForNewLists;
        createBingoList(list);
        return list;
    });
    
    const manyUserIds = await User.find({}).select('_id').limit(10);

    const data = await Promise.all(manyUserIds.map(async (user) => {
        const listData = createBingoListRandomNumberData(user);
        const list = await createBingoList(listData);
        const cardData = await createBingoCardData(list, user._id);
        const card = await createBingoCard(cardData);
        return;
    }))

    process.exit(0);
});