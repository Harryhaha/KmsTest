/**
 * Created by DELL on 2015/12/8.
 */

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){
        //return [Meteor.subscribe('posts'), Meteor.subscribe('comments')]; //这是路由器顶级订阅，根据实际需要可以在其他地方订阅！！
        //return [Meteor.subscribe('posts'), Meteor.subscribe('notifications')];
        //return Meteor.subscribe('pages');


        //if(Session.get('userInformation')){
        //    return Meteor.subscribe('currentUser', Session.get('userInformation').name);
        //}
    }
});


DocumentsListController = RouteController.extend({
    template: 'documentsList',
    waitOn: function(){
        return [
            Meteor.subscribe('pages'),      //always only one document there
            Meteor.subscribe('segments')
        ]
    },
    data: function() {
        return Pages.findOne({kmsTitle: "Home"});
    }
});

Router.route('/', {
    name: 'documentsList'

});


/*
Router.route('/', {
    name: 'documentsList',
    data: function() {
        return Pages.findOne({kmsTitle: "Home"});
            //segments: Segments.find({})
    }
});
*/


Router.route('/:id',{    //this id is the segment id within the story of pages
    name: 'documentDetail',
    waitOn: function(){
        return [
            Meteor.subscribe('singleDocument', this.params.id),
            Meteor.subscribe('allParagraphsBelongToSegment', this.params.id),
            Meteor.subscribe('allPhrases')

        ];
    },
    data: function(){return Segments.findOne(this.params.id);}
});

//var authentificate = function(){

    //var self = this;
    //if(Meteor.isServer){
    //    var Future = Npm.require('fibers/future');
    //    var header = headers.get(this);
    //    var cookieToken = header.cookie;
    //    var tokenArray = cookieToken.split('=');
    //    var token = tokenArray[1];
    //    if(token){  //means possibly user has login in Atlassian products before
    //        var future = new Future;
    //
    //        AtlassianCrowd.instance().session.authenticate(token, "123.121.23.222", Meteor.bindEnvironment(function (err, res) {
    //            if (err) {
    //
    //                console.log("harryahahahahaha");
    //
    //                self.next();
    //                //return err;
    //                //myFuture.throw(err);
    //            }
    //            else {
    //                //console.log(res);
    //                //return res;
    //                //myFuture.return(res);
    //                if(res.token === token){
    //                    var future_second = new Future;
    //                    AtlassianCrowd.instance().user.find(res.user.name, Meteor.bindEnvironment(function (err, user) {
    //                        if (err) {
    //                            //throw err;
    //                            //myFuture.throw(err);
    //                            self.next();
    //                        }
    //                        else {
    //                            //console.log(res);
    //                            //myFuture.return(res);
    //                            Session.set('userInformation', user);
    //
    //                            self.next();     // do next loginHandler in header template onCreated
    //
    //                        }
    //                    }));
    //
    //                    return future_second.wait();
    //
    //                }
    //            }
    //        }));
    //
    //        return future.wait();
    //
    //    }
    //    else{
    //        self.next();
    //    }
    //}





    //console.log(this);
    //var self = this;
    //if(Meteor.isClient){
    //    Meteor.call('headers', function(error, data) {
    //        if(!data || error){
    //            //return error;
    //            self.next();
    //            //Router.next();
    //        }else{
    //            console.log(data);
    //            Meteor.call('authentification', data, "123.121.23.222", function(err, res){
    //                if (err) {
    //                    //throw err;
    //                    self.next();
    //                    //Router.next();
    //                }
    //                else {
    //                    console.log(res);
    //                    if(res.token === data){
    //                        Meteor.call('getUserInformation', res.user.name, function(err, user){
    //                            if (err) {
    //                                self.next();
    //                                //Router.next();
    //                            }
    //                            else {
    //                                console.log(user);
    //                                //console.log("fuck" + this);
    //                                //self.subscribe("currentUser", user.name);
    //
    //                                Meteor.call('loginHandler', user, function(err, result){
    //                                    if(err){
    //                                        //throw err;
    //                                        self.next();
    //                                        //Router.next();
    //                                    }
    //                                    else{
    //                                        Session.set('userInformation', result);
    //                                        //console.log(userId);
    //                                        self.next();
    //                                        //Router.next();
    //                                        //Meteor.call('impersonate', result._id, function(err) {
    //                                        //    //Session.set('user', user);
    //                                        //    if (!err) {
    //                                        //        Meteor.connection.setUserId(result._id);
    //                                        //    }
    //                                        //});
    //                                    }
    //                                });
    //                            }
    //                        });
    //                    }else{
    //                        //Router.next();
    //                        self.next();
    //                    }
    //                }
    //            });
    //        }
    //    });
    //}


//}



//Router.onBeforeAction(authentificate, {only: 'documentsList'});
