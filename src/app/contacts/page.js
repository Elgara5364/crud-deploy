import { CreateButton } from "../components/button";
import ContactTable from "../components/contact-table";
import Search from "../components/search";
import { getContactPages } from "../lib/data";
import Pagination from "../components/pagination";
import TableSkeleton from "../components/skeleton";
import { Suspense } from "react";
import { getContacts } from "../lib/data";

//*Ambil Value dari query untuk nama dan halaman.
//*pass value dr searchParams ke contactTable
const Contacts = async ({ searchParams }) => {
  const query = searchParams?.query || ""; //jika query kosong maka defaultnya string kosong
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getContactPages(query);
  const contacts = await getContacts(query, currentPage);

  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<TableSkeleton totalItems={contacts.length} />}>
        <ContactTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Contacts;
