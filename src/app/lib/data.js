import { prisma } from "../lib/prisma.js";

export const getContacts = async () => {
  try {
    const contacts = await prisma.contact.findMany();

    return contacts;
  } catch (error) {
    throw new Error("failed to fetch contact data");
  }
};
