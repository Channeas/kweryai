export default function getErrorAsString(error: unknown): string | null {
    if (typeof error === "string") {
        return error;
    }

    if (error instanceof Error) {
        return error.message;
    }

    console.error("Unknown error", error);

    return null;
}
