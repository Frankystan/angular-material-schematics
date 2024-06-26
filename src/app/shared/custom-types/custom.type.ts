import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface IPostForm {
    id: FormControl<any>;
    uid?: FormControl<string>;
    title?: FormControl<string>;
    author?: FormGroup<{
        displayName: FormControl<string>;
        uid: FormControl<string>;
    }>;
    content?: FormControl<string>;
    url?: FormControl<string>;
    featured_image?: FormControl<string>;
    createdAt?: FormControl<any>;
    created_at?: FormControl<number>;
    updatedAt?: FormControl<any>;
    updated_at?: FormControl<number>;
    tags?: FormArray<any | null>;
}

export type SidenavListItem = {
    icon: string;
    title: string;
    link?: string;
};

export type tPost = {
    id?: any;
    uid?: string;
    title?: string;
    author?: {
        displayName: string;
        uid: string;
        img?: string;
    };
    content?: string;
    url?: string;
    featured_image?: string;
    createdAt?: any;
    created_at?: number;
    updatedAt?: any;
    updated_at?: number;
    tags?: Array<string>;
};

export type tTag = {
    name: string;
    id: number;
};

export type tUser = {
    uid?: string;
    bookmarks?: Array<string>;
    displayName?: string;
    email?: string;
    emailVerified?: boolean;
    metadata?: tMetadata;
    photoURL?: string;
    providerId?: string;
    settings?: tSettings;
};

export type tMetadata = {
    createdAt: string;
    lastLoginAt: string;
    lastSignInTime: string;
    creationTime: string;
};

export type tSettings = {
    darkTheme: boolean;
    language: string;
};

export type LogInForm = {
    email: FormControl<string>;
    password: FormControl<string>;
};
