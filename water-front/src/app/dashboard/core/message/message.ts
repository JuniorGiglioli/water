export enum Status {
    SUCCESS = <any>"success",
    INFO = <any>"info",
    WARNING = <any>"warning",
    DANGER = <any>"danger"
};

export interface Message {

    status?: Status;

    message?: string;

    category?: string;

}