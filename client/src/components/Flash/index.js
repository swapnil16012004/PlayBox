const Flash = ({ success, message, onClose }) => {
  if (!message) return null;
  return (
    <>
      <div
        className={`alert ${
          success ? "alert-success" : "alert-danger"
        } alert-dismissible fade show col-5 offset-3 mt-4`}
        role="alert"
      >
        {message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
    </>
  );
};

export default Flash;
