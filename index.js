const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const compiler = require('compilex');
const options = {stats: true};
const app = express();
const dotenv = require('dotenv');
const boilerPlateCode = require('./helper.js');
/*-------Library required to generate random test cases. ----*/
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
/*----------------------*/
dotenv.config();
compiler.init(options);

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/compile',(req,res)=>{
    /*Small Modification in compilex.js flush() */
    compiler.flush(function(){
        console.log("Flushed Successfully");
    });
    const {language,code,input} = req.body;
    let withInput = false;
    if(input!=""){
        withInput = true;
    }
    var envData = { OS : "windows"}; 
    try {
        if (language === "python") {
            if (withInput) {
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    res.status(200).send(data);
                });
            } else {
                compiler.compilePython(envData, code, function (data) {
                    res.status(200).send(data);
                });
            }
        } else if (language === "java") {
            if (withInput) {
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    res.status(200).send(data);
                });
            } else {
                compiler.compileJava(envData, code, function (data) {
                    res.status(200).send(data);
                });
            }
        } else if (language === "cpp") {
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            if (withInput) {
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    res.status(200).send(data);
                });
            } else {
                compiler.compileCPP(envData, code, function (data) {
                    res.status(200).send(data);
                });
            }
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

/*Under Development Route */
app.post('/test',async (req,res)=>{
    const {code} = req.body;
    console.log("hii");
    const prompt = "Generate only a test case for this code snippet ? Do not add any other desription. generate only related inputs. "+code;

    const result = await model.generateContent(prompt);
    
    res.json({"input": result.response.text()});
});

app.get('/default/:language',(req,res)=>{
    const language = req.params.language;
    const code = boilerPlateCode[language];
    if (code) {
        res.send({ code });
    } else {
        res.status(400).send({ error: 'Invalid language' });
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});