import { Message } from '../message/message';

export interface Response {

    message?: string;

    errors?: Array<Message>;

}