// Tag component - каркас для тегу
export const Tag = ({ children, ...props }: any) => {
  return <span {...props}>{children}</span>;
};
