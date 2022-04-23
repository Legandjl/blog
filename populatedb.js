#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
  if (!userArgs[0].startsWith('mongodb')) {
      console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
      return
  }
  */

const mongoose = require("mongoose");
const Post = require("./models/post");
const Comment = require("./models/comment");
const async = require("async");

const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const posts = [];
const comments = [];

async function postCreate(title, content, published, cb) {
  const postDetail = {
    title: title,
    content: content,
    published: published,
  };

  const post = new Post(postDetail);

  try {
    await post.save();
    posts.push(post);
    cb(null, post);
  } catch (e) {
    cb(e, null);
  }
}

async function commentCreate(name, content, post, cb) {
  const comment = new Comment({ name: name, content: content, post: post });

  try {
    await comment.save();
    comments.push(comment);
    cb(null, comment);
  } catch (e) {
    cb(e, null);
    return;
  }
}

function createPosts(cb) {
  async.series(
    [
      function (callback) {
        postCreate("A blog post", "Just a test post!", false, callback);
      },
      function (callback) {
        postCreate("A blog post 2", "Just another test post!", true, callback);
      },
      function (callback) {
        postCreate("A blog post 3", "and another test post!", false, callback);
      },
      function (callback) {
        postCreate("A blog post 4", "Just a test post!", true, callback);
      },
      function (callback) {
        postCreate("A blog post 5", "Just a test post!", true, callback);
      },
    ],
    // optional callback
    cb
  );
}

function createComments(cb) {
  async.series(
    [
      function (callback) {
        commentCreate("user1", "Just a test comment!", posts[0], callback);
      },

      function (callback) {
        commentCreate("user2", "Just a test comment!", posts[1], callback);
      },

      function (callback) {
        commentCreate("user3", "Just a test comment!", posts[1], callback);
      },

      function (callback) {
        commentCreate("user1", "Just a test comment!", posts[2], callback);
      },

      function (callback) {
        commentCreate("user2", "Just a test comment!", posts[2], callback);
      },

      function (callback) {
        commentCreate("user4", "Just a test comment!", posts[0], callback);
      },

      function (callback) {
        commentCreate("user6", "Just a test comment!", posts[1], callback);
      },

      function (callback) {
        commentCreate("user1", "Just a test comment!", posts[3], callback);
      },

      function (callback) {
        commentCreate("user1", "Just a test comment!", posts[3], callback);
      },

      function (callback) {
        commentCreate("user1", "Just a test comment!", posts[0], callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createPosts, createComments],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("results: " + posts);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
