/**
 * Handles clicking on .icon-trigger.toggle-state to expand/collapse keymenu
 * @param element - The clicked icon-trigger element
 */
export function handleKeymenuExpand(element: HTMLElement): void {
    const keymenu = element.closest('.keymenu');
    if (!keymenu) return;

    const trigger = element.querySelector('.keymenu-toggle-trigger');
    if (!trigger) return;

    if (keymenu.classList.contains('list-group-collapse')) {
        keymenu.classList.remove('list-group-collapse');
        keymenu.classList.add('list-group-expand');
        trigger.classList.remove('fa-caret-left');
        trigger.classList.add('fa-caret-right');
    } else {
        keymenu.classList.remove('list-group-expand');
        keymenu.classList.add('list-group-collapse');
        trigger.classList.remove('fa-caret-right');
        trigger.classList.add('fa-caret-left');
    }
}
