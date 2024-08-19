/** @odoo-module **/

import { Component } from "@odoo/owl";
import { AddToCartNotification } from "../add_to_cart_notification/add_to_cart_notification";
import { WarningNotification } from "../warning_notification/warning_notification";

export class CartNotification extends Component {
    static components = { AddToCartNotification, WarningNotification };
    static template = "website_sale.cartNotification";
    static props = {
        message: [String, { toString: Function }],
        warning: {type : [String, { toString: Function }],optional: true},
        lines: {
            type: Array,
            optional: true,
            element: {
                type: Object,
                shape: {
                    id: Number,
                    image_url: String,
                    quantity: Number,
                    name: String,
                    description: { type: String, optional: true },
                    line_price_total: Number,
                },
            },
        },
        currency_id: Number,
        className: String,
        close: Function,
        refresh: Function,
        freeze: Function,
        total: {type: Number, optional: true},
        minimum_cost: {type: Number, optional: true}
    }
    setup() {
        // Verifica que `props` contenga `total` y `minimum_cost` sin decimales
        const total = Math.floor(parseFloat(this.props.total));
        const minimumCost = Math.floor(parseFloat(this.props.minimum_cost));
        const meetsMinimum = total <= minimumCost;
    
        // Asigna la comparación a una variable de estado o directamente úsala en el template
        this.meetsMinimum = meetsMinimum;
        this.total = total;
        this.minimumCost = minimumCost;
    }
    
    /**
     * Get the top position (in px) of the notification based on the navbar height.
     *
     * This prevents the notification from being shown in front of the navbar.
     */
    get positionOffset() {
        return (document.querySelector('header.o_top_fixed_element')?.offsetHeight || 0) + 'px';
    }
}
