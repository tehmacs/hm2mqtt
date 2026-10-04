import '../device/registry.js';
import { parseMessage } from '../parser.js';
import type { VenusMiniDeviceData } from '../types.js';
import { miniRuntimePayload } from './venusMiniSchedule.js';

const time = process.argv[2];
if (!time) {
  throw new Error('A device-local time is required');
}
const data = parseMessage(
  miniRuntimePayload([], new Date(), { time }),
  'VNSEMINI-0',
  'timezone-test',
).data as VenusMiniDeviceData;
console.log(JSON.stringify({ deviceTime: data.deviceTime }));
