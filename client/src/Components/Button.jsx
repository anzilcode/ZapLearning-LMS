const Button = ({text,onClick}) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-blue-600 text-white text-sm md:text-base font-medium rounded-md 
      hover:bg-blue-700 transition duration-200 shadow-sm hover:shadow-md cursor-pointer"
    >
      {text}
    </button>
  );
};

export default Button;


