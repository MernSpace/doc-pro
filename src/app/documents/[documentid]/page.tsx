"use server";
import { auth } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import { DocumentPage } from "./document";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

interface PageProps {
    params: Promise<{ documentid: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

const DocumentIdPage = async ({ params }: PageProps) => {
    const { documentid } = await params;

    const { getToken } = await auth();
    const token = (await getToken({ template: "convex" })) ?? undefined;

    if (!token) {
        throw new Error("Unauthorized");
    }

    // Cast the string from the URL to Convex Id<"Documents">
    const preloadedDocument = await preloadQuery(
        api.document.getById,
        { id: documentid as Id<"Documents"> },
        { token }
    );

    return <DocumentPage preloadedDocument={preloadedDocument} />;
};

export default DocumentIdPage;