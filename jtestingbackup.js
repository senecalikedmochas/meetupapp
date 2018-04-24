$( document ).ready(function() {
    console.log( "ready!" );
    $("#downloadData").on("click", buttonClicked);
    $(groupurlstosearch).each(function(index, value){
        setTimeout(function() {
            meetupGroupsApiCall(value);
           
        }, 5000)
        
    })
});

var rows = [];

var groupurlstosearch = ["The-Boston-Amazon-Web-Services-Meetup-Group","AWS-NYC", "AWS-SANFRANCISCO", "AWS-Chicago", "Amazon-Web-Services-Virginia", "AWS-Seattle-OfficialEvents"]; 

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
          
        $("#meetupTable").append("<tr id=" + groupurl + "><td>" + value.name + "</td><td>" + value.members +"</td></tr>");
        
        
        meetupEventsApiCall(groupurl, value.name, value.members);
            
        })
        }
           

        }
      });  
}

var meetupEventsApiCall = function(groupurl, name, memberCount){
    var formatURL = "https://api.meetup.com/2/events?";
    var key = "key=537285972250224c616793872978&"
    var params = "group_urlname=" + groupurl + "&sign=true";
    var url = formatURL + key + params;

      $.ajax({
        type: 'GET',
        url: url,
        dataType: 'jsonp',
        success: function(data){
        var id = "#" + groupurl; 
        if(data.results != null && data.results.length > 0) {
            $(id).append("<td>" + data.results.length + "</td>");
            var groupRow = [name, memberCount, data.results.length];
            rows.push(groupRow);
        }
        else{
            $(id).append("<td>" + 0 + "</td>");
            var groupRow = [name, memberCount, 0];
            rows.push(groupRow);
        }
           

        }
      });  
}
var buttonClicked = function(){
    exportToCsv("meetupData.csv", rows);
}
var exportToCsv= function(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }


    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}