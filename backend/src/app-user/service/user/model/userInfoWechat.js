/**
 * Created by jin on 5/2/17.
 */





/**
 * Mongoose schema
 */



const UserInfoWeChatSchema = new GSchema({

    unionid: { type: String},
    openid: { type: String},

    nickName: { type: String},
    gender: {type: Number, min: 0, max: 10},


    avatarUrl: { type: String},

    country: { type: String},
    province: { type: String},
    city: { type: String},

    language: { type: String}

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
    common : "-__v -updatedAt"
};

UserInfoWeChatSchema.statics.findAll = function(query){
    return UserInfoWeChat.find(query).select(field.common).exec();
};
UserInfoWeChatSchema.statics.find1 = function(query){
    return UserInfoWeChat.findOne(query).select(field.common).exec();
};
UserInfoWeChatSchema.statics.find1ById = function(id){
    return UserInfoWeChat.findById(id).select(field.common).exec();
};





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

const UserInfoWeChat = GMongoose.model("UserInfoWeChat", UserInfoWeChatSchema);
module.exports = UserInfoWeChat;
