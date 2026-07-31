const getAppHref = (to) =>
  `${import.meta.env.BASE_URL}${to.replace(/^\/+/, "")}`;

const AppLink = ({ to, onClick, target, ...props }) => {
  const href = getAppHref(to);

  const handleClick = (event) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      target === "_blank"
    ) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <a href={href} onClick={handleClick} target={target} {...props} />
  );
};

export default AppLink;
