import UpdateForm from "@/app/components/editForm";
import { getContactsById } from "@/app/lib/data";
import { notFound } from "next/navigation";

const UpdateContactPage = async ({ params }) => {
  //ngambil id
  const id = params.id;
  // console.log(id);

  //data berupa object yang di fetching akan di simpan di var contact. ini proses mengambil value dr contact yg dipilih
  const contact = await getContactsById(id);
  // console.log(contact);

  //validasi jika contact tidak ditemukan maka halaman not found akan ditampilkan
  if (!contact) {
    notFound();
  }

  return (
    <div className="max-w-medium mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Contact</h1>
      <UpdateForm contact={contact} />
    </div>
  );
};

export default UpdateContactPage;
