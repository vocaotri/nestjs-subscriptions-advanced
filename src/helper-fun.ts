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