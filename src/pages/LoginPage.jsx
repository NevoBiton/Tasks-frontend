import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useToast } from "@/components/ui/use-toast"
import api from "../services/api.service"
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react'


function LoginPage() {

    const { toast } = useToast();
    const navigate = useNavigate()


    async function handleLogin(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const username = formData.get("username").toLowerCase();
        const password = formData.get("password");

        try {
            const res = await api.post("/auth/login", {
                username,
                password,
            });
            const { token } = res.data;
            console.log(token);
            localStorage.setItem("token", token);
            toast({
                title: "Login Successful",
                description: "You have successfully logged in.",
                status: "success",
            });
            navigate("/task")

        } catch (error) {
            console.log(error);
            toast({
                title: "Login Failed",
                description: error.response?.data?.message || "An error occurred during login.",
                status: "error",
            });
        }
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    {/* <CardDescription></CardDescription> */}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                        <div>
                            <Label htmlFor="name">Username :</Label>
                            <div className='flex items-center gap-1'>
                                <User size={16} />
                                <Input
                                    type={"text"}
                                    placeholder={"Name"}
                                    id={"name"}
                                    name={"username"}
                                    required={"required"} />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="password">Password :</Label>
                            <div className='flex items-center gap-1'>
                                <Lock size={16} />
                                <Input
                                    type={"password"}
                                    placeholder={"Password"}
                                    id={"password"}
                                    name={"password"}
                                    required={"required"} />
                            </div>
                        </div>
                        <Button className="w-fit h-fit p-2">Submit</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <p>Dont have an account? <Link to="/auth/register"><span className='text-blue-600 font-medium'>Sign Up!</span></Link></p>
                </CardFooter>
            </Card>
        </>


    )
}

export default LoginPage