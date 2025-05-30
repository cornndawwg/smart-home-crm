const db = require('../config/database');
const bcrypt = require('bcryptjs');
const { logger } = require('../utils/logger');

class User {
  static async create(userData) {
    const { fullName, email, role, phone, password } = userData;
    
    try {
      logger.debug('Creating new user in database:', { email, role });
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const query = `
        INSERT INTO users (full_name, email, role, phone, password, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `;
      
      const values = [fullName, email, role, phone, hashedPassword];
      
      const result = await db.query(query, values);
      
      if (!result || !result.lastID) {
        throw new Error('Failed to create user: No ID returned');
      }

      // Fetch the created user
      const user = await db.queryOne(
        'SELECT id, full_name, email, role, phone, created_at FROM users WHERE id = ?', 
        [result.lastID]
      );

      if (!user) {
        throw new Error('Failed to fetch created user');
      }

      logger.debug('User created successfully:', { userId: user.id, email });
      
      return user;
    } catch (error) {
      logger.error('Error creating user:', {
        error: error.message,
        stack: error.stack,
        email
      });
      throw error;
    }
  }

  static async findById(id) {
    try {
      return await db.queryOne(
        'SELECT id, full_name, email, role, phone, created_at FROM users WHERE id = ?',
        [id]
      );
    } catch (error) {
      logger.error('Error finding user by ID:', {
        error: error.message,
        stack: error.stack,
        userId: id
      });
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      return await db.queryOne('SELECT * FROM users WHERE email = ?', [email]);
    } catch (error) {
      logger.error('Error finding user by email:', {
        error: error.message,
        stack: error.stack,
        email
      });
      throw error;
    }
  }

  static async updateLastLogin(userId) {
    try {
      const query = `
        UPDATE users 
        SET last_login = datetime('now')
        WHERE id = ?
      `;
      const result = await db.query(query, [userId]);
      return result.rowCount > 0;
    } catch (error) {
      logger.error('Error updating last login:', {
        error: error.message,
        stack: error.stack,
        userId
      });
      throw error;
    }
  }

  static async changePassword(userId, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const query = `
        UPDATE users 
        SET password = ?, 
            updated_at = datetime('now')
        WHERE id = ?
      `;
      const result = await db.query(query, [hashedPassword, userId]);
      return result.rowCount > 0;
    } catch (error) {
      logger.error('Error changing password:', {
        error: error.message,
        stack: error.stack,
        userId
      });
      throw error;
    }
  }
}

module.exports = User; 