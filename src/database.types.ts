export type Json = 
| string
| number
| boolean
| null
| { [key: string] : Json }
| Json[];

export interface Database{
    public : {
        Tables : {
            messreq : {
                Row : {
                    Approved: boolean;
                    id : number;
                    Mess : number;
                    Name: string;
                    Receiver: string;
                    Rejected: boolean;
                    Sender: string;
                    time: string;
                };
                Insert: {
                    Approved?: boolean;
                    id? : number;
                    Mess : number;
                    Name?: string;
                    Receiver: string;
                    Rejected?: boolean;
                    Sender: string;
                    time: string;
                };
                Update: {
                    Approved?: boolean;
                    id? : number;
                    Mess? : number;
                    Name?: string;
                    Receiver?: string;
                    Rejected?: boolean;
                    Sender?: string;
                    time?: string;
                };
            };
        };
        Views : {
            [_ in never ] : never;
        };
        Functions : {
            [_ in never ] : never;
        };
        Enums : {
            [_ in never ] : never;
        };
        CompositeTypes : {
            [_ in never ] : never;
        };
    }
}