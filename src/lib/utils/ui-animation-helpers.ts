interface ScrollIntoViewProps {
  parent: HTMLDivElement;
  child: HTMLDivElement;
}

export function scrollIntoView({ parent, child }: ScrollIntoViewProps): void {
  if (parent && child) {
    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    const childOffsetTop = childRect.top - parentRect.top + parent.scrollTop;

    const isVisible = (
      childRect.top >= parentRect.top &&
      childRect.bottom <= parentRect.bottom
    );

    if (!isVisible) {
      parent.scrollTo({
        top: childOffsetTop - parentRect.height / 2 + childRect.height / 2,
        behavior: 'smooth'
      });
    }
  }
}
