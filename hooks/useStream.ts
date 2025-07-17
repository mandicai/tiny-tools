// using SSE
import { createParser } from 'eventsource-parser';

export async function streamResponse(prompt: string, model: string, onData: (chunk: string) => void) {
    console.log(model)
    const response = await fetch('/api/llm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model, stream: true }),
    });

    if (!response.body) throw new Error('No response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const parser = createParser({
        onEvent: (event) => {
            if (event.event === 'end') {
                return;
            }

            onData(JSON.parse(event.data).response);
        }
    });

    while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        parser.feed(chunk);
    }
}

// was not sending the chunks one by one
// export async function streamResponse(prompt: string, onData: (chunk: string) => void) {
//     const response = await fetch('/api/llm', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//             prompt, 
//             stream: true 
//         }),
//     });

//     if (!response.body) throw new Error('No response body');

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
//     let done = false;

//     while (!done) {
//         const { value, done: readerDone } = await reader.read();
//         done = readerDone;
//         const chunk = decoder.decode(value, { stream: true });
//         onData(chunk);
//     }
// }
