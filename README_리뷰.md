## 구글시트 연동

-   https://docs.google.com/spreadsheets/d/1YqcgYobCufCQLzLeRhfEbAZg779JR3OMUYoRTWcN_DY/edit#gid=1381853070

```
// FETCH GOOGLE SHEET DATA
export const fetchData = (sheetName) => async dispatch => {
    try{
        const response = await window.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1YqcgYobCufCQLzLeRhfEbAZg779JR3OMUYoRTWcN_DY',
            range: `${sheetName}!A1:AM`,
        })
        const result = response.result.values
        dispatch({
            type: FETCH_DATA,
            payload: result,
        })

    }catch(e){
        console.error('fetchData Error: ' + e)
    }
}
```
