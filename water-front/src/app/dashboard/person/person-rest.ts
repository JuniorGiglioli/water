import { ApiRest } from '../core/service/rest/api-rest';

export class PersonRest extends ApiRest {

    public getResourcePath() {
        return '/person';
    }
}