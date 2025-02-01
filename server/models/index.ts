import { Sequelize } from "sequelize";
import { genSaltSync, hashSync } from "bcrypt";
import { User } from "./User";
import { Pegawai } from './Pegawai'

export { User, Pegawai };

export function hashPassword(password: string) {
  const salt = genSaltSync(10);
  return hashSync(password, salt);
}

export function initModels(sequelize: Sequelize) {
  User.initModel(sequelize);
  Pegawai.initModel(sequelize)
  return {
    User,
    Pegawai
  };
}
