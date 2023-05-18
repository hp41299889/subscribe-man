import {EntitySchema} from 'typeorm';

import {User} from './interface';

export const userEntity = new EntitySchema<User>({
  name: 'user',
  tableName: 'user',
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    name: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: 'timestamp',
      createDate: true,
    },
    updatedAt: {
      type: 'timestamp',
      updateDate: true,
    },
  },
});
