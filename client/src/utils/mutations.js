import { gql } from "@apollo/client";

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const SAVE_CARD = gql`
    mutation saveCard($owner: ID, $parentList: ID, $squares: [CardSquareInput]!, $status: Boolean) {
        saveCard(owner: $owner, parentList: $parentList, squares: $squares, status: $status) {
            _id
            owner
            parentList
            squares {
            location
            status
            text
            }
            status
        }
    }
`;

export const SAVE_LIST = gql`
mutation saveList($owner: ID, $name: String!, $list: [String]!) {
    saveList(owner: $owner, name: $name, list: $list) {
        _id
        owner
        name
        list
    }
}`


export const UPDATE_CARD = gql`
    mutation updateCard($cardId: ID!, $square: CardSquareInput!) {
        updateCard(cardId: $cardId, square: $square) {
            _id
            squares {
            location
            status
            }
            status
        }
    }
`;