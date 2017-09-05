


/**
 * Mongoose schema
 */



const UserRoleSchema = new GSchema({

    name: { type: String },
    displayName: { type: String },
    permissions: [{ type: String}]

}, {
    toObject: { virtuals: false },
    toJSON: { virtuals: false },
    timestamps: true
});


/**
 * Mongoose schema index
 */


// UserRoleSchema.index({username: 1});




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
// UserRoleSchema.pre('save', function (next) {
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

UserRoleSchema.statics.findAll = function(query){
    return UserBaseInfo.find(query).select(field.common).exec();
};
UserRoleSchema.statics.find1 = function(query){
    return UserBaseInfo.findOne(query).select(field.common).exec();
};
UserRoleSchema.statics.find1ById = function(id){
    return UserBaseInfo.findById(id).select(field.common).exec();
};





/**
 * Mongoose Schema Instance Methods
 *
 * Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.
 *
 * http://mongoosejs.com/docs/guide.html
 */


//
//
// UserRoleSchema.methods.comparePasswordSync = function (password) {
//     return bcrypt.compareSync(password, this.password);
// };



/**
 * Register Model
 */

const UserRole = GMongoose.model("UserRole", UserRoleSchema);
module.exports = UserRole;
