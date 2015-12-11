/**
 * Created by DELL on 2015/12/8.
 */
//correspond to documentsList router template
Meteor.publish('pages', function(){
    return Pages.find({kmsTitle: "Home"});
});
Meteor.publish('segments', function(){
    return Segments.find({kmsTitle: "PgSegments"}); // only publish the segments on whole document level
});

//
Meteor.publish('singleDocument', function(segmentId){
    return Segments.find({_id: segmentId});
});
Meteor.publish('allParagraphsBelongToSegment', function(PgID){  //PgID is the id of the segment include this paragraph
    return Paragraphs.find({PgID: PgID});                       //get all of the paragraphs belong to specific segment
});
Meteor.publish('allPhrases', function(){
    return Phrases.find({});
});

