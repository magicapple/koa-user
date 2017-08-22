
const request = require('request')
const crypto = require('crypto')
const Buffer = require("buffer").Buffer;


const config = {
    SMS_USER : '',
    SMS_KEY : '',
    templateId : 1
}


var param = {
    'msgType':0,
    'smsUser':'***',
    'templateId' : 1,
    'phone' : 13112345678,
    'vars' : '{%code%:123456}'
}


function md5(data) {

    const buf = new Buffer(data);
    const str = buf.toString("binary");
    return crypto.createHash("md5").update(str).digest("hex");
}


function getSign(dict, smsKey){
    let result = {}
    const keys = Object.keys(dict).sort();

    for (let i = 0, n = keys.length, key; i < n; ++i) {
        key = keys[i];
        console.log(key);
        result[key] = dict[key];
    }

    let param_str = ""

    for(const key in sorted_param){
        if (sorted_param.hasOwnProperty(key)) {
            param_str += (key + '=' + result[key] + '&')
        }
    }

    param_str = smsKey + '&' + param_str + smsKey

    const sign = md5(param_str)

    return sign;
}




var sign = getSign(param, config.SMS_KEY);

param['signature'] = sign.toUpperCase();

