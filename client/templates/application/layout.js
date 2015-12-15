/**
 * Created by DELL on 2015/12/15.
 */

Template.layout.onCreated(function(){
    //hasAuthenticated: function(){
    //
    //
    var self = this;
    Meteor.call('headers', function(error, data) {
        if(!data || error){
            //return error;
            //this.next();
            //Router.next();
            //self.notViaAuth = true;
            return true;
        }else{
            self.viaAuth = true;  //very possibly through Auth(already login in Atlassian product)
            //self.notViaAuth = false;

            console.log(data);
            Meteor.call('authentification', data, "123.121.23.222", function(err, res){
                if (err) {
                    //throw err;
                    //this.next();
                    //Router.next();
                    return true;
                }
                else {
                    console.log(res);
                    if(res.token === data){
                        Meteor.call('getUserInformation', res.user.name, function(err, user){
                            if (err) {
                                //this.next();
                                //Router.next();
                                return true;
                            }
                            else {
                                console.log(user);

                                self.hasAlreadyAuth = true;

                                //console.log("fuck" + this);
                                //self.subscribe("currentUser", user.name);
                                self.subscribe("currentUser", user.name);

                                Meteor.call('loginHandler', user, function(err, result){
                                    if(err){
                                        //throw err;
                                        //this.next();
                                        //Router.next();
                                        //return true;
                                    }
                                    else{
                                        //console.log(userId);
                                        //this.next();
                                        //Router.next();

                                        //self.subscribe("currentUser", result.username);

                                        //Session.set('userInformation', result.username);

                                        //console.log("haryahaha"+result._id);

                                        Meteor.call('impersonate', result._id, function(err) {
                                            //Session.set('user', user);
                                            if (!err) {

                                                //self.subscribe("currentUser", result.username);
                                                Meteor.connection.setUserId(result._id);
                                            }
                                        });
                                        //return true;
                                    }
                                });
                            }
                        });
                    }else{
                        //Router.next();
                        //this.next();
                        return true;
                    }
                }
            });
        }
    });
    ////}
});




Template.layout.helpers({
    auth: function(){
        //console.log(Session.get("hasAuthentificated"));
        return Template.instance().viaAuth;
    },
    hasAuth: function(){
        return Template.instance().hasAlreadyAuth || Meteor.userId();
    }
});