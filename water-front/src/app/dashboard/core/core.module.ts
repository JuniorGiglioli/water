import { NgModule, APP_INITIALIZER, LOCALE_ID, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { RouterModule } from '@angular/router';

import { LoginSession } from './login/login-session';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { Requester } from './service/requester/requester';

import { OAuth2Callback } from './oauth2/oauth2-callback.component';
import { MessageService } from './message/message.service';
import { ConfigService } from './service/config/config.service';
import { OAuth2Guard } from './service/oauth2-guard/oauth2-guard';

import { MyErrorHandler } from './handler/error-handler';

// export function getConfig(config: ConfigService) {
//     return config.load();
// }
export function configServiceFactory (config: ConfigService) {
  return () => config.load();
}

@NgModule( {
    imports: [RouterModule],
    declarations: [LoginComponent, OAuth2Callback],
    providers: [ConfigService, MessageService, LoginService,
        {
            useFactory: configServiceFactory,
            provide: APP_INITIALIZER,
            deps: [ConfigService, Http],
            multi: true
        },
        OAuth2Guard,
        LoginComponent,
        LoginSession,
        Requester,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: ErrorHandler, useClass: MyErrorHandler }
    ]
} )
export class CoreModule { }