import { Station } from './station';

export class Line {
    id: number;
    type: string;
    reference: string;
    name: string;
    icon: string;
    total_station: number;
    nodes: Station[];
}
