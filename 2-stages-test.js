// 1. Init code

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
      { duration: '10s', target: 10 }, // In the first 10 seconds we'll get to 10 VUs
      { duration: '10s', target: 20 }, // In the next 10 seconds we'll get to 20 VUs
      { duration: '10s', target: 20 }, // In the next 10 seconds we'll stay with 20 VUs
      { duration: '10s', target: 0 }, // In the next 10 seconds we'll get to 0 VUs
    ],
  };

export function setup() {
	// 2. Setup code
}
export default function (data) {
    // 3. Virtual User code
    const res = http.get('https://test.k6.io');
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
export function teardown(data) {
	// 4. Teardown
}

// To run - k6 run 2-stages-test.js




