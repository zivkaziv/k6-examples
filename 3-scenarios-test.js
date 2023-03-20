// 1. Init code

import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
	scenarios: {
		shared_iter_scenario: {
			executor: "shared-iterations",
			vus: 10,
			iterations: 100,
			startTime: "0s",
		},
		per_vu_scenario: {
			executor: "per-vu-iterations",
			vus: 10,
			iterations: 10,
			startTime: "10s",
		},
		constant_arrival_rate_scenario: {
			executor: "constant-arrival-rate",
			preAllocatedVUs: 10,
			rate: 3,
			timeUnit: "1s",
			startTime: "20s",
			duration: "10s",
		},
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

// To run - k6 run 3-scenarios-test.js
