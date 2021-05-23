
let keywords = [
    //Motor
    "click", "hands","point", "type", "write",
    //Cognitive
    "confirm", "think", "read", "forget", "remember", "store",
    //Perceptual
    "look", "hear", "say", "search",
    //System Response
    "response"
];

let symbols = [
    "(", ")", "mental-load",
    "[", "]", "time-load",
    "<", ">",  "task-amount",
];

CodeMirror.defineMode("mymode", () => {

  return {

    startState: () => {return {inComment: false, keywordUsed: false};},
    token: (stream, state) => {

        //One keyword can be highlighted per line
        if (stream.sol()) {
            state.keywordUsed = false;
        }

        // Checks for comments
        if (!state.inComment && stream.peek() == "*") {
            stream.next();
            state.inComment = true;
        } else if (!state.keywordUsed && stream.eatWhile(/\w/)) {// Checks for keywords
            if (keywords.includes(stream.current().toLowerCase())) {
                state.keywordUsed = true;
                return "task";
            }
        } else { // Checks for use of symbols together
            for (i=0; i<symbols.length; i+=3) {
                if (stream.peek() == symbols[i]) {
                    stream.next();
                    if (!state.inComment && stream.skipTo(symbols[i+1])) {
                        stream.next();
                        return symbols[i+2];
                    }
                }
            }
        }

        if (state.inComment) {// Multiline comments
            if (stream.skipTo("*")) {
                stream.next();
                state.inComment = false;
            } else {
                stream.skipToEnd();
            }

            return "comment";
        }

        stream.next();
    }
  };
});

let editor = $("#editor")[0];

let codemirror_editor = CodeMirror.fromTextArea(editor, {
    lineNumbers: true,
    mode: "mymode",
});