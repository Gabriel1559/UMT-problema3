function canSplitArray(A: Array<number>) {
	/*
	The solution uses dynamic programming to check whether
	 it's possible to split the array A into two non-empty 
	 lists with equal average values. It does so by creating
	a 2D array dp where dp[i][j] represents whether it's
	possible to obtain a sum of i using the first j elements of A.
	The solution then checks whether there is a sum i such that 
	both B and C have the same sum, and that sum is equal to
	sum(B) + sum(C) (which is the sum of all elements in A).
	If such sum exists, the solution returns true, otherwise it returns false.
	*/
	if (A.length < 2) {
		return false;
	}

	const sum: number = A.reduce((total: number, num: number) => total + num, 0);
	const n: number = A.length;

	// Create a 2D array of size (sum+1)x(n+1) to memoize the results of subproblems
	const dp = new Array(sum + 1)
		.fill(false)
		.map(() => new Array(n + 1).fill(false));

	// Initialize the first column as true, since an empty list can have an average of 0
	for (let i = 0; i <= sum; i++) {
		dp[i][0] = true;
	}

	for (let i = 1; i <= sum; i++) {
		for (let j = 1; j <= n; j++) {
			// Case 1: Exclude the jth element from the sum
			dp[i][j] = dp[i][j - 1];

			// Case 2: Include the jth element in the sum
			if (i >= A[j - 1]) {
				dp[i][j] = dp[i][j] || dp[i - A[j - 1]][j - 1];
			}
		}
	}

	// Check if there is a sum i such that both B and C have the same sum
	for (let i = 1; i <= sum; i++) {
		if (dp[i][n] && i * (n - sum / i) === sum) {
			return true;
		}
	}

	return false;
}

let arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(canSplitArray(arr));
