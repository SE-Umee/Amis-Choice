export const fetchGet = async (apiName) => {
    let response = await fetch(`http://192.168.18.86:3002/api${apiName}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    let jsonResponse = await response.json();

    return jsonResponse;
};

export const fetchPost = async (apiName, data) => {
    let response = await fetch(`http://192.168.18.86:3002/api${apiName}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: data,
    });
    let jsonResponse = await response.json();

    return jsonResponse;
};