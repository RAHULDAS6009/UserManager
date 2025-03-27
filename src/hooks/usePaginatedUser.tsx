import { useEffect, useState } from "react";
import { User } from "../types";

const backendUrl = import.meta.env.VITE_BACKEND_URL


interface ApiResponse {
  data: User[];
  page: number;
  total_pages: number;
}

export const usePaginatedUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${backendUrl}/api/users?page=${page}`);
        const data: ApiResponse = await response.json();
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  return { users, page, totalPages, loading, error, setPage };
};
