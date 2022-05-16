var express = require('express')
var app = express()


var bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SERVER_PORT = process.env.PORT || 3000;
const MAX_LENGTH_WORD = 10;

app.post('/getWordLengthFrequency', function (req, res) {
    console.log("post requested received with data: ");

    var data = req.body.data;

    console.log(data);

    const words = data.split(' ');
    var result = new Array(MAX_LENGTH_WORD);
    result.fill(0);
    let wordLengthArr = [];
    for (let j = 0; j < words.length; j++) {
        wordLengthArr.push(words[j].length);
        console.log(wordLengthArr[j]);
    }
    console.log(wordLengthArr.length);
    for (let j = 0; j < wordLengthArr.length; j++) {
        for (let i = 1; i < MAX_LENGTH_WORD + 1; i++) {
            if (wordLengthArr[j] === i) {
                result[i - 1] = result[i - 1] + 1;
            }
        }
    }

    var resultStr = "";

    for (let i = 0; i < MAX_LENGTH_WORD; i++) {
        resultStr = resultStr + result[i] + " ";
    }

    console.log("sending response");
    res.send(resultStr);
    res.end();

})

app.listen(SERVER_PORT, () => {
    console.log("Server listening on port: " + SERVER_PORT);
})