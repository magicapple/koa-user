/**
 * Created by jin on 8/16/17.
 */



/**
 * Created by jin on 8/16/17.
 */



/**
 * Mongoose schema
 */

const VisitorSchema = new GSchema({

    visitorId: { type: String, trim: true},
    ipv4: { type: String },
    ipv6: { type: String },
    userAgent: { type: String},
    deviceType: { type: String},


    browser: { type: String},
    browserVersion: { type: String},

    OS: { type: String},
    OSVersion: { type: String},

    isMobile: { type: Boolean},
    isDesktop: { type: Boolean},


}, {
    toObject: { virtuals: false },
    toJSON: { virtuals: false },
    timestamps: true
});




/**
 * Mongoose schema index
 */


// VisitorSchema.index({username: 1});




/**
 * Mongoose plugin
 */

// VisitorSchema.plugin(mongooseTimestamps);




/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


//
// VisitorSchema.pre('save', function (next) {
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

VisitorSchema.statics.findAll = function(query){
    return Visitor.find(query).select(field.common).exec()
}
VisitorSchema.statics.find1 = function(query){
    return Visitor.findOne(query).select(field.common).exec()
}
VisitorSchema.statics.find1ById = function(id){
    return Visitor.findById(id).select(field.common).exec()
}





/**
 * Mongoose Schema Instance Methods
 *
 * Instances of Models are documents. Documents have many of their own built-in instance methods. We may also define our own custom document instance methods too.
 *
 * http://mongoosejs.com/docs/guide.html
 */

/*

VisitorSchema.methods.isExpired = function () {
    const date = moment(this.expireDate)
    return moment().isAfter(date);
};


*/

/**
 * Register Model
 */

const Visitor = GMongoose.model("Visitor", VisitorSchema)
module.exports = Visitor
