// ============ GLOBALS

/**
 * Allows for the customization of the data animation attribute
 * @param {string} attr Sets the attribute name
 */
const animationAttribute = (attr = "data-animate") => attr;

/**
 * Determines if the scroll animations should be enabled or disabled
 * @param {boolean} condition Enables/Disables animations
 */
const enableAnimations = (condition = false) => condition;

// ============= HELPERS

/**
 * Checks if a specific element is visible within the device's viewport
 * @param el Element to check visibility
 * @returns boolean
 */
const isVisible = (el) => {
	const { top, bottom } = el.getBoundingClientRect();
	const vHeight = window.innerHeight || document.documentElement.clientHeight;
	const elDisplayHeight = el.clientHeight;

	return (
		(top > 0 - elDisplayHeight || bottom > 0 - elDisplayHeight) &&
		elDisplayHeight + top < vHeight
	);
};

/**
 * Adds class to the target element
 * @param el Target element
 * @param cssClass Class to add to the element
 */
const addClass = (el, cssClass) => el.classList.add(`${cssClass}`);

/**
 * Removes class from the target element
 * @param el Target element
 * @param cssClass Class to remove from the element
 */
const removeClass = (el, cssClass) => el.classList.remove(`${cssClass}`);

/**
 * Determines which animation class the target element should have
 * based on its data-attribute and adds the class
 * @param el Target element
 */
const addAnimationClass = (el) =>
	addClass(el, el.getAttribute(animationAttribute()));

// ============= MAIN

if (enableAnimations()) {
	const animatableElements = () =>
		Array.from(document.querySelectorAll(`[${animationAttribute()}]`));

	animatableElements().forEach((el) => addAnimationClass(el));

	// ============= DEMO

	document.addEventListener("scroll", () =>
		animatableElements().forEach((el) =>
			isVisible(el) ? addClass(el, "enter") : removeClass(el, "enter")
		)
	);
}
