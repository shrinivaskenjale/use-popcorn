import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </button>
      {isOpen && children}
    </div>
  );
};

export default Box;
