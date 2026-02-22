'use strict';

/**
 * developer-quote service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::developer-quote.developer-quote');
