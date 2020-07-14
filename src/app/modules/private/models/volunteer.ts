import { Interest } from './interest';

export class Volunteer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  interests: Interest[];
}
