import { createDirectus, rest } from '@directus/sdk';
import { readItems } from '@directus/sdk';

const directus = createDirectus('http://localhost:8055/').with(rest());

async function getGlobals() {
	return directus.request(readItems('global'));
}
export const global = await getGlobals();


export default directus;