import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '../../core/service/config/config.service';
import { BootstrapTableComponent, ConfigTable } from '../../../shared/bootstrap-table/bootstrap-table.component';

import { PersonRest } from '../person-rest';

import { MessageService, Status } from '../../core/message/message.service';

@Component({
    selector: 'person-list',
    templateUrl: 'person-list.component.html',
    styleUrls: ['person-list.component.css'],
    providers: [ PersonRest ]
} )

export class PersonListComponent {
    @ViewChild( BootstrapTableComponent )
    private bootstrapTableComponent: BootstrapTableComponent;

    public loadPageBound: Function;

    public config: ConfigTable = {
        urlData: this.configService.getConfig().getResourceServer() + 'person/table',
        columns: [
            { title: 'mail', name: 'mail' },
            { title: 'role', name: 'role' },
            { title: 'active', name: 'active' }
        ],
        editColumn: true,
        removeColumn: true,
        sort: { column: 'mail' },
        routeLinkAdd: 'form'
    };

    constructor( private personRest: PersonRest, private router: Router,
        private configService: ConfigService, private messageService: MessageService ) {
    }
    public onEdit( data ) {
        if ( data && data.id ) {
            this.router.navigate( ['/person/form', data.id] );
        }
    }
    public onRemove( data ) {
        if ( data && data.id ) {
            this.personRest.delete( data.id ).then(() => {
                this.bootstrapTableComponent.refresh();
                this.messageService.send({ message: 'Pessoa ' + data.mail + ' excluída com sucesso.', status: Status.SUCCESS });
            } );
        }
    }
}