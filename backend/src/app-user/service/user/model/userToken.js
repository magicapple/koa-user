
/**
 * Module dependencies
 */

const moment = require('moment');
const jwt = require("jsonwebtoken");


const userConstant = require("../userConstant");

const TOKEN_EXPIRATION_DAY = GConfig.authToken.expireDay;
const TOKEN_EXPIRATION_SEC = 60 * 60 * 24 * GConfig.authToken.expireDay;





/**
 * Mongoose schema
 */


const UserTokenSchema = new GSchema({

    user: { type: GObjectId, ref: 'UserBaseInfo' },
    accessToken: { type: String, required: true },
    accessToken_iat : { type: Number },
    accessToken_exp : { type: Number },

    expireDate: { type: Date, required: true },

    ipv4: { type: String },
    ipv6: { type: String },
    userAgent: { type: String},
    deviceType: { type: String},


    weChatSessionKey: { type: String}


}, {
    toObject: { virtuals: false },
    toJSON: { virtuals: false },
    timestamps: true
});



/**
 * Mongoose schema index
 */



/**
 * Mongoose plugin
 */









/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */








/**
 * Mongoose Schema Statics
 *
 * http://mongoosejs.com/docs/guide.html
 *
 */


const field = {
    common : "-__v -updatedAt -user -accessToken_iat -accessToken_exp -expireDate -userAgent -deviceType -ipv4 -ipv6 -weChatSessionKey"
};



UserTokenSchema.statics.generateToken = function(user, koaContent, weChatSessionKey){

    const payload = {
        _id: user._id
    };

    const token  = jwt.sign(payload, GConfig.authToken.secret, {
        expiresIn: TOKEN_EXPIRATION_SEC
    });


    let newToken = {
        user: user._id,

        accessToken: token,
        expireDate : moment().add(TOKEN_EXPIRATION_DAY, 'days'),

        userAgent: koaContent.get('User-Agent'),
        deviceType : koaContent.userDevice
    };

    const decoded = jwt.decode(token);
    newToken.accessToken_iat = decoded.iat;
    newToken.accessToken_exp = decoded.exp;

    if (koaContent.ipv4) newToken.ipv4 = koaContent.ipv4;
    if (koaContent.ipv6) newToken.ipv6 = koaContent.ipv6;


    if (weChatSessionKey) newToken.weChatSessionKey = weChatSessionKey;

    // http://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate
    return UserToken.findOneAndUpdate({user:user._id, deviceType:newToken.deviceType}, newToken, {upsert:true, new:true}).select(field.common).exec();
};



UserTokenSchema.statics.removeToken = function(token){

    return UserToken.findOneAndRemove({accessToken:token}).select(field.common).exec();

};


//
// UserTokenSchema.statics.getUserFromToken = function(userid, token, callback){
//
//     UserToken.findOne({ user: userid, accessToken: token }, function (err, resultToken) {
//         if (err) return callback(err);
//
//         if (!resultToken) return checker.tokenNotFound(resultToken, callback);
//         if (resultToken.isExpired()) return checker.tokenExpired(resultToken.isExpired(), callback);
//
//
//         MUser.findOne({ _id: resultToken.user }, function (err, resultUser) {
//             if (err) return callback(err);
//
//             if (!resultUser) return checker.tokenUserNotFound(resultUser, callback);
//
//             return callback(null, resultUser);
//         });
//     });
//
//
// };





/**
 * Mongoose Schema Instance Methods
 *
 * Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.
 *
 * http://mongoosejs.com/docs/guide.html
 */




UserTokenSchema.methods.isExpired = function () {
    const date = moment(this.expireDate);
    return moment().isAfter(date);
};





/**
 * Register Model
 */

const UserToken = GMongoose.model("UserToken", UserTokenSchema);
module.exports = UserToken;
