import random


def simulate(trials=1000000, hours=8, duration=5, people=5):
    # Total minutes in the window
    T = hours * 60
    # Effective window for start times (assuming visit fits in the day)
    # Start time can be from 0 to T-duration
    max_start = T - duration

    hits = 0
    for _ in range(trials):
        starts = [random.uniform(0, max_start) for _ in range(people)]
        # For all to overlap, the latest start time must be before the earliest end time
        # min_end = min(s + duration for s in starts) = min(starts) + duration
        # Condition: max(starts) < min(starts) + duration
        if max(starts) - min(starts) < duration:
            hits += 1

    return hits / trials


scenarios = [
    (8, "8小时工作日"),
    (4, "4小时半天"),
    (2, "2小时会议间隙"),
    (1, "1小时午休"),
]

print(f"{'场景':<10} | {'概率 (估算)':<15} | {'平均发生所需天数 (1次/天)'}")
print("-" * 50)

for h, label in scenarios:
    prob = simulate(trials=5000000, hours=h)

    if prob == 0:
        days = "N/A"
    else:
        days = f"{1/prob:.1f}"

    print(f"{label:<10} | {prob:.8f}        | {days}")
