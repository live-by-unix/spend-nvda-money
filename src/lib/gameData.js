export const INITIAL_MONEY = 4_500_000_000_000;

export const ITEMS = [
  { name: "Big Mac", emoji: "🍔", price: 5, category: "Food & Drink" },
  { name: "Flip Flops", emoji: "🩴", price: 10, category: "Fashion" },
  { name: "Coca-Cola Pack", emoji: "🥤", price: 12, category: "Food & Drink" },
  { name: "Movie Ticket", emoji: "🎬", price: 15, category: "Entertainment" },
  { name: "Book", emoji: "📚", price: 20, category: "Entertainment" },
  { name: "Lobster Dinner", emoji: "🦞", price: 75, category: "Food & Drink" },
  { name: "Video Game", emoji: "🎮", price: 70, category: "Entertainment" },
  { name: "Amazon Echo", emoji: "🔊", price: 100, category: "Tech" },
  { name: "Apple HomePod", emoji: "🎵", price: 300, category: "Tech" },
  { name: "One Year Netflix", emoji: "📺", price: 180, category: "Subscriptions" },
  { name: "One Year Disney+", emoji: "🏰", price: 140, category: "Subscriptions" },
  { name: "One Year GitHub Pro", emoji: "🐙", price: 48, category: "Subscriptions" },
  { name: "One Year Amazon Prime", emoji: "📦", price: 139, category: "Subscriptions" },
  { name: "Air Jordans", emoji: "👟", price: 200, category: "Fashion" },
  { name: "AirPods Pro", emoji: "🎧", price: 250, category: "Tech" },
  { name: "MacBook Pro", emoji: "💻", price: 2500, category: "Tech" },
  { name: "iPad Pro", emoji: "📱", price: 1100, category: "Tech" },
  { name: "RTX 5090", emoji: "🖥️", price: 2000, category: "Tech" },
  { name: "PS5", emoji: "🕹️", price: 500, category: "Entertainment" },
  { name: "Nintendo Switch 2", emoji: "🎲", price: 450, category: "Entertainment" },
  { name: "Gaming PC", emoji: "⌨️", price: 3000, category: "Tech" },
  { name: "Steam Deck", emoji: "🎮", price: 650, category: "Tech" },
  { name: "Drone", emoji: "🚁", price: 1200, category: "Tech" },
  { name: "Android Smartphone", emoji: "📲", price: 800, category: "Tech" },
  { name: "iPhone", emoji: "📱", price: 1200, category: "Tech" },
  { name: "Bike", emoji: "🚲", price: 500, category: "Transport" },
  { name: "Kitten", emoji: "🐱", price: 200, category: "Pets" },
  { name: "Puppy", emoji: "🐶", price: 500, category: "Pets" },
  { name: "Rickshaw", emoji: "🛺", price: 3000, category: "Transport" },
  { name: "Car", emoji: "🚗", price: 30000, category: "Transport" },
  { name: "Horse", emoji: "🐴", price: 5000, category: "Pets" },
  { name: "Acre of Farmland", emoji: "🌾", price: 10000, category: "Real Estate" },
  { name: "Designer Handbag", emoji: "👜", price: 5000, category: "Fashion" },
  { name: "Hot Tub", emoji: "🛁", price: 8000, category: "Luxury" },
  { name: "Luxury Wine", emoji: "🍷", price: 15000, category: "Food & Drink" },
  { name: "Diamond Ring", emoji: "💍", price: 25000, category: "Luxury" },
  { name: "Jet Ski", emoji: "🚤", price: 12000, category: "Transport" },
  { name: "Rolex", emoji: "⌚", price: 35000, category: "Luxury" },
  { name: "Truck", emoji: "🛻", price: 55000, category: "Transport" },
  { name: "Tesla", emoji: "⚡", price: 75000, category: "Transport" },
  { name: "Monster Truck", emoji: "🚚", price: 250000, category: "Transport" },
  { name: "Lamborghini", emoji: "🏎️", price: 350000, category: "Transport" },
  { name: "Ferrari", emoji: "🏁", price: 400000, category: "Transport" },
  { name: "House", emoji: "🏠", price: 500000, category: "Real Estate" },
  { name: "Gold Bar", emoji: "🥇", price: 750000, category: "Luxury" },
  { name: "McDonald's Franchise", emoji: "🍟", price: 2200000, category: "Business" },
  { name: "Burger King Franchise", emoji: "🍔", price: 3000000, category: "Business" },
  { name: "Chick-fil-A Franchise", emoji: "🐔", price: 5000000, category: "Business" },
  { name: "Super Bowl Ad", emoji: "📺", price: 7000000, category: "Business" },
  { name: "Yacht", emoji: "🛥️", price: 10000000, category: "Luxury" },
  { name: "M1 Abrams Tank", emoji: "🪖", price: 10000000, category: "Military" },
  { name: "Formula 1 Car", emoji: "🏎️", price: 15000000, category: "Transport" },
  { name: "Apache Helicopter", emoji: "🚁", price: 35000000, category: "Military" },
  { name: "Mansion", emoji: "🏰", price: 50000000, category: "Real Estate" },
  { name: "Hollywood Movie", emoji: "🎥", price: 200000000, category: "Entertainment" },
  { name: "Boeing 747", emoji: "✈️", price: 400000000, category: "Transport" },
  { name: "Airbus A380", emoji: "🛩️", price: 450000000, category: "Transport" },
  { name: "Cruise Ship", emoji: "🚢", price: 1000000000, category: "Transport" },
  { name: "Skyscraper", emoji: "🏙️", price: 1500000000, category: "Real Estate" },
  { name: "NBA Team", emoji: "🏀", price: 3000000000, category: "Business" },
];

