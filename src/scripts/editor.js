
var keywords = ["press", "click"];

CodeMirror.defineMode("mymode", function() {

  return {

    startState: function() {return {inComment: false};},
    token: function(stream, state) {

        if (!state.inComment && stream.peek() == "*") {
            stream.next();
            state.inComment = true;
        } else if (stream.peek() == "(") {
            stream.next();
            if (!state.inComment && stream.skipTo(")")) {
                stream.next();
                return "mental-load";
            }
        } else if (stream.peek() == "[") {
            stream.next();
            if (!state.inComment && stream.skipTo("]")) {
                stream.next();
                return "time-load"
            }
        } else if (stream.eatWhile(/\w/)) {
            if (keywords.includes(stream.current().toLowerCase())) {
                return "task";
            }
        }

        if (state.inComment) {
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