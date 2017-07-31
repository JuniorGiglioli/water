import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Credit } from '../credit';
import { CreditRest } from '../credit-rest';
import { Person } from '../../person/person';
import { PersonRest } from '../../person/person-rest';
import { MessageService, Status } from '../../core/message/message.service';

@Component({
  selector: 'app-credit-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.css'],
  providers: [ PersonRest, CreditRest]
})
export class CreditFormComponent implements OnInit {
  public credit: Credit = {benefited: { id: null }};
  public benefiteds: Array<Person>;

// TODO: ajustar para pegar usuário logado em tempo de execução
  public creditForm = new FormGroup( {
        id: new FormControl(),
        benefited: new FormControl( '', Validators.required ),
        value: new FormControl( Validators.required ),
        description: new FormControl( '', Validators.required ),
        registrant: new FormControl('')
    } );
  // registrant?: Person;
  // createDate?: Date;
  // updateDate?: Date;
  constructor(private activatedRoute: ActivatedRoute,
        private router: Router, private creditRest: CreditRest, private personRest: PersonRest,
        private messageService: MessageService) { }

  ngOnInit() {
      this.getBenefiteds();
    }
   public save( event ) {
        if ( this.creditForm.valid ) {
            const credit: Credit = this.creditForm.value;

            if ( credit && credit.id != null ) {
                this.edit( credit );
            } else {
                delete credit.id;
                // criar um serviço que forneça o usuário logado e pegar dinamicamente
                credit.registrant = this.getRegistrant('nalomy.souza@secult.ce.gov.br');
                this.create( credit );
            }
        } else {
            // TODO: Colocar em class generica
            //            Object.values( this.escolaridadeForm.controls ).forEach(( control: AbstractControl ) => {
            //                control.markAsTouched();
            //            } );
            this.messageService.send( { message: 'Preencha todos os campos obrigatórios.', status: Status.DANGER } );
        }
    }


    private create( credit: Credit ) {
        const promise = this.creditRest.post( credit );
        promise.then( resolve => {
            this.router.navigate( ['/credit'] );
            this.messageService.send( { message: 'Dados cadastrados com sucesso.', status: Status.SUCCESS } );
        } );
    }

    private edit( credit: Credit) {
        const promise = this.creditRest.put( credit.id, credit );
        promise.then( resolve => {
            this.router.navigate( ['/credit'] );
            this.messageService.send( { message: 'Dados editados com sucesso.', status: Status.SUCCESS } );
        } );
    }

    private getBenefiteds() {
        const promise = this.personRest.get();
        promise.then( (benefiteds: Array<Person>) => {
            this.benefiteds = benefiteds;
            this.initEditForm();
        });
    }

 private initEditForm() {
     this.activatedRoute.params.subscribe( params => {
            const id = params['id'];
            if ( id ) {
                const promise = this.creditRest.get( params['id'] );
                promise.then(( credit: Credit ) => {
                    this.credit = credit;
                    this.creditForm.patchValue( credit, {onlySelf: true} );
                } );
            }
      } );
    }

    /**
    * Retorna o objeto do registrante do tipo Person
    * @param email
    */
 private  getRegistrant(email: String): Person {
     let person: Person = {};
       this.benefiteds.forEach(benefited => {
         if ( benefited.mail === email) {
             person = benefited;
         }
        });
        return person;
    }
}
