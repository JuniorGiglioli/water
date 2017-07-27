import { Component, OnInit, EventEmitter, Input, Output, OnDestroy, Host } from '@angular/core';
import { Requester } from '../../dashboard/core/service/requester/requester';

export enum Order {
    ASC = <any>'asc',
    DESC = <any>'desc'
}

interface Sort {
    column: string;
    order?: Order;
}

interface Table {
    rows: Array<any>;
    total: number;
}

interface Format {
    pipe: string;
    parameters?: string[];
}

interface Column {
    name: string;
    title: string;
    format?: Format;
}

export interface ConfigTable {
    urlData: string;
    columns: Array<Column>;
    itensForPage?: number;
    search?: string;
    sort?: Sort;
    editColumn?: boolean;
    removeColumn?: boolean;
    routeLinkAdd?: string;
}

const MAX_PAGINATION_PAGE = 5;
const NUMBERS_ITEMS_PAGE: Array<number> = [5, 10, 15, 20, 50, 100];

@Component({
    selector: 'bootstrap-table',
    templateUrl: './bootstrap-table.component.html',
    styleUrls: ['bootstrap-table.component.css']
})
export class BootstrapTableComponent implements OnInit, OnDestroy {

    @Input()
    public config: ConfigTable;

    private currentPage = 0;

    private pages: Array<number> = [];

    public data: Table = {rows: [], total: 0};

    @Output()
    public onEdit: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public onRemove: EventEmitter<any> = new EventEmitter<any>();

    // default configuration of table
    private configDefault: ConfigTable = {
        urlData: '',
        columns: [],
        itensForPage: 10,
        sort: { column: null, order: Order.ASC },
        editColumn: false,
        removeColumn: false,
        routeLinkAdd: null
    };

    private searchTimeout = null;

    constructor(private requester: Requester) {
    }

    public ngOnInit() {

        this.initConfig();

        this.refresh();
    }

    private initConfig() {
        this.config = Object.assign( this.configDefault, this.config );
    }

    public editEvent( data ) {
        this.onEdit.emit( data );
    }


    public removeEvent( data ) {
        this.onRemove.emit( data );
    }

    public ngOnDestroy() {
        this.onEdit.unsubscribe();
        this.onRemove.unsubscribe();
    }

    public refresh() {

        const parameters = {
            page: this.currentPage,
            search : this.config.search,
            limit: this.config.itensForPage,
            sort: this.config.sort === null ? null : this.config.sort.column,
            order : this.config.sort === null || this.config.sort.order === null ? null : this.config.sort.order
        };

        const promise = this.requester.get(this.config.urlData, parameters);

        promise.then((data: Table) => {
            this.data = data;
            this.renderTable(data);
        });
    }

    private renderTable(data: Table) {
        this.pages = this.getRangePages(data.total, this.currentPage);
    }


    private getRangePages(totalRows: number, currentPage: number): Array<any> {

        let totalPagesPagination = this.calculePagination(totalRows, this.config.itensForPage);

        // calculate for initial range
        let init = currentPage - Math.round(MAX_PAGINATION_PAGE / 2) + 1;
        init = init < 0 ? 0 : init;

        // calculate for end range
        let end = init + MAX_PAGINATION_PAGE;
        end = end > totalPagesPagination ? totalPagesPagination : end;

        // calculate size range
        let size = (end - init);
        size = size < 0 ? 0 : size;

        // calculate max pagination for last items
        if (size < MAX_PAGINATION_PAGE)  {
            const diff = MAX_PAGINATION_PAGE - size;
            init -= diff;
            size = MAX_PAGINATION_PAGE;
            if (init < 0) {
                init = 0;
            }
            if (size > totalPagesPagination) {
                size = totalPagesPagination;
            }
        }

        return Array.apply(null, { length: size }).map(function(value, index) {
            return init + index;
        });
    }

    public toPage( page: number ) {
        this.currentPage = page;
        this.refresh();
    }

    private calculePagination( totalRows, itensForPage ): number {
        const count = totalRows > 0 ? Math.ceil( totalRows / itensForPage ) : 0;
        return count === 0 ? 1 : count;
    }


    public getRangeStart(): number {
        return (this.currentPage * this.config.itensForPage) + 1;
    }


    public getRangeEnd(): number {
        const range = (this.currentPage * this.config.itensForPage) + this.config.itensForPage;
        return range > this.data.total ? this.data.total : range;
    }

    public sort(column) {
        if (column !== this.config.sort.column) {
            this.config.sort.order = Order.ASC;
        } else {
            switch (this.config.sort.order) {
                case Order.ASC: {
                    this.config.sort.order = Order.DESC;
                }
                break;
                case Order.DESC: {
                    this.config.sort.order = null;
                    column = null;
                }
                break;
                default: {
                    this.config.sort.order = Order.ASC;
                }
                break;
            }
        }

        this.config.sort.column = column;
        this.refresh();
    }

    public search(event: any) {
        if (this.searchTimeout != null) {
            clearTimeout(this.searchTimeout);
        }

        this.searchTimeout = setTimeout(() => {
            this.config.search = event.target.value;
            this.currentPage = 0;
            this.refresh();
        }, 500);
    }

    public changeNumberItemsPage(event: any) {
        this.config.itensForPage = Number(event.target.value);
        this.currentPage = 0;
        this.refresh();
    }

    public getNumbersItemsPage() {
        return NUMBERS_ITEMS_PAGE;
    }
}