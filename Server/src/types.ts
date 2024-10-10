export type taskFilter={
    id: string
    userId: number
    title:string
    description: string
    date: string
    CategoryName: string
    priority: Number
}
export type task={
    id: string
    userId: number
    title: string
    description: string
    date: string
    Category: {
        name:string
        icon:string
        color:string
    }
    priority: Number
    status:Boolean
}
export type optionalTask={
    id?: string
    userId?:number
    title?: string
    description?: string
    date?: string
    Category?: {
        name:string
        icon:string
        color:string
    }
    priority?: Number
    status?:Boolean
}
export type history={
    userId:number
    operation:string
    previous:optionalTask
    new:optionalTask
    createdAt:string
}
export type newTask={
    id: string
    userId:number
    title: string
    description: string
    date: string
    CategoryName:string
    CategoryIcon:string
    CategoryColor:string
    priority: Number
    status:boolean
}

export type user={
    name: string
    password:string
    id:number
    link:string
}