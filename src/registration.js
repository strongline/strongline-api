const internalAPICollection = [];
const internalAPINames = [];
const noop = () => {};

const APIInjectionPoint = global;

export const registerAPI = ({ constructor, autoload = true, skipSupportCheck = false }) => {
    if (!constructor) {
        return null;
    }

    const id = constructor.name || "";

    if (~internalAPINames.indexOf(id)) {
        throw new Error(
            `registerAPI(${id}): There is already an API registered with the name ${id}`
        );
    }

    internalAPINames.push(id);
    internalAPICollection.push({
        constructor,
        autoload,
        skipSupportCheck,
        id
    });
};

const getAPISupport = apiSpec => {
    const internalSupportCheck = apiSpec.constructor.supported;

    if (typeof internalSupportCheck === "function") {
        try {
            const isSupported = internalSupportCheck();
            return isSupported;
        } catch (e) {
            return false;
        }
    }
};

export const autoloadAPIComponents = (debug = false) => {
    internalAPICollection.forEach((apiSpec, index) => {
        const supported = getAPISupport(apiSpec);

        if (!supported && debug) {
            (global.console.log || noop)(
                `The API ${apiSpec.id} is not supported in your browser, consider updating or changing.`
            );
        } else {
            try {
                if (apiSpec.autoload) {
                    const apiInstance = new apiSpec.constructor();
                    APIInjectionPoint[apiSpec.id] = apiInstance;
                } else {
                    APIInjectionPoint[apiSpec.id] = apiSpec.constructor;
                }
            } catch (e) {
                if (debug) {
                    (global.console.log || noop)(`The API ${apiSpec.id} registration failed: ${e}`);
                }
            }
        }
    });
};
