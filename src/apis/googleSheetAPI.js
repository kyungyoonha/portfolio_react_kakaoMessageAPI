export const handleClientInit = () => {
    return window.gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_APIKEY,
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets"
    })
}


