import { makeDataObjForm, uniqueKey } from '../components/utils';
import moment from 'moment';

export default async id => {
    if (!id) return 
    try{
        const sheetName = id.split('-')[0]
        const response = await window.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1YqcgYobCufCQLzLeRhfEbAZg779JR3OMUYoRTWcN_DY',
            range: `${sheetName}!A1:AM`,  
        })
        const data = response.result.values
        const key = data[0]
        const label = data[1]
        let value;
        // id에 new 있는 경우 초기값 지정
        if (id.indexOf('new') !== -1 ){
            value = [uniqueKey(sheetName), '', '신규', moment().format('YYYY. MM. DD HH:mm:ss')]
        
        }else{
            value = data.filter(row => row[0] === id)[0]
        }
        return makeDataObjForm(key, label, value)

    }catch(e){
        console.error('getSelectData Error:', e)
    }

}