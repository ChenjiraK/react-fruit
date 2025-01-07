import React, { useState, useRef, useEffect } from 'react';
import MainButton from '../components/Button/MainButton.tsx';
import { ItemInterface } from '../types/Interface';
import { Type } from '../helper/StaticValue'; 
import JsonExample from '../Json/JsonExample.json';

const Landing : React.FC = () =>  {
   const [list, setList] = useState<ItemInterface[]>(JsonExample);
   const [itemsSelected, setItemsSelected] = useState<ItemInterface[]>([]);
   const [isActive, setIsActive] = useState<boolean>(false);
   //set state timmer for handle function
   const timeoutRef = useRef<number | null>(null);
   const removalIntervalRef = useRef<number | null>(null);

   function onClickItemList(item: ItemInterface, index: number): void {
      setItemsSelected((list) => [...list, item]);
      removeList(index);
   }

   function addList(item: ItemInterface): void {
      setList((list) => [...list, item]);
   }
  
   function removeList(index: number): void {
      setList((list) => list.filter((_, i) => i !== index));
   }

   const removeItemsSelected = (item: ItemInterface | null = null) => {
      if(item) {
         const index = itemsSelected.indexOf(item);
         setItemsSelected((prevItems) => {
            const addItem = prevItems[index];
            if (addItem) {
               addList(addItem);
            }
            return prevItems.filter((_, i) => i !== index);
         });
      }
    };
  
    const handleDeleteItemsSelected = () => {
      setIsActive(true)
      // รีเซ็ต timeout เมื่อมีกิจกรรมของผู้ใช้
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
  
      timeoutRef.current = window.setTimeout(() => {
         setIsActive(false)
      }, 5000);
    };

    useEffect(() => {
      //listener click event
      window.addEventListener("click", handleDeleteItemsSelected);
      // ตั้ง timeout เริ่มต้น
      handleDeleteItemsSelected();

      return () => {
        // ลบ event listener และ timeout เมื่อ component ถูกทำลาย
        window.removeEventListener("click", handleDeleteItemsSelected);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (!isActive && itemsSelected.length > 0) {
         //เมื่อไม่มีการ click (isActive = false), และ items มี data ใน list
         removalIntervalRef.current = window.setInterval(() => {
            removeItemsSelected(itemsSelected[0]);
         }, 1000);
      }
  
      // ล้าง interval เมื่อ component ถูกทำลาย
      return () => {
        if (removalIntervalRef.current) {
          clearInterval(removalIntervalRef.current);
        }
      };
      // eslint-disable-next-line
    }, [isActive, itemsSelected]); //เมื่อ isActive และ itemsSelected มีการเปลี่ยนแปลง useEffect จะทำงานอีกรอบ
  
    return(
      <div>
         <div className="flex justify-center">
            <div className="grid grid-cols-3 size-content">
               <div className="m-4 list">
                  {list.map((item, index) => (
                     <div key={`list_${index}`} className="mb-2">
                        <MainButton onClick={() => onClickItemList(item, index)}>
                           {item.name}
                        </MainButton>
                     </div>
                  ))}
               </div>
               <div className="fruit m-2" data-testid="test-fruit-list">
                  <div className="thead">Fruits</div>
                  {itemsSelected
                     .filter((fruit) => fruit.type.toLowerCase() === Type.fruit)
                     .map((fruit, index) => (
                        <div key={`select_fruit_${index}`} className="m-2 flex justify-center">
                           <MainButton onClick={() => removeItemsSelected(fruit)}>
                              {fruit.name}
                           </MainButton>
                        </div>
                  ))}
               </div>
               <div className="vegetable m-2" data-testid="vegetable-list">
                  <div className="thead">Vegetables</div>
                  {itemsSelected
                     .filter((vegetable) => vegetable.type.toLowerCase() === Type.vegetable)
                     .map((vegetable, index) => (
                        <div key={`vegetable_${index}`} className="m-2 flex justify-center">
                           <MainButton onClick={() => removeItemsSelected(vegetable)}>
                              {vegetable.name}
                           </MainButton>
                        </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
     
    )
}
export default Landing;