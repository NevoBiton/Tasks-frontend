import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import DialogDetailsComponent from './DialogDetailsComponent';
import AlertDialogComponent from './AlertDialogComponent';
import { Pin, PinOff } from 'lucide-react';
import api from '@/services/api.service';




function TableCardComponent({ task, deleteTask, updateTaskList }) {

    const [isPinned, setIsPinned] = useState(task.isPinned);

    async function handlePinnedTask() {
        console.log("click");
        console.log(isPinned);
        try {
            const updatedTask = { isPinned: !isPinned };
            const res = await api.patch(`/user/${task._id}`, updatedTask);
            updateTaskList(res.data.task);
            setIsPinned(!isPinned);
            console.log(isPinned);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    return (
        <Card className="h-full flex flex-col justify-between">
            <CardHeader className="py-1">
                <CardTitle className="max-w-full break-words"></CardTitle>
                <div className='flex justify-between'>
                    <CardDescription className="break-words">{task.description}</CardDescription>
                    <AlertDialogComponent
                        deleteTask={deleteTask}
                        task={task} />
                </div>
            </CardHeader>
            <CardFooter className="flex justify-between h-fit">
                <DialogDetailsComponent
                    updateTaskList={updateTaskList}
                    task={task} />
                {task.isPinned ?
                    <PinOff onClick={() => { handlePinnedTask() }} className='cursor-pointer text-red-600' size={16} />
                    :
                    <Pin onClick={() => { handlePinnedTask() }} className='cursor-pointer text-green-600' size={16} />}
            </CardFooter>
        </Card >
    )
}

export default TableCardComponent

