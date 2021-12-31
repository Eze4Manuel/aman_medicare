import request from '../assets/utils/http-request';


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


lib.saveNewProfile = async (data) => {
    let uri = '';
    try {
        uri = `?save-new-profile`;
 
        return await (await request.post(uri, data))
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.getPrincipal = async (data) => {
    let uri = '';
    try {
        uri = `?getPrincipal`;
 
        return await (await request.post(uri, data)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.getDependent = async (data) => {
    let uri = '';
    try {
        uri = `?getDependents`;
 
        return await (await request.post(uri, data)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.sendImage = async (data) => {
   
    let uri = '';
    try {
        uri = `?upload`;
 
        return await (await request.post(uri, data)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}



lib.validatSocial = async (data) => {
    let uri = '';
    try {
        uri = `?validate_social`;
 
        return await (await request.post(uri, data)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}



lib.saveDependent= async (data) => {
    let uri = '';
    try {
        uri = `?save-dependent-profile`;
        return await (await request.post(uri, data))
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.getProviders= async (data) => {
    let uri = '';
    try {
        uri = `?getProviders`;
        return await (await request.post(uri, data)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.updateBio= async (data) => {
    let uri = '';
    try {
        uri = `?update-profile`;
        return await (await request.post(uri, data)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}


lib.suggestFacility= async (data) => {
    let uri = '';
    try {
        uri = `?saveProvider`;
        return await (await request.post(uri, data)).data
    } catch (e) {
        return { status: 'error', msg: e?.response?.data?.msg || e?.message }
    }
}






export default lib;