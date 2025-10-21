// Input component - каркас для поля вводу
export const Input = ({ label, ...props }: any) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  );
};
