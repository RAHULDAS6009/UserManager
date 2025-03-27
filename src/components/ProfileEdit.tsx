import { Modal } from "./generic/Modal";
import { Input } from "./generic/Input";
import { Button } from "./generic/Button";
import { User } from "../types";

const dummyUser = {
  id: 1,
  email: "george.bluth@reqres.in",
  firstname: "George",
  lastname: "Bluth",
  avatar: "https://reqres.in/img/faces/1-image.jpg",
};

interface ProfileEditProps {
  isOpen: boolean;
  closeModal: () => void;
  user:User;
}

export const ProfileEdit = ({ isOpen, closeModal ,user}: ProfileEditProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Edit User Profile"
      description="Make changes to the user profile here. Click save when you're done."
    >
      <form className="mt-4 space-y-4">
        <div className="flex justify-center">
          <img
            className="bg-amber-200 w-24 h-24 rounded-full border-2 border-indigo-400"
            src={user.avatar}
            alt=""
          />
        </div>
        <Input label="First Name" placeholder="Enter first name" defaultValue={user.first_name} />
        <Input label="Last Name" placeholder="Enter last name" defaultValue={user.last_name} />
        <Input label="Email" type="email" placeholder="Enter email" defaultValue={user.email} />

        <div className="flex justify-end space-x-3">
          <Button variant="outlined" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};
