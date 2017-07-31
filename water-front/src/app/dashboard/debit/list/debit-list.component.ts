import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '../../core/service/config/config.service';
import { BootstrapTableComponent, ConfigTable } from '../../../shared/bootstrap-table/bootstrap-table.component';

import { DebitRest } from '../debit-rest';

import { MessageService, Status } from '../../core/message/message.service';

@Component({
  selector: 'app-debit-list',
  templateUrl: './debit-list.component.html',
  styleUrls: ['./debit-list.component.css'],
  providers: [DebitRest]
})
export class DebitListComponent implements OnInit {

    @ViewChild( BootstrapTableComponent )
    private bootstrapTableComponent: BootstrapTableComponent;

    public loadPageBound: Function;

    public config: ConfigTable = {
        urlData: this.configService.getConfig().getResourceServer() + this.creditRest.getResourcePathTable(),
        columns: [
            { title: '#', name: 'id' },
            { title: 'Data do Cadastro', name: 'createDate' },
            { title: 'Valor', name: 'value' },
             { title: 'Conta', name: 'target.mail' },
            { title: 'Cadastrante', name: 'registrant.mail' },
            { title: 'Observações', name: 'description' },
        ],
        editColumn: true,
        removeColumn: true,
        sort: { column: 'createDate' },
        routeLinkAdd: 'form'
    };

  constructor(private creditRest: DebitRest, private router: Router,
        private configService: ConfigService, private messageService: MessageService) { }

  ngOnInit() {
  }

  public onEdit( data ) {
      if ( data && data.id ) {
          this.router.navigate( ['/debit/form', data.id] );
      }
    }
    public onRemove( data ) {
        if ( data && data.id ) {
            this.creditRest.delete( data.id ).then(() => {
                this.bootstrapTableComponent.refresh();
                this.messageService.send({ message: 'O debit escolhido foi excluído com sucesso.', status: Status.SUCCESS });
            } );
        }
    }

}
