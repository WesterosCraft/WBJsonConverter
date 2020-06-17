var dirToJson = require('dir-to-json');

let result;

dirToJson( "./ctm", function( err, dirTree ){
	if( err ){
		throw err;
	}else{
        result = dirTree
		console.log( dirTree );
	}
});

    const writeJson = () => {
        fs.writeFile("./ctmresult.json", JSON.stringify(result, null, 4), (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("File has been created");
        });
      };

      writeJson();