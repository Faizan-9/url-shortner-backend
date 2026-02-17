const mysql = require("mysql2/promise");

const pool = mysql.createPool("mysql://root:tFGsZySlqIaUCigpkseyowVggQaiLzLk@shortline.proxy.rlwy.net:58566/railway");

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("MySQL connected successfully 🚀");
    connection.release();
  } catch (error) {
    console.error("Database connection failed ❌:", error.message);
  }
})();

module.exports = pool;
