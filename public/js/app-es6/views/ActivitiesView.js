import {View} from './View';

import {DateHelper} from '../helpers/DateHelper';
import {TimeHelper} from '../helpers/TimeHelper';

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
                        <th colspan="9" >Measures</th>
                    </tr>
                    <tr>
                        <th colspan="3" >Runned Distance</th>
                        <th rowspan="2" >Time</th>
                        <th colspan="5" >Pace</th>
                    </tr>
                    <tr>
                        <th>Route Distance</th>
                        <th># Rounds</th>
                        <th>Total Route Distance</th>
                        <!-- time -->
                        <th>Pace per Round</th>
                        <th>Avg. Pace</th>
                        <th>Avg. Velocity (m/s)</th>
                        <th>Avg. Velocity (km/h)</th>
                        <th>Avg. Time (100 mts)</th>
                    </tr>
                </thead>
                <tbody>
                    ${model.activities.map(activity => `
                            <tr>
                                <td>${DateHelper.dateToText(activity.date)}</td>
                                <td>${activity.physical_activity}</td>
                                <td>${activity.place}</td>
                                <td>${activity.route_distance} km</td>
                                <td>?</td>
                                <td>${activity.route_distance} km</td>
                                <td>${activity.time}</td>
                                <td>${activity.time}</td>
                                <td>x</td>
                                <td>${activity.avg_velocity_ms}</td>
                                <td>${activity.avg_velocity_kmh}</td>
                                <td>${activity.avg_time_by_distance(100)}</td>
                            </tr>
                            `
                    )
                    .join('')}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="5" >Total</td>
                        <td>${model.total_kms} kms</td>
                        <td>${model.total_time}</td>
                        <td> xx:xx:xx </td>
                        <td> xx:xx:xx </td>
                        <td> xx:xx:xx </td>
                        <td> xx:xx:xx </td>
                        <td> xx:xx:xx </td>
                    </tr>
                </tfoot>
            </table>
        `;
    }
}