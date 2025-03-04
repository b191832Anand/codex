export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BlogState {
    isLoading: boolean;
    data: Post[];
    isError: boolean;
}

export interface AuthState {
    isLoading: boolean;
    data: any;
    isError: boolean;
}

export interface ResumeState {
    isLoading: boolean;
    data: Resume[];
    isError: boolean;
}

export interface Resume {
    _id: string;
    userId: string;
    email: string;
    github: string;
    description: string;
    linkdin: string;
    link: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface AddPostPayload {
    category: string;
    title: string;
    content: string;
    link: string;
}
export interface Post {
    _id: string;
    userId: string;
    category: string;
    title: string;
    content: string;
    link: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
    _id: string;
    userId: string;
    username: string;
    text: string;
    date: Date;
}

export interface MessageState {
    isLoading: boolean;
    data: Message[];
    isError: boolean;
}
