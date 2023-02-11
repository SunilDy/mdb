type ModalType = {
  //   handleClose: React.MouseEventHandler<HTMLButtonElement>;
  handleDivClose: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
};

const Modal = ({ handleDivClose, children }: ModalType) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-3xl z-50 flex flex-col justify-center items-center xsm:px-6 lg:px-20 h-full"
      onClick={handleDivClose}
    >
      {children}
    </div>
  );
};

export default Modal;
