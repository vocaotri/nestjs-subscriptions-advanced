export const helper = {
    JsonString(json: string): JSON {
        if (/^[\],:{}\s]*$/.test(json.replace(/\\["\\\/bfnrtu]/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
            //the json is ok
            return JSON.parse(json);
        const str = JSON.stringify([json]);
        return JSON.parse(str);
    }

}
export function inArray(arrayInput, Item) {
    for (var i = 0; i < arrayInput.length; i++) {
        if (JSON.stringify(Item) == JSON.stringify(arrayInput[i]))
            return true
    }
    return false
}

export function pushIfNotExist(arrayInput, Item) {
    if (!inArray(arrayInput, Item)) {
        arrayInput.push(Item)
    }
    return arrayInput;
}
export function popIfExit(arrayInput, Item) {
    return arrayInput.filter(function (value) {
        return value != JSON.stringify(Item);
    })
}