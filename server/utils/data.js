const { BingoList, BingoCard, User } = require('../models');

const getRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
const getRandomIndexValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomNumber = (num = 100) => Math.floor(Math.random() * num);

const createDummyUserData = (usernameArr, emailArr, count) => {
    const uniqueAccountLimit = Math.min(usernameArr.length, emailArr.length);
    const dummyUsers = [];

    if (count > uniqueAccountLimit) {
        console.log(`Unable to make ${count} unique accounts. Only ${uniqueAccountLimit} accounts will be made.`);
        count = uniqueAccountLimit;
    }

    for (let i = 0; i < count; i++) {
        const username = usernameArr.splice([getRandomIndex(usernameArr)], 1);
        const email = emailArr.splice([getRandomIndex(emailArr)], 1);

        const user = {
            username: username[0],
            email: email[0],
            password: 'password'
        };

        dummyUsers.push(user);
    }
    return dummyUsers;
};

const createBingoListRandomNumberData = (ownerId) => {
    const name = 'Random Number BingoList';
    const list = [];

    while (list.length < 24) {
        const num = getRandomNumber().toString();
        if (list === [] || !list.includes(num)) {
            list.push(num);
        }
    };

    const bingoListData = {
        owner: ownerId,
        name: name,
        list: list
    };

    return bingoListData;
};

const createBingoCardData = async (bingoListId, ownerId) => {
    // using a flat array to avoid O^n complexity if we add additional logic or functionality in the future.
    const locations = ['a1', 'b1', 'c1', 'd1', 'e1', 'a2', 'b2', 'c2', 'd2', 'e2', 'a3', 'b3', 'c3', 'd3', 'e3', 'a4', 'b4', 'c4', 'd4', 'e4', 'a5', 'b5', 'c5', 'd5', 'e5',];

    const bingoListData = await BingoList.findById(bingoListId);

    const tempList = bingoListData.list;

    const cardData = {
        owner: ownerId,
        parentList: bingoListId,
    };

    cardData.squares = locations.map((loc) => {
        const square = {
            location: loc,
            status: false
        };
        if (loc === 'c3') {
            square.status = true;
            square.text = "FREE";
        } else {
            square.text = tempList.pop(getRandomIndex);
        }

        return square;
    });


    return cardData;

};

const createUser = async (userData) => {
    const user = await User.create(userData);
    user.save();
    return user;
};

const createBingoList = async (bingoListData) => {
    const bingoList = await BingoList.create(bingoListData);
    bingoList.save();
    return bingoList;
};

const createBingoCard = async (bingoCardData) => {
    const bingoCard = await BingoCard.create(bingoCardData);
    bingoCard.save();
    return bingoCard;
};

module.exports = {
    getRandomIndex,
    getRandomIndexValue,
    getRandomNumber,
    createDummyUserData,
    createBingoListRandomNumberData,
    createBingoCardData,
    createUser,
    createBingoList,
    createBingoCard
};
