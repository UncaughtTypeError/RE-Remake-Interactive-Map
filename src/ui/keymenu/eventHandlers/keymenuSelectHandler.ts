import { animateGears } from 'shared/renderers/gearsAnimatorRenderer';

/**
 * Handles clicking on .keymenu-select elements to toggle keymenu visibility
 * @param element - The clicked keymenu-select element
 */
export function handleKeymenuSelect(element: HTMLElement): void {
    const listID = element.id;

    if (element.classList.contains('keymenu-inactive')) {
        // Activate this keymenu
        document.querySelectorAll('.keymenu-select').forEach((select) => {
            select.classList.remove('keymenu-active');
            select.classList.add('keymenu-inactive');
            select.classList.remove('fa-dot-circle-o');
            select.classList.add('fa-circle-o');
        });

        element.classList.remove('keymenu-inactive');
        element.classList.add('keymenu-active');
        element.classList.remove('fa-circle-o');
        element.classList.add('fa-dot-circle-o');

        // Show corresponding keymenu, hide others
        document.querySelectorAll('.keymenu').forEach((keymenu) => {
            const thisID = keymenu.getAttribute('data-id');
            if (thisID === listID) {
                keymenu.classList.remove('keymenu-inactive');
                keymenu.classList.add('keymenu-active');
            } else {
                keymenu.classList.remove('keymenu-active');
                keymenu.classList.add('keymenu-inactive');
            }
        });
    } else {
        // Deactivate this keymenu
        element.classList.remove('keymenu-active');
        element.classList.add('keymenu-inactive');
        element.classList.remove('fa-dot-circle-o');
        element.classList.add('fa-circle-o');

        document.querySelectorAll('.keymenu').forEach((keymenu) => {
            const thisID = keymenu.getAttribute('data-id');
            if (thisID === listID) {
                keymenu.classList.remove('keymenu-active');
                keymenu.classList.add('keymenu-inactive');
            }
        });
    }

    // Animate gears
    animateGears('left', 1000);
}
