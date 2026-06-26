const expres = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {db} = require("./DBoperation");

dotenv.config();
const app = expres();
const PORT  = process.env.PORT || 5000

app.use(cors());


// fetch the catagory from the DB 
app.get('/api/categories', (req, res) => {
  const sql = 'SELECT DISTINCT category FROM product WHERE category IS NOT NULL AND category != ""';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching categories:", err.message);
      return res.status(500).json({ error: err.message });
    }
    
    const categories = rows.map(row => row.category);
    res.json(categories);
  });
});

//  geting the product 
app.get('/api/products', (req, res) => {
  const targetCategory = req.query.category;

  if (!targetCategory) {
    return res.status(400).json({ error: "Category query parameter is required" });
  }

  const sql = 'SELECT * FROM product WHERE category = ?';

  db.all(sql, [targetCategory], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching products:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows); // Pushes the product cards data array straight to React
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server is running on link: http://localhost:${PORT}`);
});
