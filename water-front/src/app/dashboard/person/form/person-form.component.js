"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var person_rest_1 = require('./person-rest');
var message_service_1 = require('../core/message/message.service');
var PersonFormComponent = (function () {
    function PersonFormComponent(activatedRoute, router, personRest, messageService) {
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.personRest = personRest;
        this.messageService = messageService;
        this.person = {};
        this.roles = ["STANDARD", "MANAGER", "ADMINISTRATOR"];
        this.personForm = new forms_1.FormGroup({
            id: new forms_1.FormControl(),
            mail: new forms_1.FormControl('', forms_1.Validators.required),
            credit: new forms_1.FormControl(0, forms_1.Validators.required),
            active: new forms_1.FormControl('', forms_1.Validators.required),
            role: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    //    private personRest: PersonRest
    PersonFormComponent.prototype.ngOnInit = function () {
    };
    PersonFormComponent.prototype.save = function (event) {
        if (this.personForm.valid) {
            var person = this.personForm.value;
            if (person && person.id != null) {
                this.edit(person);
            }
            else {
                delete person.id;
                this.create(person);
            }
        }
        else {
            //TODO: Colocar em class generica
            //            Object.values( this.escolaridadeForm.controls ).forEach(( control: AbstractControl ) => {
            //                control.markAsTouched();
            //            } );
            this.messageService.send({ message: 'Preencha todos os campos obrigatórios.', status: message_service_1.Status.DANGER });
        }
    };
    PersonFormComponent.prototype.create = function (person) {
        var _this = this;
        var promise = this.personRest.post(person);
        promise.then(function (resolve) {
            _this.router.navigate(['/person']);
            _this.messageService.send({ message: 'Dados cadastrados com sucesso.', status: message_service_1.Status.SUCCESS });
        });
    };
    PersonFormComponent.prototype.edit = function (person) {
        var _this = this;
        var promise = this.personRest.put(person.id, person);
        promise.then(function (resolve) {
            _this.router.navigate(['/person']);
            _this.messageService.send({ message: 'Dados editados com sucesso.', status: message_service_1.Status.SUCCESS });
        });
    };
    PersonFormComponent = __decorate([
        core_1.Component({
            selector: 'person-cmp',
            moduleId: module.id,
            templateUrl: 'person-form.component.html',
            providers: [person_rest_1.PersonRest],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, person_rest_1.PersonRest, message_service_1.MessageService])
    ], PersonFormComponent);
    return PersonFormComponent;
}());
exports.PersonFormComponent = PersonFormComponent;
//# sourceMappingURL=person-form.component.js.map