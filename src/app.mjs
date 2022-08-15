import express from 'express'

const app = express();


app.post("/mail", (req, res) => {
  console.log("Sending Mail")
  res.json({ "msg": "Sending Mail" })
});


app.listen(5005, () => {
  console.log(`Server Running on port 5005`);
})
