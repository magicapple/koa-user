/**
 * Created by jinwyp on 4/14/17.
 */



let MUser = require('./model/userBaseInfo');



MUser.signUp = (user) => {
    return MUser.create(user);
};


module.exports = MUser
