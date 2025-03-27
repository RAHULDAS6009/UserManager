import { CircleUserRound, Pencil, Trash } from "lucide-react";

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
}

const users: User[] = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    firstname: "George",
    lastname: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg",
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    firstname: "Janet",
    lastname: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg",
  },
  {
    id: 3,
    email: "emma.wong@reqres.in",
    firstname: "Emma",
    lastname: "Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg",
  },
  {
    id: 4,
    email: "eve.holt@reqres.in",
    firstname: "Eve",
    lastname: "Holt",
    avatar: "https://reqres.in/img/faces/4-image.jpg",
  },
  {
    id: 5,
    email: "charles.morris@reqres.in",
    firstname: "Charles",
    lastname: "Morris",
    avatar: "https://reqres.in/img/faces/5-image.jpg",
  },
  {
    id: 6,
    email: "tracey.ramos@reqres.in",
    firstname: "Tracey",
    lastname: "Ramos",
    avatar: "https://reqres.in/img/faces/6-image.jpg",
  },
];

const TableHead = () => (
  <thead className="text-xs text-gray-600 uppercase bg-indigo-100 hover:bg-gray-50 border border-b-2 border-slate-200">
    <tr>
      {["#", "Avtar", "First's Name", "Last Name", "Email", "Actions"].map(
        (heading, index) => (
          <th key={index} className={`px-6 py-3 ${heading == 'Actions' && "pl-10"}  `}>
            {heading}
          </th>
        )
      )}
    </tr>
  </thead>
);

const TableRow = ({ user }: { user: User }) => (
  <tr className=" border-b border-gray-200 hover:bg-gray-50">
    <TableCell isHeader>{user.id}</TableCell>
    <TableCell>
      {user.avatar ? <img className="w-10 h-10 rounded-full border-4 border-indigo-200" src={user.avatar} alt="" /> : <CircleUserRound className="w-10 h-10 " />}
    </TableCell>
    <TableCell>{user.firstname}</TableCell>
    <TableCell>{user.lastname}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>
      <div className="flex gap-1 ">

      <Pencil   className="text-indigo-400 hover:text-indigo-700 hover:bg-indigo-100 hover:rounded-md p-3 w-10 h-10 " />
      <Trash className="text-red-400 hover:text-red-700 hover:bg-red-100 hover:rounded-md p-3 w-10 h-10 " />
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
      className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap"
    >
      {children}
    </th>
  ) : (
    <td className="px-6 py-4">{children}</td>
  );

export const Table = () => {
  return (
    <div className="w-full  overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <TableHead />
        <tbody>
          {users.map((user, index) => (
            <TableRow key={index} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
