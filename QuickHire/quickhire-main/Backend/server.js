const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
// const sqlite3 = require("sqlite3").verbose();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require('dotenv').config()

// const allowedOrigins = ['https://quickhire-seven.vercel.app'];
// const allowedOrigins = ["http://localhost:3000"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Check if the origin is allowed, or allow requests with no origin (e.g., file://)
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );
app.use(cors());

app.use(express.json({ limit: "10mb" }));

const db = mysql.createPool({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, conn) => {
  if(err) console.log(err)
  console.log("Connected successfully")
})
// let db = new sqlite3.Database("users.db", (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log("Connected to the access database");
// });

// app.post("/uploadUserinfo", upload.single("file"), (req, res) => {
//   // Access the user info sent in the request body
//   const {
//     // firstname,
//     fullname,
//     nickname,
//     sex,
//     telnumber,
//     birthdate,
//     national,
//     area,
//     degree,
//     workexp,
//     thailevel,
//     englevel,
//     vehicle,
//     talent,
//     email,
//   } = req.body;

//   // Access the uploaded file information (if it exists)
//   const selectedImage = req.file;

//   const fs = require("fs");
//   fs.readFile(selectedImage.path, (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return res.status(500).json({ error: "Error reading file" });
//     }

//     // Now you have the binary data in the 'data' variable
//     // Perform the database update
//     db.query(
//       `UPDATE users SET img = ? , fullname = ?, nickname = ?, sex = ?, telnumber = ?, birthdate = ?, national = ?, area = ?, degree = ?, workexp = ?, thailevel = ?, englevel = ?, vehicle = ?, talent = ?, newuser = 'old' WHERE email = ?`,
//       [
//         data,
//         fullname,
//         // lastname,
//         nickname,
//         sex,
//         telnumber,
//         birthdate,
//         national,
//         area,
//         degree,
//         workexp,
//         thailevel,
//         englevel,
//         vehicle,
//         talent,
//         email,
//       ],
//       (err) => {
//         if (err) {
//           console.error("Error updating database:", err);
//         }
//         console.log("Success Update");
//       }
//     );
//   });

//   // Send a response back to the client
//   res.json({ message: "Data and file successfully received!" });
// });
app.post("/uploadUserinfo", (req, res) => {
  // Access the user info sent in the request body
  const {
    fullname,
    telnumber,
    nickname,
    sex,
    birthdate,
    national,
    area,
    degree,
    workexp,
    thailevel,
    englevel,
    vehicle,
    talent,
    img,
    email
  } = req.body;

    // Perform the database update
    db.query(
      `UPDATE users SET fullname = ?, telnumber = ?, nickname = ?, sex = ?, birthdate = ?, national = ?, area = ?, degree = ?, workexp = ?, thailevel = ?, englevel = ?, vehicle = ?, talent = ?, img = ?, newuser = 'old' WHERE email = ?`,
      [
        fullname,
        // lastname,
        telnumber,
        nickname,
        sex,
        birthdate,
        national,
        area,
        degree,
        workexp,
        thailevel,
        englevel,
        vehicle,
        talent,
        img,
        email
      ],
      (err) => {
        if (err) {
          console.error("Error updating database:", err);
        }
        console.log("Success Update");
      }
    );

  // Send a response back to the client
  res.json({ message: "Data and file successfully received!" });
});

// app.post("/uploadShopinfo", (req, res) => {

//   const {
//     images,
//     fullname,
//     shopname,
//     location,
//     timework,
//     money,
//     lat,
//     long,
//     welfare,
//     telnumber,
//     newuser,
//     email,
//   } = req.body;

//   db.query(
//     `UPDATE shops SET img = ? , fullname = ?, shopname = ?, location = ?, timework = ?, money = ?, lat = ?, long = ?, welfare = ?, telnumber = ?, newuser = ? WHERE email = ?`,
//     [
//       images,
//       // firstname,
//       fullname,
//       shopname,
//       location,
//       timework,
//       money,
//       lat,
//       long,
//       welfare,
//       telnumber,
//       newuser,
//       email,
//     ],
//     (err) => {
//       if (err) {
//         console.error("Error updating database:", err);
//       }
//       console.log("Success Update");
//     }
//   );

