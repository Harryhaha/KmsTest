/**
 * Created by DELL on 2015/12/9.
 */
Template.paragraphDetail.helpers({
    EnglishText: function(){
        var paragraph = Paragraphs.findOne(this.id);
        return paragraph.story[0].text;

    },

    ChineseText: function(){
        var paragraph = Paragraphs.findOne(this.id);
        return paragraph.story[1].text;
    },

    count: function(){
        var count = Template.parentData(1).story.indexOf(this);
        return count;
    }

});