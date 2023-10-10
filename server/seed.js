import connectToDB from "./db.js";
import bcrypt from "bcryptjs";
import { User, Product, Band, Order, Like, Event } from "./model.js";

const db = await connectToDB("postgresql:///backwalldb");

await db.sync({ force: true }).then(async () => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("test", salt);

  const users = [
    {
      userName: "admin",
      email: "admin@test.com",
      password: hash,
      adminStatus: true,
      bandStatus: false,
    },
    {
      userName: "band1",
      email: "band1@test.com",
      password: hash,
      adminStatus: false,
      bandStatus: true,
    },
    {
      userName: "user1",
      email: "user1@test.com",
      password: hash,
      adminStatus: false,
      bandStatus: true,
    },
    {
      userName: "user2",
      email: "user2@test.com",
      password: hash,
      adminStatus: false,
      bandStatus: false,
    },
  ];

  const products = [
    {
      productName: "band tee 1",
      category: "T-Shirt",
      price: 20,
      description: "cool shirt from a cool band! 100% cotton",
      bandId: 1,
    },
    {
      productName: "band hoodie 1",
      category: "Hoodie",
      price: 40,
      description: "cool hoodie from a cool band! 100% cotton",
      bandId: 1,
    },
    {
      productName: "band tote 1",
      category: "Tote",
      price: 20,
      description: "nice tote for carrying items",
      bandId: 2,
    },
  ];

  const bands = [
    {
      bandName: "Moon Owls Mages",
      bio: "4 piece psych-rock from Boise",
    },
    {
      bandName: "Crush the Monster",
      bio: "6 piece psych-metal from Boise",
    },
  ];

  const events = [
    {
      date: "2023-12-25",
      location: "SLC",
      time: "20:00",
      description: "should be a really nice time",
      bands: "Moon Owls Mages, others",
      links: "tickets.com",
      isSoldOut: false,
    },
    {
      date: "2023-11-05",
      location: "Seattle",
      time: "20:00",
      description: "should be a really nice time",
      bands: "Moon Owls Mages, others",
      links: "tickets.com",
      isSoldOut: false,
    },
  ];

  await Like.bulkCreate(
    {
      userId: 3,
      bandId: 1,
    },
    {
      userId: 4,
      bandId: 2,
    }
  );

  await Order.bulkCreate(
    {
      userId: 3,
      productId: 1,
    },
    {
      userId: 3,
      productId: 3,
    },
    {
      userId: 4,
      productId: 2,
    }
  );

  await User.bulkCreate(users);
  await Product.bulkCreate(products);
  await Band.bulkCreate(bands);
  await Event.bulkCreate(events);
  await console.log("db has been successfully reset and seeded!");
});
