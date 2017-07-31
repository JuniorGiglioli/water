import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Debit } from '../debit';
import { DebitRest } from '../debit-rest';
import { Person } from '../../person/person';
import { PersonRest } from '../../person/person-rest';
import { MessageService, Status } from '../../core/message/message.service';

@Component({
  selector: 'app-debit-form',
  templateUrl: './debit-form.component.html',
  styleUrls: ['./debit-form.component.css'],
  providers: [ PersonRest, DebitRest]
})
export class DebitFormComponent implements OnInit {
  public debit: Debit = {target: { id: null }};
  public targets: Array<Person>;

// TODO: ajustar para pegar usuário logado em tempo de execução
  public debitForm = new FormGroup( {
        id: new FormControl(),
        target: new FormControl( '', Validators.required ),
        value: new FormControl( Validators.required ),
        description: new FormControl( '', Validators.required ),
        registrant: new FormControl('')
    } );
  // registrant?: Person;
  // createDate?: Date;
  // updateDate?: Date;
  constructor(private activatedRoute: ActivatedRoute,
        private router: Router, private debitRest: DebitRest, private personRest: PersonRest,
        private messageService: MessageService) { }

  ngOnInit() {
      this.getTargets();
    }
   public save( event ) {
        if ( this.debitForm.valid ) {
            const debit: Debit = this.debitForm.value;

            if ( debit && debit.id != null ) {
                this.edit( debit );
            } else {
                delete debit.id;
                // criar um serviço que forneça o usuário logado e pegar dinamicamente
                debit.registrant = this.getRegistrant('nalomy.souza@secult.ce.gov.br');
                this.create( debit );
            }
        } else {
            // TODO: Colocar em class generica
            //            Object.values( this.escolaridadeForm.controls ).forEach(( control: AbstractControl ) => {
            //                control.markAsTouched();
            //            } );
            this.messageService.send( { message: 'Preencha todos os campos obrigatórios.', status: Status.DANGER } );
        }
    }


    private create( debit: Debit ) {
        const promise = this.debitRest.post( debit );
        promise.then( resolve => {
            this.router.navigate( ['/debit'] );
            this.messageService.send( { message: 'Dados cadastrados com sucesso.', status: Status.SUCCESS } );
        } );
    }

    private edit( debit: Debit) {
        const promise = this.debitRest.put( debit.id, debit );
        promise.then( resolve => {
            this.router.navigate( ['/debit'] );
            this.messageService.send( { message: 'Dados editados com sucesso.', status: Status.SUCCESS } );
        } );
    }

    private getTargets() {
        const promise = this.personRest.get();
        promise.then( (targets: Array<Person>) => {
            this.targets = targets;
            this.initEditForm();
        });
    }

 private initEditForm() {
     this.activatedRoute.params.subscribe( params => {
            const id = params['id'];
            if ( id ) {
                const promise = this.debitRest.get( params['id'] );
                promise.then(( debit: Debit ) => {
                    this.debit = debit;
                    this.debitForm.patchValue( debit, {onlySelf: true} );
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
       this.targets.forEach(target => {
         if ( target.mail === email) {
             person = target;
         }
        });
        return person;
    }
}
