export default async id => {
    try{
        const sheetName = id.split('-')[0]
        const response = await window.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1YqcgYobCufCQLzLeRhfEbAZg779JR3OMUYoRTWcN_DY',
            range: `${sheetName}!A1:AM`,  
        })
        
        return response.result.values;
    }catch(e){
        console.error('getData Error:', e)
    }
}