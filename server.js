import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line
const timehandler = (req, res) => {

  try{
    const {date} = req.params;
    let objdate;
    if (!date){
      objdate = new Date();
    }else if(/^\d+$/.test(date)){
      objdate = new Date(parseInt(date));
    }else{
      objdate = new Date(date);
    };
    if (isNaN(objdate.getTime())){
      res.json({error:"Invalid Date"})
    }else{
      res.json({
        unix : objdate.getTime(),
        utc : objdate.toUTCString(),
      });
    };
  }catch(error){
    res.json({ error: "Invalid Date" });
  };
};

app.get('/api/:date' , timehandler);
app.get('/api' , timehandler);
// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
