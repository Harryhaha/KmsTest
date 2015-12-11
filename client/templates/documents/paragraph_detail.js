/**
 * Created by DELL on 2015/12/9.
 */


Template.paragraphDetail.helpers({
    EnglishText: function(){
        var paragraph = Paragraphs.findOne(this.id);
        var content = paragraph.story[0].text;   //should be returned

        //phrase match test
        var phrasesCursor = Phrases.find({}).fetch();
        //console.log(phrasesCursor);
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

            //var newContent = content.replace(reg, );
            var matchedSubString;
            var lenOfMatchedString;
            var flag = false;
            var subPattern = /a-z/i;
            while((result = reg.exec(content)) != null){
                //console.log("1----------"+result[0]);
                if(result[0]){                       //something matched
                    matchedSubString = result[0];
                    lenOfMatchedString = result[0].length;
                    if( (result.index!==0) && subPattern.test(content.charAt(result.index-1)) ){
                        //flag = true;
                        continue;
                    }
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
        var count = Template.parentData(1).story.indexOf(this) + 1;
        return count;
    }

});