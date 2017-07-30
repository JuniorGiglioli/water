import { ApiRest } from '../core/service/rest/api-rest';

export class CreditRest extends ApiRest {

    public getResourcePath() {
        return '/credit';
    }

    public getResourcePathForm() {
        return '/credit/form';
    }

    public getResourcePathTable() {
        return 'credit/table';
    }
}
