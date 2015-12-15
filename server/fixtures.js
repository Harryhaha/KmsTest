/**
 * Created by DELL on 2015/12/8.
 */
Meteor.startup(function () {
    ATLASSIAN_CROWD_CONFIG.crowd = {
        "base": "https://login.cclaw.net/crowd/"
    };
    ATLASSIAN_CROWD_CONFIG.application = {
        "name": "meteor",
        "password": "crowd123"
    };

    // https://atmospherejs.com/zuzel/atlassian-crowd
    /* test the connection
    AtlassianCrowd.instance().ping(function (err, res) {
        if(err) {
            throw err;
        }
        else {
            console.log(res)
        }
    });
    */
    /* return all of the user's attributes on the crowd
    AtlassianCrowd.instance().user.attributes('ariunaa', function (err, res) {
        if(err) {
            throw err;
        }
        else {
            console.log(res);
        }
    });
    */

    /* List a Users Group Membership
    AtlassianCrowd.instance().user.groups('ariunaa', function (err, res) {
        if(err) {
            throw err;
        }
        else {
             AtlassianCrowd.instance().groups.find(res, function (err, res) {
                 if(err) {
                     throw err;
                 }
                 else {
                     console.log(res);
                 }
             });
            //console.log(res);
        }
    });
    */

    //AtlassianCrowd.instance().session.create("ariunaa", "Adrian2010", function (err, token) {
    //    if(err) {
    //        throw err;
    //    }
    //    else {
    //        AtlassianCrowd.instance().session.authenticate(token, function (err, res) {
    //            if(err) {
    //                throw err;
    //            }
    //            else {
    //                console.log(res);
    //            }
    //        });
    //    }
    //});


});





