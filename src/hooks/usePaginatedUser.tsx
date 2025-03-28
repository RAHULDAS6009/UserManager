import { useEffect, useState, useCallback } from "react";
import { User } from "../types";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/users?page=${page}`, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data: ApiResponse = await response.json();
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, page, totalPages, loading, error, setPage };
};
