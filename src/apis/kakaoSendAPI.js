import axios from 'axios';

export default axios.create({
    baseURL : "https://www.apiorange.com",
    headers: {
        'Content-Type': "application/json; charset=utf-8",
        'Authorization': process.env.REACT_APP_KAKAOSEND_AUTHORIZATION
    }
})



