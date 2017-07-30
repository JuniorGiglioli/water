import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '../../core/service/config/config.service';
import { BootstrapTableComponent, ConfigTable } from '../../../shared/bootstrap-table/bootstrap-table.component';

import { CreditRest } from '../credit-rest';

import { MessageService, Status } from '../../core/message/message.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.css'],
  providers: [CreditRest]
})
export class CreditListComponent implements OnInit {

  @ViewChild( BootstrapTableComponent )
    private bootstrapTableComponent: BootstrapTableComponent;

    public loadPageBound: Function;

    public config: ConfigTable = {
        urlData: this.configService.getConfig().getResourceServer() + this.creditRest.getResourcePathTable(),
        columns: [
            { title: '#', name: 'id' },
            { title: 'Data do Cadastro', name: 'createDate' },
            { title: 'Valor do Crédito', name: 'value' },
             { title: 'Beneficiado', name: 'benefited.mail' },
            { title: 'Cadastrante', name: 'registrant.mail' },
            { title: 'Observações', name: 'description' },
        ],
        editColumn: true,
        removeColumn: true,
        sort: { column: 'createDate' },
        routeLinkAdd: 'form'
    };

  constructor(private creditRest: CreditRest, private router: Router,
        private configService: ConfigService, private messageService: MessageService) { }

  ngOnInit() {
  }

  public onEdit( data ) {
      if ( data && data.id ) {
          this.router.navigate( ['/credit/form', data.id] );
      }
    }
    public onRemove( data ) {
        if ( data && data.id ) {
            this.creditRest.delete( data.id ).then(() => {
                this.bootstrapTableComponent.refresh();
                this.messageService.send({ message: 'O crédito escolhido foi excluído com sucesso.', status: Status.SUCCESS });
            } );
        }
    }

}
