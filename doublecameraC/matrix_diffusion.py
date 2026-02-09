import sys


def solve():
    """
    Solves the matrix diffusion problem.
    """
    try:
        # Read all input from stdin
        input_data = sys.stdin.read().strip()
        if not input_data:
            return

        # Handle potentially multiple lines if necessary, currently just processing one case
        # based on 'Input Description' implies one set of numbers
        lines = input_data.split("\n")
        for line in lines:
            if not line:
                continue
            parts = list(map(int, line.split(",")))
            if len(parts) != 6:
                continue

            m, n = parts[0], parts[1]
            x1, y1 = parts[2], parts[3]
            x2, y2 = parts[4], parts[5]

            max_time = 0

            # Optimization:
            # We don't necessarily need to iterate if we can use math, but iteration is safe and fast enough (10^6).
            # Let's stick to iteration for clarity and correctness.
            for r in range(m):
                for c in range(n):
                    # Manhattan distance to sources
                    dist1 = abs(r - x1) + abs(c - y1)
                    dist2 = abs(r - x2) + abs(c - y2)

                    # Time to reach this cell is the minimum of distances
                    max_time = max(max_time, min(dist1, dist2))

            print(max_time)

    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    solve()
