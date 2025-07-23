"use server";
import { auth } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import { DocumentPage } from './document'
import { preloadQuery } from 'convex/nextjs'
import { api } from "../../../../convex/_generated/api";

interface DocumentsIdPageProps {
    params: { documentId: Id<"Documents"> }
}
const DocumentIdPage = async ({ params }: DocumentsIdPageProps) => {
    const { documentId } = await params;
    const { getToken } = await auth()
    const token = await getToken({ template: "convex" }) ?? undefined

    if (!token) {
        throw new Error("Unauthorized")
    }
    const preloadedDocument = await preloadQuery(
        api.document.getById,
        { id: documentId },
        { token }
    )


    return <DocumentPage preloadedDocument={preloadedDocument} />
}


export default DocumentIdPage