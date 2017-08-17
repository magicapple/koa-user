/**
 * Created by jin on 8/16/17.
 */

const moment = require('moment')


/**
 * Mongoose schema
 */

const CaptchaSchema = new GSchema({

    visitorId: { type: String, trim: true},
    captchaId: { type: String, trim: true},
    type: { type: String},

    code: { type: String, trim: true },
    expireDate: { type: Date, required: true }


}, {
    toObject: { virtuals: false },
    toJSON: { virtuals: false },
    timestamps: true
});




/**
 * Mongoose schema index
 */


// UserBaseInfoSchema.index({username: 1});




/**
 * Mongoose plugin
 */

// UserSchema.plugin(mongooseTimestamps);




/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


//
// UserSchema.pre('save', function (next) {
//     var user = this;
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, function (err, hash) {
//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;
//                 next();
//             });
//         });
//     } else {
//         return next();
//     }
// });




/**
 * Mongoose Schema Statics
 *
 * http://mongoosejs.com/docs/guide.html
 *
 */


const field = {
    common : "-__v -updatedAt"
};

CaptchaSchema.statics.findAll = function(query){
    return Captcha.find(query).select(field.common).exec();
};
CaptchaSchema.statics.find1 = function(query){
    return Captcha.findOne(query).select(field.common).exec();
};
CaptchaSchema.statics.find1ById = function(id){
    return Captcha.findById(id).select(field.common).exec();
};





/**
 * Mongoose Schema Instance Methods
 *
 * Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.
 *
 * http://mongoosejs.com/docs/guide.html
 */


CaptchaSchema.methods.isExpired = function () {
    const date = moment(this.expireDate);
    return moment().isAfter(date);
};



/**
 * Register Model
 */

const Captcha = GMongoose.model("Captcha", CaptchaSchema);
module.exports = Captcha;
