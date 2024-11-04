/// <reference path="../pb_data/types.d.ts" />

onRecordAfterCreateRequest((e) => {
    const customer = $app.dao().findRecordById("customer", e.record.get("customer"))

    const template = $template.loadFiles(
        `${__hooks}/views/layout.html`,
        `${__hooks}/views/hello.html`,
    ).render({
        "name": customer.get('name'),
        "date": e.record.get('created'),
        "order": e.record.get('id')
    })

    const message = new MailerMessage({
        from: {
            address: $app.settings().meta.senderAddress,
            name: $app.settings().meta.senderName,
        },
        to: [
            {
                "name": customer.get('name'),
                "address": customer.get('email')
            }
        ],
        text: "Hallo Welt",
        subject: "Betreff",
        html: template
    })
    $app.newMailClient().send(message);
}, "orders")