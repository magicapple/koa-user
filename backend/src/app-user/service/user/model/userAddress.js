


/**
 * Mongoose schema
 */



const UserAddressSchema = new GSchema({

    user : [{ type: GSchema.Types.ObjectId, ref: 'UserBaseInfo' }],

    addressCodeName: { type: String },
    
    province: { type: String, trim: true, required: true },  // 由于微信登录等第三方登录，所以注册时可以不填写
    city: { type: String, trim: true, required: true },
    district: { type: String, trim: true, required: true },

    detailAddress: { type: String },
    postalCode: { type: String, trim: true },


    contactPerson: { type: String, trim: true, required: true },
    contactPersonMobilePhone: { type: String, trim: true, required: true },
    contactPersonFixedPhone: { type: String, trim: true },
    contactPersonEmail: { type: String, trim: true },




}, {
    toObject: { virtuals: false },
    toJSON: { virtuals: false },
    timestamps: true
})


/**
 * Mongoose schema index
 */


// UserAddressSchema.index({username: 1})




/**
 * Mongoose plugin
 */

// UserAddressSchema.plugin(mongooseTimestamps)




/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


//
// UserAddressSchema.pre('save', function (next) {
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






/**
 * Mongoose Schema Statics
 *
 * http://mongoosejs.com/docs/guide.html
 *
 */


const field = {
    common : "-__v -updatedAt"
}

UserAddressSchema.statics.findAll = function(query){
    return UserAddress.find(query).select(field.common).exec()
}
UserAddressSchema.statics.find1 = function(query){
    return UserAddress.findOne(query).select(field.common).exec()
}
UserAddressSchema.statics.find1ById = function(id){
    return UserAddress.findById(id).select(field.common).exec()
}





/**
 * Mongoose Schema Instance Methods
 *
 * Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.
 *
 * http://mongoosejs.com/docs/guide.html
 */








/**
 * Register Model
 */

const UserAddress = GMongoose.model("UserAddress", UserAddressSchema)
module.exports = UserAddress
