import { Config } from './config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigService {

    private config: Config;

    constructor( private _http: Http ) {
        this.config = new Config();
    }

    public load() {
        return new Promise(( resolve, reject ) => {
            this._http.get( 'assets/oauth-config.json' )  // path of your config.json file
                .map( res => res.json() )
                .subscribe(
                ( data: any ) => {

                    this.setParameters( data );

                    resolve( true );
                },
                err => console.log( err )
                );
        } );
    }

    private setParameters( data: Array<{}> ) {

        const entries = Object.entries(data);

        entries.forEach(entry => {
            this.save(this.config, entry[0], entry[1]);
        });
    }

    private save( config: Config, field: string, value: string ) {
        ( <any>config )[field] = value;
    }

    public getConfig(): Config {
        return this.config;
    }
}
