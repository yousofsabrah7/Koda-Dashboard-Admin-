import { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal";

const AddUserModal = ({
  showAddUser,
  setShowAddUser,
  addUserFn,
  isAddingPending,
  isAddingSuccess,
}) => {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = () => {
    if (!newUsername || !newEmail || !newPassword) {
      return setError("Please fill all fields");
    }
    addUserFn({
      username: newUsername,
      email: newEmail,
      password: newPassword,
    });
  };
  useEffect(() => {
    if (isAddingSuccess) {
      setNewUsername("");
      setNewEmail("");
      setNewPassword("");
    }
  }, [isAddingSuccess]);

  const handleClose = () => {
    setShowAddUser(false);

    setNewUsername("");
    setNewEmail("");
    setNewPassword("");
  };

  return (
    <Modal
      isOpen={showAddUser}
      onClose={handleClose}
      title="Add New User"
      description="Create a new user account."
      size="md"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            className="
              rounded-xl
              border
              border-border-subtle
              bg-surface-card
              px-4
              py-2.5
              text-sm
              font-medium
              text-text-secondary
              transition
              hover:bg-surface-elevated
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isAddingPending}
            onClick={handleSubmit}
            className="
              rounded-xl
              bg-accent
              px-4
              py-2.5
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-accent-hover
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isAddingPending ? "Adding..." : "Add User"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <p className="text-red-400">{error}</p>
        <form className="space-y-4">
          <input
            required
            type="text"
            value={newUsername}
            onChange={(e) => {
              (setNewUsername(e.target.value), setError(""));
            }}
            placeholder="Username"
            className="
            w-full
            rounded-xl
            border
            border-border-subtle
            bg-surface-base
            px-4
            py-3
            text-sm
            text-text-primary
            outline-none
            transition
            focus:border-accent
          "
          />

          <input
            required
            type="email"
            value={newEmail}
            onChange={(e) => {
              (setNewEmail(e.target.value), setError(""));
            }}
            placeholder="Email"
            className="
            w-full
            rounded-xl
            border
            border-border-subtle
            bg-surface-base
            px-4
            py-3
            text-sm
            text-text-primary
            outline-none
            transition
            focus:border-accent
          "
          />

          <input
            required
            type="password"
            value={newPassword}
            onChange={(e) => {
              (setNewPassword(e.target.value), setError(""));
            }}
            placeholder="Password"
            className="
            w-full
            rounded-xl
            border
            border-border-subtle
            bg-surface-base
            px-4
            py-3
            text-sm
            text-text-primary
            outline-none
            transition
            focus:border-accent
          "
          />
        </form>
      </div>
    </Modal>
  );
};

export default AddUserModal;
