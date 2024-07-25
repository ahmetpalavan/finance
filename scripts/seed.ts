import { neon } from '@neondatabase/serverless';
import { eachDayOfInterval, format, subDays } from 'date-fns';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';
import { accounts, categories, transactions } from '~/db/schema';
import { convertAmountToMiliunits } from '~/lib/utils';

config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = 'user_2jC7SOR6b17fMoh20YOx5Qyu9zc';

const seedCategories = [
  {
    id: 'category_1',
    name: 'Food',
    userId: SEED_USER_ID,
    plaidId: null,
  },
  {
    id: 'category_2',
    name: 'Rent',
    userId: SEED_USER_ID,
    plaidId: null,
  },
  {
    id: 'category_3',
    name: 'Utilities',
    userId: SEED_USER_ID,
    plaidId: null,
  },
  {
    id: 'category_7',
    name: 'Clothing',
    userId: SEED_USER_ID,
    plaidId: null,
  },
];

const seedAccounts = [
  {
    id: 'account_1',
    name: 'Checking',
    userId: SEED_USER_ID,
    plaidId: null,
  },
  {
    id: 'account_2',
    name: 'Savings',
    userId: SEED_USER_ID,
    plaidId: null,
  },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 30);

const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

const generateRandomAmount = (category: typeof categories.$inferSelect) => {
  switch (category.name) {
    case 'Food':
      return Math.random() * 400 + 90;
    case 'Rent':
      return Math.random() * 200 + 50;
    case 'Utilities':
      return Math.random() * 30 + 10;
    case 'Transportation':
    case 'Health':
      return Math.random() * 50 + 10;
    case 'Clothing':
    case 'Entertainment':
    case 'Miscellaneous':
      return Math.random() * 100 + 20;
    default:
      return Math.random() * 50 + 10;
  }
};

const generateForTansactionsForDay = (day: Date) => {
  const num = Math.floor(Math.random() * 4) + 1;

  for (let i = 0; i < num; i++) {
    const category = seedCategories[Math.floor(Math.random() * seedCategories.length)];
    const isExpense = Math.random() > 0.6;
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMiliunits(isExpense ? -amount : amount);

    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, 'yyyy-MM-dd')}_${i}`,
      accountId: seedAccounts[0].id,
      categoryId: category.id,
      amount: formattedAmount,
      date: day,
      payee: 'Merchant',
      notes: 'Random transaction',
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });

  days.forEach((day) => {
    generateForTansactionsForDay(day);
  });
};

generateTransactions();

const main = async () => {
  try {
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();

    await db.insert(categories).values(seedCategories).execute();
    await db.insert(accounts).values(seedAccounts).execute();
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
