$( document ).ready(function() {
    console.log( "ready!" );
    $(citiesToSearch).each(function(index, value){
        setTimeout(function() {
            meetupGroupsApiCall(value);
        }, 2000)
        
    })
    
});

var citiesToSearch = ["Tel Aviv","London", "Istanbul", "Berlin", "Munich", "Dublin", "Paris", "Barcelona", "Poznan", "Helsinki", "Stockholm", "Manchester", "Hamburg", "Oslo", "Milano", "Cambridge", "Madrid", "Brussels", "Edinburgh", "Stuttgart", "Nürnberg"];
    

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

var meetupGroupsApiCall = function(city){
    var formatURL = "https://api.meetup.com/find/groups?";
    var key = "key=537285972250224c616793872978&";
    var params = "text=AWS&location=" + city + "&sign=true";
    var url = formatURL + key + params;

      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'jsonp',
        success: function(data){
           
        console.log(data.data);
        if(data.data.length > 0) {
        $(data.data).each(function(index,value) {
          
        $("#meetupTable").append("<tr><td>" + value.name + "</td><td>" + value.members +"</td></tr>");
         
            
        })
        }
           

        }
      });
    //call the find/groups api with correct parameters
    //in success response, loop through the array of responses (make sure the array is greater than 0-check the length) and for each id, make the individual group call above.
    
}