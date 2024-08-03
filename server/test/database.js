import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoServer = await MongoMemoryServer.create();

export async function dbConnect() {
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
}

export async function dbDisconnect() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}
