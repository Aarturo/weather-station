var serialPort = require("serialport"),
	isLogged = require("../middleware/isLogged")

var homeController = function (server) {

	server.get('/login',function (req, res){
		res.render('login', {

		});
	});
	server.get('/', function (req, res){		
		var Ports; 
		serialPort.list(function (err, ports) {		  
		  ports.forEach(function(port) {
		    console.log(port.comName);
		    console.log(port.pnpId);
		    console.log(port.manufacturer);		    
		  });		  	  
		});		
		res.render('home', {
			ports: Ports
		});
	});
};

module.exports = homeController;