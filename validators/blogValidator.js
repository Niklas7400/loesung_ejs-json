const titlePattern = /^[a-zA-ZäöüÄÖÜß0-9\s]+$/;
const scriptTagPattern = /<\/?script>/i;

function buildEmailPattern(author) {
    const nameParts = author.trim().split(/\s+/).filter(Boolean)
        .map(part => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    let namePart;
    if (nameParts.length === 1) {
        // nur ein Namensteil: darf am Anfang stehen (optional gefolgt von ".irgendwas") oder als zweites Segment
        namePart = `(${nameParts[0]}(\\.\\w+)?|\\w+\\.${nameParts[0]})`;
    } else {
        // zwei Namensteile: beide Reihenfolgen erlauben
        const [erster, zweiter] = nameParts;
        namePart = `(${erster}\\.${zweiter}|${zweiter}\\.${erster})`;
    }

    return new RegExp(`^${namePart}@(ai|informatik)\\.hs-fulda\\.de$`, 'i');
}

function validatePost(data) {
    let errors = {};

    if (!data.title || data.title.trim() === '') {
        errors.title = 'Titel ist erforderlich.';
    } else if (!titlePattern.test(data.title)) {
        errors.title = 'Titel darf keine Sonderzeichen enthalten.';
    }

    if (!data.author || data.author.trim() === '') {
        errors.author = 'Name ist erforderlich.';
    }

    if (!data.email || data.email.trim() === '') {
        errors.email = 'E-Mail ist erforderlich.';
    } else if (data.author && data.author.trim() !== '') {
        const emailPattern = buildEmailPattern(data.author);
        if (!emailPattern.test(data.email)) {
            errors.email = 'E-Mail muss den eingegebenen Namen enthalten und aus dem Fachbereich AI der Hochschule Fulda stammen (@ai.hs-fulda.de oder @informatik.hs-fulda.de).';
        }
    }

    if (!data.text || data.text.trim() === '') {
        errors.text = 'Text darf nicht leer sein.';
    } else if (scriptTagPattern.test(data.text)) {
        errors.text = 'Text darf kein <script>-Tag enthalten.';
    }

    return errors;
}

module.exports = { validatePost };
