import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"
import api from '@/services/api.service';

function DialogAddTaskComponent({ tasks, setTasks, isOpen, closeDialogHandler }) {

    const { toast } = useToast();
    const [todos, setTodos] = useState([{ title: '' }]);

    function handleAddTodoInput() {
        setTodos([...todos, { title: '' }]);
    };

    function handleRemoveTodoInput() {
        if (todos.length === 1) return;
        const newTodos = todos.slice(0, todos.length - 1);
        setTodos(newTodos);
    };



    function handleTodoChange(index, value) {
        const newTodos = [...todos];
        newTodos[index].title = value;
        setTodos(newTodos);
    };

    async function handleSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const title = formData.get("title")
        const description = formData.get("description")
        const body = formData.get("body")


        try {
            const res = await api.post("/user", {
                title,
                description,
                body,
                todoList: todos
            });
            const newTask = res.data
            const newTasksList = [...tasks, newTask];
            setTasks(newTasksList)
            closeDialogHandler()
            toast({
                title: "Task Added Successful",
                description: "You have successfully Added a new task.",
                status: "success",
            });
        } catch (error) {
            console.error('Error creating task:', error);
            toast({
                title: "Add Failed",
                description: error.response?.data?.message || "An error occurred during adding task.",
                status: "error",
            });
        }
    };



    return (
        <Dialog open={isOpen} onOpenChange={closeDialogHandler}>
            <DialogContent className="min-w-[50vw] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create new Task</DialogTitle>
                    <DialogDescription>
                        Explore all your to-dos for this task in one place. Stay organized and informed with a comprehensive view of:
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="title">Title :</Label>
                        <Input
                            type="text"
                            placeholder="Title"
                            id="title"
                            name="title"
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="description">Description :</Label>
                        <Input
                            type="text"
                            placeholder="Description"
                            id="description"
                            name="description"
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="body">Body :</Label>
                        <Input
                            type="text"
                            placeholder="Body"
                            id="body"
                            name="body"
                            required
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <Label>Todos:</Label>
                        {todos.map((todo, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input
                                    type="text"
                                    placeholder={`Todo ${index + 1}`}
                                    value={todo.title}
                                    onChange={(ev) => handleTodoChange(index, ev.target.value)}
                                    required
                                />
                            </div>
                        ))}
                        <div className='flex gap-2'>
                            <Button className="w-fit h-fit p-2" type="button" onClick={handleAddTodoInput}><Plus size={16} /></Button>
                            {todos.length > 1 ? <Button className="w-fit h-fit p-2" type="button" onClick={handleRemoveTodoInput}><Minus size={16} /></Button> : null}
                        </div>
                    </div>
                    {/* <DialogClose>
                    </DialogClose> */}
                    <Button type="submit" className="w-fit self-center">Create</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default DialogAddTaskComponent;
