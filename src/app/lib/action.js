"use server";

import { z } from "zod";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// bgmn data akan divalidasi. schema ini digunakan utk validasi
const contactSchema = z.object({
  name: z.string().min(6), //karakter harus string dan minimal 6 karakter
  phone: z.string().min(11), //karakter harus string dan minimal 11 karakter
});

//Fungsi untuk ngambil data yang diinput di form
//props formData berisi value yang diinput di form
export const saveContact = async (prevState, formData) => {
  //cara ngambil value yang diinput forms
  const validatedFields = contactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  // console.log(validatedFields);

  //validasi
  if (!validatedFields.success) {
    //jika validasi tidak berhasil

    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }

  //simpan ke database
  try {
    await prisma.contact.create({
      data: {
        name: validatedFields.data.name,
        phone: validatedFields.data.phone,
      },
    });
  } catch (error) {
    return { message: "Failed to create contact" };
  }

  revalidatePath("/contacts");
  redirect("/contacts");
};

export const updateContact = async (id, prevState, formData) => {
  const validatedFields = contactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  //validasi
  if (!validatedFields.success) {
    //jika validasi tidak berhasil

    return {
      Error: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.contact.update({
      data: {
        name: validatedFields.data.name,
        phone: validatedFields.data.phone,
      },
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to update contact" };
  }

  revalidatePath("/contacts");
  redirect("/contacts");
};

export const deleteContact = async (id) => {
  try {
    //karena mengupdate data maka gunakan fn update
    await prisma.contact.delete({
      where: { id },
    });
  } catch (error) {
    return { message: "Failed to delete contact" };
  }

  revalidatePath("/contacts");
};
