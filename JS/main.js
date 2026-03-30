import $ from 'jquery';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

window.$ = $;
window.jQuery = $;
window.tippy = tippy;

const safeImport = async (loader, name) => {
	try {
		await loader();
	} catch (error) {
		console.error(`Failed to load ${name}`, error);
	}
};

const bootstrapOptionalModules = async () => {
	// jquery-ui expects global jQuery on window.
	await safeImport(() => import('jquery-ui-dist/jquery-ui.js'), 'jquery-ui-dist/jquery-ui.js');

	// Catalog controls should initialize immediately after jquery-ui is ready.
	await safeImport(() => import('./accordion-init.js'), './accordion-init.js');
	await safeImport(() => import('./tabs.js'), './tabs.js');

	await safeImport(() => import('./swiper-bundle.min.js'), './swiper-bundle.min.js');
	await safeImport(() => import('./simplebar.min.js'), './simplebar.min.js');
	await safeImport(() => import('./choices.min.js'), './choices.min.js');
	await safeImport(() => import('./just-validate.min.js'), './just-validate.min.js');

	await safeImport(() => import('./simplebar-init.js'), './simplebar-init.js');
	await safeImport(() => import('./choices-init.js'), './choices-init.js');
	await safeImport(() => import('./burger.js'), './burger.js');
	await safeImport(() => import('./swiper-init.js'), './swiper-init.js');
	await safeImport(() => import('./modal.js'), './modal.js');
	await safeImport(() => import('./tippy-init.js'), './tippy-init.js');
	await safeImport(() => import('./inputmask-init.js'), './inputmask-init.js');
	await safeImport(() => import('./just-validate-init.js'), './just-validate-init.js');
	await safeImport(() => import('../config.js'), '../config.js');
	await safeImport(() => import('./maps.js'), './maps.js');
	await safeImport(() => import('./blanchard.js'), './blanchard.js');
};

bootstrapOptionalModules();
