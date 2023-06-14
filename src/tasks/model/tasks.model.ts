/* eslint-disable prettier/prettier */
export interface SaveOptions {
    id: string;
    title: string;
    description: string;
    status: TasksStatus;
}

export interface TaskInterFace {
    id: string;
    title: string;
    description: string;
    status: TasksStatus;
}

export enum TasksStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}
