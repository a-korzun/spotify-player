export default function debounce(cb: Function, delay: number) {
  let timer: number | undefined;

  return function(...args: any[]) {
    if (timer !== undefined) {
      return;
    }

    cb.call(null, ...args);

    timer = window.setTimeout(() => timer = undefined , delay);
  };

}