export default function obfuscateText(
    text: string,
    numberOfVisibleCharacters = 4,
    numberOfDummyCharacters = 4,
    dummyCharacter = "*"
): string {
    const partOfText = text.substring(text.length - numberOfVisibleCharacters);
    return dummyCharacter.repeat(numberOfDummyCharacters) + partOfText;
}

export function obfuscateApiKey(apiKey: string): string {
    const numberOfVisibleCharacters = 4;
    const numberOfDummyCharacters = 8;

    return obfuscateText(
        apiKey,
        numberOfVisibleCharacters,
        numberOfDummyCharacters
    );
}
