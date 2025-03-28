import { useState } from "react";
import axios from "axios";
import { Modal } from "./generic/Modal";
import { Input } from "./generic/Input";
import { Button } from "./generic/Button";
import { User } from "../types";
import { backendUrl } from "../hooks/usePaginatedUser";
import toast from "react-hot-toast";

interface ProfileEditProps {
  isOpen: boolean;
  closeModal: () => void;
  user: User;
}

export const ProfileEdit = ({ isOpen, closeModal, user }: ProfileEditProps) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.put(`${backendUrl}/api/users/${user.id}`, formData);
      console.log("Profile updated successfully:", res.data);
      closeModal();
      toast.success(`user updated successfully`)
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Edit User Profile"
      description="Make changes to the user profile here. Click save when you're done."
    >
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div className="flex justify-center">
          <img
            className="bg-amber-200 w-24 h-24 rounded-full border-2 border-indigo-400"
            src={user.avatar}
            alt="User Avatar"
          />
        </div>
        <Input
          label="First Name"
          name="first_name"
          placeholder="Enter first name"
          onChange={handleChange}
          defaultValue={formData.first_name}
        />
        <Input
          label="Last Name"
          name="last_name"
          placeholder="Enter last name"
          onChange={handleChange}
          defaultValue={formData.last_name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={handleChange}
          defaultValue={formData.email}
        />
        <div className="flex justify-end space-x-3">
          <Button variant="outlined" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
