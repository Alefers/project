interface ScrollToTopOptions {
  smooth?: boolean,
  container?: Element,
}

export const scrollToTop = (options?: ScrollToTopOptions) => {
  const { smooth, container } = options || {};

  const block = container || window;

  if (block) {
    if (smooth) {
      block.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      block.scrollTo(0, 0);
    }
  }
}