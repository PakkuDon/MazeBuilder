function DepthBuilder () {
	this.width = 0;
	this.height = 0;
	this.seed = 0;
	this.visisted = [[]];
	
	this.reset = function() {
		this.width = 0;
		this.height = 0;
		this.seed = 0;
		this.visisted = [[]];
	};
	
	this.setSize = function(width, height) {
		this.width = width;
		this.height = height;
	};

	this.build = function() {
		
	};
}