# Online Code Compiler

This project is an online code compiler that allows users to write, compile, and run code in different programming languages. The project includes a frontend built with HTML, CSS, and JavaScript, and a backend built with Node.js and Express.

## Features

- Code editor with syntax highlighting using CodeMirror
- Language selection (C++, Python, Java)
- Seprate Input and output text areas
- Loader with backdrop blur effect during code execution
- Random input generation using Google Generative AI (ongoing)

## Prerequisites

- Node.js and npm installed on your machine
- Internet connection to load external libraries and fonts

## Installation

1. Clone the repository:

```sh
git clone https://github.com/Prabhat-2101/Compiler_Using_NodeJS_Compilex.git
cd Compiler_Using_NodeJS_Compilex
```

2. Install the dependencies:
```sh
npm install
```

3. Create a .env file in the root directory and add your environment variables:
```sh
PORT=3000
MONGO_URI=your_mongo_uri
GEMINI_API_KEY=your_gemini_api_key
```

4. Run the project
```sh
node index.js
```
Project Structure:
.
├── node_modules
├── public
│   ├── codemirror-5.65.18
│   ├── [index.html]
│   ├── index.js
│   ├── helper.js
├── .env
├── package.json
├── package-lock.json
└── README.md
