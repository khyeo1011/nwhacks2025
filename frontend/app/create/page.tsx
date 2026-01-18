"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getPrompt } from "@/utils/api"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

export default function CreatePage() {
    const router = useRouter()
    const [prompt, setPrompt] = useState<string>("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPrompt = async () => {
            try {
                const response = await getPrompt()
                setPrompt(response.prompt)
            } catch (error) {
                console.error("Failed to fetch prompt:", error)
                setPrompt("Failed to load prompt")
            } finally {
                setLoading(false)
            }
        }

        fetchPrompt()
    }, [])

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
                        <CardTitle>Create Quest</CardTitle>
                        <CardDescription>Your challenge for today</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            {loading ? (
                                <p className="text-center text-muted-foreground">Loading prompt...</p>
                            ) : (
                                <div className="p-6 bg-muted rounded-lg">
                                    <p className="text-lg font-medium text-center">{prompt}</p>
                                </div>
                            )}
                            
                            <Button 
                                className="w-full"
                                size="lg"
                                disabled={loading}
                            >
                                Start Quest
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}