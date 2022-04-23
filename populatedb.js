#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
  if (!userArgs[0].startsWith('mongodb')) {
      console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
      return
  }
  */
var async = require("async");
var Armor = require("./models/armor");
var Aid = require("./models/aid");
var Category = require("./models/category");
var Weapon = require("./models/weapon");
var Misc = require("./models/misc");

var mongoose = require("mongoose");
const category = require("./models/category");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var armors = [];
var aid_items = [];
var weapons = [];
var misc_items = [];
var categories = [];

function armorCreate(name, val, weight, condition, effects, category, cb) {
  const armorDetail = {
    name: name,
    val: val,
    weight: weight,
    condition: condition,
  };
  if (effects != false) armorDetail.effects = effects;
  if (category != false) armorDetail.category = category;

  var armor = new Armor(armorDetail);

  armor.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }

    armors.push(armor);
    cb(null, armor);
  });
}

function catergoryCreate(name, cb) {
  var category = new Category({ name: name });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Genre: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function weaponCreate(name, val, weight, dam, condition, category, cb) {
  const weaponDetail = {
    name: name,
    val: val,
    weight: weight,
    dam: dam,
    condition: condition,
  };
  if (category != false) weaponDetail.category = category;

  const weapon = new Weapon(weaponDetail);
  weapon.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New weapon: " + weapon);
    weapons.push(weapon);
    cb(null, weapon);
  });
}

/*
  
    name: { type: String, required: true, maxlength: 100 },
    val: { type: Number, required: true },
    weight: { type: Number },
    effects: { type: String },
    tag: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  
  
  */

function aidCreate(name, val, weight, effects, tag, category, cb) {
  const aidDetail = {
    name: name,
    val: val,
    weight: weight,
    effects: effects,
    tag: tag,
  };
  if (category != false) aidDetail.category = category;

  var aid = new Aid(aidDetail);
  aid.save(function (err) {
    if (err) {
      console.log("ERROR CREATING BookInstance: " + aid);
      cb(err, null);
      return;
    }
    console.log("New BookInstance: " + aid);
    aid_items.push(aid);
    cb(null, aid);
  });
}

function miscCreate(name, val, weight, category, cb) {
  const miscDetail = {
    name: name,
    val: val,
    weight: weight,
  };
  if (category != false) miscDetail.category = category;

  var misc = new Misc(miscDetail);
  misc.save(function (err) {
    if (err) {
      console.log("ERROR CREATING misc: " + misc);
      cb(err, null);
      return;
    }
    console.log("New BookInstance: " + misc);
    misc_items.push(misc);
    cb(null, misc);
  });
}

/*
  
    const MiscSchema = new Schema({
    name: { type: String, required: true, maxlength: 100 },
    val: { type: Number, required: true },
    weight: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
  });
  
  
    */

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        catergoryCreate("Misc", callback);
      },
      function (callback) {
        catergoryCreate("Aid", callback);
      },
      function (callback) {
        catergoryCreate("Weapons", callback);
      },

      function (callback) {
        catergoryCreate("Armor", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createArmor(cb) {
  //function armorCreate(name, val, weight, condition, effects, category, cb)
  async.parallel(
    [
      function (callback) {
        armorCreate(
          "White Shirt",
          15,
          5,
          99,
          "Makes you look clean!",
          categories[3],
          callback
        );
      },
      function (callback) {
        armorCreate(
          "Black Shirt",
          15,
          5,
          99,
          "Makes you look cool!",
          categories[3],
          callback
        );
      },
      function (callback) {
        armorCreate(
          "Bountry Hunter Duster",
          70,
          3,
          45,
          "CHR 1, GUNS + 5",
          categories[3],
          callback
        );
      },
      function (callback) {
        armorCreate(
          "Pre-War businesswear",
          5,
          2,
          80,
          "SPEECH 5",
          categories[3],
          callback
        );
      },
      function (callback) {
        armorCreate(
          "Fancy gambler suit",
          6,
          1,
          99,
          "LUCK 2",
          categories[3],
          callback
        );
      },
      function (callback) {
        armorCreate(
          "Vault Jumpsuit",
          15,
          5,
          99,
          "Makes you look clean!",
          categories[3],
          callback
        );
      },
      function (callback) {
        armorCreate(
          "White Shirt",
          1,
          6,
          77,
          "MELEE 5",
          categories[3],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createAid(cb) {
  //function aidCreate(name, val, weight, effects, tag, category, cb) {
  async.parallel(
    [
      function (callback) {
        aidCreate(
          "Bighorner meat",
          5,
          1,
          "1 hps",
          "FOD",
          categories[1],
          callback
        );
      },
      function (callback) {
        aidCreate("Stimpak", 75, 0, "+30 HP", "MED", categories[1], callback);
      },
      function (callback) {
        aidCreate(
          "Super Stimpak",
          150,
          0,
          "+60 HP",
          "MED",
          categories[1],
          callback
        );
      },
      function (callback) {
        aidCreate("Noodles", 5, 1, "1 hps", "FOD", categories[1], callback);
      },

      function (callback) {
        aidCreate("Mutfruit", 5, 1, "2 hps", "FOD", categories[1], callback);
      },

      function (callback) {
        aidCreate(
          "Irradiated mutfruit ",
          5,
          1,
          "1 hps",
          "FOD",
          categories[1],
          callback
        );
      },
    ],
    // Optional callback
    cb
  );
}

function createMisc(cb) {
  // miscCreate(name, val, weight, category, cb) {

  async.parallel(
    [
      function (callback) {
        miscCreate("Big Spoon", 3, 1, categories[0], callback);
      },
      function (callback) {
        miscCreate("Acoustic Guitar", 50, 3, categories[0], callback);
      },
      function (callback) {
        miscCreate("Dinner Plate", 1, 1, categories[0], callback);
      },
      function (callback) {
        miscCreate("Hammer", 2, 1, categories[0], callback);
      },

      function (callback) {
        miscCreate("Pilot Light", 15, 1, categories[0], callback);
      },

      function (callback) {
        miscCreate("Scrap Metal", 1, 1, categories[0], callback);
      },
    ],
    // Optional callback
    cb
  );
}

function createWeapons(cb) {
  // function weaponCreate(name, val, weight, dam, condition, category, cb) {

  async.parallel(
    [
      function (callback) {
        weaponCreate(
          "Cowboy repeater",
          800,
          5,
          32,
          77,
          categories[2],
          callback
        );
      },
      function (callback) {
        weaponCreate("Auto SMG", 999, 3, 60, 47, categories[2], callback);
      },
      function (callback) {
        weaponCreate("Big Boomer", 600, 2, 100, 50, categories[2], callback);
      },
    ],
    // Optional callback
    cb
  );
}

async.series(
  [createCategories, createArmor, createMisc, createWeapons, createAid],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("misc: " + misc_items);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
