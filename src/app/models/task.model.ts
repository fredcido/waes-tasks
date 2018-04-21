export class Task {
    id?: string;
    kind: string;
    title: string;
    selfLink: string;
    updated: Date;
    status: string;
    position: string;

    get completed() {
        return 'completed' === this.status;
    }
}
