/**
 * Created by DELL on 2015/12/8.
 */
//var kms = new MongoInternals.RemoteCollectionDriver("mongodb://kms:kms@dev02.pek.cclaw.net:27017/kms");
//Pages = new Mongo.Collection('pages', { _driver: kms });

Pages = new Mongo.Collection('pages');
Segments = new Mongo.Collection('segments');
Paragraphs = new Mongo.Collection('paragraphs');
Phrases = new Mongo.Collection('phrases');

Meteor.methods({
    createSession: function(username, password){
        if(Meteor.isServer){
            AtlassianCrowd.instance().session.create(username, password, function (err, token) {
                if(err) {
                    return err;
                }
                else {
                    console.log(token);
                    AtlassianCrowd.instance().session.authenticate(token, function (err, res) {
                        if (err) {
                            return err;
                        }
                        else {
                            console.log(res);
                            return res;
                        }
                    });
                }
            });
        }
    },

    //get the token inside the session cookie
    headers: function() {
        if(Meteor.isServer){
            var header = headers.get(this);
            var cookieToken = header.cookie;
            if(cookieToken){
                var token = cookieToken.split('=');
                return token[1];
            }
            else{
                return undefined;
            }
        }
    },

    //use this token to authentificate from crowd and get some unrelated information but contain username
    authentification: function(token, option) {
        if(Meteor.isServer){
            Future = Npm.require('fibers/future');
            var myFuture = new Future();
            AtlassianCrowd.instance().session.authenticate(token, option, function (err, res) {
                if (err) {
                    console.log(err);
                    //return err;
                    myFuture.throw(err);
                }
                else {
                    console.log(res);
                    //return res;
                    myFuture.return(res);
                }
            });

            return myFuture.wait();
        }
    },

    //use this username to find user related information like email, username .....
    //but need to be modified to be inserted into mongodb database to maintain data consistency
    getUserInformation: function(username) {
        if(Meteor.isServer){
            Future = Npm.require('fibers/future');
            var myFuture = new Future();
            AtlassianCrowd.instance().user.find(username, function (err, res) {
                if (err) {
                    //throw err;
                    myFuture.throw(err);
                }
                else {
                    console.log(res);
                    myFuture.return(res);
                }
            });

            return myFuture.wait();
        }
    },

    //create user document into users collection within meteor
    loginHandler: function(userInformation){
        if(Meteor.isServer){

            console.log("harry on my god" + userInformation.name);

            var user = Meteor.users.findOne({
                username: userInformation.name
            });
            console.log(user);
            if(user){

                console.log("I am harry!!!");

                stampedToken = Accounts._generateStampedLoginToken();
                var hashStampedToken = Accounts._hashStampedToken(stampedToken);
                // Update the user's token in mongo

                //var userObject = {
                //    password: "123456",  //temporary solution
                //    username: "harryahaha",
                //    email: "19384348@qq.com",
                //    profile: {
                //        displayName: "harry jiang"
                //    }
                //};
                //userId = Accounts.createUser(userObject);


                Meteor.users.update(user._id, {
                    $push: {
                        'services.resume.loginTokens': hashStampedToken
                    }
                });

                return user;
            }
            else{
                //console.log("I am not harry!!!");

                var userObject = {
                    password: userInformation.password.link.href,  //temporary solution
                    username: userInformation.name,
                    email: userInformation.email,
                    profile: {
                        //displayName: userInformation["display-name"]
                    }
                };
                userId = Accounts.createUser(userObject);

                var user = Meteor.users.findOne({
                    username: userInformation.name
                });
                return user;
            }

        }
    },

    impersonate: function(userId) {
        //if(Meteor.isServer)
        //    check(userId, String);
        //if(Meteor.isServer){
        if (!Meteor.users.findOne(userId))
            throw new Meteor.Error(404, 'User not found');
        //if (!Meteor.user().isAdmin)
        //    throw new Meteor.Error(403, 'Permission denied');

        this.setUserId(userId);
    }

});


//AtlassianCrowd.instance().session.authenticate(token, function (err, res) {
//    if (err) {
//        throw err;
//    }
//    else {
//        console.log(res);
//    }
//})