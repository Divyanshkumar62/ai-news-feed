// articleModel.js

const articleSchema = {
  id: { type: 'INTEGER', primaryKey: true, autoIncrement: true },
  title: { type: 'TEXT', required: true },
  link: { type: 'TEXT', required: true },
  date: { type: 'TEXT' },
  summary: { type: 'TEXT' },
};

module.exports = articleSchema;