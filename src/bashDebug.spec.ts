import { createRunInTerminalArgs } from "./bashDebug";

describe("bashDebug - createRunInTerminalArgs", () => {

    it("preserves shell interpretation for runInTerminal commands", () => {

        expect(createRunInTerminalArgs("integrated", "wsl.exe", "bash", "while [[ ! -p fifo ]]; do sleep 0.25; done"))
            .toEqual({
                kind: "integrated",
                title: "Bash Debug Console",
                cwd: ".",
                args: ["wsl.exe", "bash", "-c", "while [[ ! -p fifo ]]; do sleep 0.25; done"],
                argsCanBeInterpretedByShell: true,
            });
    });

    it("omits the extra bash path argument when it is not needed", () => {

        expect(createRunInTerminalArgs("external", "/bin/bash", "", "echo ok").args)
            .toEqual(["/bin/bash", "-c", "echo ok"]);
    });
});
