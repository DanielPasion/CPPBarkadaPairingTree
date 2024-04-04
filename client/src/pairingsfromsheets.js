import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
    keyFile:'src/servicekey/google.json',
    scopes:['https://www.googleapis.com/auth/spreadsheets']
});

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

//Preprocessing the data for the flow chart
const position = { x: 0, y: 0 };
const initialNodesUbaes = []
const initialEdgesUbaes = []
const initialEdgesSiniGangGang = []
const initialNodesSiniGangGang = [] 
const initialEdgesPakwans = []
const initialNodesPakwans = [] 
const initialEdgesBasaBuddies = [] 
const initialNodesBasaBuddies = []
const pastPairings = []
const pastFilipinos = []


async function getUbaes(){

    //Reading the sheet
    const data = await readSheet();

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
            let pairingID = pairing.replace(/[^a-zA-Z0-9]/g, '')
            if (pastPairings.includes(pairingID) == false){
                let pairingJson = {id: pairingID,
                               source: big,
                               target: little,
                               type: 'smoothstep'}
                initialEdgesUbaes.push(pairingJson)
                pastPairings.push(pairingID)
            }

            //Checking if big has already been added
            if (pastFilipinos.includes(data[i][2]) == false){
                initialNodesUbaes.push(big)
                pastFilipinos.push(data[i][2])
            }

            //Checking if lil has already been added
            if (pastFilipinos.includes(data[i][3]) == false){
                initialNodesUbaes.push(little)
                pastFilipinos.push(data[i][3])
            }
        }       
                
    }
}

async function getSiniGangGang(){

    //Reading the sheet
    const data = await readSheet();

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
            let pairingID = pairing.replace(/[^a-zA-Z0-9]/g, '')
            if (pastPairings.includes(pairingID) == false){
                let pairingJson = {id: pairingID,
                               source: big,
                               target: little,
                               type: 'smoothstep'}
                initialEdgesSiniGangGang.push(pairingJson)
                pastPairings.push(pairingID)
            }

            //Checking if big has already been added
            if (pastFilipinos.includes(data[i][2]) == false){
                initialNodesSiniGangGang.push(big)
                pastFilipinos.push(data[i][2])
            }

            //Checking if lil has already been added
            if (pastFilipinos.includes(data[i][3]) == false){
                initialNodesSiniGangGang.push(little)
                pastFilipinos.push(data[i][3])
            }
        }       
                
    }

}

async function getBasaBuddies(){

    //Reading the sheet
    const data = await readSheet();

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
            let pairingID = pairing.replace(/[^a-zA-Z0-9]/g, '')
            if (pastPairings.includes(pairingID) == false){
                let pairingJson = {id: pairingID,
                               source: big,
                               target: little,
                               type: 'smoothstep'}
                initialEdgesBasaBuddies.push(pairingJson)
                pastPairings.push(pairingID)
            }

            //Checking if big has already been added
            if (pastFilipinos.includes(data[i][2]) == false){
                initialNodesBasaBuddies.push(big)
                pastFilipinos.push(data[i][2])
            }

            //Checking if lil has already been added
            if (pastFilipinos.includes(data[i][3]) == false){
                initialNodesBasaBuddies.push(little)
                pastFilipinos.push(data[i][3])
            }
        }       
                
    }

}

async function getPakwans(){

    //Reading the sheet
    const data = await readSheet();

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
            let pairingID = pairing.replace(/[^a-zA-Z0-9]/g, '')
            if (pastPairings.includes(pairingID) == false){
                let pairingJson = {id: pairingID,
                               source: big,
                               target: little,
                               type: 'smoothstep'}
                initialEdgesPakwans.push(pairingJson)
                pastPairings.push(pairingID)
            }

            //Checking if big has already been added
            if (pastFilipinos.includes(data[i][2]) == false){
                initialNodesPakwans.push(big)
                pastFilipinos.push(data[i][2])
            }

            //Checking if lil has already been added
            if (pastFilipinos.includes(data[i][3]) == false){
                initialNodesPakwans.push(little)
                pastFilipinos.push(data[i][3])
            }
        }       
                
    }

}

await getUbaes()
await getBasaBuddies()
await getPakwans()
await getSiniGangGang()