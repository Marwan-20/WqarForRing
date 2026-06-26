const sqlite3 = require("sqlite3").verbose(); // verbose for error catshing

const db = new sqlite3.Database("galary.db", (e) => {
  if (e) console.error("Database connection error:", err.message);
  else console.log("Connected to galary.db successfully.");
});

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS product(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      craftsman TEXT,
      size TEXT,
      price TEXT,
      weight TEXT,
      category TEXT,
      tiktok_url TEXT,
      image1 TEXT,
      image2 TEXT,
      image3 TEXT
    )
  `,
    (err) => {
      if (err) console.error("Error creating table:", err.message);
    },
  );
});

async function insertingDB(session, informationObject) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO product (title, craftsman, size, price, weight, category, tiktok_url, image1, image2, image3)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const prams = [
      informationObject.title,
      informationObject.craftsman,
      informationObject.size,
      informationObject.price,
      informationObject.weight,
      informationObject.category,
      informationObject.tiktok_url,
      session.clodinaryLinks[0] || null,
      session.clodinaryLinks[1] || null,
      session.clodinaryLinks[2] || null,
    ];

    db.run(sql, prams, function (e) {
      if (e) {
        console.log(`SQLite inserting error: ${e}`);
        reject(e);
      } else {
        console.log(
          `information secssefuly saved in the database ${this.lastID}`,
        );
        resolve(this.lastID);
      }
    });
  });
}

async function deletingDB(informationId) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM product WHERE id = ?";

    db.run(sql, [informationId], function (e) {
      if (e) {
        console.log(`there is an error in Deleting Data: ${e}`);
        reject(e);
      } else {
        if (this.changes === 0) {
          console.log(
            "The deltion command sucssefuly ouccerd but there is no changes in the data base",
          );
          resolve(false);
        } else {
          console.log("deletion happen secsesfuly");
          resolve(true);
        }
      }
    });
  });
}
module.exports = { insertingDB, deletingDB, db };
