const mongoose = require("mongoose");
const mfs = require('mongoose-fuzzy-searching');

const sampleSchema = new mongoose.Schema({
  name: String,
  filename: {
    immutable: true,
    type: String,
  },
  uploader: {
    immutable: true,
    type: String,
    default: "anonymous",
  },
  imgsrc: {
    type: String,
    default: "https://i.ibb.co/cbBBr2m/defaultthumb.png",
  },
  audiosrc: String,
  tags: {
    type: [String],
    default: [],
  },
  type: {
    type: String,
    default: "oneshot",
  },
  bpm: {
    type: Number,
    default: 0,
  },
  key: {
    type: String,
    default: "-",
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  createdAt: {
    immutable: true,
    type: Date,
    default: () => Date.now(),
  }
});

sampleSchema.plugin(mfs, { fields: ['name'] });
module.exports = mongoose.model("Sample", sampleSchema);
