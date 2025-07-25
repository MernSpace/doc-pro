"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Id } from '../../convex/_generated/dataModel';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


interface RemoveDialogProps {
    documentId: Id<"Documents">;
    children: React.ReactNode;
}


export const RemoveDialog = ({
    documentId,
    children
}: RemoveDialogProps) => {
    const router = useRouter()

    const remove = useMutation(api.document.removeById)
    const [isRemoving, setIsRemoving] = useState(false)
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undoe. This will permanently delete your document.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isRemoving}
                        onClick={(e) => {
                            e.preventDefault()
                            setIsRemoving(true)
                            remove({ id: documentId })
                                .catch(() => toast.error("Something went wrong"))
                                .then(() => { toast.success("Document removed"); router.push("/") })
                                .finally(() => setIsRemoving(false))
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}