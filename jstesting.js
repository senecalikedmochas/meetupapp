$( document ).ready(function() {
    console.log( "ready!" );
    
    $(groupurlstosearch).each(function(index, value){
        setTimeout(function() {
            meetupGroupsApiCall(value);
            meetupEventsApiCall(value);
        }, 5000)
        
    })
});

var groupurlstosearch = ["The-Boston-Amazon-Web-Services-Meetup-Group","AWS-NYC", "AWS-SANFRANCISCO", "AWS-Chicago", "Amazon-Web-Services-Virginia", "AWS-Seattle-OfficialEvents", "AdvancedAWS", "Bay-Area-AWS-User-Group", "Seattle-AWS-Architects-Engineers",
    "Los-Angeles-AWS-Users-Group", "AWS-Dallas", "Twin-Cities-Amazon-Web-Services-User-Group", "Austin-AWS-Users", "Vancouver-Amazon-Web-Services-User-Group", "AWS-Atlanta", "Toronto-AWS-Users-United", "AWS-Houston",
    "AWS-Portland", "AWSArizona", "Triangle-AWS-Amazon-Web-Services-Meetup", "Denver-Amazon-Web-Services-Users-Group", "AWS-Orange-County-Official-Events", "AWS-Michigan", "AWS-Boulder-Denver", "South-Florida-Amazon-Web-Services-Meetup",
    "AWS-EASTBAY", "AWS-User-Group-Des-Moines", "Columbus-AWS-Amazon-Web-Services-Meetup", "AWS-UG-San-Diego", "AWS-LasVegas", "gpawsug", "AWS-SACRAMENTO", "KC-Amazon-Web-Services-User-Group", "nawsug", "Montreal-AWS-Users-United", 
    "mkeaws", "Salt-Lake-AWS", "AWS-Charlotte-User-Group", "Orlando-AWS-Users-Group", "IndyAWS", "awsflorida", "Ottawa-AWS-User-Group", "Columbia-AWS-Meetup", "Calgary-AWS-User-Group", "AWS-Cincinnati",
    "Edmonton-AWS-User-Group", "Princeton-Amazon-Web-Services-AWS", "AWS-Lunches-RTP", "aws-honolulu-user-group", "Palo-Alto-AWS-BigData-Meetup", "Seattle-AWS-Big-Data-Meetup", "Bay-Area-AWS-User-Group",
    "Amazon-Web-Services-San-Diego-User-Group","AWS-Washington-DC-Meet-Up","AWSUGUK","AWS-User-Group-Turkey","AWS-Berlin", "AWS-Munich", "AWS-Ireland-Usergroup", "French-AWS-UG",
    "Barcelona-Amazon-Web-Services-Meetup", "AWSUGPL", "awsfin", "aws-stockholm", "AWS-User-Group-North","awsugHH", "AWS-User-Group-Norway", "AWSusergroupItaly", "Cambridge-AWS-User-Group","Madrid-Amazon-Web-Services-Meetup", "AWS-User-Group-Belgium",
    "Amazon-Web-Services-User-Group-Scotland", "AWS-UserGroup-Stuttgart","Nurnberg-AWS-User-Group", "AWS-User-Group-West-Midlands", "Amazon-Web-Services-Rome", "aws-cologne", "AWS-JOZI", "Copenhagen-AWS-User-Group",
    "AWS-Leeds-User-Group", "AWS-User-Group-Krakow", "Amazon-Web-Services-AWS-Vienna", "AWS-South-Wales-User-Group", "AWS-User-Group-Lisbon", "Amazon-Web-Services-User-Group-Glasgow", "aws-frankfurt", "AWS-Usergroup-Belfast",
    "AWS-Bulgaria", "Montpellier-Amazon-Web-Services", "Lille-AWS-Amazon-Web-Services-User-Group", "AWS-Swiss-User-Group-Zurich", "Toulouse-Amazon-Web-Services", "AWSBathUserGroup", "Prague-AWS-Meetup",
    "AWSLuxGroup","awsrus", "Cape-Town-AWS", "Nottingham-AWS-Meetup", "Dortmund-AWS-User-Group","aws-leipzig", "AWSzgz", "Rennes-Amazon-Web-Services-User-Group", "AWS-Nantes", "AWS-Lyon-Amazon-Web-Services-User-Group",
    "AWS-User-Group-Bosnia", "AWS-Meetup-Karlsruhe", "aws-ro", "Bordeaux-Amazon-Web-Services", "AWS-Usergroup-Cork", "AWS-User-Group-Azerbaijan", "AWS-Swiss-User-Group-Bern","Ipswich-AWS-User-Group", "AWS-Valencia",
    "AWS-User-Group-Bergen", "AWS-User-Group-Croatia", "Dresden-AWS-User-Group", "AWS-Bilbao", "Milton-Keynes-AWS-User-Group", "awsmsk", "aws-ee", "AWS-Usergroup-Hannover", "AWS-Romania", "AWS-Usergroup-Munsterland",
    "AWS-cote-dAzur", "AWS-User-Group-Trondheim", "awsclub", "AWSUserGroupExeter", "AWS-User-Group-Stavanger", "AWS-UserGroup-Gibraltar" ]; 

// var individualGroupApiCall = function(groupId){

//     var formatURl = "https://api.meetup.com/2/groups?";
//     var key = "key=537285972250224c616793872978&"
//     var groupID = "group_id=" + groupId + "&sign=true";
//     var url = formatURl + key + groupID;

//       $.ajax({
//         type: 'GET',
//         url: url,
//         dataType: 'jsonp',
//         success: function(data){
//            // var json = JSON.parse(data.results);
//             console.log(data.results);
//            // console.log(data.results.length);
//            if(data.results.length > 0){
//             $("#meetupTable").append("<tr><td>" + data.results[0].name + "</td><td>" + data.results[0].members +"</td></tr>");
//            }

//         }
//       });
// }

var meetupGroupsApiCall = function(groupurl){
    var formatURL = "https://api.meetup.com/2/groups?";
    var key = "key=537285972250224c616793872978&"
    var params = "group_urlname=" + groupurl + "&sign=true";
    var url = formatURL + key + params;

      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'jsonp',
        success: function(data){
        if(data.results != null && data.results.length > 0) {
        $(data.results).each(function(index,value) {
          
        $("#meetupTable").append("<tr><td>" + value.name + "</td><td>" + value.members +"</td></tr>");
         
            
        })
        }
           

        }
      });  
}

var meetupEventsApiCall = function(groupurl){
    var formatURL = "https://api.meetup.com/2/events?";
    var key = "key=537285972250224c616793872978&"
    var params = "group_urlname=" + groupurl + "&sign=true";
    var url = formatURL + key + params;

      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'jsonp',
        success: function(data){
        if(data.results != null && data.results.length > 0) {

     
         $("#meetupTable tr:not(:first)".each(function(){
             $(this).append("<td>" + data.results.length + "</td>");
         }))
            
        }
           

        }
      });  
}