//   // Send a response back to the client
//   res.json({ message: "Data and file successfully received!" });
// });
// app.post("/uploadShopinfo", upload.single("file"), (req, res) => {
//   // Access the user info sent in the request body
//   const {
//     // firstname,
//     fullname,
//     shopname,
//     location,
//     timework,
//     money,
//     lat,
//     long,
//     welfare,
//     email,
//     telnumber,
//   } = req.body;

//   // Access the uploaded file information (if it exists)
//   const selectedImage = req.file;

//   const fs = require("fs");
//   fs.readFile(selectedImage.path, (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return res.status(500).json({ error: "Error reading file" });
//     }

//     // Now you have the binary data in the 'data' variable
//     // Perform the database update
//     db.query(
//       `UPDATE shops SET img = ? , fullname = ?, shopname = ?, location = ?, timework = ?, money = ?, lat = ?, long = ?, welfare = ?, telnumber = ?, newuser = 'old' WHERE email = ?`,
//       [
//         data,
//         // firstname,
//         fullname,
//         shopname,
//         location,
//         timework,
//         money,
//         lat,
//         long,
//         welfare,
//         telnumber,
//         email,
//       ],
//       (err) => {
//         if (err) {
//           console.error("Error updating database:", err);
//         }
//         console.log("Success Update");
//       }
//     );
//   });

//   // Send a response back to the client
//   res.json({ message: "Data and file successfully received!" });
// });

app.post("/uploadJobinfo", (req, res) => {
  // Access the user info sent in the request body
  const {
    email,
    telnumber,
    fullname,
    shopname,
    workposition,
    jobdesc,
    timework,
    money,
    peopleneed,
    welfare,
    location,
    lat,
    long,
    minilocation,
    img,
  } = req.body;

  // Now you have the binary data in the 'data' variable
  // Perform the database update
  db.query(
    `INSERT INTO jobs (email,
    telnumber,
    fullname,
    shopname,
    workposition,
    jobdesc,
    timework,
    money,
    peopleneed,
    welfare,
    location,
    lats,
    longs,
    minilocation,
    img) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      email,
      telnumber,
      fullname,
      shopname,
      workposition,
      jobdesc,
      timework,
      money,
      peopleneed,
      welfare,
      location,
      lat,
      long,
      minilocation,
      img,
    ],
    (err) => {
      if (err) {
        console.error("Error updating database:", err);
        res.status(500).json({ error: "An error occurred while updating the database" });
      } else {
        console.log("Success Update");
        res.json({ message: "Data and file successfully received!" });
      }
    }
  );
  // Send a response back to the client
  // res.json({ message: "Data and file successfully received!" });
});

app.post("/uploadJob", upload.single("img"), async (req, res) => {
  // const shopname = req.body.shopname;
  // const workposition = req.body.workposition;
  // const money = req.body.money;
  // const jobdesc = req.body.jobdesc;
  // const timework = req.body.timework;
  // const welfare = req.body.welfare;
  // const peopleneed = req.body.peopleneed;
  // const lat = req.body.lat;
  // const long = req.body.long;
  // const location = req.body.location;
  // const email = req.body.email;
  // const minilocation = req.body.minilocation;

  // // You can access the uploaded image as req.file
  // const imgPath = req.file.path;

  // const fs = require("fs");
  // fs.readFile(imgPath, (err, data) => {
  //   if (err) {
  //     console.error("Error reading file:", err);
  //     return res.status(500).json({ error: "Error reading file" });
  //   }

  //   // Insert the data into the database
  //   db.query(
  //     `INSERT INTO jobs (shopname, workposition, money, jobdesc, timework, welfare, peopleneed, lat, long, location, email, img,minilocation) 
  //         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
  //     [
  //       shopname,
  //       workposition,
  //       money,
  //       jobdesc,
  //       timework,
  //       welfare,
  //       peopleneed,
  //       lat,
  //       long,
  //       location,
  //       email,
  //       data,
  //       minilocation,
  //     ],
  //     function (err) {
  //       if (err) {
  //         console.error("Error inserting data:", err.message);
  //         res
  //           .status(500)
  //           .json({ error: "An error occurred while processing the data" });
  //       } else {
  //         console.log(`A new job with ID ${this.lastID} has been inserted.`);
  //         res.status(200).json({ message: "Data received successfully" });
  //       }
  //     }
  //   );
  // }); // Corrected placement of closing parenthesis for fs.readFile
}); // Corrected placement of closing parenthesis for app.post

app.get("/alljobs", (req, res) => {
  db.query("SELECT * FROM jobs", (err, jobs) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ data: jobs });
    }
  });
});

