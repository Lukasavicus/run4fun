import {View} from './View';

import {DateHelper} from '../helpers/DateHelper';

export class ActivitiesView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        return `
            <table id="records-table">
                <thead>
                    <tr>
                        <th rowspan="3" >Date</th>
                        <th rowspan="3" >Physical Activity</th>
                        <th rowspan="3" >Place</th>
                        <th colspan="5" >Measures</th>
                        <th colspan="2" rowspan="2"> </th>
                    </tr>
                    <tr>
                        <th rowspan="2" >Distance</th>
                        <th rowspan="2" >Time</th>
                        <th colspan="3" >Pace</th>
                    </tr>
                    <tr>
                        <th>Avg. Velocity (m/s)</th>
                        <th>Avg. Velocity (km/h)</th>
                        <th>Avg. Time (100 mts)</th>
                        <th> edit </th>
                        <th> delete </th>
                    </tr>
                </thead>
                <tbody>
                    ${model.activities.map(activity => `
                            <tr>
                                <td style="display:none">${activity.id}</td>
                                <td>${DateHelper.dateToText(activity.date)}</td>
                                <td>${activity.physical_activity}</td>
                                <td>${activity.place}</td>
                                <td>${activity.route_distance} km</td>
                                <td>${activity.time}</td>
                                <td>${activity.avg_velocity_ms}</td>
                                <td>${activity.avg_velocity_kmh}</td>
                                <td>${activity.avg_time_by_distance(100)}</td>
                                <td> <button>edit</button> </td>
                                <td> <button>delete</button> </td>
                            </tr>
                            `
                    )
                    .join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" >Total</td>
                        <td>${model.total_distance} kms</td>
                        <td>${model.total_time}</td>
                        <td>${model.avg_velocity_ms}</td>
                        <td>${model.avg_velocity_kmh}</td>
                        <td> xx:xx:xx </td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
}