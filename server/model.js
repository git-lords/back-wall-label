import { DataTypes, Model } from "sequelize";
import url from "url";
import connectToDb from "./db.js";
import util from "util";
import Sequelize from "sequelize";

const db = await connectToDb("postgresql:///backwalldb");

class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    // },
    password: {
      type: DataTypes.STRING(500),
    },
    adminStatus: {
      type: DataTypes.BOOLEAN,
    },
    bandStatus: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: "user",
    sequelize: db,
  }
);

class Product extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Product.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    priceId: {
      type: DataTypes.STRING,
    },
    bandId: {
      type: DataTypes.INTEGER,
    },
    imgUrls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    modelName: "product",
    sequelize: db,
  }
);

class Band extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Band.init(
  {
    bandId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bandName: {
      type: DataTypes.STRING,
    },
    bio: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "band",
    sequelize: db,
  }
);

class Event extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Event.init(
  {
    eventId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    location: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.TIME,
      defaultValue: Sequelize.NOW,
    },
    description: {
      type: DataTypes.STRING,
    },
    bands: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    links: {
      type: DataTypes.STRING,
    },
    isSoldOut: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: "event",
    sequelize: db,
  }
);

class Like extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Like.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    bandId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "like",
    sequelize: db,
  }
);

class Hero extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Hero.init(
  {
    heroId: {
      //? Unique ID
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    imgUrl: {
      //? Background image for home page
      type: DataTypes.STRING,
      allowNull: false,
    },
    cta: {
      //? (call to action)
      type: DataTypes.STRING,
    },
    button: {
      //? (Text within button)
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      //? (link for button)
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "hero",
    sequelize: db,
  }
);

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log("Syncing to database...");
  await db.sync();
  console.log("Finished syncing database!");
}

User.hasMany(Like, { foreignKey: "userId" });
Like.belongsTo(User, { foreignKey: "userId" });
Band.hasMany(Like, { foreignKey: "bandId" });
Like.belongsTo(Band, { foreignKey: "bandId" });
Band.hasMany(Product, { foreignKey: "bandId" });
Product.belongsTo(Band, { foreignKey: "bandId" });

//exports here
export { User, Product, Band, Like, Event, Hero };
