const fs = require('fs');
const data = require('../translations');

const extract = () => {
    const output = [];

    ['en', 'hi'].forEach(lang => {
        const { services, serviceComparison } = data[lang];
        Object.keys(services).forEach(key => {
            if (typeof services[key] === 'object') {
                output.push({
                    type: 'services',
                    key,
                    lang,
                    value: services[key]
                });
            }
        });
        output.push({
            type: 'serviceComparison',
            key: 'default',
            lang,
            value: serviceComparison
        });
    });

    fs.writeFileSync('./swagger-example/bulk-translations.json', JSON.stringify(output, null, 2));
    console.log('Bulk JSON ready in swagger-example/');
};

extract();
