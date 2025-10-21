// Modal component - каркас для модального вікна
export const Modal = ({ isOpen, children, ...props }: any) => {
  if (!isOpen) return null;

  return <div>{children}</div>;
};
