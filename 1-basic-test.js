// 1. Init code

import http from 'k6/http';
import { check, sleep } from 'k6';

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

// To run - k6 run --vus 10 --duration 10s 1-basic-test.js




