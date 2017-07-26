import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Person } from './person';
import { PersonRest } from './person-rest';
import { MessageService, Status } from '../core/message/message.service';

@Component( {
    selector: 'person-cmp',
    moduleId: module.id,
    templateUrl: 'person-form.component.html',
    providers: [PersonRest],
} )

export class PersonFormComponent implements OnInit {
    public person: Person = {}
    public roles: Array<String> = ["STANDARD", "MANAGER", "ADMINISTRATOR"];

    public personForm = new FormGroup( {
        id: new FormControl(),
        mail: new FormControl( '', Validators.required ),
        credit: new FormControl( 0, Validators.required ),
        active: new FormControl( '', Validators.required ),
        role: new FormControl( '', Validators.required )
    } );

    constructor( private activatedRoute: ActivatedRoute, private router: Router, private personRest: PersonRest, private messageService: MessageService ) {
    }
    //    private personRest: PersonRest
    ngOnInit() {
    }

    public save( event ) {
        if ( this.personForm.valid ) {
            let person: Person = this.personForm.value;

            if ( person && person.id != null ) {
                this.edit( person );
            } else {
                delete person.id;
                this.create( person );
            }
        } else {
            //TODO: Colocar em class generica
            //            Object.values( this.escolaridadeForm.controls ).forEach(( control: AbstractControl ) => {
            //                control.markAsTouched();
            //            } );
            this.messageService.send( { message: 'Preencha todos os campos obrigatórios.', status: Status.DANGER } );
        }
    }


    private create( person: Person ) {
        let promise = this.personRest.post( person );
        promise.then( resolve => {
            this.router.navigate( ['/person'] );
            this.messageService.send( { message: 'Dados cadastrados com sucesso.', status: Status.SUCCESS } );
        } );
    }


    private edit( person: Person ) {
        let promise = this.personRest.put( person.id, person );
        promise.then( resolve => {
            this.router.navigate( ['/person'] );
            this.messageService.send( { message: 'Dados editados com sucesso.', status: Status.SUCCESS } );
        } );
    }
}