app.get("/getUserinfo/:email", (req, res) => {
  const email = req.params.email;

  // Perform the database query to fetch user data based on the email
  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Error querying database" });
    }

    if (!row) {
      // User with the specified email not found
      return res.status(404).json({ error: "User not found" });
    }

    // User found, respond with the user data
    const userInfo = {
      // firstname: row.firstname,
      // lastname: row.lastname,
      fullname: row.fullname,
      nickname: row.nickname,
      sex: row.sex,
      telnumber: row.telnumber,
      birthdate: row.birthdate,
      national: row.national,
      area: row.area,
      degree: row.degree,
      workexp: row.workexp,
      thailevel: row.thailevel,
      englevel: row.englevel,
      vehicle: row.vehicle,
      talent: row.talent,
      email: row.email,
      // Assuming "img" column stores the binary data of the user's image
      img: row.img,
    };

    res.json(userInfo);
  });
});

app.get("/getShopinfo/:email", (req, res) => {
  const email = req.params.email;

  // Perform the database query to fetch user data based on the email
  db.get("SELECT * FROM shops WHERE email = ?", [email], (err, row) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Error querying database" });
    }

    if (!row) {
      // User with the specified email not found
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming there can be multiple rows for the same email
    // We'll respond with an array of shopInfo
    const shopInfo = {
      fullname: row.fullname,
      shopname: row.shopname,
      location: row.location,
      timework: row.timework,
      money: row.money,
      lat: row.lats,
      long: row.longs,
      welfare: row.welfare,
      email: row.email,
      telnumber: row.telnumber,
      img: row.img, // Assuming "img" column stores the binary data of the user's image
    };

    res.json(shopInfo);
  });
});

app.get("/getAllShopinfo/:email", (req, res) => {
  const email = req.params.email;

  // Perform the database query to fetch user data based on the email
  db.query("SELECT * FROM jobs WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Error querying database" });
    }

    if (!rows && rows.length === 0) {
      // User with the specified email not found
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming there can be multiple rows for the same email
    // We'll respond with an array of shopInfo
    const shopInfo = rows.map((row) => ({
      email: row.email,
      telnumber: row.telnumber,
      fullname: row.fullname,
      shopname: row.shopname,
      workposition: row.workposition,
      jobdesc: row.jobdesc,
      timework: row.timework,
      money: row.money,
      peopleneed: row.peopleneed,
      welfare: row.welfare,
      location: row.location,
      lat: row.lats,
      long: row.longs,
      minilocation: row.minilocation,
      img: JSON.parse(row.img), // Assuming "img" column stores the binary data of the user's image
    }));

    res.json(shopInfo);
  });
});

app.post("/validatePassword", (req, res) => {
  const { email, password } = req.body;
  db.query(
    `select * from users where email = '${email}' and password = '${password}'`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length > 0) {
        res.send({
          validation: true,
          role: rows[0].loginrole,
          newuser: rows[0].newuser,
        });
      } else {
        res.send({ validation: false });
      }
    }
  );
});

app.post("/validatePasswordShop", (req, res) => {
  const { email, password } = req.body;
  db.query(
    `select * from shops where email = '${email}' and password = '${password}'`,
    (err, rows) => {
      if (err) {
        throw err;
      }
      if (rows.length > 0) {
        res.send({
          validation: true,
          role: rows[0].role,
          newuser: rows[0].newuser,
        });
      } else {
        res.send({ validation: false });
      }
    }
  );
});

