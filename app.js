const fs = require("fs");
const prompt = require('prompt-sync')({sigint: true});;

const files_dir = "./files";
const files_list_filename = files_dir+"/files_written.txt";

let file_list = [];

//console.log(process.argv);

myArgs = process.argv;

const loadFileNames = () => {
    if (!fs.existsSync(files_list_filename)) {
        console.log("File does not exist. Creating it ...")
        const fd = fs.openSync(files_list_filename, 'w', 0o666);
        fs.closeSync(fd);
    }
    let data = fs.readFileSync(files_list_filename, { encoding: 'utf8', flag: 'r' });
    if (data) {
        //console.log("Read result:", data);
        data = data.toString().toUpperCase();
        file_list = data.split("\n");
    }
}

if (myArgs.length <= 2) {
    console.log("You must provide a filename!");
} else {
    loadFileNames();
    let fileName = myArgs[2];

    if (file_list.includes(fileName.toUpperCase())) {
        const name = prompt('file name exists Enter new file name: ');
        
        if (fileName !== name) {
            fileName = name;        
        } else {
            fileName = "";
        }
    }
    if (fileName.length > 0) {
        fs.appendFile(`${files_dir}/${fileName}`, "You are awesome\n", (err) => {
            if (err) {
                throw err;
            } else {
                fileName = fileName.toUpperCase()
                file_list.push(fileName);
                fs.appendFile(files_list_filename, fileName+"\n", (err) => {
                    if (err) {
                        console.log("unable to append writted file name.");
                    } else {
                        console.log("Data written successfully!");
                    }
                })
            }
        })    
    } else {
        console.log("File name not provided. Exiting ...");
    }
}
