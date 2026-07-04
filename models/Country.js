const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    officialName: {
      type: String,
    },

    capital: {
      type: String,
    },

    region: {
      type: String,
      required: true,
    },

    subregion: {
      type: String,
    },

    population: {
      type: Number,
    },

    area: {
      type: Number,
    },

    currencies: [
      {
        type: String,
      },
    ],

    languages: [
      {
        type: String,
      },
    ],

    timezones: [
      {
        type: String,
      },
    ],

    flag: {
      type: String,
    },

    independent: {
      type: Boolean,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Country", countrySchema);