import React, { useState } from 'react';
import MainButton from '../components/Button/MainButton.tsx';
import { ItemInterface } from '../types/Interface';
import { Type } from '../helper/StaticValue'; 
import JsonExample from '../Json/JsonExample.json';

const Landing : React.FC = () =>  {
   const [list, setList] = useState<ItemInterface[]>(JsonExample);
   const [fruitList, setFruitList] = useState<ItemInterface[]>([]);
   const [vegetableList, setVegetableList] = useState<ItemInterface[]>([]);
   const timeout: number = 5000; //5 second

   function onClickItemList(item: ItemInterface, index: number): void {
      if (item.type.toLowerCase().includes(Type.fruit)) {
         addFruitList(item);
         removeList(index);
         // countdown for delete fruit
         setTimeout(removeFruitList, timeout);
      }  else if (item.type.toLowerCase().includes(Type.vegetable)) {
         addVegetableList(item);
         removeList(index);
         // countdown for delete vegetable
         setTimeout(removeVegetableList, timeout);
         }
      }
  
   function addList(item: ItemInterface): void {
      setList((list) => [...list, item]);
   }
  
   function removeList(index: number): void {
      setList((list) => list.filter((_, i) => i !== index));
   }
  
   function addFruitList(item: ItemInterface): void {
      setFruitList((fruits) => [...fruits, item]);
   }
  
   function addVegetableList(item: ItemInterface): void {
      setVegetableList((vegetables) => [...vegetables, item]);
   }
  
   function removeFruitList(index: number = 0): void {
      setFruitList((fruits) => {
         const item = fruits[index];
         if (item) {
            addList(item);
         }
         return fruits.filter((_, i) => i !== index);
      });
   }
  
   function removeVegetableList(index: number = 0): void {
      setVegetableList((vegetables) => {
         const item = vegetables[index];
         if (item) {
            addList(item);
         }
         return vegetables.filter((_, i) => i !== index);
      });
   }
  
    return(
      <div>
         <div className="flex justify-center">
            <div className="grid grid-cols-3 size-content">
               <div className="m-4">
                  {list.map((item, index) => (
                  <div key={index} className="mb-2">
                     <MainButton onClick={() => onClickItemList(item, index)}>
                        {item.name}
                     </MainButton>
                  </div>
                  ))}
               </div>
               <div className="fruit m-2">
                  <div className="thead">Fruits</div>
                  {fruitList.map((fruit, index) => (
                  <div key={`fruit_${index}`} className="m-2">
                     <MainButton onClick={() => removeFruitList(index)}>
                        {fruit.name}
                     </MainButton>
                  </div>
                  ))}
               </div>
               <div className="vegetable m-2">
                  <div className="thead">Vegetables</div>
                  {vegetableList.map((vegetable, index) => (
                  <div key={`vegetable_${index}`} className="m-2">
                     <MainButton onClick={() => removeVegetableList(index)}>
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