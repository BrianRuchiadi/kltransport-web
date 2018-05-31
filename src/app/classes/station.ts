import { Line } from './line';

export class Station {
    id: number;
    line_id: number;
    sequence: number;
    name: string;
    name_ref: string;
    line: Line;
}
