// @ts-ignore
import { cache } from "react";

export default (defaultValue) => {
    const getRef = cache(() => ({ current: defaultValue }));

    const getValue = () => getRef().current;

    const setValue = (value) => {
        getRef().current = value;
    };

    return [getValue, setValue];
};