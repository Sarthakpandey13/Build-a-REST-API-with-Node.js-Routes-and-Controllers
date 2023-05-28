'use strict';

class ResponseBody {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        console.log(statusCode, message, data);
    }
}

const sendResponse = (ResponseBody) => {
    console.log(ResponseBody);
    const { statusCode } = ResponseBody;

    if (!statusCode) {
        responseBody = new ResponseBody(408, 'Response Data Not Found!');
    }

    return response.status(statusCode).json(responseBody);
};


module.exports = { ResponseBody, sendResponse };