"""
Visualization of Bit Counting Method for Single Number II.

Problem: [2, 2, 3, 2]
Target: Find 3 (which appears once).

Binary Representations (assuming 4-bit for simplicity):
2 -> 0 0 1 0
2 -> 0 0 1 0
3 -> 0 0 1 1
2 -> 0 0 1 0
"""

from typing import List


def visualize_bit_counting(nums: List[int]):
    print(f"Input numbers: {nums}")
    print("-" * 30)

    # Let's verify bit by bit (0 to 3 for this small example)
    ans = 0

    # Header
    print(
        f"{'Bit Position':<15} | {'Bits from nums':<20} | {'Sum':<5} | {'Sum % 3':<10} | {'Result Bit'}"
    )
    print("-" * 80)

    for i in range(4):  # Checking first 4 bits
        bits = []
        bit_sum = 0
        for num in nums:
            # Get the i-th bit of num
            b = (num >> i) & 1
            bits.append(b)
            bit_sum += b

        remainder = bit_sum % 3
        print(
            f"Bit {i:<11} | {str(bits):<20} | {bit_sum:<5} | {bit_sum} % 3 = {remainder:<2} | {remainder}"
        )

        # Restore the bit to the answer
        if remainder:
            ans |= 1 << i

    print("-" * 80)
    print(f"Constructed Result: {ans} (Binary: {bin(ans)})")


if __name__ == "__main__":
    visualize_bit_counting([2, 2, 3, 2])
