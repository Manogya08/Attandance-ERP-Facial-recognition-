import api from './API_URL'
const check_session = async (token, role) => {

    const data = {
        token: token,
        role: role
    }
    var res = {};
    try {
        res = await fetch(api + '/verify', { method: 'POST', headers: { 'Content-type': 'application/json' }, body: JSON.stringify(data) })
            .then(res => res.json())
    }
    catch (err) {
        console.log(err);
        res.error = err
    }



    return res





}

export default check_session