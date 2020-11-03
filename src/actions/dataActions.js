import { 
    FETCH_DATA, 
    UPDATE_DATA, 
    FETCH_TEMPLATE, 
    INITIALIZE_DATA,
    CHECKED_DATA,
} from './types';
import history from '../history';
import kakaoSendAPI from '../apis/kakaoSendAPI';
import { handleClientInit } from '../apis/googleSheetAPI'
import getData from '../apis/getData';
import { makeDataset } from '../components/utils';

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

// UPDATE GOOGLE SHEET DATA
export const updateData = (newUserRow) => async (dispatch) => {
    
    const id = newUserRow[0];
    const sheetName = id.split('-')[0]
    const prevData = await getData(id)
    

    let newData = prevData.map(user => user[0] === id ? newUserRow: user )
    
    const prevDataId = prevData.map(item => item[0]);
    if( prevDataId.indexOf(id) === -1){
        newData = [...prevData, newUserRow ]
    }

    window.gapi.load('client:auth2', ()=>{
        handleClientInit().then( async () => {
            if (window.gapi.auth2.getAuthInstance()){
                try{
                    var response = await window.gapi.client.sheets.spreadsheets.values
                        .update({
                            spreadsheetId: '1YqcgYobCufCQLzLeRhfEbAZg779JR3OMUYoRTWcN_DY', 
                            range: `${sheetName}!A1:AM`, 
                            valueInputOption: 'USER_ENTERED',
                    }, {
                        range: `${sheetName}!A1:AM`,
                        values: newData
                    });

                    if ( response.status === 200 ){
                        alert("저장이 완료되었습니다.");
                        dispatch({ type: UPDATE_DATA, payload: newData })
                        
                    }
                } catch(e){
                    console.error('updateData Error: ' + e)
                }

            }
        })
    });
}

// FETCH GOOGLE SHEET TEMPLATE DATA
export const fetchTemplate = () => async dispatch => {
    try{
        const response = await window.gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1YqcgYobCufCQLzLeRhfEbAZg779JR3OMUYoRTWcN_DY',
            range: 'template!A1:AM',  
        })
        dispatch({
            type: FETCH_TEMPLATE,
            payload: response.result.values
        })
    }catch(e){
        console.error('fetchTemplate Error: ' + e)
        history.push('/')
    }
}

// SEND KAKAO MESSAGE (알림톡)
export const sendKakaoMsg = (sendObjList, inputs, type) => async dispatch =>  {
    const typeMap = {
        confirm: '접수완료',
        reject: '반려완료',
        done: '처리완료',
    }
    
    
    

    try {
        sendObjList.forEach( async sendObj => {
            let { tempNum, name, phone } = sendObj;
            
            phone = String(phone.value)[0] !== '0' ? '0' + phone.value : phone.value
            let data = {
                tmp_number: tempNum,
                kakao_sender: "01092066598",
                kakao_phone : phone, // 
                kakao_name : name.value,
                kakao_080 : "N",
                kakao_res : "",
                kakao_res_date : "",
                TRAN_REPLACE_TYPE : "",
            }

            for (var i = 1; i < 11; i ++ ){
                let item = sendObj[`add${i}`]
                if (item){
                    data[`kakao_add${i}`] = item.value ? `\n▶ ${item.label}: ` + item.value : ''
                }
            }
            const response = await kakaoSendAPI.post('/api/send/notice.do', data)
            
            if (response.status === 200) alert("알림톡 발송이 완료되었습니다.");
        })

        const userRow = Object.values(inputs).map(item => item.value);
        var newUserRow = [...userRow];
        newUserRow[2] = typeMap[type]
        dispatch(updateData(newUserRow));
        
    }catch(e){
        console.error('kakaoSend error: ', e)
    }
    
}

export const checkedData = row => async dispatch => {
    console.log(row)
    const keys = row.map(item => item.key);
    
    let product_id = ''
    if( keys.indexOf('product_id') !== -1 ){
        product_id = row[keys.indexOf('product_id')].value
    }else{
        product_id = row[keys.indexOf('row_id')].value
    }

    let productData = []
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1YqcgYobCufCQLzLeRhfEbAZg779JR3OMUYoRTWcN_DY',
        range: `product!A1:AM`,  
    })

    const result = response.result.values
    const titles = result[0]
    const labels = result[1]
    
    const data = result.filter(row => row[0] === product_id )
    
    productData = makeDataset(data, titles, labels)[product_id]

    
    dispatch({
        type: CHECKED_DATA,
        payload:{
            productData,
            checkedId: row[0].value
        }
    })
}



// INITIALIZE DATA
export const initializeData = () => {
    return {
        type: INITIALIZE_DATA,
    }
}


// INSERT NEW DATA TO GOOGLE SHEET
// export const insertFormUser = (newUserRow) => async dispatch => {
//     const sheetName = newUserRow[0].split('-')[0]
//     window.gapi.load('client:auth2', ()=>{
//         handleClientInit().then( async () => {
//             if (window.gapi.auth2.getAuthInstance()){
//                 try{
//                     var response = await window.gapi.client.sheets.spreadsheets.values
//                         .append({
//                             spreadsheetId: '1YqcgYobCufCQLzLeRhfEbAZg779JR3OMUYoRTWcN_DY', 
//                             range: `${sheetName}!A1:AM`, 
//                             valueInputOption: 'USER_ENTERED',
//                     }, {
//                         range: `${sheetName}!A1:AM`,
//                         values: [
//                             newUserRow
//                         ]
//                     });

//                     if ( response.status === 200 ){
//                         alert("저장이 완료되었습니다.");
//                         dispatch(fetchData(sheetName))
//                         history.push('/')
                        
//                     }
//                 } catch(e){
//                     console.error('insertFormUser Error: ' + e)
//                 }

//             }
//         })
//     });
// }
