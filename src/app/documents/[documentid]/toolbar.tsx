
'use client'
import { cn } from "@/lib/utils";
import { LucideIcon, Undo2Icon, Redo2Icon, PrinterIcon, SpellCheckIcon, BoldIcon, ItalicIcon, UnderlineIcon, MessageSquarePlusIcon, ListTodoIcon, RemoveFormattingIcon, ChevronDownIcon, HighlighterIcon, Link2Icon, ImageIcon, UploadIcon, SearchIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, AlignJustifyIcon, ListIcon, ListOrderedIcon, MinusIcon, PlusIcon, ListCollapseIcon } from "lucide-react";

import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { type Level } from "@tiptap/extension-heading"
import { type ColorResult, SketchPicker } from "react-color"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const FontFamilyButton = () => {
    const { editor } = useEditorStore()
    const fonts = [
        { label: "Arial", value: "Arial" },
        { label: "Helvetica", value: "Helvetica" },
        { label: "Times New Roman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Georgia", value: "Georgia" }
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn("h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}

                >
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").FontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />


                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {
                    fonts.map(({ label, value }) => (
                        <button key={value}
                            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                            className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                            )}
                            style={{ fontFamily: value }}
                        >

                            <span className="text-sm">{label}</span>

                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


const HeadingLeveButton = () => {
    const { editor } = useEditorStore()

    const headings = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
    ]

    const getCurrentHeading = () => {
        for (let label = 1; label <= 4; label++) {
            if (editor?.isActive("heading", { label })) {
                return `Heading ${label}`
            }
        }
        return "Normal text"
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn("h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}

                >
                    <span className="truncate">
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />


                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {
                    headings.map(({ label, value, fontSize }) => (
                        <button
                            onClick={() => {
                                if (value === 0) {
                                    editor?.chain().focus().setParagraph().run()
                                } else {
                                    editor?.chain().focus().toggleHeading({ level: value as Level }).run()
                                }
                            }}
                            key={value}
                            style={{ fontSize }}
                            className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { label, value }) && "bg-neutral-200/80"
                            )}

                        >
                            {label}
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const TextColorButton = () => {
    const { editor } = useEditorStore()
    const value = editor?.getAttributes("textStyle").color || "#000000";
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 flex-col shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <span className="text-xs">A</span>
                    <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5">
                <SketchPicker
                    color={value}
                    onChange={onChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setValue] = useState(editor?.getAttributes("link").href || "")

    const onChnage = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run()
        setValue("")
    }
    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setValue(editor?.getAttributes("link").href || "")
            }
        }}>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 flex-col shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <Input
                    placeholder="Past Link"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={() => onChnage(value)}>
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState("")

    const onChnage = (src: string) => {
        editor?.chain().focus().setImage({ src }).run()
    }

    const onUpload = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*"
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const imageUrl = URL.createObjectURL(file)
                onChnage(imageUrl)
            }
        }
        input.click()
    }

    const handleImgeUrlSubmit = () => {
        if (imageUrl) {
            onChnage(imageUrl)
            setImageUrl("")
            setIsDialogOpen(false)
        }
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="h-7 min-w-7 flex-col shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                    >
                        <ImageIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className="size-4 mr-2" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className="size-4 mr-2" />
                        Peste image url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insert image URL</DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Insert image URL"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleImgeUrlSubmit();
                            }}}
                         />
                            


                             <DialogFooter>
                    <Button onClick={handleImgeUrlSubmit}>
                        Insert
                    </Button>
                </DialogFooter>
                </DialogContent>
               
            </Dialog>

        </>
    )
}

