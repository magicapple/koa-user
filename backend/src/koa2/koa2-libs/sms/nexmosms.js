/**
 * Created by jin on 8/21/17.
 */


const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: GConfig.smsNexmo.API_KEY,
    apiSecret: GConfig.smsNexmo.API_SECRET,
})


const from = 'Nexmo'
const to = 'TO_NUMBER'
const text = 'A text message sent using the Nexmo SMS API'

nexmo.message.sendSms(from, to, text)

