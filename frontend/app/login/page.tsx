"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { login } from "@/utils/api"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async () => {
        setError(null)
        
        try {
            const response = await login(userId, password)
            console.log("Login response:", response)
            
            // Check if the message indicates login failed
            if (response.message === "Invalid userID or password") {
                setError("Invalid User ID or password. Please try again.")
            } else if (response.message === "userID and password are required") {
                setError("Please enter both User ID and password.")
            } else if (response.error || response.message?.includes("failed")) {
                setError(response.message || "Login failed. Please try again.")
            } else {
                // Handle successful login
                router.push("/")
            }
        } catch (error) {
            console.error("Login failed:", error)
            setError("Login failed. Please try again.")
        }
    }

    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="mx-auto max-w-md w-full">
                <Button 
                    variant="ghost" 
                    className="mb-4"
                    onClick={() => router.push("/")}
                >
                    ← Back
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Sign in to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            
                            <div className="space-y-2">
                                <Input 
                                    type="text" 
                                    placeholder="User ID" 
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Input 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button 
                                onClick={handleLogin}
                                className="w-full"
                                size="lg"
                            >
                                Login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}