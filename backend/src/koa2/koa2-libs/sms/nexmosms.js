/**
 * Created by jin on 8/21/17.
 */


const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: GConfig.smsNexmo.API_KEY,
    apiSecret: GConfig.smsNexmo.API_SECRET,
    debug: true
})



exports.sendSms = function (sender, recipient, message) {

    sender = sender || 'Nexmo'
    recipient = recipient || '8613564568304'
    message = message || '测试短信测试短信测试短信测试短信'

    const options = {
        type : 'unicode'
    }

    return new Promise(function(resolve, reject) {

        nexmo.message.sendSms(sender, recipient, message, options, function (err, data) {
            if (err){
                reject(err)
            }
            resolve(data)
        })
    });

}
