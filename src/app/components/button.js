"use client";

import { Link } from "next-view-transitions";
import { IoAddSharp, IoPencil, IoTrashOutline } from "react-icons/io5";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deleteContact } from "../lib/action";

export const CreateButton = () => {
  return (
    <Link
      href={"/contacts/create"}
      className="inline-flex items-center space-x-1 text-white bg-blue-700 hover:bg-blue-800 px-5 py-[9px] rounded-sm text-sm">
      <IoAddSharp size={20} />
      Create
    </Link>
  );
};

export const EditButton = ({ id }) => {
  return (
    <Link
      href={`/contacts/edit/${id}`}
      className="rounded-sm border p-1 hover:bg-gray-100">
      <IoPencil size={20} />
    </Link>
  );
};
export const DeleteButton = ({ id }) => {
  const deleteContactWithId = deleteContact.bind(null, id);
  const { pending } = useFormStatus();

  return (
    <form action={deleteContactWithId}>
      <button
        className="rounded-sm border p-1 hover:bg-gray-100"
        disabled={pending}>
        <IoTrashOutline size={20} />
      </button>
    </form>
  );
};

export const SubmitButton = ({ label }) => {
  const { pending } = useFormStatus();
  //yg pertama adalah style default yang kedua adalah kondisi
  const className = clsx(
    "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-3 text-center mt-5",
    {
      "opacity-50 cursor-progress": pending,
    }
  );

  return (
    <button disabled={pending} type="submit" className={className}>
      <div id="message-error" aria-live="polite" aria-atomic="true">
        {label === "save" ? (
          <span>{pending ? "Saving..." : "Save"}</span>
        ) : (
          <span>{pending ? "Updating..." : "Update"}</span>
        )}
      </div>
    </button>
  );
};
