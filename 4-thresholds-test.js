// 1. Init code

import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
	stages: [
		{ duration: "5s", target: 10 }, // In the first 5 seconds we'll get to 10 VUs
		{ duration: "5s", target: 20 }, // In the next 5 seconds we'll get to 20 VUs
		{ duration: "5s", target: 0 }, // In the next 5 seconds we'll get to 0 VUs
	],
	thresholds: {
		http_req_failed: ["rate<0.01"], // http errors should be less than 1%
		http_req_duration: ["p(95)<400"], // 95% of requests should be below 400ms
	},
};

export function setup() {
	// 2. Setup code
}
export default function (data) {
	// 3. Virtual User code
	const res = http.get("https://test.k6.io");
	check(res, { "status was 200": (r) => r.status == 200 });
	sleep(1);
}
export function teardown(data) {
	// 4. Teardown
}

// To run - k6 run 4-thresholds-test.js
