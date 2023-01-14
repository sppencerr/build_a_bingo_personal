const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

// require('dotenv').config();

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection'); 

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
//passport
// const passport = require('passport');

// app.use(passport.initialize());
// app.use(passport.session({ 
//   secret: "uwu", 
//   name: "uwu",
//   // store: "sessionStore", 
//   // connect-mongo session store
//   proxy: true,
//   resave: true,
//   saveUninitialized: true
//   }));


app.use(
  express.urlencoded({ extended: false }),
  express.json()
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };



// Connect to the MongoDB database
// Create a new user account
// app.post('/api/users', (req, res) => {
//   // Get the user data from the request body
//   const user = req.body;

//   // Hash the password
//   user.password = hashPassword(user.password);

//   // Insert the user into the Users collection
//   db.collection('Users').insertOne(user, (err, result) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(500);

//       // create operation using User.create method
//       app.post('/users', function (req, res) {
//         const user = new User({
//           username: req.body.username,
//           password: req.body.password
//         });
//         user.save(function (error) {
//           if (error) {
//             res.status(500).send(error);
//           } else {
//             res.send(user);
//           }
//         });
//       })
//     }
//   })
// });

  // Call the async function to start the server
  startApolloServer(typeDefs, resolvers);

  // app.listen(4000, () => {
  //   console.log('Server listening on port 4000');
  // });
