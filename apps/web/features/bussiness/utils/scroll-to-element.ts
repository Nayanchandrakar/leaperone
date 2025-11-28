/**
 * Scrolls to the top of a form element by its ID
 * @param elementId - The ID of the form element to scroll to
 */
export function scrollToElement(elementId: string) {
  requestAnimationFrame(() => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  })
}
