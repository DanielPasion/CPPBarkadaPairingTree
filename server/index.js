const express = require('express');
const app = express();
const port = 3000;
var {google} = require('googleapis');
var cors = require('cors')

app.use(cors())

//Authentication
const auth = new google.auth.GoogleAuth({
    keyFile:'google.json',
    scopes:['https://www.googleapis.com/auth/spreadsheets']
});

//Base Read Sheets Function
async function readSheet(){
    const sheets = google.sheets({version:'v4',auth});
    const spreadsheetId = "1m1wa1T6EubnUfs5QkY-CoUlwDcuXoUuQe68qWvmVqvI"
    const range = 'All Pairings!A1:D';
    try{
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,range
        });
        const rows = response.data.values;
        return rows;
    }catch(error){
        console.log(error)
    }
}

app.get('/', (req, res) => {
  res.send('Running');
});

app.get('/ubaes', async (req, res) => {
    try{
        //Reading the sheet
        const position = { x: 0, y: 0 };
        const data = await readSheet();
        const pastFilipinos = [];
        const initialEdges = [];
        const initialNodes = [];
        const pastPairings = [];
        //Looping through all the data
        for (let i=1; i < data.length; i++){

            //Checking if the input was part of the fam
            if (data[i][1] == "UBAES"){
                //Big Data
                let big = {id: data[i][2],
                        data: {label: data[i][2]},
                        position,}

                //Little Data
                let little = {id: data[i][3],
                            data: {label: data[i][3]},
                            position,}
                
                //Checking to see if the pairing has already been put into the excel file 
                let pairing = data[i][2] + data[i][3]
                let pairingID = pairing.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
                if (pastPairings.includes(pairingID) == false){
                    let pairingJson = {id: pairingID,
                                    source: data[i][2],
                                    target: data[i][3],
                                    type: 'smoothstep'}
                    initialEdges.push(pairingJson)
                    pastPairings.push(pairingID)
                }

                //Checking if big has already been added
                if (pastFilipinos.includes(data[i][2]) == false){
                    initialNodes.push(big)
                    pastFilipinos.push(data[i][2])
                }

                //Checking if lil has already been added
                if (pastFilipinos.includes(data[i][3]) == false){
                    initialNodes.push(little)
                    pastFilipinos.push(data[i][3])
                }
            }       
                    
        }
        return res.status(200).send({message: "Succesful Call", nodes: initialNodes, edges: initialEdges})
    } 
    catch {
        return res.status(500).send({message: "Failed to fetch"})
    }
});

app.get('/pakwans', async (req, res) => {
    try{
        //Reading the sheet
        const position = { x: 0, y: 0 };
        const data = await readSheet();
        const pastFilipinos = [];
        const initialEdges = [];
        const initialNodes = [];
        const pastPairings = [];
        //Looping through all the data
        for (let i=1; i < data.length; i++){

            //Checking if the input was part of the fam
            if (data[i][1] == "PAKWANS"){

                //Big Data
                let big = {id: data[i][2],
                        data: {label: data[i][2]},
                        position,}

                //Little Data
                let little = {id: data[i][3],
                            data: {label: data[i][3]},
                            position,}
                
                //Checking to see if the pairing has already been put into the excel file 
                let pairing = data[i][2] + data[i][3]
                let pairingID = pairing.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
                if (pastPairings.includes(pairingID) == false){
                    let pairingJson = {id: pairingID,
                                       source: data[i][2],
                                       target: data[i][3],
                                    type: 'smoothstep'}
                    initialEdges.push(pairingJson)
                    pastPairings.push(pairingID)
                }

                //Checking if big has already been added
                if (pastFilipinos.includes(data[i][2]) == false){
                    initialNodes.push(big)
                    pastFilipinos.push(data[i][2])
                }

                //Checking if lil has already been added
                if (pastFilipinos.includes(data[i][3]) == false){
                    initialNodes.push(little)
                    pastFilipinos.push(data[i][3])
                }
            }       
                    
        }
        return res.status(200).send({message: "Succesful Call", nodes: initialNodes, edges: initialEdges})
    } 
    catch {
        return res.status(500).send({message: "Failed to fetch"})
    }
});

app.get('/basabuddies', async (req, res) => {
    try{
        //Reading the sheet
        const position = { x: 0, y: 0 };
        const data = await readSheet();
        const pastFilipinos = [];
        const initialEdges = [];
        const initialNodes = [];
        const pastPairings = [];
        //Looping through all the data
        for (let i=1; i < data.length; i++){

            //Checking if the input was part of the fam
            if (data[i][1] == "BASA BUDDIES"){

                //Big Data
                let big = {id: data[i][2],
                        data: {label: data[i][2]},
                        position,}

                //Little Data
                let little = {id: data[i][3],
                            data: {label: data[i][3]},
                            position,}
                
                //Checking to see if the pairing has already been put into the excel file 
                let pairing = data[i][2] + data[i][3]
                let pairingID = pairing.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
                if (pastPairings.includes(pairingID) == false){
                    let pairingJson = {id: pairingID,
                                    source: data[i][2],
                                    target: data[i][3],
                                    type: 'smoothstep'}
                    initialEdges.push(pairingJson)
                    pastPairings.push(pairingID)
                }

                //Checking if big has already been added
                if (pastFilipinos.includes(data[i][2]) == false){
                    initialNodes.push(big)
                    pastFilipinos.push(data[i][2])
                }

                //Checking if lil has already been added
                if (pastFilipinos.includes(data[i][3]) == false){
                    initialNodes.push(little)
                    pastFilipinos.push(data[i][3])
                }
            }       
                    
        }
        return res.status(200).send({message: "Succesful Call", nodes: initialNodes, edges: initialEdges})
    } 
    catch {
        return res.status(500).send({message: "Failed to fetch"})
    }
});

app.get('/siniganggang', async (req, res) => {
    try{
        //Reading the sheet
        const position = { x: 0, y: 0 };
        const data = await readSheet();
        const pastFilipinos = [];
        const initialEdges = [];
        const initialNodes = [];
        const pastPairings = [];
        //Looping through all the data
        for (let i=1; i < data.length; i++){

            //Checking if the input was part of the fam
            if (data[i][1] == "SINIGANGGANG"){

                //Big Data
                let big = {id: data[i][2],
                        data: {label: data[i][2]},
                        position,}

                //Little Data
                let little = {id: data[i][3],
                            data: {label: data[i][3]},
                            position,}
                
                //Checking to see if the pairing has already been put into the excel file 
                let pairing = data[i][2] + data[i][3]
                let pairingID = pairing.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
                if (pastPairings.includes(pairingID) == false){
                    let pairingJson = {id: pairingID,
                                       source: data[i][2],
                                       target: data[i][3],
                                       type: 'smoothstep'}
                    initialEdges.push(pairingJson)
                    pastPairings.push(pairingID)
                }

                //Checking if big has already been added
                if (pastFilipinos.includes(data[i][2]) == false){
                    initialNodes.push(big)
                    pastFilipinos.push(data[i][2])
                }

                //Checking if lil has already been added
                if (pastFilipinos.includes(data[i][3]) == false){
                    initialNodes.push(little)
                    pastFilipinos.push(data[i][3])
                }
            }       
                    
        }
        return res.status(200).send({message: "Succesful Call", nodes: initialNodes, edges: initialEdges})
    } 
    catch {
        return res.status(500).send({message: "Failed to fetch"})
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});