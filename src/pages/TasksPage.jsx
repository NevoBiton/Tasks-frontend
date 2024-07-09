import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import api from '@/services/api.service';
import CardComponent from '@/components/hand/CardComponent';
import { useToast } from "@/components/ui/use-toast"
import DialogAddTaskComponent from '@/components/hand/DialogAddTaskComponent';
import { Button } from '@/components/ui/button';
import { ClipboardList, LayoutGrid, TableProperties } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"
import ScrollToTopButton from "../components/hand/ScrollToTopButton";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TableCardComponent from '@/components/hand/TableCardComponent';

function TasksPage() {
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const pinnedTasks = tasks.filter((task) => task.isPinned)
    const unPinnedTasks = tasks.filter((task) => !task.isPinned)
    const { loggedInUser } = useContext(AuthContext);
    const [totalNumOfTasks, setTotalNumOfTasks] = useState(null)
    const [viewMode, setViewMode] = useState('grid') // Add state for view mode

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
            <div className="flex gap-2">
                <Button onClick={() => setIsOpen(true)} className="font-normal flex gap-2 items-center bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-md w-fit">Add Task <ClipboardList size={20} /></Button>
                <Button onClick={() => setViewMode('grid')} className="font-normal flex gap-2 items-center text-sm py-1 px-2 rounded-md w-fit"><LayoutGrid /></Button>
                <Button onClick={() => setViewMode('table')} className="font-normal flex gap-2 items-center text-sm py-1 px-2 rounded-md w-fit"><TableProperties /></Button>
            </div>
            {viewMode === 'grid' ? (
                <>
                    {/* <div>
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
                    </div> */}
                    <div>
                        <h1 className="text-3xl font-bold py-2 text-header dark:text-header">Pinned Tasks :</h1>
                        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
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
                        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
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
                </>
            ) : (
                <>
                    <div>
                        <h1 className="text-3xl font-bold py-2 text-header dark:text-header">Pinned Tasks :</h1>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Task</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pinnedTasks?.map((task) => (
                                    <TableRow key={task._id}>
                                        <TableCell className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap" title={task.title}>
                                            {task.title}
                                        </TableCell>
                                        <TableCell >{task.status}</TableCell>
                                        <TableCell className="w-[45vw]">
                                            <TableCardComponent
                                                task={task}
                                                deleteTask={deleteTask}
                                                updateTaskList={updateTaskList}
                                                tableView={true}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold py-2 text-header dark:text-header">Unpinned Tasks :</h1>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Task</TableHead>
                                    {/* <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {unPinnedTasks?.map((task) => (
                                    <TableRow key={task._id}>
                                        <TableCell className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap" title={task.title}>
                                            {task.title}
                                        </TableCell>

                                        <TableCell>{task.status}</TableCell>
                                        <TableCell className="w-[45vw]">
                                            <TableCardComponent
                                                task={task}
                                                deleteTask={deleteTask}
                                                updateTaskList={updateTaskList}
                                                tableView={true}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </>
            )}
            <ScrollToTopButton />
        </div>
    )
}

export default TasksPage






