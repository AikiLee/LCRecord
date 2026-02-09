"""
LeetCode 137. Single Number II
Given an integer array nums where every element appears three times except for one,
which appears exactly once. Find the single element and return it.
"""

from typing import List


def singleNumber_bit_count(nums: List[int]) -> int:
    """
    Method 1: Bit Counting (General approach for any 'k' repeats)
    Count the number of 1s at each bit position (0-31).
    Since every number appears 3 times, the count at any position should be divisible by 3.
    If count % 3 != 0, it means the unique number has a 1 at this position.

    Time Complexity: O(32 * N) -> O(N)
    Space Complexity: O(1)
    """
    ans = 0
    # Python integers are arbitrary precision, so we must manually handle 32-bit limits
    # We Iterate through 32 bits
    for i in range(32):
        total = sum((num >> i) & 1 for num in nums)

        # If the count of 1s at this position is not divisible by 3,
        # then the single number contributes a 1 here.
        if total % 3 != 0:
            # Handle the sign bit (31st bit) separately for 32-bit signed integers
            if i == 31:
                ans -= 1 << 31
            else:
                ans |= 1 << i
    return ans


def singleNumber_digital_logic(nums: List[int]) -> int:
    """
    Method 2: Digital Logic / State Machine (Optimal)
    We need to design a counter that counts 0 -> 1 -> 2 -> 0 (reset).
    Two bits are needed to represent states 0, 1, 2.
    Let's name them 'ones' and 'twos'.

    State transitions for a specific bit position:
    Current (twos, ones) + Input 1 -> Next (twos, ones)
    00 + 1 -> 01 (1)
    01 + 1 -> 10 (2)
    10 + 1 -> 00 (3 -> reset)

    Logic:
    ones = (ones ^ num) & ~twos
    twos = (twos ^ num) & ~ones

    Time Complexity: O(N)
    Space Complexity: O(1)
    """
    ones, twos = 0, 0
    for num in nums:
        # Step 1: Update 'ones'
        # XOR adds the number to 'ones'.
        # & ~twos ensures that if a bit was already in 'twos' (meaning it appeared twice before),
        # adding it again (3rd time) clears it from 'ones'.
        # Wait, the logic is:
        # If it was in neither (00), it goes to ones (01).
        # If it was in ones (01), it leaves ones (XOR) and we'll handle twos next.
        # If it was in twos (10), it stays out of ones.
        ones = (ones ^ num) & ~twos

        # Step 2: Update 'twos'
        # XOR adds the number to 'twos'.
        # & ~ones ensures that if a bit is now in 'ones' (just added efficiently), it doesn't go to 'twos'.
        # Effectively:
        # If it was in ones (01) before this step (so effectively 1->2), it moves to twos.
        # If it was in twos (10) before this step (so 2->3), it leaves twos via XOR.
        twos = (twos ^ num) & ~ones

    return ones


if __name__ == "__main__":
    test_cases = [
        [2, 2, 3, 2],
        [0, 1, 0, 1, 0, 1, 99],
        [-2, -2, 1, 1, 4, 1, 4, 4, -4, -2],
    ]

    print("--- Bit Counting Method ---")
    for nums in test_cases:
        print(f"Input: {nums}, Result: {singleNumber_bit_count(nums)}")

    print("\n--- Digital Logic Method ---")
    for nums in test_cases:
        print(f"Input: {nums}, Result: {singleNumber_digital_logic(nums)}")
