import type Sequelize from 'sequelize';
import { DataTypes, Model, type Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  fullName?: string;
  googleId?: string;
  avatarUrl?: string;
  email?: string;
}

export type UserPk = 'id';
export type UserId = User[UserPk];
export type UserOptionalAttributes = 'id' | 'fullName' | 'googleId' | 'avatarUrl' | 'email';
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;
  fullName?: string;
  googleId?: string;
  avatarUrl?: string;
  email?: string;

  static initModel(sequelize: Sequelize.Sequelize): typeof User {
    return User.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        fullName: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        googleId: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        avatarUrl: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'user',
        timestamps: true,
        freezeTableName: true,
        indexes: [
          {
            name: 'PRIMARY',
            unique: true,
            using: 'BTREE',
            fields: [{ name: 'id' }]
          }
        ]
      }
    );
  }
}
