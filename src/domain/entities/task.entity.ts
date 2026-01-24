export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public status: 'PENDING' | 'IN_PROGRESS' | 'DONE',
    public dueDate: Date,
    public userId: string,
  ) {}
}