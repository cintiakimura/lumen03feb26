
export enum Role {
  Student = 'student',
  Teacher = 'teacher',
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'grok';
}
