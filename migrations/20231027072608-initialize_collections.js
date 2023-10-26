module.exports = {
  async up(db, client) {
    await db.createCollection("users");
    await db.createCollection("categories");
    await db.createCollection("news");
  },

  async down(db, client) {
    await db.collection("users").drop();
    await db.collection("categories").drop();
    await db.collection("news").drop();
  }
};

