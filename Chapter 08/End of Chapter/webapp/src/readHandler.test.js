import { test } from "node:test";
import { readHandler } from "./readHandler";
import { equal } from "assert";
import fs from "fs/promises";

const createMockResponse = (testCtx) => ({
    writeHead: testCtx.mock.fn(),
    setHeader: testCtx.mock.fn(),
    write: testCtx.mock.fn(),
    end: testCtx.mock.fn()    
});

test("readHandler tests", async (testCtx) => {

    // Arrange - set up the test 
    const req = {};
        
    // const resp = {
    //     setHeader: testCtx.mock.fn(),
    //     write: testCtx.mock.fn(),
    //     end: testCtx.mock.fn()
    // };

    // Test the successful outcome
    await testCtx.test("Successfully reads file", async (innerCtx) => {

        // Arrange - set up the test
        const data = "json-data";
        innerCtx.mock.method(fs, "readFile", async () => data);
        const resp = createMockResponse(innerCtx);

        // Act - perform the test 
        await readHandler(req, resp);

        // Assert - verify the results
        equal(resp.setHeader.mock.calls[0].arguments[0], "Content-Type");
        equal(resp.setHeader.mock.calls[0].arguments[1], "application/json");
        equal(resp.write.mock.calls[0].arguments[0], data);
        equal(resp.end.mock.callCount(), 1);
    });

    // Test the failure outcome
    await testCtx.test("Handles error reading file", async (innerCtx) => {
        // Arrange - set up the test
        innerCtx.mock.method(fs, "readFile",  () => Promise.reject("file error"));
        const resp = createMockResponse(innerCtx);

        // Act - perform the test 
        await readHandler(req, resp);
        
        // Assert - verify the results
        equal(resp.writeHead.mock.calls[0].arguments[0], 500);
        equal(resp.end.mock.callCount(), 1);
    });
});
