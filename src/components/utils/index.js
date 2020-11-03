import _  from 'lodash';

export const makeDataObjForm = (key, label, value ) => {
    let result = {};
    
    key.forEach((item, i) => {
        result[item] = { 
            label: label[i] || '', 
            value: value[i] || '',
        }
    })

    return result
}

export const uniqueKey = (sheetName) => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return sheetName + '-' + s4() + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

export const calculator = (totalPrice) => {
    return totalPrice * 0.7
}

export const replaceContent = (kakaoSend) => {
    
    let { content, sendObj } = kakaoSend;
    if (!content) return 
    content = content.replace('[name]', sendObj['name'].value)
    const keys = Object.keys(sendObj)
    keys.forEach(id => {
        
        if(content.indexOf(`[${id}]`) === -1) return
        if(!sendObj[id]) return;
        const label = sendObj[id].label
        const value = sendObj[id].value
        content = content.replace(`[${id}]`, value ? `<br/>▶ ${label}: ${value}` : '' )
    })
    return content;
}

export const paginate = (item, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize

    return _(item)
        .slice(startIndex)
        .take(pageSize)
        .value();
}


export const makeImgURL = (images) => {
    var url = '';
    if(images){
        url = images.indexOf(',') !== -1 
            ? url = images.split(',')[0]
            : images 
        url = url.replace('https://drive.google.com/open?','https://drive.google.com/uc?export=download&')
    }   
    return url; 
}

export const numberOnly = price => {
    return Number(price.replace(/[^0-9]/g,""));
}

export const numberFormat = (price) => {
    price = price.toString().replace(/[^0-9]/g,"")
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



export const makeDataset = (dataset, keys, labels, showColumns=[]) => {
    let result = {}
    dataset.forEach(row => {
        const row_id = row[0]
        let temp = []
        keys.forEach((key, i) =>{
            temp.push ({
                key: key,
                label: labels[i],
                value: row[i],
                display: showColumns.indexOf(key) !== -1 
                    ? ''
                    : 'none'
            })
        })
        result[row_id] = temp
        
    })
    return result
}


