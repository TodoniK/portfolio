declare module '*.module.scss' {
    const content: { [className: string]: string };
    export default content;
}

interface Window {
  __lenis?: import("lenis").default | undefined;
}