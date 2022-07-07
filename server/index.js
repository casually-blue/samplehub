var express = require("express");
var cors = require("cors");
const path = require("path");
const fs = require("fs");
const fuzzysearch = require("fuzzy-search");
var searcher;

var app = express();
app.use(cors());
const PORT = 1337;

app.get("/search/:term/:page", function (req, res, next) {
  const result = searcher.search(req.params.term.replace('>', '/'));
  res.json([...result.splice((req.params.page-1)*25,(req.params.page)*25), {'total':result.length}]);
});

const getAllFiles = function(dirPath, arrayOfFiles, img) {

  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []
  var _img = img;
  var packfolder = dirPath.split('/').slice(1)[0];

  files.forEach(function(file) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      _img = 'http://localhost:1337'+path.join(dirPath, file).substring(6);
      packfolder = dirPath.split('/').slice(-1)[0];
    }
  });

  files.forEach(function(file) {

    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles, _img);
    } else {
      if (file.endsWith('.wav') || file.endsWith('.mp3')) {
        arrayOfFiles.push({
          name: file.substring(0, file.length - 4),
          packfolder: packfolder,
          filename: file,
          imgsrc: _img,
          audiosrc: path.join(dirPath, "/", file).substring(7),
          tags: ['tag1', 'tag2', 'tag3'],
          type: "oneshot",
          bpm: 0,
          key: "-",
          upvotes: 0,
          downvotes: 0,
          downloads: 0
        });
      }
    }
  })

  return arrayOfFiles
}

app.listen(PORT, function () {
  console.log("CORS-enabled web server listening on port " + PORT);

  const directoryPath = path.join(__dirname, "public");
  const samples = getAllFiles('public', [], 'https://i.ibb.co/cbBBr2m/defaultthumb.png');
  searcher = new fuzzysearch(samples, ['name', 'audiosrc'], { sort: true });
});

app.use(express.static("public"));
