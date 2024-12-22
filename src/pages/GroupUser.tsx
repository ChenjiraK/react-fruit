import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/actions/UsersAction';
import { RootState, AppDispatch } from '../redux/Store';

const GroupUser: React.FC = () => {
   const dispatch: AppDispatch = useDispatch();
   const [userData, setUserData] = useState<any[]>([]);
   const [departmentData, setDepartmentData] = useState<{ [key: string]: any[] } | null>(null);
   const userState = useSelector((state: RootState) => state.users);

   function groupDepartment(users: any){
      const grouped = users.reduce((acc: { [key: string]: any[] }, user: any) => {
         const department = user?.company?.department || '';
         acc[department] = acc[department] || [];
         acc[department].push(user);
         return acc;
       }, {});
      setDepartmentData(grouped);
   }

   /** get data */
   useEffect(() => {
      dispatch(getUsers()); 
   }, [dispatch]);

   /** group department */
   useEffect(() => {
      if (userState.isSuccess && userState.data) {
         setUserData(userState.data)
         groupDepartment(userData);
      }
   }, [userState, userData]);

   return (
      <div>
         {!userState.loading ? (
            <div className="grid grid-cols-2 p-4">
               <div className="border border-gray-500 p-4">
                  <div className="text-2xl font-semibold">Original</div>
                  <pre className="text-left">
                     {JSON.stringify(userData, null, 2)}
                  </pre>
               </div>
               <div className="border border-gray-500 p-4">
                  <div className="text-2xl font-semibold">Grouping By Department</div>
                  <pre className="text-left">
                     {JSON.stringify(departmentData, null, 2)}
                  </pre>
               </div>
            </div>
         ) : (
            <div className="text-center">loading data...</div>
         )}
      </div>
   );
};

export default GroupUser;
