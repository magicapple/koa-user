
const bcrypt = require('bcrypt');



const saltRounds = 10;

/**
 * Mongoose schema
 */

const encryptPassword = function (password) {
    let salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};


const UserBaseInfoSchema = new GSchema({

    username: { type: String, unique: true, trim: true},
    mobilePhone: { type: String, unique: true},
    email: { type: String, unique: true, lowercase: true, trim: true },

    password: { type: String, required: true, default: '20170101', set : encryptPassword},

    firstName: { type: String, trim: true},
    lastName: { type: String, trim: true },
    fullName: { type: String, trim: true},

    nickname: {type: String},

    avatar: {type: String},


    idGithub: {type: String },
    idWeChatUnique: {type: String},
    idQQ: {type: String},
    idWeibo: {type: String}


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
    common : "-__v -updatedAt -password"
};

UserBaseInfoSchema.statics.findAll = function(query){
    return UserBaseInfo.find(query).select(field.common).exec();
};
UserBaseInfoSchema.statics.find1 = function(query){
    return UserBaseInfo.findOne(query).select(field.common).exec();
};
UserBaseInfoSchema.statics.find1ById = function(id){
    return UserBaseInfo.findById(id).select(field.common).exec();
};





/**
 * Mongoose Schema Instance Methods
 *
 * Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.
 *
 * http://mongoosejs.com/docs/guide.html
 */




// UserBaseInfoSchema.methods.comparePassword = function (passw) {
//
//     return bcrypt.compareSync(passw, this.password);
// };
//
//
// UserBaseInfoSchema.methods.comparePasswordCB = function (passw, callback) {
//     bcrypt.compare(passw, this.password, function (err, isMatch) {
//         if (err) {
//             return callback(err);
//         }
//         callback(null, isMatch);
//     });
// };
//
//
// UserBaseInfoSchema.methods.encryptPassword = encryptPassword;
//


/**
 * Register Model
 */

const UserBaseInfo = GMongoose.model("UserBaseInfo", UserBaseInfoSchema);
module.exports = UserBaseInfo;
