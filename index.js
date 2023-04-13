const express = require("express");
const app = express();
const PORT = 3000 || 3001;
const { Client } = require("cassandra-driver");

const client = new Client({
  cloud: {
    secureConnectBundle: "./secure-connect-test-database.zip",
  },
  credentials: {
    username: "",
    password:
      "",
  },
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

let arr = [];

app.post("/post", async (req, res) => {
  const count = await client.execute("SELECT * from test.url");
  await client.connect();
  let id = count.rowLength + 1;
  const rs = await client
    .execute(
      "INSERT INTO test.url (id, longurl, shorturl)VALUES(?,?,'test'),[id , JSON.stringify(req.body.longUrl) ],{prepare:true} "
    )
    .catch((error) => {
      console.log("Cant operate ", error);
      res.status(500).json({ error: "Cant update " });
    });
  // console.log(`Your cluster returned ${rs.rowLength} row(s)`);

  await client.shutdown();

  // arr.push(req.body.longUrl);
  // console.log(arr);
  // console.log(arr.length);
  // res.send(arr);
  res.send(rs);
  res.end();
});

app.get("/shorten", (req, res) => {
  res.render("index");
  res.end();
});

app.get("/:id", (req, res) => {
  res.redirect(arr[req.params.id - 1]);
});

app.get("/", function (req, res) {
  res.render("index");
  res.end();
});

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
