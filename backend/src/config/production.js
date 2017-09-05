/**
 * Created by JinWYP on 23/01/2017.
 */


const path = require("path")

module.exports = {
    pathViewTemplate : path.join(__dirname, '../views/dist'),

    smsNexmo : {
        API_KEY : '1',
        API_SECRET : '2'
    },

    smsAliyun: {
        AccessKeyId : '3',
        AccessKeySecret : '4'
    }
}