export const CATEGORIES = [
  "All",
  "Food & Drink",
  "Fashion",
  "Entertainment",
  "Tech",
  "Subscriptions",
  "Transport",
  "Pets",
  "Real Estate",
  "Luxury",
  "Business",
  "Military",
];

export const CONFETTI_ITEMS = ["Gold Bar", "Yacht", "Mansion", "Skyscraper", "NBA Team"];

export const ACHIEVEMENTS = [
  { id: "first_purchase", name: "First Purchase", description: "Buy your first item", emoji: "🛒", check: (state) => state.totalPurchases >= 1 },
  { id: "big_spender_1k", name: "Big Spender", description: "Spend $1,000", emoji: "💵", check: (state) => state.moneySpent >= 1000 },
  { id: "millionaire_spender", name: "Millionaire Spender", description: "Spend $1 Million", emoji: "💰", check: (state) => state.moneySpent >= 1_000_000 },
  { id: "billionaire_spender", name: "Billionaire Spender", description: "Spend $1 Billion", emoji: "🤑", check: (state) => state.moneySpent >= 1_000_000_000 },
  { id: "trillionaire_spender", name: "Trillionaire Spender", description: "Spend $1 Trillion", emoji: "👑", check: (state) => state.moneySpent >= 1_000_000_000_000 },
  { id: "bought_skyscraper", name: "Sky High", description: "Buy a Skyscraper", emoji: "🏙️", check: (state) => (state.inventory["Skyscraper"] || 0) >= 1 },
  { id: "bought_nba", name: "Team Owner", description: "Own an NBA Team", emoji: "🏀", check: (state) => (state.inventory["NBA Team"] || 0) >= 1 },
  { id: "bought_747", name: "Frequent Flyer", description: "Own a Boeing 747", emoji: "✈️", check: (state) => (state.inventory["Boeing 747"] || 0) >= 1 },
  { id: "bought_mansion", name: "Living Large", description: "Own a Mansion", emoji: "🏰", check: (state) => (state.inventory["Mansion"] || 0) >= 1 },
  { id: "tech_mogul", name: "Tech Mogul", description: "Own 10 tech items", emoji: "💻", check: (state) => {
    const techItems = ITEMS.filter(i => i.category === "Tech");
    return techItems.reduce((sum, item) => sum + (state.inventory[item.name] || 0), 0) >= 10;
  }},
  { id: "pet_lover", name: "Pet Lover", description: "Own 100 pets", emoji: "🐾", check: (state) => {
    const petItems = ITEMS.filter(i => i.category === "Pets");
    return petItems.reduce((sum, item) => sum + (state.inventory[item.name] || 0), 0) >= 100;
  }},
  { id: "car_collector", name: "Car Collector", description: "Own 10 vehicles", emoji: "🚗", check: (state) => {
    const cars = ["Car", "Tesla", "Lamborghini", "Ferrari", "Truck", "Monster Truck"];
    return cars.reduce((sum, name) => sum + (state.inventory[name] || 0), 0) >= 10;
  }},
  { id: "food_critic", name: "Food Critic", description: "Buy 1,000 food items", emoji: "🍽️", check: (state) => {
    const foodItems = ITEMS.filter(i => i.category === "Food & Drink");
    return foodItems.reduce((sum, item) => sum + (state.inventory[item.name] || 0), 0) >= 1000;
  }},
  { id: "halfway_there", name: "Halfway There", description: "Spend 50% of the money", emoji: "⏳", check: (state) => state.moneySpent >= INITIAL_MONEY / 2 },
  { id: "spent_everything", name: "NVIDIA Money Master", description: "Spend every last dollar", emoji: "🏆", check: (state) => state.moneyRemaining === 0 },
];

export function formatMoney(amount) {
  if (amount >= 1_000_000_000_000) {
    const val = amount / 1_000_000_000_000;
    return `$${val % 1 === 0 ? val.toFixed(0) : val.toFixed(2)}T`;
  }
  if (amount >= 1_000_000_000) {
    const val = amount / 1_000_000_000;
    return `$${val % 1 === 0 ? val.toFixed(0) : val.toFixed(2)}B`;
  }
  if (amount >= 1_000_000) {
    const val = amount / 1_000_000;
    return `$${val % 1 === 0 ? val.toFixed(0) : val.toFixed(2)}M`;
  }
  if (amount >= 1_000) {
    const val = amount / 1_000;
    return `$${val % 1 === 0 ? val.toFixed(0) : val.toFixed(2)}K`;
  }
  return `$${amount.toLocaleString()}`;
}

export function formatMoneyFull(amount) {
  return `$${amount.toLocaleString()}`;
}

export function formatNumber(num) {
  return num.toLocaleString();
}