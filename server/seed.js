import connectToDB from "./db.js";
import bcrypt from "bcryptjs";
import { User, Product, Band, Order, Like, Event, Hero, Article } from "./model.js";

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
      priceId: "price_1O0S4BHrrNngtjIfLCJZLEB6"
    },
    {
      productName: "band hoodie 1",
      category: "Hoodie",
      price: 40,
      description: "cool hoodie from a cool band! 100% cotton",
      bandId: 1,
      priceId: "price_1O0S7IHrrNngtjIfIMPOgf18"
    },
    {
      productName: "band tote 1",
      category: "Tote",
      price: 20,
      description: "nice tote for carrying items",
      bandId: 2,
      priceId: "price_1O0S8FHrrNngtjIf8uLuENvs"
    },
    {
      productName: "band tee 2",
      category: "T-Shirt",
      price: 20,
      description: "cool shirt from a cool band! 100% cotton",
      bandId: 1,
      priceId: "price_1O0S4BHrrNngtjIfLCJZLEB6"
    },
    {
      productName: "band hoodie 2",
      category: "Hoodie",
      price: 40,
      description: "cool hoodie from a cool band! 100% cotton",
      bandId: 1,
      priceId: "price_1O0S7IHrrNngtjIfIMPOgf18"
    },
    {
      productName: "Vinyl 2",
      category: "Record",
      price: 50,
      description: "nice tote for carrying items",
      bandId: 2,
      priceId: "price_1Nzj7FHrrNngtjIf9fELBEXX"
    },
    {
      productName: "Vinyl 3",
      category: "Record",
      price: 50,
      description: "nice tote for carrying items",
      bandId: 2,
      priceId: "price_1O0Vs6HrrNngtjIfX2yp6z2j"
    },
    {
      productName: "Vinyl 3",
      category: "Record",
      price: 45,
      description: "nice tote for carrying items",
      bandId: 2,
      priceId: "price_1O0Vs6HrrNngtjIfX2yp6z2j"
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
      bands: ["Moon Owls Mages", "others"],
      links: "tickets.com",
      isSoldOut: false,
    },
    {
      date: "2023-11-05",
      location: "Seattle",
      time: "20:00",
      description: "should be a really nice time",
      bands: ["Moon Owls Mages", "Crush the Monster"],
      links: "tickets.com",
      isSoldOut: false,
    },
    {
      date: "2023-10-31",
      location: "Boise",
      time: "20:00",
      description: "should be a really nice time",
      bands: ["Crush the Monster", "Others"],
      links: "tickets.com",
      isSoldOut: true,
    },
  ];

  const heros = [
    {
      imgUrl: "https://bw-records-bucket.s3.us-west-1.amazonaws.com/MOM+Inside-32.jpg",
      cta: "Moon Owl's Mages at Neurolux",
      button: "Get Tickets",
      link: "https://www.ticketweb.com/venue/neurolux-lounge-boise-id/18976?page=1",

    },
    {
      imgUrl: "https://bw-records-bucket.s3.us-west-1.amazonaws.com/CTM+band+img.jpeg",
      cta: "Latest Release - Crush The Monster",
      button: "Listen",
      link: "https://open.spotify.com/album/7IzhE1aJFBUVGWVvH0gSsE?si=A2zl0qSbTdqqcKSS9NEZcg",
    },
  ];

  const articles = [
    {
      title: "Great gig last month!",
      imgUrl: "https://plus.unsplash.com/premium_photo-1681830630610-9f26c9729b75?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvbmNlcnR8ZW58MHx8MHx8fDA%3D&w=500",
      date: "03/17/23",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores libero reiciendis sapiente fugit nemo non. Nisi accusantium placeat nostrum sint! Porro alias minima aliquam facilis expedita eveniet nobis, voluptatem repudiandae? Lorem ipsum dolor sit amet consectetur, adipisicing elit.Recusandae ipsam nulla quod? Sunt libero vero quasi ipsum doloremque atque harum! Officia voluptatibus voluptates provident necessitatibus explicabo quis fuga assumenda cupiditate. Lorem ipsum dolor sit amet, consectetur adipisicing elit.Corrupti, perferendis.Unde iure exercitationem repudiandae possimus doloribus magnam enim quasi laudantium voluptates, est illum pariatur inventore, nulla accusantium sapiente rerum atque?"
    },
    {
      title: "Excited for the new EP",
      imgUrl: "https://media.istockphoto.com/id/502191941/photo/before-the-madness-begins.webp?b=1&s=170667a&w=0&k=20&c=6XWDV7vzFYbIuMEW8nvlV3dsVOYQ9PpsIVcQj-0gebc=",
      date: "06/03/23",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores libero reiciendis sapiente fugit nemo non. Nisi accusantium placeat nostrum sint! Porro alias minima aliquam facilis expedita eveniet nobis, voluptatem repudiandae? Lorem ipsum dolor sit amet consectetur, adipisicing elit.Recusandae ipsam nulla quod? Sunt libero vero quasi ipsum doloremque atque harum! Officia voluptatibus voluptates provident necessitatibus explicabo quis fuga assumenda cupiditate."
    },
    {
      title: "New collaborations coming",
      imgUrl: "https://images.unsplash.com/photo-1598488035252-042a85bc8e5a?auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1ha2luZyUyMG11c2ljfGVufDB8fDB8fHww&w=500",
      date: "08/14/23",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores libero reiciendis sapiente fugit nemo non. Nisi accusantium placeat nostrum sint! Porro alias minima aliquam facilis expedita eveniet nobis, voluptatem repudiandae? Lorem ipsum dolor sit amet consectetur, adipisicing elit.Recusandae ipsam nulla quod? Sunt libero vero quasi ipsum doloremque atque harum! Officia voluptatibus voluptates provident necessitatibus explicabo quis fuga assumenda cupiditate."
    },
    {
      title: "Festival Shenenigans",
      imgUrl: "https://media.istockphoto.com/id/1320185152/photo/silhouette-hands-of-audience-crowd-people-enjoying-the-club-party-concert-celebrate-party.webp?b=1&s=170667a&w=0&k=20&c=WdwQa608m5WH94KOU4YGXWIx_Pxaj-o-ZqWyQfzfxpI=",
      date: "10/17/23",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores libero reiciendis sapiente fugit nemo non. Nisi accusantium placeat nostrum sint! Porro alias minima aliquam facilis expedita eveniet nobis, voluptatem repudiandae? Lorem ipsum dolor sit amet consectetur, adipisicing elit.Recusandae ipsam nulla quod? Sunt libero vero quasi ipsum doloremque atque harum! Officia voluptatibus voluptates provident necessitatibus explicabo quis fuga assumenda cupiditate. Officia voluptatibus voluptates provident necessitatibus explicabo quis fuga assumenda cupiditate. Lorem ipsum dolor sit amet, consectetur adipisicing elit.Corrupti, perferendis.Unde iure exercitationem repudiandae possimus doloribus magnam enim quasi laudantium voluptates, est illum pariatur inventore, nulla accusantium sapiente rerum atque Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores libero reiciendis sapiente fugit nemo non. Nisi accusantium placeat nostrum sint! Porro alias minima aliquam facilis expedita eveniet nobis, voluptatem repudiandae? Lorem ipsum dolor sit amet consectetur, adipisicing elit.Recusandae ipsam nulla quod? Sunt libero vero quasi ipsum doloremque atque harum! Officia voluptatibus voluptates provident necessitatibus explicabo quis fuga assumenda cupiditate. Officia voluptatibus voluptates provident necessitatibus explicabo quis fuga assumenda cupiditate. Lorem ipsum dolor sit amet, consectetur adipisicing elit.Corrupti, perferendis.Unde iure exercitationem repudiandae possimus doloribus magnam enim quasi laudantium voluptates, est illum pariatur inventore, nulla accusantium sapiente rerum atque?"
    },
  ]

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
  await Hero.bulkCreate(heros);
  await Article.bulkCreate(articles);
  await console.log("db has been successfully reset and seeded!");
});
