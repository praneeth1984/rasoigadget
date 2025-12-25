import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ orderId: string }> }
) {
  try {
    const params = await props.params;
    const orderId = params.orderId;
    
    if (!orderId || orderId.trim() === '') {
      return NextResponse.json({ success: false, message: 'Invalid order ID' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    // In a real production app, you would verify permission here
    // For now, we'll allow fetching by ID as requested

    const baseAmount = (order.baseAmount || 0) / 100;
    const taxAmount = (order.taxAmount || 0) / 100;
    const totalAmount = order.amount / 100;

    // GST Logic: seller is in Karnataka
    const sellerState = "Karnataka";
    const isInterState = order.customerState && order.customerState !== sellerState;
    
    let taxBreakdownHtml = '';
    if (isInterState) {
      taxBreakdownHtml = `
        <tr class="item last">
          <td>IGST (18%)</td>
          <td>₹${taxAmount.toFixed(2)}</td>
        </tr>
      `;
    } else {
      const halfTax = taxAmount / 2;
      taxBreakdownHtml = `
        <tr class="item">
          <td>CGST (9%)</td>
          <td>₹${halfTax.toFixed(2)}</td>
        </tr>
        <tr class="item last">
          <td>SGST (9%)</td>
          <td>₹${halfTax.toFixed(2)}</td>
        </tr>
      `;
    }

    // Simple HTML Invoice Template
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice #${order.id}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; margin: 0; padding: 40px; }
          .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, .15); font-size: 16px; line-height: 24px; }
          .invoice-box table { width: 100%; line-height: inherit; text-align: left; border-collapse: collapse; }
          .invoice-box table td { padding: 5px; vertical-align: top; }
          .invoice-box table tr td:nth-child(2) { text-align: right; }
          .invoice-box table tr.top table td { padding-bottom: 20px; }
          .invoice-box table tr.top table td.title { font-size: 45px; line-height: 45px; color: #9FCC7C; font-weight: bold; }
          .invoice-box table tr.information table td { padding-bottom: 40px; }
          .invoice-box table tr.heading td { background: #f9f9f9; border-bottom: 1px solid #ddd; font-weight: bold; }
          .invoice-box table tr.details td { padding-bottom: 20px; }
          .invoice-box table tr.item td { border-bottom: 1px solid #eee; }
          .invoice-box table tr.item.last td { border-bottom: none; }
          .invoice-box table tr.total td:nth-child(2) { border-top: 2px solid #eee; font-weight: bold; font-size: 20px; color: #9FCC7C; }
          .gst-info { font-size: 12px; color: #777; margin-top: 50px; text-align: center; }
          @media print {
            .no-print { display: none; }
          }
          .header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
          .btn-download { background: #9FCC7C; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="no-print header-row">
          <div><h1>Tax Invoice</h1></div>
          <button onclick="window.print()" class="btn-download">Download / Print PDF</button>
        </div>
        <div class="invoice-box">
          <table>
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td class="title" style="padding: 0;">
                      <img src="https://rasoigadget.com/cdn/shop/files/Updated_Logo-removebg-preview.png?height=82&v=1758460383" style="height: 60px; filter: invert(0);" alt="Rasoi Gadget">
                    </td>
                    <td>
                      Invoice #: ${order.orderNumber}<br>
                      Date: ${new Date(order.createdAt).toLocaleDateString('en-IN')}<br>
                      Status: Paid
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      <strong>Billed From:</strong><br>
                      Rasoi Gadget India<br>
                      Bengaluru, Karnataka<br>
                      GSTIN: 29AAAAA0000A1Z5 (Sample)
                    </td>
                    <td>
                      <strong>Billed To:</strong><br>
                      ${order.customerName || 'Customer'}<br>
                      ${order.customerEmail}<br>
                      ${order.customerPhone || ''}<br>
                      ${order.customerState || ''}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr class="heading">
              <td>Item</td>
              <td>Price</td>
            </tr>
            <tr class="item">
              <td>${order.productName}</td>
              <td>₹${baseAmount.toFixed(2)}</td>
            </tr>
            ${taxBreakdownHtml}
            <tr class="total">
              <td></td>
              <td>Total: ₹${totalAmount.toFixed(2)}</td>
            </tr>
          </table>
          <div class="gst-info">
            This is a computer-generated invoice and does not require a signature.<br>
            Thank you for your purchase from Rasoi Gadget!
          </div>
        </div>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    return NextResponse.json({ success: false, message: 'Failed to generate invoice' }, { status: 500 });
  }
}
