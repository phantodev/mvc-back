import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  database: "postgres",
  host: "db.tjwramiwehtgvklrbjaf.supabase.co",
  password: "$hanGai@2050",
  port: 5432,
});

export default pool;
