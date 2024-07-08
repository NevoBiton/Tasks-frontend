import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import api from '@/services/api.service';
import CardComponent from '@/components/hand/CardComponent';
import { useToast } from "@/components/ui/use-toast"
import DialogAddTaskComponent from '@/components/hand/DialogAddTaskComponent';
import { Button } from '@/components/ui/button';
import { ClipboardList } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
import ScrollToTopButton from "../components/hand/ScrollToTopButton";


function TasksPage() {

    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const pinnedTasks = tasks.filter((task) => task.isPinned)
    const unPinnedTasks = tasks.filter((task) => !task.isPinned)
    const { loggedInUser } = useContext(AuthContext);
    const [totalNumOfTasks, setTotalNumOfTasks] = useState(null)

    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9]


    useEffect(() => {

        const abortController = new AbortController();
        const { signal } = abortController;

        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await api.get("/user", { signal })
                console.log(res.data.products);
                setTasks(res.data.products)
                setTotalNumOfTasks(res.data.total)
                setLoading(false)
            } catch (error) {
                if (error.name === "AbortError") {
                    console.log("Request aborted:", error.message);
                } else if (error.name === "CanceledError") {
                    console.log("Request canceled");
                } else {
                    console.error("Error fetching products:", error);
                }
            }
        };

        fetchData();
        return () => {
            abortController.abort();
        };

    }, [])

    async function deleteTask(taskId) {
        try {
            await deleteTaskFromDatabase(taskId);
            const newTaskList = tasks.filter((task) => task._id !== taskId);
            setTasks(newTaskList);
            toast({
                title: "Delete Successful",
                description: "You have successfully deleted your task.",
                status: "success",
            });
        } catch (error) {
            toast({
                title: "Delete Failed",
                description: error.response?.data?.message || "An error occurred during deleting task.",
                status: "error",
            });
            console.error("Error deleting post:", error);
        }
    }

    async function deleteTaskFromDatabase(taskId) {
        try {
            const res = await api.delete(`/user/${taskId}`)
            console.log("Task removed:", res.data);
        } catch (error) {
            console.error("Error Delete Task from DB:", error);
        }
    }

    function updateTaskList(updatedTask) {
        setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
    }

    if (loading) {
        return (
            <div className='flex flex-col gap-4 py-4  max-w-[70vw] mx-auto'>
                <DialogAddTaskComponent
                    tasks={tasks}
                    setTasks={setTasks}
                    isOpen={isOpen}
                    closeDialogHandler={() => setIsOpen(false)}
                />
                <Button onClick={() => setIsOpen(true)} className="font-normal flex gap-2 items-center bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-md w-fit">Add Task <ClipboardList size={20} /></Button>
                <div>
                    <h1 className="text-3xl font-bold py-2 text-gray-600">Pinned Tasks :</h1>
                    <ul className='grid grid-cols-3 gap-4'>
                        {skeletons?.map((skeleton, index) => (
                            <div key={index} className="flex flex-col space-y-3">
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div >

        )
    }


    return (
        <div className='flex flex-col gap-4 py-4  max-w-[70vw] mx-auto'>
            <DialogAddTaskComponent
                tasks={tasks}
                setTasks={setTasks}
                isOpen={isOpen}
                closeDialogHandler={() => setIsOpen(false)}
            />
            <Button onClick={() => setIsOpen(true)} className="font-normal flex gap-2 items-center bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-md w-fit">Add Task <ClipboardList size={20} /></Button>
            <div>
                <h1 className="text-3xl font-bold py-2 text-header dark:text-header">Pinned Tasks :</h1>
                <ul className='grid grid-cols-3 gap-4'>
                    {pinnedTasks?.map((task) => (
                        <li key={task._id}>
                            <CardComponent
                                task={task}
                                deleteTask={deleteTask}
                                updateTaskList={updateTaskList} />
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h1 className="text-3xl font-bold py-2 text-header dark:text-header">Unpinned Tasks :</h1>
                <ul className='grid grid-cols-3 gap-4'>
                    {unPinnedTasks?.map((task) => (
                        <li key={task._id}>
                            <CardComponent
                                task={task}
                                deleteTask={deleteTask}
                                updateTaskList={updateTaskList} />
                        </li>
                    ))}
                </ul>
            </div>
            <ScrollToTopButton />
        </div >


    )

}

export default TasksPage

// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '@/contexts/AuthContext';
// import api from '@/services/api.service';
// import CardComponent from '@/components/hand/CardComponent';
// import { useToast } from "@/components/ui/use-toast";
// import DialogAddTaskComponent from '@/components/hand/DialogAddTaskComponent';
// import { Button } from '@/components/ui/button';
// import { ClipboardList } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import ScrollToTopButton from "../components/hand/ScrollToTopButton";

// function TasksPage() {
//     const { toast } = useToast();
//     const [isOpen, setIsOpen] = useState(false);
//     const [tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isGridView, setIsGridView] = useState(true); // State to toggle between grid and table view
//     const { loggedInUser } = useContext(AuthContext);
//     const [totalNumOfTasks, setTotalNumOfTasks] = useState(null);
//     const pinnedTasks = tasks.filter((task) => task.isPinned);
//     const unPinnedTasks = tasks.filter((task) => !task.isPinned);
//     const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//     useEffect(() => {
//         const abortController = new AbortController();
//         const { signal } = abortController;

//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const res = await api.get("/user", { signal });
//                 setTasks(res.data.products);
//                 setTotalNumOfTasks(res.data.total);
//                 setLoading(false);
//             } catch (error) {
//                 if (error.name === "AbortError") {
//                     console.log("Request aborted:", error.message);
//                 } else if (error.name === "CanceledError") {
//                     console.log("Request canceled");
//                 } else {
//                     console.error("Error fetching products:", error);
//                 }
//             }
//         };

//         fetchData();

//         return () => {
//             abortController.abort();
//         };
//     }, []);

//     async function deleteTask(taskId) {
//         try {
//             await deleteTaskFromDatabase(taskId);
//             const newTaskList = tasks.filter((task) => task._id !== taskId);
//             setTasks(newTaskList);
//             toast({
//                 title: "Delete Successful",
//                 description: "You have successfully deleted your task.",
//                 status: "success",
//             });
//         } catch (error) {
//             toast({
//                 title: "Delete Failed",
//                 description: error.response?.data?.message || "An error occurred during deleting task.",
//                 status: "error",
//             });
//             console.error("Error deleting post:", error);
//         }
//     }

//     async function deleteTaskFromDatabase(taskId) {
//         try {
//             const res = await api.delete(`/user/${taskId}`);
//             console.log("Task removed:", res.data);
//         } catch (error) {
//             console.error("Error Delete Task from DB:", error);
//         }
//     }

//     function updateTaskList(updatedTask) {
//         setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
//     }

//     function toggleGridView() {
//         setIsGridView(true);
//     }

//     function toggleTableView() {
//         setIsGridView(false);
//     }

//     return (
//         <div className='flex flex-col gap-4 py-4  max-w-[70vw] mx-auto'>
//             <DialogAddTaskComponent
//                 tasks={tasks}
//                 setTasks={setTasks}
//                 isOpen={isOpen}
//                 closeDialogHandler={() => setIsOpen(false)}
//             />
//             <div className="flex justify-end gap-4">
//                 <Button onClick={toggleGridView} className={`font-normal flex gap-2 items-center ${isGridView ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 hover:bg-gray-400'} text-white text-sm py-2 px-4 rounded-md w-fit`}>
//                     Grid View <ClipboardList size={20} />
//                 </Button>
//                 <Button onClick={toggleTableView} className={`font-normal flex gap-2 items-center ${!isGridView ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 hover:bg-gray-400'} text-white text-sm py-2 px-4 rounded-md w-fit`}>
//                     Table View <ClipboardList size={20} />
//                 </Button>
//             </div>
//             <div>
//                 <h1 className="text-3xl font-bold py-2 text-header dark:text-header">Pinned Tasks :</h1>
//                 {isGridView ? (
//                     <ul className='grid grid-cols-3 gap-4'>
//                         {pinnedTasks?.map((task) => (
//                             <li key={task._id}>
//                                 <CardComponent
//                                     task={task}
//                                     deleteTask={deleteTask}
//                                     updateTaskList={updateTaskList} />
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {pinnedTasks?.map((task) => (
//                                 <tr key={task._id} className="bg-white">
//                                     <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="flex items-center space-x-2">
//                                             <button onClick={() => deleteTask(task._id)} className="text-red-500 hover:text-red-700">Delete</button>
//                                             {/* Add more actions as needed */}
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//             <div>
//                 <h1 className="text-3xl font-bold py-2 text-header dark:text-header">Unpinned Tasks :</h1>
//                 {isGridView ? (
//                     <ul className='grid grid-cols-3 gap-4'>
//                         {unPinnedTasks?.map((task) => (
//                             <li key={task._id}>
//                                 <CardComponent
//                                     task={task}
//                                     deleteTask={deleteTask}
//                                     updateTaskList={updateTaskList} />
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-50">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {unPinnedTasks?.map((task) => (
//                                 <tr key={task._id} className="bg-white">
//                                     <td className="px-6 py-4 whitespace-nowrap">{task.title}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">{task.description}</td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <div className="flex items-center space-x-2">
//                                             <button onClick={() => deleteTask(task._id)} className="text-red-500 hover:text-red-700">Delete</button>
//                                             {/* Add more actions as needed */}
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//             <ScrollToTopButton />
//         </div>
//     );
// }

// export default TasksPage;






