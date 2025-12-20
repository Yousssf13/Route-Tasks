 console.log({
  File: __filename,
  Dir: __dirname
});
//-------------------------------(2)
const path = require("path");

function getFileName(filePath) {
  return path.basename(filePath);
}

console.log(getFileName("/user/files/report.pdf"));
// "report.pdf"
//-------------------------------(3)
function buildPath(obj) {
  return path.join(obj.dir, obj.name + obj.ext);
}

console.log(buildPath({ dir: "/folder", name: "app", ext: ".js" }));
// /folder/app.js
//-----------------------------------(4)
function getExtension(filePath) {
  return path.extname(filePath);
}

console.log(getExtension("/docs/readme.md"));
// .md
//---------------------------------------------(5)

function parsePath(filePath) {
  const parsed = path.parse(filePath);
  return {
    Name: parsed.name,
    Ext: parsed.ext
  };
}

console.log(parsePath("/home/app/main.js"));
// { Name: "main", Ext: ".js" }
//--------------------------------------------------(6)

function isAbsolutePath(filePath) {
  return path.isAbsolute(filePath);
}

console.log(isAbsolutePath("/home/user/file.txt"));
// true
//------------------------------------------------------------(7)

function joinSegments(...segments) {
  return path.join(...segments);
}

console.log(joinSegments("src", "components", "App.js"));
// src/components/App.js
//----------------------------------------------------------(8)

function resolvePath(relativePath) {
  return path.resolve("src", relativePath);
}

console.log(resolvePath("./index.js"));
// /home/user/project/src/index.js
//------------------------------------------------------(9)

function joinTwoPaths(p1, p2) {
  return path.join(p1, p2);
}

console.log(joinTwoPaths("/folder1", "folder2/file.txt"));
// /folder1/folder2/file.txt
//------------------------------------------------------------(10)

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Error:", err.message);
      return;
    }
    console.log(`The ${filePath} is deleted.`);
  });
}
fs.writeFileSync("./test.txt", "temporary file");
deleteFile("./test.txt");
//------------------------------------------------------------(11)
function createFolder(folderPath) {
  fs.mkdirSync(folderPath, { recursive: true });
  console.log("Success creating folder:", folderPath);
}
createFolder("./myFolder");

//-------------------------------------------------------(12)
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("start", () => {
  console.log("Welcome event triggered!");
});

emitter.emit("start");
//-------------------------------------------------------(13)
emitter.on("login", (username) => {
  console.log(`User logged in: ${username}`);
});
emitter.emit("login", "Ahmed");
//---------------------------------------------------(14)

function readFileSync(path) {
  const data = fs.readFileSync(path, "utf8");
  console.log(`the file content => "${data}"`);
}
readFileSync("./notes.txt");

//----------------------------------------------------(15)



function writeAsync(path, content) {
  fs.writeFile(path, content, (err) => {
    if (err) return console.error(err);
    console.log("File saved asynchronously");
  });
}

//writeAsync("./async.txt", "Async save");



//------------------------------------------------------(16)


function isExist(path) {
  return fs.existsSync(path);
}

console.log(isExist("./notes.txt"));
// true

///////////////////////////////////////////////////(17)
const os = require("os");

function getOSInfo() {
  return {
    Platform: os.platform(),
    Arch: os.arch()
  };
}

console.log(getOSInfo());
// { Platform: "win32", Arch: "x64"} 





