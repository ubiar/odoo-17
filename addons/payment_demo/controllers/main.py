# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import http
from odoo.http import request


class PaymentDemoController(http.Controller):
    _simulation_url = '/payment/demo/simulate_payment'

    @http.route(_simulation_url, type='json', auth='public', website=True)
    def demo_simulate_payment(self, **data):
        """ Simulate the response of a payment request.

        :param dict data: The simulated notification data.
        :return: None
        """
        order = request.website.sale_get_order()

        order.write({
            'payment_method': 'mp' if data.get('method') == 'mp' else 'efectivo'
        })

        request.env['payment.transaction'].sudo()._handle_notification_data('demo', data)
