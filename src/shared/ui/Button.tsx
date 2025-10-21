// Button component - каркас для кнопки
export const Button = ({ children, ...props }: any) => {
  return <button {...props}>{children}</button>;
};
