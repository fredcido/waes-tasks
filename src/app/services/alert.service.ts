import { Injectable } from '@angular/core';

declare var $: any;

@Injectable()
export class AlertService {
    public from = 'top';
    public align = 'center';

    showNotification(message, type, icon = 'ti-gift') {
        $.notify({
            icon: icon,
            message: message
        }, {
                type: type,
                timer: 1000,
                placement: {
                    from: this.from,
                    align: this.align
                }
            });
    }

    success(message) {
        this.showNotification(message, 'success', 'ti-shine');
    }

    error(message) {
        this.showNotification(message, 'danger', 'ti-info-alt');
    }

    info(message) {
        this.showNotification(message, 'info', 'ti-tag');
    }
}
