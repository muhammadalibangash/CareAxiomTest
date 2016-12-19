var express = require('express');
var request = require("request");
var url = require('url');

var dns = require('dns');



var app = express();


app.get('/I/want/title/', function(req, res) {
  // res.type('text/plain'); // set content-type
  // res.send('i am a beautiful butterfly'); // send text response

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var arr=[];
  if(typeof(query['address'])=='object'){
  for (var i in query['address']){
   arr.push(query['address'][i]);

 }
  }
  else{
    arr.push(query['address']);
  }


  for(var i=0, len=arr.length; i < len; i++){

    // dns.resolve4(arr[i], function (err, addresses) {
    //
    //   console.log('addresses: ' + JSON.stringify(addresses));
    //
    // });
    var str=[];
    var html;

    func(arr[i], function(w) {

        str.push("<li> "+w+" </li>");
        if(str.length==arr.length){
         html="<html><head></head><body><h1> Following are the titles of given websites: </h1><ul>"+str+"</ul></body></html>";
         res.writeHeader(200, {"Content-Type": "text/html"});
         res.write(html);
         res.end();}

    });



  }


});


function func(site,callback){

  request(site, function (error, response, body) {


        if(error){
            return console.log('Error:', error);
        }


        if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }

        var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
        var str=body.toString();
        var match = re.exec(str);
        if (match && match[2]) {
          callback(match[2]);

        }
  }

  );


}


app.listen(process.env.PORT || 4731);
