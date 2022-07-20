const csvtojson = require("csvtojson");
const fs = require("fs");
const csvFilePath = "worldcities.csv";

csvtojson()
  .fromFile(csvFilePath)
  .then((json) => {
    fs.writeFileSync(
      "worldcities.json",
      JSON.stringify(json),
      "utf-8",
      (err) => {
        if (err) console.log(err);
      }
    );
  });
