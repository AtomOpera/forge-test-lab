import { Queue } from '@forge/events';

const queue = new Queue({ key: 'queue-name' });

// type Payload = string | number | boolean | { [key: string]: Payload };
// type PushSettings = { delayInSeconds: number }

/**
 * @returns Id of the job created
 * */
// await queue.push(Payload | Payload[], PushSettings)

// Push a single event with string payload
await queue.push('hello world');

// Push a single event with JSON payload
// await queue.push({ "hello": "world" });

// Push multiple events to the queue
// await queue.push(["hello", "world"]);

// Delay the processing of the event by 5 seconds
// await queue.push("hello world", {
// 	delayInSeconds: 5
// })