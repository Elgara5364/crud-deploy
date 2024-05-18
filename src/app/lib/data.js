import { prisma } from "../lib/prisma.js";

const ITEMS_PER_PAGE = 5; //jumlah item di setiap halaman

export const getContacts = async (query, currentPage) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  //fungsi utk dapatkan semua contact utk ditampilkan di halaman contact
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const contacts = await prisma.contact.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      //filter untuk menampilkan data sesuai search
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    return contacts;
  } catch (error) {
    throw new Error("failed to fetch contact data");
  }
};

export const getContactsById = async (id) => {
  //fungsi utk dapatkan contact dari id.
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },
    });
    return contact;
  } catch (error) {
    throw new Error("failed to fetch contact data");
  }
};

export const getContactPages = async (query, currentPage) => {
  //fungsi utk dapatkan semua contact utk ditampilkan di halaman contact

  try {
    //ngitung data yang ada di prisma
    const contacts = await prisma.contact.count({
      //filter untuk menampilkan data sesuai search
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(contacts) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    throw new Error("failed to fetch contact data");
  }
};
