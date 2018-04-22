export class Task {
    id?: string;
    kind: string;
    title: string;
    selfLink: string;
    updated: Date;
    status: string;
    position: string;
    parent: string;

    isCompleted(): boolean {
        return 'completed' === this.status;
    }

    toggleStatus() {
        this.status = 'completed' !== this.status ? 'completed' : 'needsAction';
    }
}