app.post("/insertUser", (req, res) => {
  // const { email, password, firstname, lastname, telnumber, occupation } =
  //   req.body;
  const { email, password, fullname, telnumber, occupation } = req.body;

  db.query(
    `INSERT INTO users (email, password, fullname,telnumber,occupation,nickname,sex,birthdate,national,area,degree,workexp,thailevel,englevel,vehicle,talent,img,loginrole,newuser) VALUES ('${email}', '${password}', '${fullname}','${telnumber}','${occupation}',null,null,null,null,null,null,null,null,null,null,null,null,'user','new')`,
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ message: "User inserted successfully!" });
    }
  );
});

app.post("/insertShop", (req, res) => {
  const { email, password, fullname, telnumber } = req.body;

  db.query(
    `INSERT INTO shops (email, password, fullname,telnumber,role,newuser) VALUES ('${email}', '${password}', '${fullname}','${telnumber}','shop','new')`,
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ message: "User inserted successfully!" });
    }
  );
});

app.post("/changeRolesShop", (req,res) => {
  const { email, newuser } = req.body;

  db.query(
    // `UPDATE shops (newuser) VALUES ('${newuser}') WHERE email = '${email}'`,
    `UPDATE shops SET newuser = '${newuser}' WHERE email = '${email}'`,
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ message: "User inserted successfully!" });
    }
  );
})

//============================= noti when user apply job ==============================
app.get("/userapplyjob/:email", (req, res) => {
  const email = req.params.email;

  db.query("SELECT * FROM noti WHERE email = ?", [email], (err, rows) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Error querying database" });
    }

    if (!rows) {
      // No data found for the specified email, send an empty response or a message indicating no data.
      return res.status(404).json({ message: "No data found for the email." });
    }

    if (rows.length === 0) {
      res.json();
    } else {
      const usernoti = rows.map((row) => ({
        shop_name: row.shopname,
        status: row.status,
        date: row.date,
      }));
      res.json(usernoti);
    }
    // Assuming you want to send all rows as a JSON response


    // User found, respond with the user data
  });
});

app.post("/applyjob", (req, res) => {
  const { email, user_fullname, email_shopname, shopname, status, date } =
    req.body;

  db.query(
    `INSERT INTO noti (email, user_fullname, email_shopname, shopname, status, date) VALUES (?, ?, ?, ?, ?, ?)`,[email, user_fullname, email_shopname, shopname, status, date],
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ message: "User inserted successfully!" });
    }
  );
});

// or shop accept user
app.get("/shopacceptjob/:email", (req, res) => {
  const email = req.params.email;

  db.query(
    "SELECT * FROM noti WHERE email_shopname = ? and status = ?",
    [email, "pending"],
    (err, rows) => {
      if (err) {
        console.error("Error querying database:", err);
        return res.status(500).json({ error: "Error querying database" });
      }

      if (
        !rows
        // || rows.length === 0
      ) {
        // No data found for the specified email, send an empty response or a message indicating no data.
        return res
          .status(404)
          .json({ message: "No data found for the email." });
      }

      // Assuming you want to send all rows as a JSON response
      const usernoti = rows.map((row) => ({
        useremail: row.email,
        user_fullname: row.user_fullname,
        shopname:row.shopname,
        status: row.status,
        date: row.date,
      }));

      // User found, respond with the user data
      res.json(usernoti);
    }
  );
});

app.post("/acceptjob", (req, res) => {
  const { email_shopname, shopname, status } = req.body;

  db.query(
    `UPDATE noti SET status = '${status}' WHERE email_shopname = '${email_shopname}' and shopname = '${shopname}'`,
    (err) => {
      if (err) {
        throw err;
      }
      res.send({ message: "User inserted successfully!" });
    }
  );
});

app.listen(3001, () => console.log("Listening on port 3001"));