import request from '../assets/utils/http-request';
import helpers from '../core/Helpers';


const lib = {}

lib.register = async (data) => {
    let uri = '';
    console.log(data);
    try {
        uri = `?regUser`;
        return await (await request.post(uri, data))
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}

lib.login = async (data) => {
    let uri = '';
    try {
        uri = `?login`;
        console.log(data);
        return await (await request.post(uri, data))
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.saveNewProfile = async (data, header) => {
    let uri = '';
    try {
        uri = `?save-new-profile`;
        console.log(header);
        request.defaults.headers['Content-Type'] = 'multipart/form-data';
        return await (await request.post(uri, data))
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.saveDependent= async (data) => {
    let uri = '';
    try {
        uri = `?save-dependent-profile`;
        console.log(data);
        return await (await request.post(uri, data))
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.getProviders= async (data) => {
    let uri = '';
    try {
        uri = `?getProviders`;
        return await (await request.post(uri))
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}






export default lib;