// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Post, Song } = initSchema(schema);

export {
  User,
  Post,
  Song
};