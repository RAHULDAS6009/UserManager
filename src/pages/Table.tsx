import { CircleUserRound, Pencil, Trash } from "lucide-react";
import { backendUrl, usePaginatedUsers } from "../hooks/usePaginatedUser"; 
import { useState } from "react";
import { Modal } from "../components/generic/Modal";
import { ProfileEdit } from "../components/ProfileEdit";
import axios from "axios";

const TableHead = () => (
  <thead className="text-xs text-gray-600 uppercase bg-indigo-100 border border-b-2 border-slate-200">
    <tr>
      {["#", "Avatar", "First Name", "Last Name", "Email", "Actions"].map(
        (heading, index) => (
          <th
            key={index}
            className={`px-6 py-3 ${heading === "Actions" ? "pl-10" : ""}`}
          >
            {heading}
          </th>
        )
      )}
    </tr>
  </thead>
);

const TableRow = ({
  user,
  onEdit,
  onDelete,
}: {
  user: any;
  onEdit: (user: any) => void;
  onDelete: (user: any) => void;
}) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50">
    <TableCell isHeader>{user.id}</TableCell>
    <TableCell>
      {user.avatar ? (
        <img
          className="w-10 h-10 rounded-full border-4 border-indigo-200"
          src={user.avatar}
          alt={user.first_name}
        />
      ) : (
        <CircleUserRound className="w-10 h-10" />
      )}
    </TableCell>
    <TableCell>{user.first_name}</TableCell>
    <TableCell>{user.last_name}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>
      <div className="flex gap-1">
        <Pencil
          onClick={() => onEdit(user)}
          className="text-indigo-400 hover:text-indigo-700 hover:bg-indigo-100 hover:rounded-md p-3 w-10 h-10 cursor-pointer"
        />
        <Trash
          onClick={() => onDelete(user)}
          className="text-red-400 hover:text-red-700 hover:bg-red-100 hover:rounded-md p-3 w-10 h-10 cursor-pointer"
        />
      </div>
    </TableCell>
  </tr>
);

const TableCell = ({
  children,
  isHeader = false,
}: {
  children: React.ReactNode;
  isHeader?: boolean;
}) =>
  isHeader ? (
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
    >
      {children}
    </th>
  ) : (
    <td className="px-6 py-4">{children}</td>
  );

export const Table = () => {
  const { users, page, totalPages, loading, error, setPage } =
    usePaginatedUsers();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  return (
    <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHead />
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-red-500">
                {error}
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <TableRow
                key={user.id}
                user={user}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </tbody>
      </table>

      <div className="flex flex-wrap justify-center items-center gap-2 mt-4 mb-2 overflow-x-auto px-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 text-sm md:text-base rounded-md ${
            page === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white"
          }`}
        >
          Previous
        </button>

        <div className="flex gap-1 overflow-x-auto">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`px-3 py-1 md:px-4 md:py-2 text-xs md:text-base rounded-md ${
                page === index + 1
                  ? "bg-indigo-700 text-white"
                  : "bg-indigo-300 text-gray-800"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-4 py-2 text-sm md:text-base rounded-md ${
            page === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white"
          }`}
        >
          Next
        </button>
      </div>

      {selectedUser && (
        <ProfileEdit
          isOpen={isOpen}
          user={selectedUser}
          closeModal={() => setOpen(false)}
        />
      )}

      {selectedUser && (
        <Modal
          isOpen={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          title="Confirm Deletion"
          description={`Are you sure you want to delete ${selectedUser.first_name} ${selectedUser.last_name}?`}
        >
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setDeleteOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={async (event) => {
                event.preventDefault();
                try {
                  await axios.delete(
                    `${backendUrl}/api/users/${selectedUser.id}`
                  );
                  setDeleteOpen(false);
                } catch (error) {
                  console.error("Error deleting profile:", error);
                }
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
