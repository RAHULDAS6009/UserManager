import { useState } from "react";
import { NavBar } from "../components/NavBar";
import { Table } from "../components/Table";

export const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <NavBar onSearch={setSearchQuery} />
      <Table searchQuery={searchQuery} />
    </div>
  );
};
