import $ from 'jquery';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

window.$ = $;
window.jQuery = $;
window.tippy = tippy;

const baseUrl = import.meta.env.BASE_URL || '/';

const resolveLegacyUrl = (relativePath) => `${baseUrl}${relativePath.replace(/^\/+/, '')}`;

const loadLegacyScript = (src) =>
	new Promise((resolve, reject) => {
		const existing = document.querySelector(`script[data-legacy-src="${src}"]`);
		if (existing) {
			resolve();
			return;
		}

		const script = document.createElement('script');
		script.src = src;
		script.async = false;
		script.dataset.legacySrc = src;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
		document.head.appendChild(script);
	});

const safeImport = async (loader, name) => {
	try {
		await loader();
	} catch (error) {
		console.error(`Failed to load ${name}`, error);
	}
};

const bootstrapOptionalModules = async () => {
	// jQuery UI is loaded as a legacy script to avoid broken ESM exports in production bundles.
	await safeImport(() => loadLegacyScript(resolveLegacyUrl('vendor/jquery-ui.min.js')), 'vendor/jquery-ui.min.js');

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
