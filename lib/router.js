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
    }
});


DocumentsListController = RouteController.extend({
    template: 'documentsList',
    data: function() {
        return Pages.findOne({kmsTitle: "Home"});
        //segments: Segments.find({})
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


Router.route('/:id',{
    name: 'documentDetail',
    //waitOn: function(){
    //    return [
    //        Meteor.subscribe('singlePost', this.params._id),
    //        Meteor.subscribe('comments', this.params._id)
    //    ];
    //},
    data: function(){return Segments.findOne(this.params.id);}
});