import { useEffect, useState } from "react";
import Modal from "../../components/UI/Modal";

const EditUserModal = ({
  showEditUser,
  setShowEditUser,
  user,
  updateUserFn,
  isUpdating,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    if (!user) return;

    setUsername(user.username || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
  }, [user]);
  const handleClose = () => {
    setShowEditUser(false);
  };

  const handleSubmit = () => {
    if (!user?._id) return;
    updateUserFn({
      username,
      email,
      phone,
    });
  };

  return (
    <Modal
      isOpen={showEditUser}
      onClose={handleClose}
      title="Edit User"
      description="Update user information."
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
            disabled={isUpdating}
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
            {isUpdating ? "Updating..." : "Update User"}
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
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
      </div>
    </Modal>
  );
};

export default EditUserModal;
