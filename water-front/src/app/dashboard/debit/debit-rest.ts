import { ApiRest } from '../core/service/rest/api-rest';

export class DebitRest extends ApiRest {

    public getResourcePath() {
        return '/debit';
    }

    public getResourcePathForm() {
        return '/debit/form';
    }

    public getResourcePathTable() {
        return 'debit/table';
    }
}
