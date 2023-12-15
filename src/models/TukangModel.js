import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Tukang = db.define('tukang',{
    jasa_pelayanan: DataTypes.STRING,
    image: DataTypes.STRING,
    rating: DataTypes.STRING,
    alamat: DataTypes.STRING,
    deskripsi: DataTypes.STRING,
    url: DataTypes.STRING
},{
    timestamps: false,
    freezeTableName: true
});

export default Tukang;

(async()=>{
    await db.sync();
})();