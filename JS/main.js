import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui.css';
import 'tippy.js/dist/tippy.css';

window.$ = $;
window.jQuery = $;

const bootstrap = async () => {
	await import('jquery-ui-dist/jquery-ui.js');

	const { default: tippy } = await import('tippy.js');
	window.tippy = tippy;

	await import('./swiper-bundle.min.js');
	await import('./simplebar.min.js');
	await import('./choices.min.js');
	await import('./inputmask.js');
	await import('./toastify.js');
	await import('./just-validate.min.js');

	await import('./accordion-init.js');
	await import('./simplebar-init.js');
	await import('./choices-init.js');
	await import('./burger.js');
	await import('./tabs.js');
	await import('./swiper-init.js');
	await import('./modal.js');
	await import('./tippy-init.js');
	await import('./inputmask-init.js');
	await import('./just-validate-init.js');
	await import('../config.js');
	await import('./maps.js');
	await import('./blanchard.js');
};

bootstrap();
