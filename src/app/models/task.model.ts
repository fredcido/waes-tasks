export class Task {
    id?: string;
    title: string;
    details: string;
    updated: Date;
    due: Date;
    status: string;
    parent: string;
    notes: string;
    completed: string;

    isCompleted(): boolean {
        return 'completed' === this.status;
    }

    toggleStatus() {
        this.status = 'completed' !== this.status ? 'completed' : 'needsAction';
    }
}
