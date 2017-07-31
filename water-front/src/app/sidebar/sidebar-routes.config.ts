import {  RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: 'active' },
    { path: 'person', title: 'Pessoas',  icon: 'person', class: '' },
    { path: 'credit', title: 'Histórico de Créditos',  icon: 'trending_up', class: '' },
    { path: 'debit', title: 'Histórico de Débitos',  icon: 'trending_down', class: '' },
    { path: 'table', title: 'Table List',  icon: 'content_paste', class: '' },
    { path: 'typography', title: 'Typography',  icon: 'library_books', class: '' },
    { path: 'icons', title: 'Icons',  icon: 'bubble_chart', class: '' },
    { path: 'notifications', title: 'Notifications',  icon: 'notifications', class: '' },
];
