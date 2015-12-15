/**
 * Created by DELL on 2015/12/13.
 */
Template.header.onCreated(function(){
    if(Session.get('userInformation')){
        var user = Session.get('userInformation');

        Meteor.call('loginHandler', user, function(err, result){
            if(err){
                throw err;
            }
            else{
                //console.log(userId);

                Meteor.call('impersonate', result._id, function(err) {
                    //Session.set('user', user);
                    if (!err) {
                        Meteor.connection.setUserId(result._id);
                    }
                });


            }
        });
    }




    //var self = this;
    //Meteor.call('headers', function(error, data) {
    //    if(error){
    //        return error;
    //    }else{
    //        console.log(data);
    //        Meteor.call('authentification', data, "123.121.23.222", function(err, res){
    //            if (err) {
    //                throw err;
    //            }
    //            else {
    //                console.log(res);
    //                if(res.token === data){
    //                    Meteor.call('getUserInformation', res.user.name, function(err, user){
    //                        if (err) {
    //                            throw err;
    //                        }
    //                        else {
    //                            console.log(user);
    //
    //                            //console.log("fuck" + this);
    //                            self.subscribe("currentUser", user.name);
    //
    //                            Meteor.call('loginHandler', user, function(err, result){
    //                                if(err){
    //                                    throw err;
    //                                }
    //                                else{
    //                                    //console.log(userId);
    //
    //                                    Meteor.call('impersonate', result._id, function(err) {
    //                                        //Session.set('user', user);
    //                                        if (!err) {
    //                                            Meteor.connection.setUserId(result._id);
    //                                        }
    //                                    });
    //
    //
    //
    //                                }
    //                            });
    //
    //
    //
    //
    //                        }
    //                    });
    //                }
    //            }
    //        });
    //    }
    //});

});


Template.header.events({
    'submit #login': function(e, template) {
        console.log("harry");
        e.preventDefault();
        var username = $(e.target).find("#username").val();
        var password = $(e.target).find("#password").val();
        Meteor.loginWithCrowd(username, password, function(err, result){
            if(err){
                alert(err);
            }
            else{

                //Meteor.call('createSession', username, password, function(err, res){
                //    if (err) {
                //        throw err;
                //    }
                //    else {
                //        console.log("harry");
                //        console.log(res);
                //
                //
                //    }
                //});

                console.log("login successfully!");
                alert("login successfully!");
            }
        });
    },

    'click #logout': function(e) {
        e.preventDefault();
        Meteor.logout();
        //Meteor.subscribe("currentUser", null);

        Router.go('documentsList');
    }
});


Template.header.helpers({
    userExists: function(){
       return Meteor.userId(); //|| Session.get("user");
    },

    username: function(){
        /*if(Session.get("user"))
            return Session.get("user").name;
        else*/ if(Meteor.user())  //to confirm there is a user has logged in
            return Meteor.user().username;
        else
            Meteor.logout();
    }


})