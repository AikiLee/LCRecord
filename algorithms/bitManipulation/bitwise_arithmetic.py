"""
Bitwise Arithmetic Implementation in Python.

This module implements addition and subtraction using only bitwise operations
(AND, OR, XOR, NOT, SHIFT), simulating 32-bit integer arithmetic.
Demos how to handle Python's arbitrary precision integers to achieve fixed-width behavior.
"""


def add(a: int, b: int) -> int:
    """
    Calculates a + b using bitwise operations.

    Principles:
    1. Sum without carry: a ^ b (XOR)
    2. Carry: (a & b) << 1 (AND then left shift)
    3. Iterate until carry is 0.

    Note: A mask (0xFFFFFFFF) is used to simulate 32-bit integer overflow,
    preventing infinite loops with Python's arbitrary precision integers
    when dealing with negative numbers.
    """
    # python处理负数是有问题的，如果不加上掩码就会导致无限循环
    # 32-bit mask
    MASK = 0xFFFFFFFF
    # Max positive integer for 32-bit signed (0x7FFFFFFF)
    # Used to determine if the result should be interpreted as negative
    MAX_INT = 0x7FFFFFFF

    while b != 0:
        # Calculate carry bits
        carry = (a & b) << 1

        # Calculate sum without carry
        a = (a ^ b) & MASK

        # Carry becomes the new 'b' to add in the next iteration
        b = carry & MASK

    # If the result is a negative 32-bit integer (highest bit is 1),
    # convert it to Python's negative integer representation.
    # ~(a ^ MASK) is a trick to get the correct negative value.
    # Example: if a is 0xFFFFFFFF (32 ones), a^MASK is 0, ~0 is -1.
    return a if a <= MAX_INT else ~(a ^ MASK)


def subtract(a: int, b: int) -> int:
    """
    Calculates a - b using bitwise operations.

    Principle:
    a - b is equivalent to a + (-b).
    In Two's Complement representation, -b is (~b + 1).
    """
    # Get -b:
    # 1. ~b is the bitwise inverse.
    # 2. Add 1 to complete Two's Complement.
    # Since we can't use '-', we calculate -b as add(~b, 1).
    # Note: adding 1 must also be done via bitwise add.

    # In Python, ~b is -b-1. To get the 32-bit inverse strictly, we can use b ^ MASK,
    # or just rely on Python's ~ operator combined with our masked add function.
    # Using add function handles the masking, so `add(~b, 1)` works correctly
    # because `~b` produces the correct bit pattern (infinite leading 1s),
    # and `add` truncates it to 32 bits.

    neg_b = add(~b, 1)
    return add(a, neg_b)


if __name__ == "__main__":
    # Test cases
    test_cases = [
        (1, 2),
        (10, 20),
        (-1, 1),
        (5, -3),
        (-5, -6),
        (2147483647, 1),  # Overflow case for 32-bit signed
    ]

    print("--- Addition Tests ---")
    for x, y in test_cases:
        result = add(x, y)
        expected_32bit = (x + y) & 0xFFFFFFFF
        # Convert expected unsigned 32-bit to signed 32-bit for comparison
        if expected_32bit > 0x7FFFFFFF:
            expected_32bit = ~(expected_32bit ^ 0xFFFFFFFF)

        print(f"{x} + {y} = {result} (Expected 32-bit: {expected_32bit})")
        assert result == expected_32bit, f"Expected {expected_32bit}, got {result}"

    print("\n--- Subtraction Tests ---")
    for x, y in test_cases:
        result = subtract(x, y)
        expected_32bit = (x - y) & 0xFFFFFFFF
        if expected_32bit > 0x7FFFFFFF:
            expected_32bit = ~(expected_32bit ^ 0xFFFFFFFF)

        print(f"{x} - {y} = {result} (Expected 32-bit: {expected_32bit})")
        assert result == expected_32bit, f"Expected {expected_32bit}, got {result}"
