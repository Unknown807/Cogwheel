let inputs = [
    "click", "hands", "point", "type",
    "write", "confirm", "think", "read",
    "forget", "remember", "store", "look",
    "hear", "say", "search", "response",
];

let time_load_regex = /\(\d+\s(s|ms|second|seconds|millisecond|milliseconds)\)/iu;
let mental_load_regex = /\[\d+\s(chunk|chunks)\]/iu;
let task_amount_regex = /<\d+>/iu;
let keyword_regex = new RegExp(`(?<!\\w)(${inputs.join("|")})(?!\\w)`, "iu");

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
    let temp_chunks = 0;
    let total_time = 0;

    let lines = content.split("\n");

    for (i=0; i<lines.length; i++) {
        let line = lines[i];
        
        let task = line.match(keyword_regex);
        if (task == null) {
            continue;
        }

        task = inputs.indexOf(task[0].toLowerCase());

        let time = line.match(time_load_regex);
        let cog = line.match(mental_load_regex);
        let amt = line.match(task_amount_regex);
        amt = (amt != null) ? parseInt(amt[0].replace("<", "").replace(">", "")) : 1;

        let duration;
        if (time != null) {
            let time_type = time[1];
            duration = parseFloat(time[0].split(" ")[0].replace("(", ""));

            if (time_type.startsWith("m")) {
                duration /= 1000;
            }
        } else {
            duration = taskTimes[task];
        }

        total_time += (duration*amt);

        if (cog != null) {
            cog = parseInt(cog[0].split(" ")[0].replace("[", ""));

            if (line.toLowerCase().includes("forget")) {
                temp_chunks = 0;
            } else {
                temp_chunks += cog;
            }

            if (temp_chunks > total_chunks) {
                total_chunks = temp_chunks;
            }

        }

    }

    total_time = total_time.toFixed(4).replace(/(\d)0+$/, '$1');
    total_time = (total_time == "0.0") ? "0" : total_time;

    return [total_time, total_chunks];
}

codemirror_editor.on("change", () => {
    let content = codemirror_editor.getValue();
    content = replace_multiline_comments(content);
    let time_and_cognition = calculate_resources(content);
    $("#total-time").text(`${time_and_cognition[0]} Seconds`);
    $("#total-memory").text(`${time_and_cognition[1]} Chunks`);
});