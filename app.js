const fs = require("fs");
const prompt = require('prompt-sync')({sigint: true});;

const files_list_filename = "files_written.txt";

var file_list = [];

//console.log(process.argv);

myArgs = process.argv

const testWriteFileExists = () => {
    if (!fs.existsSync(`./files/${files_list_filename}`)) {
        console.log(`creating ./files/${files_list_filename}`);
        var createStream = fs.createWriteStream(`./files/${files_list_filename}`);
        createStream.end();
    }
}

const loadFileNames = () => {
    fs.readFile(`./files/${files_list_filename}`, (err, result) => {
        if (err) {
            throw err;
        } else {
            console.log(result);
            result = result.toString().toUpperCase();
            file_list = result.split("\n");
        }
    })
}

if (myArgs.length <= 2) {
    console.log("You must provide a filename!");
} else {
    testWriteFileExists();
    loadFileNames();
    var fileName = myArgs[2];
    if (file_list.includes(fileName.toUpperCase())) {
        const name = prompt('Enter new file name: ');
        console.log(`File name is ${name}`);
        if (fileName !== name) {
            fileName = name;        
        } else {
            fileName = "";
        }
    }
    if (fileName.length > 0) {
        fs.appendFile(`./files/${fileName}`, "You are awesome\n", (err) => {
            if (err) {
                throw err;
            } else {
                fileName = fileName.toUpperCase()
                file_list.push(fileName);
                fs.appendFile(`./files/${files_list_filename}`, fileName, (err) => {
                    if (err) {
                        console.log("unable to append writted file name.");
                    }
                })
                console.log("Data written successfully!");
            }
        })    
    }
}
