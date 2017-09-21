
const bcrypt = require('bcrypt')


const roleAdmin = GConfig.role.admin


const saltRounds = 12

/**
 * Mongoose schema
 */

const encryptPassword = function (password) {

    let salt = bcrypt.genSaltSync(saltRounds)
    return bcrypt.hashSync(password, salt)
}


const UserBaseInfoSchema = new GSchema({

    username: { type: String, unique: true, trim: true},  // 由于微信登录等第三方登录，所以注册时可以不填写
    mobilePhone: { type: String, unique: true, sparse: true},
    email: { type: String, unique: true, lowercase: true, trim: true, sparse: true },

    password: { type: String, required: true, default: '20170101', set : encryptPassword},

    roles : [{ type: GSchema.Types.ObjectId, ref: 'UserRole' }],

    firstName: { type: String, trim: true},
    lastName: { type: String, trim: true },
    fullName: { type: String, trim: true},

    nickname: {type: String},
    gender: {type: Number, min: 1, max: 10},
    birthday: {
        year  : {type : Number, min : 1800, max : 9999},
        month : {type : Number, min : 1, max : 12},
        day   : {type : Number, min : 1, max : 31}
    },
    marriage: {type: Number, min: 1, max: 10}, // 1未婚，2已婚，3离婚，4二婚，5二离

    avatar: {type: String},


    idGithub: {type: String },
    idWeChatOpenID: {type: String},
    idWeChatUnionID: {type: String},
    idQQ: {type: String},
    idWeibo: {type: String}


}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true
})


/**
 * Mongoose schema index
 */


// UserBaseInfoSchema.index({username: 1})




/**
 * Mongoose plugin
 */

// UserSchema.plugin(mongooseTimestamps)




/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


//
// UserSchema.pre('save', function (next) {
//     var user = this
//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 return next(err)
//             }
//             bcrypt.hash(user.password, salt, function (err, hash) {
//                 if (err) {
//                     return next(err)
//                 }
//                 user.password = hash
//                 next()
//             })
//         })
//     } else {
//         return next()
//     }
// })




UserBaseInfoSchema.virtual('isAdmin').get(function () {
    let isPassed = false
    this.roles.forEach( (role )=> {
        if (role && role._id && role._id.equals( GMongoose.Types.ObjectId(roleAdmin)) ) {
            isPassed = true
        }
    })

    return isPassed
})




/**
 * Mongoose Schema Statics
 *
 * http://mongoosejs.com/docs/guide.html
 *
 */


const field = {
    common : "-__v -updatedAt -password"
}

UserBaseInfoSchema.statics.findAll = function(query){
    return UserBaseInfo.find(query).select(field.common).populate('roles').exec()
}
UserBaseInfoSchema.statics.find1 = function(query){
    return UserBaseInfo.findOne(query).select(field.common).populate('roles').exec()
}
UserBaseInfoSchema.statics.find1ById = function(id){
    return UserBaseInfo.findById(id).select(field.common).populate('roles').exec()
}





/**
 * Mongoose Schema Instance Methods
 *
 * Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.
 *
 * http://mongoosejs.com/docs/guide.html
 */




UserBaseInfoSchema.methods.comparePasswordSync = function (password) {
    return bcrypt.compareSync(password, this.password)
}


UserBaseInfoSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}


UserBaseInfoSchema.methods.comparePasswordCB = function (password, callback) {

    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) {
            return callback(err)
        }
        callback(null, isMatch)
    })
}


UserBaseInfoSchema.methods.encryptPassword = encryptPassword






/**
 * Register Model
 */

const UserBaseInfo = GMongoose.model("UserBaseInfo", UserBaseInfoSchema)
module.exports = UserBaseInfo
