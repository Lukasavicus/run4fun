import {View} from './View';

export class MessageView extends View {

    constructor(HTMLElement){
        super(HTMLElement);
    }

    template(model){
        return model.text ? `<p class="alert alert-${model.type}">${model.text}</p>` : '<p></p>';
    }
}

/*
    <div class="container">
        <section id="messaging">
        {% with messages = get_flashed_messages() %}
            {% if messages %}
                {% for message in messages %}
                    <div class="alert alert-{{ message['type'] }} alert-dismissible fade show" role="alert">
                        <strong>{{ message['title'] }}</strong>   {{ message['msg'] }}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                {% endfor %}
            {% endif %}
        {% endwith %}
        </section>
    </div>
*/