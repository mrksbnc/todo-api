'use strict';

import apicache from 'apicache';

const cache = apicache.options({ defaultDuration: '30 minutes' }).middleware;

export default cache;
