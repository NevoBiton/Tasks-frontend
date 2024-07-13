import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import api from '@/services/api.service';
import { FilePenLine, Trash2 } from 'lucide-react';

function DialogDetailsComponent({ task, updateTaskList }) {

    const { toast } = useToast()
    const [todos, setTodos] = useState(task.todoList);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        title: task.title,
        description: task.description,
        body: task.body,
        todoList: task.todoList,
        isPinned: task.isPinned,
    });

    const [newTodoTitle, setNewTodoTitle] = useState('');

    function handleAddTodo() {
        if (newTodoTitle.trim()) {
            const newTodo = { title: newTodoTitle, isComplete: false };
            const updatedTodos = [...todos, newTodo];
            setTodos(updatedTodos);
            setEditedTask({ ...editedTask, todoList: updatedTodos });
            setNewTodoTitle('');
        }
    }

    async function handleCheckboxChange(index) {
        const updatedTodos = [...todos];
        updatedTodos[index].isComplete = !updatedTodos[index].isComplete;
        setTodos(updatedTodos);
        await saveUpdatedTodos(updatedTodos)
        setEditedTask({ ...editedTask, todoList: updatedTodos });
    }

    async function saveUpdatedTodos(updatedTodos) {
        try {
            const res = await api.patch(`/user/${task._id}`, { todoList: updatedTodos });
            updateTaskList(res.data.task);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    function handleTodoChange(index, value) {
        const updatedTodos = [...todos];
        updatedTodos[index].title = value;
        setTodos(updatedTodos);
        setEditedTask({ ...editedTask, todoList: updatedTodos });
    }

    function handleRemoveTodo(index) {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        setEditedTask({ ...editedTask, todoList: updatedTodos });
    }

    function handleEditChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setEditedTask({ ...editedTask, [name]: value });
    }

    function handleEditClick() {
        console.log(isEditing);
        setIsEditing(!isEditing);
    }


    async function handleSaveClick() {
        try {
            const res = await api.patch(`/user/${task._id}`, editedTask);
            updateTaskList(res.data.task);
            toast({
                title: "Task Updated",
                description: "The task has been updated successfully.",
                status: "success",
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating task:', error);
            toast({
                title: "Update Failed",
                description: error.response?.data?.message || "An error occurred while updating the task.",
                status: "error",
            });
        }
        console.log("Task saved:", editedTask);
        setIsEditing(false);
    }

    return (
        <Dialog>
            <DialogTrigger>Details</DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-center">Task details</DialogTitle>
                    {/* <DialogDescription>
                        Explore all your to-dos for this task in one place. Stay organized and informed with a comprehensive view of:
                    </DialogDescription> */}
                    {isEditing ? (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="title">Title:</Label>
                            <Input
                                id="title"
                                name="title"
                                value={editedTask.title}
                                onChange={handleEditChange}
                            />
                            <Label htmlFor="description">Description:</Label>
                            <Input
                                id="description"
                                name="description"
                                value={editedTask.description}
                                onChange={handleEditChange}
                            />
                            <Label htmlFor="body">Body:</Label>
                            <Input
                                id="body"
                                name="body"
                                value={editedTask.body}
                                onChange={handleEditChange}
                            />
                            <Label>Todos:</Label>
                            {todos.map((todo, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        className="h-6 w-full"
                                        type="text"
                                        value={todo.title}
                                        onChange={(e) => handleTodoChange(index, e.target.value)}
                                    />
                                    <Input
                                        className="h-6 w-fit"
                                        type="checkbox"
                                        checked={todo.isComplete}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <Trash2
                                        className="cursor-pointer"
                                        size={16}
                                        onClick={() => handleRemoveTodo(index)} // Add onClick handler
                                    />
                                </div>

                            ))}
                            <div className="flex items-center gap-2 mt-2">
                                <Input
                                    className="h-6 w-full"
                                    type="text"
                                    placeholder="Add new todo"
                                    value={newTodoTitle}
                                    onChange={(e) => setNewTodoTitle(e.target.value)}
                                />
                                <Button className="p-1 h-fit" onClick={handleAddTodo}>Add</Button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col'><span className='text-xl font-medium'>Title :</span><p className='text-sm text-gray-400' >{task.title}</p></div>
                            <div className='flex flex-col'><span className='text-xl font-medium'>Description :</span><p className='text-sm text-gray-400'>{task.description}</p></div>
                            <div className='flex flex-col'><span className='text-xl font-medium'>Body :</span><p className='text-sm text-gray-400'>{task.body}</p></div>
                            <div className='flex flex-col gap-2'>
                                <span className='text-xl font-medium'>Todos :</span>
                                {todos.map((todo, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <Label className="text-l font-normal text-gray-400">{todo.title}</Label>
                                        <Input
                                            className="h-6 w-fit"
                                            type="checkbox"
                                            checked={todo.isComplete}
                                            onChange={() => handleCheckboxChange(index)}
                                            readOnly
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                    <Button className="p-2 h-fit" onClick={handleEditClick}>
                        {isEditing ? "Cancel" : <FilePenLine />}
                    </Button>
                    {isEditing && (
                        <Button className="p-2 h-fit" onClick={handleSaveClick}>Save</Button>
                    )}
                </div>
                {/* <DialogClose asChild>
                    <Button className="mt-4">Close</Button>
                </DialogClose> */}
            </DialogContent>
        </Dialog>
    )
}

export default DialogDetailsComponent;