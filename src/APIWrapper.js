export const APIType = {
    STABLE: "@@STABLE_API",
    EXPERIMENTAL: "@@EXPERIMENTAL_API",
    FUTURE: "@@FUTURE_API"
};

export default class APIWrapper {
    constructor(name, type = APIType.STABLE) {
        this.name = name;
        this.type = type;
    }

    /**
     * @abstract
     */
    static supported() {
        return false;
    }

    get readableApiType() {
        switch (this.type) {
            case APIType.STABLE:
                return "stable";
            case APIType.EXPERIMENTAL:
                return "experimental";
            case APIType.FUTURE:
                return "futuristic";
            default:
                return "unknown";
        }
    }

    fail(message) {
        const supported = this.supported;
        const readableApiType = this.readableApiType;
        let apiTypeSupport = "";

        if (this.apiType === APIType.EXPERIMENTAL || this.apiType === APIType.FUTURE) {
            apiTypeSupport = `This API is currently ${readableApiType}, consider using only stable APIs.`;
        }

        throw new Error(`${this.name}: ${message}. ${apiTypeSupport}`);
    }

    detach() {
        console.log("Detaching currently not supported, wait for v1 stable release.");
    }
}
