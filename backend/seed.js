const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
const force = process.argv.includes('--force');

if (!mongoURI) {
  console.error('MONGO_URI is not set. Run via: npm run seed');
  process.exit(1);
}

const foodCategory = [
  { CategoryName: 'Burgers' },
  { CategoryName: 'Pizza' },
  { CategoryName: 'Desserts' },
  { CategoryName: 'Indian' },
  { CategoryName: 'Beverages' },
];

const food_items = [
  { name: 'Classic Cheese Burger', CategoryName: 'Burgers', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Cheese+Burger', options: [{ half: 120, full: 220 }] },
  { name: 'Chicken Fried Burger', CategoryName: 'Burgers', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Fried+Burger', options: [{ half: 150, full: 260 }] },
  { name: 'Paneer Tikka Burger', CategoryName: 'Burgers', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Paneer+Burger', options: [{ half: 140, full: 240 }] },
  { name: 'Double Patty Burger', CategoryName: 'Burgers', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Double+Patty', options: [{ half: 180, full: 320 }] },

  { name: 'Margherita Pizza', CategoryName: 'Pizza', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Margherita', options: [{ small: 180, medium: 280, large: 380 }] },
  { name: 'Pepperoni Pizza', CategoryName: 'Pizza', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Pepperoni', options: [{ small: 220, medium: 320, large: 420 }] },
  { name: 'Paneer Pizza', CategoryName: 'Pizza', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Paneer+Pizza', options: [{ small: 200, medium: 300, large: 400 }] },
  { name: 'Farmhouse Pizza', CategoryName: 'Pizza', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Farmhouse', options: [{ small: 240, medium: 340, large: 440 }] },

  { name: 'Chocolate Cake', CategoryName: 'Desserts', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Choco+Cake', options: [{ slice: 90, whole: 340 }] },
  { name: 'Vanilla Cupcake', CategoryName: 'Desserts', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Cupcake', options: [{ single: 60, box: 250 }] },
  { name: 'Brownie with Ice Cream', CategoryName: 'Desserts', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Brownie', options: [{ single: 120, double: 220 }] },
  { name: 'Assorted Pastry Box', CategoryName: 'Desserts', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Pastries', options: [{ four: 200, eight: 380 }] },

  { name: 'Hyderabadi Biryani', CategoryName: 'Indian', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Biryani', options: [{ half: 180, full: 320 }] },
  { name: 'Butter Chicken', CategoryName: 'Indian', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Butter+Chicken', options: [{ half: 200, full: 360 }] },
  { name: 'Paneer Butter Masala', CategoryName: 'Indian', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Paneer+Masala', options: [{ half: 170, full: 300 }] },
  { name: 'Garlic Naan', CategoryName: 'Indian', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Naan', options: [{ single: 40, pair: 70 }] },

  { name: 'Cold Coffee', CategoryName: 'Beverages', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Cold+Coffee', options: [{ small: 80, large: 130 }] },
  { name: 'Mango Milkshake', CategoryName: 'Beverages', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Milkshake', options: [{ small: 90, large: 140 }] },
  { name: 'Fresh Lime Soda', CategoryName: 'Beverages', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Lime+Soda', options: [{ small: 60, large: 100 }] },
  { name: 'Classic Mocktail', CategoryName: 'Beverages', img: 'https://placehold.co/600x400/2b2b2b/ffffff.png?text=Mocktail', options: [{ small: 110, large: 170 }] },
];

const seed = async () => {
  await mongoose.connect(mongoURI);
  const db = mongoose.connection.db;

  const existing = await db.collection('food_items').countDocuments();
  if (existing > 0 && !force) {
    console.error(`food_items already has ${existing} docs. Re-run with --force to replace.`);
    await mongoose.disconnect();
    process.exit(1);
  }

  await db.collection('foodCategory').deleteMany({});
  await db.collection('food_items').deleteMany({});
  await db.collection('foodCategory').insertMany(foodCategory);
  await db.collection('food_items').insertMany(food_items);

  console.log(`Seeded ${foodCategory.length} categories and ${food_items.length} items.`);
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
