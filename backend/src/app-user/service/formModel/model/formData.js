/**
 * Created by jin on 8/31/17.
 */


/**
 * Created by jin on 8/16/17.
 */



/**
 * Mongoose schema
 */

const FormDataSchema = new GSchema({

    modelSchemaId: { type: String},
    postData: { type: String}

}, {
    toObject: { virtuals: false },
    toJSON: { virtuals: false },
    timestamps: true
})




/**
 * Mongoose schema index
 */


// FormDataSchema.index({username: 1})




/**
 * Mongoose plugin
 */

// FormDataSchema.plugin(mongooseTimestamps)




/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


//
// FormDataSchema.pre('save', function (next) {
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

FormDataSchema.statics.findAll = function(query){
    return FormData.find(query).select(field.common).exec()
}
FormDataSchema.statics.find1 = function(query){
    return FormData.findOne(query).select(field.common).exec()
}
FormDataSchema.statics.find1ById = function(id){
    return FormData.findById(id).select(field.common).exec()
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

const FormData = GMongoose.model("FormData", FormDataSchema)
module.exports = FormData


