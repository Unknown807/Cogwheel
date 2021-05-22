
let time_load_regex = /\(\d+\s(s|ms|second|seconds|millisecond|milliseconds)\)/iu;
let mental_load_regex = /\[\d+\s(chunk|chunks)\]/iu;
let task_amount_regex = /<\d+>/iu;

function replace_multiline_comments(content) {
    let newContent = content.split("");
    let inComment = false;

    for (i=0; i<content.length; i++) {
        let char = content[i];

        if (char == "*") {
            inComment = !inComment;
            newContent[i] = "";
        }

        if (inComment) {
            newContent[i] = "";
        }

    }

    return newContent.join("");
}

function calculate_resources(content) {
    let total_chunks = 0;
    let total_time = 0;

    let lines = content.split("\n");

    for (i=0; i<lines.length; i++) {
        let line = lines[i];
        
        let time = line.match(time_load_regex);
        let cog = line.match(mental_load_regex);
        let amt = line.match(task_amount_regex);

        if (time != null) {
            let time_type = time[1];
            let duration = parseFloat(time[0].split(" ")[0].replace("(", ""));

            if (time_type.startsWith("m")) {
                duration /= 1000;
            }

            total_time += duration;
        }

        if (cog != null) {
            
        }

        if (amt != null) {
            
        }


    }

    console.log(total_time);
    
}

codemirror_editor.on("change", () => {
    let content = codemirror_editor.getValue();
    content = replace_multiline_comments(content);
    let time_and_cognition = calculate_resources(content);
    console.log(time_and_cognition);
});