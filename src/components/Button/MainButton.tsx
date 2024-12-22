import React, { ReactNode } from "react";
import { emits } from "../../helper/EmitData";
type MainButtonProps = {
    children: ReactNode;
    onClick: () => void;
};

const MainButton : React.FC<MainButtonProps> = ({ 
  children, onClick
}) => {
  function onClickBtn() {
    emits(onClick, null)
  }
  return (
    <button className='text-black border border-gray-500 bg-white p-2 w-full max-w-48'
        onClick={() => onClickBtn()}>
            {children}
    </button>
  );
};

export default MainButton;