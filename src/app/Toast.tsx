"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { AiOutlineCheck } from "react-icons/ai";

export function ToastSimple() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: (
            <div className="flex items-center">
              <AiOutlineCheck className="mr-2 h-4 w-4" />
              1 colleague added
            </div>
          ),
        })
      }}
    >
      Show Toast
    </Button>
  )
}
