/**
 * Created by DELL on 2015/12/8.
 */

Template.documentItem.helpers({
    title: function(){
        var segment = Segments.findOne(this.id);  //get the segment(document) / query transfer from pages(story) to segments
        return segment.title;
        //console.log(segment);
    },

    partOfContent: function(){
        var segment = Segments.findOne(this.id);
        var firstParaContent = segment.story[0].text;
        var content;
        if(firstParaContent.length > 200)
            content = firstParaContent.slice(0,200) + "......";  //get the first 200 characters within first paragraph of the segment
        else
            content = firstParaContent;
        return content;
    }

});