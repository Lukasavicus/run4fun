import {View} from './View';

export class ActivitiesDashboardView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        return `
        <div>
            <div>
                <img src="imgs/badges/008-road.svg">
                <p>Total Travelled Distance</p>
            </div>
            <p class="record" id="total_travelled_dist">${model.total_kms} Kms</p>
        </div>
        <div>
            <div>
                <img src="imgs/badges/034-gas.svg">
                <p>Total Travelled Time</p>
            </div>
            <p class="record" id="total_travelled_time">${model.total_time}</p>
        </div>
        <div>
            <div>
                <img src="imgs/badges/025-time.svg">
                <p>Max Velocity Reached</p>
            </div>
            <p class="record" id="max_velocity_reached"></p>
        </div>
        <div>
            <div>
                <img src="imgs/badges/029-energy-drink.svg">
                <p>Max One-Shoot Distance</p>
            </div>
            <p class="record" id="max_one_shoot_dist"></p>
        </div>
        <div>
            <div>
                <img src="imgs/badges/040-medal-1.svg">
                <p>Best Record</p>
            </div>
            <p class="record" id="best_record"></p>
        </div>
        `;
    }
}