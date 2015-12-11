/**
 * Created by DELL on 2015/12/9.
 */
Template.paragraphDetail.helpers({
    EnglishText: function(){
        var paragraph = Paragraphs.findOne(this.id); //transfer query from segment(story) to paragraph
        var content = paragraph.story[0].text;   //should be returned

        //phrase match test
        var phrasesCursor = Phrases.find({}).fetch();
        //console.log(phrasesCursor);
        //iterate all of phrases
        for(var j=0; j<phrasesCursor.length; j++){
            var phrase = phrasesCursor[j]._id;
            var pattern = "";
            for(var i=0; i<phrase.length-1; i++){
                pattern += phrase[i] + "[\\s|\\'|\\-]*";
            }
            pattern += phrase[phrase.length-1];
            //pattern = '/' + pattern + '/';
            var reg = new RegExp(pattern, "gi");
            //console.log(reg);
            var result;
            var matchedSubString;
            var lenOfMatchedString;
            var flag = false;
            var subPattern = /a-z/i;
            while((result = reg.exec(content)) != null){
                //console.log("1----------"+result[0]);
                if(result[0]){       //if something real matched then just record the index and the content and break out to do replace
                    matchedSubString = result[0];
                    lenOfMatchedString = result[0].length;
                    //check whether the phrase is the substring of words, if that, do not mark it. eg: original words: carmarket / phrase: market
                    if( (result.index!==0) && subPattern.test(content.charAt(result.index-1)) ){
                        //flag = true;
                        continue;
                    }
                    //check whether the phrase is the substring of words, if that, do not mark it. eg: original words: carmarket / phrase: car
                    if( ((result.index+lenOfMatchedString-1)!==(content.length-1)) && subPattern.test(content.charAt(result.index+lenOfMatchedString)) ){
                        //flag = true;
                        continue;
                    }
                    flag = true;
                    break;
                }
                //var lenOfMatchedString = result[0].length;
                //console.log("newContent--------" + content);
                //console.log("2----------"+result.index);
            }
            if(flag === true){
                //var subPattern = /a-z/i;
                //if( ((result.index != 0) && !subPattern.test(content.charAt(result.index-1))) && ((result.index != (content.length-1)) && !subPattern.test(content.charAt(result.index+lenOfMatchedString))) ){
                content = content.replace(content.substr(result.index, lenOfMatchedString), "<a data-toggle=\"modal\" data-target=\"#myModal\">" + matchedSubString +"</a>");
                //}
            }
        }

        return content;
    },

    ChineseText: function(){
        var paragraph = Paragraphs.findOne(this.id);
        return paragraph.story[1].text;
    },

    count: function(){
        var count = Template.parentData(1).story.indexOf(this) + 1;  //get parent data context which is segment(segment.story), this here refers to each paragraph inside the story of the segment
        return count;
    }

});