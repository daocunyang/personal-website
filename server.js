var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function(req, res){

   console.log(`A ${req.method} request for ${req.url}`);

   if (req.url === "/") {
   /* method 1
      fs.readFile("./public/index.html", "UTF-8", function(err, html){
           if (err) console.log(err);
           res.writeHead(200, {"Content-Type": "text/html"});
           res.end(html);

      });
*/
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream("./public/index.html", "UTF-8").pipe(res);
   }

   else if (req.url.match(/.html$/)) {
   		var htmlPath = path.join(__dirname, 'public', req.url);
   		var fileStream = fs.createReadStream(htmlPath, "UTF-8");
   		res.writeHead(200, {"Content-Type": "text/html"});

   		fileStream.pipe(res);
   }

   else if (req.url.match(/.css$/)) {
   		var cssPath = path.join(__dirname, 'public', req.url);
   		var fileStream = fs.createReadStream(cssPath, "UTF-8");
   		res.writeHead(200, {"Content-Type": "text/css"});

   		fileStream.pipe(res);
   }

   else if (req.url.match(/.js$/)) {
   	   	var jsPath = path.join(__dirname, 'public', req.url);
   		var fileStream = fs.createReadStream(jsPath, "UTF-8");
   		res.writeHead(200, {"Content-Type": "text/javascript"});

   		fileStream.pipe(res);
   }

   else if (req.url.match(/.jpg$/) || req.url.match(/.png$/)) {
   		var imgPath = path.join(__dirname, 'public', req.url);
   		var fileStream = fs.createReadStream(imgPath);

   		if (req.url.match(/.jpg$/))
   			res.writeHead(200, {"Content-Type": "image/jpeg"});
   	    else
   	    	res.writeHead(200, {"Content-Type": "image/png"});

   		fileStream.pipe(res);
   }

   else if (req.url.match(/.otf$/)) {
   	    var otfPath = path.join(__dirname, 'public', req.url);
   		var fileStream = fs.createReadStream(otfPath);
   		res.writeHead(200, {"Content-Type": "text/opentype"});

   		fileStream.pipe(res);
   }

   else if (req.url.match(/.pdf$/)) {
   	    var pdfPath = path.join(__dirname, 'public', req.url);
   		var fileStream = fs.createReadStream(pdfPath);
   		res.writeHead(200, {"Content-Type": "application/pdf"});

   		fileStream.pipe(res);
   }

   else {
   	  res.writeHead(404, {"Content-Type": "text/plain"});
      res.end("404 File Not Found");

   }

}).listen(3000);

console.log("Server listening on port 3000...");
