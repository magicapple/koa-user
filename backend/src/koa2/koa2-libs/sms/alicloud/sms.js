/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
const SMSClient = require('@alicloud/sms-sdk')

// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = GConfig.smsAliyun.AccessKeyId
const secretAccessKey = GConfig.smsAliyun.AccessKeySecret


//初始化sms_client
let smsClient = new SMSClient({
    accessKeyId : accessKeyId,
    secretAccessKey: secretAccessKey
})

const SMSTemplate = {
    signUp : 'SMS_87570015'
}

exports.SMSTemplate = SMSTemplate


exports.sendCode = function (recipient, code, template ) {

    recipient = recipient || '13564568304'
    message =  {
        code : code || '测试短信,测试短信,测试短信,测试短信!'
    }

    template = template || SMSTemplate.signUp

    return smsClient.sendSMS({
        PhoneNumbers: recipient,
        SignName: '杰酷',
        TemplateCode: template,
        TemplateParam: JSON.stringify(message)
    })
}


