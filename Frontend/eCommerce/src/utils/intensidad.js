export const getIntensidadImg = (nombre) => {
    return nombre.toLowerCase().includes("café")
        ? "/recursos/cafeIntensidad.svg"
        : "/recursos/teIntensidad.svg";
};
