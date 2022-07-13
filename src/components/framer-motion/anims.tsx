
export const leftBounceVariants = {
    hidden: {
        x:-100,
        opacity: 0
    },
    visible: (custom: number = 1): object => ({
        x: 0,
        opacity: 1,
        transition: {delay: custom * 0.0015}
    })
}