const HighlightColorButton = () => {
    const { editor } = useEditorStore()
    const value = editor?.getAttributes('highlight').color || "#000000"
    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setHighlight({ color: color.hex }).run()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 flex-col shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <HighlighterIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5">
                <SketchPicker
                    color={value}
                    onChange={onChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const AlignButton = () => {
    const { editor } = useEditorStore()
    const alignments = [
        {
            label:"Align Left",
            value:"left",
            icon:AlignLeftIcon
        },
        {
            label:"Align Center",
            value:"center",
            icon:AlignCenterIcon
        },
        {
            label:"Align Right",
            value:"right",
            icon:AlignRightIcon
        },
        {
            label:"Align Justify",
            value:"justify",
            icon:AlignJustifyIcon
        },
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 flex-col shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <AlignLeftIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {alignments.map(({label,value,icon:Icon})=>(
                    <button
                    key={value}
                    onClick={()=>editor?.chain().focus().setTextAlign(value).run()}
                    className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",editor?.isActive({textAlign:value}) && "bg-neutral-200/80")}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ListButton = () => {
    const { editor } = useEditorStore()
    const lists = [
        {
            label:"Bullet List",
            icon:ListIcon,
            isActive:()=> editor?.isActive("bulletList"),
            onClick:()=> editor?.chain().focus().toggleBulletList().run()
        },
        {
            label:"Ordered List",
            icon:ListOrderedIcon,
            isActive:()=> editor?.isActive("orderedList"),
            onClick:()=> editor?.chain().focus().toggleOrderedList().run()
        },
       
    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 flex-col shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <ListIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lists.map(({label,icon:Icon,onClick,isActive})=>(
                    <button
                    key={label}
                    onClick={onClick}
                    className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",isActive() && "bg-neutral-200/80")}
                    >
                        <Icon className="size-4"/>
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


const FontSizeButton = () =>{
    const {editor} = useEditorStore()
    const currentFontSize = editor?.getAttributes("textSyle").fontSize ? editor?.getAttributes("textStyle").fontSize.replace("px","") : "16";

    const [fonstSize,setFontSize]= useState(currentFontSize)
    const [inputValue,setInputValue] = useState(fonstSize)
    const [isEditing,setIsEditing] = useState(false)

    const updateFontSize = (newSize:string)=>{
        const size = parseInt(newSize)
        if(!isNaN(size) && size > 0){
            editor?.chain().focus().setFontSize(`${size}px`).run()
            setFontSize(newSize)
            setInputValue(newSize)
            setIsEditing(false)
        }
    }

    const handelInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value)
    }
    const handleInputBlur=()=>{
        updateFontSize(inputValue)
    }
    const handelKeyDown =(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter"){
            e.preventDefault()
            updateFontSize(inputValue)
            editor?.commands.focus()
        }
    }
    const increment =()=>{
        const newSize = parseInt(fonstSize) + 1
        updateFontSize(newSize.toString())
    }
    const decrement =()=>{
        const newSize = parseInt(fonstSize) - 1
        if(newSize >0){
            updateFontSize(newSize.toString())
        }
    }

    return(
        <div className="flex items-center gap-x-0.5">
            <button
            onClick={decrement}
            className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <MinusIcon className="size-4"/>
            </button>
            {isEditing?(
                <input
                type="text"
                value={inputValue}
                onChange={handelInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handelKeyDown}
                className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-tansparent focus:outline-none focus:ring-0"
                
                />
            ):(
                <button
                onClick={()=>{
                    setIsEditing(true)
                    setFontSize(currentFontSize)
                }}
                className="h-7 w-10 text-sm text-center border border-neutral-400 rounded-sm bg-transparent cursor-text"
                
                >{currentFontSize}</button>
            )}
            <button
            onClick={increment}
            className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
            >
                <PlusIcon className="size-4"/>
            </button>
        </div>
    )
}  


const LineHeightButton = () => {
    const { editor } = useEditorStore()
    const lineHeight = [
       {label:"Defult",value:"normal"},
        {label:"Single",value:"1"},
        {label:"1.15",value:"1.15"},
        {label:"1.5",value:"1.5"},
        {label:"Double",value:"2"},


    ]
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 min-w-7 flex-col shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <ListCollapseIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {lineHeight.map(({label,value})=>(
                    <button
                    key={value}
                    onClick={()=>editor?.chain().focus().setLineHeight(value).run()}
                    className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80")}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}





interface ToolbarButtonProps {
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon;
}

const ToolbarButton = ({
    onClick,
    isActive,
    icon: Icon
}: ToolbarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn("text-sm h-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80", isActive && "bg-neutral-200/80")}
        >
            <Icon className="size-4" />
        </button>
    )
}












export const Toolbar = () => {

    const { editor } = useEditorStore()


    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean
    }[][] = [
            [
                {
                    label: 'Undo',
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                },
                {
                    label: 'Redo',
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                },
                {
                    label: 'Print',
                    icon: PrinterIcon,
                    onClick: () => window.print()
                },
                {
                    label: 'Spell Check',
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck");
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "falae")
                    }
                }
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run()
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run()
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run()
                }
            ], [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    onClick: () => console.log('todo comment'),
                    isActive: false
                },
                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive("taskList")
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                }
            ]
        ]
    return (
        <div className="bg-[#F1F1F1] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-3 overflow-auto" >
            {
                sections[0].map((item) => (
                    <ToolbarButton key={item.label} {...item} />

                ))
            }
            <Separator orientation="vertical" className="h-6 bg-neutral-300/80" />
            <FontFamilyButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <HeadingLeveButton />
            <FontSizeButton/>
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <TextColorButton />
            <HighlightColorButton />
            <Separator orientation="vertical" className="h-6 bg-orange-300" />

            {
                sections[1].map((item) => (
                    <ToolbarButton key={item.label} {...item} />

                ))
            }
            <Separator orientation="vertical" className="h-6 bg-orange-300" />
            <LinkButton />
           <ImageButton/>
           <AlignButton/>

            <LineHeightButton/>
            <ListButton/>



            {
                sections[2].map((item) => (
                    <ToolbarButton key={item.label} {...item} />

                ))
            }


        </div>
    )
}