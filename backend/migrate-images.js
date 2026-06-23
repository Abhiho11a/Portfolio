import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function migrate() {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const db = conn.connection.db;
  console.log('📂 Database name:', db.databaseName);

  // List all collections
  const collections = await db.listCollections().toArray();
  console.log('📂 Collections:', collections.map(c => c.name).join(', '));

  const collection = db.collection('portfoliodatas');

  // Count documents
  const count = await collection.countDocuments();
  console.log(`📊 Document count in 'portfoliodatas': ${count}`);

  if (count === 0) {
    // Maybe data is in a different collection - search all collections
    for (const col of collections) {
      const c = db.collection(col.name);
      const sample = await c.findOne();
      if (sample && sample.achievements) {
        console.log(`\n🔍 Found portfolio data in collection: "${col.name}"`);
        await fixDocument(c, sample);
        await mongoose.disconnect();
        process.exit(0);
      }
    }
    console.log('❌ Could not find portfolio data in any collection.');
    await mongoose.disconnect();
    process.exit(1);
  } else {
    const doc = await collection.findOne();
    await fixDocument(collection, doc);
  }

  await mongoose.disconnect();
  process.exit(0);
}

async function fixDocument(collection, doc) {
  let changed = false;

  // Fix hackathon images
  if (doc.achievements?.hackathons) {
    for (const hackathon of doc.achievements.hackathons) {
      if (hackathon.images && hackathon.images.length > 0) {
        const hasOldFormat = hackathon.images.some(img => typeof img === 'object' && img !== null);
        if (hasOldFormat) {
          console.log(`  🔧 Fixing images for hackathon: "${hackathon.title}"`);
          hackathon.images = [];
          changed = true;
        }
      }
    }
  }

  // Fix event images
  if (doc.achievements?.events) {
    for (const event of doc.achievements.events) {
      if (event.images && event.images.length > 0) {
        const hasOldFormat = event.images.some(img => typeof img === 'object' && img !== null);
        if (hasOldFormat) {
          console.log(`  🔧 Fixing images for event: "${event.title}"`);
          event.images = [];
          changed = true;
        }
      }
    }
  }

  if (changed) {
    await collection.updateOne({ _id: doc._id }, { $set: { achievements: doc.achievements } });
    console.log('\n✅ Migration complete! Old image data has been cleaned up.');
  } else {
    console.log('\n✅ No migration needed — all data is already correct.');
  }
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
