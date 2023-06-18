/**
 *
 * @param {Element id} shown - id of element to be shown
 * @param {Element id} hidden - id of element to be hidden
 *
 * Hides 'hidden' and shows 'shown'
 */
export function show(shown, hidden) {
  document.getElementById(shown).classList.toggle("display-none");
  document.getElementById(hidden).classList.toggle("display-none");
}

/**
 *
 * @param {Button id} button_id
 * @param {Element id} shown
 * @param {Element id} hidden
 *
 * Wrapper function that runs show() on click of button represented by button_id
 */
export function onClickSwitchPage(button_id, shown, hidden) {
  document.getElementById(button_id).onclick = () => {
    show(shown, hidden);
  };
}
