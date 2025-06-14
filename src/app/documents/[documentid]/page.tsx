
'use client'

import { Editor } from "./editor";
import { Toolbar } from "./toolbar";

interface DocumentsIdPageProps {
    params: Promise<{ documentid: string }>
}

const DocumentIdPage = async ({ params }: DocumentsIdPageProps) => {
    const {documentid} = await params;
    
    return (
        <div className="min-h-screen bg-[#FAFBFD]">
            <Toolbar/>
            <Editor/>
        </div>
    );
}


export default DocumentIdPage