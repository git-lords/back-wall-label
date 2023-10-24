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
      type: DataTypes.TEXT,
    },
  },
  {
    modelName: "band",
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

class Article extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Article.init(
  {
    articleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    modelName: "article",
    sequelize: db,
  }
);

class Photo extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Photo.init(
  {
    photoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "photo",
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

// exports here
export { User, Band, Like, Hero, Article, Photo };
