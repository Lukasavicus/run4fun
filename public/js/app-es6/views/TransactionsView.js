import {View} from './View';

import {DateHelper} from '../helpers/DateHelper';

export class TransactionsView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        return `
            <table id="transactions-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Value</th>
                        <th>Nature</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    ${ (model.transactionList.length) ? '' : 
                        model.transactionList.transactions.map(transaction => `
                            <tr>
                                <td>${DateHelper.dateToText(transaction.date)}</td>
                                <td>${transaction.value}</td>
                                <td>${transaction.type}</td>
                                <td>${transaction.description} km</td>
                            </tr>
                            `
                    )
                    .join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" >Current Balance:</td>
                        <td>${model.balance} Neons</td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
}