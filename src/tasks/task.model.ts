export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRRESS = 'IN_PROGRRESS',
  DONE = 'DONE',
}

export interface TaskDelResp {
  id: string;
  message: string;
}
