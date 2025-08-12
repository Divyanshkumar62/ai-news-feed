// Database connection and operations (SQLite)
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./articles.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to database');
    db.run(`CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      link TEXT,
      date TEXT,
      summary TEXT
    )`, (err) => {
      if (err) {
        console.error('Could not create articles table', err);
      }
    });
  }
});

module.exports = {
  db,
  insertArticle: (article, callback) => {
    db.get(`SELECT id FROM articles WHERE title = ? OR link = ?`, [article.title, article.link], (err, row) => {
      if (err) {
        console.error('Could not check for existing article', err);
        return callback(err);
      }

      if (row) {
        console.log('Article already exists');
        return callback(null);
      }

      db.run(`INSERT INTO articles (title, link, date, summary) VALUES (?, ?, ?, ?)`,
        [article.title, article.link, article.date, article.summary],
        (err) => {
          if (err) {
            console.error('Could not insert article', err);
            return callback(err);
          }
          console.log('Article inserted successfully');
          callback(null);
        });
    });
  },
  getArticle: (id, callback) => {
    db.get(`SELECT * FROM articles WHERE id = ?`, [id], (err, row) => {
      if (err) {
        console.error('Could not get article', err);
        return callback(err);
      }
      callback(null, row);
    });
  },
  updateArticle: (id, article, callback) => {
    db.run(`UPDATE articles SET title = ?, link = ?, date = ?, summary = ? WHERE id = ?`,
      [article.title, article.link, article.date, article.summary, id],
      (err) => {
        if (err) {
          console.error('Could not update article', err);
          return callback(err);
        }
        console.log('Article updated successfully');
        callback(null);
      });
  },
  deleteArticle: (id, callback) => {
    db.run(`DELETE FROM articles WHERE id = ?`, [id], (err) => {
      if (err) {
        console.error('Could not delete article', err);
        return callback(err);
      }
      console.log('Article deleted successfully');
      callback(null);
    });
  },
  clearDatabase: (callback) => {
    db.run(`DELETE FROM articles`, (err) => {
      if (err) {
        console.error('Could not clear database', err);
        return callback(err);
      }
      console.log('Database cleared successfully');
      callback(null);
    });
  },
  getAllArticles: (callback) => {
    db.all(`SELECT * FROM articles`, [], (err, rows) => {
      if (err) {
        console.error('Could not get all articles', err);
        return callback(err);
      }
      callback(null, rows);
    });
  }
};