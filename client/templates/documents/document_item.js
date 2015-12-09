/**
 * Created by DELL on 2015/12/8.
 */

Template.documentItem.helpers({
    title: function(){
        var segment = Segments.findOne(this.id);
        return segment.title;
        //console.log(segment);
    },

    partOfContent: function(){
        var segment = Segments.findOne(this.id);
        //console.log(segment);
        var content = segment.story[0].text.slice(0,200) + "......";
        return content;
    }

});