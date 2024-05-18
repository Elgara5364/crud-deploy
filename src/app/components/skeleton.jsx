export default function TableSkeleton({ totalItems }) {
  // console.log(totalItems);

  const totalSkeleton = [];

  for (let i = 0; i < totalItems; i++) {
    totalSkeleton.push(<Skeleton key={i} />);
  }
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-sm text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="py-3 px-6">#</th>
          <th className="py-3 px-6">Name</th>
          <th className="py-3 px-6">Phone Number</th>
          <th className="py-3 px-6">Create At</th>
          <th className="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="animated-pulse">{totalSkeleton}</tbody>
    </table>
  );
}

export function Skeleton() {
  return (
    <tr className="bg-white border-b border-gray-50">
      <td className="py-3 px-6">
        <div className="h-4 w-4 rounded bg-gray-100"></div>
      </td>
      <td className="py-3 px-6">
        <div className="h-4 w-32 rounded bg-gray-100"></div>
      </td>
      <td className="py-3 px-6">
        <div className="h-4 w-20 rounded bg-gray-100"></div>
      </td>
      <td className="py-3 px-6">
        <div className="h-4 w-32 rounded bg-gray-100"></div>
      </td>
      <td className="flex space-x-1 justify-center py-3">
        <div className="h-7 w-7 rounded bg-gray-100"></div>
        <div className="h-7 w-7 rounded bg-gray-100"></div>
      </td>
    </tr>
  );
}
