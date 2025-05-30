const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const { logger } = require('../utils/logger');

// Parse SQLite database path from DATABASE_URL
const dbPath = process.env.DATABASE_URL
  ? (process.env.DATABASE_URL.startsWith('file:') 
     ? process.env.DATABASE_URL.replace('file:', '') 
     : process.env.DATABASE_URL)
  : path.join(__dirname, '..', '..', 'database.sqlite');

// Resolve to absolute path
const absoluteDbPath = path.resolve(dbPath);

logger.info('Database configuration:', {
  type: 'SQLite',
  path: absoluteDbPath
});

// Initialize database connection
let db = null;

async function initializeDatabase() {
  try {
    db = await open({
      filename: absoluteDbPath,
      driver: sqlite3.Database
    });
    
    logger.info('Database connection successful');

    // Enable foreign keys
    await db.run('PRAGMA foreign_keys = ON');

    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL,
        phone TEXT,
        password TEXT NOT NULL,
        last_login DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);

    logger.info('Database tables initialized');
    return db;
  } catch (error) {
    logger.error('Database initialization error:', {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
}

// Initialize database on module load
initializeDatabase().catch(err => {
  logger.error('Failed to initialize database:', err);
  process.exit(1);
});

module.exports = {
  query: async (sql, params = []) => {
    if (!db) {
      throw new Error('Database not initialized');
    }

    const start = Date.now();
    try {
      // Determine if it's a SELECT query
      const isSelect = sql.trim().toLowerCase().startsWith('select');
      
      let result;
      if (isSelect) {
        result = await db.all(sql, params);
        return {
          rows: result || [],
          rowCount: result?.length || 0,
          lastID: null
        };
      } else {
        result = await db.run(sql, params);
        return {
          rows: [],
          rowCount: result?.changes || 0,
          lastID: result?.lastID
        };
      }
    } catch (error) {
      logger.error('Query error:', {
        sql,
        params,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  },
  
  // Helper method to get a single row
  queryOne: async (sql, params = []) => {
    const result = await db.get(sql, params);
    return result;
  },

  // Get the database instance
  getDb: () => db
}; 