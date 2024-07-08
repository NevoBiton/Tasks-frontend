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
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"
import api from '@/services/api.service'


function RegisterPage() {

    const { toast } = useToast();
    const navigate = useNavigate()

    async function handleRegister(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const username = formData.get("username");
        const password = formData.get("password");
        const email = formData.get("email");
        const firstName = formData.get("fname");
        const lastName = formData.get("lname");

        try {
            await api.post("/auth/register", {
                username,
                password,
                email,
                firstName,
                lastName
            });
            toast({
                title: "User Register Successful",
                description: "You have successfully Registered.",
                status: "success",
            });
            navigate("/auth/login")
            console.log("User Register successfully");

        } catch (error) {
            toast({
                title: "Register Failed",
                description: error.response?.data?.message || "An error occurred during Register.",
                status: "error",
            });
            console.log(error);
        }
    }

    return (
        <Card className="max-h-[95vh]">
            <CardHeader className="py-3">
                <CardTitle>Register</CardTitle>
                {/* <CardDescription></CardDescription> */}
            </CardHeader>
            <CardContent>
                <form onSubmit={handleRegister} className='flex flex-col gap-2'>
                    <div>
                        <Label htmlFor="username">Username :</Label>
                        <Input
                            type={"text"}
                            placeholder={"Username"}
                            id={"username"}
                            name={"username"}
                            required={"required"} />
                    </div>
                    <div>
                        <Label htmlFor="password">Password :</Label>
                        <Input
                            type={"password"}
                            placeholder={"Password"}
                            id={"password"}
                            name={"password"}
                            required={"required"}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email :</Label>
                        <Input
                            type={"email"}
                            placeholder={"Email"}
                            id={"email"}
                            name={"email"}
                            required={"required"}
                        />
                    </div>
                    <div>
                        <Label htmlFor="fname">First name :</Label>
                        <Input
                            type={"text"}
                            placeholder={"First name"}
                            id={"fname"}
                            name={"fname"}
                            required={"required"} />
                    </div>
                    <div>
                        <Label htmlFor="lname">Last name :</Label>
                        <Input
                            type={"text"}
                            placeholder={"Last name"}
                            id={"lname"}
                            name={"lname"}
                            required={"required"} />
                    </div>
                    <Button className="w-fit h-fit p-2 self-center">Submit</Button>
                </form>
            </CardContent>
            <CardFooter>
                <p>Already have an account? <Link to="/auth/login"><span className='text-blue-600 wheight font-medium'>Login</span></Link></p>
            </CardFooter>
        </Card>


    )
}

export default RegisterPage