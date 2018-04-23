import { Task } from './task.model';

describe('Model: Task', () => {
  it('should be completed', () => {
    const task = new Task();
    task.status = 'completed';

    expect(task.isCompleted()).toBeTruthy();
  });

  it(`should toggle the task status`, () => {
    const task = new Task();
    task.status = 'completed';

    task.toggleStatus();
    expect(task.isCompleted()).toBeFalsy();

    task.toggleStatus();
    expect(task.isCompleted()).toBeTruthy();
  });
});
